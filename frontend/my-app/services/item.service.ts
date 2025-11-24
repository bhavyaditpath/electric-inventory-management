// src/services/item.service.ts
import { apiClient } from "./apiClient";
import type { Item } from "../types/api-types";

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
  apiClient.get<Item[]>("/items", { token });

// GET /api/items/:id
export const getItemById = (id: string, token: string) =>
  apiClient.get<Item>(`/items/${id}`, { token });

// GET /api/items/low-stock
export const getLowStockItems = (token: string) =>
  apiClient.get<Item[]>("/items/low-stock", { token });

// POST /api/items  (admin)
export const createItem = (payload: CreateItemPayload, token: string) =>
  apiClient.post<{ message: string; item: Item }>("/items", payload, {
    token,
  });

// PUT /api/items/:id  (admin)
export const updateItem = (
  id: string,
  payload: UpdateItemPayload,
  token: string
) =>
  apiClient.put<{ message: string; item: Item }>(
    `/items/${id}`,
    payload,
    { token }
  );

// DELETE /api/items/:id (admin)
export const deleteItem = (id: string, token: string) =>
  apiClient.delete<{ message: string }>(`/items/${id}`, { token });
