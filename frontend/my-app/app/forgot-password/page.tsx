"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { showSuccess, showError } from "@/services/toast";
import { forgotPasswordService } from "@/services/auth.service";
import { NAVIGATION } from "@/app/Constants/navigation.constants";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = async () => {
    if (!email) {
      showError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await forgotPasswordService({ email });

      setIsSubmitted(true);
      showSuccess("Password reset link sent to your email");
    } catch (err: any) {
      showError(err.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
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
            className="absolute top-20 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl relative z-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-6 shadow-lg"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>

          <h1 className="text-2xl font-bold text-white mb-4">
            Check Your Email
          </h1>

          <p className="text-blue-100/80 mb-6 text-sm leading-relaxed">
            We've sent a password reset link to <strong className="text-white">{email}</strong>.
            Please check your email and follow the instructions to reset your password.
          </p>

          <div className="space-y-3">
            <p className="text-blue-200/60 text-xs">
              Didn't receive the email? Check your spam folder or try again.
            </p>

            <button
              onClick={() => setIsSubmitted(false)}
              className="text-blue-200 hover:text-white text-sm underline transition-colors"
            >
              Try a different email
            </button>
          </div>

          <button
            onClick={() => router.push(NAVIGATION.auth.login)}
            className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </button>
        </motion.div>
      </div>
    );
  }

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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-4 shadow-lg"
          >
            <AlertCircle className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Forgot Password?
          </h1>
          <p className="text-blue-100/80 text-sm">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        {/* Email Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
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
                onKeyPress={(e) => e.key === 'Enter' && submit()}
              />
            </div>
          </div>
        </motion.div>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={submit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 rounded-xl shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group mb-6"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
              <span className="text-sm">Sending reset link...</span>
            </>
          ) : (
            <>
              <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Send Reset Link</span>
            </>
          )}
        </motion.button>

        {/* Back to login */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => router.push(NAVIGATION.auth.login)}
          className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-blue-200/50 text-xs mt-6"
        >
          Remember your password?{" "}
          <button
            onClick={() => router.push(NAVIGATION.auth.login)}
            className="text-blue-200 hover:text-white underline transition-colors"
          >
            Sign in here
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}