import { Loader, AlertCircle, Wifi, WifiOff, RefreshCw } from 'lucide-react';

/**
 * Loading Spinner
 */
export function LoadingSpinner({ 
  size = 'md', 
  message = 'Loading...' 
}: { 
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
  message?: string;
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader className={`${sizeClasses[size]} text-blue-600 animate-spin mb-3`} />
      {message && <p className="text-gray-600 text-sm">{message}</p>}
    </div>
  );
}

/**
 * Full Page Loading
 */
export function PageLoading({ message = 'Loading page...' }: { message?: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Loader className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ZALPHA</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

/**
 * Skeleton Loader for cards
 */
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}

/**
 * Skeleton Loader for lists
 */
export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/**
 * Empty State
 */
export function EmptyState({ 
  icon: Icon = AlertCircle,
  title = 'No data found',
  description = 'There is no data to display',
  action,
  actionLabel,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
  description?: string;
  action?: () => void;
  actionLabel?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && actionLabel && (
        <button
          onClick={action}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/**
 * Network Error State
 */
export function NetworkError({ 
  onRetry,
  message = 'Unable to connect to the server',
}: {
  onRetry?: () => void;
  message?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-red-200">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <WifiOff className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h3>
        <p className="text-gray-600 mb-6 max-w-md">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Offline Banner
 */
export function OfflineBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <WifiOff className="w-5 h-5" />
        <span className="font-semibold">You are currently offline</span>
      </div>
    </div>
  );
}

/**
 * Online Banner
 */
export function OnlineBanner({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-green-500 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5" />
          <span className="font-semibold">Back online</span>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-white hover:text-green-100 font-semibold text-sm"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Retry Button Component
 */
export function RetryButton({ 
  onRetry, 
  loading = false,
  label = 'Retry'
}: {
  onRetry: () => void;
  loading?: boolean;
  label?: string;
}) {
  return (
    <button
      onClick={onRetry}
      disabled={loading}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          Retrying...
        </>
      ) : (
        <>
          <RefreshCw className="w-5 h-5" />
          {label}
        </>
      )}
    </button>
  );
}

/**
 * Error Alert Component
 */
export function ErrorAlert({ 
  message, 
  onDismiss,
  onRetry,
}: {
  message: string;
  onDismiss?: () => void;
  onRetry?: () => void;
}) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-bold text-red-900 mb-1">Error</h4>
          <p className="text-sm text-red-800">{message}</p>
        </div>
        <div className="flex gap-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Retry
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Success Alert Component
 */
export function SuccessAlert({ 
  message, 
  onDismiss,
}: {
  message: string;
  onDismiss?: () => void;
}) {
  return (
    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-xs">✓</span>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-green-900 mb-1">Success</h4>
          <p className="text-sm text-green-800">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-sm font-semibold text-green-600 hover:text-green-700"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Loading Overlay
 */
export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm">
        <LoadingSpinner size="xl" message={message} />
      </div>
    </div>
  );
}

/**
 * Progress Bar
 */
export function ProgressBar({ 
  progress, 
  label,
  showPercentage = true,
}: {
  progress: number;
  label?: string;
  showPercentage?: boolean;
}) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm font-semibold text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-bold text-blue-600">{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Timeout Warning
 */
export function TimeoutWarning({ 
  onExtend, 
  secondsLeft,
}: {
  onExtend: () => void;
  secondsLeft: number;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg shadow-xl p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-bold text-yellow-900 mb-1">Session Expiring</h4>
            <p className="text-sm text-yellow-800 mb-3">
              Your session will expire in {secondsLeft} seconds due to inactivity.
            </p>
            <button
              onClick={onExtend}
              className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold text-sm"
            >
              Stay Logged In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Data Table Skeleton
 */
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-t border-gray-100">
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Suspense Fallback
 */
export function SuspenseFallback({ message = 'Loading component...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
}