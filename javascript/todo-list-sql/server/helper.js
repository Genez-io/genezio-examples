import bcrypt from "bcryptjs";
import db from "./models/";

export async function reqAuth(token) {
  const session = await db.ActiveSession.findAll({ where: { token: token }});
  if (session.length == 1) {
    return { success: true };
  } else {
    return { success: false, msg: "User is not logged on" };
  }
}

export async function validatePassword(saltedPassword, password) {
  return new Promise(resolve => {
    bcrypt.compare(password, saltedPassword, async function(err, res) {
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
  return new Promise(resolve => {
    bcrypt.genSalt(2, function(err, salt) {
      if (err) {
        throw err;
      }

      bcrypt.hash(password, salt, async function(err, hash) {
        if (err) {
          throw err;
        }

        resolve(hash);
      });
    });
  });
}