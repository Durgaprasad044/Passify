import React, { useState } from 'react';
import { Plus, Clock, CheckCircle, XCircle, AlertTriangle, Calendar, User, MapPin } from 'lucide-react';
import { PredictionCard } from './PredictionCard';
import { RequestForm } from './RequestForm';

export const StudentDashboard: React.FC = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: 'Gate Pass',
      reason: 'Medical Appointment',
      date: '2025-01-15',
      time: '10:00 AM',
      status: 'approved',
      prediction: { likelihood: 92, responseTime: '2 hours' }
    },
    {
      id: 2,
      type: 'Appointment',
      reason: 'Parent Meeting',
      date: '2025-01-16',
      time: '2:00 PM',
      status: 'pending',
      prediction: { likelihood: 78, responseTime: '4 hours' }
    },
    {
      id: 3,
      type: 'Gate Pass',
      reason: 'Personal Work',
      date: '2025-01-14',
      time: '3:00 PM',
      status: 'rejected',
      prediction: { likelihood: 45, responseTime: '6 hours' }
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Dashboard</h1>
              <p className="text-gray-600">Manage your gate passes and appointments with AI insights</p>
            </div>
            <button
              onClick={() => setShowRequestForm(true)}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-gray-500/25"
            >
              <Plus className="w-5 h-5" />
              <span>New Request</span>
            </button>
          </div>
        </div>

        {/* AI Prediction Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <PredictionCard
            title="Approval Rate"
            value="84%"
            change="+12%"
            trend="up"
            icon={CheckCircle}
            color="emerald"
          />
          <PredictionCard
            title="Avg Response Time"
            value="3.2 hrs"
            change="-0.8 hrs"
            trend="down"
            icon={Clock}
            color="blue"
          />
          <PredictionCard
            title="Best Time Slot"
            value="10-11 AM"
            change="92% success"
            trend="up"
            icon={Calendar}
            color="purple"
          />
          <PredictionCard
            title="Current Status"
            value="2 Pending"
            change="1 approved today"
            trend="neutral"
            icon={AlertTriangle}
            color="yellow"
          />
        </div>

        {/* Recent Requests */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Requests</h2>
          
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white/60 border border-gray-200 rounded-xl p-6 hover:bg-white/80 transition-all duration-200 transform hover:scale-[1.02] shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <span className="font-semibold text-gray-800">{request.type}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{request.reason}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{request.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{request.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="bg-gradient-to-r from-gray-100/80 to-gray-200/80 backdrop-blur-xl border border-gray-300 rounded-xl p-4 ml-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800 mb-1">
                          {request.prediction.likelihood}%
                        </div>
                        <div className="text-xs text-gray-500 mb-2">Approval Chance</div>
                        <div className="text-sm text-green-600">
                          ~{request.prediction.responseTime}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Request Form Modal */}
      {showRequestForm && (
        <RequestForm
          onClose={() => setShowRequestForm(false)}
          onSubmit={(newRequest) => {
            setRequests([...requests, { ...newRequest, id: requests.length + 1 }]);
            setShowRequestForm(false);
          }}
        />
      )}
    </div>
  );
};