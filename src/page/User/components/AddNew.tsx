import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyProductType } from "@/types/product.type";
import useRedux from "@/hooks/useRedux";
import useDeleteProduct from "@/hooks/useDeleteProduct";
import Spinner from "@/components/Spinner";
import { setProductToEdit } from "@/store/features/User/userSlice";
import { FaEdit, FaEye, FaHeart, FaTrash } from "react-icons/fa";

function AddNew({ product }: { product: MyProductType }) {
  const { dispatch } = useRedux();
  const navigate = useNavigate();

  // ===============================
  // Edit product
  const handelEditProduct = () => {
    dispatch(setProductToEdit(product));
    navigate("/Gg");
  };

  // ===============================
  // Delete product
  const { deleteProductById, isLoading } = useDeleteProduct();

  // ===============================
  // View product
  const goToProduct = () => {
    navigate(`/product/${product.id}`);
  };




  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-sm rounded-lg shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Image */}
          <div className="relative w-full h-64 overflow-hidden bg-gray-200">
            <img
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              src={product.image}
              alt={product.title}
            />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between h-80">
            {/* Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {product.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Price:</span>
                  <span className="text-lg font-bold text-blue-600">
                    ${product.price}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">Category:</span>
                  <span className="text-gray-600">{product.category}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">Stock:</span>
                  <span
                    className={
                      product.stock > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.stock} items
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400">
                {product.created_at.slice(0, 10)}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => deleteProductById(product.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
                >
                  <FaTrash size={16} />
                  Delete
                </button>

                <button
                  onClick={handelEditProduct}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
                >
                  <FaEdit size={16} />
                  Edit
                </button>

                <button
                  onClick={goToProduct}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
                >
                  <FaEye size={16} />
                  View
                </button>
              </div>

              {/* Likes */}
              <div className="flex items-center justify-center gap-3 pt-2 border-t border-gray-200">
                <button
                  className="flex items-center gap-2 group"
                >
                  {/* <FaHeart
                    size={24}
                    className={`transition-all duration-300 transform ${
                      isLiked
                        ? "fill-red-500 text-red-500 scale-125"
                        : "text-gray-400 group-hover:text-red-400"
                    }`}
                  /> */}
                </button>

                <span className="text-sm font-semibold text-gray-700">
                  {/* {likeCount} */}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddNew;
