import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import Link from 'next/link';
import React, { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetAllFieldsQuery } from '@/services/adminSchoolApi';
import SelectReact from '@/components/Common/SelectMui';
import { useGetDetailCompanyJobQuery, useUpdateJobMutation } from '@/services/adminCompanyApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formatDateDd_MM_yyyy } from '@/utils/app/format';
import DateComponent from '@/components/Common/DateComponent';
import TextEditor from '@/components/Common/TextEditor';
import validationUpdateJob from '@/validation/companyEmployee/job/validationUpdateJob';
import { Button } from '@/components/Common/Button';
import { setLoading } from '@/store/slices/global';
import { isErrorWithMessage, isFetchBaseQueryError } from '@/services/helpers';
import Input from '@/components/Common/Input';
import SelectMui from '@/components/Common/SelectMui';
interface FormUpdateJob {
  job_title: string;
  job_description: string;
  requirements: string;
  job_type: string;
  work_time: string;
  benifits: string;
  job_level: string;
  expiration_date: dayjs.Dayjs;
  member_of_candidate: number;
  max_salary: number;
  min_salary: number;
  job_field: number[];
  salary_type: string;
}
const UpdateJob = () => {
  const idJob = useAppSelector(state => state.global.id);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormUpdateJob>({
    resolver: yupResolver(validationUpdateJob) as Resolver<FormUpdateJob>,
    defaultValues: {
      min_salary: 0,
      max_salary: 0,
    },
  });
  const { data: detailJob, isLoading } = useGetDetailCompanyJobQuery({ id: idJob });

  //useEffect
  useEffect(() => {
    if (detailJob?.data) {
      reset({
        job_title: detailJob.data.jobTitle,
        job_description: detailJob.data.jobDescription,
        requirements: detailJob.data.requirements,
        job_type: detailJob.data.jobType,
        work_time: detailJob.data.workTime,
        benifits: detailJob.data.benifits,
        job_level: detailJob.data.jobLevel,
        expiration_date: detailJob?.data.expirationDate ? dayjs(detailJob?.data.expirationDate, 'DD/MM/YYYY') : null,
        member_of_candidate: detailJob.data.memberOfCandidate,
        salary_type: detailJob.data.salaryType,
        max_salary: detailJob.data.maxSalary,
        min_salary: detailJob.data.minSalary,
        job_field: detailJob.data.fields?.map(field => field.id),
      });
    }
    dispatch(setLoading(isLoading));
  }, [detailJob?.data, dispatch, isLoading, reset]);

  const salaryType = watch('salary_type');

  const { data: faculties } = useGetAllFieldsQuery();

  const [updateJob] = useUpdateJobMutation();

  const onSubmit: SubmitHandler<FormUpdateJob> = async data => {
    const newData = {
      ...data,
      expiration_date: formatDateDd_MM_yyyy(data.expiration_date.toDate()),
      status: 'REJECT',
    };
    try {
      const response = await updateJob({ data: newData, id: idJob }).unwrap();
      toast.success(response.message);
      router.push('/admin/company/jobCompany');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg = (error.data as { message?: string })?.message || 'Đã xảy ra lỗi';
        toast.error(errMsg);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="bg-primary-white px-10">
      {/* Icon */}
      <div className="rounded-t-lg ">
        <Link href={'/admin/company/jobCompany'}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        Trở về
        <h1 className="mt-5 text-center text-xl font-bold lg:mb-8 lg:mt-0 lg:text-2xl">Cập nhập thông tin Công việc </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="">
          {/* tiêu đề */}
          <Input
            name="job_title"
            control={control}
            error={errors.job_title?.message}
            placeholder="Tiêu đề công việc"
            label="Tiêu đề công việc"
            {...register('job_title', { required: 'Tiêu đề công việc không được để trông' })}
            required={true}
          />
          {/* mô tả */}
          <div className="mt-8 grid grid-cols-1 gap-4 rounded-b-lg sm:grid-cols-2">
            {/* Trạng thái */}
            <SelectMui
              name="job_type"
              label="Loại công việc"
              placeholder="Nhập loại công việc"
              control={control}
              options={[
                { value: 'FULL_TIME', label: 'FULL_TIME' },
                { value: 'PART_TIME', label: 'PART_TIME' },
                { value: 'FREELANCE', label: 'FREELANCE' },
              ]}
              error={errors.job_type?.message}
            />

            {/* time làm vc */}
            <Input
              name="work_time"
              control={control}
              error={errors.work_time?.message}
              placeholder="Thời gian làm việc"
              label="Thời gian làm việc"
              required={true}
            />

            <SelectReact
              name="job_field"
              label="Lĩnh vực"
              placeholder="Chọn lĩnh vực"
              options={(faculties?.data || []).map(faculty => ({
                value: faculty.id,
                label: faculty.fieldName,
              }))}
              control={control}
              isMultiple={true}
              error={errors.job_field?.message}
              required={true}
            />
            {/* Trình độ */}
            <SelectMui
              name="job_level"
              label="Trình độ"
              placeholder="Nhập trình độ"
              control={control}
              options={[
                { value: 'INTERN', label: 'Intern' },
                { value: 'JUNIOR', label: 'Junior' },
                { value: 'SENIOR', label: 'Senior' },
                { value: 'FRESHER', label: 'Fresher' },
                { value: 'MIDDLE', label: 'Middle' },
              ]}
              error={errors.job_level?.message}
              required={true}
            />

            {/*Ngày hết hạn */}
            <DateComponent
              name="expiration_date"
              control={control}
              error={errors.expiration_date?.message}
              placeholder="Ngày hết hạn"
              label="Ngày hết hạn"
              required={true}
            />

            {/* số lượng */}
            <Input
              name="member_of_candidate"
              control={control}
              error={errors.member_of_candidate?.message}
              placeholder="Số lượng tuyển"
              label="Số lượng tuyển"
              required={true}
            />

            {/* Lương: cao */}
          </div>{' '}
          <div className="mt-5 grid grid-cols-1 gap-4">
            <Controller
              name="job_description"
              control={control}
              {...register('job_description')}
              defaultValue=""
              render={({ field }) => (
                <TextEditor
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  label="Mô tả công việc"
                  error={errors.job_description?.message}
                  required={true}
                />
              )}
            />

            {/* yêu cầu */}
            <Controller
              name="requirements"
              control={control}
              {...register('requirements')}
              defaultValue=""
              render={({ field }) => (
                <TextEditor
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  label="Yêu cầu"
                  error={errors.requirements?.message}
                  required={true}
                />
              )}
            />

            {/* phúc lợi */}
            <Controller
              name="benifits"
              control={control}
              {...register('benifits')}
              defaultValue=""
              render={({ field }) => (
                <TextEditor
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  label="Phúc lợi"
                  error={errors.benifits?.message}
                  required={true}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-5">
            <SelectMui
              name="salary_type"
              label="Loại lương"
              placeholder="Nhập loại lương"
              control={control}
              options={[
                { value: 'NEGOTIABLE', label: 'Thỏa thuận' },
                { value: 'FIXED', label: 'Cố định' },
              ]}
            />
            {salaryType === 'FIXED' && (
              <>
                <Input
                  name="max_salary"
                  type="number"
                  label="Mức lương từ"
                  placeholder="Cao nhất:"
                  control={control}
                  error={errors.max_salary?.message}
                  required={true}
                />

                {/* Lương: thấp */}
                <Input
                  name="min_salary"
                  type="number"
                  label="Đến mức lương"
                  placeholder="Thấp nhất:"
                  control={control}
                  error={errors.min_salary?.message}
                  required={true}
                />
              </>
            )}
          </div>
        </div>

        <div className="ml-auto w-fit py-5">
          <Button text="Cập nhập" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UpdateJob;
