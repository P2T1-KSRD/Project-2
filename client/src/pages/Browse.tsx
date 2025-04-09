// import React from "react";

import RestaurantList from "../components/Restaurants";

const Browse = () => {
  return (
    <section className="browse-page">
      <h1 className="browse">Browse Restaurants Here!</h1>
      <div className="restaurant-list">
        <RestaurantList />
      </div>
    </section>
  );
};

export default Browse;
