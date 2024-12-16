import * as Yup from 'yup';

const validationSchemaUpdateAdemic = Yup.object({
  fullName: Yup.string().required('Tên nhân viên là bắt buộc').max(50, 'Tên nhân viên không được quá 50 kí tự'),
  employeeCode: Yup.string().required('Mã nhân viên là bắt buộc').max(50, 'Mã nhân viên không được quá 50 kí tự'),

  gender: Yup.string(),
  email: Yup.string()
    .required('Email là bắt buộc')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email không đúng định dạng')
    .max(50, 'Email không được quá 50 kí tự'),
  phoneNumber: Yup.string()
    .matches(/^0\d{9}$/, 'Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số')
    .required('Số điện thoại là bắt buộc'),
  dateOfBirth: Yup.string(),
  avatarUrl: Yup.mixed()
    .test('fileType', 'Chỉ chấp nhận định dạng JPG hoặc PNG', value => {
      if (!value) return true; // Không bắt buộc
      return value instanceof File && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
    })
    .test('fileSize', 'Kích thước file không được quá 2MB', value => {
      if (!value) return true; // Không bắt buộc
      return value instanceof File && value.size <= 2 * 1024 * 1024; // 2MB
    }),
  houseNumber: Yup.string().required('Địa chỉ cụ thể sinh viên là bắt buộc').max(255, 'Địa chỉ cụ thể không được quá 255 kí tự'),
  wardId: Yup.number().required('Xã/Phường là bắt buộc'),
  districtId: Yup.number().required('Quận/Huyện là bắt buộc'),
  provinceId: Yup.number().required('Tỉnh/Thành phố là bắt buộc'),
});

export default validationSchemaUpdateAdemic;
