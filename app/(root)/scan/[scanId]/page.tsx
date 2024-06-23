import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import React from "react";
import { findScanById, uploadPDF } from "../actions";
import { redirect } from "next/navigation";
import puppeteer from "puppeteer";

const ScanDetails = async ({ params }: { params: { scanId: string } }) => {
  const scan = await findScanById(params.scanId);

  if (scan.length === 0) {
    redirect("/dashboard");
  }

  const handleDownload = () => {
    window.location.href = `/api/download-pdf?scanId=${scan}`;
  };

  const generatePDF = async ({ htmlContent }: { htmlContent: string }) => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
      margin: { top: 0, right: 0, bottom: 0, left: 0 }, // Set all margins to 0
      printBackground: true,
      format: "A4",
    });

    await browser.close();

    return pdfBuffer;
  };

  const pdfBuffer = generatePDF({ htmlContent: scan[0].ai_output });

  console.log(pdfBuffer);

  const uploadedPDF = await uploadPDF(params.scanId, pdfBuffer);

  // console.log(uploadedPDF);

  // handleDownload();

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
          <div
            id="resume-content"
            className="w-[70%] h-[40rem] rounded-xl border-2 border-gray-700 bg-white overflow-y-auto"
          >
            <p dangerouslySetInnerHTML={{ __html: scan[0].ai_output }}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanDetails;
