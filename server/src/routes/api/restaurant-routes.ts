import express from "express";
import type { Request, Response } from "express";
import { Restaurant } from "../../models/index.js";
import {
  calculateRestaurantRating,
  calculateAllRestaurantRatings,
  sortRestaurantRatingsInDescendingOrder,
} from "../../services/ratingServices.js";
import { chooseRandomRestaurant } from "../../services/restaurantServices.js";
import axios from "axios";

const router = express.Router();

// GET /restaurant - Get all restaurants
router.get("/", async (_req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.findAll();
    console.log("Restaurants fetched:", restaurants);
    await calculateAllRestaurantRatings(restaurants);
    await sortRestaurantRatingsInDescendingOrder(restaurants);
    res.json(restaurants);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /restaurant/random - Get random restaurant
router.get("/random", async (_req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.findAll();
    console.log("Restaurants fetched:", restaurants);
    const randomRestaurant = await chooseRandomRestaurant(restaurants);
    res.json(randomRestaurant);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /restaurant/:id - Get a restaurant by id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findByPk(id, { include: [] });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // call the calulate rating service method
    const rating = await calculateRestaurantRating(parseInt(id));

    // convert the model instance data into a json object
    // spread the existing json boject data and overwirte rating property
    // serialize and return the restaurant data with the calculated rating
    return res.json({ ...restaurant.toJSON(), rating });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return res.status(500).json({ message: "Failed to fetch restaurant" });
  }
});

// POST /restaurant - Create a new restaurant
router.post("/", async (req: Request, res: Response) => {
  const { name, cuisine, address, rating, price } = req.body;
  try {
    const newRestaurant = await Restaurant.create({
      name,
      cuisine,
      address,
      rating,
      price,
    });
    res.status(201).json(newRestaurant);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /restaurant/:id - Delete a restaurant by id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    await restaurant.destroy();

    return res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return res.status(500).json({ message: "Failed to delete restaurant" });
  }
});

// POST /restaurants/bulk - Create multiple restaurants from Google Places API
// This endpoint is used to fetch restaurants based on a ZIP code and radius
// and create them in the database.
router.post("/bulk", async (req: Request, res: Response) => {
  const { zipCode, radius } = req.body;
  if (!zipCode || !radius) {
    return res.status(400).json({
      message: "ZIP code and radius are required to fetch restaurants.",
    });
  }
  try {
    // Convert ZIP code to lat/lng using Google Geocoding API
    const geocodeResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: zipCode,
          key: process.env.GOOGLE_PLACES_API_KEY,
        },
      }
    );
    const location = geocodeResponse.data.results[0].geometry.location;

    const { lat, lng } = location;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        {
          params: {
            location: `${lat},${lng}`,
            radius: radius * 1069, // Convert meters to miles
            type: "restaurant",
            key: process.env.GOOGLE_PLACES_API_KEY,
          },
        }
      );
      const places = response.data.results;
      if (places.length === 0) {
        return res.status(404).json({
          message: "No restaurants found in the specified area.",
        });
      }
      console.log("PLACES: ", places);
      // Map the places to the restaurant model
      const restaurants = places
        .filter((place: any) => place)
        .map((place: any) => ({
          name: place?.name,
          cuisine: place?.types.join(", "),
          address: place?.vicinity,
          rating: (place?.rating / 5) * 100,
          // Convert Google rating (0-5) to percentage ($$$)
          price: place?.price_level
            ? place?.price_level < "2"
              ? "$"
              : place?.price_level < "3"
              ? "$$"
              : place?.price_level < "4"
              ? "$$$"
              : place?.price_level < "5"
              ? "$$$$"
              : ""
            : "",
        }));

      console.log("Restaurants to be created:", restaurants);
      // Bulk create restaurants in the database
      await Restaurant.bulkCreate(restaurants);

      return res.status(200).json({
        message: "Restaurants fetched and created successfully",
        restaurants,
      });
    } catch (error: any) {
      console.error("Error fetching places:", error);
      return res.status(500).json({
        message: "Failed to fetch restaurants from Google Places API",
        error: error.message,
      });
    }
  } catch (error: any) {
    console.error("Error fetching restaurants:", error);
    return res.status(500).json({
      message: "Failed to fetch restaurants",
      error: error.message,
    });
  }
});

export { router as restaurantRouter };
