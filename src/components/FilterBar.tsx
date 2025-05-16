"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setSearchQuery, setSelectedCategory } from "@/store/productSlice";
import { FiSearch } from "react-icons/fi";

const FilterBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, selectedCategory, categories } = useSelector((state: RootState) => state.products);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "All" ? "" : e.target.value;
    dispatch(setSelectedCategory(value));
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      {/* Search Input */}
      <div className="relative w-full sm:w-48 md:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm sm:text-base" />
          <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full pl-9 pr-3 py-1.5 sm:py-2 text-sm sm:text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      

      {/* Category Dropdown */}
      <select
        value={selectedCategory || "All"}
        onChange={handleCategoryChange}
        className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
