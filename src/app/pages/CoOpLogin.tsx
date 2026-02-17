/*
 * ZALPHA Platform - Co-Op Portal Login
 * Role-based authentication for Co-Op Students, School Coordinators, and Employers
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Building2, Briefcase, Lock, Mail, Eye, EyeOff, ChevronRight, Shield } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface CoOpLoginProps {
  onNavigate: (page: string) => void;
}

type UserRole = 'student' | 'coordinator' | 'employer' | null;

export function CoOpLogin({ onNavigate }: CoOpLoginProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    {
      id: 'student' as UserRole,
      title: 'Co-Op Student',
      description: 'Apply for co-op placements, track your hours, and view your progress.',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-400',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      id: 'coordinator' as UserRole,
      title: 'School Admin / Co-Op Coordinator',
      description: 'Approve placements, monitor student hours, and generate reports.',
      icon: Building2,
      gradient: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-400',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      id: 'employer' as UserRole,
      title: 'Co-Op Employer',
      description: 'Post co-op roles, review student applicants, and confirm completed hours.',
      icon: Briefcase,
      gradient: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-400',
      bgColor: 'from-purple-50 to-pink-50',
    },
  ];

  const handleLogin = () => {
    if (!selectedRole) {
      alert('Please select your role');
      return;
    }
    
    // Navigate based on selected role
    switch (selectedRole) {
      case 'student':
        onNavigate('coop-student-dashboard'); // Routes to HighSchoolCoOpDashboard
        break;
      case 'coordinator':
        onNavigate('coop-admin-dashboard'); // Routes to CoOpAdminDashboard
        break;
      case 'employer':
        onNavigate('coop-employer-dashboard'); // Routes to CoOpEmployerDashboard
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      <BackButton onClick={() => onNavigate('landing')} />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: 'rgb(59, 130, 246)' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: 'rgb(6, 182, 212)' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ backgroundColor: 'rgb(168, 85, 247)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-bold text-white mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            PACIFIC CO-OP & WORK-BASED LEARNING HUB
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            ZALFA Recruit – Co-Op Portal
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Sign in to manage co-op placements, hours, and opportunities.
          </p>
        </motion.div>

        {/* Role Selection Cards */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">Select Your Role</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {roles.map((role, index) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              
              return (
                <motion.button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`relative bg-white/10 backdrop-blur-sm border-2 rounded-2xl p-6 text-left transition-all ${
                    isSelected 
                      ? `${role.borderColor} bg-gradient-to-br ${role.bgColor} bg-opacity-20` 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSelected && (
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <div className={`w-8 h-8 bg-gradient-to-br ${role.gradient} rounded-full flex items-center justify-center`}>
                        <ChevronRight className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                  )}
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{role.description}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
            
            {selectedRole && (
              <motion.div
                className="mb-6 p-4 bg-white/10 border border-white/20 rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-cyan-300 text-sm mb-1">Signing in as:</p>
                <p className="text-white font-bold">
                  {roles.find(r => r.id === selectedRole)?.title}
                </p>
              </motion.div>
            )}
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-blue-100 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-blue-100 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleLogin}
                disabled={!selectedRole || !email || !password}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                  selectedRole && email && password
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 hover:shadow-xl'
                    : 'bg-white/20 cursor-not-allowed opacity-50'
                }`}
              >
                Sign In to Co-Op Portal
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-cyan-300 hover:text-white text-sm font-semibold transition">
                Forgot your password?
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-blue-100 text-sm text-center mb-4">
                Don't have an account?
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onNavigate('student-signup')}
                  className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-semibold transition"
                >
                  Student Sign Up
                </button>
                <button
                  onClick={() => onNavigate('employer-signup')}
                  className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-semibold transition"
                >
                  Employer Sign Up
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Jurisdiction Support */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className="text-blue-200 text-sm mb-4">Supported Jurisdictions</p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">CNMI PSS Co-Op</span>
            <span className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-semibold">Guam WBL</span>
            <span className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold">FSM SEE/CTE</span>
            <span className="px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-semibold">Palau CTE</span>
            <span className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold">RMI PSS Work Program</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}