import { errorHandler, isNetworkError } from './errorHandler';

/**
 * Network Request Options
 */
interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  retryOn?: number[];
  onRetry?: (attempt: number, error: Error) => void;
}

/**
 * API Response wrapper
 */
interface APIResponse<T = any> {
  data: T | null;
  error: Error | null;
  status: number | null;
}

/**
 * Network utilities with retry logic and error handling
 */
class NetworkService {
  private baseURL: string = '';
  private defaultTimeout: number = 30000; // 30 seconds
  private defaultRetries: number = 3;
  private defaultRetryDelay: number = 1000; // 1 second

  constructor() {
    this.setupNetworkMonitoring();
  }

  /**
   * Monitor network status
   */
  private setupNetworkMonitoring() {
    window.addEventListener('online', () => {
      errorHandler.logInfo('Network connection restored');
      this.showNetworkNotification('Back online', 'success');
    });

    window.addEventListener('offline', () => {
      errorHandler.handleWarning({
        message: 'Network connection lost',
      });
      this.showNetworkNotification('You are offline', 'error');
    });
  }

  /**
   * Show network notification
   */
  private showNetworkNotification(message: string, type: 'success' | 'error') {
    // In production, integrate with your toast notification system
    console.log(`Network notification [${type}]:`, message);
  }

  /**
   * Set base URL for API calls
   */
  setBaseURL(url: string) {
    this.baseURL = url;
  }

  /**
   * Create AbortController with timeout
   */
  private createTimeoutController(timeout: number): AbortController {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    // Clear timeout if request completes
    controller.signal.addEventListener('abort', () => clearTimeout(timeoutId));
    
    return controller;
  }

  /**
   * Wait with exponential backoff
   */
  private async wait(attempt: number, baseDelay: number): Promise<void> {
    const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Fetch with retry logic
   */
  async fetchWithRetry<T = any>(
    url: string,
    options: RequestOptions = {}
  ): Promise<APIResponse<T>> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      retryDelay = this.defaultRetryDelay,
      retryOn = [408, 429, 500, 502, 503, 504], // Retry on these status codes
      onRetry,
      ...fetchOptions
    } = options;

    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Check network status
        if (!navigator.onLine) {
          throw new Error('No internet connection');
        }

        // Create timeout controller
        const controller = this.createTimeoutController(timeout);
        
        // Make request
        const response = await fetch(fullURL, {
          ...fetchOptions,
          signal: controller.signal,
        });

        // Check if we should retry based on status code
        if (!response.ok && retryOn.includes(response.status) && attempt < retries) {
          lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
          
          if (onRetry) {
            onRetry(attempt, lastError);
          }

          errorHandler.handleWarning({
            message: `Request failed (attempt ${attempt}/${retries}): ${lastError.message}`,
            context: { url: fullURL, status: response.status },
          });

          await this.wait(attempt, retryDelay);
          continue;
        }

        // Parse response
        const contentType = response.headers.get('content-type');
        let data: T | null = null;

        if (contentType?.includes('application/json')) {
          data = await response.json();
        } else if (contentType?.includes('text/')) {
          data = (await response.text()) as any;
        }

        // Return successful response
        if (response.ok) {
          return { data, error: null, status: response.status };
        }

        // Return error response (no more retries)
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        errorHandler.handleError({
          message: `API request failed: ${error.message}`,
          context: { url: fullURL, status: response.status, data },
        });

