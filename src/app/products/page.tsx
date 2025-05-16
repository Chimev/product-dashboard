"use client";

import React from "react";
import FilterBar from "@/components/FilterBar";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";
import CreateModal from "@/components/CreateModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { openCreateModal } from "@/store/uiSlice";
import { FiPlusCircle } from "react-icons/fi";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <main className="max-w-7xl mx-auto p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Product Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
            Manage and monitor your product inventory
          </p>
        </div>
        
        <button
          onClick={() => dispatch(openCreateModal())}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base shadow-sm w-full sm:w-auto justify-center"
        >
          <FiPlusCircle className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>
      
      <FilterBar />
      <ProductList />
      <Pagination />
      <CreateModal />
    </main>
  );
}