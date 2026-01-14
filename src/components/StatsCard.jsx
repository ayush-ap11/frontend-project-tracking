import React from "react";
import { motion } from "framer-motion";

const StatsCard = ({ title, value, icon: Icon, color = "blue", delay = 0 }) => {
  const colorClasses = {
    blue: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    green: "bg-green-500/20 text-green-600 dark:text-green-400",
    yellow: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
    purple: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    red: "bg-red-500/20 text-red-600 dark:text-red-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {Icon && <Icon size={20} />}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
    </motion.div>
  );
};

export default StatsCard;
