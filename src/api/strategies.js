import { supabase } from "@/lib/supabaseClient";

export async function addStrategyToDB(formData) {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const strategy = {
    ...formData,
    user_id: userId,
    tags: formData.tags?.split(',').map(t => t.trim()),
    steps: formData.steps,
    is_sample: formData.is_sample || false,
  };

  const { data, error } = await supabase.from("strategies").insert([strategy]);

  if (error) {
    console.error("❌ Error inserting strategy:", error.message);
    return { error };
  }

  return { data: data[0] };
}


export const getStrategyFromDB = async (id) => {
  const { data, error } = await supabase
    .from("strategies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("❌ Failed to fetch strategy:", error.message);
    return null;
  }

  return data;
};