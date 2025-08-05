import React, { useState } from 'react';
import { Send, Sparkles, AlertCircle } from 'lucide-react';

const RequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    requestType: '',
    reason: '',
    urgency: 'medium',
  });

  const [prediction, setPrediction] = useState({ likelihood: 85, confidence: 'high' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#16213E] rounded-2xl p-6 border border-[#2E3C5A]">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="text-[#1FE0BE]" size={20} />
        <h3 className="text-[#E6EDF7] text-lg font-semibold">Smart Request Form</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            className="w-full bg-[#2E3C5A] text-[#E6EDF7] px-4 py-3 rounded-xl border border-[#2E3C5A] focus:border-[#1FE0BE] focus:outline-none transition-all duration-200 peer placeholder-transparent"
            placeholder="Student ID"
            id="studentId"
          />
          <label
            htmlFor="studentId"
            className="absolute left-4 -top-2.5 text-[#E6EDF7]/70 text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#E6EDF7]/50 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1FE0BE] bg-[#16213E] px-1"
          >
            Student ID
          </label>
        </div>

        <div className="relative">
          <select
            name="requestType"
            value={formData.requestType}
            onChange={handleInputChange}
            className="w-full bg-[#2E3C5A] text-[#E6EDF7] px-4 py-3 rounded-xl border border-[#2E3C5A] focus:border-[#1FE0BE] focus:outline-none transition-all duration-200"
          >
            <option value="">Select Request Type</option>
            <option value="grade-change">Grade Change</option>
            <option value="course-withdrawal">Course Withdrawal</option>
            <option value="transcript">Transcript Request</option>
            <option value="financial-aid">Financial Aid</option>
          </select>
        </div>

        <div className="relative">
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            rows={4}
            className="w-full bg-[#2E3C5A] text-[#E6EDF7] px-4 py-3 rounded-xl border border-[#2E3C5A] focus:border-[#1FE0BE] focus:outline-none transition-all duration-200 peer placeholder-transparent resize-none"
            placeholder="Detailed reason"
            id="reason"
          />
          <label
            htmlFor="reason"
            className="absolute left-4 -top-2.5 text-[#E6EDF7]/70 text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#E6EDF7]/50 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1FE0BE] bg-[#16213E] px-1"
          >
            Detailed Reason
          </label>
        </div>

        <div className="relative">
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleInputChange}
            className="w-full bg-[#2E3C5A] text-[#E6EDF7] px-4 py-3 rounded-xl border border-[#2E3C5A] focus:border-[#1FE0BE] focus:outline-none transition-all duration-200"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        {/* Prediction Badge */}
        <div className="bg-[#29F37C]/10 border border-[#29F37C]/30 rounded-xl p-4 mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="text-[#29F37C]" size={16} />
            <span className="text-[#29F37C] font-medium text-sm">AI Prediction</span>
          </div>
          <p className="text-[#E6EDF7] text-sm">
            <span className="font-bold text-[#29F37C]">{prediction.likelihood}% Likely</span> to be approved
          </p>
          <p className="text-[#E6EDF7]/70 text-xs mt-1">Confidence: {prediction.confidence}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1FE0BE] text-[#101C3B] py-3 rounded-xl font-semibold hover:bg-[#1FE0BE]/90 transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg"
        >
          <Send size={18} />
          <span>Submit Request</span>
        </button>
      </form>
    </div>
  );
};

export default RequestForm;