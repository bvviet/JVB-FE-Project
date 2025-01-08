import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox, Chip, TextField } from '@mui/material';
import Link from 'next/link';
import Select from 'react-select';
import AddIcon from '@mui/icons-material/Add';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/store/hooks';
import { BackdropType, setBackdrop, setId, setLoading, setName } from '@/store/slices/global';
import {
  useDeleteStudentMultipleMutation,
  useDeleteStudentOneMutation,
  useGetAllFaculityQuery,
  useGetAllMajorByIdFacultyQuery,
  useGetAllStudentsQuery,
} from '@/services/adminSchoolApi';
import { StatusStudentTitle } from '@/utils/app/const';
import { BackDrop } from '@/components/Common/BackDrop';
import { Button, Button as MyButton } from '@/components/Common/Button';
import { isErrorWithMessage, isFetchBaseQueryError } from '@/services/helpers';
import { resetFilters, setKeyword, setPage } from '@/store/slices/filtersSlice';
import PaginationComponent from '@/components/Common/Pagination';
import ButtonSee from '@/components/Common/ButtonIcon/ButtonSee';
import ButtonUpdate from '@/components/Common/ButtonIcon/ButtonUpdate';
import ButtonDelete from '@/components/Common/ButtonIcon/ButtonDelete';

