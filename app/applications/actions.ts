"use server";

import Application from "@/models/application";
import connectMongo from "@/utils/connectToDb";
import { findUserByClerkId } from "../actions";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import crypto from "crypto";
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const maxFileSize = 1024 * 1024 * 10; // 10MB

const acceptedTypes = ["application/pdf"];

export async function getSignedURL({
  clerkUserId,
  type,
  size,
  checksum,
}: {
  clerkUserId: string | undefined;
  type: string;
  size: number;
  checksum: string;
}) {
  if (!clerkUserId) {
    return { error: { message: "User not found" } };
  }

  if (!acceptedTypes.includes(type)) {
    return { error: { message: "Invalid file type" } };
  }

  if (size > maxFileSize) {
    return { error: { message: "File size too large" } };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: clerkUserId,
    },
  });

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 6000,
  });

  return { success: { url: signedURL } };
}

export async function createApplication(formData: FormData) {
  try {
    await connectMongo();

    const values: any = {};

    formData.forEach((value, key) => {
      if (value !== "") {
        values[key] = value;
      }
    });

    console.log("values:", values);

    await Application.create(values);
  } catch (error) {
    console.error("Error creating application:", error);
  }
}

export async function deleteApplication(
  applicationId: string,
  clerkUserId: string | undefined
) {
  try {
    await connectMongo();

    const mongoUser = await findUserByClerkId(clerkUserId);

    await Application.findByIdAndDelete({
      _id: applicationId,
      userId: mongoUser._id,
    });
  } catch (error) {
    console.error("Error deleting application:", error);
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
