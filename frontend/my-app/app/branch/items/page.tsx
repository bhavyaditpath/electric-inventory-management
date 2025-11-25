"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DataTable from "@/components/DataTable";
import { getItems } from "@/services/item.service";
import { showError } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { Item } from "@/types/api-types";

export default function BranchItemsPage() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const token = useAuthStore((s) => s.token);

  const fetchItems = async () => {
    try {
      const data = await getItems(token!);
      setItems(data);
      setFilteredItems(data);
    } catch (err: any) {
      showError("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [token]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchQuery, items]);

  const getStockStatus = (item: Item) => {
    if (item.stock === 0) {
      return { status: "Out of Stock", color: "bg-red-100 text-red-800" };
    }
    if (item.stock <= item.lowStockLevel) {
      return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    }
    return { status: "Available", color: "bg-green-100 text-green-800" };
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
        <h1 className="text-3xl font-bold text-gray-900">Inventory Items</h1>
        <p className="text-gray-600 mt-2">View all available items and their stock levels</p>
      </div>


      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <DataTable
          columns={[
            { key: "name", label: "Item Name" },
            { key: "unit", label: "Unit" },
            {
              key: "price",
              label: "Price",
              render: (value: number) => `$${value?.toFixed(2)}`
            },
            {
              key: "stock",
              label: "Current Stock",
              render: (value: number, row: Item) => (
                <span className={value <= row.lowStockLevel ? "text-orange-600 font-semibold" : ""}>
                  {value}
                </span>
              )
            },
            {
              key: "lowStockLevel",
              label: "Low Stock Alert"
            },
            {
              key: "stockStatus",
              label: "Status",
              render: (value: any, row: Item) => {
                const { status, color } = getStockStatus(row);
                return (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${color}`}>
                    {status}
                  </span>
                );
              }
            },
          ]}
          data={filteredItems}
        />
      </div>
    </div>
  );
}