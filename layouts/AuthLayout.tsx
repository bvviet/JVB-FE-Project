import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';
import loginIcon from '@/assets/images/login.jpg';
import IconRegister1 from '@/assets/images/register1.png';
import IconRegister2 from '@/assets/images/register2.png';
import { Loading } from '@/components/Common/Loading';
import { useAppSelector } from '@/store/hooks';

interface AuthLayoutProps {
  children: React.ReactNode;
  type: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, type }) => {
  const isLoading = useAppSelector(state => state.global.isLoading);

  return (
    <div className="flex h-[100vh] flex-wrap items-center justify-center gap-14">
      {isLoading && <Loading />}
      {type === 'login' ? (
        <>
          <div className="mt-[100px] hidden md:block">
            <Image src={loginIcon} alt="icon login" width={350} height={400} />
          </div>
          <div>
            <Logo />
            <div>{children}</div>
            <div className="!mt-4 flex items-center justify-center">
              <p>
                Bạn chưa có tài khoản?{' '}
                <Link href={'/auth/Register'} className="text-primary-main">
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-[600px]">
            <div className="flex items-center justify-center">
              <Logo />
            </div>
            <div>{children}</div>
            <div className="mt-4 flex items-center justify-center pb-6">
              <p>
                Bạn đã tài khoản?{' '}
                <Link href={'/auth/login'} className="text-primary-main">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden xl:block">
            <Image src={IconRegister1} alt="icon login" width={400} height={400} />
            <Image src={IconRegister2} alt="icon login" width={400} height={400} />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthLayout;
