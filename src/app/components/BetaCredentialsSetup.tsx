import { useState } from 'react';
import { User, Lock, Key, Shield, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface BetaCredentials {
  username: string;
  password: string;
  betaId: string;
  assignedRegion: string;
  userType: 'student' | 'employer' | 'career-services';
  activatedAt: number;
  expiresAt: number;
}

interface BetaCredentialsSetupProps {
  userEmail: string;
  userType: 'student' | 'employer' | 'career-services';
  assignedRegion: string;
  onComplete: (credentials: BetaCredentials) => void;
}

export function BetaCredentialsSetup({ 
  userEmail, 
  userType, 
  assignedRegion, 
  onComplete 
}: BetaCredentialsSetupProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateBetaId = (): string => {
    const prefix = userType === 'student' ? 'STU' : userType === 'employer' ? 'EMP' : 'EDU';
    const regionCode = assignedRegion.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BETA-${prefix}-${regionCode}-${timestamp}-${random}`;
  };

  const validateUsername = (value: string): boolean => {
    // Username requirements:
    // - 4-20 characters
    // - Letters, numbers, underscores, hyphens only
    // - Must start with a letter
    const regex = /^[a-zA-Z][a-zA-Z0-9_-]{3,19}$/;
    return regex.test(value);
  };

  const validatePassword = (value: string): boolean => {
    // Password requirements:
    // - At least 12 characters
    // - At least one uppercase letter
    // - At least one lowercase letter
    // - At least one number
    // - At least one special character
    const minLength = value.length >= 12;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    
    return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const getPasswordStrength = (value: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    if (value.length >= 12) strength++;
    if (value.length >= 16) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) strength++;
    if (value.length >= 20) strength++;

    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 4) return { strength, label: 'Fair', color: 'bg-yellow-500' };
    if (strength <= 5) return { strength, label: 'Good', color: 'bg-blue-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate username
    if (!validateUsername(username)) {
      setError('Username must be 4-20 characters, start with a letter, and contain only letters, numbers, underscores, or hyphens.');
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError('Password must be at least 12 characters with uppercase, lowercase, number, and special character.');
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsGenerating(true);

    try {
      // Generate beta credentials
      const betaId = generateBetaId();
      const credentials: BetaCredentials = {
        username,
        password, // Will be hashed on backend
        betaId,
        assignedRegion,
        userType,
        activatedAt: Date.now(),
        expiresAt: Date.now() + (180 * 24 * 60 * 60 * 1000) // 180 days (6 months)
      };

      // Send to backend to create beta account
      const response = await fetch('/api/beta-credentials/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          credentials
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create beta credentials');
      }

      onComplete(credentials);
    } catch (err: any) {
      setError(err.message || 'Failed to create credentials. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const passwordStrength = password ? getPasswordStrength(password) : null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Key className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Beta Credentials</h2>
          <p className="text-gray-600">Secure username and password for beta access</p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">🔒 Secure Beta Access</p>
            <p>These credentials will be used to access the ZALPHA beta program. Keep them safe and do not share them with anyone.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={userEmail}
            readOnly
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="johndoe123"
              required
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">
            4-20 characters, start with letter, letters/numbers/underscore/hyphen only
          </p>
          {username && validateUsername(username) && (
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
              <CheckCircle className="w-4 h-4" />
              <span>Username available</span>
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Password Strength Meter */}
          {password && passwordStrength && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Password Strength:</span>
                <span className={`text-xs font-semibold ${
                  passwordStrength.label === 'Strong' ? 'text-green-600' :
                  passwordStrength.label === 'Good' ? 'text-blue-600' :
                  passwordStrength.label === 'Fair' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.strength / 7) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          <div className="mt-2 text-xs text-gray-600 space-y-1">
            <p className={password.length >= 12 ? 'text-green-600' : ''}>
              {password.length >= 12 ? '✓' : '○'} At least 12 characters
            </p>
            <p className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
              {/[A-Z]/.test(password) ? '✓' : '○'} One uppercase letter
            </p>
            <p className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
              {/[a-z]/.test(password) ? '✓' : '○'} One lowercase letter
            </p>
            <p className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
              {/[0-9]/.test(password) ? '✓' : '○'} One number
            </p>
            <p className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'text-green-600' : ''}>
              {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? '✓' : '○'} One special character
            </p>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••••••"
              required
            />
          </div>
          {confirmPassword && password === confirmPassword && (
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
              <CheckCircle className="w-4 h-4" />
              <span>Passwords match</span>
            </div>
          )}
          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
          )}
        </div>

        {/* Assigned Region */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assigned Region
          </label>
          <input
            type="text"
            value={assignedRegion}
            readOnly
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
          />
          <p className="text-xs text-gray-600 mt-1">
            Your IP address must be from this region to access beta
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
            <p className="text-red-800 text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating || !validateUsername(username) || !validatePassword(password) || password !== confirmPassword}
          className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all ${
            isGenerating || !validateUsername(username) || !validatePassword(password) || password !== confirmPassword
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isGenerating ? 'Creating Credentials...' : 'Create Beta Account'}
        </button>
      </form>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-xs text-gray-700">
          <strong className="text-gray-900">🔒 Security Notice:</strong> Your password is encrypted using industry-standard 
          hashing algorithms. ZALPHA staff cannot see your password. Keep your credentials secure and never share them 
          with anyone. If you forget your password, you'll need to contact beta support to reset it.
        </p>
      </div>
    </div>
  );
}

// Component to display beta credentials after creation
export function BetaCredentialsConfirmation({ credentials }: { credentials: BetaCredentials }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const expiresDate = new Date(credentials.expiresAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      {/* Success Header */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
        Beta Account Created! 🎉
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Save these credentials securely. You'll need them to access the beta program.
      </p>

      {/* Credentials Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Beta ID</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg font-mono text-sm">
                {credentials.betaId}
              </code>
              <button
                onClick={() => copyToClipboard(credentials.betaId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Username</p>
            <code className="block px-4 py-2 bg-white border border-gray-300 rounded-lg font-mono text-sm">
              {credentials.username}
            </code>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Assigned Region</p>
            <code className="block px-4 py-2 bg-white border border-gray-300 rounded-lg font-mono text-sm">
              {credentials.assignedRegion}
            </code>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Beta Access Expires</p>
            <code className="block px-4 py-2 bg-white border border-gray-300 rounded-lg font-mono text-sm">
              {expiresDate} (6 months)
            </code>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6">
        <p className="text-yellow-900 font-semibold mb-2">⚠️ IMPORTANT:</p>
        <ul className="text-sm text-yellow-900 space-y-1">
          <li>• Save these credentials in a secure password manager</li>
          <li>• You cannot recover your password - contact support for reset</li>
          <li>• Your account is tied to your assigned region ({credentials.assignedRegion})</li>
          <li>• VPN/proxy use will result in access denial</li>
          <li>• Beta access expires after 6 months</li>
        </ul>
      </div>

      {/* Action Button */}
      <button
        onClick={() => window.location.href = '/beta-login'}
        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
      >
        Proceed to Beta Login
      </button>
    </div>
  );
}
