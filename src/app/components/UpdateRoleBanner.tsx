import { Briefcase, X } from 'lucide-react';
import { useState } from 'react';

interface UpdateRoleBannerProps {
  onUpdateClick: () => void;
}

export function UpdateRoleBanner({ onUpdateClick }: UpdateRoleBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 mb-6 shadow-lg relative">
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
      >
        <X className="w-4 h-4 text-white" />
      </button>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">
            Have you updated your current role?
          </h3>
          <p className="text-white/90 text-sm">
            Help your school track employment outcomes. Takes less than 2 minutes!
          </p>
        </div>
        <button
          onClick={onUpdateClick}
          className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-bold whitespace-nowrap"
        >
          Update my current role
        </button>
      </div>
    </div>
  );
}
