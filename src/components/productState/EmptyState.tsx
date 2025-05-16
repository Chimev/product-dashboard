import { FiBox } from "react-icons/fi";
export const EmptyState = ({searchQuery, selectedCategory}: any) => (
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