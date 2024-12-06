import React from 'react';
import Link from 'next/link';
const WhyWe = () => {
  return (
    <section className="rts__section pb-[120px]">
      <div className="container mx-auto 3xl:px-40">
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row">
          <div className="rts__image__section overflow-hidden rounded-[10px] bg-why-us-bg pl-[40px] pr-[30px] pt-[25px] md:mx-11 lg:mx-0">
            <img src="/images/image_ww.webp" alt="" />
          </div>
          <div className="rts__content__section ms-lg-4 ms-md-0 wow  fadeInUp animated" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
            <h3 className="mp_section_title mb-[13px]">Vì sao chọn bạn nên chọn JobLink?</h3>
            <p className="rts__section__desc mp_section_des">
              Dù bạn là doanh nghiệp tìm kiếm nhân sự tài năng hay trường học mong muốn kết nối với các cơ hội thực tiễn, chúng tôi đều có giải pháp dành cho
              bạn. Từ các công việc đa ngành đến những workshop sáng tạo, JobLink mang đến không gian kết nối hiệu quả và linh hoạt.
            </p>
            <div className="rts__listing mt-[40px] grid grid-cols-2 gap-6">
              <div className="single__listing flex items-center gap-6  text-lg text-primary-gray">
                <span className="icon text-primary-main">
                  <i className="fa-regular fa-check-circle" />
                </span>
                <span>Cơ hội việc làm chất lượng</span>
              </div>
              <div className="single__listing flex items-center gap-6  text-lg text-primary-gray">
                <span className="icon text-primary-main">
                  <i className="fa-regular fa-check-circle" />
                </span>
                <span>Không phát sinh chi phí ẩn</span>
              </div>
              <div className="single__listing flex items-center gap-6  text-lg text-primary-gray">
                <span className="icon text-primary-main">
                  <i className="fa-regular fa-check-circle" />
                </span>
                <span>Hàng trăm đối tác tiềm năng</span>
              </div>
              <div className="single__listing flex items-center gap-6  text-lg text-primary-gray">
                <span className="icon text-primary-main">
                  <i className="fa-regular fa-check-circle" />
                </span>
                <span>Kết nối toàn quốc</span>
              </div>
            </div>
            <div className="mt-[40px] flex items-center justify-end">
              <Link href={'/job-list-1'} className="mp_fill_button mp_transition_4 flex items-center gap-2 rounded-[10px] px-[16px] py-[15px] font-medium">
                <span>Xem thêm</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWe;
