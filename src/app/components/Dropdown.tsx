import React from "react";

interface DropdownProps {
  name: string;
  label: string;
  title: string;
  items: (string | { id: number | string; name: string })[];
  value: string;
  setValue: (value: string) => void;
  validateField?: (field: string, value: string) => void;
}

const Dropdown = ({
  name,
  label,
  title,
  items,
  value,
  setValue,
  validateField,
}: DropdownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5 w-full">
        <option value="">Selecteer een {title}</option>
        {items.map((item) => {
          if (typeof item === "string") {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          } else {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default Dropdown;
