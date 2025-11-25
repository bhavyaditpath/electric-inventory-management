export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    users: "/auth/users",
  },
  items: {
    base: "/items",
    lowStock: "/items/low-stock",
  },
  purchases: {
    base: "/purchases",
  },
  requests: {
    base: "/requests",
    my: "/requests/my",
    approve: "/requests/approve",
    decline: "/requests/decline",
  },
  sales: {
    base: "/sales",
    branch: "/sales/branch",
  },
};