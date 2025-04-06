import express from "express";
import { ValidationError } from "sequelize";
import type { Request, Response } from "express";
import { User, Vote } from "../../models/index.js";
import { authenticateToken } from "../../middleware/auth.js";

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
router.post("/", authenticateToken, async (req: Request, res: Response) => {
  // extract username from the JWT request header
  const { restaurantID } = req.body;
  const username: string = req.user?.username ?? "";
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  // extract the primary key of the user from the database
  // by matching the username from the JWT token
  // with the username in the database
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userID = user.id;

    console.log(req.body);
    const newVote = await Vote.create({
      userID,
      restaurantID,
    });
    return res.status(201).json(newVote);
  } catch (error: any) {
    if (
      error instanceof ValidationError &&
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res
        .status(409)
        .json({ message: "You have already voted for this restaurant." });
    }
    return res.status(400).json({ message: error.message });
  }
});

export { router as voteRouter };
