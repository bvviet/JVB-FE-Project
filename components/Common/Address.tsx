/* eslint-disable @typescript-eslint/no-explicit-any */
// Select.tsx
import { Control, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useGetAllDistrictsQuery, useGetAllProvincesQuery } from '@/services/adminSystemApi';

interface SelectProps {
  name: string;
  label?: string;
  control: Control<any>;
  error?: string;
  className?: string;
}

const Address = ({ name, label, control, error, className }: SelectProps) => {
  const [provinceId, setProvinceId] = useState<number | undefined>(undefined);
  const { data: provinces } = useGetAllProvincesQuery();
  const { data: districts } = useGetAllDistrictsQuery({ id: provinceId });
  return (
    <div className={`${className}`}>
      {/* Province */}
      <div>
        <label htmlFor={name} className="mb-1 block text-sm font-semibold text-gray-700">
          Tỉnh
        </label>
        <select
          id={name}
          onChange={e => setProvinceId(Number(e.target.value))}
          className={`block w-full cursor-pointer rounded-md border px-3 py-2 text-sm ${
            error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 placeholder:text-sm focus:border-gray-300'
          } focus:outline-none focus:ring-0`}>
          {provinces?.data.map(province => (
            <option key={province.id} value={province.id} className="text-sm">
              {province.provinceName}
            </option>
          ))}
        </select>
      </div>

      {/* Districts */}
      <div>
        <label htmlFor={name} className="mb-1 block text-sm font-semibold text-gray-700">
          Tỉnh
        </label>
        <select
          id={name}
          onChange={e => setProvinceId(Number(e.target.value))}
          className={`block w-full cursor-pointer rounded-md border px-3 py-2 text-sm ${
            error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 placeholder:text-sm focus:border-gray-300'
          } focus:outline-none focus:ring-0`}>
          {provinces?.data.map(province => (
            <option key={province.id} value={province.id} className="text-sm">
              {province.provinceName}
            </option>
          ))}
        </select>
      </div>
      {/*  */}
      <label htmlFor={name} className="mb-1 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            id={name}
            className={`block w-full cursor-pointer rounded-md border px-3 py-2 text-sm ${
              error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 placeholder:text-sm focus:border-gray-300'
            } focus:outline-none focus:ring-0`}>
            <option value="2" className="text-sm">
              aa
            </option>
          </select>
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Address;
