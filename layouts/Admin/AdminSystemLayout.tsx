import { ReactNode } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Sidebar';
import Header from '@/components/Header/Header';
import { litsNavbarSystemAdmin } from '@/router/admin/navbarSystemRouter';

const AdminSystemLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isMobileAndTablet = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Header isAdmin={true} />
      <div className={`${!isMobileAndTablet ? 'flex' : ''}`}>
        {isMobileAndTablet ? (
          <div className={`hidden`}>
            <Navbar props={litsNavbarSystemAdmin} />
          </div>
        ) : (
          <div className={`w-[21.8%] bg-primary-white p-[30px]`}>
            <Navbar props={litsNavbarSystemAdmin} />
          </div>
        )}
        <div className="w-full bg-[#EEEE] p-[30px] xl:w-[78.3%]">{children}</div>
      </div>
    </>
  );
};

export default AdminSystemLayout;