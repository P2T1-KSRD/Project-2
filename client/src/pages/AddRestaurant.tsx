import { useState, FormEvent, ChangeEvent } from "react";
import { createRestaurant } from "../api/restaurantAPI";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    cuisine: "",
    address: "",
    price: "",
    rating: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRestaurantData({
      ...restaurantData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await createRestaurant(restaurantData);
      console.log("Restaurant added successfully:", data);
      setShowModal(true);
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
    setShowModal(false);
  };

  const handleBrowse = () => {
    navigate("/browse");
    setShowModal(false);
  };

  return (
    <div className="add-restaurant-container">
      <h2>Add Your Restaurants!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Restaurant Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={restaurantData.name}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Suggestion</button>
      </form>
      {showModal && (
        <Modal onAddAnother={handleAddAnother} onBrowse={handleBrowse} />
      )}
    </div>
  );
};

export default AddRestaurant;
