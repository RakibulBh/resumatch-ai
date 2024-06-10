import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import React from "react";
import { findScanById } from "../actions";
import { redirect } from "next/navigation";

const ScanDetails = async ({ params }: { params: { scanId: string } }) => {
  const scan = await findScanById(params.scanId);
  if (scan.length === 0) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full flex-1 flex items-center px-8">
        <div className="w-full flex gap-24">
          <div className="bg-white w-[30%] py-10 justify-between h-[40rem] rounded-xl flex flex-col items-center">
            <div className="text-center flex flex-col items-center">
              <div className="rounded-full w-20 h-20 bg-green-400 flex justify-center items-center">
                <Check className="text-white" size={24} />
              </div>
              <h1 className="text-3xl pt-8">
                Your resume is <br /> now tailored.
              </h1>
            </div>
            <Button>Download Resume</Button>
          </div>
          <div className="w-[70%] h-[40rem] rounded-xl border-2 border-gray-700 bg-white">
            <p>{scan[0].ai_output}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanDetails;
