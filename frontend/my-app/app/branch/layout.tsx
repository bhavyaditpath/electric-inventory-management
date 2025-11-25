"use client";

import { useState } from "react";
import BranchSidebar from "@/components/BranchSidebar";
import { useAuthInit } from "@/hooks/useAuthInit";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";
import { NAVIGATION } from "@/app/Constants/navigation.constants";
import Navbar from "@/components/Navbar";

export default function BranchLayout({ children }: { children: React.ReactNode }) {
  useAuthInit();
  const { user, isBranchUser } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) return <p className="p-6">Loading...</p>;
  if (!isBranchUser()) redirect(NAVIGATION.auth.login);

  return (
    <div className="min-h-screen bg-slate-50">
      <BranchSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
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
