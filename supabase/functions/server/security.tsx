/**
 * KiEX Security Module
 * Comprehensive security measures to protect against common attacks
 */

import { Context } from 'npm:hono';

// ============================================
// 1. RATE LIMITING - Prevent DDoS & Brute Force
// ============================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function rateLimit(options: {
  windowMs: number;      // Time window in milliseconds
  maxRequests: number;   // Max requests per window
  message?: string;
}) {
  return async (c: Context, next: () => Promise<void>) => {
    const identifier = c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip') || 'unknown';
    const now = Date.now();
    
    // Clean up expired entries
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }

    const key = `${identifier}:${c.req.path}`;
    const entry = rateLimitStore.get(key);

    if (!entry || entry.resetTime < now) {
      // New window
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + options.windowMs,
      });
    } else {
      // Within window
      entry.count++;
      
      if (entry.count > options.maxRequests) {
        console.warn(`⚠️ SECURITY: Rate limit exceeded for ${identifier} on ${c.req.path}`);
        return c.json({
          error: options.message || 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((entry.resetTime - now) / 1000),
        }, 429);
      }
    }

    await next();
  };
}

// ============================================
// 2. INPUT VALIDATION & SANITIZATION
// ============================================

/**
 * Sanitize input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone number (international format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Validate password strength
 */
export function isStrongPassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Prevent SQL Injection by validating input
 */
export function validateNoSQLInjection(input: string): boolean {
  // Check for common SQL injection patterns
  const sqlPatterns = [
    /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/i,
    /'\s*(OR|AND)\s*'?\d+/i,
    /UNION.*SELECT/i,
    /DROP\s+TABLE/i,
    /DELETE\s+FROM/i,
    /INSERT\s+INTO/i,
    /UPDATE\s+\w+\s+SET/i,
    /-{2}/, // SQL comments
    /\/\*.*\*\//, // SQL comments
  ];

  return !sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Input validation middleware
 */
export function validateInput(schema: {
  [key: string]: {
    required?: boolean;
    type?: 'string' | 'number' | 'email' | 'phone' | 'boolean';
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}) {
  return async (c: Context, next: () => Promise<void>) => {
    let body: any;
    
    try {
      body = await c.req.json();
    } catch (error) {
      return c.json({ error: 'Invalid JSON body' }, 400);
    }

    const errors: string[] = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = body[field];

      // Required check
      if (rules.required && (value === undefined || value === null || value === '')) {
        errors.push(`${field} is required`);
        continue;
      }

      // Skip validation if not required and empty
      if (!rules.required && (value === undefined || value === null || value === '')) {
        continue;
      }

      // Type validation
      if (rules.type) {
        switch (rules.type) {
          case 'email':
            if (!isValidEmail(value)) {
              errors.push(`${field} must be a valid email`);
            }
            break;
          case 'phone':
            if (!isValidPhone(value)) {
              errors.push(`${field} must be a valid phone number`);
            }
            break;
          case 'string':
            if (typeof value !== 'string') {
              errors.push(`${field} must be a string`);
            }
            break;
          case 'number':
            if (typeof value !== 'number') {
              errors.push(`${field} must be a number`);
            }
            break;
        }
      }

      // Length validation
      if (typeof value === 'string') {
        if (rules.minLength && value.length < rules.minLength) {
          errors.push(`${field} must be at least ${rules.minLength} characters`);
        }
        if (rules.maxLength && value.length > rules.maxLength) {
          errors.push(`${field} must not exceed ${rules.maxLength} characters`);
        }

        // SQL Injection check
        if (!validateNoSQLInjection(value)) {
          console.error(`⚠️ SECURITY: Potential SQL injection attempt in ${field}: ${value}`);
          errors.push(`${field} contains invalid characters`);
        }
      }

      // Pattern validation
      if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
        errors.push(`${field} format is invalid`);
      }
    }

    if (errors.length > 0) {
      console.warn(`⚠️ SECURITY: Input validation failed:`, errors);
      return c.json({ error: 'Validation failed', details: errors }, 400);
    }

    await next();
  };
}

// ============================================
// 3. SECURE HEADERS - Prevent Common Attacks
// ============================================

export function securityHeaders() {
  return async (c: Context, next: () => Promise<void>) => {
    await next();

    // Prevent clickjacking
    c.res.headers.set('X-Frame-Options', 'DENY');
    
    // Prevent MIME type sniffing
    c.res.headers.set('X-Content-Type-Options', 'nosniff');
    
    // Enable XSS protection
    c.res.headers.set('X-XSS-Protection', '1; mode=block');
    
    // Strict Transport Security (force HTTPS)
    c.res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    
    // Content Security Policy
    c.res.headers.set('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https: blob:; " +
      "connect-src 'self' https://*.supabase.co"
    );
    
    // Referrer Policy
    c.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Permissions Policy
    c.res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  };
}

// ============================================
// 4. FILE UPLOAD VALIDATION
// ============================================

const ALLOWED_FILE_TYPES = {
  resume: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  transcript: ['application/pdf'],
  image: ['image/jpeg', 'image/png', 'image/webp'],
};

const MAX_FILE_SIZES = {
  resume: 5 * 1024 * 1024,      // 5MB
  transcript: 10 * 1024 * 1024, // 10MB
  image: 2 * 1024 * 1024,       // 2MB
};

