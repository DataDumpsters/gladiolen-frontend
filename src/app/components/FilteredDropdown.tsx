import React, { useState } from "react";

interface FilteredDropdownProps {
  name: string;
  title: string;
  items: { id: number; name: string }[];
  value: string;
  setValue: (value: string) => void;
}

const FilteredDropdown = ({
  name,
  title,
  items,
  value,
  setValue,
}: FilteredDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-bold">
        {title}
      </label>
      <input
        type="text"
        placeholder={`Search ${title}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5 mb-2"
      />
      <select
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5">
        <option value="">Select {title}</option>
        {filteredItems.map((item) => (
          <option key={item.id} value={item.id.toString()}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilteredDropdown;
