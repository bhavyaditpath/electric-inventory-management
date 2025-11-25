"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import { getItems } from "@/services/item.service";
import { createRequest } from "@/services/request.service";
import { showSuccess, showError } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { Item } from "@/types/api-types";

export default function RequestStockPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems(token!);
        setItems(data);
      } catch (err: any) {
        showError("Failed to load items");
      }
    };
    fetchItems();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedItemId || !quantity) {
      showError("Please select an item and enter quantity");
      return;
    }

    const qty = parseInt(quantity);
    if (qty <= 0) {
      showError("Quantity must be positive");
      return;
    }

    setLoading(true);
    try {
      await createRequest(
        {
          itemId: selectedItemId,
          quantity: qty,
        },
        token!
      );

      showSuccess("Stock request submitted successfully!");
      setSelectedItemId("");
      setQuantity("");
    } catch (err: any) {
      showError(err.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const selectedItem = items.find(item => item._id === selectedItemId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Request Stock</h1>
        <p className="text-gray-600 mt-2">Request additional stock from the administrator</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Request Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">New Stock Request</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Item
              </label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Choose an item...</option>
                {items.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name} (Current stock: {item.stock})
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="Requested Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </form>
        </div>

        {/* Request Summary */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Request Summary</h3>

          {selectedItemId && selectedItem ? (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-medium text-gray-900">{selectedItem.name}</h4>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Current Stock: {selectedItem.stock} {selectedItem.unit}</p>
                  <p>Low Stock Level: {selectedItem.lowStockLevel} {selectedItem.unit}</p>
                  <p>Price: ${selectedItem.price.toFixed(2)}</p>
                </div>
              </div>

              {quantity && (
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h5 className="font-medium text-indigo-900 mb-2">Request Details</h5>
                  <p className="text-indigo-800">Requested Quantity: {quantity} {selectedItem.unit}</p>
                  <p className="text-indigo-800">Estimated Value: ${(parseFloat(quantity) * selectedItem.price).toFixed(2)}</p>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Important Notes</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Requests will be reviewed by the administrator</li>
                  <li>• You will be notified once the request is approved or declined</li>
                  <li>• Approved stock will be added to your inventory</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2">Select an item to see request details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}