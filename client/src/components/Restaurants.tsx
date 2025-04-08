import { useState, useEffect } from "react";
import { RestaurantData } from "../interfaces/RestaurantData";
import { retrieveRestaurants } from "../api/restaurantAPI";
import { createVote, deleteVote } from "../api/voteAPI";
import ErrorPage from "../pages/ErrorPage";
import ForkItButton from "./ForkItButton";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [error, setError] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [forkItRestaurant, setForkItRestaurant] =
    useState<RestaurantData | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await retrieveRestaurants();
        console.log(data[1].rating);
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
      // const randomIndex = Math.floor(Math.random() * restaurants.length);
      // const randomRestaurant = restaurants[randomIndex];
      // setForkItRestaurant(randomRestaurant);
      console.log(restaurants[1].rating);

      const totalWeight = restaurants.reduce(
        (sum, r) => sum + (r.rating ?? 0),
        0
      );

      let random: number = Math.random() * totalWeight;

      let runningTotal: number = 0;
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

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="restaurant-list">
      <h1>Restaurant List</h1>

<div className="forkit">
      {/* Fork It Button */}
      <ForkItButton onPick={handleForkIt} />
</div>

      {/* Fork It Restaurant Display */}
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
          <div key={restaurant.id}>
           <div className="restaurant-card">
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
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
