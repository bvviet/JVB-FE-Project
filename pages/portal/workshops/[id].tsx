// pages/portal/companies/[id].tsx

import { BookOutlined, CalendarOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined, TeamOutlined } from '@ant-design/icons';
import { Alert, Pagination, Select, Spin } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import ImageComponent from '@/components/Common/Image';
import BreadCrumbHeaderDetail from '@/components/Portal/common/BreadCrumbHeaderDetail';
import LinkCard from '@/components/Portal/common/LinkCard';
import GoogleMap from '@/components/Portal/common/MapCard';
import PortalEmpty from '@/components/Portal/common/PortalEmpty';
import PortalLoading from '@/components/Portal/common/PortalLoading';
import PortalLayout from '@/layouts/Portal/PortalLayout';
import { useGetCompanyDetailsQuery, useGetJobsCompanyQuery, useGetSchoolDetailsQuery, useGetWorkshopsUniversityQuery } from '@/services/portalHomeApi';
import { formatJobType } from '@/utils/app/format';
import { IJobByCompany } from '@/types/portalJobCompanyTypes';
import CustomPagination from '@/components/Portal/common/CustomPagination';
import { IWorkshopPortal } from '@/types/workshop';
interface WokrshopDetailsPageProps {
  serverSideApiKeyIsSet: boolean;
}

