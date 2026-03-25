
import { useState } from 'react';
import Form from './components/Form';
import { CommentType } from '@/types/comment.type';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/backend/apiComments';
import Loading from '@/ui/Loading';
import Stars from '@/ui/Stars';

function Commentpage() {
  const [sortBy, setSortBy] = useState<string>('From the latest');
  const [showForm, setShowForm] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ['comments'],
    queryFn: getComments,
  });

  const sortFunctions: {
    [key: string]: (a: CommentType, b: CommentType) => number;
  } = {
    'From the latest': (a, b) =>
      new Date(b.created_at ?? 0).getTime() -
      new Date(a.created_at ?? 0).getTime(),
    'From the oldest': (a, b) =>
      new Date(a.created_at ?? 0).getTime() -
      new Date(b.created_at ?? 0).getTime(),
    'Least rating': (a, b) => a.yourRating - b.yourRating,
    'Highest rating': (a, b) => b.yourRating - a.yourRating,
    'alphabetical order': (a, b) => a.comment?.localeCompare(b.comment),
  };

  if (sortBy && sortFunctions[sortBy]) {
    data?.sort(sortFunctions[sortBy]);
  }

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <div className="relative  flex flex-col  gap-5  mt-32  flex-wrap justify-center        sm:flex-nowrap sm:flex-row w=[100%] ">
          <div className="   sm:w-[600px] flex  justify-center     h-7  relative mt-20    ">
            <p
              className="p-1 rounded-sm bg-red-600 text-white font-bold   w-44    text-center  cursor-pointer absolute top-[-40px]"
              onClick={() => setShowForm((e) => !e)}
            >
              Add Comment
            </p>
            {showForm && <Form setShowForm={setShowForm} />}
          </div>
          <div className="flex  justify-center  items-center gap-5  flex-col">
            {!showForm && (
              <select
                className="  right-2 block p-1  bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>From the oldest</option>
                <option>From the latest</option>
                <option>Highest rating</option>
                <option>Least rating</option>
                <option>alphabetical order</option>
              </select>
            )}
            <div
              className={`flex  gap-3 flex-col    items-center sm:w-[100%] min-w-[300px] m-4  ml-6 relative  h-[500px]  overflow-y-scroll ${
                showForm && 'mt-80  sm:mt-0'
              }`}
            >
              {data.map((arr) => (
                <div
                  key={arr.id}
                  className=" border-[1px] border-gray-300 relative p-3  w-[300px] rounded-md"
                >
                  <h1 className=" font-semibold  ">{arr.yourName}</h1>
                  <p className="text-gray-500   text-wrap">{arr.comment}</p>
                  <p />
                  <p className="absolute top-2 right-2">
                    {arr.created_at.slice(0, 10)}
                  </p>
                  <div>
                    <Stars numStare={arr.yourRating} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Commentpage;
