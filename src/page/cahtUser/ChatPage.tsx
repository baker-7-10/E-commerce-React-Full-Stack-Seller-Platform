import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { ChatMessageType } from '@/types/chats.type';
import useRedux from '@/hooks/useRedux';
import useUser from '@/hooks/useUser';
import useReadChats from '@/hooks/useReadChats';
import useInsertMassage from '@/hooks/UseInsertMassage';
import { getDataChats, showChatUser } from '@/store/features/User/userSlice';
import ChatMassage from './components/ChatMassage';
import Spinner from '@/ui/Spinner';

function ChatPage() {
  const uniqueId = uuidv4();
  const { dispatch, appSelector } = useRedux();
  const { user } = useUser();
  const userId = user?.id;
  const { forHowYouChat } = appSelector((state) => state.UserData);
  const { data: chatData } = useReadChats(userId || '');
  if (!forHowYouChat) return null;
  const youCantMassageYourSelf = userId === forHowYouChat.id;

  useEffect(() => {
    if (!chatData || !userId) return;
    dispatch(getDataChats(chatData));
    dispatch(
      showChatUser({
        receiverId: String(forHowYouChat.id),
        userId,
        seller_name: forHowYouChat.name,
        avatar: forHowYouChat.avatar,
      })
    );
  }, [
    chatData,
    dispatch,
    userId,
    forHowYouChat.id,
    forHowYouChat.name,
    forHowYouChat.avatar,
  ]);

  const { isLoading, mutate } = useInsertMassage();
  const [message, setMassage] = useState<string>('');
  const handelInsertMassage = () => {
    if (!message) return;
    const newRow: ChatMessageType = {
      message,
      message_id: uniqueId,
      sender_id: String(userId),
      receiver_id: String(forHowYouChat.id),
    };
    mutate(newRow);
    setMassage('');
  };

  return (
    <>
      {!youCantMassageYourSelf ? (
        <div className="h-screen  flex items-center justify-center p-4">
          <div className="w-full  bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-between">
            <ChatMassage />
            <div className="mt-4">
              <input
                onChange={(e) => {
                  setMassage(e.target.value);
                }}
                value={message}
                type="text"
                placeholder="Type your message..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                disabled={isLoading}
                className="mt-2 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={handelInsertMassage}
              >
                {isLoading ? <Spinner /> : 'Send'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-2xl font-bold text-gray-800 mb-4">Oops!</p>
            <p className="text-lg text-gray-600 mb-4">
              You can t message yourself 🙂
            </p>
            <Link
              to="-1"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Go Back
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatPage;
