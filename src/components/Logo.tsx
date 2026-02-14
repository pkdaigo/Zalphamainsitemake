export function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-xl border-2 border-gray-700 shadow-lg`}>
      <div className="flex flex-col items-center justify-center w-full h-full px-1">
        <span 
          className="text-transparent bg-clip-text font-black"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.75rem',
            backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #60a5fa 50%, #fb923c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            lineHeight: '1',
            filter: 'brightness(1.2)'
          }}
        >
          ZALPHA
        </span>
        <svg 
          viewBox="0 0 100 10" 
          className="w-[75%]"
          style={{ marginTop: '3px' }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
          <path
            d="M 0 6 Q 25 10, 50 5 T 100 6"
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
