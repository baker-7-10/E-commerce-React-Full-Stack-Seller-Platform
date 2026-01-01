import supabase from "./supabase";

export const getRecommendations = async (userId: string) => {
  const { data, error } = await supabase
    .from("recommendation_category")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