        return { data, error, status: response.status };

      } catch (error: any) {
        lastError = error;

        // Handle abort/timeout
        if (error.name === 'AbortError') {
          lastError = new Error('Request timeout');
        }

        // Handle network errors
        if (isNetworkError(error)) {
          lastError = new Error('Network error - please check your connection');
        }

        // Retry if not last attempt
        if (attempt < retries) {
          if (onRetry) {
            onRetry(attempt, lastError);
          }

          errorHandler.handleWarning({
            message: `Request failed (attempt ${attempt}/${retries}): ${lastError.message}`,
            context: { url: fullURL },
          });

          await this.wait(attempt, retryDelay);
          continue;
        }

        // Last attempt failed - log error
        errorHandler.handleError({
          message: `Request failed after ${retries} attempts: ${lastError.message}`,
          stack: lastError.stack,
          context: { url: fullURL, attempts: retries },
        });

        return { data: null, error: lastError, status: null };
      }
    }

    // Should never reach here, but TypeScript needs it
    return { 
      data: null, 
      error: lastError || new Error('Unknown error'), 
      status: null 
    };
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, options?: RequestOptions): Promise<APIResponse<T>> {
    return this.fetchWithRetry<T>(url, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string, 
    body?: any, 
    options?: RequestOptions
  ): Promise<APIResponse<T>> {
    return this.fetchWithRetry<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string, 
    body?: any, 
    options?: RequestOptions
  ): Promise<APIResponse<T>> {
    return this.fetchWithRetry<T>(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, options?: RequestOptions): Promise<APIResponse<T>> {
    return this.fetchWithRetry<T>(url, { ...options, method: 'DELETE' });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string, 
    body?: any, 
    options?: RequestOptions
  ): Promise<APIResponse<T>> {
    return this.fetchWithRetry<T>(url, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Upload file with progress
   */
  async uploadFile(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<APIResponse<any>> {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', file);

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });

      // Handle completion
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve({ data, error: null, status: xhr.status });
          } catch {
            resolve({ data: xhr.responseText, error: null, status: xhr.status });
          }
        } else {
          const error = new Error(`Upload failed: ${xhr.statusText}`);
          errorHandler.handleError({
            message: error.message,
            context: { status: xhr.status, url },
          });
          resolve({ data: null, error, status: xhr.status });
        }
      });

      // Handle errors
      xhr.addEventListener('error', () => {
        const error = new Error('Upload failed - network error');
        errorHandler.handleError({
          message: error.message,
          context: { url },
        });
        resolve({ data: null, error, status: null });
      });

      // Handle timeout
      xhr.addEventListener('timeout', () => {
        const error = new Error('Upload timeout');
        errorHandler.handleError({
          message: error.message,
          context: { url },
        });
        resolve({ data: null, error, status: null });
      });

      // Send request
      xhr.open('POST', url.startsWith('http') ? url : `${this.baseURL}${url}`);
      xhr.timeout = 120000; // 2 minutes for file uploads
      xhr.send(formData);
    });
  }

  /**
   * Batch requests with concurrency limit
   */
  async batch<T = any>(
    requests: Array<() => Promise<APIResponse<T>>>,
    concurrency: number = 3
  ): Promise<APIResponse<T>[]> {
    const results: APIResponse<T>[] = [];
    const executing: Promise<void>[] = [];

    for (const request of requests) {
      const promise = request().then(result => {
        results.push(result);
      });

      executing.push(promise);

      if (executing.length >= concurrency) {
        await Promise.race(executing);
        executing.splice(executing.findIndex(p => p === promise), 1);
      }
    }

    await Promise.all(executing);
    return results;
  }

  /**
   * Check if URL is reachable
   */
  async ping(url: string): Promise<boolean> {
    try {
      const response = await this.fetchWithRetry(url, {
        method: 'HEAD',
        timeout: 5000,
        retries: 1,
      });
      return response.error === null;
    } catch {
      return false;
    }
  }
}

// Create singleton instance
export const networkService = new NetworkService();

/**
 * React hook for API calls with loading and error states
 */
export function useAPI<T = any>(
  url: string,
  options?: RequestOptions
) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const execute = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    const response = await networkService.get<T>(url, options);

    setData(response.data);
    setError(response.error);
    setLoading(false);

    return response;
  }, [url, options]);

  return { data, loading, error, execute };
}

// Export for convenience
export default networkService;

// Make available in console for debugging
if (typeof window !== 'undefined') {
  (window as any).kiexNetwork = networkService;
}
