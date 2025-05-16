export const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="animate-pulse p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="overflow-x-auto">
        {/* Desktop skeleton */}
        <table className="min-w-full divide-y divide-gray-200 hidden md:table">
            <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        
        {/* Mobile skeleton */}
        <div className="md:hidden">
            {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                </div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
  );