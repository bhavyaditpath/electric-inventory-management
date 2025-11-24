"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export const useAuthInit = () => {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      login(JSON.parse(user), token);
    }
  }, []);
};
