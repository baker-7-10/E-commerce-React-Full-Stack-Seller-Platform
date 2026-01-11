import { Link } from 'react-router-dom';
import useRedux from '../../hooks/useRedux';
import useUser from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import { selectProductFavorite } from '@/backend/apiProductFavorite';
import usefetchFavorites from '@/hooks/usefetchFavorites';
import BoxBroduct from '@/components/boxProduct/BoxPoduct';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

function LikePage() {
  const { user } = useUser();
  if (!user) return;
 const {data , isLoading} =  usefetchFavorites(user.id);

if(data === undefined) return <div>loading</div>
if(isLoading) return <div>loading</div>


  return (
    <>
      {data.length > 0 ? (
        <div className=" mt-[100px]  bg-slate-800/20 backdrop-blur-sm  " >
          <h1 className="  text-center mb-12 text-red-700   font-bold text-[30px] ">
            Product Liked
          </h1>
          <div className="flex    flex-row  flex-wrap  gap-16 justify-evenly ">
            {data.map((like) => (
              <div key={like.DataOfProduct.id} data-testid="like-product">
                <BoxBroduct product={like.DataOfProduct} idItem={like.DataOfProduct.id} noButton={true} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Link
          to="/"
          className=" flex justify-center  items-center  bg-red-700 text-white p-2 rounded-sm"
        >
          You haven`t Liked product press to Back Home
        </Link>
      )}
    </>
  );
}

export default LikePage;
