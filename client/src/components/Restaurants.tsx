import { useState, useEffect } from "react";
import { RestaurantData } from "../interfaces/RestaurantData";
import { retrieveRestaurants, deleteRestaurant } from "../api/restaurantAPI";
import { createVote, deleteVote } from "../api/voteAPI";
import ErrorPage from "../pages/ErrorPage";
import ForkItButton from "./ForkItButton";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [error, setError] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [forkItRestaurant, setForkItRestaurant] = useState<RestaurantData | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await retrieveRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error("Failed to retrieve restaurants:", err);
        setError(true);
      }
    };

    fetchRestaurants();
  }, [upvote, downvote]);

  const handleForkIt = () => {
    if (restaurants.length > 0) {
      const totalWeight = restaurants.reduce((sum, r) => sum + (r.rating ?? 0), 0);

      let random = Math.random() * totalWeight;
      let runningTotal = 0;
      let selectedRestaurant: RestaurantData | null = null;

      for (const restaurant of restaurants) {
        runningTotal += restaurant.rating ?? 0;
        if (random <= runningTotal) {
          selectedRestaurant = restaurant;
          break;
        }
      }

      setForkItRestaurant(selectedRestaurant!);
    }
  };

  const handleDeleteRestaurant = async (restaurantId: number) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await deleteRestaurant(restaurantId);
        setRestaurants(restaurants.filter((r) => r.id !== restaurantId));
      } catch (error) {
        console.error("Failed to delete restaurant:", error);
        setError(true);
      }
    }
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="restaurant-list">
      <h1>Restaurant List</h1>

      <div className="forkit">
        <ForkItButton onPick={handleForkIt} />
      </div>

      {forkItRestaurant && (
        <div className="forkit-restaurant">
          <h2>🍴 Fork It 🍴</h2>
          <h3>{forkItRestaurant.name}</h3>
          <p>Cuisine: {forkItRestaurant.cuisine}</p>
          <p>Address: {forkItRestaurant.address}</p>
          <p>Rating: {forkItRestaurant.rating}</p>
          <p>Price: {forkItRestaurant.price}</p>
        </div>
      )}

      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <button
              className="delete-restaurant-btn"
              onClick={() => handleDeleteRestaurant(restaurant.id!)}
              style={{ float: "right", color: "red" }}
            >
              ✕
            </button>
            <h2>{restaurant.name}</h2>
            <p>Cuisine: {restaurant.cuisine}</p>
            <p>Address: {restaurant.address}</p>
            <p>Rating: {restaurant.rating}</p>
            <p>Price: {restaurant.price}</p>

            <div className="button-group">
              <button
                className="toggle-upvote-btn"
                onClick={() => {
                  if (restaurant.id !== undefined) {
                    createVote({ restaurantID: restaurant.id });
                    setUpvote(!upvote);
                  }
                }}
              >
                Upvote
              </button>
              <button
                className="toggle-downvote-btn"
                onClick={() => {
                  if (restaurant.id !== undefined) {
                    deleteVote({ restaurantID: restaurant.id });
                    setDownvote(!downvote);
                  }
                }}
              >
                Downvote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
