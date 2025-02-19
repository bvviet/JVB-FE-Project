import { Chip, TextField, Tooltip } from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import toast from 'react-hot-toast';
import ButtonDelete from '@/components/Common/ButtonIcon/ButtonDelete';
import { useDeleteWorkShopMutation, useGetAllWorkShopCompanyQuery } from '@/services/adminCompanyApi';
import { useAppSelector } from '@/store/hooks';
import { BackdropType, setBackdrop, setLoading, setName } from '@/store/slices/global';
import { statusTextWorkShopCompany } from '@/utils/app/const';
import { isErrorWithMessage, isFetchBaseQueryError } from '@/services/helpers';
import PaginationComponent from '@/components/Common/Pagination';
import ButtonSee from '@/components/Common/ButtonIcon/ButtonSee';
import ButtonReject from '@/components/Common/ButtonIcon/ButtonReject';
import ButtonUp from '@/components/Common/ButtonIcon/ArrowUpwardIcon';
import ButtonArrow from '@/components/Common/ButtonIcon/ArrowDownwardIcon';
import DatePickerComponent from '@/components/Common/DatePicker';
import PopupConfirmAction from '@/components/Common/PopupConfirmAction';

const animatedComponents = makeAnimated();

const WorkShopCompany = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [selectId, setSelectId] = useState<number | null>(null);
  const backdropType = useAppSelector(state => state.global.backdropType);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const name = useAppSelector(state => state.global.name);
  const dispatch = useDispatch();

  const handleAction = (actionType: BackdropType, JobsId: number) => {
    setSelectId(JobsId);
    dispatch(setBackdrop(actionType));
  };

  const [sortState, setSortState] = React.useState({
    currentColumn: null,
    isAsc: null,
  });

  const handleSort = (column: string, isAsc: boolean) => {
    const sortBy = `${column}:${isAsc ? 'asc' : 'desc'}`;
    setSortBy(sortBy);
    setSortState({ currentColumn: column, isAsc: isAsc });
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(value => {
        setKeyword(value);
        setSortBy(value);
        setPage(1);
      }, 500),
    []
  );
  const { data: companyWorkShop, isLoading } = useGetAllWorkShopCompanyQuery(
    { page, keyword, size, status, startDate: startDate, endDate: endDate, sortBy: sortBy || 'workshop.workshopTitle:asc' },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteOne, { isLoading: isLoadingOne }] = useDeleteWorkShopMutation();
  const handleDelete = async () => {
    try {
      if (selectId) {
        // Điều kiện kiểm tra chỉ liên quan đến `deleteOne`
        await deleteOne({ id: selectId }).unwrap();
        toast.success('Hủy tham gia workshop thành công');
      } else {
        toast.error('Không có workShop nào được chọn để xóa');
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg = (error.data as { message?: string })?.message || 'Đã xảy ra lỗi';
        toast.error(errMsg);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    } finally {
      dispatch(setBackdrop(null));
    }
  };

  useEffect(() => {
    dispatch(setLoading(isLoading || isLoadingOne));
  }, [dispatch, isLoading, isLoadingOne]);

  // console.log("date", startDate)
  return (
    <>
      {/* Header */}
      <div className="rounded-t-md bg-white p-5 pb-5">
        <h1 className="mb-5 font-bold">Quản lý yêu cầu workshop</h1>
        <div className="flex flex-wrap items-center justify-between gap-3 md:mt-0">
          <div className="flex flex-wrap items-center gap-3">
            <TextField
              id="filled-search"
              label="Tìm kiếm tiêu đề"
              type="search"
              variant="outlined"
              size="small"
              onChange={e => debouncedSearch(e.target.value)}
              className="w-full sm:w-auto"
            />

            <Select
              placeholder="Trạng thái"
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={[
                { value: '', label: 'Tất cả' },
                { value: 'PENDING', label: 'Chờ duyệt' },
                { value: 'ACCEPT', label: 'Đã duyệt' },
                { value: 'CANCEL', label: 'Hủy chờ' },
                { value: 'REJECT', label: 'Từ chối' },
              ]}
              onChange={(selectedOption: { value: React.SetStateAction<string> }) => setStatus(selectedOption.value)}
              className="w-full cursor-pointer sm:w-[160px]"
            />
            <DatePickerComponent startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg rounded-b-md bg-white text-[14px]">
          <thead className="bg-white">
            <tr>
              <th className="p-3 sm:px-3 sm:py-4">STT</th>
              <th className="cursor-pointer p-3 text-left sm:px-5">
                <div className="flex items-center">
                  <span
                    className="min-w-max"
                    onClick={() => handleSort('workshop.workshopTitle', !(sortState.currentColumn === 'workshop.workshopTitle' && sortState.isAsc))}>
                    Tiêu đề
                  </span>
                  <span>
                    <ButtonUp
                      isSort={sortState.currentColumn === 'workshop.workshopTitle' && sortState.isAsc === true}
                      onClick={() => handleSort('workshop.workshopTitle', true)}
                    />
                    <ButtonArrow
                      isSort={sortState.currentColumn === 'workshop.workshopTitle' && sortState.isAsc === false}
                      onClick={() => handleSort('workshop.workshopTitle', false)}
                    />
                  </span>
                </div>
              </th>
              <th className="cursor-pointer px-5 py-4 text-left">
                <div className="flex items-center">
                  <span
                    className="min-w-max"
                    onClick={() =>
                      handleSort('workshop.university.universityName', !(sortState.currentColumn === 'workshop.university.universityName' && sortState.isAsc))
                    }>
                    Trường học
                  </span>
                  <span>
                    <ButtonUp
                      isSort={sortState.currentColumn === 'workshop.university.universityName' && sortState.isAsc === true}
                      onClick={() => handleSort('workshop.university.universityName', true)}
                    />
                    <ButtonArrow
                      isSort={sortState.currentColumn === 'workshop.university.universityName' && sortState.isAsc === false}
                      onClick={() => handleSort('workshop.university.universityName', false)}
                    />
                  </span>
                </div>
              </th>
              <th className="cursor-pointer p-3 sm:px-3 sm:py-4">
                <div className="flex items-center">
                  <span
                    className="min-w-max"
                    onClick={() => handleSort('workshop.startTime', !(sortState.currentColumn === 'workshop.startTime' && sortState.isAsc))}>
                    Thời gian bắt đầu
                  </span>
                  <span>
                    <ButtonUp
                      isSort={sortState.currentColumn === 'workshop.startTime' && sortState.isAsc === true}
                      onClick={() => handleSort('workshop.startTime', true)}
                    />
                    <ButtonArrow
                      isSort={sortState.currentColumn === 'workshop.startTime' && sortState.isAsc === false}
                      onClick={() => handleSort('workshop.startTime', false)}
                    />
                  </span>
                </div>
              </th>
              <th className="cursor-pointer p-3 sm:px-3 sm:py-4">
                <div className="flex items-center">
                  <span
                    className="min-w-max"
                    onClick={() => handleSort('workshop.endTime', !(sortState.currentColumn === 'workshop.endTime' && sortState.isAsc))}>
                    Thời gian kết thúc
                  </span>
                  <span>
                    <ButtonUp
                      isSort={sortState.currentColumn === 'workshop.endTime' && sortState.isAsc === true}
                      onClick={() => handleSort('workshop.endTime', true)}
                    />
                    <ButtonArrow
                      isSort={sortState.currentColumn === 'workshop.endTime' && sortState.isAsc === false}
                      onClick={() => handleSort('workshop.endTime', false)}
                    />
                  </span>
                </div>
              </th>
              <th className="p-3 sm:px-3 sm:py-4">Trạng thái</th>
              <th className="p-3 sm:px-3 sm:py-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {companyWorkShop?.data.content.length > 0 ? (
              companyWorkShop?.data.content.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-[#F7F6FE]' : 'bg-primary-white'}>
                  <td className="px-5 py-4">{index + 1 + (page - 1) * size}</td>
                  <td className=" max-w-[200px] whitespace-normal break-words px-5 py-4">
                    <Tooltip title={item.workshop.workshopTitle} placement="bottom" arrow>
                      <span
                        className="block w-full overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          maxWidth: '50px',
                        }}>
                        {item.workshop.workshopTitle}
                      </span>
                    </Tooltip>
                  </td>
                  <td className="max-w-[200px] whitespace-normal break-words px-5 py-4">{item.workshop.university.universityName}</td>
                  <td className="px-5 py-4 ">{item.workshop.startTime.split(' ')[0]}</td>
                  <td className="px-5 py-4 ">{item.workshop.endTime.split(' ')[0]}</td>
                  <td className="px-5 py-4 text-center">
                    <Chip
                      label={statusTextWorkShopCompany(item.status).title}
                      style={{
                        color: `${statusTextWorkShopCompany(item.status).color}`,
                        background: `${statusTextWorkShopCompany(item.status).bg}`,
                      }}
                    />
                  </td>

                  <td className="py-4">
                    <div className="flex items-center justify-center gap-3 ">
                      <ButtonSee
                        onClick={() => {
                          setSelectId(item.workshop.id);
                        }}
                        href={`/portal/workshops/${item.workshop.id}`}
                      />

                      {item.status === 'PENDING' && (
                        <ButtonReject
                          onClick={() => {
                            handleAction(BackdropType.DeleteConfirmation, item.id);
                            dispatch(setName(item.workshop.workshopTitle));
                          }}
                        />
                      )}
                      {item.status === 'ACCEPT' && (
                        <ButtonDelete
                          onClick={() => {
                            handleAction(BackdropType.DeleteConfirmation, item.id);
                            dispatch(setName(item.workshop.workshopTitle));
                          }}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-base">
                  <p>Không có dữ liệu nào</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Xóa */}
      {backdropType === BackdropType.DeleteConfirmation && <PopupConfirmAction text="Hủy tham gia hội thảo" name={name} onClick={handleDelete} />}

      {/* Pagination */}
      <PaginationComponent
        count={companyWorkShop?.data.totalPages}
        page={page}
        onPageChange={(event, value) => setPage(value)}
        size={size}
        totalItem={companyWorkShop?.data.totalElements}
        onSizeChange={value => setSize(value)}
      />
    </>
  );
};
export default WorkShopCompany;
