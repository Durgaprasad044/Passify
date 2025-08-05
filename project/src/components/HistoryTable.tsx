import React, { useState } from 'react';
import { FileText, Filter, Download, Eye } from 'lucide-react';

const HistoryTable: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const requests = [
    {
      id: 'REQ-2024-001',
      student: 'Alice Johnson',
      type: 'Grade Change',
      date: '2024-01-15',
      status: 'approved',
      priority: 'medium',
    },
    {
      id: 'REQ-2024-002',
      student: 'Bob Smith',
      type: 'Course Withdrawal',
      date: '2024-01-14',
      status: 'pending',
      priority: 'high',
    },
    {
      id: 'REQ-2024-003',
      student: 'Carol Davis',
      type: 'Financial Aid',
      date: '2024-01-13',
      status: 'flagged',
      priority: 'urgent',
    },
    {
      id: 'REQ-2024-004',
      student: 'David Wilson',
      type: 'Transcript',
      date: '2024-01-12',
      status: 'approved',
      priority: 'low',
    },
    {
      id: 'REQ-2024-005',
      student: 'Eva Brown',
      type: 'Grade Change',
      date: '2024-01-11',
      status: 'pending',
      priority: 'medium',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-[#29F37C]/20 text-[#29F37C] border-[#29F37C]/30';
      case 'pending':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'flagged':
        return 'bg-[#FF4C4C]/20 text-[#FF4C4C] border-[#FF4C4C]/30';
      default:
        return 'bg-[#E6EDF7]/20 text-[#E6EDF7] border-[#E6EDF7]/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-[#FF4C4C]';
      case 'high':
        return 'text-orange-400';
      case 'medium':
        return 'text-[#1FE0BE]';
      case 'low':
        return 'text-[#E6EDF7]/60';
      default:
        return 'text-[#E6EDF7]/60';
    }
  };

  const filteredRequests = filter === 'all' ? requests : requests.filter(req => req.status === filter);

  return (
    <div className="bg-[#16213E] rounded-2xl p-6 border border-[#2E3C5A]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FileText className="text-[#1FE0BE]" size={20} />
          <h3 className="text-[#E6EDF7] text-lg font-semibold">Request History</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="text-[#E6EDF7]/60" size={16} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#2E3C5A] text-[#E6EDF7] px-3 py-2 rounded-lg border border-[#2E3C5A] focus:border-[#1FE0BE] focus:outline-none text-sm"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
          
          <button className="flex items-center space-x-2 bg-[#1FE0BE]/10 hover:bg-[#1FE0BE]/20 text-[#1FE0BE] px-4 py-2 rounded-lg border border-[#1FE0BE]/30 transition-all duration-200">
            <Download size={16} />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2E3C5A]">
              <th className="text-left text-[#E6EDF7]/70 font-medium py-3 px-4">Request ID</th>
              <th className="text-left text-[#E6EDF7]/70 font-medium py-3 px-4">Student</th>
              <th className="text-left text-[#E6EDF7]/70 font-medium py-3 px-4">Type</th>
              <th className="text-left text-[#E6EDF7]/70 font-medium py-3 px-4">Date</th>
              <th className="text-left text-[#E6EDF7]/70 font-medium py-3 px-4">Priority</th>
              <th className="text-left text-[#E6EDF7]/70 font-medium py-3 px-4">Status</th>
              <th className="text-left text-[#E6EDF7]/70 font-medium py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request, index) => (
              <tr
                key={request.id}
                className="border-b border-[#2E3C5A]/50 hover:bg-[#2E3C5A]/30 transition-colors duration-200"
              >
                <td className="py-4 px-4">
                  <span className="text-[#E6EDF7] font-mono text-sm">{request.id}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-[#E6EDF7] font-medium">{request.student}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-[#E6EDF7]/80">{request.type}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-[#E6EDF7]/70 text-sm">{request.date}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                    {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}
                  >
                    {request.status === 'approved' && '🟢'}
                    {request.status === 'pending' && '🟡'}
                    {request.status === 'flagged' && '🔴'}
                    {' '}
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-[#1FE0BE] hover:text-[#1FE0BE]/80 transition-colors duration-200">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#2E3C5A]">
        <span className="text-[#E6EDF7]/60 text-sm">
          Showing {filteredRequests.length} of {requests.length} requests
        </span>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 text-[#E6EDF7]/60 hover:text-[#1FE0BE] transition-colors duration-200">
            Previous
          </button>
          <button className="px-3 py-2 bg-[#1FE0BE] text-[#101C3B] rounded-lg font-medium">
            1
          </button>
          <button className="px-3 py-2 text-[#E6EDF7]/60 hover:text-[#1FE0BE] transition-colors duration-200">
            2
          </button>
          <button className="px-3 py-2 text-[#E6EDF7]/60 hover:text-[#1FE0BE] transition-colors duration-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;