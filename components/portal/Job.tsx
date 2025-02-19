import Link from 'next/link';
import ImageComponent from '../Common/Image';
import PortalLoading from './common/PortalLoading';
import EmptyError from './common/EmptyError';
import { useGetJobsQuery } from '@/services/portalHomeApi';
import { formatCurrencyVND, formatJobType } from '@/utils/app/format';
const Job: React.FC = () => {
  const { data: jobs, isLoading, error } = useGetJobsQuery({ page: 1, size: 6 });

  return (
    <section className="rts__section mp_section_padding">
      <div className="container mx-auto">
        <div className="mb-[60px] flex flex-col items-center">
          <h3 className="rts__section__title mp_section_title mb-[13px]">Việc làm tốt nhất</h3>
          <p className="rts__section__desc mp_section_des">Tìm cơ hội nghề nghiệp tốt nhất!</p>
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
        {jobs && jobs.data.content.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-3 2xl:gap-[40px]">
              {jobs?.data.content.map(job => (
                <div
                  key={job.id}
                  className="rts__job__card mp_transition_4 group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[10px] border-[1px] border-solid border-primary-border p-[30px] hover:border-transparent 2xl:p-[40px]">
                  <div className="background mp_transition_4 absolute inset-0 z-[-1] bg-transparent opacity-0 group-hover:bg-custom-gradient group-hover:opacity-100"></div>
                  <Link
                    href={`portal/jobs/${job.id}`}
                    className="company__icon mp_transition_4 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary-light group-hover:bg-primary-white">
                    <ImageComponent
                      src={job.company.logoUrl || '/images/user-default.png'}
                      alt={job.company.companyName}
                      className="aspect-square h-10 w-10 object-contain"
                      width={50}
                      height={50}
                    />
                  </Link>
                  <div className="mt-6 flex items-center gap-4 text-lg text-primary-gray">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-location-dot" /> {job.company.address.province.provinceName}
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-briefcase" />
                      <span className="">{formatJobType(job.jobType)}</span>
                    </div>
                  </div>
                  <div className="my-4 text-2xl font-bold text-primary-black">
                    <Link href={`/portal/jobs/${job.id}`} aria-label="job" className="line-clamp-2">
                      {job.jobTitle}
                    </Link>
                  </div>
                  <p className="mp_p line-clamp-2">{job.jobDescription}</p>
                  <div className="jobs__tags mt-6 flex items-center gap-4 ">
                    <span className="job__tag rounded-md bg-primary-light px-[12px] py-[8px] font-medium capitalize text-primary-gray">
                      {job.minSalary && job.maxSalary
                        ? `${formatCurrencyVND(job.minSalary)} - ${formatCurrencyVND(job.maxSalary)}`
                        : job.minSalary
                        ? formatCurrencyVND(job.minSalary)
                        : job.maxSalary
                        ? formatCurrencyVND(job.maxSalary)
                        : 'Thỏa thuận'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="load_more mt-[30px] flex items-center justify-center 2xl:mt-[40px]">
              <Link href={'/portal/jobs'} className="mp_fill_button mp_transition_4 flex items-center gap-2 rounded-[10px] px-[16px] py-[15px] font-medium">
                <span>Xem thêm</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Job;
