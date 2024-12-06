import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  disableScrollLock: true,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 'auto',
      borderRadius: '16px',
      boxShadow: '0px 8px 10px rgba(0, 0 0, 0.25)',
    },
  },
};

interface CustomSelectProps {
  label: string;
  value: string[];
  items: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
  width?: string | number;
  height?: string | number;
}

function getStyles(name: string, selectedItems: string[], theme: Theme) {
  return {
    fontWeight: selectedItems.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  };
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, items, onChange, width = '100%', height = 'auto' }) => {
  const theme = useTheme();

  return (
    <FormControl sx={{ width, height, border: 'none' }}>
      <Select
        displayEmpty
        value={value}
        onChange={onChange}
        input={
          <OutlinedInput
            label={label}
            sx={{
              fontSize: '18px',
              border: 'none',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none', // Bỏ border outline
              },
              '&:focus': {
                outline: 'none', // Loại bỏ outline khi focus
              },
            }}
          />
        }
        MenuProps={MenuProps}
        renderValue={selected => {
          if (selected.length === 0) {
            return <span className="text-lg text-primary-gray">Chọn vị trí</span>; // Hiển thị khi không có giá trị được chọn
          }
          return selected.join(', '); // Hiển thị các giá trị đã chọn
        }}
        inputProps={{ 'aria-label': 'Without label', sx: { padding: '0px', color: '#7D8087' } }}>
        <MenuItem disabled value="">
          <span className="text-lg text-primary-gray">Chọn vị trí</span> {/* Mục vô hiệu hóa với placeholder */}
        </MenuItem>
        {items.map(item => (
          <MenuItem
            key={item}
            value={item}
            sx={{
              fontSize: '18px',
              color: '#7D8087',
              wordWrap: 'break-word',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: width,
              paddingRight: '16px',
              display: 'block',
            }}
            style={getStyles(item, value, theme)}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
