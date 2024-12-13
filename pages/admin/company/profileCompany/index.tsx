
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import DescriptionIcon from '@mui/icons-material/Description';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import AddLinkIcon from '@mui/icons-material/AddLink';
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store/hooks';
import { setLoading } from '@/store/slices/global';
import { useGetDetailProfileQuery } from '@/services/adminCompanyApi';
import { Chip } from '@mui/material';
import { Button } from '@/components/Common/Button';
import ImageUploaderOne from '@/components/Common/ImageUploaderOne';


const profileCompany = () => {
  const [image, setImage] = useState<File[]>([]);
  const dispatch = useAppDispatch();
  const { data: profile, isLoading } = useGetDetailProfileQuery();
  console.log(profile);
  

  
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);
  
  return (
    <div className="rounded-2xl bg-white pb-[90px]">
      <h1 className="mb-12 mt-3 text-center text-2xl font-bold">Chi tiết công ty</h1>

      {/* Block 2 */}
        <div className="grid grid-cols-1 gap-4 rounded-lg bg-primary-white ">
      {/* Image */}
        <ImageUploaderOne images={image} setImages={setImage} />
       </div>

    {/* Info */}
     <div className="mx-auto max-w-[650px] rounded-[10px] border-[1px] border-solid border-[#7D8087] p-7">
    <ul className="">
      <li className="mt-4 flex items-center  gap-3 ">
        <CameraOutdoorIcon sx={{ color: '#757575' }} />
        <div>
          <span className="mr-2 font-semibold">logoUrl:</span> {profile?.data.logoUrl}
        </div>
      </li>
      <li className="mt-4 flex items-center  gap-3 ">
        <PersonOutlineIcon sx={{ color: '#757575' }} />
        <div>
          <span className="mr-2 font-semibold">Mô tả ngắn:</span> {profile?.data.companyShortDescription}
        </div>
      </li>
      <li className="mt-5 flex items-center gap-3">
        <AddLinkIcon sx={{ color: '#757575' }} />
        <div>
          <span className="mr-2 font-semibold">Linkwebsite:</span> {profile?.data.linkWebsite}
        </div>
      </li>
      <li className="mt-5 flex items-center gap-3">
        <StarBorderIcon sx={{ color: '#757575' }} />
        <div>
          <span className="mr-2 font-semibold">Email:</span> {profile?.data.email}
        </div>
      </li>
      <li className="mt-5 flex items-center gap-3">
        <DriveFileRenameOutlineIcon sx={{ color: '#757575' }} />
        <div>
          <span className="mr-2 font-semibold">Tên công ty:</span> {profile?.data.companyName}
        </div>
      </li>
      <li className="mt-5 flex items-center gap-3">
        <CreditScoreIcon sx={{ color: '#757575' }} />
        <div>
          <span className="mr-2 font-semibold">Mã công ty:</span> {profile?.data.companyCode}
        </div>
      </li>
      <li className="mt-4 flex items-center  gap-3 ">
        <DescriptionIcon sx={{ color: '#757575' }} />
        <div>
          <span className="mr-2 font-semibold">Mô tả:</span> {profile?.data.companyDescription}
        </div>
      </li>
      <li className="mt-4 flex items-center  gap-3 ">
        <PhoneIcon sx={{ color: '#757575' }} />
        <div>
          <span className="mr-2 font-semibold">Số điện thoại:</span> {profile?.data.phoneNumber}
        </div>
      </li>
      <li className="mt-4 flex items-center  gap-3 ">
        <PaymentsIcon sx={{ color: '#757575' }} />
        <div>
          <span className="mr-2 font-semibold">taxCode:</span> {profile?.data.taxCode}
        </div>
      </li>
      <li className="mt-4 flex items-center  gap-3 ">
        <DateRangeIcon sx={{ color: '#757575' }} />
        <div>
          <span className="mr-2 font-semibold">Ngày thành lập:</span> {profile?.data.establishedDate}
        </div>
      </li>
      <li className="mt-4 flex  gap-3 ">
        <HorizontalSplitIcon sx={{ color: '#757575' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span className="mr-2 font-semibold" style={{ fontWeight: 'bold' }}>Fields:</span>
          {profile?.data.fields.map((field) => (
            <Chip
              key={field.id}
              label={field.fieldName}
              color="primary"
              variant="outlined"
              style={{ fontSize: '14px' }}
            />
          ))}
        </div>
      </li>
      <li className="mt-5 flex items-center gap-3">
        <AddLocationAltIcon sx={{ color: '#757575' }} />
        <div>
          <span className="mr-2 font-semibold">Địa chỉ:</span> {profile?.data.address.houseNumber}, {profile?.data.address.ward.wardName}, {profile?.data.address.district.districtName}, {profile?.data.address.province.provinceName}
        </div>
      </li>    

    </ul>

    <div className="mt-9 flex items-center gap-5">
     <Button text="Sửa" full={true} />
    </div>
     </div>

    </div>
  );
}

export default profileCompany

