import { DataTypes, Sequelize, Model, Optional } from "sequelize";

// Define the attributes for the User model
interface VoteAttributes {
  id: number;
  userID: number;
  restaurantID: number;
}

// Define the optional attributes for creating a new User
interface VoteCreationAttributes extends Optional<VoteAttributes, "id"> {}

// Define the User class extending Sequelize's Model
export class Vote
  extends Model<VoteAttributes, VoteCreationAttributes>
  implements VoteAttributes
{
  public id!: number;
  public userID!: number;
  public restaurantID!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the UserFactory function to initialize the User model
export function VoteFactory(sequelize: Sequelize): typeof Vote {
  Vote.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      restaurantID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "votes", // Name of the table in PostgreSQL
      sequelize, // The Sequelize instance that connects to PostgreSQL
    }
  );

  return Vote; // Return the initialized User model
}
