import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import useDebounce from "@/hook/useDebounce";
import Input from "../inputs";
import useClickOutside from "@/hook/useClickOutside";

const SelectSearch = ({
  options = [],
  messageError = "",
  isError,
  total,
  onChange,
  pageIndex,
  setPagination,
  placeholder = "Select Category",
  value,
  setSearchValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const debouncedInput = useDebounce(inputValue, 500);

  const fetchOptions = async () => {
    setIsLoading(true);
    setSearchValue(debouncedInput);
    setPagination({ pageIndex: 0 });
    setIsLoading(false);
  };

  useEffect(() => {
    if (debouncedInput || isOpen) fetchOptions();
  }, [debouncedInput]);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    setPagination({ pageIndex: pageIndex });
    setIsLoading(false);
  };

  return (
    <>
      <div className="relative w-full">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`${
            isError ? "border-red-500" : "border-gray-300 focus:border-primary"
          } cursor-pointer capitalize border bg-white dark:bg-dark-200 text-gray-800 dark:text-gray-200 rounded-md text-sm leading-none h-[38.89px] flex items-center w-full px-3 placeholder:text-md outline-0 focus:drop-shadow-md transition`}
        >
          {value?.label || placeholder}
        </div>
      </div>

      {isOpen && (
        <div className="absolute bg-black w-full mt-1" ref={dropdownRef}>
          {/* ====== SEARCH INPUT ====== */}
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search..."
          />

          {/* ====== OPTIONS ====== */}
          <ul className="max-h-40 overflow-y-auto">
            {options.map((opt) => (
              <li
                key={opt._id}
                onClick={() => handleOptionClick(opt)}
                className="px-3 py-2 hover:bg-[#3b3f58] text-white cursor-pointer capitalize text-sm"
              >
                {opt.title}
              </li>
            ))}
            {options?.length === 0 && (
              <li className="px-3 py-2 text-gray-400">No results found</li>
            )}

            {/* ====== LOAD MORE ====== */}
            {options.length < total && (
              <button
                disabled={isLoading}
                onClick={handleLoadMore}
                className="text-left w-full text-sm px-3 py-2 border-t border-dashed border-[#555] text-gray-300 hover:bg-[#3b3f58]"
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            )}
          </ul>
        </div>
      )}

      {messageError && (
        <small className="text-red-500 block mt-1">{messageError}</small>
      )}
    </>
  );
};

export default SelectSearch;
