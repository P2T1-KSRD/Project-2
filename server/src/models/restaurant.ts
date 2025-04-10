import { DataTypes, Sequelize, Model, Optional } from "sequelize";

// Define the attributes for the User model
interface RestaurantAttributes {
  id: number;
  name: string;
  cuisine: string;
  address: string;
  rating: number;
  price: string; // $$$
}

interface RestaurantCreationAttributes
  extends Optional<RestaurantAttributes, "id"> {}

// Define the User class extending Sequelize's Model
export class Restaurant
  extends Model<RestaurantAttributes, RestaurantCreationAttributes>
  implements RestaurantAttributes
{
  public id!: number;
  public name!: string;
  public cuisine!: string;
  public address!: string;
  public rating!: number;
  public price!: string; // $$$

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the UserFactory function to initialize the User model
export function RestaurantFactory(sequelize: Sequelize): typeof Restaurant {
  Restaurant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cuisine: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "restaurants", // Name of the table in PostgreSQL
      sequelize, // The Sequelize instance that connects to PostgreSQL
    }
  );

  return Restaurant; // Return the initialized User model
}
