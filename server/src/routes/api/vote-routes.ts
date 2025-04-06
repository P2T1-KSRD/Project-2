import express from "express";
import type { Request, Response } from "express";
import { Vote } from "../../models/index.js";

const router = express.Router();

// GET /votes/restaurants/:restaurantID - Get all votes for a specific restaurant
router.get(
  "/restaurants/:restaurantID",
  async (req: Request, res: Response) => {
    const { restaurantID } = req.params;
    try {
      const votes = await Vote.findAll({
        where: {
          restaurantID: restaurantID,
        },
      });
      res.json(votes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// GET /votes/users/:userID - Get all votes for a specific user
router.get("/users/:userID", async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    const votes = await Vote.findAll({
      where: {
        userID: userID,
      },
    });
    res.json(votes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /votes - Create a new vote
router.post("/", async (req: Request, res: Response) => {
  const { userID, restaurantID } = req.body;
  try {
    console.log(req.body);
    const newVote = await Vote.create({
      userID,
      restaurantID,
    });
    res.status(201).json(newVote);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export { router as voteRouter };
