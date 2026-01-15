import React from "react";
import StatsCard from "../StatsCard"; // Assuming StatsCard is in ../../components but strictly it is in ../StatsCard based on relative path from admin folder
import { LayoutDashboard, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatsCard 
        title="Total Projects" 
        value={stats?.totalProjects || 0} 
        icon={LayoutDashboard} 
        color="blue" 
        delay={0} 
      />
      <StatsCard 
        title="Completed" 
        value={stats?.completedProjects || 0} 
        icon={CheckCircle2} 
        color="green" 
        delay={0.1} 
      />
      <StatsCard 
        title="Active" 
        value={stats?.activeProjects || 0} 
        icon={Clock} 
        color="purple" 
        delay={0.2} 
      />
      <StatsCard 
        title="Delayed" 
        value={stats?.delayedProjects || 0} 
        icon={AlertCircle} 
        color="red" 
        delay={0.3} 
      />
    </div>
  );
};

export default DashboardStats;
