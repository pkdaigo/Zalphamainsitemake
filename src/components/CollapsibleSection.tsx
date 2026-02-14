import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface CollapsibleSectionProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
  colorScheme?: 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'cyan';
  className?: string;
}

export function CollapsibleSection({
  title,
  subtitle,
  icon,
  children,
  defaultOpen = false,
  variant = 'default',
  colorScheme = 'blue',
  className = '',
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Color scheme styles
  const colorSchemes = {
    red: {
      bg: 'bg-gradient-to-br from-red-500/20 to-pink-500/20',
      border: 'border-red-400/50',
      text: 'text-white',
      hover: 'hover:from-red-500/30 hover:to-pink-500/30',
      chevronBg: 'bg-red-500/20',
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      border: 'border-green-400/50',
      text: 'text-white',
      hover: 'hover:from-green-500/30 hover:to-emerald-500/30',
      chevronBg: 'bg-green-500/20',
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-400/50',
      text: 'text-white',
      hover: 'hover:from-blue-500/30 hover:to-cyan-500/30',
      chevronBg: 'bg-blue-500/20',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      border: 'border-purple-400/50',
      text: 'text-white',
      hover: 'hover:from-purple-500/30 hover:to-pink-500/30',
      chevronBg: 'bg-purple-500/20',
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20',
      border: 'border-orange-400/50',
      text: 'text-white',
      hover: 'hover:from-orange-500/30 hover:to-yellow-500/30',
      chevronBg: 'bg-orange-500/20',
    },
    cyan: {
      bg: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
      border: 'border-cyan-400/50',
      text: 'text-white',
      hover: 'hover:from-cyan-500/30 hover:to-blue-500/30',
      chevronBg: 'bg-cyan-500/20',
    },
  };

  const variants = {
    default: {
      bg: 'bg-white',
      text: 'text-gray-900',
      border: 'border-gray-200',
      hover: 'hover:bg-gray-50',
      chevronBg: 'bg-gray-100',
    },
    primary: {
      bg: 'bg-gradient-to-br from-orange-600 via-red-600 to-pink-600',
      text: 'text-white',
      border: 'border-white/30',
      hover: 'hover:brightness-105',
      chevronBg: 'bg-white/20',
    },
    secondary: {
      bg: 'bg-gradient-to-br from-blue-600 to-purple-600',
      text: 'text-white',
      border: 'border-white/30',
      hover: 'hover:brightness-105',
      chevronBg: 'bg-white/20',
    },
  };

  // Use colorScheme if provided, otherwise fall back to variant
  const style = variant !== 'default' ? variants[variant] : (colorScheme && colorSchemes[colorScheme] ? colorSchemes[colorScheme] : variants.default);

  return (
    <div className={`${style.bg} backdrop-blur-xl rounded-xl sm:rounded-2xl border-2 ${style.border} overflow-hidden ${className}`}>
      {/* Header Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 sm:p-6 text-left ${style.hover} transition-all flex items-center justify-between gap-4`}
      >
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {icon && (
            <div className="flex-shrink-0 mt-1 sm:mt-0">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold ${style.text} mb-1`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`text-sm sm:text-base ${style.text} opacity-80`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${style.chevronBg}`}
        >
          <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 ${style.text}`} />
        </motion.div>
      </button>

      {/* Collapsible Content */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-4 sm:p-6 pt-0">
          {children}
        </div>
      </motion.div>
    </div>
  );
}