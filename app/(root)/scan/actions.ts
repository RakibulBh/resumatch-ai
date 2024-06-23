"use server";
import { createClerkSupabaseClient } from "@/utils/supabase/server";

export const findScanById = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase.from("Tailors").select().eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

export const uploadPDF = async (scanId: any, pdfBuffer: any) => {
  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase.storage
    .from("resumes")
    .upload(`scans/${scanId}.pdf`, pdfBuffer, {
      cacheControl: "3600",
      upsert: true,
      contentType: "application/pdf",
    });

  if (error) throw new Error(`Failed to upload PDF: ${error.message}`);

  return data;
};
