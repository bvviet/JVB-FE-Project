import { ReactNode } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Sidebar';
import Header from '@/components/Header/Header';
import { litsNavbarAdminSchoolRouter } from '@/router/admin/navbarAdminCompany';

const AdminCompanyLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isMobileAndTablet = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <>
      <Header isAdmin={true} />
      <div className={`${!isMobileAndTablet ? 'flex' : ''}`}>
        {isMobileAndTablet ? (
          <div className={`hidden h-screen overflow-auto`}>
            <Navbar props={litsNavbarAdminSchoolRouter} />
          </div>
        ) : (
          <div className={`h-screen w-[19%] overflow-auto bg-primary-white p-[20px]`}>
            <Navbar props={litsNavbarAdminSchoolRouter} />
          </div>
        )}
        <div className="h-screen overflow-auto bg-[#EEEE] p-0 md:p-[20px] xl:w-[81%] xl:p-[20px]">{children}</div>
      </div>
    </>
  );
};

export default AdminCompanyLayout;