/*
 * ZALPHA Platform - Pacific Co-Op & Work-Based Learning Hub
 * Progress Bar Component
 */

import { Progress } from "@/app/components/ui/progress";

interface CoOpProgressBarProps {
  current: number;
  required: number;
  label?: string;
  showNumbers?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'orange' | 'red';
}

export function CoOpProgressBar({
  current,
  required,
  label,
  showNumbers = true,
  size = 'md',
  color = 'blue',
}: CoOpProgressBarProps) {
  const percentage = Math.min((current / required) * 100, 100);
  const isComplete = current >= required;
  const isAtRisk = percentage < 50;

  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
    red: 'bg-red-600',
  };

  const autoColor = isComplete ? 'green' : isAtRisk ? 'red' : 'blue';
  const finalColor = color === 'blue' ? autoColor : color;

  return (
    <div className="space-y-2">
      {(label || showNumbers) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium text-gray-700">{label}</span>}
          {showNumbers && (
            <span className={`font-semibold ${isComplete ? 'text-green-600' : 'text-gray-900'}`}>
              {current} / {required} hours
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <Progress value={percentage} className={heights[size]} />
        {isComplete && (
          <div className="absolute top-0 right-0 -mt-1 -mr-1">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {isAtRisk && !isComplete && (
        <p className="text-xs text-orange-600">⚠️ Behind schedule - may need support</p>
      )}
    </div>
  );
}
