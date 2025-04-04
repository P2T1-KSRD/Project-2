import express from "express";
import type { Request, Response } from "express";
import { Restaurant } from "../../models/index.js";

const router = express.Router();

// GET /users - Get all users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id - Get a user by id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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

export { router as restaurantRouter };
