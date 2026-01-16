import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";
import { motion as Motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "CLIENT":
        return "/client/dashboard";
      case "TEAM":
        return "/team/dashboard";
      default:
        return "/";
    }
  };

  return (
    <Motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300",
        "bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-white/20 dark:border-white/10"
      )}
    >
      {/* Logo */}
      <Link
        to={user ? getDashboardLink() : "/"}
        className="flex items-center gap-2 group"
      >
        <div className="p-2 rounded-xl bg-blue-600/20 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
          <LayoutDashboard size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
          Project<span className="text-blue-600 dark:text-blue-400">Track</span>
        </span>
      </Link>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Auth Buttons */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
              {user.name}
            </span>
            <Link
              to={getDashboardLink()}
              className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-blue-600/20 transition-all transform hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </Motion.nav>
  );
};

export default Navbar;