const StudentsManagement = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState<number | null>(null);
  const [major, setMajor] = useState<number | null>(null);
  const backdropType = useAppSelector(state => state.global.backdropType);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const idStudent = useAppSelector(state => state.global.id);
  const name = useAppSelector(state => state.global.name);
  const { page, keyword, size } = useAppSelector(state => state.filter);
  const debouncedSearch = useMemo(
    () =>
      debounce(value => {
        dispatch(setKeyword(value));
        dispatch(setPage(1));
      }, 500),
    [dispatch]
  );

  // Call api
  const { data: dataDepartment, isLoading: isLoadingGetAllDepartment } = useGetAllFaculityQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: dataMajor } = useGetAllMajorByIdFacultyQuery({ id: department }, { skip: department === null, refetchOnMountOrArgChange: true });
  const { data: students, isLoading: isLoadingGetAllSt } = useGetAllStudentsQuery(
    {
      page,
      size,
      keyword: keyword,
      majorId: major,
      facultyId: department,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allStudentIds = students?.data.content.map(student => student.id);
      setSelectedStudents(allStudentIds ?? []);
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id: number) => {
    setSelectedStudents(prev => (prev.includes(id) ? prev.filter(studentId => studentId !== id) : [...prev, id]));
  };

  const [deleteOne, { isLoading: isLoadingDeleteOne }] = useDeleteStudentOneMutation();
  const [deleteMultiple, { isLoading: isLoadingMultiple }] = useDeleteStudentMultipleMutation();
  const handleDelete = async () => {
    try {
      if (selectedStudents.length > 0) {
        await deleteMultiple({ ids: selectedStudents }).unwrap();
        toast.success('Các sinh viên đã được xóa thành công.');
      } else {
        await deleteOne({ id: idStudent }).unwrap();
        toast.success('Sinh viên đã được xóa thành công.');
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
    dispatch(setLoading(isLoadingDeleteOne || isLoadingGetAllDepartment || isLoadingGetAllSt || isLoadingMultiple));
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch, isLoadingDeleteOne, isLoadingGetAllDepartment, isLoadingGetAllSt, isLoadingMultiple]);
  return (
    <>
      <div className="rounded-t-md bg-white p-5 pb-5">
        <h1 className="mb-5 font-bold">Danh sách quản lý sinh viên</h1>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <TextField
              id="filled-search"
              label="Tìm kiếm tên,mã sinh viên"
              type="search"
              variant="outlined"
              size="small"
              onChange={e => debouncedSearch(e.target.value)}
            />
            <Select
              placeholder="Chọn khoa"
              closeMenuOnSelect={true}
              options={[
                { value: null, label: 'Tất cả' },
                ...(dataDepartment?.data || []).map(department => ({
                  value: department.id,
                  label: department.facultyName,
                })),
              ]}
              onChange={(selectedOption: { value: React.SetStateAction<string | null> }) => {
                const selectedValue = selectedOption.value ? Number(selectedOption.value) : null;
                setDepartment(selectedValue);
                if (selectedValue === null) {
                  setMajor(null); // Reset giá trị ngành
                }
              }}
              className="w-full cursor-pointer"
            />

            <Select
              placeholder="Chọn ngành"
              closeMenuOnSelect={true}
              value={
                major !== null
                  ? {
                      value: major,
                      label: Array.isArray(dataMajor?.data) ? dataMajor.data.find(item => item.id === major)?.majorName || 'Tất cả' : 'Tất cả',
                    }
                  : { value: null, label: 'Tất cả' }
              }
              options={[
                { value: null, label: 'Tất cả' },
                ...(Array.isArray(dataMajor?.data) ? dataMajor.data : []).map(major => ({
                  value: major.id,
                  label: major.majorName,
                })),
              ]}
              onChange={(selectedOption: { value: React.SetStateAction<string | null> }) => {
                setMajor(selectedOption.value ? Number(selectedOption.value) : null);
              }}
              className="w-full cursor-pointer"
            />
          </div>
          <div className="ml-auto flex justify-items-center gap-5">
            <Link href={'/admin/school/students/add'}>
              <MyButton type="submit" text="Thêm mới" icon={<AddIcon />} />
            </Link>
            <MyButton
              type="submit"
              text="Xóa sinh viên"
              onClick={() => {
                dispatch(setName('đã chọn'));
                dispatch(setBackdrop(BackdropType.DeleteConfirmation));
              }}
              className="bg-red-custom"
              disabled={!selectedStudents.length}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg rounded-b-md bg-white text-[14px]">
          <thead className="bg-white">
            <tr>
              <th className="p-3 sm:px-3 sm:py-4">
                <Checkbox
                  color="primary"
                  checked={selectedStudents.length > 0 && students?.data.content.length > 0}
                  indeterminate={selectedStudents.length > 0 && selectedStudents.length < (students?.data.content || []).length}
                  onChange={handleSelectAll}
                  size="small"
                />
              </th>
              <th className="p-3 py-4 text-left sm:px-3">
                <p className="min-w-max">STT</p>
              </th>
              <th className="p-3 text-left sm:px-5 sm:py-4">
                <p className="min-w-max">Mã sinh viên</p>
              </th>
              <th className="p-3 text-left sm:px-5 sm:py-4">
                <p className="min-w-max">Họ tên sinh viên</p>
              </th>
              <th className="p-3 text-left sm:px-5 sm:py-4">
                <p className="min-w-max">Ngành</p>
              </th>
              <th className="p-3 text-left sm:px-5 sm:py-4">
                <p className="min-w-max">Khoa</p>
              </th>
              <th className="p-3 text-left sm:px-5 sm:py-4">
                <p className="min-w-max">Trạng thái</p>
              </th>
              <th className="p-3 text-left sm:px-5 sm:py-4">
                <p className="min-w-max">Hành động</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {students?.data.content.length > 0 ? (
              students?.data.content.map((student, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-[#F7F6FE]' : 'bg-primary-white'}`}>
                  <td className="p-3 text-center sm:px-3 sm:py-4">
                    <Checkbox color="primary" checked={selectedStudents.includes(student.id)} onChange={() => handleSelectStudent(student.id)} size="small" />
                  </td>
                  <td className="p-3 sm:px-5 sm:py-4">
                    <p className="w-fit">{index + 1 + (page - 1) * size}</p>
                  </td>
                  <td className="p-3 sm:px-5 sm:py-4">
                    <p className="min-w-max">{student.major.faculty.facultyCode}</p>
                  </td>
                  <td className="p-3 sm:px-5 sm:py-4">
                    <p> {student.fullName}</p>
                  </td>
                  <td className="p-3 sm:px-5 sm:py-4">
                    <p className="min-w-max">{student.major.majorName}</p>
                  </td>
                  <td className="p-3 sm:px-5 sm:py-4">
                    <p className="min-w-max">{student.major.faculty.facultyName}</p>
                  </td>
                  <td className="p-3 sm:px-5 sm:py-4">
                    <Chip
                      label={StatusStudentTitle(student.studentStatus).title}
                      style={{
                        color: `${StatusStudentTitle(student.studentStatus).color}`,
                        background: `${StatusStudentTitle(student.studentStatus).bg}`,
                      }}
                    />
                  </td>
                  <td className=" py-4">
                    <div className="flex items-center gap-2">
                      <ButtonSee href={`/admin/school/students/${student.id}`} onClick={() => dispatch(setId(student.id))} />

                      <ButtonUpdate href={`/admin/school/students/update/${student.id}`} onClick={() => dispatch(setId(student.id))} />

                      <ButtonDelete
                        onClick={() => {
                          dispatch(setBackdrop(BackdropType.DeleteConfirmation));
                          dispatch(setId(student.id));
                          dispatch(setName(student.fullName));
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-base">
                  <p>Không có dữ liệu sinh viên nào</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Xóa Sinh viên */}
      {backdropType === BackdropType.DeleteConfirmation && (
        <BackDrop isCenter={true}>
          <div className="max-w-[400px] rounded-md p-6">
            <h3 className="font-bold">Bạn có chắc chắn muốn xóa sinh viên {name}? </h3>
            <p className="mt-1">Hành động này không thể hoàn tác. Điều này sẽ xóa vĩnh viễn sinh viên khỏi hệ thống.</p>
            <div className="mt-9 flex items-center gap-5">
              <Button text="Hủy" className="" full={true} onClick={() => dispatch(setBackdrop(null))} />
              <Button text="Xác nhận" className="bg-red-800" full={true} onClick={handleDelete} />
            </div>
          </div>
        </BackDrop>
      )}
      {/* Pagination */}
      <PaginationComponent
        size={size}
        page={page}
        count={students?.data.totalPages}
        onPageChange={(event, value) => dispatch(setPage(value))}
        totalItem={students?.data.totalElements}
      />
    </>
  );
};

export default StudentsManagement;
