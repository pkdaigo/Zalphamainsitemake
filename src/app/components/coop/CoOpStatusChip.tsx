/*
 * ZALPHA Platform - Pacific Co-Op & Work-Based Learning Hub
 * Status Chip Component
 */

import { Badge } from "@/app/components/ui/badge";

export type CoOpStatus =
  | 'pending'
  | 'approved'
  | 'active'
  | 'completed'
  | 'returned'
  | 'at-risk'
  | 'on-hold'
  | 'cancelled';

interface CoOpStatusChipProps {
  status: CoOpStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<CoOpStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  },
  approved: {
    label: 'Approved',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
  active: {
    label: 'Active',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  },
  completed: {
    label: 'Completed',
    className: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100',
  },
  returned: {
    label: 'Returned',
    className: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
  },
  'at-risk': {
    label: 'At Risk',
    className: 'bg-red-100 text-red-800 hover:bg-red-100',
  },
  'on-hold': {
    label: 'On Hold',
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-200 text-red-900 hover:bg-red-200',
  },
};

export function CoOpStatusChip({ status, size = 'md' }: CoOpStatusChipProps) {
  const config = statusConfig[status];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <Badge className={`${config.className} ${sizeClasses[size]} font-medium`}>
      {config.label}
    </Badge>
  );
}
