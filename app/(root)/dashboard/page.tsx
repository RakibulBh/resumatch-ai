import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex items-center justify-center flex-1">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Welcome, Rakibul</h1>
          <div className="flex flex-col justify-between w-[80rem] h-[30rem] bg-white rounded-xl py-6 px-4">
            <p className="text-xl font-semibold">Create a new tailor</p>
            <div className="w-full flex gap-24">
              <div className="flex flex-col justify-between w-1/2 h-[20rem] p-4 bg-gray-200 rounded-xl">
                <Textarea
                  className="w-full h-[75%] bg-gray-200 rounded-b-none"
                  placeholder="Copy and paste resume..."
                />
                <Input
                  className="w-full h-[20%] bg-gray-200 rounded-t-none border-2 border-dashed border-blue-400"
                  id="resume"
                  type="file"
                />
              </div>
              <Textarea
                className="w-1/2 h-[20rem] bg-gray-200 p-4 rounded-xl"
                placeholder="Copy and paste the job description..."
              />
            </div>
            <div className="flex gap-x-6 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button>Scan</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
