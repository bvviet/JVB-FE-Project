export const API_SERVER_HOST = process.env.OPENAI_API_HOST || 'https://api.openai.com';
interface AccountStatus {
  title: string;
  color: string;
  bg: string;
}

export const roles = {
  ADMIN: 'ADMIN',
  COMPANY: 'COMPANY',
  EMPLOYEE_COMPANY: 'EMPLOYEE_COMPANY',
  UNIVERSITY: 'UNIVERSITY',
  EMPLOYEE_UNIVERSITY: 'EMPLOYEE_UNIVERSITY',
};

export const gender = [
  { value: 'MALE', label: 'Nam' },
  { value: 'FEMALE', label: 'Nữ' },
  { value: 'OTHER', label: 'Khác' },
];

export const positionEmployee = [
  { value: 'INTERN', label: 'Intern' },
  { value: 'FRESHER', label: 'Fresher' },
  { value: 'JUNIOR', label: 'Junior' },
  { value: 'MIDDLE', label: 'Middle' },
  { value: 'SENIOR', label: 'Senior' },
];

export const genderTitle = (gender: string | undefined): string => {
  switch (gender) {
    case 'MALE':
      return 'Nam';
    case 'FEMALE':
      return 'Nữ';
    case 'OTHER':
      return 'Khác';
    default:
      return 'Chưa xác định';
  }
};

export const StatusStudent = (status: string | undefined): string => {
  switch (status) {
    case 'GRADUATED':
      return 'Đã tốt nghiệp';
    case 'IN_PROGRESS':
      return 'Đang học';
    case 'DROPPED_OUT':
      return 'Bỏ học';
    default:
      return 'Chưa xác định';
  }
};

export const typeUniversity = [
  {
    value: '',
    label: 'Tất cả',
  },
  {
    value: 'UNIVERSITY',
    label: 'Đại học',
  },
  {
    value: 'ACADEMY',
    label: 'Học viện',
  },
  {
    value: 'COLLEGE',
    label: 'Cao đẳng',
  },
  {
    value: 'OTHER',
    label: 'Khác',
  },
];

export const typeUniversityTitle = (status: string): AccountStatus => {
  switch (status) {
    case 'UNIVERSITY':
      return { title: 'Đại học', color: '#fff', bg: '#ed6c02' };
    case 'ACADEMY':
      return { title: 'Học viện', color: '#fff', bg: '#2e7d32' };
    case 'COLLEGE':
      return { title: 'Cao đẳng', color: '#d32f2f', bg: '#FFE5E5' };
    case 'OTHER':
      return { title: 'Khác', color: '#d32f2f', bg: '#FFE5E5' };
    default:
      return { title: 'Chưa xác định', color: '#fff', bg: '#FFF4E5' };
  }
};

export const StatusJob = (status: string): AccountStatus => {
  switch (status) {
    case 'PENDING':
      return { title: 'Đang chờ', color: '#FFA726', bg: '#fffae5' };
    case 'ACCEPT':
      return { title: 'Thành công', color: '#359d65', bg: '#ebf9f1' };
    case 'CANCEL':
      return { title: 'Đã hủy', color: '#d32f2f', bg: '#FFE5E5' };
    default:
      return { title: 'Chưa xác định', color: '#fff', bg: '#FFF4E5' };
  }
};

export const StatusPartnership = (status: string): AccountStatus => {
  switch (status) {
    case 'PENDING':
      return { title: 'Đang chờ', color: '#FFA726', bg: '#fffae5' };
    case 'ACCEPT':
      return { title: 'Hợp tác', color: '#359d65', bg: '#ebf9f1' };
    case 'CANCEL':
      return { title: 'Từ chối', color: '#d32f2f', bg: '#FFE5E5' };
    default:
      return { title: 'Chưa xác định', color: '#fff', bg: '#FFF4E5' };
  }
};

export const typeAccount = (status: string): AccountStatus => {
  switch (status) {
    case 'PENDING':
      return { title: 'Chờ duyệt', color: '#FFA726', bg: '#fffae5' };
    case 'ACTIVE':
      return { title: 'Hoạt động', color: '#359d65', bg: '#ebf9f1' };
    case 'BAN':
      return { title: 'Ngừng hoạt động', color: '#d32f2f', bg: '#FFE5E5' };
    default:
      return { title: 'Chưa xác định', color: '#fff', bg: '#FFF4E5' };
  }
};

