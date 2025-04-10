import express from "express";
import type { Request, Response } from "express";
import { Restaurant } from "../../models/index.js";
import {
  calculateRestaurantRating,
  calculateAllRestaurantRatings,
  sortRestaurantRatingsInDescendingOrder,
} from "../../services/ratingServices.js";
import { chooseRandomRestaurant } from "../../services/restaurantServices.js";

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

export { router as restaurantRouter };
