import React, { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  AlertTriangle, 
  Settings, 
  ChevronRight, 
  TrendingUp,
  Calendar,
  Brain,
  Wrench,
  User
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, activeView, onViewChange }) => {

  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', emoji: '📊' },
    { id: 'history', icon: FileText, label: 'Request History', emoji: '📝' },
    { id: 'alerts', icon: AlertTriangle, label: 'Anomaly Alerts', emoji: '⚠️' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics', emoji: '📈' },
    { id: 'appointments', icon: Calendar, label: 'Appointment Manager', emoji: '📅' },
    { id: 'predictions', icon: Brain, label: 'AI Predictions', emoji: '🔮' },
    { id: 'feedback', icon: Wrench, label: 'Admin Feedback', emoji: '🛠️' },
    { id: 'settings', icon: Settings, label: 'Settings', emoji: '⚙️' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-[#101C3B] transition-all duration-300 z-20 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggle}
              className="p-2 hover:bg-[#2E3C5A] rounded-lg transition-colors duration-200 text-[#E6EDF7]"
            >
              <span className="text-lg">☰</span>
            </button>
            {!collapsed && (
              <h1 className="text-[#E6EDF7] text-xl font-bold">AdminPanel</h1>
            )}
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-[#1FE0BE] text-[#101C3B]' 
                    : 'text-[#E6EDF7] hover:bg-[#2E3C5A] hover:text-[#1FE0BE]'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <span className="text-lg flex-shrink-0">{item.emoji}</span>
                  {!collapsed && (
                    <span className="font-medium text-left">{item.label}</span>
                  )}
                </div>
                {!collapsed && (
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform duration-200 ${
                      isActive ? 'rotate-90' : 'group-hover:translate-x-1'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
      
      {!collapsed && (
        <div className="absolute bottom-6 left-6 right-6">
          {/* Separator */}
          <div className="border-t border-[#2E3C5A] mb-4"></div>
          <div className="text-center text-[#E6EDF7]/40 text-xs mb-4">
            ───────────────────────
          </div>
          
          {/* Admin User Info */}
          <div className="bg-[#16213E] rounded-xl p-4 border border-[#2E3C5A]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#1FE0BE] rounded-full flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
              <div className="flex-1">
                <p className="text-[#E6EDF7] font-medium text-sm">Admin User Info</p>
                <p className="text-[#E6EDF7]/60 text-xs">admin@school.edu</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;