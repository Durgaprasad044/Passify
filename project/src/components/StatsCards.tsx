import React from 'react';
import { TrendingUp, Users, FileCheck, AlertCircle } from 'lucide-react';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Total Requests',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: FileCheck,
      color: 'text-[#1FE0BE]',
    },
    {
      title: 'Approval Rate',
      value: '87%',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-[#29F37C]',
    },
    {
      title: 'Active Students',
      value: '456',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'text-[#1FE0BE]',
    },
    {
      title: 'Pending Reviews',
      value: '23',
      change: '-15%',
      changeType: 'negative',
      icon: AlertCircle,
      color: 'text-[#FF4C4C]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-[#16213E] p-6 rounded-2xl border border-[#2E3C5A] hover:shadow-lg transition-all duration-300 hover:border-[#1FE0BE]/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-[#2E3C5A] ${stat.color}`}>
                <Icon size={24} />
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-[#29F37C]' : 'text-[#FF4C4C]'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-[#E6EDF7]/70 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-[#E6EDF7] text-2xl font-bold">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;