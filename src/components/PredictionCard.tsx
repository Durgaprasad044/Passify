import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PredictionCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'emerald' | 'purple' | 'yellow' | 'red';
}

export const PredictionCard: React.FC<PredictionCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'from-blue-100/60 to-blue-200/60 text-blue-600';
      case 'emerald':
        return 'from-green-100/60 to-green-200/60 text-green-600';
      case 'purple':
        return 'from-purple-100/60 to-purple-200/60 text-purple-600';
      case 'yellow':
        return 'from-yellow-100/60 to-yellow-200/60 text-yellow-600';
      case 'red':
        return 'from-red-100/60 to-red-200/60 text-red-600';
      default:
        return 'from-gray-100/60 to-gray-200/60 text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`bg-gradient-to-br ${getColorClasses(color)} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center space-x-1">
          {getTrendIcon()}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className="text-3xl font-bold text-gray-800">{value}</div>
        <div className={`text-sm flex items-center space-x-1 ${getTrendColor()}`}>
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};