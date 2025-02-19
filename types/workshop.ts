// types/workshop.ts

import { IUniversity } from './university';
import { IAddress } from './addressesTypes';
import { JobWork } from './workShopCompany';
import { IAccount, IFields } from './index';

export interface ImageWorkshops {
  id: number;
  imageUrl: string;
}

export interface IWorkshop {
  id: number;
  workshopTitle: string;
  workshopDescription: string;
  startTime: string;
  endTime: string;
  estimateCompanyParticipants: number;
  agenda: string;
  moderationStatus: string;
  imageWorkshops: ImageWorkshops[];
  isApply: boolean;
  statusCompanyApply: string | null;
  address: IAddress;
  university: IUniversity;
  fields: IFields[];
  createAt: string;
  updateAt: string;
  isDelete: false;
  workshopStatus: string;
  workshop: JobWork;
}

export interface IWorkshopPortal {
  id: number;
  workshopTitle: string;
  workshopDescription: string;
  startTime: string;
  endTime: string;
  estimateCompanyParticipants: number;
  agenda: string;
  moderationStatus: string;
  imageWorkshops: string;
  image: string;
  address: IAddress;
  university: IUniversity;
  fields: IFields[];
  createAt: string;
  updateAt: string;
  isDelete: false;
  workshopStatus: string;
}

export interface WorkshopResponse {
  code: number;
  message: string;
  data: {
    content: IWorkshop[];
    totalPages: number;
    totalElements: number;
    pageSize: number;
    currentPage: number;
  };
}

export interface WorkshopResponseCompany {
  code: number;
  message: string;
  data: {
    content: {
      id: number;
      status: string;
      createAt: string;
      updateAt: string;
      createBy: string;
      updateBy: string;
      workshop: IWorkshop;
    }[];
    totalPages: number;
    totalElements: number;
    pageSize: number;
    currentPage: number;
  };
}

export interface WorkshopResponsePortal {
  code: number;
  message: string;
  data: {
    content: IWorkshopPortal[];
    totalPages: number;
    totalElements: number;
    pageSize: number;
    currentPage: number;
  };
}

export interface WorkshopDetailResponse {
  code: number;
  message: string;
  data: IWorkshop;
}

export interface ChatRoomResponse {
  code: number;
  message: string;
  data: {
    id: number;
    isDeleted: boolean;
    owner: IAccount;
    member: IAccount;
  };
}

export interface ChatResponse {
  code: number;
  message: string;
  data: {
    id: number;
    sender: IAccount;
    receiver: IAccount;
    chatRoomId: number;
    content: string;
    type: string;
    referChat: ChatResponse;
    isDeleted: boolean;
    isRead: boolean;
  };
}

// ---------------------company--------------------
