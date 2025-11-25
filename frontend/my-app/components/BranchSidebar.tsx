"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  ShoppingBag,
  ClipboardList,
  History,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { NAVIGATION } from "@/app/Constants/navigation.constants";

interface BranchSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { label: "Dashboard", href: NAVIGATION.branch.dashboard, icon: LayoutDashboard },
  { label: "Items", href: NAVIGATION.branch.items, icon: Box },
  { label: "Record Sales", href: NAVIGATION.branch.sales, icon: ShoppingBag },
  { label: "Sales History", href: NAVIGATION.branch.salesHistory, icon: History },
  { label: "Request Stock", href: NAVIGATION.branch.request, icon: ClipboardList },
  { label: "My Requests", href: NAVIGATION.branch.myRequests, icon: ClipboardList },
];

export default function BranchSidebar({ isOpen, onToggle }: BranchSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push(NAVIGATION.auth.login);
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 ease-in-out z-40 overflow-hidden ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className={`flex items-center justify-between px-4 py-6 border-b border-slate-700 flex-shrink-0 ${isOpen ? 'gap-4' : 'justify-center'}`}>
          <h1
            className={`font-bold text-xl transition-opacity duration-200 ${
              isOpen ? 'opacity-100' : 'opacity-0 w-0'
            }`}
          >
            Branch Panel
          </h1>
          <button
            onClick={onToggle}
            className="text-slate-300 hover:text-white hover:bg-slate-700 p-2 rounded-lg transition-all duration-200 flex-shrink-0 relative z-50"
            title={isOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span
                      className={`font-medium transition-opacity duration-200 whitespace-nowrap ${
                        isOpen ? 'opacity-100' : 'opacity-0 w-0'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-700 p-3 flex-shrink-0">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200 flex-shrink-0 ${
              !isOpen && 'justify-center'
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span
              className={`font-medium transition-opacity duration-200 whitespace-nowrap ${
                isOpen ? 'opacity-100' : 'opacity-0 w-0'
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
