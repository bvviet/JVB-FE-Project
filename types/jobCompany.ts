// types/jobCompany.ts

import { ICompany } from './companyType';
import { IFields } from '.';

export interface IJobCompany {
  id: number;
  jobTitle: string;
  jobDescription: string;
  requirements: string;
  jobType: string;
  workTime: string;
  benifits: string;
  jobLevel: string;
  expirationDate: string;
  memberOfCandidate: number;
  fields: IFields[];
  status: string;
  salaryType: string;
  maxSalary: number;
  minSalary: number;
}
export interface IJobCompanyPortal {
  id: number;
  jobTitle: string;
  jobDescription: string;
  requirements: string;
  jobType: string;
  workTime: string;
  benifits: string;
  jobLevel: string;
  expirationDate: string;
  memberOfCandidate: number;
  company: ICompany[];
  fields: IFields[];
  status: string;
  salaryType: string;
  maxSalary: number;
  minSalary: number;
}

export interface IJobAllResponse {
  code: number;
  message: string;
  data: {
    content: IJobCompany[];
    totalPages: number;
    totalElements: number;
    pageSize: number;
    currentPage: number;
  };
}
export interface IJobAllResponsePortal {
  code: number;
  message: string;
  data: {
    content: IJobCompanyPortal[];
    totalPages: number;
    totalElements: number;
    pageSize: number;
    currentPage: number;
  };
}

export interface IJobDetailResponse {
  code: number;
  message: string;
  data: IJobCompany;
}
