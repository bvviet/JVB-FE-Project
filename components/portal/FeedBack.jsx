import React from 'react';
import FeedBackSwiper from './common/FeedBackSwiper';

const FeedBack = () => {
  return (
    <section className="rts__section section__padding mp_section_padding bg-feedback-bg bg-cover bg-no-repeat">
      <div className="container mx-auto">
        <div className="text-center">
          <h3 className="rts__section__title mp_section_title mb-[13px]">Khách Hàng Nói Gì Về Chúng Tôi</h3>
          <p className="rts__section__desc mp_section_des">Tìm kiếm cơ hội nghề nghiệp tiếp theo của bạn?</p>
        </div>
        <div className="flex max-h-[300px] items-center justify-center overflow-hidden">
          <FeedBackSwiper />
        </div>
      </div>
      {/* <div className="rts__slider__control d-lg-flex justify-content-between g-0 position-absolute top-50  translate-middle-y d-none">
        <div className="rts__slide__next slider__btn" tabIndex={0} role="button" aria-label="Next slide" aria-controls="swiper-wrapper-88109e76d8f5dd768">
          <i className="fa-sharp fa-solid fa-chevron-left" />
        </div>
        <div className="rts__slide__prev slider__btn" tabIndex={0} role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-88109e76d8f5dd768">
          <i className="fa-sharp fa-solid fa-chevron-right" />
        </div>
      </div> */}
    </section>
  );
};

export default FeedBack;
