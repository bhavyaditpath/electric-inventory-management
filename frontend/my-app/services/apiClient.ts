export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const apiClient = {
  async request(method: string, path: string, body?: any) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  get(path: string) {
    return this.request("GET", path);
  },
  post(path: string, body?: any) {
    return this.request("POST", path, body);
  },
  put(path: string, body?: any) {
    return this.request("PUT", path, body);
  },
  delete(path: string) {
    return this.request("DELETE", path);
  }
};
