/**
 * Global Error Handler
 * Centralized error logging and handling system
 */

interface ErrorLog {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  stack?: string;
  timestamp: Date;
  url: string;
  userAgent: string;
  context?: Record<string, any>;
}

class ErrorHandlerService {
  private errors: ErrorLog[] = [];
  private maxErrors = 50;
  private isProduction = process.env.NODE_ENV === 'production';

  constructor() {
    this.setupGlobalHandlers();
    this.loadPersistedErrors();
  }

  /**
   * Set up global error handlers
   */
  private setupGlobalHandlers() {
    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      this.handleError({
        message: event.message,
        stack: event.error?.stack,
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
      
      // Prevent default only in production to avoid console spam
      if (this.isProduction) {
        event.preventDefault();
      }
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        context: { promise: event.promise },
      });

      // Prevent default only in production
      if (this.isProduction) {
        event.preventDefault();
      }
    });

    // Handle console errors (optional - captures console.error calls)
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      this.handleWarning({
        message: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' '),
      });
      originalConsoleError.apply(console, args);
    };
  }

  /**
   * Load persisted errors from localStorage
   */
  private loadPersistedErrors() {
    try {
      const stored = localStorage.getItem('kiex_errors');
      if (stored) {
        this.errors = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load persisted errors:', error);
    }
  }

  /**
   * Persist errors to localStorage
   */
  private persistErrors() {
    try {
      localStorage.setItem('kiex_errors', JSON.stringify(this.errors.slice(-this.maxErrors)));
    } catch (error) {
      console.warn('Failed to persist errors:', error);
    }
  }

  /**
   * Handle an error
   */
  handleError(options: {
    message: string;
    stack?: string;
    context?: Record<string, any>;
  }) {
    const errorLog: ErrorLog = {
      id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'error',
      message: options.message,
      stack: options.stack,
      timestamp: new Date(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context: options.context,
    };

    this.errors.push(errorLog);
    this.persistErrors();

    // Log to console in development
    if (!this.isProduction) {
      console.error('🚨 Error logged:', errorLog);
    }

    // Send to error tracking service in production
    if (this.isProduction) {
      this.sendToErrorService(errorLog);
    }

    return errorLog;
  }

  /**
   * Handle a warning
   */
  handleWarning(options: {
    message: string;
    context?: Record<string, any>;
  }) {
    const warningLog: ErrorLog = {
      id: `warn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'warning',
      message: options.message,
      timestamp: new Date(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context: options.context,
    };

    this.errors.push(warningLog);
    this.persistErrors();

    if (!this.isProduction) {
      console.warn('⚠️ Warning logged:', warningLog);
    }

    return warningLog;
  }

  /**
   * Log info message
   */
  logInfo(message: string, context?: Record<string, any>) {
    const infoLog: ErrorLog = {
      id: `info_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'info',
      message,
      timestamp: new Date(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context,
    };

    this.errors.push(infoLog);
    this.persistErrors();

    if (!this.isProduction) {
      console.info('ℹ️ Info logged:', infoLog);
    }

    return infoLog;
  }

  /**
   * Send error to remote logging service
   */
  private async sendToErrorService(errorLog: ErrorLog) {
    try {
      // In production, send to your error tracking service
      // Examples: Sentry, LogRocket, Rollbar, Bugsnag, etc.
      
      // Example with fetch to your own endpoint:
      // await fetch('/api/log-error', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorLog),
      // });

      // Example with Sentry:
      // if (window.Sentry) {
      //   window.Sentry.captureException(new Error(errorLog.message), {
      //     tags: { type: errorLog.type },
      //     contexts: { custom: errorLog.context },
      //   });
      // }

      // For now, just log that we would send it
      console.log('Would send to error service:', errorLog);
    } catch (sendError) {
      console.error('Failed to send error to service:', sendError);
    }
  }

  /**
   * Get all errors
   */
  getErrors(type?: 'error' | 'warning' | 'info'): ErrorLog[] {
    if (type) {
      return this.errors.filter(err => err.type === type);
    }
    return this.errors;
  }

  /**
   * Clear all errors
   */
  clearErrors() {
    this.errors = [];
    this.persistErrors();
  }

  /**
   * Get error count
   */
  getErrorCount(type?: 'error' | 'warning' | 'info'): number {
    return this.getErrors(type).length;
  }

  /**
   * Export errors as JSON for debugging
   */
  exportErrors(): string {
    return JSON.stringify(this.errors, null, 2);
  }

  /**
   * Check if app is in healthy state
   */
  isHealthy(): boolean {
    const recentErrors = this.errors.filter(err => 
      err.type === 'error' && 
      Date.now() - err.timestamp.getTime() < 60000 // Last minute
    );
    return recentErrors.length < 5; // Less than 5 errors in last minute
  }
}

// Create singleton instance
export const errorHandler = new ErrorHandlerService();

/**
 * Utility functions for common error scenarios
 */

// Safe async wrapper
export async function safeAsync<T>(
  promise: Promise<T>,
  errorMessage?: string
): Promise<[T | null, Error | null]> {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    const err = error as Error;
    errorHandler.handleError({
      message: errorMessage || err.message,
      stack: err.stack,
      context: { originalError: error },
    });
    return [null, err];
  }
}

// Safe sync wrapper
export function safeSyncFunction<T>(
  fn: () => T,
  fallback: T,
  errorMessage?: string
): T {
  try {
    return fn();
  } catch (error) {
    const err = error as Error;
    errorHandler.handleError({
      message: errorMessage || err.message,
      stack: err.stack,
    });
    return fallback;
  }
}

// Safe JSON parse
export function safeJSONParse<T>(
  json: string,
  fallback: T
): T {
  return safeSyncFunction(
    () => JSON.parse(json),
    fallback,
    'Failed to parse JSON'
  );
}

// Safe localStorage get
export function safeLocalStorageGet(
  key: string,
  fallback: string = ''
): string {
  return safeSyncFunction(
    () => localStorage.getItem(key) || fallback,
    fallback,
    `Failed to get localStorage item: ${key}`
  );
}

// Safe localStorage set
export function safeLocalStorageSet(
  key: string,
  value: string
): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    errorHandler.handleWarning({
      message: `Failed to set localStorage item: ${key}`,
      context: { error },
    });
    return false;
  }
}

/**
 * API error handler
 */
export function handleAPIError(error: any, context?: string): never {
  const message = error?.message || error?.toString() || 'Unknown API error';
  errorHandler.handleError({
    message: context ? `${context}: ${message}` : message,
    stack: error?.stack,
    context: {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
    },
  });
  throw error;
}

/**
 * Network error checker
 */
export function isNetworkError(error: any): boolean {
  return (
    error?.message === 'Network Error' ||
    error?.message === 'Failed to fetch' ||
    !navigator.onLine
  );
}

/**
 * React component error wrapper
 */
export function withErrorHandler<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
) {
  return function WithErrorHandlerWrapper(props: P) {
    try {
      return <Component {...props} />;
    } catch (error) {
      const err = error as Error;
      errorHandler.handleError({
        message: `Error in ${componentName || Component.displayName || Component.name}: ${err.message}`,
        stack: err.stack,
      });
      return (
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="text-red-800 text-sm">
            Failed to render {componentName || 'component'}
          </p>
        </div>
      );
    }
  };
}

// Export for debugging in console
if (typeof window !== 'undefined') {
  (window as any).kiexErrorHandler = errorHandler;
}

export default errorHandler;
