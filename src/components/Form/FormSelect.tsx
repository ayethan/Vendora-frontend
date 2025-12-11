import React, { type SelectHTMLAttributes } from 'react';
import {
    type UseFormRegister,
    type FieldErrors,
    type FieldValues,
    type Path,
    type RegisterOptions
} from 'react-hook-form';

interface FormSelectProps<TFieldValues extends FieldValues = FieldValues> extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  children: React.ReactNode;
  rules?: RegisterOptions;
}


const FormSelect = <TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  register,
  errors,
  children,
  rules,
  ...rest
}: FormSelectProps<TFieldValues>) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <select id={name} {...register(name, rules)} {...rest} className={`mt-1 p-2 border rounded-md w-full ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}>
      {children}
    </select>
    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message as string}</p>}
  </div>
);

export default FormSelect;
