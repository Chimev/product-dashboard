"use client";

import React, { useState } from "react";
import { FiBell, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="w-full px-4 md:px-6 py-3 flex justify-between items-center shadow bg-white">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
        Welcome back 👋
      </h2>

      {/* Right Section */}
      <div className="flex items-center gap-4 sm:gap-6 relative">
        <FiBell className="text-lg sm:text-xl text-gray-700 cursor-pointer" />

        {/* Admin Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 sm:gap-2 cursor-pointer"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-300" />
            <FiChevronDown className="text-sm sm:text-base" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-10 text-sm text-gray-700 font-medium">
              <div className="px-4 py-2 border-b border-gray-200 font-bold">My Account</div>
              <div className="flex flex-col px-1.5 py-1">
                <button className="px-4 py-2 text-left hover:bg-gray-100 rounded-md">
                  Profile
                </button>
                <button className="px-4 py-2 text-left hover:bg-gray-100 rounded-md">
                  Settings
                </button>
              </div>
              <div className="border-b border-gray-200 mx-3" />
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md">
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
