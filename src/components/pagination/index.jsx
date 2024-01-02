import { useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const MAX_VISIBLE_PAGES = 3; // Maximum number of pages to show without ellipsis

  const getVisiblePageNumbers = () => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return pageNumbers;
    }

    const start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

    const visiblePages = [];
    if (start > 1) {
      visiblePages.push(1);
      if (start > 2) {
        visiblePages.push("ellipsis-start");
      }
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        visiblePages.push("ellipsis-end");
      }
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  const renderPageNumber = (number) => {
    if (number === "ellipsis-start" || number === "ellipsis-end") {
      return <span key={number} className="text-gray-600">...</span>;
    }

    return (
      <li
        key={number}
        className={`cursor-pointer rounded-md h-10 w-9 flex justify-center items-center transition ${
          currentPage === number
            ? "bg-primary text-white hover:bg-primaryDark"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => onPageChange(number)}
      >
        {number}
      </li>
    );
  };

  const nextPagination = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPagination = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <nav>
      <ul className="flex gap-2 items-center text-gray-600">
        <span
          className="hover:bg-gray-300 bg-gray-200 cursor-pointer h-10 w-9 flex justify-center items-center rounded-md transition"
          onClick={prevPagination}
        >
          <FaAngleLeft size="1rem" />
        </span>
        {getVisiblePageNumbers().map((number) => renderPageNumber(number))}
        <span
          className="hover:bg-gray-300 bg-gray-200 cursor-pointer h-10 w-9 flex justify-center items-center rounded-md transition"
          onClick={nextPagination}
        >
          <FaAngleRight size="1rem" />
        </span>
      </ul>
    </nav>
  );
};

export default Pagination;
