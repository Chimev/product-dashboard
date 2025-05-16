"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setCurrentPage } from "@/store/productSlice";

const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, itemsPerPage, items, searchQuery, selectedCategory } = useSelector(
    (state: RootState) => state.products
  );

  const filteredItems = items.filter((p) => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => dispatch(setCurrentPage(page))}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;