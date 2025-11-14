import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Time from './Time';
import { FreeMode, Pagination } from 'swiper/modules';
import useRedux from '@/hooks/useRedux';
import BoxBroduct from '@/components/boxProduct/BoxPoduct';
import ShowProduct from '@/components/ShowProduct';


function FlachSales() {
  const { appSelector } = useRedux();
  const { BestSellingProducts: Data } = appSelector((state) => state.product);

  return (
    <div className="w-[100%] relative">
      <div className="absolute top-[-200px]">
        <p className="text-red-600 space-x-2 mb-6">
          <span className="p-2 rounded-sm bg-red-600">|</span>
          <span> Today’s</span>
        </p>

        <div className="font-extrabold text-xl sm:space-x-16 mb-6 flex-col sm:flex-row justify-around flex sm:justify-between">
          <h1 className="text-[20px] w-full flex justify-center items-center">
            Flash Sales
          </h1>
          <h1 className="flex justify-center items-center w-full">
            <Time />
          </h1>
        </div>
      </div>

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
          {Data.map((product) => (
            <SwiperSlide key={product.id} className=' p-6   '>
              <BoxBroduct product={product} idItem={product.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ShowProduct>
    </div>
  );
}

export default FlachSales;
