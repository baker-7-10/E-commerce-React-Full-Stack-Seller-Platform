import { getRecommendations } from "@/backend/apiRecommendations";
import { useQuery } from "@tanstack/react-query";

export const useRecommendations = (userId: string) => {
  return useQuery({
    queryKey: ["recommendations", userId],
    queryFn: () => getRecommendations(userId),
    enabled: !!userId,
    refetchInterval: 30 * 1000, 
  });
};
