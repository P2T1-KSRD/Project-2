// import React from "react";

import RestaurantList from "../components/Restaurants";

const Browse = () => {
  return (
    <section className="browse-page">
      <h1 className="browse">Browse Restaurants Here!</h1>
      <h4 className="browse-subheading">Upvote the restaurants you like to increase the chances of selecting it. Downvote the ones you dislike. When you're ready to dine with destiny, fork it!</h4>
      <div className="restaurant-list">
        <RestaurantList />
      </div>
    </section>
  );
};

export default Browse;
