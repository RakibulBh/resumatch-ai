"use server";

import Application from "@/models/application";
import connectMongo from "@/utils/connectToDb";
import { findUserByClerkId } from "../actions";

export async function createApplication(formData: FormData) {
  try {
    await connectMongo();

    const values: any = {};

    formData.forEach((value, key) => {
      if (value !== "") {
        values[key] = value;
      }
    });

    await Application.create(values);
  } catch (error) {
    console.error("Error creating application:", error);
  }
}

export async function getApplications(clerkUserId: string | undefined) {
  try {
    await connectMongo();

    const mongoUser = await findUserByClerkId(clerkUserId);

    const applications = await Application.find({ userId: mongoUser?._id });

    return JSON.parse(JSON.stringify(applications));
  } catch (e) {
    console.error("Error getting applications:", e);
  }
}
