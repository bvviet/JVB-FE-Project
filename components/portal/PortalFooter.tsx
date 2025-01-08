import React from 'react';
import Link from 'next/link';

import Logo from '../Logo';

const PortalFooter = () => {
  return (
    <footer className="rts__section  bg-footer-bg">
      <div className="container mx-auto">
        <div className="footer__wrapper grid grid-cols-1 gap-6 py-[60px] sm:grid-cols-2  lg:gap-8 xl:grid-cols-4 ">
          <div className="rts__footer__widget max-320">
            <Link href="/" className="footer__logo flex items-end " aria-label="logo">
              <Logo />
            </Link>
            <p className="mt-[1.5rem] text-lg text-primary-gray">
              Cho dù bạn là một doanh nghiệp tìm kiếm nhân tài hay một trường học mong muốn mở rộng kết nối, JobLink luôn có giải pháp phù hợp cho mọi nhu cầu.
            </p>
          </div>
          {/* footer menu */}
          <div className="rts__footer__widget max-content">
            <div className="mb-3 text-xl font-medium text-primary-black">Về JobLink</div>
            <ul className="text-lg text-primary-gray">
              <li className="mb-2">
                <Link className="mp_footer_link mp_transition_4" href="job-list-1.html" aria-label="footer__menu__link">
                  Browse Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link className="mp_footer_link mp_transition_4" href="candidate-1.html" aria-label="footer__menu__link">
                  Browse Candidates
                </Link>
              </li>

              <li className="mb-2">
                <Link className="mp_footer_link mp_transition_4" href="blog-1.html" aria-label="footer__menu__link">
                  Blog &amp; News
                </Link>
              </li>
              <li className="mb-2">
                <Link className="mp_footer_link mp_transition_4" href="faq.html" aria-label="footer__menu__link">
                  FAQ Question
                </Link>
              </li>
              <li className="mb-2">
                <Link className="mp_footer_link mp_transition_4" href="#" aria-label="footer__menu__link">
                  Job Alerts
                </Link>
              </li>
            </ul>
          </div>
          <div className="rts__footer__widget max-content">
            <div className="mb-3 text-xl font-medium text-primary-black ">Khám phá</div>
            <ul className="mb-3 text-lg text-primary-gray">
              <li className="">
                <Link href="#" className="mp_footer_link mp_transition_4 mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-location-dot"></i>
                  <span> 2715 Ash Dr. San Jose,USA</span>
                </Link>
              </li>
              <li>
                <Link href="callto:+880171234578" className="mp_footer_link mp_transition_4 mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-phone"></i>
                  <span> +(61) 545-432-234</span>
                </Link>
              </li>
              <li>
                <Link href="mailto:jobpath@gmail.com" className="mp_footer_link mp_transition_4 mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-envelope" />
                  <span>jobpath@gmail.com</span>
                </Link>
              </li>
            </ul>
            <div className="texxt-primary-black mb-3 text-xl font-medium">Liên kết với chúng tôi</div>
            <div className="rts__social flex gap-6 text-xl text-primary-gray">
              <Link className="mp_footer_link mp_transition_4" target="_blank" href="https://facebook.com" aria-label="facebook">
                <i className="fa-brands fa-facebook" />
              </Link>
              <Link className="mp_footer_link mp_transition_4" target="_blank" href="https://instagram.com" aria-label="instagram">
                <i className="fa-brands fa-instagram" />
              </Link>
              <Link className="mp_footer_link mp_transition_4" target="_blank" href="https://linkedin.com" aria-label="linkedin">
                <i className="fa-brands fa-linkedin" />
              </Link>
              <Link className="mp_footer_link mp_transition_4" target="_blank" href="https://pinterest.com" aria-label="pinterest">
                <i className="fa-brands fa-pinterest" />
              </Link>
              <Link className="mp_footer_link mp_transition_4" target="_blank" href="https://youtube.com" aria-label="youtube">
                <i className="fa-brands fa-youtube" />
              </Link>
            </div>
          </div>
          {/* newsletter form */}
          <div className="rts__footer__widget max-320">
            <div className="mb-3 text-xl font-medium text-primary-black ">Đăng Ký Nhận Thông Báo</div>
            <p className="text-lg text-primary-gray">Cập nhật những cơ hội việc làm và workshop mới nhất từ chúng tôi!</p>
            <form
              action="#"
              className="relative mt-[1.5rem] flex max-w-[310px] items-center justify-between gap-1 overflow-hidden rounded-[10px] bg-primary-white ">
              <input
                type="email"
                name="semail"
                id="semail"
                placeholder="Nhập email ..."
                className="relative w-full rounded-[10px] border-none bg-inherit px-[18px] py-[20px] pr-[120px] outline-none"
              />
              <button type="submit" className="rts__btn mp_transition_4 mp_fill_button absolute right-[15px] rounded-md p-[10px] ">
                Subscribe
              </button>
            </form>
          </div>
          {/* newsletter form end */}
        </div>
      </div>
      <div className="rts__copyright">
        <div className="container mx-auto">
          <p className="py-4 text-center font-medium">Copyright © 2024 All Rights Reserved by JobLink</p>
        </div>
      </div>
    </footer>
  );
};

export default PortalFooter;
