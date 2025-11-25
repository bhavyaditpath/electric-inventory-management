"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { getMyRequests } from "@/services/request.service";
import { showError } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { StockRequest } from "@/types/api-types";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<StockRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

  const fetchRequests = async () => {
    try {
      const data = await getMyRequests(token!);
      setRequests(data);
    } catch (err: any) {
      showError("Failed to load your requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900">My Stock Requests</h1>
        <p className="text-gray-600 mt-2">View the status of your stock requests</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Request History</h3>
        </div>

        <DataTable
          columns={[
            {
              key: "itemId",
              label: "Item",
              render: (value: any) => value?.name || "Unknown"
            },
            { key: "quantity", label: "Requested Quantity" },
            {
              key: "status",
              label: "Status",
              render: (value: string) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(value)}`}>
                  {value}
                </span>
              )
            },
            {
              key: "createdAt",
              label: "Request Date",
              render: (value: string) => new Date(value).toLocaleDateString()
            },
          ]}
          data={requests}
        />

        {requests.length === 0 && (
          <div className="px-6 py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No requests yet</h3>
            <p className="mt-1 text-sm text-gray-500">Your stock requests will appear here once submitted.</p>
          </div>
        )}
      </div>

      {/* Status Legend */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Status Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Pending
            </span>
            <span className="text-sm text-gray-600">Awaiting admin approval</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Approved
            </span>
            <span className="text-sm text-gray-600">Request approved, stock added</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
              Declined
            </span>
            <span className="text-sm text-gray-600">Request was declined</span>
          </div>
        </div>
      </div>
    </div>
  );
}