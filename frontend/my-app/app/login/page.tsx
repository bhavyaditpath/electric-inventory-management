"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Zap, Shield, Database } from "lucide-react";
import { showError } from "@/services/toast";
import { NAVIGATION } from "@/app/Constants/navigation.constants";
import { UserRole } from "../Constants/UserRole.Constants";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-500/5 rounded-full blur-lg"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        {/* Logo/Icon section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-lg"
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Electric Inventory
          </h1>
          <p className="text-blue-100/80 text-sm">
            Manage your inventory with power
          </p>
        </div>

        {/* Email Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <label className="text-blue-100 font-medium mb-3 block text-sm">Email Address</label>
          <div className="relative group">
            <div className="flex items-center bg-white/15 rounded-xl px-4 py-3 backdrop-blur-sm border border-white/10 group-focus-within:border-white/30 transition-all duration-300">
              <Mail className="text-blue-200 mr-3 group-focus-within:text-blue-100 transition-colors" size={20} />
              <input
                type="email"
                className="bg-transparent text-white w-full focus:outline-none placeholder-blue-200/70 text-sm"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Password Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <label className="text-blue-100 font-medium mb-3 block text-sm">Password</label>
          <div className="relative group">
            <div className="flex items-center bg-white/15 rounded-xl px-4 py-3 backdrop-blur-sm border border-white/10 group-focus-within:border-white/30 transition-all duration-300">
              <Lock className="text-blue-200 mr-3 group-focus-within:text-blue-100 transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                className="bg-transparent text-white w-full focus:outline-none placeholder-blue-200/70 text-sm pr-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-blue-200 hover:text-white ml-2 absolute right-3 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Remember me and Forgot password */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <label className="flex items-center text-blue-100 text-sm cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 rounded border-white/20 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            Remember me
          </label>
          <button
            onClick={() => router.push('/forgot-password')}
            className="text-blue-200 hover:text-white text-sm transition-colors"
          >
            Forgot password?
          </button>
        </motion.div>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={submit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
              <span className="text-sm">Signing you in...</span>
            </>
          ) : (
            <>
              <Shield className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Secure Login</span>
            </>
          )}
        </motion.button>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="flex flex-col items-center text-blue-200/60">
            <Database className="w-6 h-6 mb-1" />
            <span className="text-xs">Secure</span>
          </div>
          <div className="flex flex-col items-center text-blue-200/60">
            <Zap className="w-6 h-6 mb-1" />
            <span className="text-xs">Fast</span>
          </div>
          <div className="flex flex-col items-center text-blue-200/60">
            <Shield className="w-6 h-6 mb-1" />
            <span className="text-xs">Reliable</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-blue-200/50 text-xs mt-6"
        >
          © {new Date().getFullYear()} Electric Inventory Management System
        </motion.p>
      </motion.div>
    </div>
  );
}
