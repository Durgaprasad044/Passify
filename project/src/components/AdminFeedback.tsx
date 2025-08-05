import React, { useState } from 'react';
import { Wrench, ThumbsUp, ThumbsDown, MessageSquare, Send } from 'lucide-react';

const AdminFeedback: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const pendingFeedback = [
    {
      id: 'REQ-001',
      student: 'John Doe',
      type: 'Medical Leave',
      aiDecision: 'Approve',
      aiConfidence: 92,
      actualDecision: null,
      timestamp: '2024-01-15 10:30 AM'
    },
    {
      id: 'REQ-002',
      student: 'Jane Smith',
      type: 'Academic Extension',
      aiDecision: 'Review',
      aiConfidence: 67,
      actualDecision: null,
      timestamp: '2024-01-15 11:15 AM'
    },
    {
      id: 'REQ-003',
      student: 'Mike Johnson',
      type: 'Fee Waiver',
      aiDecision: 'Reject',
      aiConfidence: 34,
      actualDecision: 'Approve',
      timestamp: '2024-01-15 12:00 PM'
    }
  ];

  const handleFeedback = (requestId: string, decision: 'correct' | 'incorrect') => {
    console.log(`Feedback for ${requestId}: ${decision}`);
    // Here you would typically send the feedback to your backend
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#16213E] border-b border-[#2E3C5A] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-[#E6EDF7] text-xl font-semibold">🛠️ Admin Feedback</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Feedback Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Pending Feedback</h3>
              <Wrench className="text-[#FF9500]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#FF9500]">12</p>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Correct Predictions</h3>
              <ThumbsUp className="text-[#1FE0BE]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#1FE0BE]">89%</p>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Model Improvements</h3>
              <ThumbsDown className="text-[#FF4C4C]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#FF4C4C]">23</p>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Feedback Given</h3>
              <MessageSquare className="text-[#1FE0BE]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#1FE0BE]">156</p>
          </div>
        </div>

        {/* Feedback Panel */}
        <div className="bg-[#16213E] rounded-xl border border-[#2E3C5A]">
          <div className="p-6 border-b border-[#2E3C5A]">
            <h3 className="text-[#E6EDF7] text-lg font-semibold">Model Training Feedback</h3>
            <p className="text-[#E6EDF7]/60 text-sm mt-1">Help improve AI predictions by providing feedback on model decisions</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {pendingFeedback.map((item) => (
                <div key={item.id} className="bg-[#0B0F1A] rounded-lg p-6 border border-[#2E3C5A]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-[#E6EDF7] font-semibold text-lg">{item.id}</h4>
                      <p className="text-[#E6EDF7]/60">{item.student} - {item.type}</p>
                      <p className="text-[#E6EDF7]/40 text-sm">{item.timestamp}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.aiConfidence >= 70 
                        ? 'bg-[#1FE0BE]/20 text-[#1FE0BE]'
                        : item.aiConfidence >= 40
                        ? 'bg-[#FF9500]/20 text-[#FF9500]'
                        : 'bg-[#FF4C4C]/20 text-[#FF4C4C]'
                    }`}>
                      {item.aiConfidence}% Confidence
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h5 className="text-[#E6EDF7] font-medium mb-2">AI Recommendation</h5>
                      <div className={`px-4 py-2 rounded-lg ${
                        item.aiDecision === 'Approve' 
                          ? 'bg-[#1FE0BE]/20 text-[#1FE0BE]'
                          : item.aiDecision === 'Reject'
                          ? 'bg-[#FF4C4C]/20 text-[#FF4C4C]'
                          : 'bg-[#FF9500]/20 text-[#FF9500]'
                      }`}>
                        {item.aiDecision}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-[#E6EDF7] font-medium mb-2">Actual Decision</h5>
                      <div className={`px-4 py-2 rounded-lg ${
                        item.actualDecision === 'Approve' 
                          ? 'bg-[#1FE0BE]/20 text-[#1FE0BE]'
                          : item.actualDecision === 'Reject'
                          ? 'bg-[#FF4C4C]/20 text-[#FF4C4C]'
                          : 'bg-[#2E3C5A] text-[#E6EDF7]/60'
                      }`}>
                        {item.actualDecision || 'Pending'}
                      </div>
                    </div>
                  </div>

                  {item.actualDecision && (
                    <div className="flex items-center space-x-4">
                      <span className="text-[#E6EDF7] font-medium">Was the AI prediction correct?</span>
                      <button
                        onClick={() => handleFeedback(item.id, 'correct')}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#1FE0BE]/20 text-[#1FE0BE] rounded-lg hover:bg-[#1FE0BE]/30 transition-colors"
                      >
                        <ThumbsUp size={16} />
                        <span>Correct</span>
                      </button>
                      <button
                        onClick={() => handleFeedback(item.id, 'incorrect')}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#FF4C4C]/20 text-[#FF4C4C] rounded-lg hover:bg-[#FF4C4C]/30 transition-colors"
                      >
                        <ThumbsDown size={16} />
                        <span>Incorrect</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Feedback Section */}
        <div className="bg-[#16213E] rounded-xl border border-[#2E3C5A]">
          <div className="p-6 border-b border-[#2E3C5A]">
            <h3 className="text-[#E6EDF7] text-lg font-semibold">Additional Feedback</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide additional feedback to help improve the AI model..."
                className="w-full h-32 bg-[#0B0F1A] text-[#E6EDF7] border border-[#2E3C5A] rounded-lg p-4 focus:border-[#1FE0BE] focus:outline-none resize-none"
              />
              <button className="flex items-center space-x-2 px-6 py-3 bg-[#1FE0BE] text-[#101C3B] rounded-lg hover:bg-[#1FE0BE]/90 transition-colors font-medium">
                <Send size={16} />
                <span>Submit Feedback</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;