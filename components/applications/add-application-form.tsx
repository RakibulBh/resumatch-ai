"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { createApplication, getSignedURL } from "@/app/applications/actions";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { findUserByClerkId } from "@/app/actions";
import { Uploads } from "./upload-files-page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BasicJobInfo } from "./form-fields/basic-job-info";
import { ApplicationDetails } from "./form-fields/application-details";
import { AdditionalInformation } from "./form-fields/additional-information";
import { Form } from "../ui/form";
import { referralInfo } from "./form-fields/referral-info";
import { computeSHA256 } from "@/utils/computeHash";

const formSchema = z.object({
  jobTitle: z
    .string()
    .min(2, { message: "Job Title must be at least 2 characters long" }),
  companyName: z
    .string()
    .min(2, { message: "Company Name must be at least 2 characters long" }),
  jobLocation: z
    .string()
    .min(2, { message: "Job Location must be at least 2 characters long" }),
  jobDescription: z
    .string()
    .min(5, { message: "Job Description must be at least 5 characters long" }),
  jobType: z.string(),
  applicationDate: z.string(),
  applicationStatus: z.string(),
  applicationLink: z.string().optional(),
  applicationNotes: z.string().optional(),
  jobReferenceNumber: z.string().optional(),
  applicationDeadline: z.string().optional(),
  resume: z
    .custom()
    .refine((file) => file instanceof File, "Please upload a PDF Document")
    .optional(),
  coverLetter: z
    .custom()
    .refine((file) => file instanceof File, "Please upload a PDF Document")
    .optional(),
  referral: z.boolean().default(false),
  referralSource: z.string().optional(),
  referralContact: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const AddApplicationForm = ({
  onOpenChange,
}: {
  onOpenChange: (state: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useUser();

  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: (formData: FormData) => createApplication(formData),
    onError: (error) => {
      return alert(error.message || "Failed to update");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      onOpenChange(false);
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobLocation: "",
      jobDescription: "",
      jobType: "part-time",
      applicationDate: "",
      applicationStatus: "applied",
      applicationLink: "",
      applicationNotes: "",
      jobReferenceNumber: "",
      applicationDeadline: "",
      resume: undefined,
      coverLetter: undefined,
      referral: false,
      referralSource: "",
      referralContact: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    const mongoUser = await findUserByClerkId(user?.id);
    formData.append("userId", mongoUser?._id);

    const fileUploads = [];

    // Helper function for file uploads
    const uploadFile = async (
      file: File,
      fileType: "resume" | "coverLetter"
    ) => {
      if (!file) return;

      const signedUrl = await getSignedURL({
        clerkUserId: user?.id,
        type: file.type,
        size: file.size,
        checksum: await computeSHA256(file),
      });

      if (signedUrl.error) {
        console.error(
          `Error getting signed URL for ${fileType}:`,
          signedUrl.error
        );
        return;
      }

      const url = signedUrl.success?.url;

      await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      formData.append(fileType, url.split("?")[0]);
    };

    // Queue file uploads
    if (values.resume) fileUploads.push(uploadFile(values.resume, "resume"));
    if (values.coverLetter)
      fileUploads.push(uploadFile(values.coverLetter, "coverLetter"));

    try {
      // Run file uploads concurrently
      await Promise.all(fileUploads);

      // Append other form values
      Object.entries(values).forEach(([key, value]) => {
        if (value != null && !["resume", "coverLetter"].includes(key)) {
          formData.append(
            key,
            value instanceof File ? value : value.toString()
          );
        }
      });

      await mutateAsync(formData);
    } catch (e) {
      console.error("Error in form submission:", e);
      // Handle error (e.g., show user-friendly error message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {currentStep === 0 && BasicJobInfo(form)}
        {currentStep === 1 && ApplicationDetails(form)}
        {currentStep === 2 && AdditionalInformation(form)}
        {currentStep === 3 && <Uploads control={form.control} />}
        {currentStep === 4 && referralInfo(form)}
        <div className="flex justify-between">
          {currentStep > 0 ? (
            <Button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Previous
            </Button>
          ) : (
            <div />
          )}
          {currentStep === 4 ? (
            <Button key="submit" type="submit">
              Submit
            </Button>
          ) : (
            <Button
              key="next"
              type="button"
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
