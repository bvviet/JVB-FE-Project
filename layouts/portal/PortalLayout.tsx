import { FC } from 'react';
import React from 'react';
import PortalHeader from '@/components/portal/PortalHeader';
import PortalFooter from '@/components/portal/PortalFooter';
interface ProtolLayoutProps {
  children: React.ReactNode;
  type: string;
}
const PortalLayout: FC<ProtolLayoutProps> = ({ children }) => {
  return (
    <>
      <PortalHeader />
      {children}
      <PortalFooter />
    </>
  );
};

export default PortalLayout;
