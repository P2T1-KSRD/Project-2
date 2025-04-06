import { useState, useEffect } from "react";

import { RestaurantData } from "../interfaces/RestaurantData"; // Import the RestaurantData interface

const RestaurantList = () => {
  // TODO: Display restaurants from database including name, cuisine, address, rating,  price
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]); // State to hold the list of restaurants

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("/api/restaurant"); // Fetch restaurants from the API

        const data = await response.json();

        setRestaurants(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching restaurants:", error); // Log any errors that occur during fetching
      }
    };

    fetchRestaurants(); // Call the function to fetch restaurants when the component mounts
  }, []);

  return (
    <div className="restaurant-list">
      <h1>Restaurant List</h1>
      {}
      <ul>
        {restaurants.map(
          (
            restaurant // Map through the list of restaurants and display them
          ) => (
            <>
              <li key={restaurant.id}>
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
            </>
          )
        )}
      </ul>
    </div>
  );
};

export default RestaurantList;
