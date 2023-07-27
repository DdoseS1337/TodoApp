import React from 'react';
import { InputContainer, Label, StyledInput, StyledCheckboxInput } from './input.styled';

interface InputProps {
  label: string;
  type: 'text' | 'checkbox';
  id: string;
  name: string;
  value: string | boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, type, id, name, value, onChange }) => (
  <InputContainer>
    {type === 'text' ? (
      <>
        <Label htmlFor={id}>{label}</Label>
        <StyledInput type={type} id={id} name={name} value={value as string} onChange={onChange} />
      </>
    ) : (
      <>
        <Label htmlFor={id}>{label}</Label>
        <StyledCheckboxInput
          type="checkbox"
          id={id}
          name={name}
          checked={value as boolean}
          onChange={onChange}
        />
      </>
    )}
  </InputContainer>
);

export default Input;
