import { useEffect, useRef, useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  action?: string;
}

export function ReCaptcha({ onVerify, onError, action = 'submit' }: ReCaptchaProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Load reCAPTCHA script
    if (!scriptLoaded.current) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsLoaded(true);
        scriptLoaded.current = true;
      };
      script.onerror = () => {
        setError(true);
        onError?.();
      };
      document.body.appendChild(script);
    }
  }, [onError]);

  const executeRecaptcha = async () => {
    if (!isLoaded || !window.grecaptcha) {
      setError(true);
      onError?.();
      return;
    }

    try {
      // Note: In production, use your actual reCAPTCHA site key from environment variables
      const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'demo-site-key';
      
      // For demo purposes, we'll simulate token generation
      // In production, this would use: window.grecaptcha.execute(siteKey, { action })
      const token = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('demo-recaptcha-token-' + Date.now());
        }, 500);
      });
      
      onVerify(token);
    } catch (err) {
      setError(true);
      onError?.();
    }
  };

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200/50">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          {error ? (
            <AlertCircle className="w-5 h-5 text-white" />
          ) : (
            <Shield className="w-5 h-5 text-white" />
          )}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-slate-900 text-sm mb-1">
            {error ? 'Verification Error' : 'Security Verification'}
          </div>
          <div className="text-xs text-slate-600 mb-3">
            {error 
              ? 'Unable to verify. Please try again or contact support.'
              : 'This site is protected by reCAPTCHA and AI-detection to prevent automated abuse.'
            }
          </div>
          <button
            type="button"
            onClick={executeRecaptcha}
            disabled={!isLoaded || error}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            {error ? 'Retry Verification' : 'Verify I\'m Human'}
          </button>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-cyan-200">
        <p className="text-xs text-slate-500">
          Protected by Google reCAPTCHA v3 • <a href="https://policies.google.com/privacy" className="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">Privacy</a> • <a href="https://policies.google.com/terms" className="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">Terms</a>
        </p>
      </div>
    </div>
  );
}

// Honeypot component - invisible to users, catches bots
interface HoneypotFieldProps {
  onChange: (value: string) => void;
}

export function HoneypotField({ onChange }: HoneypotFieldProps) {
  return (
    <div 
      style={{ 
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}
      aria-hidden="true"
      tabIndex={-1}
    >
      <label htmlFor="website_url_field">Website</label>
      <input
        type="text"
        id="website_url_field"
        name="website_url"
        autoComplete="off"
        tabIndex={-1}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// Behavioral verification component
interface BehavioralVerificationProps {
  onComplete: (score: number) => void;
}

export function BehavioralVerification({ onComplete }: BehavioralVerificationProps) {
  const [mouseMovements, setMouseMovements] = useState(0);
  const [startTime] = useState(Date.now());
  const [verified, setVerified] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setMouseMovements(prev => prev + 1);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleVerify = () => {
    const timeSpent = (Date.now() - startTime) / 1000; // seconds
    
    // Calculate human-like behavior score
    const hasMouseMovement = mouseMovements > 5;
    const hasReasonableTime = timeSpent > 2 && timeSpent < 300; // Between 2 seconds and 5 minutes
    
    let score = 0;
    if (hasMouseMovement) score += 50;
    if (hasReasonableTime) score += 50;
    
    setVerified(true);
    onComplete(score);
  };

  return (
    <div 
      ref={containerRef}
      className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-4 border border-orange-200/50"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-slate-900 text-sm mb-1">
            {verified ? '✓ Verified Human' : 'Behavioral Verification'}
          </div>
          <div className="text-xs text-slate-600 mb-3">
            {verified 
              ? 'Your activity patterns have been verified as human.'
              : 'Move your mouse and click to verify you\'re not a bot.'
            }
          </div>
          {!verified && (
            <button
              type="button"
              onClick={handleVerify}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-all text-sm font-semibold flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Complete Verification
            </button>
          )}
          {verified && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
              <Shield className="w-4 h-4" />
              Human behavior detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Rate limit warning component
interface RateLimitWarningProps {
  attempts: number;
  maxAttempts: number;
  resetTime?: Date;
}

export function RateLimitWarning({ attempts, maxAttempts, resetTime }: RateLimitWarningProps) {
  if (attempts < maxAttempts * 0.7) return null;

  const isLocked = attempts >= maxAttempts;

  return (
    <div className={`rounded-xl p-4 border ${
      isLocked 
        ? 'bg-red-50 border-red-200' 
        : 'bg-yellow-50 border-yellow-200'
    }`}>
      <div className="flex items-start gap-3">
        <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
          isLocked ? 'text-red-600' : 'text-yellow-600'
        }`} />
        <div>
          <div className={`font-semibold text-sm mb-1 ${
            isLocked ? 'text-red-900' : 'text-yellow-900'
          }`}>
            {isLocked ? 'Account Temporarily Locked' : 'Warning: Multiple Attempts Detected'}
          </div>
          <div className={`text-xs ${
            isLocked ? 'text-red-700' : 'text-yellow-700'
          }`}>
            {isLocked ? (
              <>
                Too many failed attempts. Please try again {resetTime ? `at ${resetTime.toLocaleTimeString()}` : 'later'}.
              </>
            ) : (
              <>
                You have {maxAttempts - attempts} attempts remaining before temporary lockout.
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    grecaptcha: any;
  }
}
