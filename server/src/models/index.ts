import sequelize from "../config/connection.js";
import { UserFactory } from "./user.js";
import { RestaurantFactory } from "./restaurant.js";
import { VoteFactory } from "./vote.js";

const Restaurant = RestaurantFactory(sequelize);
const User = UserFactory(sequelize);
const Vote = VoteFactory(sequelize);

Restaurant.hasMany(User, {
  foreignKey: "RestaurantID",
});
User.belongsTo(Restaurant);

User.hasMany(Restaurant, {
  foreignKey: "UserID",
});
Restaurant.belongsTo(User);

Vote.belongsTo(User, { as: "voter", foreignKey: "UserID" });
Vote.belongsTo(Restaurant, { as: "restaurant", foreignKey: "RestaurantID" });

export { Restaurant };
export { User };
export { Vote };
