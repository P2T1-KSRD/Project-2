import { useState, useEffect } from "react";
import { RestaurantData } from "../interfaces/RestaurantData";
import { retrieveRestaurants, deleteRestaurant } from "../api/restaurantAPI";
import { createVote, deleteVote } from "../api/voteAPI";
import ErrorPage from "../pages/ErrorPage";
import ForkItButton from "./ForkItButton";
import BurgerConfetti from "./confetti";
import DeleteConfirmationModal from "../interfaces/DeleteModal";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [error, setError] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [forkItRestaurant, setForkItRestaurant] = useState<RestaurantData | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState<number | null>(null);



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
    setConfetti(true);
    setTimeout(() => setConfetti(false), 100)

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

  const handleDeleteRestaurant = (restaurantId: number) => {
    setRestaurantToDelete(restaurantId);
    setShowModal(true);
  }
   
  const deletedConfirmed = async () => {
    if (restaurantToDelete) {
      try {
        await deleteRestaurant(restaurantToDelete);
        setRestaurants(restaurants.filter((r) => r.id !== restaurantToDelete));
        setShowModal(false);
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

      <div className="forkit" aria-label="Fork it button section">
        <ForkItButton onPick={handleForkIt} />
      </div>

      {forkItRestaurant && (
        <div className="forkit-restaurant" aria-label={`Details of selected restaurant ${forkItRestaurant.name}`}>
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
          <div key={restaurant.id} className="restaurant-card" aria-label={`Details of restaurant ${restaurant.name}`}>
            <button
              className="delete-restaurant-btn"
              aria-label={`Delete ${restaurant.name}`}
              onClick={() => {
                if (restaurant.id) handleDeleteRestaurant(restaurant.id);
              }}
            >
              ✕
            </button>
            <h2>{restaurant.name}</h2>
            <p>Cuisine: {restaurant.cuisine}</p>
            <p>Address: {restaurant.address}</p>
            <p>Rating: {restaurant.rating}</p>
            <p>Price: {restaurant.price}</p>

            <div className="button-group" aria-label={`Voting buttons for ${restaurant.name}`}>
              <button
                className="toggle-upvote-btn"
                onClick={() => {
                  if (restaurant.id !== undefined) {
                    createVote({ restaurantID: restaurant.id });
                    setUpvote(!upvote);
                  }
                }}
                aria-label={`Upvote ${restaurant.name}`}
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
                aria-label={`Downvote ${restaurant.name}`}
              >
                Downvote
              </button>
            </div>
          </div>
        ))}
      </div>
      <BurgerConfetti trigger={confetti} />
      <DeleteConfirmationModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={deletedConfirmed} 
      />
    </div>
  );
};

export default RestaurantList;
