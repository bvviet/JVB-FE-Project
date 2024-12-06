import React, { useRef } from 'react';
import MajorsSwiper from './common/MajorsSwiper';

const Majors = () => {
  const swiperRef = useRef<any>(null); // Khởi tạo tham chiếu

  // Hàm điều khiển Next Slide
  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  // Hàm điều khiển Prev Slide
  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <section className="rts__section bg-major-bg bg-cover bg-no-repeat py-[100px]">
      <div className="container mx-auto">
        <div className="mb-[50px] flex items-end justify-between">
          <div className="text">
            <h3 className="rts__section__title mp_section_title mb-[13px]">Ngành nghề nổi bật</h3>
            <p className="rts__section__desc mp_section_des">Bạn muốn tìm việc mới? Xem danh sách việc làm tại đây</p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="swiper-button-prev mp_major_nav_button" onClick={handlePrev}>
              <i className="fas fa-chevron-left"></i>
            </div>
            <div className="swiper-button-next mp_major_nav_button" onClick={handleNext}>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>

        {/* Component MajorsSwiper, truyền swiperRef vào */}
        <div className="container-slider">
          <MajorsSwiper swiperRef={swiperRef} />
        </div>
      </div>
    </section>
  );
};

export default Majors;
