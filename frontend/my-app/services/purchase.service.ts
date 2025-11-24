// src/services/purchase.service.ts
import { apiClient } from "./apiClient";
import type { Purchase } from "../types/api-types";

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
    "/purchases",
    payload,
    { token }
  );

// GET /api/purchases  (admin)
export const getPurchases = (token: string) =>
  apiClient.get("/purchases", { token });
