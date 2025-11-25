// src/services/request.service.ts
import { apiClient } from "./apiClient";
import type { StockRequest } from "../types/api-types";
import { API_ENDPOINTS } from "../app/Constants/api.constants";

export interface CreateRequestPayload {
  itemId: string;
  quantity: number;
}

// POST /api/requests  (branch)
export const createRequest = (payload: CreateRequestPayload, token: string) =>
  apiClient.post(
    API_ENDPOINTS.requests.base,
    payload,
    { token }
  );

// GET /api/requests/my  (branch)
export const getMyRequests = (token: string) =>
  apiClient.get(API_ENDPOINTS.requests.my, { token });

// GET /api/requests  (admin)
export const getAllRequests = (token: string) =>
  apiClient.get(API_ENDPOINTS.requests.base, { token });

// PUT /api/requests/approve/:id  (admin)
export const approveRequest = (requestId: string, token: string) =>
  apiClient.put(
    `${API_ENDPOINTS.requests.approve}/${requestId}`,
    {},
    { token }
  );

// PUT /api/requests/decline/:id (admin)
export const declineRequest = (requestId: string, token: string) =>
  apiClient.put(
    `${API_ENDPOINTS.requests.decline}/${requestId}`,
    {},
    { token }
  );
