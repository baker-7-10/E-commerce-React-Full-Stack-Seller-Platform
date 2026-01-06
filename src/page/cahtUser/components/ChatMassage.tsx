import { useEffect, useRef } from 'react';
import { IoCheckmarkDone } from 'react-icons/io5'; // Uncommented and fixed
import { ChatMessageType } from '@/types/chats.type';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import useRedux from '@/hooks/useRedux';
import useUser from '@/hooks/useUser';
import useUpdateChat from '@/hooks/useUpdateChat';

function ChatMassage() {
  const { appSelector } = useRedux();
  const { ChatUser, forHowYouChat } = appSelector((state) => state.UserData);
  const { user } = useUser();
  const { updateChatsById } = useUpdateChat();
  
  // Ref for auto-scrolling to the latest message
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleAddEmoji = (newEmoji: { icon: string; id: string }) => {
    updateChatsById({ emoji: newEmoji.icon, message_id: newEmoji.id });
  };

  // 1. FIX: Mark messages as read
  // We filter for messages that are NOT from me, and are NOT read yet
  useEffect(() => {
    if (ChatUser && ChatUser.length > 0 && user?.id) {
      const unreadMessages = ChatUser.filter(
        (msg: ChatMessageType) => 
          msg.sender_id !== user.id && // Message is from the other person
          msg.is_red !== true          // It is not read yet
      );

      if (unreadMessages.length > 0) {
        unreadMessages.forEach((message) => {
          updateChatsById({ ...message, is_red: true });
        });
      }
    }
  }, [ChatUser, user?.id, updateChatsById]);

  // 2. FEATURE: Auto-scroll to bottom when ChatUser changes
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ChatUser]);

  return (
    <div>
      <p className="font-bold text-2xl text-center mb-4 text-gray-500">
        Chatting with {forHowYouChat?.name}
      </p>

      {/* Chat Container */}
      <div className="flex-grow overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner h-[50vh]">
        {ChatUser?.map((msg) => (
          <div
            className={`flex ${
              msg.sender_id === user?.id ? 'justify-end' : 'justify-start'
            } mb-4`}
            key={msg.message_id}
          >
            <div
              className={`max-w-xs p-3 rounded-lg shadow group/item relative ${
                msg.sender_id === user?.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              }`}
            >
              {/* Emoji Reaction Bar (Only shows on Received messages) */}
              {user?.id !== msg.sender_id && (
                <div className="absolute bottom-2 right-2 invisible group-hover/item:visible bg-white w-28 h-8 rounded-lg flex justify-around items-center shadow-md z-10">
                  {['❤️', '👍', '😂', '😮', '😢'].map((icon) => (
                    <ReactEmoji
                      key={icon}
                      msg={msg}
                      handleAddEmoji={handleAddEmoji}
                      icon={icon}
                    />
                  ))}
                </div>
              )}

              {/* Read Receipt (Checkmarks) */}
              <p
                className={`absolute top-2 right-2 ${
                  msg.is_red ? 'text-blue-600' : 'text-white/70'
                }`}
              >
                <IoCheckmarkDone />
              </p>

              {/* Display Selected Emoji */}
              {msg?.emoji && (
                <p className="bg-slate-500 text-[15px] absolute bottom-[-15px] right-2 rounded-full p-[2px] w-fit shadow-sm border-2 border-white">
                  {msg.emoji}
                </p>
              )}

              {/* Message Content */}
              <p className="font-semibold pr-6">{msg.message}</p>
              
              {/* Timestamp */}
              <p className="text-[10px] mt-1 opacity-80 text-right">
                {msg.created_at
                  ? new Date(msg.created_at).toLocaleString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''}
              </p>
            </div>
          </div>
        ))}
        {/* Invisible div to target scroll */}
        <div ref={scrollRef} />
      </div>
    </div>
  );
}

// 3. FIX: Simplified ReactEmoji Component
const ReactEmoji = ({
  icon,
  handleAddEmoji,
  msg,
}: {
  icon: string;
  handleAddEmoji: (newEmoji: { icon: string; id: string }) => void;
  msg: ChatMessageType;
}) => {
  // Logic: If the clicked icon is ALREADY the message emoji, we remove it (send empty string).
  // Otherwise, we send the new icon.
  const handleEmojiClick = () => {
    const valueToSend = msg.emoji === icon ? '' : icon;
    handleAddEmoji({ icon: valueToSend, id: msg.message_id });
  };

  return (
    <span
      onClick={handleEmojiClick}
      className={`cursor-pointer transition-transform hover:scale-125 ${
        msg.emoji === icon ? 'bg-gray-200 rounded-full' : ''
      }`}
    >
      {icon}
    </span>
  );
};

export default ChatMassage;