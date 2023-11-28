import mongoose, { Schema } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  dateCreated: Date
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: new Date(), immutable: true }
});

const User =  mongoose.model<IUser>('User', userSchema);

export default User;