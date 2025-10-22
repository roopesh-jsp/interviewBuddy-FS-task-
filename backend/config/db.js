import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // creates a local file
  logging: false,
});

export default sequelize;
