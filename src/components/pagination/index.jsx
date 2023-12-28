import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  console.log(
    pageNumbers[pageNumbers.length - 1],
    "---",
    pageNumbers[0],
    "---",
    currentPage
  );

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
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`cursor-pointer rounded-md h-10 w-9 flex justify-center items-center transition ${
              currentPage === number ? 'bg-primary text-white hover:bg-primaryDark' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
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
