// src/components/shared/FormInput.tsx
import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => (
  <div>
    <label>{label}</label>
    <input {...props} />
  </div>
);

export default FormInput;