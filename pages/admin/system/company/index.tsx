import React, { useEffect, useState } from 'react';
import { Chip, IconButton, Tooltip, Pagination, TextField } from '@mui/material';
import Link from 'next/link';
import Select from 'react-select';
import ClearIcon from '@mui/icons-material/Clear';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { BackdropType, setBackdrop, setId, setLoading, setName } from '@/store/slices/global';
import { useAppSelector } from '@/store/hooks';
import { BackDrop } from '@/components/Common/BackDrop';
import { Button } from '@/components/Common/Button';
import { useBanAndActiveMutation, useGetAllAccountCompanyQuery, useRejectAccountCompanyMutation } from '@/services/adminSystemApi';
import { typeAccount } from '@/utils/app/const';
import { setToast } from '@/store/slices/toastSlice';
import { formatDateDd_MM_yyyy } from '@/utils/app/format';

const AdminSystemCompany = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<BackdropType | null>(null);
  const showBackdrop = useAppSelector(state => state.global.backdropType);
  const dispatch = useDispatch();
  const name = useAppSelector(state => state.global.name);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleAction = (actionType: BackdropType, companyId: number, companyName: string) => {
    setSelectedCompanyId(companyId);
    setSelectedAction(actionType);
    dispatch(setBackdrop(actionType));
    dispatch(setName(companyName));
  };
  const debouncedSearch = debounce((value: string) => {
    setKeyword(value);
  }, 500);

  const { data: companis, isLoading: isLoadingDetAll } = useGetAllAccountCompanyQuery({ page, size: 10, keyword, status });
  const [rejectAccount, { isLoading: isLoadingReject }] = useRejectAccountCompanyMutation();
  const [banAndActiveAccount] = useBanAndActiveMutation();
  const handleConfirmAction = async () => {
    if (selectedCompanyId !== null && selectedAction) {
      try {
        switch (selectedAction) {
          case BackdropType.ApproveConfirmation || BackdropType.UnlockConfirmation: {
            const response = await banAndActiveAccount({ id: selectedCompanyId, statusAccount: 'ACTIVE' }).unwrap();
            if (response.code === 200) {
              dispatch(setToast({ message: response.message }));
            }
            if (response.code === 400) {
              dispatch(setToast({ message: response.message, type: 'error' }));
            }
            break;
          }
          case BackdropType.UnlockConfirmation: {
            const response = await banAndActiveAccount({ id: selectedCompanyId, statusAccount: 'ACTIVE' }).unwrap();
            if (response.code === 200) {
              dispatch(setToast({ message: response.message }));
            }
            if (response.code === 400) {
              dispatch(setToast({ message: response.message, type: 'error' }));
            }
            break;
          }
          case BackdropType.RefuseConfirmation: {
            const response = await rejectAccount({ id: selectedCompanyId }).unwrap();
            if (response.code === 200) {
              dispatch(setToast({ message: response.message }));
            }
            if (response.code === 400) {
              dispatch(setToast({ message: response.message, type: 'error' }));
            }
            break;
          }
          case BackdropType.LockConfirmation: {
            const response = await banAndActiveAccount({ id: selectedCompanyId, statusAccount: 'BAN' }).unwrap();
            if (response.code === 200) {
              dispatch(setToast({ message: response.message }));
            }
            if (response.code === 400) {
              dispatch(setToast({ message: response.message, type: 'error' }));
            }
            break;
          }
          default:
            throw new Error('Invalid action type');
        }
      } catch (error) {
        console.error('Error performing action:', error);
      } finally {
        dispatch(setBackdrop(null));
        setSelectedCompanyId(null);
        setSelectedAction(null);
      }
    }
  };
  useEffect(() => {
    dispatch(setLoading(isLoadingDetAll || isLoadingReject));
  }, [dispatch, isLoadingDetAll, isLoadingReject]);
  return (
    <>
      {/* Header */}
      <div className="rounded-t-md bg-white p-5 pb-5">
        <h1 className="mb-5 font-bold">Doanh sách tài khoản doanh nghiệp</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Select
              placeholder="Trạng thái"
              closeMenuOnSelect={true}
              options={[
                { value: '', label: 'Tất cả' },
                { value: 'PENDING', label: 'Chờ duyệt' },
                { value: 'ACTIVE', label: 'Hoạt động' },
                { value: 'BAN', label: 'Ngưng hoạt động' },
              ]}
              onChange={(selectedOption: { value: React.SetStateAction<string> }) => setStatus(selectedOption.value)}
              className="w-[160px] cursor-pointer"
            />
            <TextField
              id="filled-search"
              label="Tìm kiếm tên, mã"
              type="search"
              variant="outlined"
              size="small"
              onChange={e => debouncedSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg rounded-b-md bg-white text-[14px]">
          <thead className="bg-white">
            <tr>
              <th className="px-5 py-4 text-left">STT</th>
              <th className="px-5 py-4 text-left">Mã công ty</th>
              <th className="px-5 py-4 text-left">Tên Công Ty</th>
              <th className="px-5 py-4 text-left">Email</th>
              <th className="px-5 py-4 text-left">Ngày đăng ký</th>
              <th className="px-5 py-4 text-left">Trạng Thái</th>
              <th className="px-5 py-4 text-left">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {companis?.data.content.map((company, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-[#F7F6FE]' : 'bg-primary-white'}`}>
                <td className="px-5 py-4">{index + 1}</td>
                <td className="px-5 py-4">{company.companyCode}</td>
                <td className="px-5 py-4">
                  <Link href={`/admin/system/company/${company.id}`} className=" hover:text-primary-main" onClick={() => dispatch(setId(company.id))}>
                    {company.companyName}
                  </Link>
                </td>
                <td className="px-5 py-4">{company.account.email}</td>
                <td className="px-5 py-4">{formatDateDd_MM_yyyy(company.createAt)}</td>
                <td className="px-5 py-4">
                  <Chip
                    label={typeAccount(company?.account?.statusAccount)?.title}
                    sx={{
                      backgroundColor: typeAccount(company?.account?.statusAccount)?.bg,
                      color: typeAccount(company?.account?.statusAccount)?.color,
                    }}
                  />
                </td>
                <td className="flex items-center py-4">
                  {company?.account?.statusAccount === 'PENDING' && (
                    <>
                      <Tooltip title="Duyệt tài khoản">
                        <IconButton onClick={() => handleAction(BackdropType.ApproveConfirmation, company.account.id, company.companyName)}>
                          <CheckBoxIcon color="success" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Từ chối">
                        <IconButton onClick={() => handleAction(BackdropType.RefuseConfirmation, company.account.id, company.companyName)}>
                          <ClearIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                  {company?.account?.statusAccount === 'ACTIVE' && (
                    <Tooltip title="Khóa tài khoản">
                      <IconButton onClick={() => handleAction(BackdropType.LockConfirmation, company.account.id, company.companyName)}>
                        <LockIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {company?.account?.statusAccount === 'BAN' && (
                    <Tooltip title="Mở khóa tài khoản">
                      <IconButton onClick={() => handleAction(BackdropType.UnlockConfirmation, company.account.id, company.companyName)}>
                        <LockOpenIcon color="success" />
                      </IconButton>
                    </Tooltip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center bg-white p-5">
        <Pagination count={companis?.data.totalPages} page={page} onChange={handlePageChange} color="primary" shape="rounded" />
        <p className="text-sm">
          ({companis?.data.currentPage} / {companis?.data.totalPages})
        </p>
      </div>
      {/* Backdrops */}
      {showBackdrop && (
        <BackDrop isCenter>
          <div className="max-w-[400px] rounded-md p-6">
            <h3 className="font-bold">
              {selectedAction === BackdropType.ApproveConfirmation && `Duyệt tài khoản doanh nghiệp ${name}`}
              {selectedAction === BackdropType.RefuseConfirmation && `Từ chối tài khoản doanh nghiệp ${name}`}
              {selectedAction === BackdropType.LockConfirmation && `Khóa tài khoản doanh nghiệp ${name}`}
              {selectedAction === BackdropType.UnlockConfirmation && `Mở khóa tài doanh nghiệp khoản ${name}`}
            </h3>
            <p className="mt-1">Bạn có chắc chắn muốn thực hiện hành động này?</p>
            <div className="mt-9 flex items-center gap-5">
              <Button text="Hủy" className="bg-red-600" full={true} onClick={() => dispatch(setBackdrop(null))} />
              <Button text="Xác nhận" full={true} onClick={handleConfirmAction} />
            </div>
          </div>
        </BackDrop>
      )}
    </>
  );
};

export default AdminSystemCompany;
