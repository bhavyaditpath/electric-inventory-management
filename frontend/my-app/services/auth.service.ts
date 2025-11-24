import { apiClient } from "./apiClient";
import { AuthResponse } from "../types/api-types";

export const loginService = (payload: {
  email: string;
  password: string;
}) => apiClient.post("/auth/login", payload) as Promise<AuthResponse>;
