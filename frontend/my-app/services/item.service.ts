// src/services/item.service.ts
import { apiClient } from "./apiClient";
import type { Item } from "../types/api-types";
import { API_ENDPOINTS } from "../app/Constants/api.constants";

export interface CreateItemPayload {
  name: string;
  unit: string;
  stock: number;
  lowStockLevel: number;
  price: number;
}

export interface UpdateItemPayload {
  name?: string;
  unit?: string;
  stock?: number;
  lowStockLevel?: number;
  price?: number;
}

// GET /api/items
export const getItems = (token: string) =>
  apiClient.get(API_ENDPOINTS.items.base, { token });

// GET /api/items/:id
export const getItemById = (id: string, token: string) =>
  apiClient.get(`${API_ENDPOINTS.items.base}/${id}`, { token });

// GET /api/items/low-stock
export const getLowStockItems = (token: string) =>
  apiClient.get(API_ENDPOINTS.items.lowStock, { token });

// POST /api/items  (admin)
export const createItem = (payload: CreateItemPayload, token: string) =>
  apiClient.post(API_ENDPOINTS.items.base, payload, {
    token,
  });

// PUT /api/items/:id  (admin)
export const updateItem = (
  id: string,
  payload: UpdateItemPayload,
  token: string
) =>
  apiClient.put(
    `${API_ENDPOINTS.items.base}/${id}`,
    payload,
    { token }
  );

// DELETE /api/items/:id (admin)
export const deleteItem = (id: string, token: string) =>
  apiClient.delete(`${API_ENDPOINTS.items.base}/${id}`, { token });
