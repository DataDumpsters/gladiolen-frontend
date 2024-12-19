import React from "react";

interface InputfieldProps {
  label?: string;
  name: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  validateField?: (field: string, value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
}

const Inputfield = ({
  name,
  placeholder,
  value,
  setValue,
  validateField,
  onBlur,
  className,
  type = "text",
  label,
}: InputfieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (validateField) {
      validateField(name, e.target.value);
    }
  };
  return (
    <div className="relative">
      <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        className={`rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5 w-full ${className}`}
      />
    </div>
  );
};

export default Inputfield;
