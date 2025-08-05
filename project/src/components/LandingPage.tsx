import React, { useState } from 'react';
import { QrCode, LogIn, UserCheck, ChevronDown, Clock, Shield } from 'lucide-react';
import { useModal } from '../hooks/useModal';
import { useLoadingButton } from '../hooks/useLoadingButton';
import { useNotificationContext } from '../contexts/NotificationContext';
import QRScannerModal from './QRScannerModal';

interface LandingPageProps {
  onLogin: () => void;
  onCheckIn: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onCheckIn }) => {
  const { isOpen: isQRModalOpen, openModal: openQRModal, closeModal: closeQRModal } = useModal();
  const { isLoading, withLoading } = useLoadingButton();
  const { showNotification } = useNotificationContext();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  }));

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = async () => {
    await withLoading('check-in', async () => {
      showNotification('Opening Check-In Portal...', 'info');
      await new Promise(resolve => setTimeout(resolve, 1500));
      showNotification('✓ Check-In portal ready. You would be redirected to the visitor check-in form.', 'success');
      onCheckIn();
    });
  };

  const handleLogin = async () => {
    await withLoading('login', async () => {
      showNotification('Redirecting to Login Portal...', 'info');
      await new Promise(resolve => setTimeout(resolve, 1500));
      showNotification('✓ Login portal ready. You would be redirected to the admin/staff login page.', 'success');
      onLogin();
    });
  };

  const handleQRScan = () => {
    showNotification('QR Scanner opened successfully', 'success');
    openQRModal();
  };

  const handleQRScanSuccess = (data: string) => {
    showNotification(`QR Code scanned successfully: ${data}`, 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-slate-900" />
              </div>
              <h1 className="text-xl font-bold text-teal-400">
                Passify
              </h1>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#appointment" className="text-slate-300 hover:text-teal-400 transition-colors">
                Have Appointment
              </a>
              <a href="#been-here" className="text-slate-300 hover:text-teal-400 transition-colors">
                Been Here Before
              </a>
            </nav>
            
            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm text-slate-300 appearance-none pr-8">
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                  <option value="fr">FR</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <button
                onClick={handleLogin}
                disabled={isLoading('login')}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 hover:text-white transition-all duration-200"
              >
                {isLoading('login') ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-transparent"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    <span>Login</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Hero Title */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  AI-Powered Gate Pass &{' '}
                  <span className="text-teal-400">Appointment</span>
                  <br />
                  Manager
                </h1>
                <p className="text-lg text-slate-300 max-w-2xl">
                  Smart predictive system that analyzes patterns to reduce delays and 
                  improve admin efficiency. Get real-time approval predictions and optimal 
                  scheduling recommendations.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCheckIn}
                  disabled={isLoading('check-in')}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading('check-in') ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck size={20} />
                      <span>Check-In</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleQRScan}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white rounded-lg font-medium transition-all duration-200"
                >
                  <QrCode size={20} />
                  <span>Scan QR Code</span>
                </button>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">95%</div>
                  <div className="text-sm text-slate-400">Prediction Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">60%</div>
                  <div className="text-sm text-slate-400">Faster Approvals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">24/7</div>
                  <div className="text-sm text-slate-400">Smart Monitoring</div>
                </div>
              </div>
            </div>

            {/* Right Content - Smart Check-In Panel */}
            <div className="lg:justify-self-end">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 max-w-md">
                {/* Panel Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-teal-400 rounded flex items-center justify-center">
                      <Shield className="w-4 h-4 text-slate-900" />
                    </div>
                    <span className="text-teal-400 font-medium">Passify</span>
                  </div>
                  <div className="text-slate-400 text-sm">{currentTime}</div>
                </div>

                {/* Welcome Message */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Welcome to Smart Check-In
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Approval Chance:</span>
                      <span className="text-teal-400 font-semibold">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Est. Response:</span>
                      <span className="text-teal-400 font-semibold">2-3 mins</span>
                    </div>
                  </div>
                </div>

                {/* QR Scanner Area */}
                <div className="bg-slate-900/50 border-2 border-dashed border-slate-600 rounded-xl p-8 text-center">
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-1 w-12 h-12 mx-auto">
                      <div className="bg-teal-400 rounded-sm"></div>
                      <div className="bg-teal-400 rounded-sm"></div>
                      <div className="bg-teal-400 rounded-sm"></div>
                      <div className="bg-teal-400 rounded-sm"></div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Scan QR Code or Tap to Continue
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={isQRModalOpen}
        onClose={closeQRModal}
        onScanSuccess={handleQRScanSuccess}
      />
    </div>
  );
};

export default LandingPage;