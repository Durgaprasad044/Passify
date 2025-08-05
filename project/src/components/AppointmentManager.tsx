import React from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

const AppointmentManager: React.FC = () => {
  const appointments = [
    {
      id: 1,
      student: 'John Doe',
      time: '10:00 AM',
      date: '2024-01-15',
      location: 'Room 101',
      type: 'Academic Counseling',
      prediction: 'High Priority'
    },
    {
      id: 2,
      student: 'Jane Smith',
      time: '2:00 PM',
      date: '2024-01-15',
      location: 'Room 205',
      type: 'Career Guidance',
      prediction: 'Medium Priority'
    },
    {
      id: 3,
      student: 'Mike Johnson',
      time: '4:00 PM',
      date: '2024-01-16',
      location: 'Room 103',
      type: 'Medical Consultation',
      prediction: 'High Priority'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#16213E] border-b border-[#2E3C5A] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-[#E6EDF7] text-xl font-semibold">📅 Appointment Manager</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Today's Appointments</h3>
              <Calendar className="text-[#1FE0BE]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#1FE0BE]">8</p>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">Pending Requests</h3>
              <Clock className="text-[#FF9500]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#FF9500]">12</p>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF7] font-semibold">High Priority</h3>
              <User className="text-[#FF4C4C]" size={24} />
            </div>
            <p className="text-2xl font-bold text-[#FF4C4C]">3</p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-[#16213E] rounded-xl border border-[#2E3C5A]">
          <div className="p-6 border-b border-[#2E3C5A]">
            <h3 className="text-[#E6EDF7] text-lg font-semibold">Upcoming Appointments</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-[#0B0F1A] rounded-lg p-4 border border-[#2E3C5A]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#1FE0BE] rounded-full flex items-center justify-center">
                        <User size={20} className="text-[#101C3B]" />
                      </div>
                      <div>
                        <h4 className="text-[#E6EDF7] font-semibold">{appointment.student}</h4>
                        <p className="text-[#E6EDF7]/60 text-sm">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4 text-sm text-[#E6EDF7]/60">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={16} />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                      <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.prediction === 'High Priority' 
                          ? 'bg-[#FF4C4C]/20 text-[#FF4C4C]'
                          : 'bg-[#FF9500]/20 text-[#FF9500]'
                      }`}>
                        {appointment.prediction}
                      </div>
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

export default AppointmentManager;