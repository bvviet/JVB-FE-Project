import React from 'react';
import Image from 'next/image';
import { SelectChangeEvent } from '@mui/material';

import CustomSelect from '@/components/portal/common/CustomSelect';
const Banner = () => {
  const [location, setLocation] = React.useState<string[]>([]);
  const [jobType, setJobType] = React.useState<string[]>([]);

  const locations = [
    'Hà Nội',
    'Quảng Ninhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
    'Sài Gòn',
    'Sài Gòn',
    'Sài Gòn',
    'Sài Gòn',
    'Sài Gòn',
    'Sài Gòn',
    'Sài Gòn',
    'Sài Gòn',
  ]; // Data location
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance']; // Data job type

  const handleLocationChange = (event: SelectChangeEvent<typeof location>) => {
    setLocation(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
  };

  const handleJobTypeChange = (event: SelectChangeEvent<typeof jobType>) => {
    setJobType(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
  };
  return (
    <section className="rts__banner relative overflow-hidden pt-[150px] lg:pt-[180px] xl:pt-[260px]">
      <div className="rts__banner__background absolute left-0 top-0 h-full w-full bg-header-banner-bg-mobile lg:bg-header-banner-bg">
        <div className="shape__home__one absolute left-[-3%] top-0 hidden lg:block">
          <Image src="/images/banner-shape.svg" alt="Banner Shape" width={502} height={495} />
        </div>
        <div className="shape__home__one absolute right-0 top-0 z-[1] hidden lg:block">
          <Image src="/images/banner-shape-2.svg" alt="Banner Shape" width={665} height={796} />
        </div>
      </div>
      <div className="container mx-auto 3xl:px-40">
        <div className="rts__banner__wrapper flex flex-col justify-between gap-16 lg:flex-row lg:items-end lg:gap-6 xl:items-start ">
          <div className="rts__banner__content relative z-[2] lg:mb-[20px] lg:max-w-[550px] xl:mb-0 xl:max-w-[675px]">
            <h1 className="rts__banner__title w-full text-[52px] font-bold leading-[80px] tracking-[-1px] text-primary-black	xl:text-[64px]">
              Tìm Kiếm Công Việc Mơ Ước Của Bạn Cùng
              <span className="text-[60px] text-primary-main drop-shadow-lg xl:block xl:w-[100%] xl:text-[70px]"> JobLink</span>
            </h1>
            <p className="rts__banner__desc my-[40px] text-lg text-primary-gray" data-wow-delay=".1s">
              Hành trình tìm kiếm công việc mới có thể vừa thú vị vừa đầy thử thách. JobLink giúp bạn dễ dàng khám phá thị trường việc làm qua các cơ hội hấp
              dẫn và nền tảng kết nối tối ưu.
            </p>
            <div className="rts__job__search shadow-[0_30px_30px_rgba(175, 175, 175, 0.16)] relative z-[99] rounded-2xl bg-primary-white px-[20px] py-[22px]">
              <form action="#" className="flex flex-col  justify-between gap-6 xl:flex-row xl:items-center xl:gap-4">
                <div className="input-group relative flex w-full flex-col items-stretch gap-6 sm:flex-row">
                  <div className="single__input relative flex w-full flex-col xl:min-w-[190px]">
                    <label htmlFor="location " className="mb-3 text-xl font-medium capitalize tracking-[-1px] text-primary-black">
                      Vị trí
                    </label>
                    <CustomSelect label="Location" value={location} items={locations} onChange={handleLocationChange} />
                  </div>
                  <div className="hidden w-[1px] bg-[rgb(125,128,135,0.2)] sm:block" />
                  <div className="single__input relative flex w-full  flex-col xl:min-w-[190px]">
                    <label htmlFor="job__type" className="mb-3 text-xl font-medium capitalize tracking-[-1px]  text-primary-black">
                      Công việc
                    </label>
                    <CustomSelect label="Job Type" value={jobType} items={jobTypes} onChange={handleJobTypeChange} />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mp_transition_4 rts__btn mp_fill_button job__search flex h-[60px] items-center justify-center gap-2 gap-2 rounded-[10px] p-4 text-lg xl:min-w-[180px]"
                  aria-label="Search">
                  <i className="fa-solid fa-magnifying-glass" />
                  <span> Tìm việc ngày</span>
                </button>
              </form>
            </div>
          </div>
          <div className="rts__banner__image relative z-[1] aspect-[582/799] md:mx-20 lg:mx-0 lg:w-[530px] xl:mt-[-110px] xl:w-[597px]">
            <Image
              src="/images/image_2x.webp"
              alt="banner"
              layout="fill"
              objectFit="contain"
              style={{ filter: 'drop-shadow(10px 7px 4px #bfbfbf)', zIndex: 2 }}
            />

            <div className="absolute h-full w-full">
              <div className="mp_banner_image_shape facebook left-[25%] top-0  text-[#7763e5]">
                <i className="fab fa-facebook" />
              </div>
              <div className="mp_banner_image_shape twitter left-[5%] top-[22%] scale-[1.2] text-primary-main">
                <i className="fab fa-twitter" />
              </div>
              <div className="mp_banner_image_shape linkedin left-[88%] top-[28%] scale-[1.5] text-primary-black">
                <i className="fab fa-linkedin-in" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
