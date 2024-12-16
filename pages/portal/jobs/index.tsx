import Head from 'next/head';
import React from 'react';
import PortalLayout from '@/layouts/Portal/PortalLayout';
import BreadCrumbHeader from '@/components/Portal/common/BreadCrumbHeader';
import CompaniesList from '@/components/Portal/CompaniesList/CompaniesList';

interface CompanyListProps {
  serverSideApiKeyIsSet: boolean;
}

const CompanyListPage: React.FC<CompanyListProps> = () => {
  return (
    <>
      <Head>
        <title>Company List</title>
        <meta name="description" content="Danh sách công ty" />
        <meta name="viewport" content="height=device-height ,width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
      </Head>
      <PortalLayout type="company-list">
        <main>
          <BreadCrumbHeader title="Danh sách công việc" currentPage="Công việc" />
          <CompaniesList />
        </main>
      </PortalLayout>
    </>
  );
};

export default CompanyListPage;
