import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Chip, TextField, Tooltip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { BackdropType, setBackdrop, setLoading, setName } from '@/store/slices/global';
import { useAppSelector } from '@/store/hooks';
import { resetFilters } from '@/store/slices/filtersSlice';
import { isErrorWithMessage, isFetchBaseQueryError } from '@/services/helpers';
import {
  useAcceptPartnershipsMutation,
  useCancelPartnershipsMutation,
  useGetAllPartnershipsUniversityQuery,
  useRemovePartnershipsMutation,
} from '@/services/adminSystemApi';
import { StatusPartnership } from '@/utils/app/const';
import ImageComponent from '@/components/Common/Image';
import ButtonSee from '@/components/Common/ButtonIcon/ButtonSee';
import PaginationComponent from '@/components/Common/Pagination';
import RemovePerson from '@/components/Common/ButtonIcon/RemovePerson';
import ButtonAddPerson from '@/components/Common/ButtonIcon/AddPerson';
import PopupConfirmAction from '@/components/Common/PopupConfirmAction';

const JobAdminSchool = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>(null);
  const dispatch = useDispatch();
  const [partnershipStatus, setPartnershipStatus] = useState<string>('friend');
  const [selectId, setSelectId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('Rất tiếc tôi nhận thấy chúng ta không hợp nhau.');
  const showBackdrop = useAppSelector(state => state.global.backdropType);
  const name = useAppSelector(state => state.global.name);
  const universityId = useAppSelector(state => state.user?.id);
  const role = useAppSelector(state => state.user.roleAccount);

  const debouncedSearch = useMemo(
    () =>
      debounce(value => {
        setKeyword(value);
        setPage(1);
      }, 500),
    []
  );

  const getUrl = () => {
    if (partnershipStatus === 'friend') {
      return '/university-current';
    }
    return `/universities/send-by-${partnershipStatus === 'invitation' ? 'company' : 'university'}`;
  };

  const { data: partnerships, isLoading: isLoadingGetAll } = useGetAllPartnershipsUniversityQuery(
    { page, size, keyword, url: `/partnership${getUrl()}` },
    { refetchOnMountOrArgChange: true }
  );

  const [accept, { isLoading: isLoadingAccept }] = useAcceptPartnershipsMutation();
  const [cancel, { isLoading: isLoadingCancel }] = useCancelPartnershipsMutation();
  const [remove, { isLoading: isLoadingRemove }] = useRemovePartnershipsMutation();

  let doBy;

  if (role === 'UNIVERSITY') {
    doBy = 0;
  } else if (role === 'COMPANY') {
    doBy = 1;
  }

  const handleConfirmAction = async () => {
    if (showBackdrop) {
      try {
        switch (showBackdrop) {
          case BackdropType.ApproveConfirmation: {
            await accept({ accountLoginId: universityId, toDoAccountId: selectId, doBy }).unwrap();
            toast.success('Hợp tác thành công');
            break;
          }
          case BackdropType.RefuseConfirmation: {
            await cancel({ accountLoginId: universityId, toDoAccountId: selectId, doBy }).unwrap();
            toast.success('Từ chối hợp tác');
            break;
          }

          default:
            throw new Error('Invalid action type');
        }
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg = (error.data as { message?: string })?.message || 'Đã xảy ra lỗi';
          toast.error(errMsg);
        } else if (isErrorWithMessage(error)) {
          toast.error(error.message);
        }
      } finally {
        dispatch(setBackdrop(null));
      }
    }
  };
  useEffect(() => {
    dispatch(setLoading(isLoadingGetAll || isLoadingAccept || isLoadingCancel || isLoadingRemove));
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch, isLoadingGetAll, isLoadingAccept, isLoadingCancel, isLoadingRemove]);

  return (
    <>
      {/* Header */}
      <div className="rounded-t-md bg-white p-5 pb-5">
        <div className="flex items-center justify-between">
          <h1 className="mb-5 font-bold">Quản lý hợp tác</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setPartnershipStatus('friend');
                setPage(1);
                setKeyword('');
              }}
              className={`rounded-lg ${partnershipStatus === 'friend' ? 'bg-primary-main' : ''} bg-black px-4 py-[7px] text-xs text-white`}>
              Đối tác
            </button>
            <button
              onClick={() => {
                setPartnershipStatus('invitation');
                setPage(1);
                setKeyword('');
              }}
              className={`rounded-lg ${partnershipStatus === 'invitation' ? 'bg-primary-main' : ''} bg-black px-4 py-[7px] text-xs text-white`}>
              Lời mời
            </button>
            <button
              onClick={() => {
                setPartnershipStatus('request');
                setPage(1);
                setKeyword('');
              }}
              className={`rounded-lg ${partnershipStatus === 'request' ? 'bg-primary-main' : ''} bg-black px-4 py-[7px] text-xs text-white`}>
              Yêu cầu
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <TextField
              id="filled-search"
              label="Tìm kiếm tên, mã"
              type="search"
              variant="outlined"
              size="small"
              onChange={e => debouncedSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto bg-white">
        <div>
          {/* Row */}
          <div className="p-5">
            <div className="flex flex-col flex-wrap justify-start gap-x-3 gap-y-4">
              {partnerships?.data.content.map(partner => (
                <div className="rounded-lg border border-solid px-4 py-5" key={partner.company.id}>
                  <div className="flex w-full flex-wrap items-center justify-between gap-3 md:flex-nowrap">
                    <div className="flex w-full  items-center md:w-3/5 ">
                      <div className="flex h-[60px] w-[60px] flex-shrink-0 md:h-[100px] md:w-[100px]">
                        <ImageComponent
                          src={partner.company.logoUrl}
                          alt={partner.company?.companyName}
                          className="h-10 w-10 flex-shrink-0 rounded-full border border-solid object-contain md:h-20 md:w-20"
                          pro={partner.partnershipStatus === 'ACCEPT' ? true : false}
                        />
                      </div>
                      <div className="ml-0 font-semibold sm:ml-4 ">
                        <h4 className="mb-[6px] font-semibold">{partner.company.companyName}</h4>
                        <div className="flex-wrap items-center gap-2 text-[10px] text-[#002c3fb3] sm:gap-3 sm:text-[12px] md:flex ">
                          <p className="ml-[6px] whitespace-nowrap md:ml-0">Mã công ty: {partner.company.companyCode}</p>
                          <p className="whitespace-nowrap">
                            <LocationOnIcon fontSize="small" />
                            {partner.company.address?.district.districtName}, {partner.company.address?.province.provinceName}
                          </p>
                          <p className="ml-[6px] whitespace-nowrap">Mã số thuế: {partner.company.taxCode}</p>
                        </div>
                      </div>
                    </div>
                    <Chip
                      label={StatusPartnership(partner.partnershipStatus)?.title}
                      sx={{
                        backgroundColor: StatusPartnership(partner.partnershipStatus)?.bg,
                        color: StatusPartnership(partner.partnershipStatus)?.color,
                      }}
                    />
                    <div className="flex whitespace-nowrap  text-[14px] md:flex-wrap ">
                      <p>Ngày hợp tác</p>
                      <p> {partner.startDate}</p>
                    </div>
                    {/* Button */}
                    <div className="flex items-center gap-3">
                      <ButtonSee
                        onClick={() => {
                          setSelectId(partner.company.id);
                        }}
                        href={`/portal/companies/${partner.company.id}`}
                      />
                      {partner.partnershipStatus === 'CANCEL' ? null : partner.partnershipStatus === 'ACCEPT' ? (
                        <RemovePerson
                          onClick={() => {
                            dispatch(setBackdrop(BackdropType.DeleteConfirmation));
                            dispatch(setName(partner.company.companyName));
                            setSelectId(partner.company.id);
                          }}
                        />
                      ) : (
                        <>
                          {partnershipStatus !== 'request' ? (
                            <ButtonAddPerson
                              onClick={() => {
                                dispatch(setBackdrop(BackdropType.ApproveConfirmation));
                                dispatch(setName(partner.company.companyName));
                                setSelectId(partner.company.id);
                              }}
                            />
                          ) : (
                            ''
                          )}
                          {partnershipStatus === 'friend' ? (
                            <RemovePerson
                              onClick={() => {
                                dispatch(setBackdrop(BackdropType.DeleteConfirmation));
                                dispatch(setName(partner.company.companyName));
                                setSelectId(partner.company.id);
                              }}
                            />
                          ) : (
                            <Tooltip title="Từ chối">
                              <div
                                className="cursor-pointer rounded-lg bg-[#ffa4101a] px-2 py-[6px] transition-all hover:bg-[#ffa31048]"
                                onClick={() => {
                                  dispatch(setBackdrop(BackdropType.RefuseConfirmation));
                                  dispatch(setName(partner.company.companyName));
                                  setSelectId(partner.company.id);
                                }}>
                                <CancelIcon color="warning" fontSize="small" />
                              </div>
                            </Tooltip>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <PaginationComponent
        count={partnerships?.data.totalPages}
        page={page}
        onPageChange={(event, value) => setPage(value)}
        size={size}
        totalItem={partnerships?.data.totalElements}
        onSizeChange={value => setSize(value)}
      />
      {(showBackdrop === BackdropType.ApproveConfirmation || showBackdrop === BackdropType.RefuseConfirmation) && (
        <PopupConfirmAction
          text={`${showBackdrop === BackdropType.ApproveConfirmation ? 'Đồng ý' : showBackdrop === BackdropType.RefuseConfirmation ? 'Từ chối ' : ''} hợp tác`}
          name={name}
          onClick={handleConfirmAction}
        />
      )}

      {showBackdrop === BackdropType.DeleteConfirmation && (
        <PopupConfirmAction
          name={name}
          text="Hủy hợp tác với"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClick={async () => {
            try {
              await remove({ accountLoginId: universityId, toDoAccountId: selectId, doBy, message: searchTerm }).unwrap();
              toast.success('Hủy hợp tác thành công');
            } catch (error) {
              if (isFetchBaseQueryError(error)) {
                const errMsg = (error.data as { message?: string })?.message || 'Đã xảy ra lỗi';
                toast.error(errMsg);
              } else if (isErrorWithMessage(error)) {
                toast.error(error.message);
              }
            } finally {
              dispatch(setBackdrop(null));
            }
          }}
          reason={true}
        />
      )}
    </>
  );
};

export default JobAdminSchool;
