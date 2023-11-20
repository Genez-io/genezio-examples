// import { mongoose } from "mongoose"
import jwt from "jsonwebtoken";
import { validatePassword, saltPassword } from "./helper";
import { GenezioDeploy } from "@genezio/types";
import Sequelize from "sequelize";
import Task from "./models/task";
import Users from "./models/user";
import activeSession from "./models/activeSession";

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_error =
  "ERROR: One of your environment variables (DB_TABLE_NAME, DB_USERNAME, DB_PASS, DB_HOST, DB_PORT, DB_DIALECT) is not properly set, go to https://dev.mysql.com/doc/refman/8.2/en/installing.html to learn how to obtain the necesearry environment variables";

/**
 * The User server class that will be deployed on the genezio infrastructure.
 */
@GenezioDeploy()
export class User {
  db;
  constructor() {
    this.#connect();
  }

  #connect() {
    this.db = {};

    const dbModels = [Task, Users, activeSession];

    if (
      !process.env.DB_TABLE_NAME ||
      !process.env.DB_USERNAME ||
      !process.env.DB_PASS ||
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_DIALECT
    ) {
      console.log(red_color, missing_env_error);
      return;
    }

    let sequelize;
    try {
      sequelize = new Sequelize(
        process.env.DB_TABLE_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASS,
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          dialect: process.env.DB_DIALECT,
          logging: false,
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }

    dbModels.forEach((modelElem) => {
      const model = modelElem(sequelize, Sequelize.DataTypes);
      this.db[model.name] = model;
      // DELETE IN PROD - not safe
      model.sync({ alter: true });
    });

    Object.keys(this.db).forEach((modelName) => {
      if (this.db[modelName].associate) {
        this.db[modelName].associate(this.db);
      }
    });

    this.db.sequelize = sequelize;
    this.db.Sequelize = Sequelize;
  }

  /**
   * Method that can be used to create a new user.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} name The user's name.
   * @param {*} email The user's email.
   * @param {*} password The user's password.
   * @returns An object containing a boolean property "success" which
   * is true if the creation was successfull, false otherwise.
   */
  async register(name, email, password) {
    if (
      !process.env.DB_TABLE_NAME ||
      !process.env.DB_USERNAME ||
      !process.env.DB_PASS ||
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_DIALECT
    ) {
      console.log(red_color, missing_env_error);

      return { success: false, err: missing_env_error };
    }
    console.log(`Registering user with name ${name} and email ${email}...`);

    let user;
    try {
      user = await this.db.Users.findOne({ where: { email: email } });
    } catch (error) {
      return { success: false, err: error.toString() };
    }

    if (user) {
      return { success: false, msg: "User already exists" };
    } else {
      const saltedPassword = await saltPassword(password);
      try {
        await this.db.Users.create({
          name: name,
          email: email,
          password: saltedPassword,
        });
      } catch (error) {
        return { success: false, err: error.toString() };
      }

      return { success: true };
    }
  }

  /**
   * Method that can be used to obtain a login token for a giving user.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} email The user's email.
   * @param {*} password The user's password.
   * @returns
   */
  async login(email, password) {
    if (
      !process.env.DB_TABLE_NAME ||
      !process.env.DB_USERNAME ||
      !process.env.DB_PASS ||
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_DIALECT
    ) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(`Login request received for user with email ${email}`);

    let user;
    try {
      user = await this.db.Users.findOne({ where: { email: email } });
    } catch (error) {
      return { success: false, err: error.toString() };
    }

    if (!user) {
      return { success: false, msg: "User not found" };
    }

    const isValid = await validatePassword(user.password, password);

    if (isValid) {
      user.password = null;
      const token = jwt.sign(user.toJSON(), "secret", {
        expiresIn: 86400, // 1 week
      });

      try {
        await this.db.ActiveSession.create({ token: token, userId: user.id });
      } catch (error) {
        return { success: false, err: error.toString() };
      }

      return { success: true, user: user, token: token };
    } else {
      return { success: false, msg: "Incorrect user or password" };
    }
  }

  /**
   * Methods that receives a token and confirms if it is valid or not.
   *
   * @param {*} token The user's token.
   * @returns An object containing a boolean property "success" which is true if the token is valid, false otherwise.
   */
  async checkSession(token) {
    if (
      !process.env.DB_TABLE_NAME ||
      !process.env.DB_USERNAME ||
      !process.env.DB_PASS ||
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_DIALECT
    ) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log("Check session request received...");

    let activeSession;
    try {
      activeSession = await this.db.ActiveSession.findOne({
        where: { token: token },
      });
    } catch (error) {
      return { success: false, err: error };
    }
    if (!activeSession) {
      console.log("Session not found");
      return { success: false };
    }

    let user;
    try {
      user = await this.db.Users.findOne({
        where: { id: activeSession.userId },
      });
    } catch (error) {
      return { success: false, err: error.toString() };
    }

    if (!user) {
      console.log("User not found");
      return { success: false, err: "User not found" };
    }

    return { success: true };
  }
}
