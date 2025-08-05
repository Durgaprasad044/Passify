import React, { useState } from 'react';
import { Wrench, ThumbsUp, ThumbsDown, MessageSquare, Send, TrendingUp, AlertTriangle, CheckCircle, Clock, Filter } from 'lucide-react';

const AdminFeedback: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const pendingFeedback = [
    {
      id: 'REQ-001',
      student: 'John Doe',
      type: 'Medical Leave',
      aiDecision: 'Approve',
      aiConfidence: 92,
      actualDecision: null,
      timestamp: '2024-01-15 10:30 AM',
      priority: 'high'
    },
    {
      id: 'REQ-002',
      student: 'Jane Smith',
      type: 'Academic Extension',
      aiDecision: 'Review',
      aiConfidence: 67,
      actualDecision: null,
      timestamp: '2024-01-15 11:15 AM',
      priority: 'medium'
    },
    {
      id: 'REQ-003',
      student: 'Mike Johnson',
      type: 'Fee Waiver',
      aiDecision: 'Reject',
      aiConfidence: 34,
      actualDecision: 'Approve',
      timestamp: '2024-01-15 12:00 PM',
      priority: 'low'
    }
  ];

  const handleFeedback = (requestId: string, decision: 'correct' | 'incorrect') => {
    console.log(`Feedback for ${requestId}: ${decision}`);
    // Here you would typically send the feedback to your backend
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400 bg-green-400/10';
    if (confidence >= 60) return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'Approve': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Reject': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Review': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="text-red-400" size={16} />;
      case 'medium': return <Clock className="text-yellow-400" size={16} />;
      case 'low': return <CheckCircle className="text-green-400" size={16} />;
      default: return null;
    }
  };

  const filteredFeedback = pendingFeedback.filter(item => {
    if (filter === 'pending') return !item.actualDecision;
    if (filter === 'completed') return item.actualDecision;
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-card-border)] px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Wrench className="text-orange-500" size={24} />
              </div>
              <div>
                <h2 className="text-[var(--color-text)] text-xl font-semibold">Admin Feedback</h2>
                <p className="text-[var(--color-text-secondary)] text-sm">Help improve AI model accuracy</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-[var(--color-background)] rounded-lg p-1 border border-[var(--color-card-border)]">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  filter === 'all' 
                    ? 'bg-[var(--color-primary)] text-[var(--color-btn-primary-text)] shadow-sm' 
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-secondary)]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  filter === 'pending' 
                    ? 'bg-[var(--color-primary)] text-[var(--color-btn-primary-text)] shadow-sm' 
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-secondary)]'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  filter === 'completed' 
                    ? 'bg-[var(--color-primary)] text-[var(--color-btn-primary-text)] shadow-sm' 
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-secondary)]'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Feedback Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="feature-card group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[var(--color-text)] font-semibold text-sm uppercase tracking-wide">Pending Feedback</h3>
                <p className="text-3xl font-bold text-orange-500 mt-2">12</p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors duration-300">
                <Wrench className="text-orange-500" size={28} />
              </div>
            </div>
            <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
              <TrendingUp size={16} className="mr-1" />
              <span>+2 from yesterday</span>
            </div>
          </div>

          <div className="feature-card group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[var(--color-text)] font-semibold text-sm uppercase tracking-wide">Correct Predictions</h3>
                <p className="text-3xl font-bold text-green-500 mt-2">89%</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors duration-300">
                <ThumbsUp className="text-green-500" size={28} />
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '89%' }}></div>
            </div>
          </div>

          <div className="feature-card group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[var(--color-text)] font-semibold text-sm uppercase tracking-wide">Model Improvements</h3>
                <p className="text-3xl font-bold text-red-500 mt-2">23</p>
              </div>
              <div className="p-3 bg-red-500/10 rounded-xl group-hover:bg-red-500/20 transition-colors duration-300">
                <ThumbsDown className="text-red-500" size={28} />
              </div>
            </div>
            <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
              <AlertTriangle size={16} className="mr-1" />
              <span>Needs attention</span>
            </div>
          </div>

          <div className="feature-card group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[var(--color-text)] font-semibold text-sm uppercase tracking-wide">Feedback Given</h3>
                <p className="text-3xl font-bold text-blue-500 mt-2">156</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors duration-300">
                <MessageSquare className="text-blue-500" size={28} />
              </div>
            </div>
            <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
              <CheckCircle size={16} className="mr-1" />
              <span>This month</span>
            </div>
          </div>
        </div>

        {/* Feedback Panel */}
        <div className="feature-card">
          <div className="p-6 border-b border-[var(--color-card-border)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[var(--color-text)] text-lg font-semibold">Model Training Feedback</h3>
                <p className="text-[var(--color-text-secondary)] text-sm mt-1">Help improve AI predictions by providing feedback on model decisions</p>
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                Showing {filteredFeedback.length} of {pendingFeedback.length} items
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {filteredFeedback.map((item, index) => (
                <div key={item.id} className="bg-[var(--color-background)] rounded-xl p-6 border border-[var(--color-card-border)] hover:border-[var(--color-primary)]/30 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center space-x-2">
                        {getPriorityIcon(item.priority)}
                        <div>
                          <h4 className="text-[var(--color-text)] font-semibold text-lg">{item.id}</h4>
                          <p className="text-[var(--color-text-secondary)] font-medium">{item.student} • {item.type}</p>
                          <p className="text-[var(--color-text-secondary)] text-sm mt-1">{item.timestamp}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getConfidenceColor(item.aiConfidence)}`}>
                        {item.aiConfidence}% Confidence
                      </div>
                      {!item.actualDecision && (
                        <div className="px-3 py-1.5 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-semibold border border-yellow-500/20">
                          Awaiting Review
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <h5 className="text-[var(--color-text)] font-semibold text-sm uppercase tracking-wide">AI Recommendation</h5>
                      <div className={`px-4 py-3 rounded-lg border font-medium ${getDecisionColor(item.aiDecision)}`}>
                        <div className="flex items-center justify-between">
                          <span>{item.aiDecision}</span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div 
                              className="bg-current h-1.5 rounded-full transition-all duration-500" 
                              style={{ width: `${item.aiConfidence}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-[var(--color-text)] font-semibold text-sm uppercase tracking-wide">Actual Decision</h5>
                      <div className={`px-4 py-3 rounded-lg border font-medium ${
                        item.actualDecision 
                          ? getDecisionColor(item.actualDecision)
                          : 'text-[var(--color-text-secondary)] bg-[var(--color-secondary)] border-[var(--color-card-border)]'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span>{item.actualDecision || 'Pending Review'}</span>
                          {!item.actualDecision && <Clock size={16} />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {item.actualDecision && (
                    <div className="bg-[var(--color-surface)] rounded-lg p-4 border border-[var(--color-card-border)]">
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--color-text)] font-medium">Was the AI prediction correct?</span>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleFeedback(item.id, 'correct')}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-all duration-200 border border-green-500/20 hover:border-green-500/40 font-medium"
                          >
                            <ThumbsUp size={16} />
                            <span>Correct</span>
                          </button>
                          <button
                            onClick={() => handleFeedback(item.id, 'incorrect')}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 hover:border-red-500/40 font-medium"
                          >
                            <ThumbsDown size={16} />
                            <span>Incorrect</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredFeedback.length === 0 && (
                <div className="text-center py-12">
                  <div className="p-4 bg-[var(--color-secondary)] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <MessageSquare className="text-[var(--color-text-secondary)]" size={24} />
                  </div>
                  <h3 className="text-[var(--color-text)] font-semibold mb-2">No feedback items found</h3>
                  <p className="text-[var(--color-text-secondary)]">
                    {filter === 'pending' ? 'No pending feedback items at the moment.' : 
                     filter === 'completed' ? 'No completed feedback items found.' : 
                     'No feedback items available.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Feedback Section */}
        <div className="feature-card">
          <div className="p-6 border-b border-[var(--color-card-border)]">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <MessageSquare className="text-blue-500" size={20} />
              </div>
              <div>
                <h3 className="text-[var(--color-text)] text-lg font-semibold">Additional Feedback</h3>
                <p className="text-[var(--color-text-secondary)] text-sm">Share insights to help improve our AI model</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[var(--color-text)] font-medium text-sm">
                  Your feedback and suggestions
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts on model performance, suggest improvements, or report any issues you've noticed..."
                  className="w-full h-32 bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-card-border)] rounded-lg p-4 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 resize-none transition-all duration-200 placeholder:text-[var(--color-text-secondary)]"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">
                    {feedback.length}/500 characters
                  </span>
                  <span className="text-[var(--color-text-secondary)]">
                    Your feedback helps improve AI accuracy
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-card-border)]">
                <div className="flex items-center space-x-2 text-sm text-[var(--color-text-secondary)]">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Feedback is anonymous and secure</span>
                </div>
                <button 
                  className="btn btn-primary flex items-center space-x-2 px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!feedback.trim()}
                >
                  <Send size={16} />
                  <span>Submit Feedback</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;