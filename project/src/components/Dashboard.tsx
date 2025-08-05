import React from 'react';
import { Bell, Search, TrendingUp, Users, FileCheck, AlertCircle } from 'lucide-react';
import RequestForm from './RequestForm';
import TrendCharts from './TrendCharts';
import HistoryTable from './HistoryTable';
import StatsCards from './StatsCards';

interface DashboardProps {
  sidebarCollapsed: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ sidebarCollapsed }) => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#16213E] border-b border-[#2E3C5A] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-[#E6EDF7] text-xl font-semibold">📊 Student Request Dashboard</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E6EDF7]/60" size={16} />
              <input
                type="text"
                placeholder="Search requests..."
                className="bg-[#2E3C5A] text-[#E6EDF7] pl-10 pr-4 py-2 rounded-lg border border-[#2E3C5A] focus:border-[#1FE0BE] focus:outline-none transition-colors duration-200"
              />
            </div>
            <button className="relative p-2 hover:bg-[#2E3C5A] rounded-lg transition-colors duration-200 text-[#E6EDF7]">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-[#FF4C4C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <StatsCards />
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Request Form */}
          <div className="xl:col-span-1">
            <RequestForm />
          </div>
          
          {/* Trend Charts */}
          <div className="xl:col-span-2">
            <TrendCharts />
          </div>
        </div>
        
        {/* History Table */}
        <HistoryTable />
      </div>
    </div>
  );
};

export default Dashboard;