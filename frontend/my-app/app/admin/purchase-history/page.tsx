"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { apiClient } from "@/services/apiClient";
import { showError } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { Purchase } from "@/types/api-types";

export default function PurchaseHistoryPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

  const fetchPurchases = async () => {
    try {
      const data = await apiClient.get("/purchases");
      setPurchases(data);
    } catch (err: any) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

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
        <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
        <p className="text-gray-600 mt-2">View all purchase records and restocking history</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Purchases</h3>
        </div>

        <DataTable
          columns={[
            {
              key: "itemId",
              label: "Item",
              render: (value: any) => value?.name || "Unknown"
            },
            { key: "quantity", label: "Quantity" },
            {
              key: "cost",
              label: "Cost",
              render: (value: number) => `$${value?.toFixed(2)}`
            },
            {
              key: "createdAt",
              label: "Date",
              render: (value: string) => new Date(value).toLocaleDateString()
            },
          ]}
          data={purchases}
        />
      </div>
    </div>
  );
}