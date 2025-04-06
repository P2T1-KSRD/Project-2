import { useState, useEffect } from "react";
import { RestaurantData } from "../interfaces/RestaurantData"; // Import the RestaurantData interface
import { retrieveRestaurants } from "../api/restaurantAPI";
import ErrorPage from "../pages/ErrorPage";

const RestaurantList = () => {
  // TODO: Display restaurants from database including name, cuisine, address, rating,  price
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]); // State to hold the list of restaurants
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await retrieveRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error("Failed to retrieve tickets:", err);
        setError(true);
      }
    };

    fetchRestaurants(); // Call the function to fetch restaurants when the component mounts
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="restaurant-list">
      <h1>Restaurant List</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            {/* Display restaurant details */}
            <li>
              <h2>{restaurant.name}</h2>
              <p>Cuisine: {restaurant.cuisine}</p>
              <p>Address: {restaurant.address}</p>
              <p>Rating: {restaurant.rating}</p>
              <p>Price: {restaurant.price}</p>
            </li>
            <button
              className="toggle-upvote-btn"
              // onClick={() => {
              //   // Handle upvote functionality here using
              //   console.log(`Upvoted restaurant with ID: ${restaurant.id}`);
              // }}
            >
              Upvote
            </button>
            <button
              className="toggle-downvote-btn"
              // onClick={() => {
              //   // Handle downvote functionality here
              //   console.log(`Downvoted restaurant with ID: ${restaurant.id}`);
              // }}
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
