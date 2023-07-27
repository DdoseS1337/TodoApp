// CustomInput.tsx
import React from 'react';
import { InputContainer, Label, StyledInput } from './input.styled';

interface CustomInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur
}) => (
  <InputContainer>
    <Label htmlFor={name}>{label}</Label>
    <StyledInput
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  </InputContainer>
);

export default CustomInput;
