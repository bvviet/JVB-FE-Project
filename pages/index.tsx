import Head from 'next/head';

import React from 'react';

import Banner from '../components/portal/Banner';
import OurProcess from '../components/portal/OurProcess';
import PortalLayout from '@/layouts/portal/PortalLayout';
import Brand from '@/components/portal/Brand';
import Majors from '@/components/portal/Majors';
import Job from '@/components/portal/Job';
import WhyWe from '@/components/portal/WhyWe';
// import FeedBack from '@/components/portal/FeedBack';
interface HomeProps {
  serverSideApiKeyIsSet: boolean;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Head>
        <title>Base</title>
        <meta name="description" content="" />
        <meta name="viewport" content="height=device-height ,width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
      </Head>
      <PortalLayout type="home">
        <main>
          <Banner />
          <OurProcess />
          <Brand />
          <Majors />
          <Job />
          <WhyWe />
          {/* <FeedBack /> */}
        </main>
      </PortalLayout>
    </>
  );
};
export default Home;
