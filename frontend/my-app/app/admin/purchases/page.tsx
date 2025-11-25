"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import { getItems } from "@/services/item.service";
import { recordPurchase } from "@/services/purchase.service";
import { showSuccess, showError } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { Item } from "@/types/api-types";

export default function PurchasesPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
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

    if (!selectedItemId || !quantity || !cost) {
      showError("Please fill in all fields");
      return;
    }

    const qty = parseInt(quantity);
    const costValue = parseFloat(cost);

    if (qty <= 0 || costValue <= 0) {
      showError("Quantity and cost must be positive numbers");
      return;
    }

    setLoading(true);
    try {
      await recordPurchase(
        {
          itemId: selectedItemId,
          quantity: qty,
          cost: costValue,
        },
        token!
      );

      showSuccess("Purchase recorded successfully!");
      setSelectedItemId("");
      setQuantity("");
      setCost("");
    } catch (err: any) {
      showError(err.message || "Failed to record purchase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Record Purchase</h1>
        <p className="text-gray-600 mt-2">Add new inventory by recording a purchase</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Purchase Details</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Item
            </label>
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <InputField
              label="Cost ($)"
              type="number"
              step="0.01"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Recording...
                </>
              ) : (
                "Record Purchase"
              )}
            </button>
          </div>
        </form>
      </div>

      {selectedItemId && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Purchase Summary</h4>
          <div className="text-sm text-blue-800">
            <p>Item: {items.find(item => item._id === selectedItemId)?.name}</p>
            <p>Quantity: {quantity || 0}</p>
            <p>Cost: ${cost || 0}</p>
            <p>Total: ${(parseFloat(cost || "0") * parseInt(quantity || "0")).toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}