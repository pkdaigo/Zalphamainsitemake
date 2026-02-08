import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface BackButtonProps {
  onNavigate?: (page: string) => void;
  label?: string;
  destination?: string;
  variant?: 'light' | 'dark';
}

export function BackButton({ onNavigate, label = "Back", destination = "landing", variant = "dark" }: BackButtonProps) {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate(destination);
    }
  };

  const styles = {
    light: {
      text: "text-white/90 hover:text-white",
      bg: "bg-white/10 group-hover:bg-white/20 border-2 border-white/20"
    },
    dark: {
      text: "text-gray-600 hover:text-gray-900",
      bg: "bg-gray-100 group-hover:bg-gray-200"
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 transition-colors group ${styles[variant].text}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ x: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${styles[variant].bg}`}
        whileHover={{ rotate: -360 }}
        transition={{ duration: 0.5 }}
      >
        <ArrowLeft className="w-4 h-4" />
      </motion.div>
      <span className="font-medium">{label}</span>
    </motion.button>
  );
}