export const statusTextWorkshop = (status: string): AccountStatus => {
  switch (status) {
    case 'APPROVED':
      return { title: 'Đã duyệt', color: '#359d65', bg: '#ebf9f1' };
    case 'PENDING':
      return { title: 'Đang chờ', color: '#FFA726', bg: '#fffae5' };
    case 'REJECTED':
      return { title: 'Từ chối', color: '#d32f2f', bg: '#FFE5E5' };
    default:
      return { title: 'Chưa xác định', color: '#fff', bg: '#FFF4E5' };
  }
};

export const statusLabelJob = (status: string): AccountStatus => {
  switch (status) {
    case 'APPROVED':
      return { title: 'Đã duyệt', color: '#359d65', bg: '#ebf9f1' };
    case 'PENDING':
      return { title: 'Đang chờ', color: '#FFA726', bg: '#fffae5' };
    case 'REJECT':
      return { title: 'Từ chối', color: '#d32f2f', bg: '#FFE5E5' };
    default:
      return { title: 'Chưa xác định', color: '#fff', bg: '#FFF4E5' };
  }
};

export const statusTextJob = (status: string): AccountStatus => {
  switch (status) {
    case 'ACCEPT':
      return { title: 'Đã duyệt', color: '#359d65', bg: '#ebf9f1' };
    case 'PENDING':
      return { title: 'Đang chờ', color: '#FFA726', bg: '#fffae5' };
    case 'CANCEL':
      return { title: 'Từ chối', color: '#d32f2f', bg: '#FFE5E5' };
    default:
      return { title: 'Chưa xác định', color: '#fff', bg: '#FFF4E5' };
  }
};

export const statusEmployee = (status: string): AccountStatus => {
  switch (status) {
    case 'WORKING':
      return { title: 'đang làm', color: '#fff', bg: '#ed6c02' };
    case 'INACTIVE':
      return { title: 'Nghỉ việc', color: '#fff', bg: '#2e7d32' };
    default:
      return { title: 'Chưa xác định', color: '#fff', bg: '#FFF4E5' };
  }
};

export const statusTextWorkshopJob = (status: string): AccountStatus => {
  switch (status) {
    case 'ACCEPT':
      return { title: 'Đã duyệt', color: '#359d65', bg: '#ebf9f1' };
    case 'PENDING':
      return { title: 'Đang chờ', color: '#FFA726', bg: '#fffae5' };
    case 'CANCEL':
      return { title: 'Từ chối', color: '#d32f2f', bg: '#FFE5E5' };
    default:
      return { title: 'Chưa xác định', color: '#fff', bg: '#FFF4E5' };
  }
};

export const jobType = (status: string | undefined): string => {
  switch (status) {
    case 'FULL_TIME':
      return 'Toàn thời gian';
    case 'PART_TIME':
      return 'Bán thời gian';
    case 'FREELANCE':
      return 'Tự do';
    default:
      return 'Chưa xác định';
  }
};

export const jobLever = (status: string | undefined): string => {
  switch (status) {
    case 'INTERN':
      return 'Toàn thời gian';
    case 'FRESHER':
      return 'Bán thời gian';
    case 'JUNIOR':
      return 'Tự do';
    case 'MIDDLE':
      return 'Tự do';
    case 'SENIOR':
      return 'Tự do';
    default:
      return 'Chưa xác định';
  }
};

export function countTimeDifference(startDateStr: string, currentDateStr: string | null = null): string {
  // Chuyển đổi chuỗi ngày theo định dạng "DD/MM/YYYY" thành đối tượng Date
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // Month trong JavaScript bắt đầu từ 0
  };

  const startDate = parseDate(startDateStr);
  const currentDate = currentDateStr ? parseDate(currentDateStr) : new Date();

  // Tính toán sự chênh lệch
  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();
  let days = currentDate.getDate() - startDate.getDate();

  // Điều chỉnh nếu chênh lệch tháng hoặc ngày âm
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 0 && months === 0 && days === 0) {
    return `${years} năm`;
  } else if (years > 0 || months > 0) {
    return `${years > 0 ? `${years} năm` : ''}${months > 0 ? (years > 0 ? ', ' : '') + `${months} tháng` : ''}`;
  } else {
    return `${days} ngày`;
  }
}
