"use server";

import connectMongo from "@/utils/connectToDb";

export async function createApplication(formData: FormData) {
  try {
    await connectMongo();

    console.log("applicationData:", formData);

    // Create a new application
    // const application = await Application.create(applicationData);

    return { success: true };
  } catch (error) {
    console.error("Error creating application:", error);
    return { success: false, error: "Failed to create application" };
  }
}
