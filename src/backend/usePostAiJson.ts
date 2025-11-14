import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertMassage } from "./api_ai";

const usePostAiJson = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (row) => insertMassage(row),
    onSuccess: () => {
      queryClient.invalidateQueries(['Chats']);
    },
    onError: (err: Error) => {
      alert(err.message);
    },
  });

  return { isLoading, mutate };
};


// useInsertMassage 
// mutate({
//   senderId: "...",
//   receiverId: "...",
//   message: "...",
//   createdAt: new Date().toISOString(),
// });

export default usePostAiJson;
