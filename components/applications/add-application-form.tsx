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
import { BasicJobInfo } from "./form-fields/basic-job-info";
import { ApplicationDetails } from "./form-fields/application-details";
import { AdditionalInformation } from "./form-fields/additional-information";

type FormValues = z.infer<typeof formSchema>;

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
  async function onSubmit(values: FormValues) {
    const formData: FormData = new FormData();

    const mongoUser = await findUserByClerkId(user?.id);
    formData.append("userId", mongoUser?._id);

    (Object.keys(values) as Array<keyof FormValues>).forEach((key) => {
      const value = values[key];
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    mutateAsync(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {currentStep === 0 && BasicJobInfo(form)}
        {currentStep === 1 && ApplicationDetails(form)}
        {currentStep === 2 && AdditionalInformation(form)}
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
