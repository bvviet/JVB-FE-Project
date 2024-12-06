import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const OurProcess = () => {
  return (
    <section className="rts__section mp_section_padding">
      <div className="container mx-auto">
        <div className="mb-[60px] text-center">
          <div className="flex flex-col items-center">
            <div className="rts__section__content">
              <h3 className="rts__section__title mp_section_title mb-[13px]">Dành Cho Doanh Nghiệp & Nhà Trường</h3>
              <p className="rts__section__desc mp_section_des">Cách Chúng Tôi Hoạt Động</p>
            </div>
          </div>
        </div>
        <div className="justify-content-center grid grid-cols-1 gap-10 xl:grid-cols-3">
          <div className="rts__workprocess__box mp_ourprocess_item">
            <div className="rts__icon mp_ourprocess_item_icon">
              <Image src="/icons/iconPortal/OurProcessIcon1.svg" alt="OurProcessIcon1" width={40} height={40} />
            </div>
            <span className="process__title mp_ourprocess_item_title mb-[15px]">Tạo tài khoản miễn phí</span>
            <p className="mp_p">Đăng ký tài khoản dễ dàng để tham gia hệ thống, mở ra cơ hội kết nối hiệu quả giữa doanh nghiệp và trường học.</p>
            <div className="work__readmore mt-4">
              <Link className="mp_more justify-center" href="#">
                <span>Tìm hiểu thêm</span> <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </div>
          <div className="rts__workprocess__box mp_ourprocess_item">
            <div className="rts__icon mp_ourprocess_item_icon">
              <Image src="/icons/iconPortal/OurProcessIcon2.svg" alt="OurProcessIcon2" width={40} height={40} />
            </div>
            <span className="process__title mp_ourprocess_item_title mb-[15px]">Đăng tin tuyển dụng hoặc workshop</span>
            <p className="mp_p">Chia sẻ thông tin về vị trí tuyển dụng, cơ hội hợp tác hoặc workshop để tiếp cận đúng đối tượng.</p>
            <div className="work__readmore mt-4">
              <Link className="mp_more justify-center" href="#">
                <span> Tìm hiểu thêm</span> <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </div>
          <div className="rts__workprocess__box mp_ourprocess_item">
            <div className="rts__icon mp_ourprocess_item_icon">
              <Image src="/icons/iconPortal/OurProcessIcon3.svg" alt="OurProcessIcon3" width={40} height={40} />
            </div>
            <span className="process__title mp_ourprocess_item_title mb-[15px]">Nhận thông báo phú hợp</span>
            <p className="mp_p">
              Hệ thống tự động đề xuất các đối tác tiềm năng phù hợp với tiêu chí của bạn, giúp việc kết nối trở nên đơn giản hơn bao giờ hết.
            </p>
            <div className="work__readmore mt-4">
              <Link className="mp_more justify-center" href="#">
                <span> Tìm hiểu thêm</span> <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
