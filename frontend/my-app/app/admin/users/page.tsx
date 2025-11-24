"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import NewUser from "./NewUser";
import { apiClient } from "@/services/apiClient";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchUsers = async () => {
    const data = await apiClient.get("/auth/users");
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + New User
        </button>
      </div>

      <DataTable
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
          { key: "branchId", label: "Branch" },
        ]}
        data={users}
      />

      <NewUser open={open} onClose={() => setOpen(false)} onSuccess={fetchUsers} />
    </div>
  );
}
