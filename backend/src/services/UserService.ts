import { HydratedDocument, Types } from "mongoose";
import User, { IUser } from "../model/User";
import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 10;

export const findByUserEmail = (email: string): Promise<IUser | null> => {
  return User.findOne({ email }).exec();
};

// // Ttpescript: "Lets make it really easy for devs to get lost in syntax"
// export const findByUserEmailWithId = (email: string): Promise<IUser & { _id: Types.ObjectId; }> => {
//   return User.findOne({ email }).exec()
//     .then(user => {
//       if (user) {
//         // Assuming the user has an _id field of type Types.ObjectId
//         return user as IUser & { _id: Types.ObjectId; };
//       }
//       throw new Error('User not found');
//     });
// };

export const createUser = (username: string, email: string, password: string): Promise<IUser> => {
  // Translated to lowercase for edge cases.
  const lowerCaseEmail = email.toLowerCase();
  return hash(password, SALT_ROUNDS)
    .then(hashedPassword => {
      const user: HydratedDocument<IUser> = new User({
        username,
        email: lowerCaseEmail,
        password: hashedPassword
      });
      return user.save();
    });
};


export const authUserCredentials = (email: string, password: string): Promise<IUser | null> => {
  // First, get the hashed password of the user from db with email.
  // Translate email to lower case for edge cases.
  return findByUserEmail(email.toLowerCase())
    .then(foundUser => {
      if (!foundUser) {
        console.log(`Tried to find email: ${email} but was not found in db.`);
        return null;
      }

      // Compare password given to the hashed password found in db for user.
      return compare(password, foundUser.password)
        .then(wasAuthed => {
          if (wasAuthed) {
            return foundUser;
          }
          console.log(`Password for ${email} was incorrect.`);
          return null;
        });
    });
};