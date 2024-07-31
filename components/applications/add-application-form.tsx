"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  CalendarIcon,
  Briefcase,
  Building,
  MapPin,
  FileText,
  FileSpreadsheet,
  Link2,
  ClipboardList,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ApplicationStatusField from "./application-status-field";

const statuses = [
  "Not Applied",
  "Applied",
  "Application Under Review",
  "Interview Scheduled",
  "Interviewed",
  "Second Interview",
  "Offer Received",
  "Offer Accepted",
  "Offer Declined",
  "Rejected",
];

const steps = [
  {
    title: "Job Details",
    fields: ["jobTitle", "companyName", "jobLocation", "jobType"],
  },
  {
    title: "Application Info",
    fields: ["applicationDate", "applicationStatus", "applicationLink"],
  },
  {
    title: "Additional Info",
    fields: [
      "jobDescription",
      "applicationNotes",
      "jobReferenceNumber",
      "applicationDeadline",
    ],
  },
  { title: "Documents", fields: ["resume", "coverLetter"] },
  {
    title: "Referral",
    fields: ["referral", "referralSource", "referralContact"],
  },
];

const formSchema = z.object({
  jobTitle: z.string().min(2, "Job title is required"),
  companyName: z.string().min(2, "Company name is required"),
  jobLocation: z.string().min(2, "Job location is required"),
  jobDescription: z.string().min(10, "Please provide a brief job description"),
  jobType: z.string().min(2, "Job type is required"),
  applicationDate: z.string().min(2, "Application date is required"),
  applicationStatus: z.string().min(2, "Application status is required"),
  applicationLink: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  applicationNotes: z.string().optional(),
  jobReferenceNumber: z.string().optional(),
  applicationDeadline: z.string().optional(),
  resume: z.instanceof(File).optional(),
  coverLetter: z.instanceof(File).optional(),
  referral: z.boolean().default(false),
  referralSource: z.string().optional(),
  referralContact: z.string().optional(),
});

const AddApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobLocation: "",
      jobDescription: "",
      jobType: "",
      applicationDate: "",
      applicationStatus: "Not Applied",
      applicationLink: "",
      applicationNotes: "",
      jobReferenceNumber: "",
      applicationDeadline: "",
      referral: false,
      referralSource: "",
      referralContact: "",
      resume: undefined,
      coverLetter: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const currentFields = steps[currentStep].fields;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
            {steps[currentStep].title}
          </h2>
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`h-2 flex-1 ${
                  index <= currentStep ? "bg-indigo-600" : "bg-gray-200"
                } ${index !== steps.length - 1 ? "mr-1" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {currentFields.map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as any}
              render={({ field }) => {
                const label = fieldName
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());
                if (fieldName === "applicationStatus") {
                  return <ApplicationStatusField field={field} />;
                } else if (
                  fieldName === "jobDescription" ||
                  fieldName === "applicationNotes"
                ) {
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        {label} <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                } else if (
                  fieldName === "resume" ||
                  fieldName === "coverLetter"
                ) {
                  return (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        {label} <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor={fieldName}
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <Input
                                  id={fieldName}
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(e) =>
                                    field.onChange(e.target.files?.[0])
                                  }
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, DOCX up to 10MB
                            </p>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                } else if (fieldName === "referral") {
                  return (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base font-medium text-gray-900">
                          Referral
                        </FormLabel>
                        <FormDescription>
                          Did you get a referral for this job?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  );
                } else {
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        {label} <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }
              }}
            />
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ChevronLeft className="inline-block mr-2 -ml-1 w-5 h-5" />
            Previous
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Application
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() =>
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
              }
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
              <ChevronRight className="inline-block ml-2 -mr-1 w-5 h-5" />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AddApplicationForm;
