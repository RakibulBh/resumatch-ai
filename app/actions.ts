"use server";

import User, { IUser } from "@/models/user";
import connectMongo from "@/utils/connectToDb";
import { userAgent } from "next/server";

export const findUserByClerkId = async (clerkUserId: string | undefined) => {
  try {
    if (!clerkUserId) {
      return;
    }
    await connectMongo();

    const mongoUser = await User.findOne({ clerkUserId });

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
  } catch (e) {
    console.error("Error creating user:", e);
  }
};

export { createUser };
