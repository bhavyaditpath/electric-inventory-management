import { API } from "./api";

interface RequestOptions {
  headers?: Record<string, string>;
  token?: string;
}

export const apiClient = {
  async request(method: string, path: string, body?: any, options: RequestOptions = {}) {
    const token =
      options.token ||
      (typeof window !== "undefined" ? localStorage.getItem("token") : null);

    const res = await fetch(`${API}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    return res.json();
  },

  get(path: string, options?: RequestOptions) {
    return this.request("GET", path, undefined, options);
  },

  post(path: string, body?: any, options?: RequestOptions) {
    return this.request("POST", path, body, options);
  },

  put(path: string, body?: any, options?: RequestOptions) {
    return this.request("PUT", path, body, options);
  },

  delete(path: string, options?: RequestOptions) {
    return this.request("DELETE", path, undefined, options);
  }
};
