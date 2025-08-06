import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, Brain, Sparkles } from 'lucide-react';

interface RequestFormProps {
  onClose: () => void;
  onSubmit: (request: any) => void;
}

export const RequestForm: React.FC<RequestFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'Gate Pass',
    reason: '',
    date: '',
    time: '',
    destination: '',
    duration: '',
    additionalInfo: ''
  });

  const [prediction, setPrediction] = useState<{
    likelihood: number;
    responseTime: string;
    suggestions: string[];
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Simulate AI prediction when key fields are filled
    if (formData.reason && formData.date && formData.time) {
      setTimeout(() => {
        const likelihood = Math.floor(Math.random() * 40) + 60; // 60-100%
        const responseTime = Math.floor(Math.random() * 4) + 1; // 1-5 hours
        
        setPrediction({
          likelihood,
          responseTime: `${responseTime} hours`,
          suggestions: [
            likelihood < 70 ? 'Consider choosing a different time slot' : 'Good timing choice',
            'Medical appointments have 95% approval rate',
            'Morning slots have higher approval chances'
          ]
        });
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: 'pending',
      prediction: prediction || { likelihood: 0, responseTime: 'Unknown' }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">New Request</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full bg-white/80 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="Gate Pass">Gate Pass</option>
              <option value="Appointment">Appointment</option>
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
            <select
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              className="w-full bg-white/80 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select a reason</option>
              <option value="Medical Appointment">Medical Appointment</option>
              <option value="Family Emergency">Family Emergency</option>
              <option value="Personal Work">Personal Work</option>
              <option value="Interview">Interview</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full bg-white/80 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full bg-white/80 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              placeholder="Where are you going?"
              className="w-full bg-white/80 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expected Duration</label>
            <select
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              className="w-full bg-white/80 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select duration</option>
              <option value="1-2 hours">1-2 hours</option>
              <option value="2-4 hours">2-4 hours</option>
              <option value="4-6 hours">4-6 hours</option>
              <option value="Full day">Full day</option>
            </select>
          </div>

          {/* Additional Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              placeholder="Any additional details..."
              rows={3}
              className="w-full bg-white/80 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
            />
          </div>

          {/* AI Prediction */}
          {prediction && (
            <div className="bg-gradient-to-r from-gray-100/80 to-gray-200/80 backdrop-blur-xl border border-gray-300 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-5 h-5 text-blue-600" />
                <span className="text-gray-800 font-semibold">AI Prediction</span>
                <Sparkles className="w-4 h-4 text-green-600" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{prediction.likelihood}%</div>
                  <div className="text-sm text-gray-600">Approval Chance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{prediction.responseTime}</div>
                  <div className="text-sm text-gray-600">Expected Response</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">AI Suggestions:</div>
                {prediction.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-gray-500/25"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};