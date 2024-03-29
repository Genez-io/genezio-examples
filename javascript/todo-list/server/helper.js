import bcrypt from "bcryptjs";
import { ActiveSession } from "./models/activeSession";

export async function reqAuth(token) {
  let session;
  try {
    session = await ActiveSession.find({ token: token });
  } catch (error) {
    return { success: false, err: error.toString() };
  }
  if (session.length == 1) {
    return { success: true };
  } else {
    return { success: false, msg: "User is not logged on" };
  }
}

export async function validatePassword(saltedPassword, password) {
  return new Promise((resolve) => {
    bcrypt.compare(password, saltedPassword, async function (err, res) {
      if (err) {
        throw err;
      }

      if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

export async function saltPassword(password) {
  return new Promise((resolve) => {
    bcrypt.genSalt(2, function (err, salt) {
      if (err) {
        throw err;
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          throw err;
        }

        resolve(hash);
      });
    });
  });
}
