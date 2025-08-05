import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import HistoryTable from './components/HistoryTable';
import Analytics from './components/Analytics';
import AppointmentManager from './components/AppointmentManager';
import AIPredictions from './components/AIPredictions';
import AdminFeedback from './components/AdminFeedback';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard sidebarCollapsed={sidebarCollapsed} />;
      case 'history':
        return (
          <div className="min-h-screen">
            <header className="bg-[#16213E] border-b border-[#2E3C5A] px-6 py-4">
              <h2 className="text-[#E6EDF7] text-xl font-semibold">📝 Request History</h2>
            </header>
            <div className="p-6">
              <HistoryTable />
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className="min-h-screen">
            <header className="bg-[#16213E] border-b border-[#2E3C5A] px-6 py-4">
              <h2 className="text-[#E6EDF7] text-xl font-semibold">⚠️ Anomaly Alerts</h2>
            </header>
            <div className="p-6">
              <div className="bg-[#16213E] rounded-xl p-8 border border-[#2E3C5A] text-center">
                <h3 className="text-[#E6EDF7] text-lg font-semibold mb-4">Anomaly Detection System</h3>
                <p className="text-[#E6EDF7]/60">Shows requests flagged by the ML model as suspicious or anomalous</p>
                <div className="mt-6 text-[#1FE0BE] text-2xl font-bold">No anomalies detected</div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return <Analytics />;
      case 'appointments':
        return <AppointmentManager />;
      case 'predictions':
        return <AIPredictions />;
      case 'feedback':
        return <AdminFeedback />;
      case 'settings':
        return (
          <div className="min-h-screen">
            <header className="bg-[#16213E] border-b border-[#2E3C5A] px-6 py-4">
              <h2 className="text-[#E6EDF7] text-xl font-semibold">⚙️ Settings</h2>
            </header>
            <div className="p-6">
              <div className="bg-[#16213E] rounded-xl p-8 border border-[#2E3C5A] text-center">
                <h3 className="text-[#E6EDF7] text-lg font-semibold mb-4">System Settings</h3>
                <p className="text-[#E6EDF7]/60">Theme toggle, user settings, preferences, notifications</p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard sidebarCollapsed={sidebarCollapsed} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
        activeView={activeView}
        onViewChange={handleViewChange}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;