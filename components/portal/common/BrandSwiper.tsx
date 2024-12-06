import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Import module Autoplay từ Swiper 9.x

import 'swiper/css';

const BrandSwiper: React.FC = () => {
  return (
    <div className="swiper-container">
      <Swiper
        modules={[Autoplay]} // Đảm bảo module Autoplay được thêm vào
        spaceBetween={0} // Khoảng cách giữa các slide
        slidesPerView={2} // Hiển thị 5 slide cùng lúc
        loop={true} // Quay vòng lại
        autoplay={{
          delay: 0, // Không có độ trễ giữa các slide
          disableOnInteraction: false, // Tiếp tục autoplay khi người dùng tương tác
        }}
        speed={3000} // Thời gian chuyển slide (ms), 5000ms = 5s
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}>
        <SwiperSlide>
          <img src="/images/brand1.svg" alt="Image 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/brand2.svg" alt="Image 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/brand3.svg" alt="Image 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/brand4.svg" alt="Image 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/brand5.svg" alt="Image 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/brand6.svg" alt="Image 6" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/brand7.svg" className="max-h-[36px]" alt="Image 6" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/brand8.svg" className="max-h-[36px]" alt="Image 6" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BrandSwiper;
