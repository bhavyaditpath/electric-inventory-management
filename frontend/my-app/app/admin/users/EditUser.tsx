"use client";

import InputField from "@/components/InputField";
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import { apiClient } from "@/services/apiClient";
import { getBranches } from "@/services/branch.service";
import { useAuthStore } from "@/store/authStore";
import { showSuccess, showError } from "@/services/toast";
import { UserRole } from "@/app/Constants/UserRole.Constants";
import { Branch } from "@/types/api-types";

export default function EditUser({ open, onClose, onSuccess, user }: any) {
    const token = useAuthStore((s) => s.token);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("branch");
    const [branchId, setBranchId] = useState("");
    const [branches, setBranches] = useState<Branch[]>([]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const data = await getBranches(token!);
                setBranches(data);
            } catch (err: any) {
                showError("Failed to load branches");
            }
        };
        if (open) fetchBranches();
    }, [token, open]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setBranchId(user.branchId || "");
        }
    }, [user]);

    const updateHandler = async () => {
        try {
            await apiClient.put(`/auth/users/${user._id}`, { name, email, role, branchId }, { headers: { Authorization: `Bearer ${token}` } });

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
                    <option value={UserRole.branch}>Branch</option>
                    <option value={UserRole.admin}>Admin</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch
                </label>
                <select
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select a branch...</option>
                    {branches.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                            {branch.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={updateHandler}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-4"
            >
                Update User
            </button>
        </Modal>
    );
}