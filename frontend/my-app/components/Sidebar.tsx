"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  AlertTriangle,
  ShoppingBag,
  History,
  ClipboardList,
  Users,
  PackagePlus,
  ReceiptText,
  LogOut,
  Menu,
  Building,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { NAVIGATION } from "@/app/Constants/navigation.constants";

const menuItems = [
  { label: "Dashboard", href: NAVIGATION.admin.dashboard, icon: LayoutDashboard },
  { label: "Items", href: NAVIGATION.admin.items, icon: Box },
  { label: "Low Stock Alerts", href: NAVIGATION.admin.lowStock, icon: AlertTriangle },
  { label: "Record Sales", href: NAVIGATION.admin.sales, icon: ShoppingBag },
  { label: "Sales History", href: NAVIGATION.admin.salesHistory, icon: History },
  { label: "Add Purchase", href: NAVIGATION.admin.purchases, icon: PackagePlus },
  { label: "Purchase History", href: NAVIGATION.admin.purchaseHistory, icon: ReceiptText },
  { label: "Stock Requests", href: NAVIGATION.admin.requests, icon: ClipboardList },
  { label: "Branches", href: NAVIGATION.admin.branches, icon: Building },
  { label: "Users", href: NAVIGATION.admin.users, icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    logout();
    router.push(NAVIGATION.auth.login);
  };

  return (
    <>
      {/* Toggle Button (Mobile) */}
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
            className={`text-2xl font-bold text-blue-600 transition-opacity duration-200 
              ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            Admin Panel
          </h1>
        </div>

        <nav className="mt-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-3 transition
                  ${active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}
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
            onClick={handleLogout}
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
