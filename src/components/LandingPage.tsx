import React from 'react';
import { Brain, TrendingUp, Sparkles, Zap, BarChart3, Clock } from 'lucide-react';
import { LandingNavbar } from './LandingNavbar';

interface LandingPageProps {
  onRoleSelect: (role: 'student' | 'admin') => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect, darkMode, toggleDarkMode }) => {
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Landing Navbar */}
      <LandingNavbar onRoleSelect={onRoleSelect} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section with Advanced 3D Elements */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Advanced Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-spin-slow"></div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Advanced 3D Cards with Hover Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 transform -rotate-12 hover:rotate-0 transition-transform duration-1000 group">
            <div className="w-32 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl animate-float group-hover:scale-110 group-hover:shadow-blue-500/25"></div>
          </div>
          <div className="absolute top-1/3 right-1/4 transform rotate-12 hover:rotate-0 transition-transform duration-1000 group">
            <div className="w-28 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl animate-float-delayed group-hover:scale-110 group-hover:shadow-purple-500/25"></div>
          </div>
          <div className="absolute bottom-1/3 left-1/3 transform rotate-6 hover:rotate-0 transition-transform duration-1000 group">
            <div className="w-24 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl animate-float-slow group-hover:scale-110 group-hover:shadow-green-500/25"></div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          {/* Main Hero Content */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10 mb-8 animate-pulse">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-white">AI-Powered Gate Management</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Smart Gate
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Pass System
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Revolutionize your institution's gate pass and appointment management with 
              AI-powered predictions, real-time analytics, and intelligent automation.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {[
              {
                icon: Brain,
                title: "Smart Request Creation",
                description: "Students submit gatepass/appointment requests with intelligent prediction of approval likelihood and response time.",
                gradient: "from-blue-500/20 to-blue-600/20",
                iconColor: "text-blue-400"
              },
              {
                icon: BarChart3,
                title: "Pattern Analysis & Prediction",
                description: "Learns from previous data to detect patterns, student behavior, and optimal request times.",
                gradient: "from-purple-500/20 to-purple-600/20",
                iconColor: "text-purple-400"
              },
              {
                icon: Zap,
                title: "Anomaly Detection",
                description: "Advanced ML algorithms detect suspicious behavior and flag abnormal requests automatically.",
                gradient: "from-green-500/20 to-green-600/20",
                iconColor: "text-green-400"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
              >
                <div className={`bg-gradient-to-br ${feature.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "Priority Suggestions",
                description: "AI suggests best times for approval based on low traffic and historical success rates."
              },
              {
                icon: Clock,
                title: "Admin Feedback Loop",
                description: "Real approvals train the model continuously for improved accuracy and predictions."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-7 h-7 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};