import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
  marginPages?: number;
  pageRangeDisplayed?: number;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
  marginPages = 1,
  pageRangeDisplayed = 5,
}: PaginationProps) {
  // Handle page click event
  const handlePageClick = (data: { selected: number }) => {
    onPageChange(data.selected + 1); // +1 because react-paginate is 0-indexed but our API is 1-indexed
  };

  return (
    <ReactPaginate
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={marginPages}
      pageRangeDisplayed={pageRangeDisplayed}
      onPageChange={handlePageClick}
      forcePage={currentPage - 1} // -1 because react-paginate is 0-indexed
      containerClassName={"flex items-center space-x-1"}
      activeLinkClassName={"bg-[#6b8c97] text-white"}
      pageLinkClassName={"px-3 py-1 rounded text-gray-700 hover:bg-gray-200"}
      previousLinkClassName={
        "px-3 py-1 rounded text-gray-700 hover:bg-gray-200"
      }
      nextLinkClassName={"px-3 py-1 rounded text-gray-700 hover:bg-gray-200"}
      breakLinkClassName={"px-3 py-1 text-gray-700"}
      disabledClassName={"text-gray-400 cursor-not-allowed"}
    />
  );
}
