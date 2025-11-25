"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { showError } from "@/services/toast";
import { UserRole } from "@/types/api-types";
import { NAVIGATION } from "@/app/Constants/navigation.constants";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    if (!email || !password) {
      showError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginService({ email, password });
      login(res.user, res.token);

      if (res.user.role === UserRole.admin) router.push(NAVIGATION.admin.dashboard);
      else router.push(NAVIGATION.branch.dashboard);
    } catch (err: any) {
      showError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Electric Inventory
        </h1>
        <p className="text-center text-blue-100 mb-8">
          Please login to continue
        </p>

        {/* Email Input */}
        <div className="mb-5">
          <label className="text-blue-100 font-medium mb-2 block">Email</label>
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
            <Mail className="text-blue-100 mr-2" size={20} />
            <input
              type="email"
              className="bg-transparent text-white w-full focus:outline-none placeholder-blue-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="text-blue-100 font-medium mb-2 block">Password</label>
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
            <Lock className="text-blue-100 mr-2" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              className="bg-transparent text-white w-full focus:outline-none placeholder-blue-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-blue-100 hover:text-white ml-2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={submit}
          disabled={isLoading}
          className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-50 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Signing in...
            </>
          ) : (
            "Login"
          )}
        </motion.button>


        <p className="text-center text-blue-200 text-sm mt-4">
          © {new Date().getFullYear()} Electric Inventory
        </p>
      </motion.div>
    </div>
  );
}
