import sequelize from "../config/connection.js";
import { UserFactory } from "./user.js";
import { RestaurantFactory } from "./restaurant.js";

const Restaurant = RestaurantFactory(sequelize);
const User = UserFactory(sequelize);

export { Restaurant };
export { User };
