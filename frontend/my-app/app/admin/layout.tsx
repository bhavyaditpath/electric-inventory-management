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
    <div className="flex">
      <Sidebar />
      <main className="min-h-screen flex-1 bg-gray-100 p-6 ml-20 lg:ml-64 transition-all">
        {children}
      </main>
    </div>
  );
}
