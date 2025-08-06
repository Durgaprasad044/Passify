import React from 'react';
import { Home, User, BarChart3, LogOut, Shield, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentView: string;
  setCurrentView: (view: 'student' | 'admin' | 'analytics') => void;
  userRole: 'student' | 'admin' | null;
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  setCurrentView, 
  userRole, 
  onLogout,
  darkMode,
  toggleDarkMode
}) => {
  const { user } = useAuth();
  
  const navItems = [
    ...(userRole === 'student' ? [
      { id: 'student', label: 'Dashboard', icon: Home }
    ] : []),
    ...(userRole === 'admin' ? [
      { id: 'admin', label: 'Admin Panel', icon: Shield },
    ] : []),
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className={`${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-50 shadow-sm transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Passify</span>
            </div>
            
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id as 'student' | 'admin' | 'analytics')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? `${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} shadow-sm border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`
                        : `${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <User className="w-4 h-4" />
              <span className="text-sm capitalize">{userRole} Portal</span>
              {user && (
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>• {user.displayName || user.email}</span>
              )}
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button
              onClick={onLogout}
              className={`flex items-center space-x-2 px-3 py-1.5 ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'} rounded-lg transition-all duration-200 border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};