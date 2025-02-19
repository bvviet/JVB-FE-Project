import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import validationSchemaAddBusiness from '../../../../components/Admin/school/Business/validationAddBusiness';
import { Button } from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import Text from '@/components/Common/Text';
import { setLoading } from '@/store/slices/global';
import SelectReact from '@/components/Common/SelectMui';
import { useAddBusinessMutation, useGetAllFieldsQuery, useGetAllMajorByQuery } from '@/services/adminSchoolApi';
import { isErrorWithMessage, isFetchBaseQueryError } from '@/services/helpers';

interface FormDataAddBusiness {
  majorCode: string;
  majorName: string;
  creditRequirement: number;
  majorDescription?: string;
  facultyId: number;
  fieldIds: number[];
}

const AddBussiness = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAddBusiness>({
    resolver: yupResolver(validationSchemaAddBusiness) as Resolver<FormDataAddBusiness>,
    defaultValues: {},
  });
  const { data: majores, isLoading: isLoadingMajor } = useGetAllMajorByQuery();
  const [addBusiness, { data, isLoading: isLoadingAddBusiness, isSuccess }] = useAddBusinessMutation();
  const router = useRouter();
  const { data: faculties, isLoading: isLoadingFaculies } = useGetAllFieldsQuery();
  const onSubmit: SubmitHandler<FormDataAddBusiness> = async data => {
    try {
      await addBusiness(data).unwrap();
      toast.success('Thêm ngành học thành công');
      router.push('/admin/school/businessManagement');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg = (error.data as { message?: string })?.message || 'Đã xảy ra lỗi';
        toast.error(errMsg);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    dispatch(setLoading(isLoadingMajor || isLoadingAddBusiness || isLoadingFaculies));
  }, [dispatch, isLoadingAddBusiness, isLoadingMajor, isLoadingFaculies, data?.message, isSuccess]);

  return (
    <div className="rounded-lg bg-primary-white p-6">
      <div className=" p-5">
        <Link href={'/admin/school/businessManagement'}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        Trở về
        <h1 className="mt-5 text-center text-xl font-bold lg:mb-8 lg:mt-0 lg:text-2xl">Thêm mới ngành học </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-primary-white px-5 sm:px-0 ">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            type="text"
            name="majorCode"
            label="Mã ngành học"
            placeholder="Nhập mã ngành học"
            control={control}
            error={errors.majorCode?.message}
            required={true}
          />
          <Input
            type="text"
            name="majorName"
            label="Tên ngành học"
            placeholder="Nhập tên ngành học"
            control={control}
            error={errors.majorName?.message}
            required={true}
          />
          <Input
            type="number"
            name="creditRequirement"
            label="Số tín chỉ"
            placeholder="Nhập số tín chỉ ngành học"
            control={control}
            error={errors.creditRequirement?.message}
            required={true}
          />

          <SelectReact
            name="facultyId"
            label="Khoa"
            placeholder="Chọn khoa"
            options={(majores?.data || []).map(major => ({
              value: major.id,
              label: major.facultyName,
            }))}
            control={control}
            error={errors.facultyId?.message}
            required={true}
          />
          <SelectReact
            name="fieldIds"
            label="Lĩnh vực"
            placeholder="Chọn lĩnh vực"
            options={(faculties?.data || []).map(faculty => ({
              value: faculty.id,
              label: faculty.fieldName,
            }))}
            control={control}
            isMultiple={true}
            error={errors.fieldIds?.message}
            required={true}
          />
        </div>
        <div className=" mt-5">
          <Text name="majorDescription" label="Mô tả ngành học" placeholder="Nhập mô tả ngành học" control={control} error={errors.majorDescription?.message} />
        </div>
        <div className="ml-auto w-fit">
          <Button text="Thêm mới" type="submit" />
        </div>
      </form>
    </div>
  );
};
export default AddBussiness;
