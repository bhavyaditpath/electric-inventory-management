"use client";

import { useAuthStore } from "@/store/authStore";
import { useAuthInit } from "@/hooks/useAuthInit";
import { redirect } from "next/navigation";
import MetricCard from "@/components/MetricCard";
import {
  Package,
  AlertTriangle,
  ShoppingCart,
  ClipboardList,
  Users,
  TrendingUp
} from "lucide-react";

export default function AdminDashboard() {
  useAuthInit();
  const { user, isAdmin } = useAuthStore();

  if (!user) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (!isAdmin()) redirect("/login");

  // Mock data - in real app, fetch from API
  const metrics = [
    {
      title: "Total Items",
      value: "1,247",
      icon: Package,
      color: "bg-blue-500",
      change: "+12% from last month"
    },
    {
      title: "Low Stock Items",
      value: "23",
      icon: AlertTriangle,
      color: "bg-red-500",
      change: "Needs attention"
    },
    {
      title: "Total Sales",
      value: "$45,231",
      icon: ShoppingCart,
      color: "bg-green-500",
      change: "+8% from last month"
    },
    {
      title: "Pending Requests",
      value: "12",
      icon: ClipboardList,
      color: "bg-yellow-500",
      change: "3 approved today"
    },
    {
      title: "Total Users",
      value: "48",
      icon: Users,
      color: "bg-purple-500",
      change: "+2 new this week"
    },
    {
      title: "Revenue Growth",
      value: "23.5%",
      icon: TrendingUp,
      color: "bg-indigo-500",
      change: "vs last quarter"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name}! Here's what's happening with your inventory.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New sale recorded - $299.00</p>
              <span className="text-xs text-gray-400">2 min ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Stock request approved for Branch A</p>
              <span className="text-xs text-gray-400">15 min ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Low stock alert: LED Bulbs</p>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition-all duration-200 border border-blue-200">
              Add New Item
            </button>
            <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition-colors">
              Record Sale
            </button>
            <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium transition-all duration-200 border border-purple-200">
              View Reports
            </button>
            <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-700 font-medium transition-colors">
              Manage Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
