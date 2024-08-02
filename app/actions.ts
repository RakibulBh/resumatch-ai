"use server";

import User, { IUser } from "@/models/user";
import connectMongo from "@/utils/connectToDb";
import { userAgent } from "next/server";

export const findUserByClerkId = async (clerkUserId: string | undefined) => {
  try {
    await connectMongo();

    console.log("clerkUserId", clerkUserId);

    const mongoUser = await User.findOne({ clerkUserId });

    console.log("mongoUser", mongoUser);

    return JSON.parse(JSON.stringify(mongoUser));
  } catch (e) {
    console.error("Error finding user by clerk id:", e);
  }
};

const createUser = async (data: IUser) => {
  try {
    await connectMongo();
    // Create a new user
    const user = await User.create(data);
    return JSON.parse(JSON.stringify(user));
  } catch (e) {
    console.error("Error creating user:", e);
  }
};

export { createUser };
