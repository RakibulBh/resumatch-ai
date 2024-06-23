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
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  resumeText: z.string().min(1).max(5000),
  jobDescription: z.string().min(1),
});

export function SubmitResumeForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: "",
      jobDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const tailorId = await getResumeTailor(
      values.resumeText,
      values.jobDescription
    );
    setLoading(false);
    if (tailorId !== null) {
      router.push(`/scan/${tailorId}`);
    } else {
      toast({
        title: "Resume or Job Description is invalud",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="flex flex-col md:w-1/2 h-[20rem] justify-between p-4 bg-gray-200 rounded-xl">
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
          <div className="md:w-1/2">
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
          <Button disabled={loading} variant="outline">
            Cancel
          </Button>
          <Button disabled={loading} type="submit">
            {loading ? (
              <>
                <LoaderCircle className="mr-3" /> Scanning{" "}
              </>
            ) : (
              "Scan"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
