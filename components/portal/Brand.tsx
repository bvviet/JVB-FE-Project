import React from 'react';
import BrandSwiper from './common/BrandSwiper';

const Brand = () => {
  return (
    <section className="rts__section relative pb-[120px] pt-[50px] ">
      <div className="container mx-auto">
        <div className="section__title mb-[40px] text-center">
          <span className="h6 d-block text-xl font-semibold text-primary-black">Được tin cậy bởi hơn 300 công ty hàng đầu</span>
        </div>

        <div className="row align-items-center">
          <div className="rts__brand__slider swiper-data swiper-initialized swiper-horizontal overflow-hidden">
            <BrandSwiper />
            <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brand;
