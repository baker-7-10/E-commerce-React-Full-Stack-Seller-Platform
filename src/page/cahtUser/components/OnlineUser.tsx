
const OnlineUser = ({userNum}:{
  userNum : number
}) => {
  return (
    <div className="bg-blue-100 text-blue-800 text-sm font-medium py-2 px-4 flex justify-center items-center shadow-md">
      <div>
        There are <span className="mx-1 font-bold">{userNum}</span>
        users online now!
      </div>
    </div>
  );
};

export default OnlineUser;