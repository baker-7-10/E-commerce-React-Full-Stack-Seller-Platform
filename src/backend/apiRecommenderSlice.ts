import { useLinkClickHandler } from "react-router-dom";
import supabase from "./supabase";
import { C } from "vitest/dist/chunks/reporters.QZ837uWx";

export async function upsertProductFavorite({
  userId,
  Category,
}: {
  userId: string;
  Category: string;
}): Promise<void> {
  
  
  const { data: existing, error: checkError } = await supabase
    .from("Recommended-data")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    console.error(checkError);
    throw new Error("Error checking for existing favorite");
  }

  if (existing) {
   
    const { error: updateError } = await supabase
      .from("Recommended-data")
      .update({
        Categorys: Category, // تحديث الفئة
      })
      .eq("id", existing.id); 

    if (updateError) {
      console.error(updateError);
      throw new Error("Error updating existing favorite");
    }

  } else {
    const { error: insertError } = await supabase
      .from("Recommended-data")
      .insert([{ user_id: userId, Category }]);

    if (insertError) {
      console.error(insertError);
      throw new Error("Error inserting new favorite");
    }

  }
}
