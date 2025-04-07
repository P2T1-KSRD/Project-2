import { Vote } from "../models/index.js";

export const seedVotes = async () => {
  await Vote.bulkCreate(
    [
      { userID: 1, restaurantID: 3 },
      { userID: 1, restaurantID: 1 },
      { userID: 2, restaurantID: 3 },
      { userID: 2, restaurantID: 2 },
      { userID: 3, restaurantID: 2 },
      { userID: 3, restaurantID: 1 },
    ],
    { individualHooks: true }
  );
};
