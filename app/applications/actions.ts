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

    const application = await Application.create(values);

    return { success: true };
  } catch (error) {
    console.error("Error creating application:", error);
    return { success: false, error: "Failed to create application" };
  }
}

export async function getApplications(clerkUserId: string | undefined) {
  try {
    await connectMongo();

    const mongoUser = await findUserByClerkId(clerkUserId);

    console.log("mongoUser", mongoUser);

    const applications = await Application.find({ userId: mongoUser?._id });

    console.log("applications", applications);

    return JSON.parse(JSON.stringify(applications));
  } catch (e) {
    console.error("Error getting applications:", e);
  }
}
