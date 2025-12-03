import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useRedux from "@/hooks/useRedux";
import { MyProductType } from "@/types/product.type";
import useAddToFavorite from "@/hooks/useAddToFavorite";
import useUser from "@/hooks/useUser";
import usefetchFavorites from "@/hooks/usefetchFavorites";
import { deleteFromWishList } from "@/store/features/Wishlist/wishlistSlice";
import useWishlistAndCart from "@/hooks/useWishlistAndCart";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

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

  const handleAddToFavorite = () =>
    mutate({ userId: user.id, productId: idItem });

  const handleDelete = () => dispatch(deleteFromWishList(idItem));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => navigate(`/${product.category}/${idItem}`)}
      className="group relative w-64 bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Hover BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Discount Badge */}
      <motion.div
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-20 shadow-md"
      >
        -{product.discount}%
      </motion.div>

      {/* Heart Button */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          handleAddToFavorite();
        }}
        className="absolute top-4 right-4 z-20 bg-white dark:bg-gray-800 rounded-full p-2.5 shadow-md hover:shadow-lg transition-all"
      >
        <motion.div
          animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaHeart
            size={20}
            className={`transition-all ${
              isLiked
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-500"
            }`}
          />
        </motion.div>
      </motion.button>

      {/* Image Container */}
      <div className="relative w-full h-72 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
        {/* Blur Decorations */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20" />
        </div>

        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={product.image}
          alt={product.title}
          className="w-48 h-48 object-cover relative z-10"
        />

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 backdrop-blur-sm"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              // Add-to-cart logic here
            }}
            className="bg-white text-black rounded-full px-6 py-3 font-semibold flex items-center gap-2 shadow-lg hover:bg-gray-100 transition-all"
          >
            <FaShoppingCart size={18} />
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative p-5 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={14}
                className={
                  i < Math.round(product.rating.rate)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.rating.count})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            ${product.price}
          </span>
          <span className="text-sm text-gray-400 line-through font-medium">
            ${originalPrice}
          </span>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
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

  