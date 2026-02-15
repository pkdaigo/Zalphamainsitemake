/**
 * ZALPHA Hero Section - Premium SaaS Landing Page
 * Full animation sequence: Globe → Rotate/Zoom → Flatten → Orbs → Lines
 */

import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Stars } from '@react-three/drei';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import * as THREE from 'three';
import {
  Play,
  Users,
  Building,
  GraduationCap,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

interface Region {
  id: string;
  name: string;
  flag: string;
  position: [number, number, number];
  color: string;
  label: string;
  caption: string;
  stats: {
    students: number;
    coops: number;
    employers: number;
  };
}

const regions: Region[] = [
  {
    id: 'cnmi',
    name: 'CNMI',
    flag: '🇲🇵',
    position: [0.4, 0.3, 0],
    color: '#a855f7',
    label: 'Saipan Hub',
    caption: 'Local talent',
    stats: { students: 847, coops: 89, employers: 142 },
  },
  {
    id: 'guam',
    name: 'Guam',
    flag: '🇬🇺',
    position: [0.3, 0.1, 0.1],
    color: '#06b6d4',
    label: 'Regional Center',
    caption: 'Regional employers',
    stats: { students: 1124, coops: 156, employers: 198 },
  },
  {
    id: 'palau',
    name: 'Palau',
    flag: '🇵🇼',
    position: [0.1, -0.1, 0.15],
    color: '#10b981',
    label: 'Island Network',
    caption: 'Government partners',
    stats: { students: 234, coops: 32, employers: 42 },
  },
  {
    id: 'fsm',
    name: 'FSM',
    flag: '🇫🇲',
    position: [0.5, 0, 0.2],
    color: '#3b82f6',
    label: 'Micronesia Hub',
    caption: 'Educational institutions',
    stats: { students: 412, coops: 54, employers: 48 },
  },
  {
    id: 'marshall',
    name: 'Marshall Islands',
    flag: '🇲🇭',
    position: [0.6, 0.2, 0.05],
    color: '#ec4899',
    label: 'Pacific Gateway',
    caption: 'Career services',
    stats: { students: 156, coops: 21, employers: 18 },
  },
  {
    id: 'philippines',
    name: 'Philippines',
    flag: '🇵🇭',
    position: [-0.1, -0.2, 0.2],
    color: '#f59e0b',
    label: 'APAC Connector',
    caption: 'Remote opportunities',
    stats: { students: 2400, coops: 340, employers: 520 },
  },
];

type AnimationStage = 'appear' | 'rotating' | 'flattening' | 'orbs' | 'lines' | 'idle';

interface AnimatedGlobeProps {
  stage: AnimationStage;
  onStageComplete: () => void;
}

function AnimatedGlobe({ stage, onStageComplete }: AnimatedGlobeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [progress, setProgress] = useState(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Stage 1: Appear (0-2s) - Fade in + ambient rotation
    if (stage === 'appear') {
      meshRef.current.rotation.y += delta * 0.1;
      const newProgress = Math.min(progress + delta * 0.5, 1);
      setProgress(newProgress);
      if (meshRef.current.material) {
        (meshRef.current.material as THREE.MeshStandardMaterial).opacity = newProgress;
      }
      if (newProgress >= 1) {
        onStageComplete();
      }
    }

    // Stage 2: Rotating & Zooming (2-6s) - Move camera to Pacific
    if (stage === 'rotating') {
      const newProgress = Math.min(progress + delta * 0.25, 1);
      setProgress(newProgress);

      // Smooth easing (easeInOutCubic)
      const t = newProgress < 0.5 
        ? 4 * newProgress * newProgress * newProgress 
        : 1 - Math.pow(-2 * newProgress + 2, 3) / 2;

      const startPos = new THREE.Vector3(0, 0, 5);
      const endPos = new THREE.Vector3(1.5, 0.8, 3.5);
      camera.position.lerpVectors(startPos, endPos, t);

      const targetRotation = Math.PI * 0.5;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(0, targetRotation, t);

      camera.lookAt(0, 0, 0);

      if (newProgress >= 1) {
        setProgress(0);
        onStageComplete();
      }
    }

    // Stage 3: Flattening (6-8s) - Morph to 2D
    if (stage === 'flattening') {
      const newProgress = Math.min(progress + delta * 0.5, 1);
      setProgress(newProgress);

      // Flatten effect: rotate X-axis and scale down
      const flattenRotation = THREE.MathUtils.lerp(0, Math.PI / 2, newProgress);
      meshRef.current.rotation.x = flattenRotation;

      const scale = THREE.MathUtils.lerp(1, 0.7, newProgress);
      meshRef.current.scale.set(scale, scale, scale * (1 - newProgress * 0.8));

      // Fade out atmosphere during flatten
      if (meshRef.current.material) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = THREE.MathUtils.lerp(0.2, 0, newProgress);
      }

      if (newProgress >= 1) {
        setProgress(0);
        onStageComplete();
      }
    }

    // Stage 4+: Idle subtle movement
    if (stage === 'idle') {
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      meshRef.current.scale.set(0.7 * pulseScale, 0.7 * pulseScale, 0.14 * pulseScale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#1e40af"
        metalness={0.4}
        roughness={0.7}
        emissive="#0e7490"
        emissiveIntensity={0.2}
        transparent
        opacity={0}
      />
    </Sphere>
  );
}

function AtmosphereGlow({ stage }: { stage: AnimationStage }) {
  const opacity = stage === 'flattening' || stage === 'orbs' || stage === 'lines' || stage === 'idle' ? 0 : 0.15;
  
  return (
    <Sphere args={[1.05, 64, 64]}>
      <meshBasicMaterial
        color="#06b6d4"
        transparent
        opacity={opacity}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

interface AnimatedOrbProps {
  region: Region;
  stage: AnimationStage;
  delay: number;
  onClick: (region: Region) => void;
}

function AnimatedOrb({ region, stage, delay, onClick }: AnimatedOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [appeared, setAppeared] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (stage !== 'orbs' && stage !== 'lines' && stage !== 'idle') return;
    if (!meshRef.current || !glowRef.current) return;

    // Appear animation with delay
    if (!appeared) {
      const elapsed = state.clock.elapsedTime;
      const startTime = 8 + delay; // Base start at 8s
      if (elapsed >= startTime) {
        const newProgress = Math.min(progress + delta * 3, 1);
        setProgress(newProgress);

        // Elastic bounce effect
        const t = newProgress;
        const bounce = t < 0.5 
          ? 8 * t * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 4) / 2;

        const scale = bounce * (hovered ? 1.2 : 1);
        meshRef.current.scale.setScalar(scale);
        glowRef.current.scale.setScalar(scale * 1.5);

        if (newProgress >= 1) {
          setAppeared(true);
        }
      }
    }

    // Idle pulse
    if (appeared) {
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      const targetScale = (hovered ? 1.2 : 1) * pulseScale;
      meshRef.current.scale.setScalar(targetScale);
      glowRef.current.scale.setScalar(targetScale * 1.5);
    }
  });

  if (stage === 'appear' || stage === 'rotating' || stage === 'flattening') {
    return null;
  }

  return (
    <group position={region.position}>
      {/* Core orb */}
      <mesh
        ref={meshRef}
        onClick={() => onClick(region)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial
          color={region.color}
          emissive={region.color}
          emissiveIntensity={hovered ? 2 : 1.5}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial
          color={region.color}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Label (appears with orb) */}
      {appeared && (
        <Html distanceFactor={3} position={[0.15, 0, 0]}>
          <div 
            className="orb-label"
            style={{
              background: 'rgba(10, 22, 40, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              minWidth: '120px',
              transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: hovered ? `0 4px 20px ${region.color}40` : 'none',
            }}
          >
            <div style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#e2e8f0',
              marginBottom: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span>{region.flag}</span>
              <span>{region.label}</span>
            </div>
            <div style={{
              fontSize: '11px',
              color: '#94a3b8',
            }}>
              {region.caption}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function ConnectingLines({ stage }: { stage: AnimationStage }) {
  if (stage !== 'lines' && stage !== 'idle') return null;

  const connections = [
    { from: 0, to: 1 }, // CNMI ↔ Guam
    { from: 1, to: 2 }, // Guam ↔ Palau
    { from: 2, to: 3 }, // Palau ↔ FSM
    { from: 3, to: 4 }, // FSM ↔ Marshall
    { from: 1, to: 5 }, // Guam ↔ Philippines
    { from: 2, to: 5 }, // Palau ↔ Philippines
  ];

  return (
    <>
      {connections.map((conn, idx) => {
        const from = regions[conn.from];
        const to = regions[conn.to];
        
        const points = [
          new THREE.Vector3(...from.position),
          new THREE.Vector3(...to.position),
        ];
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={idx} geometry={geometry}>
            <lineBasicMaterial 
              color="#06b6d4" 
              opacity={0.3} 
              transparent 
              linewidth={2}
            />
          </line>
        );
      })}
    </>
  );
}

function Scene() {
  const [stage, setStage] = useState<AnimationStage>('appear');
  const stageTimeouts = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Clear any existing timeouts
    stageTimeouts.current.forEach(timeout => clearTimeout(timeout));
    stageTimeouts.current = [];

    return () => {
      stageTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const advanceStage = () => {
    setStage(current => {
      if (current === 'appear') return 'rotating';
      if (current === 'rotating') return 'flattening';
      if (current === 'flattening') return 'orbs';
      if (current === 'orbs') {
        // Wait for all orbs to appear, then show lines
        const timeout = setTimeout(() => setStage('lines'), 2000);
        stageTimeouts.current.push(timeout);
        return current;
      }
      if (current === 'lines') {
        const timeout = setTimeout(() => setStage('idle'), 500);
        stageTimeouts.current.push(timeout);
        return current;
      }
      return 'idle';
    });
  };

  const handleOrbClick = (region: Region) => {
    console.log('Clicked region:', region);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <AnimatedGlobe stage={stage} onStageComplete={advanceStage} />
      <AtmosphereGlow stage={stage} />
      
      {regions.map((region, idx) => (
        <AnimatedOrb
          key={region.id}
          region={region}
          stage={stage}
          delay={idx * 0.3}
          onClick={handleOrbClick}
        />
      ))}
      
      <ConnectingLines stage={stage} />
    </>
  );
}

interface ZALPHAHeroSectionProps {
  onGetStarted?: () => void;
  onWatchDemo?: () => void;
}

export function ZALPHAHeroSection({ onGetStarted, onWatchDemo }: ZALPHAHeroSectionProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 10000); // 10s total animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="relative w-full h-screen min-h-[800px] overflow-hidden"
      style={{
        background: '#0a1628',
        backgroundImage: `radial-gradient(circle at 60% 40%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)`,
      }}
    >
      {/* Main container */}
      <div className="container mx-auto h-full px-20 py-16">
        <div className="grid grid-cols-5 gap-16 h-full items-center">
          {/* Left content (2 columns) */}
          <div className="col-span-2 space-y-8 z-10">
            {/* Optional eyebrow */}
            <Badge 
              className="inline-flex items-center gap-2 px-4 py-2"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                color: '#93c5fd',
              }}
            >
              <Sparkles className="w-3 h-3" />
              <span className="text-xs font-semibold">New: AI-Powered Matching</span>
            </Badge>

            {/* Headline */}
            <h1 
              className="text-6xl font-bold leading-tight"
              style={{
                color: '#ffffff',
                letterSpacing: '-0.02em',
                maxWidth: '520px',
              }}
            >
              Orchestrating Pacific talent,{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, rgb(59 130 246), rgb(168 85 247))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                one region at a time
              </span>
            </h1>

            {/* Subtext */}
            <p 
              className="text-lg leading-relaxed"
              style={{
                color: '#cbd5e1',
                maxWidth: '480px',
              }}
            >
              ZALPHA connects students seeking work-based learning with employers across the Pacific, 
              supported by government programs and career services. From CNMI to Guam, we're building 
              the future Pacific workforce.
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="px-8 py-6 text-base font-semibold shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgb(59 130 246), rgb(139 92 246))',
                  color: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
                }}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={onWatchDemo}
                className="px-8 py-6 text-base font-semibold"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#e2e8f0',
                  borderRadius: '8px',
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 pt-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-semibold text-white">2,847</p>
                  <p className="text-xs text-slate-400">Students</p>
                </div>
              </div>

              <div 
                style={{
                  width: '1px',
                  height: '32px',
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
              />

              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm font-semibold text-white">456</p>
                  <p className="text-xs text-slate-400">Employers</p>
                </div>
              </div>

              <div 
                style={{
                  width: '1px',
                  height: '32px',
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
              />

              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm font-semibold text-white">6</p>
                  <p className="text-xs text-slate-400">Regions</p>
                </div>
              </div>
            </div>

            {/* Social proof */}
            {animationComplete && (
              <div 
                className="flex items-center gap-3 pt-4 animate-fade-in"
                style={{
                  opacity: 0,
                  animation: 'fadeIn 0.8s ease-out 0.2s forwards',
                }}
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-sm text-slate-300">
                  Trusted by NMC, PSS, GDOE, and 142 Pacific employers
                </p>
              </div>
            )}
          </div>

          {/* Right globe (3 columns) */}
          <div className="col-span-3 h-full">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              style={{ width: '100%', height: '100%' }}
            >
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>

            {/* Stage indicator */}
            <div 
              className="absolute bottom-24 right-20 flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(10, 22, 40, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#06b6d4' }}
              />
              <span className="text-xs text-slate-300">
                {animationComplete ? 'Interactive - Click an orb' : 'Animation in progress...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        style={{ opacity: animationComplete ? 1 : 0, transition: 'opacity 0.5s' }}
      >
        <span className="text-xs text-slate-400">Scroll to explore</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path 
            d="M10 4v12m0 0l-4-4m4 4l4-4" 
            stroke="#94a3b8" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes Sparkles {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2l2 6l6 2l-6 2l-2 6l-2-6l-6-2l6-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
