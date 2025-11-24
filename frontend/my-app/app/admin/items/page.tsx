"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import InputField from "@/components/InputField";
import { getItems, createItem, updateItem, deleteItem } from "@/services/item.service";
import { showSuccess, showError } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { Item } from "@/types/api-types";

interface ItemFormData {
  name: string;
  unit: string;
  stock: string;
  lowStockLevel: string;
  price: string;
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deletingItem, setDeletingItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<ItemFormData>({
    name: "",
    unit: "",
    stock: "",
    lowStockLevel: "",
    price: ""
  });
  const token = useAuthStore((s) => s.token);

  const fetchItems = async () => {
    try {
      const data = await getItems(token!);
      setItems(data);
    } catch (err: any) {
      showError("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [token]);

  const resetForm = () => {
    setFormData({
      name: "",
      unit: "",
      stock: "",
      lowStockLevel: "",
      price: ""
    });
    setEditingItem(null);
  };

  const openModal = (item?: Item) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        unit: item.unit,
        stock: item.stock.toString(),
        lowStockLevel: item.lowStockLevel.toString(),
        price: item.price.toString()
      });
    } else {
      resetForm();
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      unit: formData.unit,
      stock: parseInt(formData.stock),
      lowStockLevel: parseInt(formData.lowStockLevel),
      price: parseFloat(formData.price)
    };

    try {
      if (editingItem) {
        await updateItem(editingItem._id, data, token!);
        showSuccess("Item updated successfully!");
      } else {
        await createItem(data, token!);
        showSuccess("Item created successfully!");
      }
      fetchItems();
      closeModal();
    } catch (err: any) {
      showError(err.message || "Failed to save item");
    }
  };

  const handleDelete = (item: Item) => {
    setDeletingItem(item);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingItem) return;

    try {
      await deleteItem(deletingItem._id, token!);
      showSuccess("Item deleted successfully!");
      fetchItems();
      setConfirmOpen(false);
      setDeletingItem(null);
    } catch (err: any) {
      showError(err.message || "Failed to delete item");
    }
  };

  const getStockStatus = (item: Item) => {
    if (item.stock <= item.lowStockLevel) {
      return { status: "Low Stock", color: "bg-red-100 text-red-800" };
    }
    if (item.stock <= item.lowStockLevel * 1.5) {
      return { status: "Warning", color: "bg-yellow-100 text-yellow-800" };
    }
    return { status: "Good", color: "bg-green-100 text-green-800" };
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Items Management</h1>
          <p className="text-gray-600 mt-2">Manage your inventory items</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <DataTable
          columns={[
            { key: "name", label: "Name" },
            { key: "unit", label: "Unit" },
            { key: "stock", label: "Stock" },
            {
              key: "lowStockLevel",
              label: "Low Stock Level"
            },
            {
              key: "price",
              label: "Price",
              render: (value: number) => `$${value?.toFixed(2)}`
            },
            {
              key: "status",
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
          data={items}
          actions={[
            {
              label: "Edit",
              onClick: (item: Item) => openModal(item),
              className: "bg-blue-100 text-blue-800 hover:bg-blue-200"
            },
            {
              label: "Delete",
              onClick: handleDelete,
              className: "bg-red-100 text-red-800 hover:bg-red-200"
            }
          ]}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">
          {editingItem ? "Edit Item" : "Add New Item"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Item Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <InputField
            label="Unit (e.g., pcs, kg, liters)"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Initial Stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required
            />

            <InputField
              label="Low Stock Level"
              type="number"
              value={formData.lowStockLevel}
              onChange={(e) => setFormData({ ...formData, lowStockLevel: e.target.value })}
              required
            />
          </div>

          <InputField
            label="Price ($)"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingItem ? "Update" : "Create"} Item
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${deletingItem?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}