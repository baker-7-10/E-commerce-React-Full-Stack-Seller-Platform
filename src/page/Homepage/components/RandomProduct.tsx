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


console.log(userRecommendations);

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

  const finalData: MyProductType[] = userRecommendations || randomProduct;



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
 <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Main Slider Container */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          {/* Slides */}
          <div 
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {finalData.map((item, index) => (
              <div
                key={item.id}
                className="min-w-full"
              >
                <div className={`relative bg-gradient-to-br  p-8 md:p-16`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48 blur-3xl"></div>
                  
                  <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    {/* Content Side */}
                    <div className="text-white space-y-6">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                        <IoSparkles className="w-4 h-4" />
                        <span>عرض حصري</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                        {item.title}
                      </h2>

                      {/* Discount */}
                      <div className="space-y-2">
                        <p className="text-xl md:text-2xl font-semibold">
                          خصم يصل إلى
                        </p>
                        <div className="inline-flex items-baseline gap-2">
                          <span className="text-6xl md:text-7xl font-black">
                            {item.discount}%
                          </span>
                          <span className="text-2xl font-medium opacity-90">
                            OFF
                          </span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => window.location.href = `${item.category}/${item.id}`}
                        className="group relative inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <FaShoppingBag className="w-5 h-5" />
                          اشترِ الآن
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                      </button>

                      {/* Features */}
                      <div className="flex gap-4 pt-4">
                        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <p className="text-sm opacity-80">شحن مجاني</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <p className="text-sm opacity-80">ضمان سنتين</p>
                        </div>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className="relative">
                      <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl transform rotate-6"></div>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="relative z-10 w-full h-80 md:h-96 object-cover rounded-3xl shadow-2xl"
                        />
                      </div>
                      
                      {/* Floating Badge */}
                      <div className="absolute -top-4 -right-4 z-20 bg-yellow-400 text-gray-900 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                        <div className="text-center font-bold">
                          <div className="text-2xl">-{item.discount}%</div>
                          <div className="text-xs">خصم</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all hover:scale-110"
            aria-label="Previous"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all hover:scale-110"
            aria-label="Next"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {finalData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all rounded-full ${
                  index === currentSlide 
                    ? 'w-12 bg-white' 
                    : 'w-3 bg-white/50 hover:bg-white/70'
                } h-3`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info Cards Below */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white text-center">
            <div className="text-2xl font-bold">2M+</div>
            <div className="text-sm opacity-80">عملاء سعداء</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white text-center">
            <div className="text-2xl font-bold">50K+</div>
            <div className="text-sm opacity-80">منتج متاح</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white text-center">
            <div className="text-2xl font-bold">4.9★</div>
            <div className="text-sm opacity-80">تقييم العملاء</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
