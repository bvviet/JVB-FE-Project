'use client';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { Checkbox } from '@mui/material';
import toast from 'react-hot-toast';
import Link from 'next/link';

import { Button } from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import AuthLayout from '@/layouts/AuthLayout';
import { useLoginMutation } from '@/services/adminSystemApi';
import { useAppDispatch } from '@/store/hooks';
import { logIn } from '@/store/slices/user';
import { setLoading } from '@/store/slices/global';
import { roles } from '@/utils/app/const';

interface FormDataLogin {
  password: string;
  email: string;
}

// Đưa validationSchema lên trước
const validationSchema = Yup.object({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email không hợp lệ')
    .required('Email không được bỏ trống')
    .max(50, 'Email không được quá 50 kí tự'),
  password: Yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu phải có ít nhất 8 ký tự'),
  // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt'),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: yupResolver(validationSchema),
  });
  const [login, { isLoading, isSuccess, data, isError, error }] = useLoginMutation();

  const onSubmit: SubmitHandler<FormDataLogin> = data => {
    login(data);
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (isSuccess) {
      dispatch(logIn(data.data));
      switch (data?.data.roleAccount) {
        case roles.ADMIN:
          router.push('/admin/system/dashboard');
          break;
        case roles.COMPANY:
          router.push('/admin/company/dashboard');
          break;
        case roles.UNIVERSITY:
          router.push('/admin/school/dashboard');
          break;
        default:
          break;
      }
    }

    if (isError) {
      if ('status' in error) {
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data.message);
        toast.error(errMsg);
      }
    }
  }, [isSuccess, isError, data?.data]);

  return (
    <AuthLayout type="login">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[300px]">
        <h1 className="my-6 text-2xl font-bold">Đăng nhập</h1>
        <div className="border p-5 shadow">
          <div className="flex flex-col gap-4 rounded-lg ">
            <Input name="email" label="Email" placeholder="Nhập email" control={control} error={errors.email?.message} required={true} />

            <Input
              type="password"
              name="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              control={control}
              error={errors.password?.message}
              required={true}
            />
          </div>
          <div className="mt-2 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember-password" color="success" size="small" className="!p-0" />
                <label htmlFor="remember-password" className="cursor-pointer text-sm">
                  Nhớ mật khẩu
                </label>
              </div>
              <Link href={'/auth/forgot-password/send-email'} className="text-sm text-primary-main">
                Quên mật khẩu ?
              </Link>
            </div>
            <Button text="Đăng nhập" full={true} type="submit" />
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
