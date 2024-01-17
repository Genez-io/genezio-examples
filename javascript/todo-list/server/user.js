import { mongoose } from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "./models/user";
import { ActiveSession } from "./models/activeSession";
import { validatePassword, saltPassword } from "./helper";
import { GenezioDeploy } from "@genezio/types";

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_error =
  "ERROR: Your MONGO_DB_URI environment variable is not properly set, go to https://genezio.com/blog/how-to-add-a-mongodb-to-your-genezio-project/ to learn how to integrate your project with Mongo DB";

/**
 * The User server class that will be deployed on the genezio infrastructure.
 */
@GenezioDeploy()
export class User {
  constructor() {
    this.#connect();
  }

  /**
   * Private method used to connect to the DB.
   */
  #connect() {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return;
    }
    mongoose.connect(process.env.MONGO_DB_URI || "").catch((err) => {
      console.log(err);
      throw err;
    });
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
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(`Registering user with name ${name} and email ${email}...`);

    let user;
    try {
      user = await UserModel.findOne({ email: email });
    } catch (error) {
      return { success: false, err: error.toString() };
    }
    if (user) {
      return { success: false, msg: "User already exists" };
    } else {
      const saltedPassword = await saltPassword(password);
      try {
        await UserModel.create({
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
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(`Login request received for user with email ${email}`);
    console.log(UserModel);

    let user;
    try {
      user = await UserModel.findOne({ email: email });
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
        await ActiveSession.create({ token: token, userId: user._id });
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
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log("Check session request received...");

    let activeSession;
    try {
      activeSession = await ActiveSession.findOne({ token: token });
    } catch (error) {
      return { success: false, err: error.toString() };
    }
    if (!activeSession) {
      return { success: false };
    }

    let user;
    try {
      user = await UserModel.findById(activeSession.userId);
    } catch (error) {
      return { success: false, err: error.toString() };
    }
    if (!user) {
      return { success: false };
    }

    return { success: true };
  }
}
