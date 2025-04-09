import { RestaurantData } from "../interfaces/RestaurantData.tsx";
import Auth from "../utils/auth";

// Retrieve Restaurants (already existing)
const retrieveRestaurants = async () => {
  try {
    const response = await fetch('/api/restaurants', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid user API response, check network tab!");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error from data retrieval:", err);
    return [];
  }
};

// Create Restaurant (already existing)
const createRestaurant = async (restaurantInfo: RestaurantData) => {
  try {
    const response = await fetch("/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(restaurantInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error from suggestion ", err);
    return Promise.reject("Could not complete suggestion form.");
  }
};

// ⬇️ NEW Delete Restaurant Method
const deleteRestaurant = async (restaurantId: number) => {
  try {
    const response = await fetch(`/api/restaurants/${restaurantId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (err) {
    console.log("Error deleting restaurant:", err);
    return Promise.reject("Could not delete restaurant.");
  }
};

export { createRestaurant, retrieveRestaurants, deleteRestaurant };
