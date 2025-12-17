import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller } from 'react-hook-form';

interface RichTextEditorProps {
  control: any;
  name: string;
  errors: any;
  label: string;
}


const RichTextEditor: React.FC<RichTextEditorProps> = ({ control, name, errors, label }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <ReactQuill
          theme="snow"
          value={field.value || ''}
          onChange={field.onChange}
          className={`mt-1 border-gray-300 rounded ${errors[name] ? 'border-red-500' : 'border-gray-200'}`}
        />
      )}
    />
    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
  </div>
);

export default RichTextEditor;
