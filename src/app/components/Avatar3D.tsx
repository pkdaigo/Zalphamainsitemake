import { useEffect, useRef, useState } from 'react';

interface Avatar3DProps {
  avatarId: 'pk' | 'lola';
  isSpeaking?: boolean;
  photoUrl: string;
}

export function Avatar3D({ avatarId, isSpeaking, photoUrl }: Avatar3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // PK: Blue/teal masculine colors, Airen: Purple/pink feminine colors
  const avatarColor = avatarId === 'pk' ? '#0ea5e9' : '#d946ef';
  const accentColor = avatarId === 'pk' ? '#06b6d4' : '#ec4899';
  
  // Simulate natural blinking
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      
      // Random interval between 2-5 seconds
      const nextBlink = 2000 + Math.random() * 3000;
      return setTimeout(blink, nextBlink);
    };
    
    const timer = blink();
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    let animationFrame: number;
    let time = 0;
    
    const animate = () => {
      time += 0.016; // ~60fps
      
      const card = containerRef.current?.querySelector('.avatar-card') as HTMLElement;
      
      if (card) {
        // Subtle breathing motion (chest-like rise and fall)
        const breatheScale = 1 + Math.sin(time * 0.3) * 0.01;
        
        // Very subtle idle head movements (more natural)
        const headTiltX = Math.sin(time * 0.15) * 1.5; // Slight nod
        const headTiltY = Math.cos(time * 0.2) * 1; // Slight head turn
        
        // When speaking, add more dynamic movement
        let speakingMovementX = 0;
        let speakingMovementY = 0;
        let speakingScale = breatheScale;
        
        if (isSpeaking) {
          speakingMovementX = Math.sin(time * 3) * 2;
          speakingMovementY = Math.cos(time * 2.5) * 1.5;
          speakingScale = 1 + Math.sin(time * 2) * 0.015; // Slightly more movement when speaking
        }
        
        card.style.transform = `
          scale(${speakingScale})
          rotateX(${headTiltX + speakingMovementY}deg) 
          rotateY(${headTiltY + speakingMovementX}deg)
        `;
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isSpeaking]);
  
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" ref={containerRef}>
      {/* Soft lighting effect (like studio lighting) */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main video-like frame */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
        <div 
          className="avatar-card relative w-full h-full"
          style={{ 
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {/* Photo with realistic framing */}
          <div className="relative w-full h-full">
            {/* Main Photo */}
            <img 
              src={photoUrl} 
              alt="Avatar"
              className="w-full h-full object-cover"
              style={{
                filter: isBlinking ? 'brightness(0.95)' : 'brightness(1)',
                transition: 'filter 0.15s ease-out',
              }}
            />
            
            {/* Subtle vignette for depth */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
              }}
            ></div>
            
            {/* Natural lighting overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
              }}
            ></div>
            
            {/* Blinking overlay */}
            {isBlinking && (
              <div 
                className="absolute inset-0 bg-black/20 pointer-events-none"
                style={{
                  transition: 'opacity 0.15s ease-out',
                }}
              ></div>
            )}
            
            {/* Speaking indicator - subtle glow on face */}
            {isSpeaking && (
              <div 
                className="absolute inset-0 pointer-events-none animate-pulse"
                style={{
                  background: `radial-gradient(circle at center, ${accentColor}15 0%, transparent 60%)`,
                  animationDuration: '1s',
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
      
      {/* Speaking indicator badge */}
      {isSpeaking && (
        <div className="absolute bottom-6 left-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
            <div className="flex items-end gap-1 h-4">
              <div className="w-1 bg-white rounded-full animate-pulse" style={{ height: '40%', animationDuration: '0.6s' }}></div>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{ height: '80%', animationDuration: '0.7s', animationDelay: '0.1s' }}></div>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{ height: '60%', animationDuration: '0.8s', animationDelay: '0.2s' }}></div>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{ height: '90%', animationDuration: '0.6s', animationDelay: '0.3s' }}></div>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{ height: '50%', animationDuration: '0.7s', animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-white font-semibold text-sm">Speaking</span>
          </div>
        </div>
      )}
    </div>
  );
}