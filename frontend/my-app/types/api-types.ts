// src/types/api-types.ts

export const UserRole = {
  admin: "admin",
  branch: "branch",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  branchId?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface Item {
  _id: string;
  name: string;
  unit: string;
  stock: number;
  lowStockLevel: number;
  price: number;
}

export interface Branch {
  _id: string;
  name: string;
  location: string;
}

export interface SalesItem {
  itemId: string | Item;
  quantity: number;
}

export interface Sale {
  _id: string;
  branchId: Branch;
  itemsSold: { itemId: Item; quantity: number }[];
  totalAmount: number;
  date: string;
}

export interface Purchase {
  _id: string;
  itemId: Item;
  quantity: number;
  cost: number;
  createdAt: string;
}

export type RequestStatus = "pending" | "approved" | "declined";

export interface StockRequest {
  _id: string;
  branchId: Branch;
  itemId: Item;
  quantity: number;
  status: RequestStatus;
  createdAt: string;
}
