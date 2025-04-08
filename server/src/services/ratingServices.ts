import { User } from "../models/user.js";
import { Vote } from "../models/vote.js";
import { Restaurant } from "../models/restaurant.js";

// fetch all votes for a restaurant from the database
// fetch all users from the database
// find the average percent rating by dividing total votes by number of voters
export async function calculateRestaurantRating(
  restaurantID: number
): Promise<number> {
  try {
    const votes = await Vote.findAll({
      where: { restaurantID: restaurantID },
    });

    const totalVotes = votes.length;
    const voters = await User.findAll();
    const totalVoters = voters.length;
    const rating = Math.floor((totalVotes / totalVoters) * 100);

    return rating;
  } catch (error) {
    console.error("Error calculating rating:", error);
    return 0; // Or handle the error as appropriate
  }
}

// update the rating of all restaurants in the database
export async function calculateAllRestaurantRatings(
  restaurants: Restaurant[]
): Promise<Restaurant[]> {
  try {
    for (const restaurant of restaurants) {
      const rating = await calculateRestaurantRating(restaurant.id);
      await restaurant.update({ rating: rating });
    }
  } catch (error) {
    console.error("Error calculating all restaurant ratings:", error);
    throw error;
  }

  return restaurants;
}

export async function sortRestaurantRatingsInDescendingOrder(
  restaurants: Restaurant[]
): Promise<Restaurant[]> {
  try {
    restaurants.sort((a, b) => b.rating - a.rating);
  } catch (error) {
    console.error("Error calculating all restaurant ratings:", error);
    throw error;
  }

  return restaurants;
}
