"use server";

import User, { IUser } from "@/models/user";
import connectMongo from "@/utils/connectToDb";

const createUser = async (data: any) => {
  try {
    console.log("Creating user:", data);
    // await connectMongo();
    // Create a new user
    // const user = await User.create(data);
  } catch (e) {
    console.error("Error creating user:", e);
  }
};

export { createUser };
