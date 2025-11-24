"use client";

import InputField from "@/components/InputField";
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import { apiClient } from "@/services/apiClient";
import { useAuthStore } from "@/store/authStore";
import { showSuccess, showError } from "@/services/toast";

export default function EditUser({ open, onClose, onSuccess, user }: any) {
    const token = useAuthStore((s) => s.token);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("branch");
    const [branchName, setBranchName] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setBranchName(user.branchName || "");
        }
    }, [user]);

    const updateHandler = async () => {
        try {
            await apiClient.put(`/auth/users/${user._id}`, { name, email, role, branchName }, { headers: { Authorization: `Bearer ${token}` } });

            showSuccess("User Updated Successfully!");
            onSuccess();
            onClose();
        } catch (err: any) {
            showError(err.message);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>

            <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <InputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="branch">Branch</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <InputField
                label="Branch Name"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
            />

            <button
                onClick={updateHandler}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-4"
            >
                Update User
            </button>
        </Modal>
    );
}