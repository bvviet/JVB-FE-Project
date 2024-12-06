import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../Logo';
import avt from '@/assets/images/avt.png';

const PortalHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage (hoặc API sau này)
    const loggedIn = localStorage.getItem('isLoggedIn') === 'false';
    setIsLoggedIn(loggedIn);

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true); // Nếu cuộn xuống trang, đặt state isSticky là true
      } else {
        setIsSticky(false); // Nếu ở đầu trang, đặt state isSticky là false
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogin = () => {
    // Lưu trạng thái đăng nhập vào localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Chuyển hướng sang trang chính hoặc làm gì đó
  };

  handleLogin();

  return (
    <header className={`${isSticky ? 'mp_header_sticky mp_box_shadow' : 'mp_header_fixed'}`}>
      <div className="container-none">
        <div
          className={`rounded-b-0 mx-auto bg-primary-white px-[15px] xl:container lg:px-[20px] lg:py-0 xl:rounded-b-[30px] xl:px-[45px] ${
            isSticky ? '' : `mp_box_shadow`
          }`}>
          <div className="">
            <div className="flex h-full items-center justify-between">
              <Link href="/" className="rts__logo flex items-center">
                <Logo />
                <h2 className="ml-2 font-logo text-3xl font-bold">
                  <span className="text-primary-main">Job</span>Link
                </h2>
              </Link>
              <div className="rts__menu flex h-[80px] items-center gap-[3rem] lg:h-[98px] lg:gap-[1.5rem] xl:gap-[3rem]">
                {/* Hiển thị navigation nếu đã đăng nhập */}
                {isLoggedIn && (
                  <div className="navigation hidden lg:block">
                    <nav className="navigation__menu" id="offcanvas__menu">
                      <ul className="relative flex w-max items-center gap-[25px]">
                        <li className="navigation__menu--item relative">
                          <Link href="#" className="mp_transition_4 after:mp_transition_4 mp_nav_menu_item relative py-[39px]">
                            Trang chủ
                          </Link>
                        </li>
                        <li className="navigation__menu--item relative">
                          <Link href="#" className="mp_transition_4 after:mp_transition_4 mp_nav_menu_item relative py-[39px]">
                            Việc Làm
                          </Link>
                        </li>
                        <li className="navigation__menu--item relative">
                          <Link href="#" className="mp_transition_4 after:mp_transition_4 mp_nav_menu_item relative py-[39px]">
                            Công Ty
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>

              <div className="header__right__btn flex items-center justify-between gap-4">
                {/* Ẩn các thẻ Link đăng nhập và đăng ký nếu đã đăng nhập */}
                {!isLoggedIn ? (
                  <>
                    <Link
                      href="#"
                      className="mp_button_small mp_transition_4 mp_no_fill_button hidden items-center justify-center gap-2 rounded-md text-sm sm:flex"
                      aria-label="Login Button"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal">
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      <span>Đăng nhập</span>
                    </Link>
                    <Link
                      href="employer-dash-jobpost.html"
                      className="mp_button_small mp_transition_4 mp_fill_button hidden rounded-md text-sm sm:flex"
                      aria-label="Job Posting Button">
                      <span>Đăng ký</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="user__menu">
                      <div className="user_wrapper flex items-center justify-between gap-4">
                        <div className="user-avatar">
                          <Image src={avt} alt="" width={45} height={45} className="aspect-square rounded-full object-cover" />
                        </div>
                        <div className="user-info flex flex-col">
                          <span className="user-name text-primary-black">Nguyen Van A</span>
                          <span className="user-role text-primary-gray">Admin</span>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                      </div>
                    </div>
                  </>
                )}
                <button
                  className="mp_button_small mp_transition_4 block rounded-md text-primary-black lg:hidden"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvas"
                  aria-controls="offcanvas">
                  <i className="fa-solid fa-bars-staggered"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
