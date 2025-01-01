import slide1 from "../../../src/assets/slide1.jpg";
import slide2 from "../../../src/assets/slide2.webp";
import slide3 from "../../../src/assets/slide3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide className="relative">
          <img className="h-[650px] w-full object-cover" src={slide1} alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <h2 className="text-5xl font-bold drop-shadow-lg text-gray-200">
              Welcome to Your Website
            </h2>
            <p className="text-xl mt-4 drop-shadow-lg text-gray-300 text-center">
              Discover amazing features and content. Dive into an incredible
              journey with us.
            </p>
            <Link to="/services">
              <button className="mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg">
                Explore Now
              </button>
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="relative">
          <img className="h-[650px] w-full object-cover" src={slide2} alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <h2 className="text-5xl font-bold drop-shadow-lg text-gray-200">
              Explore Features
            </h2>
            <p className="text-xl mt-4 drop-shadow-lg text-gray-300 text-center">
              Explore our features and start your adventure. Connect with our
              amazing community.
            </p>
            <Link to="/services">
              <button className="mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg">
                Explore Now
              </button>
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="relative">
          <img className="h-[650px] w-full object-cover" src={slide3} alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <h2 className="text-5xl font-bold drop-shadow-lg text-gray-200">
              Join Our Journey
            </h2>
            <p className="text-xl mt-4 drop-shadow-lg text-gray-300 text-center">
              Start your journey with our platform. Experience the best of what
              we offer.
            </p>
            <Link to="/services">
              <button className="mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg">
                Explore Now
              </button>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
