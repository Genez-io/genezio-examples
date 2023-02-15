import bcrypt from "bcryptjs"


export async function validatePassword(saltedPassword, password) {
  return new Promise((resolve) => {
    bcrypt.compare(password, saltedPassword, async function (err, res) {
      if (err) {
        throw err
      }
      
      if (res) {
        resolve(true)
      } else {
        resolve(false)
      }
    });
  });
}

export async function saltPassword(password) {
  return new Promise((resolve) => {
    bcrypt.genSalt(2, function (err, salt) {
      if (err) {
        throw err
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          throw err
        }

        resolve(hash);
      });
    });
  });
}

export const MONGO_DB_URI = "mongodb+srv://genezio:genezio@cluster0.c6qmwnq.mongodb.net/?retryWrites=true&w=majority"
