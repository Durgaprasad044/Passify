import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  TrendingUp, 
  Calendar,
  Shield,
  Activity,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

interface HomePageProps {
  user: any;
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onLogout, onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    totalVisitors: 1247,
    activeVisitors: 23,
    checkedOutToday: 156,
    pendingRequests: 8,
    totalHosts: 45,
    systemUptime: '99.9%',
    todayEntries: 89,
    weeklyGrowth: 12.5
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const quickActions = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, color: 'from-blue-500 to-blue-600' },
    { id: 'history', label: 'Entry History', icon: Clock, color: 'from-purple-500 to-purple-600' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, color: 'from-orange-500 to-orange-600' },
    { id: 'alerts', label: 'Security Alerts', icon: Shield, color: 'from-red-500 to-red-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-gray-500 to-gray-600' }
  ];

  const recentActivities = [
    { id: 1, type: 'check-in', user: 'John Doe', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'check-out', user: 'Jane Smith', time: '5 minutes ago', status: 'success' },
    { id: 3, type: 'alert', user: 'Security System', time: '10 minutes ago', status: 'warning' },
    { id: 4, type: 'check-in', user: 'Mike Johnson', time: '15 minutes ago', status: 'success' },
    { id: 5, type: 'appointment', user: 'Sarah Wilson', time: '20 minutes ago', status: 'info' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      {/* Header */}
      <header className="bg-[#16213E] border-b border-[#2E3C5A] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#E6EDF7]">Welcome back, {user.name}!</h1>
            <p className="text-[#E6EDF7]/60 mt-1">{formatDate(currentTime)}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-[#1FE0BE] font-mono text-lg font-semibold">
                {formatTime(currentTime)}
              </div>
              <div className="text-[#E6EDF7]/60 text-sm">Live Time</div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-[#E6EDF7]/60 hover:text-[#E6EDF7] hover:bg-[#2E3C5A] rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 px-3 py-2 text-[#E6EDF7]/60 hover:text-[#E6EDF7] hover:bg-[#2E3C5A] rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#E6EDF7]/60 text-sm">Total Visitors</p>
                <p className="text-2xl font-bold text-[#E6EDF7] mt-1">{stats.totalVisitors.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400">+{stats.weeklyGrowth}%</span>
              <span className="text-[#E6EDF7]/60 ml-1">this week</span>
            </div>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#E6EDF7]/60 text-sm">Active Visitors</p>
                <p className="text-2xl font-bold text-[#E6EDF7] mt-1">{stats.activeVisitors}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-[#E6EDF7]/60">Currently in building</span>
            </div>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#E6EDF7]/60 text-sm">Today's Entries</p>
                <p className="text-2xl font-bold text-[#E6EDF7] mt-1">{stats.todayEntries}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <Clock className="w-4 h-4 text-[#E6EDF7]/60 mr-1" />
              <span className="text-[#E6EDF7]/60">{stats.checkedOutToday} checked out</span>
            </div>
          </div>

          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#E6EDF7]/60 text-sm">System Status</p>
                <p className="text-2xl font-bold text-[#1FE0BE] mt-1">{stats.systemUptime}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#1FE0BE] to-[#00B4D8] rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <div className="w-2 h-2 bg-[#1FE0BE] rounded-full mr-2"></div>
              <span className="text-[#E6EDF7]/60">All systems operational</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
              <h3 className="text-[#E6EDF7] text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => onNavigate(action.id)}
                    className="group p-4 bg-[#0B0F1A] hover:bg-[#2E3C5A] rounded-lg border border-[#2E3C5A] hover:border-[#1FE0BE]/30 transition-all duration-200"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-[#E6EDF7] text-sm font-medium">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
            <h3 className="text-[#E6EDF7] text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-400' :
                    activity.status === 'warning' ? 'bg-yellow-400' :
                    activity.status === 'info' ? 'bg-blue-400' : 'bg-gray-400'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#E6EDF7] text-sm font-medium truncate">
                      {activity.user}
                    </p>
                    <p className="text-[#E6EDF7]/60 text-xs">
                      {activity.type.replace('-', ' ')} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onNavigate('history')}
              className="w-full mt-4 text-[#1FE0BE] hover:text-[#1FE0BE]/80 text-sm font-medium transition-colors"
            >
              View All Activity →
            </button>
          </div>
        </div>

        {/* System Overview */}
        <div className="mt-6 bg-[#16213E] rounded-xl p-6 border border-[#2E3C5A]">
          <h3 className="text-[#E6EDF7] text-lg font-semibold mb-4">System Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1FE0BE] mb-1">{stats.totalHosts}</div>
              <div className="text-[#E6EDF7]/60 text-sm">Registered Hosts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1FE0BE] mb-1">{stats.pendingRequests}</div>
              <div className="text-[#E6EDF7]/60 text-sm">Pending Requests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1FE0BE] mb-1">24/7</div>
              <div className="text-[#E6EDF7]/60 text-sm">System Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;