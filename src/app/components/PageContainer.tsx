import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`pt-16 sm:pt-20 min-h-screen ${className}`}>
      {children}
    </div>
  );
}
