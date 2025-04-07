import { seedUsers } from "./user-seeds.js";
import { seedRestaurants } from "./restaurant-seeds.js";
import { seedVotes } from "./vote-seeds.js";
import sequelize from "../config/connection.js";

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await seedUsers();
    console.log("\n----- USERS SEEDED -----\n");

    await seedRestaurants();
    console.log("\n----- RESTAURANTS SEEDED -----\n");

    await seedVotes();
    console.log("\n----- VOTES SEEDED -----\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedAll();
