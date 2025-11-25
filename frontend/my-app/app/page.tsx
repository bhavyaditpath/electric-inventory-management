"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Zap } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.push("/login");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <Zap size={48} className="text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Electric Inventory
        </h1>
        <p className="text-blue-100 mb-8 max-w-md">
          Redirecting to login page...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
    </div>
  );
}
