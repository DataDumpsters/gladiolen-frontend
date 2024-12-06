import React from "react";

interface InputfieldProps {
  name: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  validateField: (field: string, value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Inputfield = ({
  name,
  placeholder,
  value,
  setValue,
  validateField,
  onBlur,
}: InputfieldProps) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        validateField(name, e.target.value);
      }}
      onBlur={onBlur}
      className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5"
    />
  );
};

export default Inputfield;
