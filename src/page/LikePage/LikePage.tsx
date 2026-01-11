import { Link } from 'react-router-dom';
import useRedux from '../../hooks/useRedux';
import useUser from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import { selectProductFavorite } from '@/backend/apiProductFavorite';
import usefetchFavorites from '@/hooks/usefetchFavorites';
import BoxBroduct from '@/components/boxProduct/BoxPoduct';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';

function LikePage() {
  const { user } = useUser();
  if (!user) return;
 const {data , isLoading} =  usefetchFavorites(user.id);

if(data === undefined) return <div>loading</div>
if(isLoading) return <div>loading</div>


  return (
   <section className="min-h-screen w-full px-4 py-12 md:mt-20">
      {data.length > 0 ? (
        <div className="mx-auto max-w-7xl">
          {/* Header Section with Glassmorphism */}
          <div className="mb-10 rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 text-center backdrop-blur-md">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              <span className="text-red-600">Liked</span> Products
            </h1>
            <p className="mt-2">
              Your curated list of favorites.
            </p>
          </div>

          {/* Grid Layout (Better than Flex for Product lists) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((like) => (
              <div 
                key={like.DataOfProduct.id} 
                className="transform transition-all hover:-translate-y-1 hover:shadow-xl"
                data-testid="like-product"
              >
                {/* Kept your original component name */}
                <BoxBroduct 
                  product={like.DataOfProduct} 
                  idItem={like.DataOfProduct.id} 
                  noButton={true} 
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Enhanced Empty State */
        <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 px-4 text-center backdrop-blur-sm">
          <div className="mb-6 rounded-full bg-slate-800 p-6 ring-1 ring-slate-700">
            <FaHeart size={48} className="" />
          </div>
          
          <h2 className="mb-2 text-2xl font-bold text-slate-200">
            No favorites yet
          </h2>
          <p className="mb-8 max-w-md">
            You haven't liked any products yet. Browse our collection and heart the things you love!
          </p>

          <Link
            to="/"
            className="group flex items-center gap-2 rounded-lg bg-red-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-600 active:scale-95"
          >
            <FaArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>
      )}
    </section>
  );
}

export default LikePage;
