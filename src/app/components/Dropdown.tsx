import React from "react";

interface DropdownProps {
  name: string;
  title: string;
  items: (string | { id: number | string; name: string })[];
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
  );
};

export default Dropdown;
