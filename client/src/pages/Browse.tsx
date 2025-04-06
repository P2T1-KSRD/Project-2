import React from "react";

import RestaurantList from "../components/Restaurants";

const Browse = () => {
  return (
    <section>
      <h1>Browse Restaurants Here</h1>
      <div className="restaurant-list">
        <RestaurantList />
      </div>
    </section>
  );
};

export default Browse;
