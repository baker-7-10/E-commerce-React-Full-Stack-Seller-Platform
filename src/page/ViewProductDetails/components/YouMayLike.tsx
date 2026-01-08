import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { MyProductType } from '@/types/product.type';
import useRedux from '@/hooks/useRedux';
import ShowProduct from '@/components/ShowProduct';
import BoxBroduct from '@/components/boxProduct/BoxPoduct';


const YouMayLike = ({ ProductDetails }: { ProductDetails: MyProductType }) => {
  const { appSelector } = useRedux();
  const { Data } = appSelector((state) => state.product);
  const { userRecommendations  , randomProduct} = appSelector((state) => state.product);
  const dataMayLike = Data.filter(
    (arr) => arr.category === ProductDetails.category
  );
  const finalData: MyProductType[] = userRecommendations.length > 0 ? userRecommendations : randomProduct;
  
  return (
    <div className=" w-[100%] relative">
      <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mx-3 sm:mx-5 text-center drop-shadow-md my-10 ">
        Smart Recommendations
      </h1>

      <ShowProduct
        noButton={false}
        buttonText="View All Products"
        noTextAbout={false}
      >
        <Swiper
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {finalData?.map((product) => (
            <SwiperSlide key={product.id}>
              <BoxBroduct product={product} idItem={product.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ShowProduct>
      <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mx-3 sm:mx-5 text-center drop-shadow-md my-10 ">
        You May Like
      </h1>

      <ShowProduct
        noButton={false}
        buttonText="View All Products"
        noTextAbout={false}
      >
        <Swiper
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {dataMayLike?.map((product) => (
            <SwiperSlide key={product.id}>
              <BoxBroduct product={product} idItem={product.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ShowProduct>
    </div>
  );
};
export default YouMayLike;