const WokrshopDetailsPage: React.FC<WokrshopDetailsPageProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');
  const triggerPageChange = (page: number) => {
    setFadeState('fade-out');
    setTimeout(() => {
      handlePageChange(page); // Your existing page change logic
      setFadeState('fade-in');
    }, 300); // Matches the fade-out duration
  };

  const { data, isLoading, error } = useGetSchoolDetailsQuery({ id: Number(id) });
  const {
    data: workshopsData,
    isLoading: isLoadingJobs,
    error: workshopsError,
  } = useGetWorkshopsUniversityQuery({ universityId: Number(id), page: 1, size: 1000 });

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedWorkshops, setPaginatedJobs] = useState<IWorkshopPortal[]>([]);
  const [pageSize, setPageSize] = useState(4);

  if (isLoading) {
    return (
      <PortalLayout type="company-list">
        <Spin tip="Loading school details..." />
      </PortalLayout>
    );
  }

  if (error) {
    return (
      <PortalLayout type="company-list">
        <Alert message="Error" description="Failed to load school details" type="error" showIcon />
      </PortalLayout>
    );
  }

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const { Option } = Select;

  useEffect(() => {
    if (workshopsData?.data.content) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setPaginatedJobs(workshopsData.data.content.slice(startIndex, endIndex));
    }
  }, [workshopsData, currentPage, pageSize]);

  const universityDetails = data?.data;
  const jobs = workshopsData?.data;

  const address = `${universityDetails?.address?.houseNumber}, ${universityDetails?.address?.ward.wardName}, ${universityDetails?.address?.district.districtName}, ${universityDetails?.address?.province.provinceName}`;
  const zoomLevel = 20; // Độ zoom, từ 1 đến 21
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=${zoomLevel}&output=embed`;

  return (
    <>
      <Head>
        <title>JobLink - {universityDetails?.companyName}</title>
        <meta name="description" content={universityDetails?.companyShortDescription || 'Company details page'} />
        <meta name="viewport" content="height=device-height ,width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
      </Head>

      <PortalLayout type="company-list">
        <main>
          <BreadCrumbHeaderDetail
            title={universityDetails?.companyName || 'Company Details'}
            schoolType={universityDetails?.companyShortDescription || 'Company details page'}
            address={`${universityDetails?.address?.houseNumber},${universityDetails?.address?.ward.wardName}, ${universityDetails?.address?.district.districtName}, ${universityDetails?.address?.province.provinceName}`}
            logo={universityDetails?.logoUrl}
            currentPage="Trường học"
          />
          <div className="mp_section_padding">
            <div className="container mx-auto flex flex-col items-start gap-[30px] lg:flex-row">
              <div className="flex flex-col gap-[30px] lg:basis-7/12 xl:basis-8/12">
                <div className="overview rounded-[10px] bg-custom-gradient-1 p-[30px]">
                  <h3 className="mb-[20px] text-[24px] font-semibold text-primary-black">Tổng quan về công ty</h3>
                  <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-3">
                    <div className="flex items-start gap-[15px]">
                      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary-white">
                        <CalendarOutlined className="text-lg text-primary-main" />
                      </div>
                      <div className="flex flex-col">
                        <span className="block text-lg font-medium text-primary-black">Ngày thành lập</span>
                        <span className="block text-primary-gray">{universityDetails?.establishedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-[15px]">
                      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary-white">
                        <TeamOutlined className="text-lg text-primary-main" />
                      </div>
                      <div className="flex flex-col">
                        <span className="block text-lg font-medium text-primary-black">Số lượng sinh viên</span>
                        <span className="block text-primary-gray">{universityDetails?.quantityEmployee}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-[15px]">
                      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary-white">
                        <PhoneOutlined className="text-lg text-primary-main" />
                      </div>
                      <div className="flex flex-col">
                        <span className="block text-lg font-medium text-primary-black">Số điện thoại</span>
                        <span className="block text-primary-gray">{universityDetails?.phoneNumber}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-[15px]">
                      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary-white">
                        <EnvironmentOutlined className="text-lg text-primary-main" />
                      </div>
                      <div className="flex flex-col">
                        <span className="block text-lg font-medium text-primary-black">Địa chỉ</span>
                        <span className="block text-primary-gray">{universityDetails?.address.province.provinceName}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-[15px]">
                      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary-white">
                        <BookOutlined className="text-lg text-primary-main" />
                      </div>
                      <div className="flex flex-col">
                        <span className="block text-lg font-medium text-primary-black">Mã công ty</span>
                        <span className="block text-primary-gray">{universityDetails?.companyCode}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-[15px]">
                      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary-white">
                        <MailOutlined className="text-lg text-primary-main" />
                      </div>
                      <div className="flex flex-col">
                        <span className="block text-lg font-medium text-primary-black">Email</span>
                        <span className="block text-primary-gray">{universityDetails.account?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="about ">
                  <h3 className="mb-[20px] text-[24px] font-semibold text-primary-black">Giới thiệu công ty</h3>
                  <p className="text-lg text-primary-gray">{universityDetails?.companyDescription}</p>
                </div>
                <div className="workshop">
                  <div className="mb-[20px] flex items-center justify-between">
                    <h3 className="text-[24px] font-semibold text-primary-black">Tin tuyển dụng</h3>

                    {jobs?.content.length > 0 && (
                      <Select
                        value={pageSize}
                        onChange={value => {
                          setPageSize(value);
                          setCurrentPage(1);
                          setFadeState('fade-out');
                          setTimeout(() => {
                            setFadeState('fade-in');
                          }, 300);
                        }}
                        className="w-[120px]">
                        <Option value={4}>4 / trang</Option>
                        <Option value={5}>5 / trang</Option>
                        <Option value={10}>10 / trang</Option>
                        <Option value={20}>20 / trang</Option>
                      </Select>
                    )}
                  </div>
                  {isLoadingJobs ? (
                    <PortalLoading />
                  ) : jobs?.content.length > 0 ? (
                    <>
                      <div className={`grid grid-cols-1 gap-[20px] transition-opacity duration-500 ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}>
                        {paginatedWorkshops?.map(job => (
                          <div key={job.id} className="relative rounded-[10px] border border-primary-border px-[24px] py-[34px]">
                            <div className="overflow-hidden sm:flex sm:w-[calc(100%-150px)] sm:items-center sm:gap-[33px]">
                              <div className="flex h-[100px] w-[100px] flex-shrink-0 items-center justify-center rounded-md bg-primary-light">
                                <ImageComponent src={universityDetails?.logoUrl} alt="logo" width={60} height={60} className="object-contain" />
                              </div>
                              <div className="flex min-h-full flex-col justify-between sm:w-[calc(100%-150px)]">
                                <div className="mt-3 flex w-full flex-col gap-2 sm:mt-0">
                                  <h4 className="truncate text-[22px] font-semibold text-primary-black">{job.jobTitle}</h4>
                                  <p className="truncate text-lg text-primary-gray">{job.jobDescription}</p>
                                </div>
                                <div className="mt-2 flex flex-col items-start gap-2 text-lg text-primary-gray lg:max-w-[60%] lg:flex-col lg:items-start lg:gap-2 xl:max-w-full xl:flex-row xl:items-center xl:gap-4">
                                  <span className="flex items-center gap-1 ">
                                    <i className="fa-solid fa-briefcase"></i>
                                    <span className="truncate">{formatJobType(job.jobType)}</span>
                                  </span>
                                  <span className="flex items-center gap-1 truncate sm:w-full">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <span className="truncate ">
                                      {universityDetails?.address.province.provinceName}, {universityDetails?.address.district.districtName}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="absolute hidden items-center justify-end sm:bottom-[30px] sm:right-[24px] sm:flex ">
                              <Link
                                href={`/portal/jobs/${job.id}`}
                                className="mp_transition_4 readmore__btn mf-2 flex items-center gap-2 rounded-md bg-primary-main px-[20px] py-[10px] text-lg text-primary-white hover:bg-primary-black sm:mr-2">
                                <span className="">Xem chi tiết</span>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-[70px] w-full">
                        <CustomPagination
                          total={workshopsData?.data.content.length || 0}
                          currentPage={currentPage}
                          pageSize={pageSize}
                          onChange={page => triggerPageChange(page)}
                        />
                      </div>
                    </>
                  ) : (
                    <PortalEmpty />
                  )}
                </div>
                ;
              </div>
              <div className="flex w-full flex-col gap-[54px] lg:basis-5/12 xl:basis-4/12">
                <GoogleMap googleMapsUrl={googleMapsUrl} title="Vị trí trên Google Maps" height={300} />
                <LinkCard
                  logoUrl={universityDetails.logoUrl}
                  name={universityDetails.companyName}
                  shortDes={universityDetails.companyShortDescription}
                  websiteUrl={universityDetails.linkWebsite}
                />
              </div>
            </div>
          </div>
        </main>
      </PortalLayout>
    </>
  );
};

export default WokrshopDetailsPage;
