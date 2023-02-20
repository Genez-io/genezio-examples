// import { mongoose } from "mongoose"
import jwt from "jsonwebtoken"
import db from "./models/"
import { validatePassword, saltPassword } from "./helper"

/**
 * The User server class that will be deployed on the genezio infrastructure.
 */
export class User {
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
    console.log(`Registering user with name ${name} and email ${email}...`)

    const user = await db.Users.findOne({ where: { email: email }})
    if (user) {
      return { success: false, msg: "User already exists" }
    } else {
      const saltedPassword = await saltPassword(password)
      await db.Users.create({
        name: name,
        email: email,
        password: saltedPassword
      });

      return { success: true }
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
    console.log(`Login request received for user with email ${email}`)

    const user = await db.Users.findOne({ where: { email: email }});

    if (!user) {
      return { success: false, msg: "User not found" };
    }

    const isValid = await validatePassword(user.password, password)

    if (isValid) {
      user.password = null;
      const token = jwt.sign(user.toJSON(), "secret", {
        expiresIn: 86400 // 1 week
      });

      await db.ActiveSession.create({ token: token, userId: user.id });
      return { success: true, user: user, token: token }
    } else {
      return { success: false, msg: "Incorrect user or password" }
    }
  }

  /**
   * Methods that receives a token and confirms if it is valid or not.
   * 
   * @param {*} token The user's token.
   * @returns An object containing a boolean property "success" which is true if the token is valid, false otherwise.
   */
  async checkSession(token) {
    console.log("Check session request received...")

    const activeSession = await db.ActiveSession.findOne({ where: { token: token }});
    if (!activeSession) {
      console.log("Session not found")
      return { success: false };
    }

    const user = await db.Users.findOne({ where: { id: activeSession.userId }});
    if (!user) {
      console.log("User not found")
      return { success: false };
    }

    return { success: true };
  }
}
