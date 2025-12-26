import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller } from 'react-hook-form';

interface RichTextEditorProps {
  control: any;
  name: string;
  errors: any;
  label: string;
  maxLength?: number;
}


const RichTextEditor: React.FC<RichTextEditorProps> = ({ control, name, errors, label, maxLength }) => {
  const rules = maxLength ? {
    validate: (value: string) => {
      // Use a temporary element to robustly get plain text from HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = value;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      
      console.log("--- RichTextEditor Validation ---");
      console.log("Raw HTML value:", value);
      console.log("Extracted plain text:", plainText);

      // Correctly calculate word count, handles empty/whitespace strings
      const trimmedText = plainText.trim();
      const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
      console.log("Calculated word count:", wordCount);

      if (wordCount > maxLength) {
        const message = `Description cannot be more than ${maxLength} words. Current count: ${wordCount}`;
        console.log("Validation failed:", message);
        return message;
      }
      
      console.log("Validation passed.");
      return true;
    }
  } : {};

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
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
}

export default RichTextEditor;
