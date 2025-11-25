"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { getLowStockItems } from "@/services/item.service";
import { showError } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { Item } from "@/types/api-types";
import { PackagePlus } from "lucide-react";

export default function LowStockPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

  const fetchLowStockItems = async () => {
    try {
      const data = await getLowStockItems(token!);
      setItems(data);
    } catch (err: any) {
      showError("Failed to load low stock items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStockItems();
  }, [token]);

  const getUrgencyLevel = (item: Item) => {
    const ratio = item.stock / item.lowStockLevel;
    if (item.stock === 0) {
      return { level: "Out of Stock", color: "bg-red-100 text-red-800", priority: "Critical" };
    }
    if (ratio <= 0.5) {
      return { level: "Critical", color: "bg-red-100 text-red-800", priority: "High" };
    }
    return { level: "Low Stock", color: "bg-yellow-100 text-yellow-800", priority: "Medium" };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Low Stock Alerts</h1>
        <p className="text-gray-600 mt-2">Items that need restocking attention</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {items.filter(item => item.stock <= item.lowStockLevel * 0.5).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-900">{items.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Items Restocked</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Items Requiring Attention</h3>
        </div>

        <DataTable
          columns={[
            { key: "name", label: "Item Name" },
            { key: "unit", label: "Unit" },
            {
              key: "stock",
              label: "Current Stock",
              render: (value: number, row: Item) => (
                <span className={value === 0 ? "text-red-600 font-semibold" : ""}>
                  {value}
                </span>
              )
            },
            { key: "lowStockLevel", label: "Low Stock Level" },
            {
              key: "status",
              label: "Status",
              render: (value: any, row: Item) => {
                const { level, color } = getUrgencyLevel(row);
                return (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${color}`}>
                    {level}
                  </span>
                );
              }
            },
            {
              key: "restockNeeded",
              label: "Restock Needed",
              render: (value: any, row: Item) => {
                const needed = Math.max(0, row.lowStockLevel * 2 - row.stock);
                return (
                  <span className="text-sm font-medium">
                    {needed} {row.unit}
                  </span>
                );
              }
            },
          ]}
          data={items}
          actions={[
            {
              label: "Restock",
              onClick: (item: Item) => {
                // Could open a restock modal or navigate to purchases
                showError("Restock functionality coming soon");
              },
              className: "bg-green-100 text-green-800 hover:bg-green-200",
              icon: <PackagePlus className="w-4 h-4" />
            }
          ]}
        />

        {items.length === 0 && (
          <div className="px-6 py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">All items are well stocked!</h3>
            <p className="mt-1 text-sm text-gray-500">No low stock alerts at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}