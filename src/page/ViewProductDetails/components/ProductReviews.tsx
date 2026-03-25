import StarRating from './StarRating';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { CommentsOfProductType } from '@/types/CommentsOfProduct.type';
import { UseInsertNewReview, UseUser } from '@/hooks';
import Input from '@/ui/Input/Input';
import Replies from './Replies';

function ProductReviews({
  reviews,
  productId,
}: {
  reviews: CommentsOfProductType[];
  productId: string;
}) {
  const uniqueId = uuidv4();
  const { user } = UseUser();
  const { mutate } = UseInsertNewReview();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ rating: number; comment: string }>();

  async function onSubmit(newRow: { rating: number; comment: string }) {
    if (!user) return;
    const newRowWithId: CommentsOfProductType = {
      ...newRow,
      id: uniqueId,
      name: user.name,
      Product_ID: productId,
      User_ID: user.id,
      created_at: new Date(),
      Replies: [],
    };
    mutate(newRowWithId);
    reset();
  }
  const sortedReviews = reviews?.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  return (
    <div className="flex flex-col gap-6 p-6 border-t border-gray-300 bg-white rounded-md shadow-sm mt-10">
      <h2 className="text-xl font-semibold text-gray-800">Product Reviews</h2>

      <form
        className="flex flex-col gap-4 p-4 mt-6 border-t border-gray-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-lg font-semibold text-gray-700">Add Your Review</h3>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Rating:</label>
          <select
            {...register('rating', {
              required: 'Rating is required',
              valueAsNumber: true,
            })}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="0">Select Rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star}
              </option>
            ))}
          </select>
          {errors.rating?.message && (
            <span className="text-red-500">
              {String(errors.rating.message)}
            </span>
          )}
        </div>

        <Input
          label={'Comment'}
          register={register}
          name="comment"
          type="text"
          placeholder="Write your comment here"
        />
        {errors.rating?.message && (
          <span className="text-red-500">{String(errors.rating.message)}</span>
        )}

        <button
          type="submit"
          className="self-start px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>

      {sortedReviews && sortedReviews.length > 0 ? (
        sortedReviews.map((review: CommentsOfProductType, index: number) => (
          <div
            key={review.id}
            className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} />
              <span className="text-sm text-gray-600">
                ({review.rating} / 5)
              </span>
            </div>
            <p className=" text-gray-800 text-2xl">  {review.name}</p>
            <p className="text-xs text-gray-500"> {review.comment}</p>
            <div className="text-xs text-gray-400">
              {new Date(review.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>

            <Replies review={review} />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews available for this product.</p>
      )}

  
    </div>
  );
}

export default ProductReviews;
