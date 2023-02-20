import Sequelize from "sequelize";
import Task from "./task";
import Users from "./user";
import activeSession from "./activeSession";
import { DB_TABLE_NAME, DB_USERNAME, DB_PASS, DB_HOST, DB_PORT, DB_DIALECT } from "../config";

const db = {};

const dbModels = [Task, Users, activeSession];

const sequelize = new Sequelize(
  DB_TABLE_NAME,
  DB_USERNAME,
  DB_PASS,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false
  }
);

dbModels
  .forEach(modelElem => {
    const model = modelElem(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    // DELETE IN PROD - not safe
    model.sync({ alter: true });
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================

export default db;