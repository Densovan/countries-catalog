import React from 'react';
import '../assets/css/styles.css';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center list-none p-4">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${
              number === currentPage
                ? 'bg-blue-200 text-blue-800  rounded-md'
                : ''
            }`}
          >
            <a
              onClick={() => paginate(number)}
              className="px-4 py-2 no-underline text-blue-500 cursor-pointer"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
