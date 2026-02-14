/**
 * ZALPHA Interactive 3D Globe Hero v832
 * Features: Spinning Earth → Western Pacific zoom → 2D map with glowing orbs
 * Interactive drag orbit, orb clicks → region stats
 */

import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Stars } from '@react-three/drei';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent } from '@/app/components/ui/card';
import * as THREE from 'three';
import {
  Users,
  Briefcase,
  GraduationCap,
  TrendingUp,
  MapPin,
  ChevronRight,
  Globe as GlobeIcon,
  Sparkles,
  X,
} from 'lucide-react';

interface Region {
  id: string;
  name: string;
  position: [number, number, number];
  flag: string;
  stats: {
    students: number;
    coops: number;
    employers: number;
  };
  color: string;
}

const regions: Region[] = [
  {
    id: 'cnmi',
    name: 'CNMI',
    position: [0.2, 0.5, 0],
    flag: '🇲🇵',
    stats: { students: 847, coops: 89, employers: 142 },
    color: '#a855f7', // purple
  },
  {
    id: 'guam',
    name: 'Guam',
    position: [0.15, 0.4, 0.1],
    flag: '🇬🇺',
    stats: { students: 1124, coops: 156, employers: 198 },
    color: '#06b6d4', // cyan
  },
  {
    id: 'palau',
    name: 'Palau',
    position: [-0.1, 0.3, 0.15],
    flag: '🇵🇼',
    stats: { students: 234, coops: 32, employers: 42 },
    color: '#10b981', // green
  },
  {
    id: 'fsm',
    name: 'FSM',
    position: [0.3, 0.2, 0.2],
    flag: '🇫🇲',
    stats: { students: 412, coops: 54, employers: 48 },
    color: '#3b82f6', // blue
  },
  {
    id: 'rmi',
    name: 'RMI',
    position: [0.4, 0.35, 0.05],
    flag: '🇲🇭',
    stats: { students: 156, coops: 21, employers: 18 },
    color: '#ec4899', // pink
  },
];

interface GlobeProps {
  animationStage: 'loading' | 'zooming' | 'landed';
  onAnimationComplete: () => void;
  onOrbClick: (region: Region) => void;
  selectedRegion: Region | null;
}

