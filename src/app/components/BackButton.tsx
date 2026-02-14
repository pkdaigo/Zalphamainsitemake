import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * BackButton Component
 * 
 * A reusable navigation component that provides consistent back navigation
 * across all ZALPHA platform views (Home, Students, Employers, Schools, Staff).
 * 
 * Features:
 * - Ghost button design with subtle border and hover effects
 * - Left arrow icon with smooth animation
 * - Two variants: 'light' (for dark backgrounds) and 'dark' (for light backgrounds)
 * - Respects ZALPHA design system: rounded-lg borders, backdrop blur, consistent spacing
 * 
 * Usage Examples:
 * 
 * // Basic usage with onClick handler
 * <BackButton onClick={() => navigate('dashboard')} />
 * 
 * // With custom label
 * <BackButton onClick={() => navigate('home')} label="Back to Home" />
 * 
 * // With onNavigate and destination (legacy support)
 * <BackButton onNavigate={handleNavigate} destination="landing" />
 * 
 * // Dark variant (for light backgrounds)
 * <BackButton onClick={() => navigate('back')} variant="dark" />
 * 
 * Layout Integration:
 * - Typically placed at top-left of main content area
 * - Wrapped in a div with mb-6 or mb-8 for spacing
 * - Positioned before page titles and headers
 */

interface BackButtonProps {
  onClick?: () => void;
  onNavigate?: (page: string) => void;
  label?: string;
  destination?: string;
  variant?: 'light' | 'dark';
}

export function BackButton({ 
  onClick, 
  onNavigate, 
  label = "Back", 
  destination = "landing", 
  variant = "light" 
}: BackButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onNavigate) {
      onNavigate(destination);
    }
  };

  const styles = {
    light: {
      button: "text-white/80 hover:text-white hover:bg-white/10",
      border: "border border-white/20 hover:border-white/40",
      icon: "text-white/80 group-hover:text-white"
    },
    dark: {
      button: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
      border: "border border-gray-200 hover:border-gray-300",
      icon: "text-gray-600 group-hover:text-gray-900"
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`group inline-flex items-center gap-2 px-4 py-2 rounded-lg ${styles[variant].border} ${styles[variant].button} backdrop-blur-sm transition-all font-medium text-sm`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${styles[variant].icon}`} />
      <span>{label}</span>
    </motion.button>
  );
}