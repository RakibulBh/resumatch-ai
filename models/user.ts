import { model, models, Schema } from "mongoose";

export interface IUser {
  clerkUserId: string;
  email: string;
  firstName: string;
  lastName: string;
}

const UserSchema = new Schema<IUser>(
  {
    clerkUserId: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const User = models.User || model("User", UserSchema);
export default User;
