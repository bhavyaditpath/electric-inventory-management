import { apiClient } from "./apiClient";
import { AuthResponse, User } from "../types/api-types";
import { API_ENDPOINTS } from "../app/Constants/api.constants";
import { UserRole } from "@/app/Constants/UserRole.Constants";

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
    branchId?: string;
  },
  token: string
) =>
  apiClient.post(API_ENDPOINTS.auth.register, payload, {
    token
  }) as Promise<{ message: string; user: User }>;

export const forgotPasswordService = (payload: {
  email: string;
}) => apiClient.post(API_ENDPOINTS.auth.forgotPassword, payload) as Promise<{ message: string; resetToken?: string }>;

export const resetPasswordService = (payload: {
  token: string;
  newPassword: string;
}) => apiClient.post(API_ENDPOINTS.auth.resetPassword, payload) as Promise<{ message: string }>;
