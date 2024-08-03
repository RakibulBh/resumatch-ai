"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createApplication } from "@/app/applications/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { findUserByClerkId } from "@/app/actions";
import { Switch } from "@/components/ui/switch";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";
import {
  Activity,
  Briefcase,
  Building2,
  Calendar,
  File,
  FileText,
  Hash,
  Link,
  MapPin,
  Paperclip,
  StickyNote,
  X,
  UserPlus,
  LinkedinIcon,
  User,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { uploads } from "./upload-files-page";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  applicationDeadline: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Application Deadline must be a valid date (YYYY-MM-DD)",
    }),
  resume: z.string().optional(),
  coverLetter: z.string().optional(),
  referral: z.boolean().default(false),
  referralSource: z.string().optional(),
  referralContact: z.string().optional(),
});

const requiredFields = (form: any) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <Briefcase className="mr-2 h-4 w-4" />
              Job Title
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. Jr. Software Engineer"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <Building2 className="mr-2 h-4 w-4" />
              Company Name
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. Google"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <MapPin className="mr-2 h-4 w-4" />
              Job Location
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. Mountain View, CA"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
};

export const furtherInfo = (form: any) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="jobDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <FileText className="mr-2 h-4 w-4" />
              Job Description
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. Developing web applications using React"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <Briefcase className="mr-2 h-4 w-4" />
              Job Type
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="applicationDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <Calendar className="mr-2 h-4 w-4" />
              Application Date
            </FormLabel>
            <FormControl>
              <Input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="applicationStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <Activity className="mr-2 h-4 w-4" />
              Application Status
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <SelectValue placeholder="Select application status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="offer">Offer Received</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="applicationLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <Link className="mr-2 h-4 w-4" />
              Application Link
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. https://company.com/job-application"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
};

export const extraInfo = (form: any) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="applicationNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <StickyNote className="mr-2 h-4 w-4" />
              Application Notes
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add any additional notes or comments about your application here..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobReferenceNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <Hash className="mr-2 h-4 w-4" />
              Job Reference Number
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. JOB123456"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="applicationDeadline"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <Calendar className="mr-2 h-4 w-4" />
              Application Deadline
            </FormLabel>
            <FormControl>
              <Input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
};

export const referralInfo = (form: any) => {
  return (
    <div className="space-y-6 bg-white rounded-lg shadow-sm">
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <FormLabel className="text-base flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-indigo-500" />
            Referral
          </FormLabel>
          <FormDescription className="text-sm text-gray-500">
            Do you have a referral for this job application?
          </FormDescription>
        </div>
        <Controller
          name="referral"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <Switch checked={value} onCheckedChange={onChange} />
          )}
        ></Controller>
      </FormItem>

      <FormField
        control={form.control}
        name="referralSource"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <LinkedinIcon className="mr-2 h-4 w-4 text-indigo-500" />
              Referral Source
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. LinkedIn, Company Website, Job Fair"
                {...field}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </FormControl>
            <FormDescription className="text-xs text-gray-500 mt-1">
              Where did you find this referral opportunity?
            </FormDescription>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="referralContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <User className="mr-2 h-4 w-4 text-indigo-500" />
              Referral Contact
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. John Doe, jane@example.com"
                {...field}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </FormControl>
            <FormDescription className="text-xs text-gray-500 mt-1">
              Name or contact information of your referral
            </FormDescription>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
};

export const AddApplicationForm = ({ onOpenChange }: { onOpenChange: any }) => {
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

    mutateAsync(formData);
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
