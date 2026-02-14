import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Star, TrendingUp, Crown } from 'lucide-react';

interface FeaturedProfileProps {
  type: 'employer' | 'student';
  profile: {
    id: string;
    name: string;
    title: string;
    location: string;
    description: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    isPremium: boolean;
    industry?: string;
    skills?: string[];
    company?: string;
  };
  onViewProfile: (id: string) => void;
}

export function FeaturedProfile({ type, profile, onViewProfile }: FeaturedProfileProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 rounded-2xl p-6 shadow-lg border-2 border-orange-200/50 relative overflow-hidden">
      {/* Premium Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
          <Crown className="w-4 h-4" />
          FEATURED
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Section */}
        {profile.videoUrl && (
          <div className="w-full md:w-1/2">
            <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-xl aspect-video">
              {!showVideo ? (
                // Thumbnail View
                <div className="relative w-full h-full">
                  <img
                    src={profile.thumbnailUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-white ml-1" />
                    </div>
                  </button>
                </div>
              ) : (
                // Video Player
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src={profile.videoUrl}
                    poster={profile.thumbnailUrl}
                    onEnded={() => setIsPlaying(false)}
                  />
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between gap-4">
                      <button
                        onClick={togglePlay}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        )}
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleMute}
                          className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5 text-white" />
                          ) : (
                            <Volume2 className="w-5 h-5 text-white" />
                          )}
                        </button>
                        
                        <button
                          onClick={toggleFullscreen}
                          className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                        >
                          <Maximize className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Info */}
        <div className={`flex-1 ${!profile.videoUrl ? 'w-full' : ''}`}>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              {profile.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{profile.name}</h3>
              <p className="text-lg text-slate-700 font-semibold">{profile.title}</p>
              <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-orange-500" />
                {profile.location}
              </p>
            </div>
          </div>

          <p className="text-slate-700 mb-4 leading-relaxed">
            {profile.description}
          </p>

          {/* Additional Info */}
          {type === 'employer' && profile.industry && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold">
                {profile.industry}
              </span>
            </div>
          )}

          {type === 'student' && profile.skills && profile.skills.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {profile.skills.slice(0, 5).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats/Highlights */}
          <div className="bg-white rounded-xl p-4 mb-4 border border-orange-200/50">
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold text-sm">Premium Featured Profile</span>
            </div>
            <p className="text-sm text-slate-600">
              {type === 'employer' 
                ? 'This employer is committed to hiring Pacific talent and offers competitive benefits.'
                : 'This student has been verified and showcases exceptional skills and qualifications.'}
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => onViewProfile(profile.id)}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg"
          >
            {type === 'employer' ? 'View Open Positions' : 'View Full Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Featured Carousel Component
interface FeaturedCarouselProps {
  type: 'employer' | 'student';
  profiles: FeaturedProfileProps['profile'][];
  onViewProfile: (id: string) => void;
}

export function FeaturedCarousel({ type, profiles, onViewProfile }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (profiles.length === 0) return null;

  const nextProfile = () => {
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  const prevProfile = () => {
    setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Featured {type === 'employer' ? 'Employers' : 'Candidates'}
          </h2>
        </div>

        {profiles.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={prevProfile}
              className="w-10 h-10 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
            >
              ←
            </button>
            <span className="text-sm text-slate-600 font-medium">
              {currentIndex + 1} / {profiles.length}
            </span>
            <button
              onClick={nextProfile}
              className="w-10 h-10 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
            >
              →
            </button>
          </div>
        )}
      </div>

      <FeaturedProfile
        type={type}
        profile={profiles[currentIndex]}
        onViewProfile={onViewProfile}
      />

      {/* Dots Indicator */}
      {profiles.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {profiles.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-orange-500 w-8'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
