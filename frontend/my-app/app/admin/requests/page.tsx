"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { getAllRequests, approveRequest, declineRequest } from "@/services/request.service";
import { showError, showSuccess } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { StockRequest } from "@/types/api-types";

export default function RequestsPage() {
  const [requests, setRequests] = useState<StockRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

  const fetchRequests = async () => {
    try {
      const response = await getAllRequests(token!);
      setRequests(response);
    } catch (err: any) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (request: StockRequest) => {
    try {
      await approveRequest(request._id, token!);
      showSuccess("Request approved successfully!");
      fetchRequests();
    } catch (err: any) {
      showError(err.message);
    }
  };

  const handleDecline = async (request: StockRequest) => {
    try {
      await declineRequest(request._id, token!);
      showSuccess("Request declined successfully!");
      fetchRequests();
    } catch (err: any) {
      showError(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
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
        <h1 className="text-3xl font-bold text-gray-900">Stock Requests</h1>
        <p className="text-gray-600 mt-2">Manage stock requests from all branches</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Requests</h3>
        </div>

        <DataTable
          columns={[
            {
              key: "branchId",
              label: "Branch",
              render: (value: any) => value?.name || "Unknown"
            },
            {
              key: "itemId",
              label: "Item",
              render: (value: any) => value?.name || "Unknown"
            },
            { key: "quantity", label: "Quantity" },
            {
              key: "status",
              label: "Status",
              render: (value: string) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(value)}`}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )
            },
            {
              key: "createdAt",
              label: "Date",
              render: (value: string) => new Date(value).toLocaleDateString()
            },
          ]}
          data={requests}
          actions={(request: StockRequest) => {
            if (request.status === "pending") {
              return [
                {
                  label: "Approve",
                  onClick: () => handleApprove(request),
                  className: "bg-green-100 text-green-800 hover:bg-green-200"
                },
                {
                  label: "Decline",
                  onClick: () => handleDecline(request),
                  className: "bg-red-100 text-red-800 hover:bg-red-200"
                }
              ];
            }
            return [];
          }}
        />
      </div>
    </div>
  );
}