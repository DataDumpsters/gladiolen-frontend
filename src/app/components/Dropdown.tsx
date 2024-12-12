import React from "react";

interface DropdownProps {
  name: string;
  title: string;
  items: string[];
  value: string;
  setValue: (value: string) => void;
}

const Dropdown = ({ name, title, items, value, setValue }: DropdownProps) => {
  return (
    <select
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5">
      <option value="">Selecteer een {title}</option>
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
