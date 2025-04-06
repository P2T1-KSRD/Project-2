import { RestaurantData } from "../interfaces/RestaurantData.tsx";

const restaurant = async (userInfo: RestaurantData) => {
  try {
    const response = await fetch("/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log("Error from suggestion ", err);
    return Promise.reject("Could not complete suggestion form.");
  }
};

export { restaurant };
