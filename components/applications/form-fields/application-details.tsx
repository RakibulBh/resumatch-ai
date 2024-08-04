import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Briefcase, Calendar, FileText, Link } from "lucide-react";

export const ApplicationDetails = (form: any) => {
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
              <Textarea
                rows={3}
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
              Job Type <span className="ml-1 text-red-500">*</span>
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
                <SelectItem value="temporary">Temporary</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="consultant">Consultant</SelectItem>
                <SelectItem value="permanent">Permanent</SelectItem>
                <SelectItem value="seasonal">Seasonal</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="deg-apprenticeship">
                  Apprenticeship (Dergee)
                </SelectItem>
                <SelectItem value="apprenticeship">
                  Apprenticeship (Non-Dergee)
                </SelectItem>
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
              Application Date <span className="ml-1 text-red-500">*</span>
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
              Application Status <span className="ml-1 text-red-500">*</span>
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
                <SelectItem value="phone-screen">Phone Screen</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="final-interview">Final Interview</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="withdrawn">Withdrawn</SelectItem>
                <SelectItem value="not-interested">Not Interested</SelectItem>
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
