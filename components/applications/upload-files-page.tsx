// uploads.tsx
"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FileText } from "lucide-react";
import React from "react";
import { Control } from "react-hook-form";
import { FileInput } from "./form-fields/file-input";

interface UploadsProps {
  control: Control<any>;
}

export const Uploads: React.FC<UploadsProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="resume"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <FileText className="mr-2 h-4 w-4" />
              Resume
            </FormLabel>
            <FormControl>
              <FileInput
                onChange={field.onChange}
                accept=".pdf"
                id="resume-upload"
                label="Upload Resume"
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="coverLetter"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <FileText className="mr-2 h-4 w-4" />
              Cover Letter
            </FormLabel>
            <FormControl>
              <FileInput
                onChange={field.onChange}
                accept=".pdf"
                id="cover-letter-upload"
                label="Upload Cover Letter"
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
};
