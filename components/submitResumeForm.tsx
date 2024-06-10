"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { getResumeTailor } from "@/app/(root)/dashboard/actions";

const formSchema = z.object({
  resumeText: z.string().min(1),
  jobDescription: z.string().min(1),
});

export function SubmitResumeForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: "",
      jobDescription: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    getResumeTailor(values.resumeText, values.jobDescription);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-24">
          <div className="flex flex-col w-1/2 h-[20rem] justify-between p-4 bg-gray-200 rounded-xl">
            <FormField
              control={form.control}
              name="resumeText"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="h-[12rem] bg-gray-200 rounded-b-none"
                      placeholder="Copy and paste resume..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-[5rem] bg-gray-200 rounded-t-none border-2 rounded-xl border-dashed border-blue-400"
                      id="resume"
                      type="file"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="h-[20rem] bg-gray-200 p-4 rounded-xl"
                      placeholder="Copy and paste the job description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-x-6 justify-end">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Scan</Button>
        </div>
      </form>
    </Form>
  );
}
