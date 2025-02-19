import * as Yup from 'yup';

const ValidationSchemaUpdateBusiness = Yup.object({
  majorName: Yup.string().required('Tên ngành học là bắt buộc').max(50, 'Tên ngành học không được quá 50 kí tự'),
  majorCode: Yup.string().required('Mã ngành học là bắt buộc').max(50, 'Mã ngành học không được quá 50 kí tự'),
  creditRequirement: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .required('Số tín chỉ là bắt buộc')
    .positive('Số tín chỉ phải là số dương')
    .integer('Số tín chỉ phải là số nguyên')
    .max(70, 'Số tín chỉ lớn nhất là 70'),

  facultyId: Yup.number().required('Danh sách ngành là bắt buộc'),
  fieldIds: Yup.array().of(Yup.number().required('Mỗi phần tử trong lĩnh vực phải là số')).required('Danh sách lĩnh vực là bắt buộc'),
});

export default ValidationSchemaUpdateBusiness;
