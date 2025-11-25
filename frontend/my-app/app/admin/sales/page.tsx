"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import { getItems } from "@/services/item.service";
import { recordSale } from "@/services/sales.service";
import { getBranches } from "@/services/branch.service";
import { showSuccess, showError } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { Item, Branch } from "@/types/api-types";

interface CartItem {
  itemId: string;
  quantity: number;
  price: number;
  name: string;
}

export default function RecordSalesPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, branchesData] = await Promise.all([
          getItems(token!),
          getBranches(token!)
        ]);
        setItems(itemsData);
        setBranches(branchesData);
      } catch (err: any) {
        showError("Failed to load data");
      }
    };
    fetchData();
  }, [token]);

  const addToCart = () => {
    if (!selectedItemId || !quantity) {
      showError("Please select an item and enter quantity");
      return;
    }

    const item = items.find(i => i._id === selectedItemId);
    if (!item) return;

    const qty = parseInt(quantity);
    if (qty <= 0 || qty > item.stock) {
      showError(`Invalid quantity. Available stock: ${item.stock}`);
      return;
    }

    const existing = cart.find(c => c.itemId === selectedItemId);
    if (existing) {
      existing.quantity += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, {
        itemId: selectedItemId,
        quantity: qty,
        price: item.price,
        name: item.name
      }]);
    }

    setSelectedItemId("");
    setQuantity("");
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.itemId !== itemId));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = async () => {
    if (cart.length === 0) {
      showError("Please add items to cart");
      return;
    }

    if (!selectedBranchId) {
      showError("Please select a branch");
      return;
    }

    setLoading(true);
    try {
      const itemsSold = cart.map(item => ({
        itemId: item.itemId,
        quantity: item.quantity
      }));

      await recordSale(
        {
          branchId: selectedBranchId,
          itemsSold,
          totalAmount: getTotal(),
        },
        token!
      );

      showSuccess("Sale recorded successfully!");
      setCart([]);
      setSelectedBranchId("");
    } catch (err: any) {
      showError(err.message || "Failed to record sale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Record Sale</h1>
        <p className="text-gray-600 mt-2">Record a new sale transaction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Items Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Add Items</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Branch
              </label>
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose a branch...</option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Item
              </label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose an item...</option>
                {items.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name} (${item.price}) - Stock: {item.stock}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button
              onClick={addToCart}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Cart Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Sale Summary</h3>

          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.itemId} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.itemId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Recording...
                  </>
                ) : (
                  "Complete Sale"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}