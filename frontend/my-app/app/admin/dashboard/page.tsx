"use client";

import { useAuthStore } from "../../../store/authStore";
import { useAuthInit } from "../../../hooks/useAuthInit";
import { redirect } from "next/navigation";

export default function AdminDashboard() {
  useAuthInit();
  const { user, isAdmin } = useAuthStore();

  if (!user) return <p>Loading...</p>;
  if (!isAdmin()) redirect("/login");

  return <h1 className="p-4 text-2xl">Admin Dashboard</h1>;
}
