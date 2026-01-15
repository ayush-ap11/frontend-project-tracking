import React from "react";
import { CheckCircle2, Clock, AlertCircle, Briefcase } from "lucide-react";

// Client specific stats card
const ClientStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <Briefcase size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Assigned</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalAssigned || 0}</h3>
                    </div>
                </div>
            </div>
             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.active || 0}</h3>
                    </div>
                </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.completed || 0}</h3>
                    </div>
                </div>
            </div>
             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Delayed</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.delayed || 0}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientStats;
