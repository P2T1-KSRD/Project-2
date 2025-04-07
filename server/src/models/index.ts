import sequelize from "../config/connection.js";
import { UserFactory } from "./user.js";
import { RestaurantFactory } from "./restaurant.js";
import { VoteFactory } from "./vote.js";

const Restaurant = RestaurantFactory(sequelize);
const User = UserFactory(sequelize);
const Vote = VoteFactory(sequelize);

// each restaurant has many votes
// forien key creates a column for with a restaurantID for each primary key in restaraunt
Restaurant.hasMany(Vote, {
  foreignKey: "restaurantID",
  onDelete: "CASCADE",
});

// each vote belongs to one restaurant
// can acces restraunt associated with a vote using vot.restaruant
Vote.belongsTo(Restaurant, {
  foreignKey: "restaurantID",
  as: "restaurant",
});

User.hasMany(Vote, {
  foreignKey: "userID",
  onDelete: "CASCADE",
});

Vote.belongsTo(User, {
  foreignKey: "userID",
  as: "user",
});

export { Restaurant };
export { User };
export { Vote };
