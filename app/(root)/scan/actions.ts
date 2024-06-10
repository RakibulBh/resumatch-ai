import { createClerkSupabaseClient } from "@/utils/supabase/server";

export const findScanById = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase.from("Tailors").select().eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};
