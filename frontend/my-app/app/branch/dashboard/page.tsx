"use client";

import { useAuthStore } from "@/store/authStore";
import { useAuthInit } from "@/hooks/useAuthInit";
import { redirect } from "next/navigation";
import MetricCard from "@/components/MetricCard";
import {
  Package,
  ShoppingCart,
  ClipboardList,
  TrendingUp,
  DollarSign
} from "lucide-react";

export default function BranchDashboard() {
  useAuthInit();
  const { user, isBranchUser } = useAuthStore();

  if (!user) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  if (!isBranchUser()) redirect("/login");

  // Mock data - in real app, fetch from API
  const metrics = [
    {
      title: "Items in Stock",
      value: "342",
      icon: Package,
      color: "bg-indigo-500",
      change: "Well stocked"
    },
    {
      title: "Today's Sales",
      value: "$1,247",
      icon: ShoppingCart,
      color: "bg-green-500",
      change: "+15% vs yesterday"
    },
    {
      title: "Pending Requests",
      value: "3",
      icon: ClipboardList,
      color: "bg-yellow-500",
      change: "Awaiting approval"
    },
    {
      title: "Monthly Revenue",
      value: "$12,543",
      icon: DollarSign,
      color: "bg-blue-500",
      change: "+22% this month"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Branch Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name}! Here's your branch overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
            change={metric.change}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">LED Light Bulb</p>
                <p className="text-sm text-gray-600">Qty: 5</p>
              </div>
              <p className="font-semibold text-green-600">$75.00</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Extension Cord</p>
                <p className="text-sm text-gray-600">Qty: 2</p>
              </div>
              <p className="font-semibold text-green-600">$48.00</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Power Strip</p>
                <p className="text-sm text-gray-600">Qty: 1</p>
              </div>
              <p className="font-semibold text-green-600">$25.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <button className="p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-indigo-700 font-medium transition-colors text-left">
              Record New Sale
            </button>
            <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition-colors text-left">
              Request Stock
            </button>
            <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition-all duration-200 border border-blue-200 cursor-pointer text-left">
              View Inventory
            </button>
            <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium transition-colors text-left">
              Check My Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
