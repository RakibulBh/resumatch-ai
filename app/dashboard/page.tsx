"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { submitData } from "./actions";
import { getSignedURL } from "../applications/actions";
import { useUser } from "@clerk/nextjs";
import { computeSHA256 } from "@/utils/computeHash";
//

const formSchema = z.object({
  resumeText: z.string().min(1),
  jobDescription: z.string().min(1),
  resume: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required."),
});

function Dashboard() {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useUser();

  const uploadFile = async (formData: FormData, file: any) => {
    if (!file) return;

    const signedUrl = await getSignedURL({
      clerkUserId: user?.id,
      type: file.type,
      size: file.size,
      checksum: await computeSHA256(file),
    });

    if (signedUrl.error) {
      console.error(`Error getting signed URL:`, signedUrl.error);
      return;
    }

    const url = signedUrl.success?.url;

    await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    // formData.append(fileType, url.split("?")[0]);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: "",
      jobDescription: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    submitData(values);
  }

  return (
    <section className="bg-[#F3F8FC] min-h-screen flex justify-center items-center">
      <div className="w-[75%] h-[60%] bg-white rounded-xl shadow-md shadow-black flex flex-col p-10 gap-6">
        <div className="h-20 px-4 py-2 flex items-center justify-between bg-gradient-to-r from-indigo-500 rounded-xl">
          <p>
            Our new <strong>Power Edit</strong> experience has been enabled for
            your account.
          </p>
          <Button>Disable</Button>
        </div>
        <h1 className="text-3xl">Create a new scan</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-2 justify-between">
              <div className="w-1/2">
                <div className="border-dashed border-gray-200 border-2 p-2 text-center border-b-0 ">
                  Resume
                </div>
                <FormField
                  control={form.control}
                  name="resumeText"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="rounded-t-none"
                          cols={50}
                          placeholder="Copy and paste your resume"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <div className="border-dashed border-gray-200 border-2 p-2 text-center border-b-0">
                  Job Description
                </div>
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="rounded-t-none"
                          cols={50}
                          placeholder="Copy and paste your job description"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="resume"
              render={({ field: { onChange, value, ...rest } }) => {
                const [fileInfo, setFileInfo] = useState<string | null>(null);
                return (
                  <FormItem>
                    <FormLabel>Upload your resume</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          accept=".pdf"
                          id="resume"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                              setFileInfo(
                                `${file.name} (${(file.size / 1024).toFixed(
                                  2
                                )} KB)`
                              );
                            } else {
                              onChange(undefined);
                              setFileInfo(null);
                            }
                          }}
                          {...rest}
                        />
                        {fileInfo && (
                          <p className="mt-2 text-sm text-gray-500">
                            {fileInfo}
                          </p>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default Dashboard;
