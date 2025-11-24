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
    <div className="flex">
      <BranchSidebar />
      <main className="min-h-screen flex-1 bg-gray-100 p-6 ml-20 lg:ml-64 transition-all">
        {children}
      </main>
    </div>
  );
}
