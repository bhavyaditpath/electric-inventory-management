"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  ShoppingBag,
  ClipboardList,
  History,
  LogOut,
  Menu
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

const menuItems = [
  { label: "Dashboard", href: "/branch/dashboard", icon: LayoutDashboard },
  { label: "Items", href: "/branch/items", icon: Box },
  { label: "Record Sales", href: "/branch/sales", icon: ShoppingBag },
  { label: "Sales History", href: "/branch/sales-history", icon: History },
  { label: "Request Stock", href: "/branch/request", icon: ClipboardList },
  { label: "My Requests", href: "/branch/my-requests", icon: ClipboardList },
];

export default function BranchSidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-3 fixed top-4 left-4 z-50 bg-white shadow rounded-md"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-md border-r transition-all duration-300
          ${isOpen ? "w-64" : "w-20"}
          hidden sm:block`}
      >
        <div className="p-6 border-b">
          <h1
            className={`text-2xl font-bold text-indigo-600 transition-opacity duration-200
              ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            Branch Panel
          </h1>
        </div>

        <nav className="mt-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-3 transition
                  ${active ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-100"}
                `}
              >
                <Icon size={20} />
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={20} />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
