import { useEffect, useRef, useState } from 'react';

interface AnalyticsEvent {
  userId: string;
  userType: 'student' | 'employer' | 'career-services';
  eventType: 'page_view' | 'click' | 'feature_use' | 'time_on_page' | 'scroll' | 'form_interaction';
  pageName: string;
  elementId?: string;
  elementType?: string;
  elementText?: string;
  timestamp: number;
  sessionId: string;
  duration?: number; // for time_on_page events
  scrollDepth?: number; // percentage scrolled
  metadata?: any;
}

interface SessionData {
  sessionId: string;
  userId: string;
  userType: 'student' | 'employer' | 'career-services';
  startTime: number;
  endTime?: number;
  pagesVisited: string[];
  totalClicks: number;
  mostClickedElements: { [key: string]: number };
  averageTimePerPage: { [key: string]: number };
  featuresUsed: string[];
  completedRatings: string[];
}

// Generate unique session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('beta_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('beta_session_id', sessionId);
  }
  return sessionId;
}

export function useBetaAnalytics(
  userId: string,
  userType: 'student' | 'employer' | 'career-services',
  pageName: string,
  options: {
    trackClicks?: boolean;
    trackTime?: boolean;
    trackScroll?: boolean;
    trackHover?: boolean;
    enabledAfterRating?: boolean; // Only track after user completes initial ratings
  } = {}
) {
  const {
    trackClicks = true,
    trackTime = true,
    trackScroll = true,
    trackHover = false,
    enabledAfterRating = false
  } = options;

  const [sessionId] = useState(getSessionId());
  const pageStartTime = useRef(Date.now());
  const clickCounts = useRef<{ [key: string]: number }>({});
  const hasTrackedPageView = useRef(false);
  const scrollDepthRef = useRef(0);
  const hoverTimers = useRef<{ [key: string]: number }>({});

  // Check if user has completed ratings (if required)
  const [canTrack, setCanTrack] = useState(!enabledAfterRating);

  useEffect(() => {
    if (enabledAfterRating) {
      // Check localStorage for completed ratings
      const completedRatings = localStorage.getItem(`beta_ratings_${userId}`);
      if (completedRatings) {
        setCanTrack(true);
      }
    }
  }, [userId, enabledAfterRating]);

  // Send analytics event to backend
  const sendAnalytics = async (event: Omit<AnalyticsEvent, 'userId' | 'userType' | 'sessionId' | 'timestamp'>) => {
    if (!canTrack) return;

    const analyticsEvent: AnalyticsEvent = {
      ...event,
      userId,
      userType,
      sessionId,
      timestamp: Date.now()
    };

    try {
      // Store locally for demo (in production, send to backend)
      const existingData = localStorage.getItem('beta_analytics') || '[]';
      const analytics = JSON.parse(existingData);
      analytics.push(analyticsEvent);
      
      // Keep only last 1000 events to prevent storage issues
      if (analytics.length > 1000) {
        analytics.shift();
      }
      
      localStorage.setItem('beta_analytics', JSON.stringify(analytics));

      // Also send to backend API (uncomment in production)
      // await fetch('/api/beta-analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(analyticsEvent)
      // });

      console.log('📊 Beta Analytics:', analyticsEvent);
    } catch (error) {
      console.error('Failed to send analytics:', error);
    }
  };

  // Track page view
  useEffect(() => {
    if (!hasTrackedPageView.current && canTrack) {
      sendAnalytics({
        eventType: 'page_view',
        pageName
      });
      hasTrackedPageView.current = true;
    }
  }, [pageName, canTrack]);

  // Track time on page
  useEffect(() => {
    if (!trackTime || !canTrack) return;

    const handleBeforeUnload = () => {
      const duration = Date.now() - pageStartTime.current;
      sendAnalytics({
        eventType: 'time_on_page',
        pageName,
        duration
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Also track when navigating away
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      const duration = Date.now() - pageStartTime.current;
      sendAnalytics({
        eventType: 'time_on_page',
        pageName,
        duration
      });
    };
  }, [pageName, trackTime, canTrack]);

  // Track clicks
  useEffect(() => {
    if (!trackClicks || !canTrack) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementId = target.id || target.getAttribute('data-analytics-id');
      const elementType = target.tagName.toLowerCase();
      const elementText = target.textContent?.substring(0, 100) || '';

      // Track click count
      const key = elementId || elementText;
      clickCounts.current[key] = (clickCounts.current[key] || 0) + 1;

      sendAnalytics({
        eventType: 'click',
        pageName,
        elementId,
        elementType,
        elementText,
        metadata: {
          clickCount: clickCounts.current[key],
          classList: Array.from(target.classList)
        }
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pageName, trackClicks, canTrack]);

  // Track scroll depth
  useEffect(() => {
    if (!trackScroll || !canTrack) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollDepth = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);

      // Only track significant changes (every 10%)
      if (scrollDepth > scrollDepthRef.current + 10) {
        scrollDepthRef.current = Math.floor(scrollDepth / 10) * 10;
        sendAnalytics({
          eventType: 'scroll',
          pageName,
          scrollDepth: scrollDepthRef.current
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageName, trackScroll, canTrack]);

  // Track hover (optional - for UX insights)
  useEffect(() => {
    if (!trackHover || !canTrack) return;

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementId = target.id || target.getAttribute('data-analytics-id');
      if (!elementId) return;

      hoverTimers.current[elementId] = Date.now();
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementId = target.id || target.getAttribute('data-analytics-id');
      if (!elementId || !hoverTimers.current[elementId]) return;

      const hoverDuration = Date.now() - hoverTimers.current[elementId];
      
      // Only track meaningful hovers (> 500ms)
      if (hoverDuration > 500) {
        sendAnalytics({
          eventType: 'feature_use',
          pageName,
          elementId,
          metadata: {
            action: 'hover',
            duration: hoverDuration
          }
        });
      }

      delete hoverTimers.current[elementId];
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [pageName, trackHover, canTrack]);

  // Manual tracking functions for specific features
  const trackFeatureUse = (featureName: string, metadata?: any) => {
    if (!canTrack) return;
    sendAnalytics({
      eventType: 'feature_use',
      pageName,
      elementId: featureName,
      metadata
    });
  };

  const trackFormInteraction = (formName: string, fieldName: string, action: 'focus' | 'blur' | 'change') => {
    if (!canTrack) return;
    sendAnalytics({
      eventType: 'form_interaction',
      pageName,
      elementId: formName,
      metadata: {
        fieldName,
        action
      }
    });
  };

  return {
    trackFeatureUse,
    trackFormInteraction,
    sessionId,
    canTrack
  };
}

// Hook to get analytics summary for a user
export function useBetaAnalyticsSummary(userId: string) {
  const [summary, setSummary] = useState<{
    totalSessions: number;
    totalTimeSpent: number;
    pagesVisited: { [key: string]: number };
    mostClickedElements: Array<{ element: string; clicks: number }>;
    featuresUsed: { [key: string]: number };
    averageSessionDuration: number;
  } | null>(null);

  useEffect(() => {
    const loadSummary = () => {
      try {
        const data = localStorage.getItem('beta_analytics');
        if (!data) {
          setSummary(null);
          return;
        }

        const analytics: AnalyticsEvent[] = JSON.parse(data);
        const userAnalytics = analytics.filter(e => e.userId === userId);

        // Calculate summary
        const sessions = new Set(userAnalytics.map(e => e.sessionId));
        const totalTime = userAnalytics
          .filter(e => e.eventType === 'time_on_page')
          .reduce((sum, e) => sum + (e.duration || 0), 0);

        const pagesVisited: { [key: string]: number } = {};
        const clickedElements: { [key: string]: number } = {};
        const featuresUsed: { [key: string]: number } = {};

        userAnalytics.forEach(event => {
          if (event.eventType === 'page_view') {
            pagesVisited[event.pageName] = (pagesVisited[event.pageName] || 0) + 1;
          }
          if (event.eventType === 'click' && event.elementId) {
            clickedElements[event.elementId] = (clickedElements[event.elementId] || 0) + 1;
          }
          if (event.eventType === 'feature_use' && event.elementId) {
            featuresUsed[event.elementId] = (featuresUsed[event.elementId] || 0) + 1;
          }
        });

        const mostClicked = Object.entries(clickedElements)
          .map(([element, clicks]) => ({ element, clicks }))
          .sort((a, b) => b.clicks - a.clicks)
          .slice(0, 10);

        setSummary({
          totalSessions: sessions.size,
          totalTimeSpent: totalTime,
          pagesVisited,
          mostClickedElements: mostClicked,
          featuresUsed,
          averageSessionDuration: sessions.size > 0 ? totalTime / sessions.size : 0
        });
      } catch (error) {
        console.error('Failed to load analytics summary:', error);
        setSummary(null);
      }
    };

    loadSummary();
  }, [userId]);

  return summary;
}

// Mark that user has completed initial ratings
export function markRatingsComplete(userId: string) {
  localStorage.setItem(`beta_ratings_${userId}`, 'true');
}

// Check if user has completed ratings
export function hasCompletedRatings(userId: string): boolean {
  return localStorage.getItem(`beta_ratings_${userId}`) === 'true';
}
