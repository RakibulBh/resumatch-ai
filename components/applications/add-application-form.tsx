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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import ApplicationStatusField from "./application-status-field";
import { DatePickerWithToday } from "./date-picker-with-today";
import { createApplication } from "@/app/applications/actions";
import { Label } from "@radix-ui/react-label";
import { FileUpload } from "./file-upload";
import BufferedFileUpload from "./buffered-file-upload";
import { toast } from "../ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid"; // Add this import

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

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Remote",
] as const;

const formSchema = z.object({
  jobTitle: z.string().min(2, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  jobLocation: z.string().min(2, "Job location is required"),
  jobDescription: z.string().optional(),
  jobType: z.enum(jobTypes),
  applicationDate: z.string(),
  applicationDeadline: z.string().optional(),
  applicationStatus: z.string().min(2, "Application status is required"),
  applicationLink: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  applicationNotes: z.string().optional(),
  jobReferenceNumber: z.string().optional(),
  resume: z.instanceof(ArrayBuffer).optional(),
  coverLetter: z.instanceof(ArrayBuffer).optional(),
  referral: z.boolean().default(false),
  referralSource: z.string().optional(),
  referralContact: z.string().optional(),
});

const AddApplicationForm = () => {
  const { user } = useUser();

  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobLocation: "",
      jobDescription: "",
      jobType: jobTypes[0],
      applicationStatus: "Not Applied",
      applicationLink: "",
      applicationNotes: "",
      jobReferenceNumber: "",
      applicationDate: new Date().toISOString().split("T")[0],
      applicationDeadline: "",
      referral: false,
      referralSource: "",
      referralContact: "",
      resume: undefined,
      coverLetter: undefined,
    },
  });

  const referralChecked = form.watch("referral");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    // Add userId
    formData.append("userId", user?.id || "");

    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof ArrayBuffer) {
        formData.append(key, new Blob([value]));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    const result = await createApplication(formData);
    if (result.success) {
      toast({
        title: "Application submitted successfully",
        description: "Your job application has been created.",
      });
    } else {
      toast({
        title: "Error submitting application",
        description: result.error,
        variant: "destructive",
      });
    }
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
                if (fieldName === "resume" || fieldName === "coverLetter") {
                  return <BufferedFileUpload field={field} label={label} />;
                }
                if (fieldName === "applicationDate") {
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Application Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <DatePickerWithToday field={field} />
                      <FormMessage />
                    </FormItem>
                  );
                } else if (fieldName === "applicationDeadline") {
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Application Deadline
                      </FormLabel>
                      <DatePickerWithToday field={field} />
                      <FormMessage />
                    </FormItem>
                  );
                } else if (fieldName === "applicationStatus") {
                  return <ApplicationStatusField field={field} />;
                } else if (fieldName === "jobType") {
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Job Type <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jobTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                } else if (
                  fieldName === "jobDescription" ||
                  fieldName === "applicationNotes"
                ) {
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        {label}
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
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      </FormControl>
                    </FormItem>
                  );
                } else if (
                  (fieldName === "referralSource" ||
                    fieldName === "referralContact") &&
                  !referralChecked
                ) {
                  return null;
                } else {
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        {label}
                        {/* {!field.isOptional && (
                          <span className="text-red-500">*</span>
                        )} */}
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
              key="submit"
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Application
            </Button>
          ) : (
            <Button
              key="next"
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
