"use client";

import InputField from "@/components/InputField";
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import { registerUser } from "@/services/auth.service";
import { getBranches } from "@/services/branch.service";
import { useAuthStore } from "@/store/authStore";
import { showSuccess, showError } from "@/services/toast";
import { UserRole } from "@/app/Constants/UserRole.Constants";
import { Branch } from "@/types/api-types";

export default function NewUser({ open, onClose, onSuccess }: any) {
    const token = useAuthStore((s) => s.token);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    const createHandler = async () => {
        try {
            await registerUser(
                {
                    name,
                    email,
                    password,
                    role: UserRole.branch,
                    branchId,
                },
                token!
            );

            showSuccess("User Created Successfully!");
            onSuccess();
            onClose();
        } catch (err: any) {
            showError(err.message);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4">Create Branch User</h2>

            <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <InputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch
                </label>
                <select
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
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
                onClick={createHandler}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg mt-6"
            >
                Create User
            </button>
        </Modal>
    );
}