export function validateFileUpload(file: File, type: keyof typeof ALLOWED_FILE_TYPES): {
  valid: boolean;
  error?: string;
} {
  // Check file type
  if (!ALLOWED_FILE_TYPES[type].includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES[type].join(', ')}`,
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZES[type]) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${MAX_FILE_SIZES[type] / 1024 / 1024}MB`,
    };
  }

  // Check for malicious file names
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    return {
      valid: false,
      error: 'Invalid file name',
    };
  }

  return { valid: true };
}

// ============================================
// 5. AUTHENTICATION SECURITY
// ============================================

/**
 * Verify JWT token and extract user info
 */
export async function verifyAuthToken(c: Context): Promise<{
  valid: boolean;
  userId?: string;
  error?: string;
}> {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { valid: false, error: 'Missing or invalid authorization header' };
  }

  const token = authHeader.substring(7);

  try {
    // In production, verify with Supabase
    const { createClient } = await import('npm:@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.warn('⚠️ SECURITY: Invalid authentication token');
      return { valid: false, error: 'Invalid authentication token' };
    }

    return { valid: true, userId: user.id };
  } catch (error) {
    console.error('⚠️ SECURITY: Authentication error:', error);
    return { valid: false, error: 'Authentication failed' };
  }
}

/**
 * Require authentication middleware
 */
export function requireAuth() {
  return async (c: Context, next: () => Promise<void>) => {
    const { valid, userId, error } = await verifyAuthToken(c);

    if (!valid) {
      return c.json({ error: error || 'Unauthorized' }, 401);
    }

    // Store userId in context for later use
    c.set('userId', userId);
    await next();
  };
}

/**
 * Require specific role middleware
 */
export function requireRole(allowedRoles: string[]) {
  return async (c: Context, next: () => Promise<void>) => {
    const userId = c.get('userId');
    
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // In production, check user role from database
    // For now, we'll assume employers have role in token
    const userRole = c.req.header('X-User-Role') || 'student';

    if (!allowedRoles.includes(userRole)) {
      console.warn(`⚠️ SECURITY: Unauthorized role access attempt. User: ${userId}, Required: ${allowedRoles}`);
      return c.json({ error: 'Forbidden - insufficient permissions' }, 403);
    }

    await next();
  };
}

// ============================================
// 6. AUDIT LOGGING
// ============================================

export interface SecurityEvent {
  timestamp: Date;
  eventType: 'login' | 'logout' | 'failed_login' | 'data_access' | 'data_modification' | 'suspicious_activity';
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Log security events for audit trail
 */
export async function logSecurityEvent(event: SecurityEvent): Promise<void> {
  // Format log entry
  const logEntry = {
    timestamp: event.timestamp.toISOString(),
    eventType: event.eventType,
    userId: event.userId || 'anonymous',
    ipAddress: event.ipAddress || 'unknown',
    userAgent: event.userAgent || 'unknown',
    details: event.details,
    severity: event.severity,
  };

  // Log to console (in production, send to monitoring service)
  const emoji = {
    low: 'ℹ️',
    medium: '⚠️',
    high: '🚨',
    critical: '🔥',
  }[event.severity];

  console.log(`${emoji} SECURITY EVENT:`, JSON.stringify(logEntry, null, 2));

  // In production, also store in database for compliance
  try {
    const { createClient } = await import('npm:@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store in security_logs table (would need to create this table)
    await supabase.from('security_logs_9bd83859').insert([logEntry]);
  } catch (error) {
    console.error('Failed to store security log:', error);
  }
}

/**
 * Audit logging middleware
 */
export function auditLog(eventType: SecurityEvent['eventType']) {
  return async (c: Context, next: () => Promise<void>) => {
    const userId = c.get('userId');
    const ipAddress = c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip');
    const userAgent = c.req.header('user-agent');

    await logSecurityEvent({
      timestamp: new Date(),
      eventType,
      userId,
      ipAddress,
      userAgent,
      details: `${c.req.method} ${c.req.path}`,
      severity: 'low',
    });

    await next();
  };
}

// ============================================
// 7. ENVIRONMENT VALIDATION
// ============================================

export function validateEnvironment(): void {
  const requiredVars = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'SUPABASE_ANON_KEY',
  ];

  const missing = requiredVars.filter(varName => !Deno.env.get(varName));

  if (missing.length > 0) {
    throw new Error(`🔥 CRITICAL: Missing required environment variables: ${missing.join(', ')}`);
  }

  console.log('✅ Environment variables validated');
}

// ============================================
// 8. DATA ENCRYPTION HELPERS
// ============================================

/**
 * Hash sensitive data (one-way)
 */
export async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// ============================================
// EXPORT SECURITY UTILITIES
// ============================================

export const Security = {
  rateLimit,
  sanitizeInput,
  isValidEmail,
  isValidPhone,
  isStrongPassword,
  validateNoSQLInjection,
  validateInput,
  securityHeaders,
  validateFileUpload,
  verifyAuthToken,
  requireAuth,
  requireRole,
  logSecurityEvent,
  auditLog,
  validateEnvironment,
  hashData,
  generateSecureToken,
};
