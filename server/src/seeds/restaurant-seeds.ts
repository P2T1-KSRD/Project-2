import { Restaurant } from "../models/index.js";

export const seedRestaurants = async () => {
  await Restaurant.bulkCreate(
    [
      {
        name: "Papa Johns",
        cuisine: "Pizza",
        address: "123 Papa Johns Way",
        rating: 3,
        price: "$$",
      },
      {
        name: "Burger King",
        cuisine: "Fast Food",
        address: "123 Burger King Way",
        rating: 2,
        price: "$",
      },
      {
        name: "Chipotle",
        cuisine: "Mexican",
        address: "123 Chipotle Way",
        rating: 4.5,
        price: "$$",
      },
    ],
    { individualHooks: true }
  );
};
