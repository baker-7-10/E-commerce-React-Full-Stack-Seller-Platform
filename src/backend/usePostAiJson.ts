import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertMassage } from "./api_ai";

const usePostAiJson = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (row) => insertMassage(row),
    onSuccess: () => {
      queryClient.invalidateQueries(['ai']);
    },
    onError: (err: Error) => {
      alert(err.message);
    },
  });

  return { isLoading, mutate };
};




export default usePostAiJson;
