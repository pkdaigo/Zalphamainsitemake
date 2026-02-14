interface ZalphaCustomLogoProps {
  className?: string;
  showQR?: boolean;
  qrUrl?: string;
}

export function ZalphaCustomLogo({ 
  className = "w-64 h-auto", 
  showQR = true,
  qrUrl = "https://zalpha-platform.com" 
}: ZalphaCustomLogoProps) {
  return (
    <svg 
      viewBox="0 0 400 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Ocean gradient for text */}
        <linearGradient id="oceanTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="40%" stopColor="#3b82f6" />
          <stop offset="70%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        
        {/* Screen glow */}
        <linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
        </linearGradient>
        
        {/* Monitor frame gradient */}
        <linearGradient id="monitorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Wave pattern gradient */}
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>

      {/* Computer Monitor/Screen */}
      <g transform="translate(50, 30)">
        {/* Monitor stand */}
        <rect x="130" y="130" width="40" height="15" rx="2" fill="url(#monitorGradient)" />
        <rect x="110" y="145" width="80" height="8" rx="4" fill="url(#monitorGradient)" />
        
        {/* Monitor frame - outer bezel */}
        <rect 
          x="20" 
          y="10" 
          width="260" 
          height="130" 
          rx="8" 
          fill="url(#monitorGradient)"
          stroke="#334155"
          strokeWidth="2"
        />
        
        {/* Monitor screen - inner display */}
        <rect 
          x="30" 
          y="20" 
          width="240" 
          height="100" 
          rx="4" 
          fill="#0f172a"
        />
        
        {/* Screen glow effect */}
        <rect 
          x="30" 
          y="20" 
          width="240" 
          height="100" 
          rx="4" 
          fill="url(#screenGlow)"
        />

        {showQR && (
          <>
            {/* QR Code Container */}
            <rect 
              x="115" 
              y="40" 
              width="70" 
              height="70" 
              rx="3" 
              fill="white"
            />
            
            {/* Simplified QR Code Pattern (decorative - not functional) */}
            {/* Top-left position marker */}
            <rect x="120" y="45" width="20" height="20" fill="#0f172a" />
            <rect x="125" y="50" width="10" height="10" fill="white" />
            
            {/* Top-right position marker */}
            <rect x="160" y="45" width="20" height="20" fill="#0f172a" />
            <rect x="165" y="50" width="10" height="10" fill="white" />
            
            {/* Bottom-left position marker */}
            <rect x="120" y="85" width="20" height="20" fill="#0f172a" />
            <rect x="125" y="90" width="10" height="10" fill="white" />
            
            {/* QR pattern blocks (decorative) */}
            <rect x="145" y="48" width="4" height="4" fill="#0f172a" />
            <rect x="150" y="48" width="4" height="4" fill="#0f172a" />
            <rect x="145" y="53" width="4" height="4" fill="#0f172a" />
            <rect x="155" y="53" width="4" height="4" fill="#0f172a" />
            
            <rect x="143" y="70" width="4" height="4" fill="#0f172a" />
            <rect x="148" y="70" width="4" height="4" fill="#0f172a" />
            <rect x="153" y="70" width="4" height="4" fill="#0f172a" />
            <rect x="158" y="70" width="4" height="4" fill="#0f172a" />
            
            <rect x="145" y="75" width="4" height="4" fill="#0f172a" />
            <rect x="150" y="75" width="4" height="4" fill="#0f172a" />
            <rect x="155" y="75" width="4" height="4" fill="#0f172a" />
            
            <rect x="143" y="80" width="4" height="4" fill="#0f172a" />
            <rect x="153" y="80" width="4" height="4" fill="#0f172a" />
            
            <rect x="148" y="85" width="4" height="4" fill="#0f172a" />
            <rect x="153" y="85" width="4" height="4" fill="#0f172a" />
            <rect x="158" y="85" width="4" height="4" fill="#0f172a" />
            
            <rect x="143" y="90" width="4" height="4" fill="#0f172a" />
            <rect x="148" y="90" width="4" height="4" fill="#0f172a" />
            <rect x="158" y="90" width="4" height="4" fill="#0f172a" />
            
            <rect x="145" y="95" width="4" height="4" fill="#0f172a" />
            <rect x="155" y="95" width="4" height="4" fill="#0f172a" />
            <rect x="160" y="95" width="4" height="4" fill="#0f172a" />
            
            <rect x="143" y="100" width="4" height="4" fill="#0f172a" />
            <rect x="150" y="100" width="4" height="4" fill="#0f172a" />
            <rect x="158" y="100" width="4" height="4" fill="#0f172a" />
          </>
        )}

        {/* Pacific Wave Elements on Screen */}
        <path
          d="M 35 110 Q 80 105, 125 110 T 215 110 T 265 110"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        <path
          d="M 35 115 Q 90 118, 135 115 T 225 115 T 265 115"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Power indicator light */}
        <circle cx="150" cy="126" r="2" fill="#22d3ee" opacity="0.8">
          <animate 
            attributeName="opacity" 
            values="0.4;1;0.4" 
            dur="2s" 
            repeatCount="indefinite" 
          />
        </circle>
      </g>

      {/* ZALPHA Text */}
      <text
        x="200"
        y="185"
        fontFamily="Montserrat, Arial, sans-serif"
        fontSize="42"
        fontWeight="900"
        textAnchor="middle"
        letterSpacing="-1"
        fill="url(#oceanTextGradient)"
        style={{ textTransform: 'uppercase' }}
      >
        ZALPHA
      </text>

      {/* Tagline wave decoration */}
      <path
        d="M 80 192 Q 125 197, 170 192 T 260 192 T 320 192"
        fill="none"
        stroke="url(#waveGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
