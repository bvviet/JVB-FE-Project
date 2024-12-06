import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/autoplay';

interface MajorsSwiperProps {
  swiperRef: React.RefObject<any>;
}

const MajorsSwiper: React.FC<MajorsSwiperProps> = ({ swiperRef }) => {
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      // Đảm bảo swiper đã được khởi tạo
      swiperRef.current.swiper.update();
    }
  }, [swiperRef]);

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay]}
        loop={true} // Quay vòng vô hạn
        autoplay={{
          delay: 3000, // Tự động chuyển mỗi 2 giây
          disableOnInteraction: false, // Tiếp tục autoplay khi người dùng tương tác
        }}
        speed={1000} // Tốc độ chuyển slide
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
        ref={swiperRef} // Lưu ref vào swiper instance để có thể truy cập các API
      >
        {/* Các slide */}
        <SwiperSlide>
          <Link href="/#" className="flex items-center justify-start gap-6 rounded-[10px] bg-primary-white px-[30px] py-[22px] text-white">
            <div className="single__cat__icon flex h-[60px] w-[60px] items-center justify-center rounded-md bg-primary-light">
              <img src="assets/img/home-1/cat/2.svg" alt="" />
            </div>
            <div className="single__cat__link flex flex-col">
              <a href="job-list-1.html" aria-label="cat__label" className="text-[24px] text-primary-black">
                Thiết kế đồ họa
              </a>
              <span className="text-[18px] text-primary-gray">130+ Jobs</span>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-start gap-6 rounded-[10px] bg-primary-white px-[30px] py-[22px] text-white">
            <div className="single__cat__icon flex h-[60px] w-[60px] items-center justify-center rounded-md bg-primary-light">
              <img src="assets/img/home-1/cat/2.svg" alt="" />
            </div>
            <div className="single__cat__link flex flex-col">
              <a href="job-list-1.html" aria-label="cat__label" className="text-[24px] text-primary-black">
                Thiết kế đồ họa
              </a>
              <span className="text-[18px] text-primary-gray">130+ Jobs</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-start gap-6 rounded-[10px] bg-primary-white px-[30px] py-[22px] text-white">
            <div className="single__cat__icon flex h-[60px] w-[60px] items-center justify-center rounded-md bg-primary-light">
              <img src="assets/img/home-1/cat/2.svg" alt="" />
            </div>
            <div className="single__cat__link flex flex-col">
              <a href="job-list-1.html" aria-label="cat__label" className="text-[24px] text-primary-black">
                Thiết kế đồ họa
              </a>
              <span className="text-[18px] text-primary-gray">130+ Jobs</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-start gap-6 rounded-[10px] bg-primary-white px-[30px] py-[22px] text-white">
            <div className="single__cat__icon flex h-[60px] w-[60px] items-center justify-center rounded-md bg-primary-light">
              <img src="assets/img/home-1/cat/2.svg" alt="" />
            </div>
            <div className="single__cat__link flex flex-col">
              <a href="job-list-1.html" aria-label="cat__label" className="text-[24px] text-primary-black">
                Thiết kế đồ họa
              </a>
              <span className="text-[18px] text-primary-gray">130+ Jobs</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-start gap-6 rounded-[10px] bg-primary-white px-[30px] py-[22px] text-white">
            <div className="single__cat__icon flex h-[60px] w-[60px] items-center justify-center rounded-md bg-primary-light">
              <img src="assets/img/home-1/cat/2.svg" alt="" />
            </div>
            <div className="single__cat__link flex flex-col">
              <a href="job-list-1.html" aria-label="cat__label" className="text-[24px] text-primary-black">
                Thiết kế đồ họa
              </a>
              <span className="text-[18px] text-primary-gray">130+ Jobs</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MajorsSwiper;
