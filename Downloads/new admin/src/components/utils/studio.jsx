import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const studiosList = [
  "Aristocrat Interactive",
  "Apparat Gaming",
  "Bally Wulff",
  "Rubyplay",
  "Skillzz Gaming",
  "Spinberry",
  "Aristocrat Interactive",
  "Apparat Gaming",
  "Bally Wulff",
  "Rubyplay",
  "Skillzz Gaming",
  "Spinberry",
];

export default function StudioDropdown({label}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState([]);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  const handleCheck = (studio) => {
    setSelected((prevSelected) =>
      prevSelected.includes(studio)
        ? prevSelected.filter((item) => item !== studio)
        : [...prevSelected, studio]
    );
  };

  const handleClearAll = () => {
    setSelected([]);
    setSearchTerm("");
  };

  const filteredStudios = studiosList.filter((studio) =>
    studio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <div ref={dropdownRef} className="relative w-full ">
      <div
        className="border border-gray-300 rounded-md p-2 cursor-pointer flex items-center justify-between bg-[#F4F4F4] "
        onClick={toggleDropdown}
      >
        <span className="text-gray-700 font-medium ">{label}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      {open && (
        <div className="absolute mt-2 w-full bg-white shadow-lg rounded-md border border-gray-200 z-50 p-4">
          <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md">
            <Search size={16} className="text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full outline-none text-sm"
              placeholder="Keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="max-h-48 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {filteredStudios.map((studio, index) => (
              <label key={index} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  checked={selected.includes(studio)}
                  onChange={() => handleCheck(studio)}
                  className="accent-green-600"
                />
                <span className="text-sm text-gray-800">{studio}</span>
              </label>
            ))}
            {filteredStudios.length === 0 && (
              <div className="text-sm text-gray-500 text-center py-2">
                No results found
              </div>
            )}
          </div>

          <div className="flex justify-between items-center px-3 py-2 ">
            <button
              className="cursor-pointer bg-[#00B290] hover:bg-black text-white px-4 py-1 rounded-md text-sm"
              onClick={() => setOpen(false)}
            >
              Add Filters
            </button>
            <button
              className="px-3 py-1 text-sm border rounded-md bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
