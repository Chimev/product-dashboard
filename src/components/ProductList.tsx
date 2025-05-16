"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { loadProducts } from "@/store/productSlice";
import { FiEdit2, FiTrash2, FiAlertCircle, FiBox, FiBarChart2, FiDollarSign, FiMoreVertical } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoadingSkeleton } from "./skeleton/LoadingSkeleton";

const ProductList = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error, searchQuery, selectedCategory, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.products
  );
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadProducts());
    }
  }, [dispatch, status]);

  // Filter products by search query and category
  const filtered = items.filter((p) => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  // Toggle row expansion for mobile view
  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Handle edit product
  const handleEdit = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/products/edit/${id}`);
  };

  // Handle delete product
  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement delete functionality here
    console.log(`Delete product ${id}`);
  };

 

  // Error state component
  const ErrorState = () => (
    <div className="bg-white rounded-lg border border-red-200 p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 mb-4">
        <FiAlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
      <p className="text-gray-500 mb-4">{error || "Please try again later"}</p>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-500 mb-4">
        <FiBox className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-500">
        {searchQuery || selectedCategory 
          ? "Try adjusting your filters or search term" 
          : "Add your first product to get started"}
      </p>
    </div>
  );

  if (status === "loading") return <LoadingSkeleton />;
  if (status === "failed") return <ErrorState />;
  if (paginated.length === 0) return <EmptyState />;

  // Generate random stock number for demo purposes
  const getRandomStock = () => Math.floor(Math.random() * 100);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Inventory</h2>
            <p className="text-sm text-gray-500">{filtered.length} products found</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
              <FiBarChart2 className="w-4 h-4 mr-1" />
              <span>In Stock: {filtered.length}</span>
            </div>
            <div className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
              <FiDollarSign className="w-4 h-4 mr-1" />
              <span>Value: ${filtered.reduce((sum, p) => sum + p.price, 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop view */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Image</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.map((product) => {
              const stock = getRandomStock();
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 bg-gray-50 rounded border border-gray-200 p-1 relative">
                      <Image 
                        src={product.image} 
                        alt={product.title} 
                        className="object-contain mix-blend-multiply" 
                        fill
                        sizes="(max-width: 48px) 100vw, 48px"
                        priority={false}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p 
                      className="cursor-pointer text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600"
                    >
                      {product.title}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                      stock > 50 ? 'bg-green-100 text-green-800' : 
                      stock > 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        onClick={(e) => handleEdit(product.id, e)}
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        onClick={(e) => handleDelete(product.id, e)}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Mobile view */}
      <div className="md:hidden">
        {paginated.map((product) => {
          const stock = getRandomStock();
          const isExpanded = expandedRow === product.id;
          
          return (
            <div key={product.id} className="border-b border-gray-200 last:border-b-0">
              <div 
                className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleRow(product.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gray-50 rounded border border-gray-200 p-1 flex-shrink-0 relative">
                    <Image 
                      src={product.image} 
                      alt={product.title} 
                      className="object-contain mix-blend-multiply" 
                      fill
                      sizes="(max-width: 48px) 100vw, 48px"
                      priority={false}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 line-clamp-1">{product.title}</div>
                    <div className="text-xs text-gray-500">${product.price.toFixed(2)}</div>
                  </div>
                </div>
                <div>
                  <span className={`hidden sm:inline-flex px-2 py-1 mr-2 text-xs leading-5 font-medium rounded-full ${
                    stock > 50 ? 'bg-green-100 text-green-800' : 
                    stock > 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {stock} units
                  </span>
                  <button className="p-1 rounded-full bg-gray-50 text-gray-600">
                    <FiMoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {isExpanded && (
                <div className="p-4 pt-0 bg-gray-50">
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div>
                      <div className="text-gray-500">Category</div>
                      <div className="font-medium mt-1">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full text-blue-800">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Stock</div>
                      <div className="font-medium mt-1">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                          stock > 50 ? 'bg-green-100 text-green-800' : 
                          stock > 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {stock} units
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">ID</div>
                      <div className="font-medium mt-1">{product.id}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Price</div>
                      <div className="font-medium mt-1">${product.price.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button 
                      className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 flex items-center justify-center"
                      onClick={(e) => handleEdit(product.id, e)}
                    >
                      <FiEdit2 className="w-4 h-4 mr-1" />
                      <span>Edit</span>
                    </button>
                    <button 
                      className="flex-1 py-2 px-4 bg-red-50 text-red-600 rounded-md hover:bg-red-100 flex items-center justify-center"
                      onClick={(e) => handleDelete(product.id, e)}
                    >
                      <FiTrash2 className="w-4 h-4 mr-1" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Pagination component with Next.js link integration */}
      {filtered.length > itemsPerPage && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{start + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(start + itemsPerPage, filtered.length)}
                </span>{" "}
                of <span className="font-medium">{filtered.length}</span> results
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;