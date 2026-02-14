/*
 * ZALPHA Platform - Pacific Co-Op & Work-Based Learning Hub
 * Reusable Card Component
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CoOpCardProps {
  title: string;
  description?: string;
  value?: string | number;
  icon?: LucideIcon;
  iconColor?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function CoOpCard({
  title,
  description,
  value,
  icon: Icon,
  iconColor = "text-blue-600",
  footer,
  children,
  className = "",
  onClick,
}: CoOpCardProps) {
  return (
    <Card 
      className={`${className} ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {Icon && (
            <div className={`p-2 rounded-lg bg-gray-50 ${iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
        {value !== undefined && (
          <div className="text-3xl font-bold mt-2">{value}</div>
        )}
      </CardHeader>
      {(children || footer) && (
        <CardContent>
          {children}
          {footer && <div className="mt-4 pt-4 border-t">{footer}</div>}
        </CardContent>
      )}
    </Card>
  );
}

export function CoOpKPICard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-blue-600",
  trend = "neutral",
}: {
  title: string;
  value: string | number;
  change?: string;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: "up" | "down" | "neutral";
}) {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-600",
  };

  return (
    <CoOpCard title={title} value={value} icon={Icon} iconColor={iconColor}>
      {change && (
        <div className={`text-sm font-medium ${trendColors[trend]}`}>
          {change}
        </div>
      )}
    </CoOpCard>
  );
}
