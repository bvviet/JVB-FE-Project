import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Chip, IconButton, Tooltip, Pagination, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppSelector } from '@/store/hooks';
import DetailWorkshop from '@/components/Admin/System/SystemWorkshop/DetailWorkshop';
import { BackdropType, setBackdrop } from '@/store/slices/global';
import { BackDrop } from '@/components/Common/BackDrop';
import { Button } from '@/components/Common/Button';

// Data giả lập
const mockData = [
  {
    id: 1,
    workshopTitle: 'Khóa học ReactJS cơ bản',
    schoolName: 'Trường Đại học Bách Khoa Hà Nội',
    address: 'Hà Nội, Việt Nam',
    startTime: '2024-12-01 09:00',
    endTime: '2024-12-01 17:00',
    estimateCompanyParticipants: 12,
    moderation_status: 'Chờ duyệt',
  },
  {
    id: 2,
    workshopTitle: 'Workshop JavaScript nâng cao',
    schoolName: 'Trường Đại học FPT',
    address: 'Hồ Chí Minh, Việt Nam',
    startTime: '2024-12-05 09:00',
    endTime: '2024-12-05 17:00',
    estimateCompanyParticipants: 20,
    moderation_status: 'Đã duyệt',
  },
  {
    id: 3,
    workshopTitle: 'Khóa học VueJS',
    schoolName: 'Trường Đại học Kinh tế TP.HCM',
    address: 'Đà Nẵng, Việt Nam',
    startTime: '2024-12-10 09:00',
    endTime: '2024-12-10 17:00',
    estimateCompanyParticipants: 8,
    moderation_status: 'Từ chối',
  },
  {
    id: 4,
    workshopTitle: 'Khóa học Node.js cho người mới bắt đầu',
    schoolName: 'Trường Đại học Ngoại Thương',
    address: 'Hà Nội, Việt Nam',
    startTime: '2024-12-15 09:00',
    endTime: '2024-12-15 17:00',
    estimateCompanyParticipants: 15,
    moderation_status: 'Chờ duyệt',
  },
  {
    id: 5,
    workshopTitle: 'Khóa học Angular nâng cao',
    schoolName: 'Trường Đại học Khoa học Tự nhiên',
    address: 'TP.Hồ Chí Minh, Việt Nam',
    startTime: '2024-12-20 09:00',
    endTime: '2024-12-20 17:00',
    estimateCompanyParticipants: 18,
    moderation_status: 'Đã duyệt',
  },
];

const AdminSystemWorkshop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const backdropType = useAppSelector(state => state.global.backdropType);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Header */}
      <div className="rounded-t-md bg-white p-5 pb-5">
        <h1 className="mb-5 font-bold">Doanh sách Workshop</h1>
        <div className="flex items-center gap-3">
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
            <Select labelId="demo-select-small-label" id="demo-select-small" value={'all'} label="Age">
              <MenuItem value="all">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value={10}>Đã duyệt</MenuItem>
              <MenuItem value={20}>Chờ duyệt</MenuItem>
              <MenuItem value={30}>Từ chối</MenuItem>
            </Select>
          </FormControl>
          <TextField id="filled-search" label="Tìm kiếm" type="search" variant="outlined" size="small" />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg rounded-b-md bg-white text-[14px]">
          <thead className="bg-white">
            <tr>
              <th className="px-2 py-4 text-left">
                <p className="min-w-max">STT</p>
              </th>
              <th className="px-2 py-4 text-left">Tiêu đề</th>
              <th className="px-2 py-4 text-left">
                <p className="min-w-max">Trường học</p>
              </th>
              <th className="px-2 py-4 text-left">
                <p className="min-w-max">Địa chỉ</p>
              </th>
              <Tooltip title="Số lượng công ty ước tính">
                <th className="px-2 py-4 text-left">
                  <p className="min-w-max">Số lượng ..</p>
                </th>
              </Tooltip>
              <th className="px-2 py-4 text-left">
                <p className="min-w-max">Trạng thái</p>
              </th>
              <th className="px-2 py-4 text-left">
                <p className="min-w-max">Hành động</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {mockData.map(item => (
              <tr key={item.id} className="bg-[#F7F6FE]">
                <td className="px-4 py-4">
                  <p className="min-w-max">{item.id}</p>
                </td>
                <td className="cursor-pointer px-2 py-4 hover:text-primary-main" onClick={() => dispatch(setBackdrop(BackdropType.General))}>
                  <p className="sm:[250px] w-[220px]">{item.workshopTitle}</p>
                </td>
                <td className="px-2 py-4">
                  <p className="sm:[250px] w-[220px]"> {item.schoolName}</p>
                </td>
                <td className="px-2 py-4">
                  <p className="sm:[250px] w-[220px]"> {item.address}</p>
                </td>
                <td className="px-2 py-4">{item.estimateCompanyParticipants}</td>
                <td className="px-2 py-4">
                  <Chip
                    label={item.moderation_status}
                    color={
                      item.moderation_status === 'Đã duyệt'
                        ? 'success'
                        : item.moderation_status === 'Chờ duyệt'
                        ? 'warning'
                        : item.moderation_status === 'Từ chối'
                        ? 'error'
                        : 'default'
                    }
                  />
                </td>
                <td className="flex items-center gap-1 py-4">
                  <Tooltip title="Duyệt">
                    <IconButton>
                      <CheckCircleIcon color="success" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Từ chối">
                    <IconButton>
                      <ClearIcon color="warning" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa">
                    <IconButton onClick={() => dispatch(setBackdrop(BackdropType.DeleteConfirmation))}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {backdropType === BackdropType.DeleteConfirmation && (
        <BackDrop isCenter>
          <div className="max-w-[400px] rounded-md p-6">
            <h3 className="font-bold">Khóa tài khoản Trường học</h3>
            <p className="mt-1">Bạn có chắc chắn muốn khóa tài khoản trường học đại học này?</p>
            <div className="mt-9 flex items-center gap-5">
              <Button text="Hủy" className="" full={true} onClick={() => dispatch(setBackdrop(null))} />
              <Button text="Xác nhận" className="bg-red-800" full={true} />
            </div>
          </div>
        </BackDrop>
      )}
      {/* Pagination */}
      <div className="flex justify-center bg-white p-5">
        <Pagination count={3} page={currentPage} onChange={handlePageChange} color="primary" shape="rounded" />
      </div>
      {backdropType === BackdropType.General && <DetailWorkshop />}
    </>
  );
};

export default AdminSystemWorkshop;
