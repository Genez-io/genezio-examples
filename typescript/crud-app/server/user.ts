// server/user.ts
import { UserModel } from "./models/userModel";
import { GenezioDeploy } from "@genezio/types";
import { DataTypes, Sequelize } from "sequelize";
import pg from 'pg';


// The type that will be used for handling a user object
export type User = {
  userId: number; 
  name: string;
  email: string;
  verified: boolean;
};

// The type that will be returned in some of our CRUD Functions
export type UserResponse = {
  success: boolean;
  msg?: string;
  user?: User;
  err?: string;
};

// The type that will be used to return all the users from the databse
export type AllUsersResponse = {
  success: boolean;
  msg?: string;
  users?: Array<User>;
  err?: string;
};


/**
 * The User server class that will be deployed on the genezio infrastructure.
 */
@GenezioDeploy()
export class UserHandler {
  constructor() {

    this.#connect();
  }

  /**
   * Private method used to connect to the DB.
   */
  #connect() {
    try { 
      // Check if you have a NEON_POSTGRES_URL variable
      if(!process.env.NEON_POSTGRES_URL){ 
        console.log('\x1b[31m%s\x1b[0m',"ERROR: Your NEON_POSTGRES_URL environment variable is not set, go to https://docs.genez.io/genezio-documentation/integrations/neon-postgres to learn how to integrate your project with Neon Postgres")
        return;
      }
      
      // Initialize the database connection manager
      const sequelize = new Sequelize(process.env.NEON_POSTGRES_URL || "", {
        dialect: "postgres", // or your database type
        dialectModule: pg,
        define: {
          timestamps: false, // This disables the created_at and updated_at columns
        },
        dialectOptions: {
          ssl: {
            require: true, // Use SSL with the 'require' option
          },
        },
      });
      

      // Intialize the UserModel
      UserModel.init(
        {
          userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
          name: DataTypes.STRING(512),
          email: {
            type: DataTypes.STRING(512),
            unique: true,
          },
          verified: DataTypes.BOOLEAN,
        },
        {
          sequelize,
          modelName: "User",
          tableName: "users", // Change 'users' to your actual table name
        }
      ); 

      
      sequelize.sync();
    } catch (err) {
      console.log('\x1b[33m%s\x1b[0m',"WARNING: Check if your environment variables are correctly set")
      console.log(err);
    }
  }
  /**
   * Method that returns the (max userId) + 1 from the database
   * or 0 if there are no users in the database
   * 
   * @returns a number reprezenting the max id in the table
   */
  async #generateUniqueId(): Promise<number> {
    const maxId:number = await UserModel.max("userId");
    if(maxId == null){
      return 0
    }
    return maxId+1;
  }

  /**
   * Method that can be used to create a new user.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} name The user's name.
   * @param {*} email The user's email.
   * @param {*} verified The user's verified status.
   * @returns An object containing a boolean property "success" which
   * is true if the creation was successfull, false otherwise.
   */

  async createUser(
    name: string,
    email: string,
    verified: boolean
  ): Promise<UserResponse> {
    // Check if email is the right format using regex
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return { success: false, msg: "Wrong email format" };
    }
    // Check if there is another user with the same email address
    const user = await UserModel.findOne({ where: { email: email } });
    if (user) {
      // if there is another user with the same email address then we don't create the user
      // as we already stated that the email will be a way to identify our users so it must be unique for each user
      return { success: false, msg: "Email already exists" };
    }
    // Create the user and add it to the database

    try {
      var maxId = await this.#generateUniqueId();
      console.log(maxId)
      var newUser = await UserModel.create({
        userId: maxId,
        name: name,
        email: email,
        verified: verified,
      });
    } catch (err) {
      console.log(err);
      return {
        success: false,
        msg: "Error at database",
        err: err as string,
      };
    }
    // After all the operations are succesfull then we return the new user
    return {
      success: true,
      user: newUser,
    };
  }

  /**
   * Method that can be used to obtain all users.
   *
   * The method will be exported via SDK using genezio.
   *
   * @returns An object containing a boolean property "success" which
   * is true if the retrieval was successfull, false otherwise.
   */
  async getUsers(): Promise<AllUsersResponse> {
    // get all users
    const users = await UserModel.findAll();
    if (users) {
      return { success: true, msg: "Users retrived succesfully", users: users };
    }
    return { success: false, msg: "Error at database" };
  }

  /**
   * Method that can be used to obtain a user by a certain email.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} email The user's email.
   * @returns An object containing a boolean property "success" which
   * is true if the retrieval was successful, false otherwise.
   */
  async getUserByEmail(email: string): Promise<UserResponse> {
    // Search for the user by email
    const user = await UserModel.findOne({ where: { email: email } });
    if (user) {
      return { success: true, msg: "User retrieved successfully", user: user };
    }
    return { success: false, msg: "User doesn't exist" };
  }
  /**
   * Method that updates a user with a certain email.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} email The user's email.
   * @param {*} updatedUser The new user object containing the updated values.
   * @returns An object containing a boolean property "success" which
   * is true if the update was successfull, false otherwise.
   */
  async updateUser(email: string, updatedUser: User): Promise<UserResponse> {
    // Check if a user with this email exists
    const user = await UserModel.findOne({ where: { email: email } });
    if (!user) {
      return { success: false, msg: "User dosen't exist" };
    }
    // Create a data to set which has all the new user info

    // Update the user with the new values
    try {
      user.set({
        name: updatedUser.name,
        verified: updatedUser.verified,
      });
      await user.save();
      return { success: true, msg: "Update completed" };
    } catch (err) {
      return { success: false, msg: "Error at update", err: err as string };
    }
  }

  /**
   * Method that deletes a user given a certain email.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} email The user's email.
   * @returns An object containing a boolean property "success" which
   * is true if the deletion was successfull, false otherwise.
   */
  async deleteUser(email: string): Promise<UserResponse> {
    // Check if a user with this email exists
    const user = await UserModel.findOne({ where: { email: email } });
    if (!user) {
      return { success: false, msg: "User dosen't exist" };
    }
    // If the user exists then we delete the user with the id form the user retrived earlier
    try {
      await user.destroy();
      return { success: true, msg: "User deleted succesfully" };
    } catch (err) {
      return {
        success: false,
        msg: "Unexpected error at deletion",
        err: err as string,
      };
    }
  }
}
