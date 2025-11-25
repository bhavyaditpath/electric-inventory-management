"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { getSalesByBranch } from "@/services/sales.service";
import { showError } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { Sale } from "@/types/api-types";

export default function BranchSalesHistoryPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  const fetchSales = async () => {
    if (!user?.branchId) return;

    try {
      const data = await getSalesByBranch(user.branchId, token!);
      setSales(data);
    } catch (err: any) {
      showError("Failed to load sales history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [token, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Sales History</h1>
        <p className="text-gray-600 mt-2">View all sales transactions you've recorded</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Sales Transactions</h3>
        </div>

        <DataTable
          columns={[
            {
              key: "itemsSold",
              label: "Items Sold",
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

        {sales.length === 0 && (
          <div className="px-6 py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No sales recorded yet</h3>
            <p className="mt-1 text-sm text-gray-500">Your sales transactions will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}