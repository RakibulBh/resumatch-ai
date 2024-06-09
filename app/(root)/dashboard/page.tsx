import Navbar from "@/components/navbar";
import { SubmitResumeForm } from "@/components/submitResumeForm";
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
            <SubmitResumeForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
