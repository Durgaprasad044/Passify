import React, { useState } from 'react';
import { Users, Clock, CheckCircle, XCircle, AlertTriangle, Filter, Search, Eye } from 'lucide-react';
import { PredictionCard } from './PredictionCard';

export const AdminDashboard: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const pendingRequests = [
    {
      id: 1,
      student: 'John Doe',
      studentId: 'CS2021001',
      type: 'Gate Pass',
      reason: 'Medical Appointment',
      date: '2025-01-15',
      time: '10:00 AM',
      aiScore: 92,
      riskLevel: 'low',
      submitTime: '2 hours ago'
    },
    {
      id: 2,
      student: 'Jane Smith',
      studentId: 'EC2021045',
      type: 'Appointment',
      reason: 'Parent Meeting',
      date: '2025-01-16',
      time: '2:00 PM',
      aiScore: 78,
      riskLevel: 'medium',
      submitTime: '1 hour ago'
    },
    {
      id: 3,
      student: 'Mike Johnson',
      studentId: 'ME2021089',
      type: 'Gate Pass',
      reason: 'Personal Work',
      date: '2025-01-15',
      time: '6:00 PM',
      aiScore: 34,
      riskLevel: 'high',
      submitTime: '30 minutes ago'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleApprove = (id: number) => {
    console.log('Approved request:', id);
  };

  const handleReject = (id: number) => {
    console.log('Rejected request:', id);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage gate pass requests with AI-powered insights</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <PredictionCard
            title="Pending Requests"
            value="12"
            change="+3 today"
            trend="up"
            icon={Clock}
            color="yellow"
          />
          <PredictionCard
            title="Approved Today"
            value="28"
            change="+5 from yesterday"
            trend="up"
            icon={CheckCircle}
            color="emerald"
          />
          <PredictionCard
            title="Rejection Rate"
            value="8%"
            change="-2% this week"
            trend="down"
            icon={XCircle}
            color="red"
          />
          <PredictionCard
            title="AI Accuracy"
            value="94.3%"
            change="+1.2% improvement"
            trend="up"
            icon={AlertTriangle}
            color="blue"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-white/80 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="all">All Requests</option>
                  <option value="pending">Pending</option>
                  <option value="high-risk">High Risk</option>
                  <option value="low-score">Low AI Score</option>
                </select>
              </div>
            </div>
            
            <div className="relative">
              <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/80 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 min-w-[300px]"
              />
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pending Requests</h2>
          
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white/60 border border-gray-200 rounded-xl p-6 hover:bg-white/80 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-800">{request.student}</h3>
                        <p className="text-sm text-gray-600">{request.studentId}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(request.riskLevel)}`}>
                        {request.riskLevel.toUpperCase()} RISK
                      </span>
                      <span className="text-sm text-gray-500">{request.submitTime}</span>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">Type:</span> {request.type}
                      </div>
                      <div>
                        <span className="font-medium">Reason:</span> {request.reason}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {request.date}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {request.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 ml-6">
                    {/* AI Score */}
                    <div className="bg-gradient-to-r from-gray-100/80 to-gray-200/80 backdrop-blur-xl border border-gray-300 rounded-xl p-4 text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(request.aiScore)}`}>
                        {request.aiScore}
                      </div>
                      <div className="text-xs text-gray-500">AI Score</div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};