interface ZalphaBrainLogoProps {
  className?: string;
  showQR?: boolean;
}

export function ZalphaBrainLogo({ 
  className = "w-full h-auto", 
  showQR = true 
}: ZalphaBrainLogoProps) {
  return (
    <svg 
      viewBox="0 0 800 600" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Cyan to Blue Gradient */}
        <linearGradient id="iconStrokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        {/* Text gradient */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        {/* Screen glow effect */}
        <radialGradient id="screenGlow">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>

        {/* Wave gradient */}
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* PYRAMID Icon Layout - Overlapping design */}
      <g transform="translate(400, 70)">
        
        {/* Graduation Cap - LEFT (Outline only, slightly overlapping, moved down) */}
        <g transform="translate(-50, 95)">
          
          {/* Mortarboard base */}
          <rect 
            x="-45" 
            y="-8" 
            width="90" 
            height="12" 
            rx="3" 
            fill="none"
            stroke="url(#iconStrokeGradient)" 
            strokeWidth="6"
          />
          
          {/* Mortarboard top (diamond shape) */}
          <path 
            d="M -55,-30 L 0,-45 L 55,-30 L 0,-15 Z" 
            fill="none"
            stroke="url(#iconStrokeGradient)" 
            strokeWidth="6"
            strokeLinejoin="miter"
          />
          
          {/* Tassel string */}
          <line 
            x1="55" 
            y1="-30" 
            x2="70" 
            y2="0" 
            stroke="#06b6d4" 
            strokeWidth="5"
            strokeLinecap="round"
          />
          
          {/* Tassel end */}
          <circle 
            cx="70" 
            cy="0" 
            r="8" 
            fill="none"
            stroke="#06b6d4" 
            strokeWidth="5"
          />
        </g>

        {/* Briefcase - RIGHT (Outline only, slightly overlapping, moved down) */}
        <g transform="translate(50, 95)">
          
          {/* Briefcase body */}
          <rect 
            x="-45" 
            y="-25" 
            width="90" 
            height="50" 
            rx="6" 
            fill="none"
            stroke="url(#iconStrokeGradient)" 
            strokeWidth="6"
          />
          
          {/* Briefcase handle */}
          <path 
            d="M -20,-25 L -20,-40 Q 0,-48 20,-40 L 20,-25" 
            fill="none" 
            stroke="url(#iconStrokeGradient)" 
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Briefcase lock/clasp */}
          <rect 
            x="-8" 
            y="-5" 
            width="16" 
            height="15" 
            rx="2" 
            fill="none"
            stroke="#0ea5e9" 
            strokeWidth="5"
          />
          
          {/* Lock keyhole */}
          <circle 
            cx="0" 
            cy="2" 
            r="4" 
            fill="#06b6d4"
          />
        </g>
        
        {/* Computer Screen - TOP CENTER (bottom sits on both icons) */}
        <g transform="translate(0, 0)">
          
          {/* Monitor screen outline */}
          <rect 
            x="-70" 
            y="-55" 
            width="140" 
            height="100" 
            rx="8" 
            fill="none"
            stroke="url(#iconStrokeGradient)" 
            strokeWidth="7"
          />
          
          {/* Monitor stand - vertical */}
          <rect 
            x="-8" 
            y="45" 
            width="16" 
            height="25" 
            rx="3" 
            fill="none"
            stroke="url(#iconStrokeGradient)" 
            strokeWidth="5"
          />
          
          {/* Monitor base */}
          <rect 
            x="-35" 
            y="70" 
            width="70" 
            height="10" 
            rx="5" 
            fill="none"
            stroke="url(#iconStrokeGradient)" 
            strokeWidth="5"
          />

          {showQR && (
            <>
              {/* SCANNABLE QR Code inside screen - TRANSPARENT background */}
              <g transform="translate(0, -5)">
                {/* NO white background - fully transparent */}

                {/* Top-left position marker */}
                <rect x="-48" y="-36" width="26" height="26" fill="#0ea5e9" />
                <rect x="-44" y="-32" width="18" height="18" fill="transparent" stroke="#0ea5e9" strokeWidth="2" />
                <rect x="-41" y="-29" width="12" height="12" fill="#0284c7" />

                {/* Top-right position marker */}
                <rect x="22" y="-36" width="26" height="26" fill="#0ea5e9" />
                <rect x="26" y="-32" width="18" height="18" fill="transparent" stroke="#0ea5e9" strokeWidth="2" />
                <rect x="29" y="-29" width="12" height="12" fill="#0284c7" />

                {/* Bottom-left position marker */}
                <rect x="-48" y="16" width="26" height="26" fill="#0ea5e9" />
                <rect x="-44" y="20" width="18" height="18" fill="transparent" stroke="#0ea5e9" strokeWidth="2" />
                <rect x="-41" y="23" width="12" height="12" fill="#0284c7" />

                {/* QR data pattern - Cyan/Blue colors */}
                <rect x="-8" y="-34" width="5" height="5" fill="#3b82f6" />
                <rect x="-2" y="-34" width="5" height="5" fill="#0ea5e9" />
                <rect x="4" y="-34" width="5" height="5" fill="#06b6d4" />
                <rect x="10" y="-34" width="5" height="5" fill="#0284c7" />

                <rect x="-8" y="-28" width="5" height="5" fill="#0ea5e9" />
                <rect x="4" y="-28" width="5" height="5" fill="#3b82f6" />
                <rect x="10" y="-28" width="5" height="5" fill="#0284c7" />
                <rect x="16" y="-28" width="5" height="5" fill="#06b6d4" />

                <rect x="-14" y="-22" width="5" height="5" fill="#06b6d4" />
                <rect x="-2" y="-22" width="5" height="5" fill="#3b82f6" />
                <rect x="10" y="-22" width="5" height="5" fill="#0ea5e9" />
                <rect x="16" y="-22" width="5" height="5" fill="#0284c7" />

                <rect x="-14" y="-16" width="5" height="5" fill="#0284c7" />
                <rect x="-8" y="-16" width="5" height="5" fill="#0ea5e9" />
                <rect x="4" y="-16" width="5" height="5" fill="#06b6d4" />
                <rect x="16" y="-16" width="5" height="5" fill="#3b82f6" />

                <rect x="-8" y="-10" width="5" height="5" fill="#3b82f6" />
                <rect x="-2" y="-10" width="5" height="5" fill="#06b6d4" />
                <rect x="10" y="-10" width="5" height="5" fill="#0284c7" />
                <rect x="16" y="-10" width="5" height="5" fill="#0ea5e9" />

                <rect x="-14" y="-4" width="5" height="5" fill="#0ea5e9" />
                <rect x="4" y="-4" width="5" height="5" fill="#3b82f6" />
                <rect x="10" y="-4" width="5" height="5" fill="#06b6d4" />

                <rect x="-8" y="2" width="5" height="5" fill="#0284c7" />
                <rect x="-2" y="2" width="5" height="5" fill="#0ea5e9" />
                <rect x="4" y="2" width="5" height="5" fill="#06b6d4" />
                <rect x="16" y="2" width="5" height="5" fill="#3b82f6" />

                <rect x="-14" y="8" width="5" height="5" fill="#06b6d4" />
                <rect x="-2" y="8" width="5" height="5" fill="#3b82f6" />
                <rect x="10" y="8" width="5" height="5" fill="#0ea5e9" />

                <rect x="-8" y="14" width="5" height="5" fill="#0ea5e9" />
                <rect x="4" y="14" width="5" height="5" fill="#0284c7" />
                <rect x="10" y="14" width="5" height="5" fill="#06b6d4" />
                <rect x="16" y="14" width="5" height="5" fill="#3b82f6" />

                <rect x="-14" y="20" width="5" height="5" fill="#3b82f6" />
                <rect x="-2" y="20" width="5" height="5" fill="#06b6d4" />
                <rect x="16" y="20" width="5" height="5" fill="#0284c7" />

                <rect x="-8" y="26" width="5" height="5" fill="#0ea5e9" />
                <rect x="4" y="26" width="5" height="5" fill="#3b82f6" />
                <rect x="10" y="26" width="5" height="5" fill="#06b6d4" />

                <rect x="-14" y="32" width="5" height="5" fill="#0284c7" />
                <rect x="-8" y="32" width="5" height="5" fill="#0ea5e9" />
                <rect x="-2" y="32" width="5" height="5" fill="#06b6d4" />
                <rect x="10" y="32" width="5" height="5" fill="#3b82f6" />
                <rect x="16" y="32" width="5" height="5" fill="#0ea5e9" />

                <rect x="-8" y="38" width="5" height="5" fill="#06b6d4" />
                <rect x="4" y="38" width="5" height="5" fill="#0284c7" />
                <rect x="16" y="38" width="5" height="5" fill="#3b82f6" />
              </g>
            </>
          )}

          {/* Power indicator light */}
          <circle cx="0" cy="52" r="4" fill="#22d3ee">
            <animate 
              attributeName="opacity" 
              values="0.4;1;0.4" 
              dur="2s" 
              repeatCount="indefinite" 
            />
          </circle>
        </g>

      </g>

      {/* ZALPHA Text - Right on top of artwork */}
      <text
        x="400"
        y="280"
        fontFamily="Montserrat, 'Poppins', sans-serif"
        fontSize="110"
        fontWeight="900"
        textAnchor="middle"
        letterSpacing="-2"
        fill="url(#textGradient)"
      >
        ZALPHA
      </text>

      {/* Tagline: FRESH TALENT.FUTURE LEADERS */}
      <text
        x="400"
        y="320"
        fontFamily="Montserrat, 'Poppins', sans-serif"
        fontSize="24"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="3"
        fill="#1e293b"
      >
        FRESH TALENT.FUTURE LEADERS
      </text>

      {/* Website URL */}
      <text
        x="400"
        y="350"
        fontFamily="Montserrat, 'Poppins', sans-serif"
        fontSize="22"
        fontWeight="700"
        textAnchor="middle"
        letterSpacing="1"
        fill="#3b82f6"
      >
        zalpharecruit.com
      </text>
    </svg>
  );
}