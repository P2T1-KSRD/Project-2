import { useState, FormEvent, ChangeEvent } from "react";
import { createRestaurant, bulkCreateRestaurants } from "../api/restaurantAPI";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
  const [isBulkAdd, setIsBulkAdd] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    cuisine: "",
    address: "",
    price: "",
    rating: 0,
  });
  const [bulkData, setBulkData] = useState({
    zipCode: "",
    radius: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsBulkAdd(!isBulkAdd);
  };

  const handleRestaurantChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRestaurantData({
      ...restaurantData,
      [name]: value,
    });
  };

  const handleBulkChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBulkData({
      ...bulkData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isBulkAdd) {
        const data = await bulkCreateRestaurants(bulkData);
        console.log("Restaurants added successfully:", data);
        setShowModal(true);
      } else {
        const data = await createRestaurant(restaurantData);
        console.log("Restaurant added successfully:", data);
        setShowModal(true);
      }
    } catch (err) {
      console.error("Failed to add restaurant", err);
    }
  };

  const handleAddAnother = () => {
    setRestaurantData({
      name: "",
      cuisine: "",
      address: "",
      price: "",
      rating: 0,
    });
    setBulkData({
      zipCode: "",
      radius: "",
    });
    setShowModal(false);
  };

  const handleBrowse = () => {
    navigate("/browse");
    setShowModal(false);
  };

  return (
    <div className="add-restaurant-container">
      <h2>Add Your Restaurants!</h2>
      <button onClick={handleToggle} className="toggle-button">
        {isBulkAdd ? "Add Single Restaurant" : "Add Restaurants by Zip Code"}
      </button>
      <form onSubmit={handleSubmit}>
        {isBulkAdd ? (
          <>
            <div>
              <label htmlFor="zipCode">Zip Code:</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={bulkData.zipCode}
                onChange={handleBulkChange}
                required
              />
            </div>
            <div>
              <label htmlFor="radius">Radius (meters):</label>
              <input
                type="text"
                id="radius"
                name="radius"
                value={bulkData.radius}
                onChange={handleBulkChange}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="name">Restaurant Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={restaurantData.name}
                onChange={handleRestaurantChange}
                required
              />
            </div>
            <div>
              <label htmlFor="cuisine">Cuisine:</label>
              <input
                type="text"
                id="cuisine"
                name="cuisine"
                value={restaurantData.cuisine}
                onChange={handleRestaurantChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={restaurantData.address}
                onChange={handleRestaurantChange}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Price Range:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={restaurantData.price}
                onChange={handleRestaurantChange}
                required
              />
            </div>
          </>
        )}
        <button type="submit">Submit Suggestion</button>
      </form>
      {showModal && (
        <Modal onAddAnother={handleAddAnother} onBrowse={handleBrowse} />
      )}
    </div>
  );
};

export default AddRestaurant;
