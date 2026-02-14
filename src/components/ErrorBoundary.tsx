import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'app' | 'page' | 'component';
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Prevents the entire app from crashing
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Update state with error details
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to error reporting service (in production)
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // In production, send to error tracking service (Sentry, LogRocket, etc.)
    try {
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        level: this.props.level || 'component',
      };

      // Send to your error logging endpoint
      // fetch('/api/log-error', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData),
      // });

      // Store in localStorage for debugging
      const errors = JSON.parse(localStorage.getItem('zalpha_errors') || '[]');
      errors.push(errorData);
      // Keep only last 10 errors
      if (errors.length > 10) errors.shift();
      localStorage.setItem('zalpha_errors', JSON.stringify(errors));
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI based on level
      const { level = 'component' } = this.props;
      const { error, errorInfo, errorCount } = this.state;

      // App-level error (critical)
      if (level === 'app') {
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-red-200">
                {/* Icon */}
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
                  Oops! Something went wrong
                </h1>
                <p className="text-gray-600 text-center mb-8">
                  We're sorry, but the application encountered an unexpected error. 
                  Don't worry, your data is safe. Please try refreshing the page.
                </p>

                {/* Error Details (Development only) */}
                {process.env.NODE_ENV === 'development' && error && (
                  <div className="mb-6 bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                      <Bug className="w-5 h-5" />
                      Error Details (Dev Only)
                    </h3>
                    <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                      <p className="text-sm font-mono text-red-800 break-all">
                        {error.toString()}
                      </p>
                    </div>
                    {errorInfo && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm font-semibold text-gray-700">
                          Component Stack
                        </summary>
                        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                          {errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </div>
                )}

                {/* Error Count Warning */}
                {errorCount > 2 && (
                  <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>⚠️ Multiple errors detected ({errorCount})</strong>
                      <br />
                      There may be a persistent issue. Consider clearing your browser cache or contacting support.
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={this.handleReload}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-bold flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reload Page
                  </button>
                  <button
                    onClick={this.handleGoHome}
                    className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    Go to Homepage
                  </button>
                </div>

                {/* Support Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    Still having issues?{' '}
                    <a href="mailto:support@zalpharecruit.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                      Contact Support
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // Page-level error
      if (level === 'page') {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 border-2 border-orange-200">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                This page encountered an error
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Something went wrong loading this page. You can try refreshing or go back to the previous page.
              </p>

              {process.env.NODE_ENV === 'development' && error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-xs font-mono text-red-800 break-all">
                    {error.toString()}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={this.handleReset}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Component-level error (inline)
      return (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-2">Component Error</h3>
              <p className="text-sm text-red-800 mb-3">
                This component encountered an error and couldn't be displayed.
              </p>
              
              {process.env.NODE_ENV === 'development' && error && (
                <div className="bg-white border border-red-300 rounded p-2 mb-3">
                  <p className="text-xs font-mono text-red-900 break-all">
                    {error.toString()}
                  </p>
                </div>
              )}

              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-semibold flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Convenience wrapper for app-level error boundary
export function AppErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary level="app">
      {children}
    </ErrorBoundary>
  );
}

// Convenience wrapper for page-level error boundary
export function PageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary level="page">
      {children}
    </ErrorBoundary>
  );
}

// Convenience wrapper for component-level error boundary
export function ComponentErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary level="component">
      {children}
    </ErrorBoundary>
  );
}