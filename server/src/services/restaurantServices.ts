import { Restaurant } from "../models/restaurant.js";

const chooseRandomRestaurant = async (
  restaurants: Restaurant[]
): Promise<Restaurant> => {
  const totalWeight = restaurants.reduce((sum, r) => sum + r.rating, 0);
  // if (totalWeight === 0) return null; // avoid division by zero

  let random: number = Math.random() * totalWeight;

  let runningTotal: number = 0;
  let selectedRestaurant: Restaurant | null = null;
  for (const restaurant of restaurants) {
    runningTotal += restaurant.rating;
    if (random <= runningTotal) {
      selectedRestaurant = restaurant;
      break;
    }
  }

  return selectedRestaurant!; // Type assertion: we assume this will not be null
};

export { chooseRandomRestaurant };
