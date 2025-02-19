import Image from 'next/image';
import IconWhiteMode from '@/assets/svg/icon_whitemode.svg';
// import IconDarkMode from '@/assets/svg/icon_darkmode.svg';

// interface Props {
//   onThemeChange: () => void;
// }
export const ChooseThemeSelect = (): JSX.Element => {
  return (
    <>
      <Image src={IconWhiteMode} width={32} alt="icon white mode" className="cursor-pointer" />
    </>
  );
};