function Earth({ animationStage, onAnimationComplete }: { animationStage: string; onAnimationComplete: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [animationProgress, setAnimationProgress] = useState(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Rotation animation
    if (animationStage === 'loading') {
      meshRef.current.rotation.y += delta * 0.2;
    }

    // Zoom animation
    if (animationStage === 'zooming') {
      const progress = Math.min(animationProgress + delta * 0.3, 1);
      setAnimationProgress(progress);

      // Camera zoom into Western Pacific
      const startPos = new THREE.Vector3(0, 0, 5);
      const endPos = new THREE.Vector3(1, 0.5, 3);
      camera.position.lerpVectors(startPos, endPos, progress);

      // Rotate globe to show Pacific
      const targetRotation = Math.PI * 0.5;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(0, targetRotation, progress);

      camera.lookAt(0, 0, 0);

      if (progress >= 1) {
        onAnimationComplete();
      }
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
      />
    </Sphere>
  );
}

function AtmosphereGlow() {
  return (
    <Sphere args={[1.05, 64, 64]}>
      <meshBasicMaterial
        color="#3b82f6"
        transparent
        opacity={0.15}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

interface OrbProps {
  region: Region;
  onClick: (region: Region) => void;
  isSelected: boolean;
  animationStage: string;
}

function Orb({ region, onClick, isSelected, animationStage }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Pulse animation
    const scale = isSelected || hovered ? 1.3 : 1;
    const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    meshRef.current.scale.setScalar(scale * pulseScale);
  });

  if (animationStage !== 'landed') return null;

  return (
    <group position={region.position}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(region)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial
          color={region.color}
          emissive={region.color}
          emissiveIntensity={isSelected || hovered ? 1.5 : 0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Hover label */}
      {(hovered || isSelected) && (
        <Html distanceFactor={3}>
          <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap pointer-events-none">
            {region.flag} {region.name}
            <div className="text-xs text-gray-300 mt-1">
              {region.stats.coops} co-ops • {region.stats.students} students
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function ConnectingLines({ animationStage }: { animationStage: string }) {
  if (animationStage !== 'landed') return null;

  return (
    <>
      {regions.map((region, idx) => {
        if (idx === 0) return null;
        const prevRegion = regions[idx - 1];
        
        const points = [
          new THREE.Vector3(...prevRegion.position),
          new THREE.Vector3(...region.position),
        ];
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={region.id} geometry={geometry}>
            <lineBasicMaterial color="#3b82f6" opacity={0.3} transparent />
          </line>
        );
      })}
    </>
  );
}

function Scene({ animationStage, onAnimationComplete, onOrbClick, selectedRegion }: GlobeProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Earth animationStage={animationStage} onAnimationComplete={onAnimationComplete} />
      <AtmosphereGlow />
      
      {regions.map((region) => (
        <Orb
          key={region.id}
          region={region}
          onClick={onOrbClick}
          isSelected={selectedRegion?.id === region.id}
          animationStage={animationStage}
        />
      ))}
      
      <ConnectingLines animationStage={animationStage} />
      
      {animationStage === 'landed' && (
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      )}
    </>
  );
}

interface InteractiveGlobeHeroV832Props {
  onCTAClick?: () => void;
}

export function InteractiveGlobeHeroV832({ onCTAClick }: InteractiveGlobeHeroV832Props) {
  const [animationStage, setAnimationStage] = useState<'loading' | 'zooming' | 'landed'>('loading');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [showMobileCarousel, setShowMobileCarousel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Start zoom animation after 2 seconds
    const timer = setTimeout(() => {
      setAnimationStage('zooming');
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleAnimationComplete = () => {
    setAnimationStage('landed');
    if (isMobile) {
      setShowMobileCarousel(true);
    }
  };

  const handleOrbClick = (region: Region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <Scene
            animationStage={animationStage}
            onAnimationComplete={handleAnimationComplete}
            onOrbClick={handleOrbClick}
            selectedRegion={selectedRegion}
          />
        </Suspense>
      </Canvas>

      {/* Overlay Content */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto px-4 h-full flex flex-col justify-between py-8 md:py-12">
          {/* Top Section - Title */}
          <div className="text-center space-y-4 pointer-events-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-4">
              <GlobeIcon className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-semibold text-blue-100">Pacific Islands Workforce Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                ZALPHA Pacific
              </span>
              <br />
              <span className="text-white">Workforce Network</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Connecting students, employers, and career services across 6 Pacific jurisdictions
            </p>

            {/* Stats Badge */}
            {animationStage === 'landed' && (
              <div className="flex flex-wrap justify-center gap-3 mt-6 animate-fade-in">
                <Badge className="bg-blue-500/20 text-blue-200 border border-blue-400/30 backdrop-blur-sm px-4 py-2 text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  2,847 Students
                </Badge>
                <Badge className="bg-green-500/20 text-green-200 border border-green-400/30 backdrop-blur-sm px-4 py-2 text-sm">
                  <Briefcase className="w-4 h-4 mr-2" />
                  456 Employers
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-200 border border-purple-400/30 backdrop-blur-sm px-4 py-2 text-sm">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  1,923 Co-ops Active
                </Badge>
              </div>
            )}
          </div>

          {/* Bottom Section - CTA */}
          <div className="text-center space-y-6 pointer-events-auto">
            {animationStage === 'loading' && (
              <div className="text-gray-400 text-sm animate-pulse flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Loading Pacific Network...
              </div>
            )}

            {animationStage === 'zooming' && (
              <div className="text-blue-300 text-sm animate-pulse flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                Zooming to Western Pacific...
              </div>
            )}

            {animationStage === 'landed' && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-gray-300 text-sm">
                  🌏 Click an orb to explore region • Drag to orbit • Scroll to zoom
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    size="lg"
                    onClick={onCTAClick}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-6 text-lg shadow-lg shadow-blue-500/50"
                    style={{ 
                      background: 'linear-gradient(to right, rgb(37 99 235), rgb(147 51 234))',
                      color: 'rgb(255 255 255)'
                    }}
                  >
                    Join Co-op Program
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm px-8 py-6 text-lg"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgb(255 255 255)',
                      borderColor: 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    View Success Stories
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Region Panel */}
      {selectedRegion && animationStage === 'landed' && (
        <div className="absolute bottom-4 right-4 pointer-events-auto max-w-sm animate-slide-up">
          <Card className="bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{selectedRegion.flag}</span>
                  <div>
                    <h3 className="text-xl font-bold">{selectedRegion.name}</h3>
                    <p className="text-xs text-gray-400">Pacific Region</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRegion(null)}
                  className="text-gray-400 hover:text-white h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-500/20 rounded-lg p-3 text-center border border-blue-400/30">
                    <Users className="w-5 h-5 text-blue-300 mx-auto mb-1" />
                    <p className="text-2xl font-bold">{selectedRegion.stats.students}</p>
                    <p className="text-xs text-gray-400">Students</p>
                  </div>
                  <div className="bg-green-500/20 rounded-lg p-3 text-center border border-green-400/30">
                    <Briefcase className="w-5 h-5 text-green-300 mx-auto mb-1" />
                    <p className="text-2xl font-bold">{selectedRegion.stats.coops}</p>
                    <p className="text-xs text-gray-400">Co-ops</p>
                  </div>
                  <div className="bg-purple-500/20 rounded-lg p-3 text-center border border-purple-400/30">
                    <GraduationCap className="w-5 h-5 text-purple-300 mx-auto mb-1" />
                    <p className="text-2xl font-bold">{selectedRegion.stats.employers}</p>
                    <p className="text-xs text-gray-400">Employers</p>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={onCTAClick}
                >
                  View {selectedRegion.name} Opportunities
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-white/10 hover:bg-white/20 border-white/30 text-white"
                >
                  📰 {selectedRegion.name} Bulletin Board
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mobile Carousel (Simplified) */}
      {isMobile && showMobileCarousel && (
        <div className="absolute bottom-20 left-0 right-0 pointer-events-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {regions.map((region) => (
              <Card
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                className="flex-shrink-0 w-64 bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-xl snap-center cursor-pointer hover:scale-105 transition-transform"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{region.flag}</span>
                    <div>
                      <h4 className="font-bold">{region.name}</h4>
                      <p className="text-xs text-gray-400">{region.stats.coops} co-ops active</p>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge className="bg-blue-500/20 text-blue-200 border-0">
                      {region.stats.students} students
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-200 border-0">
                      {region.stats.employers} employers
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Fix oklch color animation errors - use RGB instead */
        .bg-gradient-to-r,
        .bg-gradient-to-br,
        .bg-gradient-to-b {
          --tw-gradient-from: rgb(59 130 246) !important; /* blue-500 */
          --tw-gradient-to: rgb(168 85 247) !important; /* purple-500 */
        }
        
        /* Override any oklch colors with RGB equivalents */
        * {
          color-scheme: normal;
        }
      `}</style>
    </div>
  );
}