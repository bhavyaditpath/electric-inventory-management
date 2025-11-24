// src/services/sales.service.ts
import { apiClient } from "./apiClient";
import type { Sale, SalesItem } from "../types/api-types";

export interface RecordSalePayload {
  branchId: string;
  itemsSold: SalesItem[]; // { itemId, quantity }
  totalAmount: number;
}

// POST /api/sales
export const recordSale = (payload: RecordSalePayload, token: string) =>
  apiClient.post<{ message: string; sale: Sale }>(
    "/sales",
    payload,
    { token }
  );

// GET /api/sales/branch/:branchId
export const getSalesByBranch = (branchId: string, token: string) =>
  apiClient.get<Sale[]>(`/sales/branch/${branchId}`, { token });

// GET /api/sales (admin)
export const getAllSales = (token: string) =>
  apiClient.get<Sale[]>("/sales", { token });
