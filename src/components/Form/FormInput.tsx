import React, { type InputHTMLAttributes } from 'react';
import {
    type UseFormRegister,
    type FieldErrors,
    type FieldValues,
    type Path,
    type RegisterOptions
} from 'react-hook-form';

interface FormInputProps<TFieldValues extends FieldValues = FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  rules?: RegisterOptions;
}

const FormInput = <TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  register,
  errors,
  rules,
  ...rest
}: FormInputProps<TFieldValues>) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input id={name} {...register(name, rules)} {...rest} className={`mt-1 p-2 border rounded-md w-full ${errors[name] ? 'border-red-500' : 'border-gray-300'}`} />
    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message as string}</p>}
  </div>
);

export default FormInput;
