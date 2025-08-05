import React from 'react';
import { Brain, TrendingUp, Clock, AlertCircle } from 'lucide-react';

const AIPredictions: React.FC = () => {
  const predictions = [
    {
      id: 1,
      requestId: 'REQ-001',
      student: 'John Doe',
      type: 'Medical Leave',
      approvalChance: 92,
      estimatedTime: '2 hours',
      confidence: 'High',
      factors: ['Valid medical certificate', 'Good attendance record', 'Previous approvals']
    },
    {
      id: 2,
      requestId: 'REQ-002',
      student: 'Jane Smith',
      type: 'Academic Extension',
      approvalChance: 67,
      estimatedTime: '4 hours',
      confidence: 'Medium',
      factors: ['Partial documentation', 'Average performance', 'First-time request']
    },
    {
      id: 3,
      requestId: 'REQ-003',
      student: 'Mike Johnson',
      type: 'Fee Waiver',
      approvalChance: 34,
      estimatedTime: '6 hours',
      confidence: 'Low',
      factors: ['Incomplete documents', 'Multiple previous requests', 'Policy restrictions']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#16213E] border-b border-[#2E3C5A] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-[#E6EDF7] text-xl font-semibold">🔮 AI Predictions</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Model Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Model Accuracy</h3>
              <Brain className="text-[#1FE0BE]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#1FE0BE] mb-2">94.2%</p>
            <p className="text-[#E6EDF7]/60 text-sm">Last 30 days</p>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Predictions Made</h3>
              <TrendingUp className="text-[#1FE0BE]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#1FE0BE] mb-2">1,847</p>
            <p className="text-[#E6EDF7]/60 text-sm">This month</p>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Avg Processing Time</h3>
              <Clock className="text-[#1FE0BE]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#1FE0BE] mb-2">3.2h</p>
            <p className="text-[#E6EDF7]/60 text-sm">↓ 15% improvement</p>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">High Confidence</h3>
              <AlertCircle className="text-[#1FE0BE]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#1FE0BE] mb-2">78%</p>
            <p className="text-[#E6EDF7]/60 text-sm">Of all predictions</p>
          </div>
        </div>

        {/* Current Predictions */}
        <div className="bg-[#16213E] rounded-xl border border-[#2E3C5A]">
          <div className="p-6 border-b border-[#2E3C5A]">
            <h3 className="text-[#E6EDF7] text-lg font-semibold">Current Request Predictions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="bg-[#0B0F1A] rounded-lg p-6 border border-[#2E3C5A]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-[#E6EDF7] font-semibold text-lg">{prediction.requestId}</h4>
                      <p className="text-[#E6EDF7]/60">{prediction.student} - {prediction.type}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      prediction.confidence === 'High' 
                        ? 'bg-[#1FE0BE]/20 text-[#1FE0BE]'
                        : prediction.confidence === 'Medium'
                        ? 'bg-[#FF9500]/20 text-[#FF9500]'
                        : 'bg-[#FF4C4C]/20 text-[#FF4C4C]'
                    }`}>
                      {prediction.confidence} Confidence
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#E6EDF7] font-medium">Approval Chance</span>
                          <span className="text-[#1FE0BE] font-bold">{prediction.approvalChance}%</span>
                        </div>
                        <div className="w-full bg-[#2E3C5A] rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              prediction.approvalChance >= 70 
                                ? 'bg-[#1FE0BE]' 
                                : prediction.approvalChance >= 40 
                                ? 'bg-[#FF9500]' 
                                : 'bg-[#FF4C4C]'
                            }`}
                            style={{ width: `${prediction.approvalChance}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-[#E6EDF7]/60">
                        <Clock size={16} />
                        <span>Estimated processing: {prediction.estimatedTime}</span>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-[#E6EDF7] font-medium mb-2">Key Factors</h5>
                      <ul className="space-y-1">
                        {prediction.factors.map((factor, index) => (
                          <li key={index} className="text-[#E6EDF7]/60 text-sm flex items-center space-x-2">
                            <span className="w-1 h-1 bg-[#1FE0BE] rounded-full"></span>
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPredictions;