import Link from 'next/link';
import ImageComponent from '../Common/Image';
import HtmlContentRenderer from './common/HtmlContentRenderer';
import PortalLoading from './common/PortalLoading';
import EmptyError from './common/EmptyError';
import { useGetWorkshopsQuery } from '@/services/portalHomeApi';

const Workshop = () => {
  const { data: workshopsData, isLoading, error } = useGetWorkshopsQuery({ page: 1, size: 6 });

  return (
    <div className="rts__section mp_section_padding relative overflow-hidden pb-[180px]">
      <div className="shape__home__one absolute left-[-3%] top-0 z-[-2] hidden lg:block">
        <ImageComponent src="/images/banner-shape.svg" alt="Banner Shape" width={502} height={495} />
      </div>
      <div className="shape__home__one absolute bottom-[-20%] right-[20%] z-[-3] hidden lg:block">
        <ImageComponent src="/images/banner-shape-2.svg" alt="Banner Shape" width={665} height={796} />
      </div>
      <div className="shape__home__one absolute right-[20%] top-0 z-[-3] hidden lg:block">
        <ImageComponent src="/images/banner-shape-2.svg" alt="Banner Shape" width={665} height={796} />
      </div>
      <div className="container mx-auto">
        <div className="text-center">
          <div className="mb-[60px]">
            <h3 className="rts__section__title mp_section_title mb-[13px]">Workshop hấp dẫn</h3>
            <p className="rts__section__desc mp_section_des">Tìm kiếm cơ hội nghề nghiệp tiếp theo? AutoCareerBridge chính là nơi bạn cần!</p>
          </div>
        </div>
        {isLoading && (
          <div className="mp_section_padding">
            <PortalLoading />;
          </div>
        )}

        {error && (
          <div className="mp_section_padding">
            <EmptyError />;
          </div>
        )}

        {workshopsData?.data.content.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-3 2xl:gap-[40px]">
              {workshopsData?.data.content.map(workshop => (
                <div
                  key={workshop.id}
                  className="rts__single__blog mp_transition_4 group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[10px] border-[1px] border-primary-border bg-primary-white px-[24px] py-[30px] pt-[24px] hover:border-transparent hover:bg-transparent">
                  <div className="mp_transition_4 absolute inset-0 z-[-1] bg-transparent opacity-0 group-hover:bg-custom-gradient-1 group-hover:opacity-100"></div>
                  <Link href={`/portal/workshops/${workshop.id}`} className="blog__img">
                    <ImageComponent
                      src={workshop.image}
                      alt={workshop.workshopTitle}
                      className="vertical-center mb-2 min-h-[240px] max-w-full overflow-hidden rounded-[10px] object-cover"
                    />
                  </Link>
                  <div className="blog__meta pt-[16px]">
                    <div className="blog__meta__info mb-[16px] flex items-center justify-between gap-4 text-primary-gray">
                      <span className="flex items-center gap-1 ">
                        <i className="fa-solid fa-calendar"></i>
                        <span className="truncate whitespace-nowrap">{workshop.startTime}</span>
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <i className="fa-solid fa-user"></i>
                        <span className="truncate whitespace-nowrap">{workshop.university.universityName}</span>
                      </span>
                    </div>
                  </div>
                  <Link href={`/portal/workshops/${workshop.id}`} className="block truncate whitespace-nowrap text-[24px] font-semibold text-primary-black">
                    {workshop.workshopTitle}
                  </Link>
                  <div className="mt-[16px] line-clamp-2 text-lg text-primary-gray">
                    <HtmlContentRenderer htmlContent={workshop?.workshopDescription || ''} />
                  </div>
                  <div className="mt-[20px] flex flex-row items-center justify-between gap-2">
                    <Link href={`/workshops/${workshop.id}`} className="readmore__btn flex basis-1/2 items-center gap-2 text-lg">
                      <span className="mp_transition_4 font-medium hover:text-primary-main">Chi tiết</span>
                      <i className="fa-solid fa-arrow-right mp_transition_4 rotate-[-40deg] group-hover:rotate-0 group-hover:text-primary-main" />
                    </Link>
                    <div className="readmore__btn flex basis-1/2 items-center gap-2 text-lg">
                      <i className="fa-solid fa-location-dot mp_transition_4 text-primary-main" />
                      <span className="mp_transition_4 truncate whitespace-nowrap font-medium hover:text-primary-main">
                        {workshop.address.province.provinceName}, {workshop.address.district.districtName}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="load_more mt-[30px] flex items-center justify-center 2xl:mt-[40px]">
              <Link
                href={'/portal/workshops'}
                className="mp_fill_button mp_transition_4 flex items-center gap-2 rounded-[10px] px-[16px] py-[15px] font-medium">
                <span>Xem thêm</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Workshop;
