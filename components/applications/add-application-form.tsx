"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createApplication } from "@/app/applications/actions";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { findUserByClerkId } from "@/app/actions";

const formSchema = z.object({
  jobTitle: z.string().min(2),
  companyName: z.string().min(2),
  jobLocation: z.string().min(2),
  jobDescription: z.string().min(5),
  jobType: z.string().min(2),
  applicationDate: z.string(),
  applicationStatus: z.string().min(2),
  applicationLink: z.string().optional(),
  applicationNotes: z.string().optional(),
  jobReferenceNumber: z.string().optional(),
  applicationDeadline: z.string().optional(),
  resume: z.string().optional(),
  coverLetter: z.string().optional(),
  referral: z.boolean(),
  referralSource: z.string().optional(),
  referralContact: z.string().optional(),
});

const requiredFields = (form: any) => {
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="Jr. Software Engineer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input placeholder="Google" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="jobLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Location</FormLabel>
            <FormControl>
              <Input placeholder="Mountain View, CA" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const furtherInfo = (form: any) => {
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="jobDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Description</FormLabel>
            <FormControl>
              <Input placeholder="Software Engineer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Type</FormLabel>
            <FormControl>
              <Input placeholder="Full-time" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="applicationDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Application Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="applicationStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Application Status</FormLabel>
            <FormControl>
              <Input placeholder="Applied" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="applicationLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Application Link</FormLabel>
            <FormControl>
              <Input placeholder="https://google.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const extraInfo = (form: any) => {
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="applicationNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Application Notes</FormLabel>
            <FormControl>
              <Input placeholder="Notes" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="jobReferenceNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Reference Number</FormLabel>
            <FormControl>
              <Input placeholder="123456" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="applicationDeadline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Application Deadline</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const uploads = (form: any) => {
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="resume"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Resume</FormLabel>
            <FormControl>
              <Input placeholder="Resume" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="coverLetter"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cover Letter</FormLabel>
            <FormControl>
              <Input placeholder="Cover Letter" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const referralInfo = (form: any) => {
  return (
    <div className="space-y-2">
      <FormItem>
        <FormLabel>Referral</FormLabel>
        <FormControl>
          <Input type="checkbox" {...form.register("referral")} />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
      <FormField
        control={form.control}
        name="referralSource"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Referral Source</FormLabel>
            <FormControl>
              <Input placeholder="LinkedIn" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="referralContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Referral Contact</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const AddApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useUser();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobLocation: "",
      jobDescription: "",
      jobType: "",
      applicationDate: new Date().toISOString(),
      applicationStatus: "",
      applicationLink: "",
      applicationNotes: "",
      jobReferenceNumber: "",
      applicationDeadline: "",
      resume: "",
      coverLetter: "",
      referral: false,
      referralSource: "",
      referralContact: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData: FormData = new FormData();

    const mongoUser = await findUserByClerkId(user?.id);
    formData.append("userId", mongoUser?._id);

    for (const key in values) {
      formData.append(key, values[key]);
    }

    const response = await createApplication(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {currentStep === 0 && requiredFields(form)}
        {currentStep === 1 && furtherInfo(form)}
        {currentStep === 2 && extraInfo(form)}
        {currentStep === 3 && uploads(form)}
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
