"use client";

import InputField from "@/components/InputField";
import Modal from "@/components/Modal";
import { useState } from "react";
import { registerUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { showSuccess, showError } from "@/services/toast";

export default function NewUser({ open, onClose, onSuccess }: any) {
    const token = useAuthStore((s) => s.token);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [branchName, setBranchName] = useState("");

    const createHandler = async () => {
        try {
            await registerUser(
                {
                    name,
                    email,
                    password,
                    role: "branch",
                    branchName,
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
            <InputField
                label="Branch Name"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
            />


            <button
                onClick={createHandler}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-4"
            >
                Create User
            </button>
        </Modal>
    );
}
