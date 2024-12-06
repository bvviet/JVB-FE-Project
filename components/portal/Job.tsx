import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Job = () => {
  return (
    <section className="rts__section mp_section_padding">
      <div className="container mx-auto">
        <div className=" mb-[60px] flex flex-col items-center">
          <h3 className="rts__section__title mp_section_title mb-[13px]">Việc làm tốt nhất</h3>
          <p className="rts__section__desc mp_section_des">Từ vị trí mới bắt đầu đến cấp quản lý, khám phá ngay những cơ hội phù hợp với bạn!</p>
        </div>

        <div className=" grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-3 2xl:gap-[40px]">
          {/* single job */}

          <div className="rts__job__card mp_transition_4 group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[10px] border-[1px] border-solid border-primary-border p-[30px] hover:border-transparent 2xl:p-[40px] ">
            <div className="background  mp_transition_4 absolute inset-0 z-[-1] bg-transparent opacity-0 group-hover:bg-custom-gradient  group-hover:opacity-100"></div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="company__icon mp_transition_4 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary-light group-hover:bg-primary-white ">
                <Image width={50} height={50} src="/images/apple.svg" alt="" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 text-lg text-primary-gray">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot" /> Newyork, USA
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-briefcase" /> Full Time
              </div>
            </div>
            <div className="my-4 text-2xl font-bold text-primary-black">
              <a href="job-details-1.html" aria-label="job">
                Senior UI Designer, Apple
              </a>
            </div>
            <p className="mp_p">Consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit mollitia eum ipsum.</p>
            <div className="jobs__tags mt-6 flex items-center gap-4 ">
              <span className="job__tag rounded-md bg-primary-light px-[12px] py-[8px]  font-medium capitalize text-primary-gray">9 - 9.5 Triệu</span>
            </div>
          </div>
          {/* single job end */}
          {/* single job */}

          <div className="rts__job__card mp_transition_4 group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[10px] border-[1px] border-solid border-primary-border p-[30px] hover:border-transparent 2xl:p-[40px] ">
            <div className="background  mp_transition_4 absolute inset-0 z-[-1] bg-transparent opacity-0 group-hover:bg-custom-gradient  group-hover:opacity-100"></div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="company__icon mp_transition_4 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary-light group-hover:bg-primary-white ">
                <Image width={50} height={50} src="/images/apple.svg" alt="" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 text-lg text-primary-gray">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot" /> Newyork, USA
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-briefcase" /> Full Time
              </div>
            </div>
            <div className="my-4 text-2xl font-bold text-primary-black">
              <a href="job-details-1.html" aria-label="job">
                Senior UI Designer, Apple
              </a>
            </div>
            <p className="mp_p">Consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit mollitia eum ipsum.</p>
            <div className="jobs__tags mt-6 flex items-center gap-4 ">
              <span className="job__tag rounded-md bg-primary-light px-[12px] py-[8px]  font-medium capitalize text-primary-gray">9 - 9.5 Triệu</span>
            </div>
          </div>
          {/* single job end */}
          {/* single job */}

          <div className="rts__job__card mp_transition_4 group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[10px] border-[1px] border-solid border-primary-border p-[30px] hover:border-transparent 2xl:p-[40px] ">
            <div className="background  mp_transition_4 absolute inset-0 z-[-1] bg-transparent opacity-0 group-hover:bg-custom-gradient  group-hover:opacity-100"></div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="company__icon mp_transition_4 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary-light group-hover:bg-primary-white ">
                <Image width={50} height={50} src="/images/apple.svg" alt="" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 text-lg text-primary-gray">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot" /> Newyork, USA
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-briefcase" /> Full Time
              </div>
            </div>
            <div className="my-4 text-2xl font-bold text-primary-black">
              <a href="job-details-1.html" aria-label="job">
                Senior UI Designer, Apple
              </a>
            </div>
            <p className="mp_p">Consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit mollitia eum ipsum.</p>
            <div className="jobs__tags mt-6 flex items-center gap-4 ">
              <span className="job__tag rounded-md bg-primary-light px-[12px] py-[8px]  font-medium capitalize text-primary-gray">9 - 9.5 Triệu</span>
            </div>
          </div>

          {/* single job end */}
          {/* single job */}

          <div className="rts__job__card mp_transition_4 group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[10px] border-[1px] border-solid border-primary-border p-[30px] hover:border-transparent 2xl:p-[40px] ">
            <div className="background  mp_transition_4 absolute inset-0 z-[-1] bg-transparent opacity-0 group-hover:bg-custom-gradient  group-hover:opacity-100"></div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="company__icon mp_transition_4 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary-light group-hover:bg-primary-white ">
                <Image width={50} height={50} src="/images/apple.svg" alt="" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 text-lg text-primary-gray">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot" /> Newyork, USA
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-briefcase" /> Full Time
              </div>
            </div>
            <div className="my-4 text-2xl font-bold text-primary-black">
              <a href="job-details-1.html" aria-label="job">
                Senior UI Designer, Apple
              </a>
            </div>
            <p className="mp_p">Consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit mollitia eum ipsum.</p>
            <div className="jobs__tags mt-6 flex items-center gap-4 ">
              <span className="job__tag rounded-md bg-primary-light px-[12px] py-[8px]  font-medium capitalize text-primary-gray">9 - 9.5 Triệu</span>
            </div>
          </div>

          {/* single job end */}
          {/* single job */}
          <div className="rts__job__card mp_transition_4 group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[10px] border-[1px] border-solid border-primary-border p-[30px] hover:border-transparent 2xl:p-[40px] ">
            <div className="background  mp_transition_4 absolute inset-0 z-[-1] bg-transparent opacity-0 group-hover:bg-custom-gradient  group-hover:opacity-100"></div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="company__icon mp_transition_4 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary-light group-hover:bg-primary-white ">
                <Image width={50} height={50} src="/images/apple.svg" alt="" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 text-lg text-primary-gray">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot" /> Newyork, USA
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-briefcase" /> Full Time
              </div>
            </div>
            <div className="my-4 text-2xl font-bold text-primary-black">
              <a href="job-details-1.html" aria-label="job">
                Senior UI Designer, Apple
              </a>
            </div>
            <p className="mp_p">Consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit mollitia eum ipsum.</p>
            <div className="jobs__tags mt-6 flex items-center gap-4 ">
              <span className="job__tag rounded-md bg-primary-light px-[12px] py-[8px]  font-medium capitalize text-primary-gray">9 - 9.5 Triệu</span>
            </div>
          </div>

          {/* single job end */}
          {/* single job */}

          <div className="rts__job__card mp_transition_4 group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[10px] border-[1px] border-solid border-primary-border p-[30px] hover:border-transparent 2xl:p-[40px] ">
            <div className="background  mp_transition_4 absolute inset-0 z-[-1] bg-transparent opacity-0 group-hover:bg-custom-gradient  group-hover:opacity-100"></div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="company__icon mp_transition_4 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary-light group-hover:bg-primary-white ">
                <Image width={50} height={50} src="/images/apple.svg" alt="" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 text-lg text-primary-gray">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot" /> Newyork, USA
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-briefcase" /> Full Time
              </div>
            </div>
            <div className="my-4 text-2xl font-bold text-primary-black">
              <a href="job-details-1.html" aria-label="job">
                Senior UI Designer, Apple
              </a>
            </div>
            <p className="mp_p">Consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit mollitia eum ipsum.</p>
            <div className="jobs__tags mt-6 flex items-center gap-4 ">
              <span className="job__tag rounded-md bg-primary-light px-[12px] py-[8px]  font-medium capitalize text-primary-gray">9 - 9.5 Triệu</span>
            </div>
          </div>

          {/* single job end */}
        </div>
        <div className="load_more mt-[30px] flex items-center justify-center 2xl:mt-[40px] ">
          <Link href={'/job-list-1'} className="mp_fill_button mp_transition_4 flex items-center gap-2 rounded-[10px] px-[16px] py-[15px] font-medium">
            <span>Xem thêm</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Job;
