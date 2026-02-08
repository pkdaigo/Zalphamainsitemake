import { useState } from 'react';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface InternalLoginProps {
  onNavigate: (page: string) => void;
  onLogin: (username: string, role: string) => void;
}

// Demo credentials for testing
const DEMO_USERS = [
  { username: 'admin', password: 'admin123', role: 'administrator', name: 'Admin User' },
  { username: 'manager', password: 'manager123', role: 'manager', name: 'Manager User' },
  { username: 'consultant', password: 'consultant123', role: 'consultant', name: 'Consultant User' },
  { username: 'staff', password: 'staff123', role: 'staff', name: 'Staff User' },
];

export function InternalLogin({ onNavigate, onLogin }: InternalLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Trim whitespace from inputs to prevent common user errors
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedPassword = password.trim();

    const user = DEMO_USERS.find(
      (u) => u.username === trimmedUsername && u.password === trimmedPassword
    );

    if (user) {
      onLogin(user.name, user.role);
      onNavigate('internal-dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 flex items-center justify-center px-6">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl mb-4 shadow-2xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">ZALPHA Internal</h1>
          <p className="text-cyan-300 text-lg">Authorized Access Only</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-white font-semibold mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-300" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border-2 border-red-400 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0" />
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Back to Landing */}
        <div className="text-center mt-6">
          <BackButton
            onClick={() => onNavigate('landing')}
            className="text-cyan-300 hover:text-white transition-colors text-sm"
          >
            ← Back to Landing Page
          </BackButton>
        </div>
      </div>
    </div>
  );
}