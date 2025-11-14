import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertMassage } from '../backend/apiChat';
import { ChatMessageType } from '@/types/chats.type';

const useInsertMassage = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (row: ChatMessageType) => insertMassage(row),
    onSuccess: () => {
      queryClient.invalidateQueries(['Chats']);
    },
    onError: (err: Error) => {
      alert(err.message);
    },
  });

  return { isLoading, mutate };
};

export default useInsertMassage;



VITE_ai_endpoint
``