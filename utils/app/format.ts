import { format, isValid } from 'date-fns';
import { parse } from 'date-fns';

export const formatDate = (date: string | null): string => {
  if (!date) {
    return ''; // Or any fallback value you prefer
  }
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

export const toISOString = (date: string): string => {
  const parsedDate = parse(date, 'dd/MM/yyyy HH:mm:ss', new Date());
  return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");
};

export const formatDateSearch = (date: Date | null): string | null => {
  return date ? format(date, 'yyyy-MM-dd') : null;
};

export const formatDateDd_MM_yyyy = (date: Date | string | null): string | null => {
  if (!date) {
    return null;
  }

  // Nếu date là một chuỗi, hãy chuyển đổi nó thành một đối tượng Date
  let dateObj: Date;
  if (typeof date === 'string') {
    dateObj = new Date(date);
    // Kiểm tra tính hợp lệ của chuỗi ngày tháng
    if (!isValid(dateObj)) {
      return null;
    }
  } else {
    dateObj = date;
  }

  // Định dạng ngày tháng thành 'dd/MM/yyyy'
  return format(dateObj, 'dd/MM/yyyy');
};
