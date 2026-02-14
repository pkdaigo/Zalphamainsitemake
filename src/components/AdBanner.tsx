import { X, ExternalLink, Star, TrendingUp, Eye } from 'lucide-react';
import { useState } from 'react';

interface AdBannerProps {
  size?: 'small' | 'medium' | 'large';
  position?: 'top' | 'sidebar' | 'inline';
  onClose?: () => void;
}

// Mock ad data - in production this would come from an ad server
const mockAds = {
  small: [
    {
      id: 'ad-1',
      title: 'Bank of the Pacific',
      subtitle: 'Start Your Banking Career',
      image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&q=80',
      cta: 'Learn More',
      url: 'https://bankofthepacific.com/careers'
    },
    {
      id: 'ad-2',
      title: 'University of Guam',
      subtitle: 'Graduate Programs Open',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80',
      cta: 'Apply Now',
      url: 'https://uog.edu'
    }
  ],
  medium: [
    {
      id: 'ad-3',
      title: 'Pacific Tech Solutions',
      subtitle: 'Join Our Growing Tech Team',
      description: 'Looking for software engineers, designers, and product managers.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
      cta: 'View Openings',
      url: 'https://pacifictech.com/careers'
    },
    {
      id: 'ad-4',
      title: 'Guam Healthcare Network',
      subtitle: 'Healthcare Careers Available',
      description: 'Multiple positions available for nursing graduates and medical professionals.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
      cta: 'Explore Careers',
      url: 'https://guamhealthcare.com'
    }
  ],
  large: [
    {
      id: 'ad-5',
      title: 'Micronesian Career Fair 2026',
      subtitle: '50+ Employers • 200+ Open Positions',
      description: 'Connect with top employers across the Pacific region. Free admission for verified students!',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      cta: 'Register Free',
      url: 'https://micronesiacareerfair.com',
      sponsored: true
    }
  ]
};

export function AdBanner({ size = 'medium', position = 'inline', onClose }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [ad] = useState(() => {
    const ads = mockAds[size];
    return ads[Math.floor(Math.random() * ads.length)];
  });

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleClick = () => {
    // Track ad click in analytics
    console.log('Ad clicked:', ad.id);
    window.open(ad.url, '_blank');
  };

  if (!isVisible) return null;

  // Small banner ad (horizontal bar)
  if (size === 'small') {
    return (
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-200 relative group hover:border-purple-400 transition-all">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <img 
              src={ad.image} 
              alt={ad.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-purple-600 font-semibold uppercase tracking-wide">Sponsored</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{ad.title}</h3>
              <p className="text-xs text-slate-600">{ad.subtitle}</p>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
          >
            {ad.cta}
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={handleClose}
            className="w-6 h-6 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>
    );
  }

  // Medium banner ad (card style)
  if (size === 'medium') {
    return (
      <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 overflow-hidden relative group hover:border-purple-400 hover:shadow-xl transition-all">
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-bold uppercase tracking-wide">
            Sponsored
          </span>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>
        <img 
          src={ad.image} 
          alt={ad.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">{ad.title}</h3>
          <p className="text-lg text-purple-600 font-semibold mb-3">{ad.subtitle}</p>
          {ad.description && (
            <p className="text-slate-600 mb-4">{ad.description}</p>
          )}
          <button
            onClick={handleClick}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {ad.cta}
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Large banner ad (hero style)
  if (size === 'large') {
    return (
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-3xl overflow-hidden shadow-2xl relative group">
        <div className="absolute top-4 left-4 z-10">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold uppercase tracking-wide border-2 border-white/30">
            ⭐ Featured Sponsor
          </span>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>
        <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4">{ad.title}</h2>
            <p className="text-2xl text-purple-100 font-semibold mb-4">{ad.subtitle}</p>
            {ad.description && (
              <p className="text-lg text-white/90 mb-6">{ad.description}</p>
            )}
            <button
              onClick={handleClick}
              className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-3"
            >
              {ad.cta}
              <ExternalLink className="w-6 h-6" />
            </button>
          </div>
          <img 
            src={ad.image} 
            alt={ad.title}
            className="rounded-2xl shadow-2xl border-4 border-white/30"
          />
        </div>
      </div>
    );
  }

  return null;
}

// Sidebar ad component
export function SidebarAd({ onUpgrade }: { onUpgrade?: () => void }) {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5" />
        <span className="text-sm font-semibold uppercase tracking-wide">Advertisement</span>
      </div>
      <h3 className="text-lg font-bold mb-3">Remove Ads for Just $5/month</h3>
      <p className="text-purple-100 text-sm mb-4">
        Get a clean, distraction-free experience and faster load times.
      </p>
      <button
        onClick={onUpgrade}
        className="w-full py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-lg transition-all"
      >
        Upgrade to Ad-Free
      </button>
      <p className="text-xs text-purple-200 mt-3 text-center">
        Or upgrade to Ultra Premium ($19.99/mo) for even more features
      </p>
    </div>
  );
}

// Inline sponsored job posting
export function SponsoredJob() {
  const job = {
    company: 'Pacific Tech Solutions',
    title: 'Junior Software Engineer',
    location: 'Guam',
    salary: '$55,000 - $70,000',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
    url: 'https://pacifictech.com/careers'
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-600" />
          <span className="text-sm font-bold text-yellow-700 uppercase tracking-wide">Sponsored Job</span>
        </div>
        <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
          FEATURED
        </span>
      </div>
      <div className="flex items-start gap-4">
        <img 
          src={job.logo} 
          alt={job.company}
          className="w-16 h-16 rounded-xl object-cover border-2 border-yellow-200"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 mb-1">{job.title}</h3>
          <p className="text-purple-600 font-semibold mb-2">{job.company}</p>
          <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
            <span>📍 {job.location}</span>
            <span>💰 {job.salary}</span>
          </div>
          <button
            onClick={() => window.open(job.url, '_blank')}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            View Job
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
