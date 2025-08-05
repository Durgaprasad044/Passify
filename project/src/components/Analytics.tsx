import React from 'react';
import { TrendingUp, Clock, CheckCircle, Users } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#16213E] border-b border-[#2E3C5A] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-[#E6EDF7] text-xl font-semibold">📈 Analytics</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Peak Hours Card */}
          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Peak Hours</h3>
              <Clock className="text-[#1FE0BE]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#1FE0BE] mb-2">2-4 PM</p>
            <p className="text-[#E6EDF7]/60 text-sm">Highest request volume</p>
          </div>

          {/* Common Reasons Card */}
          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Top Reason</h3>
              <CheckCircle className="text-[#1FE0BE]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#1FE0BE] mb-2">Medical</p>
            <p className="text-[#E6EDF7]/60 text-sm">45% of all requests</p>
          </div>

          {/* Approval Trends Card */}
          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Approval Rate</h3>
              <TrendingUp className="text-[#1FE0BE]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#1FE0BE] mb-2">87%</p>
            <p className="text-[#E6EDF7]/60 text-sm">↑ 5% from last month</p>
          </div>

          {/* Active Users Card */}
          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Active Users</h3>
              <Users className="text-[#1FE0BE]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#1FE0BE] mb-2">1,234</p>
            <p className="text-[#E6EDF7]/60 text-sm">This month</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <h3 className="text-[#E6EDF7] font-semibold mb-4">Request Volume Trends</h3>
            <div className="h-64 flex items-center justify-center text-[#E6EDF7]/60">
              Chart placeholder - Request volume over time
            </div>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <h3 className="text-[#E6EDF7] font-semibold mb-4">Approval Rate Trends</h3>
            <div className="h-64 flex items-center justify-center text-[#E6EDF7]/60">
              Chart placeholder - Approval rates over time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;