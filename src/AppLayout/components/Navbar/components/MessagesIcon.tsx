import useRedux from '@/hooks/useRedux';
import {  faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function MessagesIcon() {
  const { appSelector } = useRedux();
  const { ReceiverChat } = appSelector((state) => state.UserData);
 const num = ReceiverChat?.length - 1
  return (
    <>
      <div className=" relative">
        <Link to="/Messages" className=" relative ">
          <FontAwesomeIcon
            icon={faUserFriends}
            className=" w-6 h-6 cursor-pointer "
          />
        </Link>
        {num> 0 ? (
          <p className=" bg-red-600  w-2 h-2  p-2  right-1   top-[-10px]  flex justify-center items-center text-xs  rounded-full  absolute  text-white">
            {num}
          </p>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default MessagesIcon;
