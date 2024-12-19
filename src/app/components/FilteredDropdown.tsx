import React, { useState } from "react";

interface FilteredDropdownProps {
  title: string;
  items: { id: number; name: string }[];
  value: string;
  setValue: (value: string) => void;
}

const FilteredDropdown = ({
  title,
  items,
  value,
  setValue,
}: FilteredDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelect = (id: string) => {
    setValue(id);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <button
          type="button"
          className="rounded-xl border border-solid border-gray-300 h-10 sm:h-12 px-4 sm:px-5 w-full text-left"
          onClick={() => setIsOpen(!isOpen)}>
          {value
            ? items.find((item) => item.id.toString() === value)?.name
            : `Selecteer een ${title}`}
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder={`\u{1F50D} Zoek ${title}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-b border-gray-300"
            />
            <ul className="max-h-60 overflow-y-auto">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(item.id.toString())}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteredDropdown;
