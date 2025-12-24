import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useRedux from "@/hooks/useRedux";
import { MyProductType } from "@/types/product.type";
import useAddToFavorite from "@/hooks/useAddToFavorite";
import useUser from "@/hooks/useUser";
import usefetchFavorites from "@/hooks/usefetchFavorites";
import { deleteFromWishList } from "@/store/features/Wishlist/wishlistSlice";
import useWishlistAndCart from "@/hooks/useWishlistAndCart";
import { FaEye, FaFire, FaHeart, FaShoppingCart, FaStar, FaTag } from "react-icons/fa";
import { useState } from "react";

interface BoxProductProps {
  product: MyProductType;
  AddTo?: string;
  idItem: string;
  WasteBasket?: boolean;
  noButton?: boolean;
}

function BoxProduct({
  product,
  AddTo = "Add To WishList",
  idItem,
  WasteBasket = false,
  noButton,
}: BoxProductProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { dispatch } = useRedux();

  const { mutate, isLoading } = useAddToFavorite();
  const { data: favorites } = usefetchFavorites(user.id);
  const { itemStatus, itAdd, handleAddToWishlist } = useWishlistAndCart(product);

  const isLiked = favorites?.some((e) => e.DataOfProduct.id === idItem);

  // Original price fixed
  const originalPrice = (
    product.price +
    product.price * (product.discount / 100)
  ).toFixed(0);
  const [isHovered, setIsHovered] = useState(false);
  const handleAddToFavorite = () =>
    mutate({ userId: user.id, productId: idItem });

  const handleDelete = () => dispatch(deleteFromWishList(idItem));

  return (
   <div
      onClick={() => navigate(`/${product.category}/${idItem}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-80 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
      style={{
        transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Header Bar */}
      <div className="relative h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <FaFire className="text-yellow-300 animate-pulse" size={20} />
          <span className="text-white font-bold text-sm uppercase tracking-widest">Hot Deal</span>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToFavorite();
          }}
          className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all duration-300"
        >
          <FaHeart
            size={18}
            className={`transition-all duration-300 ${
              isLiked ? "fill-red-400 text-red-400 scale-110" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* Discount Corner Badge */}
      <div className="absolute top-12 right-0 z-30">
        <div className="relative">
          <div className="bg-gradient-to-br from-red-500 to-red-700 text-white px-6 py-3 rounded-l-2xl shadow-2xl">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black leading-none">-{product.discount}%</span>
              <span className="text-[10px] font-semibold uppercase">OFF</span>
            </div>
          </div>
          <div className="absolute -bottom-2 right-0 w-0 h-0 border-t-[8px] border-t-red-900 border-l-[8px] border-l-transparent"></div>
        </div>
      </div>

      {/* Product Image Section */}
      <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-8">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <img
          src={product.image}
          alt={product.title}
          className="w-52 h-52 object-contain relative z-10 transition-all duration-700"
          style={{
            transform: isHovered ? 'scale(1.2) translateY(-10px)' : 'scale(1)',
            filter: isHovered ? 'drop-shadow(0 25px 35px rgba(0,0,0,0.25))' : 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))'
          }}
        />

        {/* Quick Actions Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-8 gap-3 transition-all duration-500"
          style={{ 
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? 'auto' : 'none'
          }}
        >
          <button
            // onClick={handleAddToCart}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-10 py-4 font-bold flex items-center gap-3 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <FaShoppingCart size={22} />
            <span className="text-lg">Add to Cart</span>
          </button>
          
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-white text-sm font-semibold underline hover:text-blue-300 transition-colors"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-6 space-y-4">
        {/* Category & Stock */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1.5 rounded-full uppercase">
            <FaTag size={10} />
            {product.category}
          </span>
          <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-full">
            In Stock
          </span>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-xl text-gray-900 dark:text-white line-clamp-2 leading-tight min-h-[3.5rem] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
          {product.title}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={16}
                className={
                  i < Math.round(product.rating.rate)
                    ? "fill-amber-500 text-amber-500"
                    : "text-gray-300 dark:text-gray-600"
                }
              />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {product.rating.rate}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            ({product.rating.count} Reviews)
          </span>
        </div>

        {/* Price Section */}
        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Current Price</p>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                ${product.price}
              </p>
            </div>
            
            <div className="text-right space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
                Was ${originalPrice}
              </p>
              <p className="text-sm font-bold text-green-600 dark:text-green-400">
                Save $
              </p>
            </div>
          </div>

          {/* Progress Bar - Limited Stock Indicator */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-orange-600 dark:text-orange-400 font-semibold">Almost Sold Out!</span>
              <span className="text-gray-600 dark:text-gray-400">78% sold</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                style={{ width: isHovered ? '78%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
    </div>
  );
}

export default BoxProduct;



// import { faEye, faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Stars from "../Stars";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import useRedux from "@/hooks/useRedux";
// import { MyProductType } from "@/types/product.type";
// import ImgEffects from "./ImgEffects";
// import useAddToFavorite from "@/hooks/useAddToFavorite";
// import useUser from "@/hooks/useUser";
// import usefetchFavorites from "@/hooks/usefetchFavorites";
// import { deleteFromWishList } from "@/store/features/Wishlist/wishlistSlice";
// import Spinner from "../Spinner";

// interface BoxBroductProps {
//   product: MyProductType;
//   AddTo?: string;
//   idItem: string;
//   WasteBasket?: boolean;
//   noButton?: boolean;
// }

// function BoxBroduct({
//   product,
//   AddTo = "Add To WishList",
//   idItem,
//   WasteBasket = false,
//   noButton,
// }: BoxBroductProps) {
//   const {user} = useUser()
//   const { dispatch } = useRedux();
//   const { mutate, isLoading } = useAddToFavorite();
//  const {data} =  usefetchFavorites(user.id);

// const isLiked = data?.find((e) => e.DataOfProduct.id === idItem);

//   const handleDelete = () => {
//     dispatch(deleteFromWishList(idItem));
//   };

//   const handleAddToFavorite = () => {
//     mutate({
//       userId: user.id,  
//       productId: idItem , 
//     });

//   }

  