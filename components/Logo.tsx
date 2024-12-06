import Link from 'next/link';
import Image from '@/assets/icons/LogoJobLink.svg';

const Logo = () => {
  return (
    <Link href="/">
      <Image alt="logo" className=" h-auto object-cover" width={60} height={60} src={Image} priority={true} loading="eager" />
    </Link>
  );
};

export default Logo;
