import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';

interface VerificationBadgeProps {
  verificationStatus?: {
    identity: boolean;
    bank: boolean;
    income: boolean;
    completedCount: number;
  };
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export function VerificationBadge({ 
  verificationStatus, 
  size = 'md',
  showDetails = false 
}: VerificationBadgeProps) {
  if (!verificationStatus || verificationStatus.completedCount === 0) {
    return null;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  if (showDetails) {
    return (
      <div className="flex flex-wrap gap-2">
        {verificationStatus.identity && (
          <Badge 
            variant="outline" 
            className={`${sizeClasses[size]} bg-green-50 border-green-200 text-green-700`}
          >
            <CheckCircle2 className={`${iconSizes[size]} mr-1`} />
            Identity
          </Badge>
        )}
        {verificationStatus.bank && (
          <Badge 
            variant="outline" 
            className={`${sizeClasses[size]} bg-blue-50 border-blue-200 text-blue-700`}
          >
            <CheckCircle2 className={`${iconSizes[size]} mr-1`} />
            Bank
          </Badge>
        )}
        {verificationStatus.income && (
          <Badge 
            variant="outline" 
            className={`${sizeClasses[size]} bg-purple-50 border-purple-200 text-purple-700`}
          >
            <CheckCircle2 className={`${iconSizes[size]} mr-1`} />
            Income
          </Badge>
        )}
      </div>
    );
  }

  // Simple badge showing verification count
  const percentage = (verificationStatus.completedCount / 3) * 100;
  const color = percentage === 100 
    ? 'bg-green-600 text-white' 
    : percentage >= 66 
    ? 'bg-blue-600 text-white'
    : 'bg-yellow-600 text-white';

  return (
    <Badge className={`${sizeClasses[size]} ${color}`}>
      <Shield className={`${iconSizes[size]} mr-1`} />
      Verified {verificationStatus.completedCount}/3
    </Badge>
  );
}
