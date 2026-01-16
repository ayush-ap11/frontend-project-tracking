import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Shield,
  Calendar,
  Briefcase,
} from "lucide-react";
import Navbar from "../components/Navbar";
import useUserDetails from "../hooks/useUserDetails";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialUser = location.state?.user || null;
  const { user, loading, error } = useUserDetails(id, initialUser);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6 text-center">
        <h2 className="text-2xl font-bold dark:text-white">{error}</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6 text-center">
        <h2 className="text-2xl font-bold dark:text-white">User Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="container mx-auto px-6 pt-24 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/5 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {user.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Detailed profile information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Mail size={18} className="text-blue-500" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Phone size={18} className="text-green-500" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Role Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Shield size={18} className="text-purple-500" />
                  <span className="uppercase font-semibold">{user.role}</span>
                </div>
                {user.role === "TEAM" &&
                  typeof user.experienceYears === "number" && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <Briefcase size={18} className="text-orange-500" />
                      <span>{user.experienceYears} years experience</span>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {joinedDate && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Account
                </h2>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Calendar size={18} className="text-teal-500" />
                  <span>Joined {joinedDate}</span>
                </div>
              </div>
            )}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Status
              </h2>
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDetails;
