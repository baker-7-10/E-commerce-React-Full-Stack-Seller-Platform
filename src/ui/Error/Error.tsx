import { Link } from 'react-router-dom';

function Error({
  type = '404 Not Found',
  text = 'Your visited page not found You may go home page.',
  NoBack = false,
}: {
  type?: string;
  text?: string;
  NoBack?: boolean;
}) {
  return (
    <div className="flex justify-center items-center flex-col h-svh ">
      <h1 className=" text-[80px]">{type}</h1>
      <p>{text}</p>
      {NoBack || (
        <Link
          to="/"
          className=" bg-red-700 py-3 px-2 text-white  rounded-sm mt-9"
        >
          Back to home page
        </Link>
      )}
    </div>
  );
}

export default Error;
