import React from 'react';
import { QrCode, LogIn, UserCheck, Play, ArrowRight } from 'lucide-react';
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

  const handleGetStarted = async () => {
    await withLoading('get-started', async () => {
      showNotification('Initializing Passify Setup...', 'info');
      await new Promise(resolve => setTimeout(resolve, 1500));
      showNotification('✓ Setup wizard ready. You would begin the Passify configuration process.', 'success');
    });
  };

  const handleWatchDemo = async () => {
    await withLoading('watch-demo', async () => {
      showNotification('Loading Demo Video...', 'info');
      await new Promise(resolve => setTimeout(resolve, 1500));
      showNotification('✓ Demo video ready. You would see a full product demonstration.', 'success');
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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                Passify
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="hover:opacity-70 transition-opacity">Features</a>
              <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
              <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <select className="bg-transparent border rounded px-3 py-1 text-sm" style={{ borderColor: 'var(--color-border)' }}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Smart Visitor Management
            <br />
            <span style={{ color: 'var(--color-primary)' }}>Made Simple</span>
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Streamline your visitor check-in process with AI-powered automation, 
            real-time notifications, and seamless integration.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={handleGetStarted}
              disabled={isLoading('get-started')}
              className="btn btn-primary flex items-center space-x-2 px-8 py-4 text-lg"
            >
              {isLoading('get-started') ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <ArrowRight size={20} />
                  <span>Get Started</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleWatchDemo}
              disabled={isLoading('watch-demo')}
              className="btn btn-secondary flex items-center space-x-2 px-8 py-4 text-lg"
            >
              {isLoading('watch-demo') ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Play size={20} />
                  <span>Watch Demo</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="feature-card text-center">
              <QrCode size={48} className="mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-xl font-semibold mb-2">Quick Check-In</h3>
              <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                Scan QR code for instant visitor registration
              </p>
              <button
                onClick={handleQRScan}
                className="btn btn-primary w-full"
              >
                <QrCode size={16} className="mr-2" />
                Scan QR Code
              </button>
            </div>

            <div className="feature-card text-center">
              <UserCheck size={48} className="mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-xl font-semibold mb-2">Visitor Check-In</h3>
              <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                Complete visitor registration form
              </p>
              <button
                onClick={handleCheckIn}
                disabled={isLoading('check-in')}
                className="btn btn-primary w-full"
              >
                {isLoading('check-in') ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <UserCheck size={16} className="mr-2" />
                    Check In
                  </>
                )}
              </button>
            </div>

            <div className="feature-card text-center">
              <LogIn size={48} className="mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-xl font-semibold mb-2">Staff Login</h3>
              <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                Access admin dashboard and controls
              </p>
              <button
                onClick={handleLogin}
                disabled={isLoading('login')}
                className="btn btn-secondary w-full"
              >
                {isLoading('login') ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <LogIn size={16} className="mr-2" />
                    Login
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Passify?
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Experience the future of visitor management with our comprehensive solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Automation',
                description: 'Smart decision making for visitor approvals and routing',
                color: 'var(--color-bg-1)'
              },
              {
                title: 'Real-time Notifications',
                description: 'Instant alerts for hosts and security personnel',
                color: 'var(--color-bg-2)'
              },
              {
                title: 'Seamless Integration',
                description: 'Works with your existing security and communication systems',
                color: 'var(--color-bg-3)'
              },
              {
                title: 'Mobile Friendly',
                description: 'Optimized experience across all devices',
                color: 'var(--color-bg-4)'
              },
              {
                title: 'Advanced Analytics',
                description: 'Comprehensive insights into visitor patterns and trends',
                color: 'var(--color-bg-5)'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock assistance for uninterrupted service',
                color: 'var(--color-bg-6)'
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div 
                  className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                  style={{ backgroundColor: feature.color }}
                >
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10,000+', label: 'Visitors Processed' },
              { number: '99.9%', label: 'Uptime Guarantee' },
              { number: '500+', label: 'Organizations Trust Us' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                  {stat.number}
                </div>
                <div style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
              Passify
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Smart Visitor Management Made Simple
            </p>
            <div className="mt-8 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              © 2024 Passify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

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