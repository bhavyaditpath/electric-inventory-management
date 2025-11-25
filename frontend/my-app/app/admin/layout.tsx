"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuthInit } from "@/hooks/useAuthInit";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";
import { NAVIGATION } from "@/app/Constants/navigation.constants";
import Navbar from "@/components/Navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useAuthInit();
  const { user, isAdmin } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) return <p className="p-6">Loading...</p>;
  if (!isAdmin()) redirect(NAVIGATION.auth.login);
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Navbar sidebarOpen={sidebarOpen} />

      <main
        className={`transition-all duration-300 pt-16 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
