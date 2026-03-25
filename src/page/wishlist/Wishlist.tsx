

import { Link } from 'react-router-dom';
import useRedux from '@/hooks/useRedux';
import { gitCartItem } from '@/store/features/Cart/CartSlice';
import { deleteAllFromWishList } from '@/store/features/Wishlist/wishlistSlice';
import BoxBroduct from '@/ui/boxProduct/BoxPoduct';
import ShowProduct from '@/ui/ShowProduct';


function Wishlist() {
  const { dispatch, appSelector } = useRedux();
  const { wishlistData } = appSelector((state) => state.wishlistData);

  const handelMoveAll = () => {
    dispatch(gitCartItem(wishlistData));
    dispatch(deleteAllFromWishList());
  };

  return (
    <div className="relative  pt-28 ">
      {wishlistData.length < 1 ? (
        <div className="flex justify-center  items-center ">
          <Link
            to="/"
            className=" flex justify-center  items-center  bg-red-700 text-white text-sm sm:text-base p-2 rounded-sm"
          >
            You haven`t added item to shopping list press to Back Home
          </Link>
        </div>
      ) : (
        <ShowProduct>
          <button
            className=" border-2 bg-red-600 text-white   p-2 mb-8 absolute top-[-60px]  left-32"
            onClick={() => handelMoveAll()}
          >
            Move All To Cart
          </button>

          <div
            className={`  relative flex  flex-row justify-center items-center gap-16    flex-wrap  `}
          >
            {wishlistData.map((data) => (
              <div key={data.id} className="">
                <BoxBroduct
                  product={data}
                  AddTo="Add To Cart"
                  idItem={data.id}
                  WasteBasket={true}
                  noButton={true}
                />
              </div>
            ))}
          </div>
        </ShowProduct>
      )}
    </div>
  );
}

export default Wishlist;
