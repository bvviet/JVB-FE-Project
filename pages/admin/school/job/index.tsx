import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import toast from 'react-hot-toast';
import makeAnimated from 'react-select/animated';
import { Chip, TextField, Tooltip } from '@mui/material';
import { debounce } from 'lodash';
import { BackdropType, setBackdrop, setLoading } from '@/store/slices/global';
import { useAppSelector } from '@/store/hooks';
import { useCancelJobsMutation, useDeleteJobsMutation, useGetAllJobAppliesUniversityQuery, useGetAllMajorsQuery } from '@/services/adminSchoolApi';
import { isErrorWithMessage, isFetchBaseQueryError } from '@/services/helpers';
import { jobType, statusTextJob } from '@/utils/app/const';
import ButtonSee from '@/components/Common/ButtonIcon/ButtonSee';
import PaginationComponent from '@/components/Common/Pagination';
import PopupConfirmAction from '@/components/Common/PopupConfirmAction';
import ButtonArrow from '@/components/Common/ButtonIcon/ArrowDownwardIcon';
import ButtonUp from '@/components/Common/ButtonIcon/ArrowUpwardIcon';
import DatePickerComponent from '@/components/Common/DatePicker';
const animatedComponents = makeAnimated();

const Partnerships = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const dispatch = useDispatch();
  const backdropType = useAppSelector(state => state.global.backdropType);
  const name = useAppSelector(state => state.global.name);
  const universityId = useAppSelector(state => state.user?.id);
  const [selectedJobsId, setSelectedJobsId] = useState<number | null>(null);
  const [selectedMajorId] = useState<number | null>(null);
  const [major, setMajor] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { data: dataMajor } = useGetAllMajorsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [selectedAction, setSelectedAction] = useState<BackdropType | null>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce(value => {
        setKeyword(value);
        setPage(1);
        setSortBy(value);
      }, 500),
    []
  );

  const { data: jobs, isLoading: isLoadingGetAll } = useGetAllJobAppliesUniversityQuery(
    {
      page: page,
      size: size,
      keyword,
      majorId: major,
      status,
      universityId: universityId,
      startDate,
      endDate,
      sortBy: sortBy || 'job.company.companyName:asc',
    },
    { refetchOnMountOrArgChange: true }
  );
  const [sortState, setSortState] = React.useState({
    activeColumn: null,
    isAsc: null,
  });

  const handleSort = (column: String, isAsc: boolean) => {
    const sortBy = `${column}:${isAsc ? 'asc' : 'desc'}`;
    setSortBy(sortBy);
    setSortState({
      activeColumn: column,
      isAsc: isAsc,
    });
  };
  const [cancelJob, { isLoading: isLoadingCancel }] = useCancelJobsMutation();
  const [deleteJob, { isLoading: isLoadingDelete }] = useDeleteJobsMutation();
  const handleConfirmAction = async () => {
    if (selectedJobsId !== null && selectedAction) {
      try {
        switch (selectedAction) {
          case BackdropType.RefuseConfirmation: {
            await cancelJob({ job: selectedJobsId, major: selectedMajorId }).unwrap();
            toast.success('Job đã bị từ chối phê duyệt.');
            break;
          }
          case BackdropType.DeleteConfirmation: {
            await deleteJob({ job: selectedJobsId, major: selectedMajorId }).unwrap();
            toast.success('Job đã được xóa thành công!');
            break;
          }
          default:
            throw new Error('Invalid action type');
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
        setSelectedJobsId(null);
        setSelectedAction(null);
      }
    }
  };

  useEffect(() => {
    dispatch(setLoading(isLoadingGetAll || isLoadingCancel || isLoadingDelete));
  }, [dispatch, isLoadingGetAll, isLoadingCancel, isLoadingDelete]);
  return (
    <>
      <div className="rounded-t-md bg-white p-5 pb-5">
        <h1 className="mb-5 font-bold">Danh sách công việc đã ứng tuyển</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <TextField
              id="filled-search"
              label="Tìm kiếm tên, mã công việc"
              type="search"
              variant="outlined"
              size="small"
              onChange={e => debouncedSearch(e.target.value)}
            />
            <Select
              placeholder="Chọn ngành"
              closeMenuOnSelect={true}
              options={[
                { value: null, label: 'Tất cả' },
                ...(dataMajor?.data || []).map(major => ({
                  value: major.id,
                  label: major.majorName,
                })),
              ]}
              onChange={(selectedOption: { value: React.SetStateAction<string | null> }) => {
                setMajor(selectedOption.value ? Number(selectedOption.value) : null);
              }}
              className="w-[160px] cursor-pointer"
            />
            <Select
              placeholder="Trạng thái"
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={[
                { value: '', label: 'Tất cả' },
                { value: 'PENDING', label: 'Chờ duyệt' },
                { value: 'ACCEPT', label: 'Đã duyệt' },
                { value: 'CANCEL', label: 'Từ chối' },
              ]}
              onChange={(selectedOption: { value: React.SetStateAction<string> }) => setStatus(selectedOption.value)}
              className="w-[160px] cursor-pointer"
            />
            <DatePickerComponent startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg rounded-b-md bg-white text-[14px]">
          <thead className="bg-white">
            <tr>
              <th className="px-5 py-4 text-left">STT</th>
              <th className="cursor-pointer px-3 text-left sm:px-5">
                <div className="flex items-center">
                  <span className="min-w-max">Tên công ty</span>
                  <span className="">
                    <ButtonUp
                      isSort={sortState.activeColumn === 'companyName' && sortState.isAsc === true}
                      onClick={() => handleSort('job.company.companyName', true)}
                    />
                    <ButtonArrow
                      isSort={sortState.activeColumn === 'companyName' && sortState.isAsc === false}
                      onClick={() => handleSort('job.company.companyName', false)}
                    />
                  </span>
                </div>
              </th>
              <th className="cursor-pointer px-3 text-left sm:px-5">
                <div className="flex items-center">
                  <span className="min-w-max">Tên công việc</span>
                  <span className="">
                    <ButtonUp isSort={sortState.activeColumn === 'jobTitle' && sortState.isAsc === true} onClick={() => handleSort('job.jobTitle', true)} />
                    <ButtonArrow
                      isSort={sortState.activeColumn === 'jobTitle' && sortState.isAsc === false}
                      onClick={() => handleSort('job.jobTitle', false)}
                    />
                  </span>
                </div>
              </th>
              <th className="px-5 py-4 text-left">Loại hình</th>
              <th className="px-5 py-4 text-center">Yêu cầu trình độ</th>
              <th className="px-5 py-4 text-left">Ngày ứng tuyển</th>
              <th className="px-5 py-4 text-left">Trạng thái</th>
              <th className="px-5 py-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.data.content.length !== 0 ? (
              jobs?.data?.content.map((job, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-[#F7F6FE]' : 'bg-primary-white'}`}>
                  <td className="px-5 py-4 text-center"> {index + 1 + (page - 1) * size}</td>
                  <td className="w-[200px] px-5 py-4 text-center">
                    <Tooltip title={job.job.company?.companyName} placement="bottom" arrow>
                      <span
                        className="block w-full overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          maxWidth: '150px',
                        }}>
                        {job.job.company?.companyName}
                      </span>
                    </Tooltip>
                  </td>
                  <td className="max-w-[150px] whitespace-normal break-words px-5 py-4">
                    <p>{job.job.jobTitle}</p>
                  </td>
                  <td className="px-5 py-4">{jobType(job.job.jobType)}</td>
                  <td className="px-5 py-4 text-center">{job.job.jobLevel.charAt(0).toUpperCase() + job.job.jobLevel.slice(1).toLowerCase()}</td>
                  <td className="px-5 py-4">{job.job?.createAt?.split(' ')[0]}</td>
                  <td className="px-2 py-4">
                    <Chip
                      label={statusTextJob(job.status).title}
                      style={{
                        color: `${statusTextJob(job.status).color}`,
                        background: `${statusTextJob(job.status).bg}`,
                      }}
                    />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-center gap-3">
                      <ButtonSee onClick={() => {}} href={`/portal/jobs/${job.job.id}`} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-base text-black">
                  <p>Không có công việc đã ứng tuyển nào.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <PaginationComponent
        count={jobs?.data.totalPages}
        page={page}
        onPageChange={(event, value) => setPage(value)}
        size={size}
        totalItem={jobs?.data.totalElements}
        onSizeChange={value => setSize(value)}
      />
      {/* Backdrops */}
      {(backdropType === BackdropType.ApproveConfirmation ||
        backdropType === BackdropType.RefuseConfirmation ||
        backdropType === BackdropType.DeleteConfirmation) && (
        <PopupConfirmAction
          text={`${
            selectedAction === BackdropType.ApproveConfirmation
              ? 'Duyệt'
              : selectedAction === BackdropType.RefuseConfirmation
              ? 'Từ chối'
              : selectedAction === BackdropType.DeleteConfirmation
              ? 'Xóa'
              : ''
          }job`}
          name={name}
          onClick={handleConfirmAction}
        />
      )}
    </>
  );
};

export default Partnerships;
