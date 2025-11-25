// src/services/purchase.service.ts
import { apiClient } from "./apiClient";
import type { Purchase } from "../types/api-types";
import { API_ENDPOINTS } from "../app/Constants/api.constants";

export interface RecordPurchasePayload {
  itemId: string;
  quantity: number;
  cost: number;
}

// POST /api/purchases  (admin)
export const recordPurchase = (
  payload: RecordPurchasePayload,
  token: string
) =>
  apiClient.post(
    API_ENDPOINTS.purchases.base,
    payload,
    { token }
  );

// GET /api/purchases  (admin)
export const getPurchases = (token: string) =>
  apiClient.get(API_ENDPOINTS.purchases.base, { token });
