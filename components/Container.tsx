'use client';
import React, { FC } from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20">{children}</div>;
};
export default Container;
