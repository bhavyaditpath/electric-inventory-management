"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import InputField from "@/components/InputField";
import { getBranches, createBranch, updateBranch, deleteBranch } from "@/services/branch.service";
import { showSuccess, showError } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";
import { Branch } from "@/types/api-types";

interface BranchFormData {
  name: string;
  address: string;
}

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [deletingBranch, setDeletingBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState<BranchFormData>({
    name: "",
    address: ""
  });
  const token = useAuthStore((s) => s.token);

  const fetchBranches = async () => {
    try {
      const data = await getBranches(token!);
      setBranches(data);
    } catch (err: any) {
      showError("Failed to load branches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, [token]);

  const resetForm = () => {
    setFormData({
      name: "",
      address: ""
    });
    setEditingBranch(null);
  };

  const openModal = (branch?: Branch) => {
    if (branch) {
      setEditingBranch(branch);
      setFormData({
        name: branch.name,
        address: branch.address || ""
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
      address: formData.address || undefined
    };

    try {
      if (editingBranch) {
        await updateBranch(editingBranch._id, data, token!);
        showSuccess("Branch updated successfully!");
      } else {
        await createBranch(data, token!);
        showSuccess("Branch created successfully!");
      }
      fetchBranches();
      closeModal();
    } catch (err: any) {
      showError(err.message || "Failed to save branch");
    }
  };

  const handleDelete = (branch: Branch) => {
    setDeletingBranch(branch);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingBranch) return;

    try {
      await deleteBranch(deletingBranch._id, token!);
      showSuccess("Branch deleted successfully!");
      fetchBranches();
      setConfirmOpen(false);
      setDeletingBranch(null);
    } catch (err: any) {
      showError(err.message || "Failed to delete branch");
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Branch Management</h1>
          <p className="text-gray-600 mt-2">Manage your store branches</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add Branch
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <DataTable
          columns={[
            { key: "name", label: "Branch Name" },
            { key: "address", label: "Address" },
            {
              key: "_id",
              label: "Branch ID",
              render: (value: string) => (
                <span className="font-mono text-xs text-gray-500">
                  {value.slice(-8)}
                </span>
              )
            },
          ]}
          data={branches}
          actions={[
            {
              label: "Edit",
              onClick: (branch: Branch) => openModal(branch),
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
          {editingBranch ? "Edit Branch" : "Add New Branch"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Branch Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <InputField
            label="Address (Optional)"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
              {editingBranch ? "Update" : "Create"} Branch
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Branch"
        message={`Are you sure you want to delete "${deletingBranch?.name}"? This action cannot be undone and may affect existing sales and users.`}
      />
    </div>
  );
}