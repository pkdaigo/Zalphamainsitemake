import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

export function PasswordProtection({ onAuthenticated }: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if already authenticated on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('zalpha_authenticated');
    if (isAuth === 'true') {
      onAuthenticated();
    }
  }, [onAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Password validation
    // You can change this password to whatever you want
    const correctPassword = 'ZALPHA2026';

    setTimeout(() => {
      if (password === correctPassword) {
        sessionStorage.setItem('zalpha_authenticated', 'true');
        onAuthenticated();
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-700 via-blue-700 to-cyan-800 flex items-center justify-center px-4 py-8 safe-area-inset">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl mb-3 md:mb-4 shadow-2xl">
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Z
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            ZALPHA
          </h1>
          <p className="text-cyan-100 text-base md:text-lg">
            Pacific Job Connection Platform
          </p>
        </div>

        {/* Password Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Protected Access
              </h2>
              <p className="text-slate-600 text-xs md:text-sm">
                Beta Testing Phase
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Enter Access Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 md:py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-12 text-base"
                  placeholder="Enter password"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-2 touch-active"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-3 md:py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold text-base md:text-lg hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg touch-active active:scale-98"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Verifying...
                </span>
              ) : (
                'Access Platform'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-slate-200">
            <p className="text-slate-600 text-xs md:text-sm text-center">
              💡 <strong>Beta Testers:</strong> Check your email for the access password
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 md:mt-6 text-center px-4">
          <p className="text-cyan-100 text-xs md:text-sm">
            Need access? Contact{' '}
            <a href="mailto:contact@kiexgroup.com" className="text-white font-semibold hover:underline">
              contact@kiexgroup.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}