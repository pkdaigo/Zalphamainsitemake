interface MetgotLogoProps {
  className?: string;
  size?: number;
}

export function MetgotLogo({ className = '', size = 48 }: MetgotLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="metgot-strength-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="metgot-strength-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0c4a6e" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="metgot-accent" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <radialGradient id="metgot-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow Effect */}
      <circle cx="50" cy="50" r="48" fill="url(#metgot-glow)" />

      {/* Strong Mountain/Shield Base - representing strength and stability */}
      <path
        d="M 20 75 L 35 35 L 50 20 L 65 35 L 80 75 Z"
        fill="url(#metgot-strength-1)"
        opacity="0.95"
      />

      {/* Inner Mountain Layer - depth */}
      <path
        d="M 30 75 L 40 45 L 50 32 L 60 45 L 70 75 Z"
        fill="url(#metgot-strength-2)"
        opacity="0.9"
      />

      {/* Central Peak - The core strength */}
      <path
        d="M 42 75 L 47 50 L 50 42 L 53 50 L 58 75 Z"
        fill="url(#metgot-accent)"
        opacity="1"
      />

      {/* Strong Pillar Elements - representing structure and foundation */}
      <rect x="32" y="65" width="6" height="10" fill="#0891b2" opacity="0.8" rx="1" />
      <rect x="47" y="60" width="6" height="15" fill="#06b6d4" opacity="0.9" rx="1" />
      <rect x="62" y="65" width="6" height="10" fill="#0891b2" opacity="0.8" rx="1" />

      {/* Letter 'M' - Strong, bold representation */}
      <path
        d="M 22 28 L 22 18 L 27 25 L 32 18 L 32 28"
        stroke="#22d3ee"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Letter 'G' - Strong, bold representation */}
      <path
        d="M 74 22 A 5 5 0 0 0 68 22 A 5 5 0 0 0 68 28 L 74 28 L 74 25"
        stroke="#22d3ee"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Connection lines - representing network strength */}
      <line x1="35" y1="35" x2="50" y2="20" stroke="#22d3ee" strokeWidth="2" opacity="0.6" />
      <line x1="65" y1="35" x2="50" y2="20" stroke="#22d3ee" strokeWidth="2" opacity="0.6" />
      
      {/* Strength dots - key connection points */}
      <circle cx="50" cy="20" r="3" fill="#22d3ee" />
      <circle cx="35" cy="35" r="2.5" fill="#06b6d4" />
      <circle cx="65" cy="35" r="2.5" fill="#06b6d4" />
      <circle cx="50" cy="42" r="2.5" fill="#22d3ee" />
    </svg>
  );
}

// Full logo with text
interface MetgotLogoWithTextProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  orientation?: 'horizontal' | 'vertical';
}

export function MetgotLogoWithText({ 
  className = '', 
  size = 'medium',
  orientation = 'horizontal' 
}: MetgotLogoWithTextProps) {
  const sizes = {
    small: { logo: 32, text: 'text-lg' },
    medium: { logo: 48, text: 'text-2xl' },
    large: { logo: 64, text: 'text-4xl' }
  };

  const currentSize = sizes[size];

  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <MetgotLogo size={currentSize.logo} />
        <div className="text-center">
          <h1 className={`${currentSize.text} font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent`}>
            Metgot
          </h1>
          <p className={`${size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-base'} font-bold text-cyan-600`}>
            GLOBAL
          </p>
          <p className={`${size === 'small' ? 'text-[10px]' : size === 'medium' ? 'text-xs' : 'text-sm'} font-semibold text-blue-500 italic mt-0.5`}>
            Talent Built Strong
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <MetgotLogo size={currentSize.logo} />
      <div>
        <h1 className={`${currentSize.text} font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent leading-none`}>
          Metgot
        </h1>
        <p className={`${size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-base'} font-bold text-cyan-600 leading-none`}>
          GLOBAL
        </p>
        <p className={`${size === 'small' ? 'text-[10px]' : size === 'medium' ? 'text-xs' : 'text-sm'} font-semibold text-blue-500 italic leading-none mt-0.5`}>
          Talent Built Strong
        </p>
      </div>
    </div>
  );
}