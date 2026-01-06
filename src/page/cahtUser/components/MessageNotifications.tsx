import { useNavigate } from 'react-router-dom';
import ReceiverUser from './ReceiverUser';
import useRedux from '@/hooks/useRedux';
import useUser from '@/hooks/useUser';
import usePublicUser from '@/hooks/usePublicUser';
import { useOnlineUser } from '@/hooks';
import { showChatUser } from '@/store/features/User/userSlice';
import Spinner from '@/components/Spinner';

function MessageNotifications() {
  const navigate = useNavigate();
  const { appSelector, dispatch } = useRedux();
  const { ReceiverChat } = appSelector((state) => state.UserData);
  const { user } = useUser();
  const { onlineUsers } = useOnlineUser();
  const userId = user?.id;
  
  // Renaming for clarity: 'data' is generic, 'publicUsers' is specific
  const { data: ALLUserData, isLoading } = usePublicUser(); 

  const handleNavigate = (receiverId: string) => {
    if (!userId || !ALLUserData) return;

    const dataUser = ALLUserData.find((arr) => arr.id === receiverId);

    if (!dataUser) return;

    dispatch(
      showChatUser({
        receiverId,
        userId,
        seller_name: dataUser.name,
        avatar: dataUser.avatar,
      })
    );
    navigate(`/ChatPage`);
  };

  // --- THE FIX IS HERE ---
  // Option 1: Remove curly braces for implicit return
  const sender = ReceiverChat?.filter((chat) => chat?.name !== user?.name);
  
  // Option 2 (Alternative): Keep curly braces but add 'return'
  // const sender = ReceiverChat?.filter((chat) => { return chat?.name !== user?.name });

  return (
    <div>
      {/* Improved Loading Logic: Spinner should show if loading, regardless of online users */}
      {isLoading ? (
        <Spinner />
      ) : sender?.length > 0 ? (
        <div className="flex gap-4 justify-center flex-wrap cursor-pointer bg-gray-100 p-5 rounded-lg shadow-lg">
          {sender.map((chatItem) => (
            <ReceiverUser
              key={chatItem.sender_id || chatItem.id} // Ensure Key is unique
              handleNavigate={handleNavigate}
              e={chatItem}
              userId={`${userId}`}
              onlineUsers={onlineUsers}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No User</div>
      )}
    </div>
  );
}

export default MessageNotifications;