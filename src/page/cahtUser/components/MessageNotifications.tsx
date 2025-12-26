import { Link, useNavigate } from 'react-router-dom';
import ReceiverUser from './ReceiverUser';
import useRedux from '@/hooks/useRedux';
import useUser from '@/hooks/useUser';
import usePublicUser from '@/hooks/usePublicUser';
import OnlineUser from './OnlineUser';
import { FaPhoneAlt } from "react-icons/fa";
import { useOnlineUser } from '@/hooks';
import { showChatUser } from '@/store/features/User/userSlice';
import Spinner from '@/components/Spinner';


function MessageNotifications() {
  const navigate = useNavigate();
  const { appSelector, dispatch } = useRedux();
  const { ReceiverChat } = appSelector((state) => state.UserData);
  const { user } = useUser();
  const {onlineUsers} = useOnlineUser()
  const userId = user?.id;
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

  return (
    <div>
  {/* <OnlineUser userNum={onlineUsers.length}/> */}

      {isLoading && onlineUsers.length > 0 ? (
        <Spinner />
      ) : ReceiverChat?.length > 0 ? (
        <div className="flex gap-4 justify-center flex-wrap cursor-pointer bg-gray-100 p-5 rounded-lg shadow-lg">
          {ReceiverChat?.map((e) => (
            <ReceiverUser
              key={e.sender_id}
              handleNavigate={handleNavigate}
              e={e}
              userId={`${userId}`}
              onlineUsers={onlineUsers}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">no chats</div>
      )}
    </div>
  );
}

export default MessageNotifications;
