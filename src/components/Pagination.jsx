import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

function Pagination({currentPage, totalPages, onPageChange}) {
console.log('Pagination Props:', { currentPage, totalPages });

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        <ChevronLeft size={20} />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 mx-1 rounded cursor-pointer ${currentPage === number ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
         <ChevronRight size={20} />
      </button>
    </div>
  )
}

export default Pagination
