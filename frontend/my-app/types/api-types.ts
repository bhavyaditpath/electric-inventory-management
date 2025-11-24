// src/types/api-types.ts

export type UserRole = "admin" | "branch";

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
  branchId: string;
  itemsSold: SalesItem[];
  totalAmount: number;
  date: string;
}

export interface Purchase {
  _id: string;
  itemId: string | Item;
  quantity: number;
  cost: number;
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
