import { FiAlertCircle } from "react-icons/fi";

 export const ErrorState = (error:any) => (
    <div className="bg-white rounded-lg border border-red-200 p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 mb-4">
        <FiAlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
      <p className="text-gray-500 mb-4">{error || "Please try again later"}</p>
    </div>
  );