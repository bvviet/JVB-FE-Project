import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';
import loginIcon from '@/assets/icons/login-image.svg';

interface AuthLayoutProps {
  children: React.ReactNode;
  type: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, type }) => {
  return (
    <div className="my-12 flex h-screen flex-wrap items-center justify-center gap-24">
      {type === 'login' ? (
        <>
          <div className="hidden md:block">
            <Image src={loginIcon} alt="icon login" width={350} />
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
          <div>
            <div className="flex items-center justify-center">
              <Logo />
            </div>
            <div>{children}</div>
            <div className="mt-4 flex items-center justify-center">
              <p>
                Bạn đã tài khoản?{' '}
                <Link href={'/auth/login'} className="text-primary-main">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden xl:block">
            <Image src={loginIcon} alt="icon login" width={400} />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthLayout;
