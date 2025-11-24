"use client";

import Sidebar from "@/components/Sidebar";
import { useAuthInit } from "@/hooks/useAuthInit";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useAuthInit();
  const { user, isAdmin } = useAuthStore();

  if (!user) return <p className="p-6">Loading...</p>;
  if (!isAdmin()) redirect("/login");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-20 lg:ml-64 transition-all duration-300 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
