import React, { useState } from 'react';
import { Shield, LogIn, User, Menu, X, Sun, Moon } from 'lucide-react';
import { signInWithGoogle } from '../firebase';

interface LandingNavbarProps {
  onRoleSelect: (role: 'student' | 'admin') => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onRoleSelect, darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log('Signed in user:', user);
      setShowLoginModal(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRoleSelect = (role: 'student' | 'admin') => {
    if (role === 'admin') {
      setShowAdminPasswordModal(true);
    } else {
      onRoleSelect(role);
      setShowLoginModal(false);
    }
  };

  const handleAdminAccess = () => {
    // In a real app, you'd verify this against your backend
    if (adminPassword === 'admin123') {
      onRoleSelect('admin');
      setShowAdminPasswordModal(false);
      setShowLoginModal(false);
      setAdminPassword('');
    } else {
      alert('Invalid admin password');
    }
  };

  return (
    <>
      <nav className={`${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-50 shadow-sm transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>Passify</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Login Button */}
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-gray-800 transition-colors duration-200`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className={`md:hidden py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full justify-center"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Role Selection Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} backdrop-blur-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-2xl p-8 max-w-md w-full shadow-xl`}>
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Welcome to Passify</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Select your role to continue</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect('student')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-3"
              >
                <User className="w-5 h-5" />
                <span>Student Portal</span>
              </button>
              
              <button
                onClick={() => handleRoleSelect('admin')}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center space-x-3"
              >
                <Shield className="w-5 h-5" />
                <span>Admin Portal</span>
              </button>
            </div>

            <button
              onClick={() => setShowLoginModal(false)}
              className={`w-full mt-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} px-6 py-3 rounded-lg font-semibold transition-all duration-200`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Admin Password Modal */}
      {showAdminPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} backdrop-blur-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-2xl p-8 max-w-md w-full shadow-xl`}>
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin Access</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Enter admin password to continue</p>
            </div>

            <div className="space-y-4">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminAccess()}
              />
              
              <button
                onClick={handleAdminAccess}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Access Admin Portal
              </button>
            </div>

            <button
              onClick={() => {
                setShowAdminPasswordModal(false);
                setAdminPassword('');
              }}
              className={`w-full mt-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} px-6 py-3 rounded-lg font-semibold transition-all duration-200`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}; 