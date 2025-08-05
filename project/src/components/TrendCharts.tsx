import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

const TrendCharts: React.FC = () => {
  const approvalData = [
    { day: 'Mon', approvals: 65, rejections: 15 },
    { day: 'Tue', approvals: 72, rejections: 12 },
    { day: 'Wed', approvals: 58, rejections: 18 },
    { day: 'Thu', approvals: 84, rejections: 8 },
    { day: 'Fri', approvals: 76, rejections: 14 },
    { day: 'Sat', approvals: 45, rejections: 5 },
    { day: 'Sun', approvals: 32, rejections: 3 },
  ];

  const reasonData = [
    { reason: 'Grade Change', percentage: 35, color: '#1FE0BE' },
    { reason: 'Course Withdrawal', percentage: 28, color: '#29F37C' },
    { reason: 'Financial Aid', percentage: 22, color: '#FF4C4C' },
    { reason: 'Transcript', percentage: 15, color: '#E6EDF7' },
  ];

  const maxValue = Math.max(...approvalData.map(d => d.approvals + d.rejections));

  return (
    <div className="space-y-6">
      {/* Approval Traffic Chart */}
      <div className="bg-[#16213E] rounded-2xl p-6 border border-[#2E3C5A]">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="text-[#1FE0BE]" size={20} />
          <h3 className="text-[#E6EDF7] text-lg font-semibold">Weekly Approval Traffic</h3>
        </div>
        
        <div className="space-y-4">
          {approvalData.map((data, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="text-[#E6EDF7]/70 text-sm w-8">{data.day}</span>
              <div className="flex-1 flex space-x-1">
                <div
                  className="bg-[#29F37C] h-6 rounded-l transition-all duration-500 hover:opacity-80"
                  style={{ width: `${(data.approvals / maxValue) * 100}%` }}
                />
                <div
                  className="bg-[#FF4C4C] h-6 rounded-r transition-all duration-500 hover:opacity-80"
                  style={{ width: `${(data.rejections / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-[#E6EDF7] text-sm w-16 text-right">
                {data.approvals + data.rejections}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-[#2E3C5A]">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#29F37C] rounded-full"></div>
            <span className="text-[#E6EDF7]/70 text-sm">Approved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#FF4C4C] rounded-full"></div>
            <span className="text-[#E6EDF7]/70 text-sm">Rejected</span>
          </div>
        </div>
      </div>

      {/* Request Types Distribution */}
      <div className="bg-[#16213E] rounded-2xl p-6 border border-[#2E3C5A]">
        <div className="flex items-center space-x-2 mb-6">
          <PieChart className="text-[#1FE0BE]" size={20} />
          <h3 className="text-[#E6EDF7] text-lg font-semibold">Common Request Types</h3>
        </div>
        
        <div className="space-y-3">
          {reasonData.map((data, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#E6EDF7] text-sm font-medium">{data.reason}</span>
                  <span className="text-[#E6EDF7]/70 text-sm">{data.percentage}%</span>
                </div>
                <div className="bg-[#2E3C5A] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-700 ease-out rounded-full"
                    style={{ 
                      width: `${data.percentage}%`, 
                      backgroundColor: data.color 
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendCharts;