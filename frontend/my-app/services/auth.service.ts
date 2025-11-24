import { apiClient } from "./apiClient";
import { AuthResponse, User } from "../types/api-types";

export const loginService = (payload: {
  email: string;
  password: string;
}) => apiClient.post("/auth/login", payload) as Promise<AuthResponse>;

export const registerUser = (
  payload: {
    name: string;
    email: string;
    password: string;
    role: "admin" | "branch";
    branchName?: string;
  },
  token: string
) =>
  apiClient.post("/auth/register", payload, {
    token
  }) as Promise<{ message: string; user: User }>;
