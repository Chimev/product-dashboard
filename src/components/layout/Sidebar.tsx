"use client";

import React, { useState } from "react";
import {
  FiGrid,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "#", icon: FiGrid },
  { name: "Products", href: "/products", icon: FiBox },
  { name: "Orders", href: "#", icon: FiShoppingCart },
  { name: "Customers", href: "#", icon: FiUsers },
  { name: "Settings", href: "#", icon: FiSettings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div
      className={`h-screen flex flex-col bg-[#253258] text-white p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-neutral-400 pb-4 mb-4">
        {!collapsed && <h2 className="text-lg font-semibold">Product Dashboard</h2>}
        <button onClick={toggleSidebar}>
          <FiMenu className="text-xl" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3">
        {links.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive ? "bg-[#5c6788]" : "hover:bg-[#5c6788]"
              }`}
            >
              <Icon className="text-lg" />
              {!collapsed && <span className="text-sm font-medium">{name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
