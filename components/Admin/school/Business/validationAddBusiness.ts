import * as Yup from 'yup';

const validationSchemaAddBusiness = Yup.object({
  majorName: Yup.string().required('Tên ngành học là bắt buộc').max(50, 'Tên ngành học không được quá 50 kí tự'),
  majorCode: Yup.string().required('Mã ngành học là bắt buộc').max(50, 'Mã ngành học không được quá 50 kí tự'),
  creditRequirement: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .required('Số tín chỉ là bắt buộc')
    .positive('Số tín chỉ phải là số dương')
    .integer('Số tín chỉ phải là số nguyên'),
  numberOfStudents: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .required('Số lượng sinh viên là bắt buộc')
    .positive('Số lượng sinh viên phải là số dương')
    .integer('Số lượng sinh viên phải là số nguyên'),
  majorDescription: Yup.string().max(500, 'Mô tả ngành học không được quá 500 kí tự'),
  facultyId: Yup.number().required('Khoa là bắt buộc'),
  fieldIds: Yup.array()
    .of(Yup.number().typeError('Mỗi phần tử trong lĩnh vực phải là số').required('Không được để trống'))
    .min(1, 'Phải chọn ít nhất một lĩnh vực')
    .required('Danh sách lĩnh vực là bắt buộc'),
});

export default validationSchemaAddBusiness;
