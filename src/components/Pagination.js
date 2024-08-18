import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center my-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 border rounded ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
