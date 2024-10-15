"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

async function run() {
  // For text-only input, use the gemini-pro model
  const prompt = "";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

const submitData = ({
  resumeText,
  jobDescription,
}: {
  resumeText: string;
  jobDescription: string;
}) => {
  run();
};

export { submitData };
