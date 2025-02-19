import PersonOffIcon from '@mui/icons-material/PersonOff';
import { Tooltip } from '@mui/material';
import React from 'react';
interface RemovePersonProps {
  onClick: () => void;
}
const RemovePerson: React.FC<RemovePersonProps> = React.memo(({ onClick }) => {
  return (
    <Tooltip title="Hủy hợp tác">
      <div className="cursor-pointer rounded-lg bg-[#a70a291a] px-2 py-[6px] transition-all hover:bg-[#a70a2934]" onClick={onClick}>
        <PersonOffIcon color="error" fontSize="small" />
      </div>
    </Tooltip>
  );
});
export default RemovePerson;
