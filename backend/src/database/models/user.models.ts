import mongoose, { Schema } from "mongoose";

interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6 },
});

export const User = mongoose.model<IUser>("User", userSchema);
