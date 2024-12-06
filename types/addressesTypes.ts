interface Ward {
  id: number;
  wardName: string;
}

interface District {
  id: number;
  districtName: string;
}

export interface ProvinceDistricts {
  code: number;
  message: string;
  data: District[];
}

interface Province {
  id: number;
  provinceName: string;
}

export interface ProvinceResponse {
  code: number;
  message: string;
  data: Province[];
}

export interface Address {
  houseNumber: string;
  ward: Ward;
  district: District;
  province: Province;
}
