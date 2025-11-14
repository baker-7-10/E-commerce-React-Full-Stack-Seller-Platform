import { faEye, faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stars from "../Stars";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import useRedux from "@/hooks/useRedux";
import { MyProductType } from "@/types/product.type";
import ImgEffects from "./ImgEffects";
import useAddToFavorite from "@/hooks/useAddToFavorite";
import useUser from "@/hooks/useUser";
import usefetchFavorites from "@/hooks/usefetchFavorites";
import { deleteFromWishList } from "@/store/features/Wishlist/wishlistSlice";
import Spinner from "../Spinner";

interface BoxBroductProps {
  product: MyProductType;
  AddTo?: string;
  idItem: string;
  WasteBasket?: boolean;
  noButton?: boolean;
}

function BoxBroduct({
  product,
  AddTo = "Add To WishList",
  idItem,
  WasteBasket = false,
  noButton,
}: BoxBroductProps) {
  const {user} = useUser()
  const { dispatch } = useRedux();
  const { mutate, isLoading } = useAddToFavorite();
 const {data} =  usefetchFavorites(user.id);

const isLiked = data?.find((e) => e.DataOfProduct.id === idItem);

  const handleDelete = () => {
    dispatch(deleteFromWishList(idItem));
  };

  const handleAddToFavorite = () => {
    mutate({
      userId: user.id,  
      productId: idItem , 
    });

  }

  

  const calculateOriginalPrice = () =>
    (product.price + product.price * (product.discount / 100)).toFixed(0);

  const heartAnimation = {
    scale: true ? [1.1, 1.8, 1.1] : 1.1,
  };
  const navigate = useNavigate();


  return (
    
            <motion.div
      className="relative h-[380px] w-80 bg-white rounded-2xl shadow-lg overflow-hidden 
                 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      data-testid="box"
      onClick={()=> navigate(`/${product.category}/${idItem}`)}
      
    >
      <p className="absolute top-2 left-2 bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded-md z-10">
        -{product.discount}%
      </p>

      {WasteBasket ? (
        <p
          className="absolute right-2 top-2 z-10 cursor-pointer  dark:text-white hover:text-red-500 transition-all"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrashCan} size="lg" />
        </p>
      ) : (
        <motion.p
          animate={heartAnimation}
          transition={{ delay: 0, type: "tween", duration: 0.4 }}
          className="absolute right-2 top-2 z-10 cursor-pointer"
          onClick={ ()=> handleAddToFavorite()}
        >
          {!isLoading? (
            <FontAwesomeIcon
              icon={faHeart}
              className={`text-xl transition-all ${
                isLiked ? "text-red-600" : "text-gray-400 hover:text-red-600"
              }`}
            />
          ) : (
            <Spinner size="small" />
          )}
        </motion.p>
      )}

    

      <ImgEffects product={product} AddTo={AddTo} noButton={noButton} />

      <div className="p-4">
        <p className="font-semibold text-lg text-gray-800 dark:text-white truncate">
          {product.title}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-red-600 font-bold text-lg">${product.price}</span>
          <span className="text-gray-500 text-sm line-through">
            ${calculateOriginalPrice()}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <Stars numStare={product.rating.rate} />
          <span className="text-gray-400 text-sm">({product.rating.count})</span>
        </div>
      </div>
    </motion.div>

  );
}

export default BoxBroduct;
