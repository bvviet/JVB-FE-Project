import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Tooltip } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
interface ButtonSeeProps {
  href: string;
  onClick: () => void;
}
const ButtonSee: FC<ButtonSeeProps> = ({ href, onClick }) => {
  return (
    <Tooltip title="Xem chi tiết">
      <Link href={href}>
        <div onClick={onClick} className="cursor-pointer rounded-lg bg-[#1966d227] px-2 py-[6px] transition-all hover:bg-[#1966d254]">
          <RemoveRedEyeIcon color="info" fontSize="small" />
        </div>
      </Link>
    </Tooltip>
  );
};
export default ButtonSee;
