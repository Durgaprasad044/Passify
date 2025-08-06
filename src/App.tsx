import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AnalyticsPage } from './components/AnalyticsPage';
import { Navigation } from './components/Navigation';
import { signOutUser } from './firebase';
import { useAuth } from './contexts/AuthContext';

type ViewType = 'landing' | 'student' | 'admin' | 'analytics';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useAuth();

  const handleRoleSelect = (role: 'student' | 'admin') => {
    setUserRole(role);
    setCurrentView(role);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setCurrentView('landing');
      setUserRole(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onRoleSelect={handleRoleSelect} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      case 'student':
        return <StudentDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <LandingPage onRoleSelect={handleRoleSelect} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200'}`}>
      {currentView !== 'landing' && user && (
        <Navigation 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          userRole={userRole}
          onLogout={handleLogout}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      {renderCurrentView()}
    </div>
  );
}

export default App;