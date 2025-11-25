"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import NewUser from "./NewUser";
import EditUser from "./EditUser";
import ConfirmModal from "@/components/ConfirmModal";
import { apiClient } from "@/services/apiClient";
import { showError, showSuccess } from "@/services/toast";
import { useAuthStore } from "@/store/authStore";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = useAuthStore((s) => s.token);

  const fetchUsers = async () => {
    try {
      const data = await apiClient.get("/auth/users");
      setUsers(data);
    } catch (err: any) {
      showError(err.message);
    }
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await apiClient.delete(`/auth/users/${(selectedUser as any)._id}`, { headers: { Authorization: `Bearer ${token}` } });
      showSuccess("User deleted successfully!");
      fetchUsers();
      setConfirmOpen(false);
    } catch (err: any) {
      showError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
       <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage your users and their permissions</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          + New User
        </button>
      </div>

      <DataTable
        columns={[
          { key: "name", label: "Name", sortable: true },
          { key: "email", label: "Email", sortable: true },
          { key: "role", label: "Role", sortable: true },
          {
            key: "branchId",
            label: "Branch",
            sortable: true,
            render: (value: any) => value?.name
          },
        ]}
        data={users}
        actions={[
          { label: "Edit", onClick: handleEdit, className: "bg-yellow-500 text-white hover:bg-yellow-600" },
          { label: "Delete", onClick: handleDelete, className: "bg-red-500 text-white hover:bg-red-600" },
        ]}
      />

      <NewUser open={open} onClose={() => setOpen(false)} onSuccess={fetchUsers} />
      <EditUser open={editOpen} onClose={() => setEditOpen(false)} onSuccess={fetchUsers} user={selectedUser} />
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
}
