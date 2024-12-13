import { Faculty, IFields, University } from '.';
import { IFaculty } from './facultyType';

export interface IBusiness {
  id: number;
  majorName: string;
  majorCode: string;
  creditRequirement: number;
  majorDescription: string;
  numberOfStudents: number;
  faculty: IFaculty;
  university: University;
}
export interface ApiResponseBusiness {
  code: number;
  message: string;
  data: {
    content: IBusiness[];
    totalPages: number;
    totalElements: number;
    pageSize: number;
    currentPage: number;
  };
}
export interface ApiResponseDetailBusiness {
  code: number;
  message: string;
  data: {
    id: number;
    majorName: string;
    majorCode: string;
    creditRequirement: number;
    majorDescription: string;
    numberOfStudents: number;
    faculty: IFaculty;
    majorFields: IFields[];
  };
}