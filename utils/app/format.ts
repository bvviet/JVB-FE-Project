import { format } from 'date-fns';
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

export const formatDateDd_MM_yyyy = (date: string | null): string | null => {
  return date ? format(date, 'dd/MM/yyyy') : null;
};

export const formatDateDD_thang_MM_yyyy = (dateTimeStr: string | null): string => {
  if (!dateTimeStr) {
    return ''; // Handle invalid date input
  }

  const date = new Date(dateTimeStr);
  const months = ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'];

  return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}, ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

export const formatCurrencyVND = (value: number | null) => {
  return value ? value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : null;
};
