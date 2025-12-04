import React from 'react';

const FormSelect = ({ label, name, register, errors, children, ...rest }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <select id={name} {...register(name)} {...rest} className={`mt-1 p-2 border rounded-md w-full ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}>
      {children}
    </select>
    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
  </div>
);

export default FormSelect;
