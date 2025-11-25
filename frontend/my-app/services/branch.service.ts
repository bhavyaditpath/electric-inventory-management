// src/services/branch.service.ts
import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../app/Constants/api.constants";

// GET /api/branches
export const getBranches = (token: string) =>
  apiClient.get(API_ENDPOINTS.branches.base, { token });

// POST /api/branches
export const createBranch = (data: { name: string; address?: string }, token: string) =>
  apiClient.post(API_ENDPOINTS.branches.base, data, { token });

// PUT /api/branches/:id
export const updateBranch = (id: string, data: { name?: string; address?: string }, token: string) =>
  apiClient.put(`${API_ENDPOINTS.branches.base}/${id}`, data, { token });

// DELETE /api/branches/:id
export const deleteBranch = (id: string, token: string) =>
  apiClient.delete(`${API_ENDPOINTS.branches.base}/${id}`, { token });