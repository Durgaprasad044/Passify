import React from 'react';
import { TrendingUp, Users, Clock, AlertTriangle, Calendar, BarChart3 } from 'lucide-react';
import { PredictionCard } from './PredictionCard';

export const AnalyticsPage: React.FC = () => {
  const timeSlotData = [
    { time: '8:00-9:00', requests: 12, approval: 85 },
    { time: '9:00-10:00', requests: 18, approval: 92 },
    { time: '10:00-11:00', requests: 25, approval: 89 },
    { time: '11:00-12:00', requests: 20, approval: 75 },
    { time: '12:00-13:00', requests: 8, approval: 95 },
    { time: '13:00-14:00', requests: 15, approval: 78 },
    { time: '14:00-15:00', requests: 22, approval: 82 },
    { time: '15:00-16:00', requests: 16, approval: 88 },
  ];

  const reasonAnalysis = [
    { reason: 'Medical Appointment', count: 45, approval: 95, color: 'emerald' },
    { reason: 'Family Emergency', count: 32, approval: 88, color: 'blue' },
    { reason: 'Personal Work', count: 28, approval: 62, color: 'yellow' },
    { reason: 'Interview', count: 22, approval: 91, color: 'purple' },
    { reason: 'Others', count: 18, approval: 45, color: 'red' },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Deep insights into gate pass patterns and AI performance</p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <PredictionCard
            title="Total Requests"
            value="1,247"
            change="+15% this month"
            trend="up"
            icon={BarChart3}
            color="blue"
          />
          <PredictionCard
            title="Overall Approval"
            value="82.4%"
            change="+5.2% improvement"
            trend="up"
            icon={TrendingUp}
            color="emerald"
          />
          <PredictionCard
            title="Avg Response Time"
            value="2.8 hrs"
            change="-0.5 hrs faster"
            trend="down"
            icon={Clock}
            color="purple"
          />
          <PredictionCard
            title="AI Accuracy"
            value="94.7%"
            change="+2.1% this week"
            trend="up"
            icon={AlertTriangle}
            color="yellow"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Time Slot Analysis */}
          <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              <span>Peak Hours Analysis</span>
            </h2>
            
            <div className="space-y-4">
              {timeSlotData.map((slot, index) => (
                <div key={index} className="bg-white/60 border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-800 font-medium">{slot.time}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600 text-sm">{slot.requests} requests</span>
                      <span className="text-green-600 text-sm">{slot.approval}% approved</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {/* Request Volume Bar */}
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${(slot.requests / 25) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Approval Rate Bar */}
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${slot.approval}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reason Analysis */}
          <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
              <Users className="w-6 h-6 text-green-600" />
              <span>Request Categories</span>
            </h2>
            
            <div className="space-y-4">
              {reasonAnalysis.map((item, index) => (
                <div key={index} className="bg-white/60 border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-800 font-medium">{item.reason}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600 text-sm">{item.count} requests</span>
                      <span className="text-green-600 text-sm font-medium">{item.approval}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {/* Volume indicator */}
                    <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 h-full rounded-full transition-all duration-1000`}
                        style={{ width: `${(item.count / 45) * 100}%` }}
                      ></div>
                    </div>
                    
                    {/* Approval rate indicator */}
                    <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${item.approval}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Performance Metrics */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">AI Model Performance</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100/60 to-blue-200/60 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-3xl font-bold text-blue-600">94.7%</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Prediction Accuracy</h3>
              <p className="text-gray-600 text-sm">AI successfully predicts approval outcomes</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100/60 to-green-200/60 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-3xl font-bold text-green-600">2.3h</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Avg Prediction Time</h3>
              <p className="text-gray-600 text-sm">Time accuracy for response predictions</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100/60 to-purple-200/60 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-3xl font-bold text-purple-600">98.2%</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Anomaly Detection</h3>
              <p className="text-gray-600 text-sm">Successfully identifies suspicious patterns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};