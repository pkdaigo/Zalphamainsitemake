/**
 * Form Validation Utilities
 * Prevents crashes from invalid user input
 */

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  phone?: boolean;
  custom?: (value: any) => boolean | string;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate a single field
 */
export function validateField(
  value: any,
  rules: ValidationRule,
  fieldName: string = 'Field'
): string | null {
  // Required check
  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return `${fieldName} is required`;
  }

  // If not required and empty, skip other validations
  if (!value) return null;

  const stringValue = String(value);

  // Min length
  if (rules.minLength !== undefined && stringValue.length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters`;
  }

  // Max length
  if (rules.maxLength !== undefined && stringValue.length > rules.maxLength) {
    return `${fieldName} must be at most ${rules.maxLength} characters`;
  }

  // Min value (numbers)
  if (rules.min !== undefined && Number(value) < rules.min) {
    return `${fieldName} must be at least ${rules.min}`;
  }

  // Max value (numbers)
  if (rules.max !== undefined && Number(value) > rules.max) {
    return `${fieldName} must be at most ${rules.max}`;
  }

  // Email validation
  if (rules.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(stringValue)) {
      return `${fieldName} must be a valid email address`;
    }
  }

  // URL validation
  if (rules.url) {
    try {
      new URL(stringValue);
    } catch {
      return `${fieldName} must be a valid URL`;
    }
  }

  // Phone validation
  if (rules.phone) {
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(stringValue)) {
      return `${fieldName} must be a valid phone number`;
    }
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    return `${fieldName} format is invalid`;
  }

  // Custom validation
  if (rules.custom) {
    const customResult = rules.custom(value);
    if (typeof customResult === 'string') {
      return customResult;
    }
    if (customResult === false) {
      return `${fieldName} is invalid`;
    }
  }

  return null;
}

/**
 * Validate multiple fields
 */
export function validateForm(
  values: Record<string, any>,
  rules: Record<string, ValidationRule>,
  fieldNames?: Record<string, string>
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    const error = validateField(
      values[field],
      fieldRules,
      fieldNames?.[field] || field
    );
    if (error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim();
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHTML(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Safe number parse
 */
export function safeParseNumber(value: any, fallback: number = 0): number {
  const parsed = Number(value);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Safe integer parse
 */
export function safeParseInt(value: any, fallback: number = 0): number {
  const parsed = parseInt(String(value), 10);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Safe float parse
 */
export function safeParseFloat(value: any, fallback: number = 0): number {
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Validate and sanitize email
 */
export function validateEmail(email: string): { isValid: boolean; sanitized: string } {
  const sanitized = email.trim().toLowerCase();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized);
  return { isValid, sanitized };
}

/**
 * Validate and format phone number
 */
export function validatePhone(phone: string): { isValid: boolean; formatted: string } {
  const cleaned = phone.replace(/\D/g, '');
  const isValid = cleaned.length >= 10;
  
  // Format as (XXX) XXX-XXXX for US numbers
  let formatted = phone;
  if (cleaned.length === 10) {
    formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    formatted = `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return { isValid, formatted };
}

/**
 * Validate GPA
 */
export function validateGPA(gpa: number): { isValid: boolean; error?: string } {
  if (isNaN(gpa)) {
    return { isValid: false, error: 'GPA must be a number' };
  }
  if (gpa < 0) {
    return { isValid: false, error: 'GPA cannot be negative' };
  }
  if (gpa > 4.0) {
    return { isValid: false, error: 'GPA cannot exceed 4.0' };
  }
  return { isValid: true };
}

/**
 * Validate age
 */
export function validateAge(birthDate: Date): { isValid: boolean; age: number; error?: string } {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const adjustedAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ? age - 1
    : age;

  if (adjustedAge < 18) {
    return { isValid: false, age: adjustedAge, error: 'Must be at least 18 years old' };
  }

  return { isValid: true, age: adjustedAge };
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  errors: string[];
} {
  const errors: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';

  if (password.length < 8) {
    errors.push('Must be at least 8 characters');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Must contain lowercase letter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Must contain uppercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Must contain number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Must contain special character');
  }

  // Determine strength
  if (errors.length === 0) {
    strength = password.length >= 12 ? 'strong' : 'medium';
  }

  return {
    isValid: errors.length === 0,
    strength,
    errors,
  };
}

/**
 * Debounce function to prevent too many rapid calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Throttle function to limit rate of calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Prevent default and stop propagation helper
 */
export function preventDefaultHandler<T extends React.SyntheticEvent>(
  handler: (event: T) => void
) {
  return (event: T) => {
    event.preventDefault();
    event.stopPropagation();
    handler(event);
  };
}

/**
 * Safe array access
 */
export function safeArrayGet<T>(
  array: T[] | undefined | null,
  index: number,
  fallback: T
): T {
  if (!array || index < 0 || index >= array.length) {
    return fallback;
  }
  return array[index];
}

/**
 * Safe object access
 */
export function safeObjectGet<T>(
  obj: any,
  path: string,
  fallback: T
): T {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return fallback;
    }
    current = current[key];
  }

  return current ?? fallback;
}

export default {
  validateField,
  validateForm,
  sanitizeInput,
  sanitizeHTML,
  safeParseNumber,
  safeParseInt,
  safeParseFloat,
  validateEmail,
  validatePhone,
  validateGPA,
  validateAge,
  validatePassword,
  debounce,
  throttle,
  preventDefaultHandler,
  safeArrayGet,
  safeObjectGet,
};
