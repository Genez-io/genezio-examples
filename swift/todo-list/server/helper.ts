import { ActiveSession } from "./models/activeSession";
import bcrypt from "bcryptjs";

export type AuthResponse = {
  success: boolean;
  msg?: string;
  err?: string;
};

export async function validatePassword(
  saltedPassword: string,
  password: string
): Promise<boolean> {
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

export async function saltedPassword(password: string): Promise<string> {
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

export async function reqAuth(token: string): Promise<AuthResponse> {
  let session;
  try {
    session = await ActiveSession.find({ token: token });
  } catch (error: any) {
    return { success: false, err: error.toString() };
  }
  if (session.length == 1) {
    return { success: true };
  } else {
    return { success: false, msg: "User is not logged on" };
  }
}
