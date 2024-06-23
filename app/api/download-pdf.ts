import { NextApiRequest, NextApiResponse } from "next";

import { createClerkSupabaseClient } from "@/utils/supabase/server";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = await createClerkSupabaseClient();

  const { scanId } = req.query;

  if (!scanId || typeof scanId !== "string")
    return res.status(400).send("scanId is required");

  const { data, error } = await supabase.storage
    .from("resumes")
    .download(`scans/${scanId}.pdf`);

  if (error)
    return res.status(500).send(`Failed to download PDF: ${error.message}`);

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader("Content-Disposition", `attachment; filename=${scanId}.pdf`);
};
