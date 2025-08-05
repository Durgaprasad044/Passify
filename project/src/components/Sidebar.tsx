import React, { useState } from 'react';
import { BarChart3, FileText, AlertTriangle, Settings, ChevronRight } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'history', icon: FileText, label: 'Request History' },
    { id: 'alerts', icon: AlertTriangle, label: 'Anomaly Alerts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-[#101C3B] transition-all duration-300 z-20 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <h1 className="text-[#E6EDF7] text-xl font-bold">AdminPanel</h1>
          )}
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-[#1FE0BE] text-[#101C3B]' 
                    : 'text-[#E6EDF7] hover:bg-[#2E3C5A] hover:text-[#1FE0BE]'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="ml-3 font-medium">{item.label}</span>
                    <ChevronRight 
                      size={16} 
                      className={`ml-auto transition-transform duration-200 ${
                        isActive ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`}
                    />
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </div>
      
      {!collapsed && (
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-[#16213E] rounded-xl p-4 border border-[#2E3C5A]">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-[#1FE0BE] rounded-full flex items-center justify-center">
                <span className="text-[#101C3B] font-bold text-sm">A</span>
              </div>
              <div>
                <p className="text-[#E6EDF7] font-medium text-sm">Admin User</p>
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