/**
 * Mobile Optimization Utilities
 * Ensures proper layering, responsive behavior, and touch interactions
 */

// Z-Index Scale - Ensures no overlay conflicts
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  navigation: 30,
  mobileMenu: 40,
  overlay: 50,
  modal: 60,
  popover: 70,
  tooltip: 80,
  toast: 90,
  chatbot: 100,
} as const;

// Breakpoints matching Tailwind defaults
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Detect if user is on mobile device
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Detect iOS specifically
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

// Detect Android specifically
export function isAndroid(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android/.test(navigator.userAgent);
}

// Get viewport dimensions
export function getViewport() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

// Check if viewport is mobile size
export function isMobileViewport(): boolean {
  const { width } = getViewport();
  return width < BREAKPOINTS.md;
}

// Prevent body scroll (for modals)
export function disableBodyScroll() {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '0px'; // Prevent layout shift
}

// Re-enable body scroll
export function enableBodyScroll() {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

// Smooth scroll to element (mobile-friendly)
export function scrollToElement(elementId: string, offset: number = 80) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

// Safe area insets for iOS notch/home indicator
export function getSafeAreaInsets() {
  if (typeof window === 'undefined' || !isIOS()) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  const computedStyle = getComputedStyle(document.documentElement);
  return {
    top: parseInt(computedStyle.getPropertyValue('--sat') || '0'),
    right: parseInt(computedStyle.getPropertyValue('--sar') || '0'),
    bottom: parseInt(computedStyle.getPropertyValue('--sab') || '0'),
    left: parseInt(computedStyle.getPropertyValue('--sal') || '0'),
  };
}

// Touch-friendly minimum tap target size (44x44px per iOS guidelines)
export const MIN_TOUCH_TARGET = 44;

// Debounce for scroll/resize events
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle for performance-critical events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}

// Mobile-optimized class names
export const mobileClasses = {
  // Touch targets
  touchTarget: 'min-h-[44px] min-w-[44px]',
  
  // Safe spacing for mobile
  safePadding: 'px-4 sm:px-6 lg:px-8',
  safeMargin: 'mx-4 sm:mx-6 lg:mx-8',
  
  // Full width on mobile, constrained on desktop
  responsiveWidth: 'w-full max-w-7xl mx-auto',
  
  // Mobile-first text sizes
  headingLarge: 'text-3xl sm:text-4xl lg:text-5xl',
  headingMedium: 'text-2xl sm:text-3xl lg:text-4xl',
  headingSmall: 'text-xl sm:text-2xl lg:text-3xl',
  bodyLarge: 'text-base sm:text-lg',
  bodyNormal: 'text-sm sm:text-base',
  
  // Stack on mobile, side-by-side on desktop
  responsiveFlex: 'flex flex-col md:flex-row',
  
  // Grid responsive
  responsiveGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  
  // Modal/overlay classes
  modalOverlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6',
  modalContent: 'bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto',
  
  // Bottom sheet style (mobile-friendly alternative to modals)
  bottomSheet: 'fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto',
};

// Haptic feedback (iOS)
export function triggerHaptic(type: 'light' | 'medium' | 'heavy' = 'light') {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) return;
  
  const patterns = {
    light: 10,
    medium: 20,
    heavy: 30,
  };
  
  navigator.vibrate(patterns[type]);
}

export default {
  Z_INDEX,
  BREAKPOINTS,
  isMobileDevice,
  isIOS,
  isAndroid,
  getViewport,
  isMobileViewport,
  disableBodyScroll,
  enableBodyScroll,
  scrollToElement,
  getSafeAreaInsets,
  MIN_TOUCH_TARGET,
  debounce,
  throttle,
  isInViewport,
  mobileClasses,
  triggerHaptic,
};
