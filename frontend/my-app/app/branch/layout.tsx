"use client";

import BranchSidebar from "@/components/BranchSidebar";
import { useAuthInit } from "@/hooks/useAuthInit";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";

export default function BranchLayout({ children }: { children: React.ReactNode }) {
  useAuthInit();
  const { user, isBranchUser } = useAuthStore();

  if (!user) return <p className="p-6">Loading...</p>;
  if (!isBranchUser()) redirect("/login");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <BranchSidebar />
      <main className="flex-1 ml-20 lg:ml-64 transition-all duration-300 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
