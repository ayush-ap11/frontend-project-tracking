import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-20 relative">
        {/* Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
              Track Projects <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                With Confidence
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Manage project stages, track team progress, and hit delivery dates 
            with our modern, real-time dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/signup"
              className="px-8 py-3.5 text-lg font-semibold bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 text-lg font-semibold bg-white dark:bg-white/10 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-full hover:bg-gray-50 dark:hover:bg-white/20 transition-all"
            >
              Log In
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
          >
            {[
              "Real-time Progress Updates",
              "Team Collaboration",
              "Deadline Tracking",
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-lg"
              >
                <div className="flex items-center justify-center gap-3 text-gray-800 dark:text-gray-200 font-medium">
                  <CheckCircle2 className="text-blue-500" />
                  {feature}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
