import { useState, useEffect } from "react";
import { RestaurantData } from "../interfaces/RestaurantData";
import { retrieveRestaurants } from "../api/restaurantAPI";
import { createVote, deleteVote } from "../api/voteAPI";
import ErrorPage from "../pages/ErrorPage";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [error, setError] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

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

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="restaurant-list">
      <h1>Restaurant List</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <li>
              <h2>{restaurant.name}</h2>
              <p>Cuisine: {restaurant.cuisine}</p>
              <p>Address: {restaurant.address}</p>
              <p>Rating: {restaurant.rating}</p>
              <p>Price: {restaurant.price}</p>
            </li>
            <button
              className="toggle-upvote-btn"
              onClick={() => {
                if (restaurant.id !== undefined) {
                  const voteData = {
                    restaurantID: restaurant.id,
                  };
                  createVote(voteData);
                  console.log(`Upvoted restaurant with ID: ${restaurant.id}`);
                  setUpvote(!upvote);
                } else {
                  console.error(
                    "Restaurant ID is undefined, cannot create vote."
                  );
                }
              }}
            >
              Upvote
            </button>
            <button
              className="toggle-downvote-btn"
              onClick={() => {
                if (restaurant.id !== undefined) {
                  const voteData = {
                    restaurantID: restaurant.id,
                  };
                  deleteVote(voteData);
                  console.log(`Downvoted restaurant with ID: ${restaurant.id}`);
                  setDownvote(!downvote);
                } else {
                  console.error(
                    "Restaurant ID is undefined, cannot delete vote."
                  );
                }
              }}
            >
              Downvote
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
