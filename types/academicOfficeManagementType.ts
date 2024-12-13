import { IAccount, University } from '.';
import { IAddress } from './addressesTypes';

export interface IAcademicOfficeManagement {
  id: number;
  employeeCode: string;
  phoneNumber: string;
  fullName: string;
  avatarUrl: string;
  address: IAddress;
  gender: string;
  dateOfBirth: string;
  university: University;
  acount: IAccount;
}
export interface ApiResponseAcademicOfficeManagement {
  code: number;
  message: string;
  data: {
    content: IAcademicOfficeManagement[];
    totalPages: number;
    totalElements: number;
    pageSize: number;
    currentPage: number;
  };
}
export interface ApiResponseDetailAdemicOfficeManagement {
    code: number;
    message: string;
    data: IAcademicOfficeManagement;
  }
  