"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY, // Ensure you have your API key in environment variables
});

export const getResumeTailor = async (
  resume: string,
  jobDescription: string
) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Act as a professional resume tailorer, You are going to be given a resume and a job description, your role is to tailor the resume so that it matches the job description, for example, if the resume has a skill section i want you to match the job's skills and put them in the resume's skills sections. Your job is to only send back the updated resume and nothing else, make sure to keep the same format as the resume given. Put it in such format that it can be converted back to a pdf file while still looking good. The resume may also have personal summaries or an interests section, make sure you change those sections so it matches with the job role, overall make sure that the resume is perfectly tailored for the job. ",
        },
        {
          role: "user",
          content: `Here is the resume: ${resume}\n\n and here is the job description: ${jobDescription} `,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw new Error("Failed to get AI response");
  }
};
