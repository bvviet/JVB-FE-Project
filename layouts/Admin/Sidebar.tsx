/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import { useRouter } from 'next/router';
import { useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showSidebar } from '@/store/slices/global';
import Logo from '@/components/Logo';

interface NavItem {
  id: number;
  icon: JSX.Element;
  url: string;
  label: string;
}

interface NavbarProps {
  props: NavItem[];
}

const SidebarContent: FC<NavbarProps> = ({ props }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <nav>
      <ul className="space-y-4">
        {props.map(prop => (
          <Link key={prop.id} href={prop.url} className="p-3">
            <li className={`${prop.url === pathname ? 'bg-custom-gradient ' : ''} flex items-center gap-4 rounded-lg  p-3 transition-all hover:bg-slate-200`}>
              <div className={`${prop.url === pathname ? 'text-[#34A853]' : ''} h-5 w-5 text-[#595959]`}>{prop.icon}</div>
              <p className={`text-lg text-gray-800 ${prop.url === pathname ? 'text-primary-black' : ''}`}>{prop.label}</p>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

const Sidebar: FC<NavbarProps> = ({ props }) => {
  const theme = useTheme();
  const isMobileAndTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isShowSidebar = useSelector((store: any) => store.global.showSidebar);
  const dispatch = useDispatch();

  return isMobileAndTablet ? (
    <Drawer open={isShowSidebar} onClose={() => dispatch(showSidebar())} classes={{ paper: 'w-3/4 max-w-[400px] p-4 flex flex-col gap-6' }}>
      <div className="mt-5">
        <Logo />
      </div>
      <SidebarContent props={props} />
    </Drawer>
  ) : (
    <SidebarContent props={props} />
  );
};

export default Sidebar;
