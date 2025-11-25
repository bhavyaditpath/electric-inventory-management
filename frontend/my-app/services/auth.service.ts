import { apiClient } from "./apiClient";
import { AuthResponse, User, UserRole } from "../types/api-types";
import { API_ENDPOINTS } from "../app/Constants/api.constants";

export const loginService = (payload: {
  email: string;
  password: string;
}) => apiClient.post(API_ENDPOINTS.auth.login, payload) as Promise<AuthResponse>;

export const registerUser = (
  payload: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    branchName?: string;
  },
  token: string
) =>
  apiClient.post(API_ENDPOINTS.auth.register, payload, {
    token
  }) as Promise<{ message: string; user: User }>;
