"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { getAllSales } from "@/services/sales.service";
import { showError } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { Sale } from "@/types/api-types";

export default function SalesHistoryPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

  const fetchSales = async () => {
    try {
      const data = await getAllSales(token!);
      setSales(data);
    } catch (err: any) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [token]);

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
        <h1 className="text-3xl font-bold text-gray-900">Sales History</h1>
        <p className="text-gray-600 mt-2">View all sales transactions across all branches</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Sales</h3>
        </div>

        <DataTable
          columns={[
            {
              key: "branchId",
              label: "Branch",
              render: (value: any) => value?.name || "Unknown"
            },
            {
              key: "itemsSold",
              label: "Items",
              render: (value: any[]) => {
                if (!value || value.length === 0) return "No items";
                return value.map(item => `${item.itemId?.name || 'Unknown'} (${item.quantity})`).join(", ");
              }
            },
            {
              key: "totalAmount",
              label: "Total Amount",
              render: (value: number) => `$${value?.toFixed(2)}`
            },
            {
              key: "date",
              label: "Date",
              render: (value: string) => new Date(value).toLocaleDateString()
            },
          ]}
          data={sales}
        />
      </div>
    </div>
  );
}