import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/../index.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useRedux from '@/hooks/useRedux';
import { MyProductType } from '@/types/product.type';
import Spinner from '@/components/Spinner';
import { useRecommendations } from '@/hooks/use-ecommendations';
import useUser from '@/hooks/useUser';
import { IoSparkles } from 'react-icons/io5';
import { FaChevronLeft, FaChevronRight, FaShoppingBag } from 'react-icons/fa';

type Props = {
  userId: string;
};

const Recommendations = () => {
  const { appSelector } = useRedux();

  const { randomProduct  , userRecommendations} = appSelector((state) => state.product);
    const [currentSlide, setCurrentSlide] = useState(0);



  // recommendations.data.Electronics

  const progressCircle = useRef<HTMLDivElement | null>(null);
  const progressContent = useRef<HTMLDivElement | null>(null);

  const onAutoplayTimeLeft = (_: any, time: number, progress: number) => {
    progressCircle.current?.style.setProperty(
      '--progress',
      `${1 - progress}`
    );

    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const finalData: MyProductType[] = userRecommendations &&  randomProduct;

console.log( randomProduct);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % finalData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + finalData.length) % finalData.length);
  };

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-2 md:p-4">
  <div className="w-full max-w-6xl">
    {/* Main Slider Container */}
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {finalData.map((item) => (
          <div key={item.id} className="min-w-full">
            <div className="relative bg-gradient-to-br p-6 sm:p-10 md:p-16">
              {/* Decorative Elements - Hidden on small screens for performance */}
              <div className="hidden sm:block absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="hidden sm:block absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Content Side */}
                <div className="text-white space-y-4 md:space-y-6 text-center md:text-left order-2 md:order-1">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                    <IoSparkles className="w-4 h-4 text-yellow-400" />
                    <span>Exclusive Offer</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                    {item.title}
                  </h2>

                  {/* Discount */}
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-lg md:text-2xl font-semibold opacity-90">
                      Save up to
                    </p>
                    <div className="inline-flex items-baseline gap-2">
                      <span className="text-5xl md:text-7xl font-black text-yellow-400">
                        20%
                      </span>
                      <span className="text-xl md:text-2xl font-medium opacity-90">
                        OFF
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => (window.location.href = `${item.category}/${item.id}`)}
                      className="group relative inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <FaShoppingBag className="w-5 h-5" />
                        Shop Now
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </button>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                    <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                      <p className="text-xs md:text-sm opacity-80">Free Shipping</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                      <p className="text-xs md:text-sm opacity-80">2 Years Warranty</p>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="relative order-1 md:order-2 px-4 md:px-0">
                  <div className="relative z-10 transform hover:rotate-2 transition-transform duration-500">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl transform rotate-3 md:rotate-6"></div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="relative z-10 w-full h-56 sm:h-72 md:h-96 object-cover rounded-2xl md:rounded-3xl shadow-2xl"
                    />
                  </div>

                  {/* Floating Badge - Scaled for mobile */}
                  <div className="absolute -top-4 -right-2 md:-top-4 md:-right-4 z-20 bg-yellow-400 text-gray-900 w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                    <div className="text-center font-bold">
                      <div className="text-lg md:text-2xl">-20%</div>
                      <div className="hidden md:block text-xs">Discount</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {finalData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 md:w-12 bg-white"
                : "w-2 md:w-3 bg-white/50 hover:bg-white/70"
            } h-2 md:h-3`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>

    {/* Info Cards Below - Responsive Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 text-white text-center">
        <div className="text-xl md:text-2xl font-bold">2M+</div>
        <div className="text-xs md:text-sm opacity-70">Happy Customers</div>
      </div>
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 text-white text-center">
        <div className="text-xl md:text-2xl font-bold">50K+</div>
        <div className="text-xs md:text-sm opacity-70">Products Available</div>
      </div>
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 text-white text-center">
        <div className="text-xl md:text-2xl font-bold">4.9★</div>
        <div className="text-xs md:text-sm opacity-70">Customer Rating</div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Recommendations;
