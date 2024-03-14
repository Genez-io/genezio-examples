import { TaskModel } from "./models/task";
import { UserModel } from "./models/user";
import { ActiveSession } from "./models/activeSession";
import mongoose from "mongoose";

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_error =
  "ERROR: Your MONGO_DB_URI environment variable is not properly set, go to https://genezio.com/blog/how-to-add-a-mongodb-to-your-genezio-project/ to learn how to integrate your project with Mongo DB";

export class Cron {
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
   * Method that will be called by the cron job.
   *
   * The method will delete all the data from the DB.
   */
  async deleteAllData() {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return;
    }
    console.log("Deleting all data from the DB");
    try {
      await TaskModel.deleteMany({});
      console.log("Tasks deleted");
    } catch (error) {
      console.log("Error deleting tasks", error);
    }

    try {
      await ActiveSession.deleteMany({});
      console.log("Active sessions deleted");
    } catch (error) {
      console.log("Error deleting active sessions", error);
    }

    try {
      await UserModel.deleteMany({});
      console.log("Users deleted");
    } catch (error) {
      console.log("Error deleting users", error);
    }
  }
}
