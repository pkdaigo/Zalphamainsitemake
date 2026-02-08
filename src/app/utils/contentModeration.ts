// AI-powered content moderation utilities for detecting contact information
// and attempts to circumvent the platform

export interface ModerationResult {
  isClean: boolean;
  redactedMessage: string;
  violations: string[];
  riskLevel: 'none' | 'low' | 'medium' | 'high' | 'critical';
  flaggedForReview: boolean;
}

// Comprehensive patterns for detecting contact information
const PHONE_PATTERNS = [
  // US/International formats
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
  /\b\d{3}\s\d{3}\s\d{4}\b/g,
  /\b\(\d{3}\)\s?\d{3}[-.]?\d{4}\b/g,
  /\b\+\d{1,3}\s?\d{3,4}\s?\d{3,4}\s?\d{3,4}\b/g,
  // Written out numbers
  /\b(one|two|three|four|five|six|seven|eight|nine|zero){10,}\b/gi,
  // Separated with spaces: "6 7 0 2 8 6 3 0 1 0"
  /\b\d(\s\d){9,}\b/g,
];

const EMAIL_PATTERNS = [
  // Standard emails
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  // Obfuscated: "email at domain dot com"
  /\b\w+\s*(at|AT|@)\s*\w+\s*(dot|DOT|\.)\s*(com|org|net|edu)\b/gi,
  // Spaces: "user @ domain . com"
  /\b\w+\s*[@]\s*\w+\s*[.]\s*(com|org|net|edu)\b/gi,
  // Brackets: "user[at]domain[dot]com"
  /\b\w+\[at\]\w+\[dot\](com|org|net|edu)\b/gi,
];

const SOCIAL_MEDIA_PATTERNS = [
  // Instagram
  /\b(instagram|insta|ig)\s*(:|is|@)?\s*[@]?\w+/gi,
  // WhatsApp
  /\b(whatsapp|whats\s?app|wa)\b/gi,
  // Facebook
  /\b(facebook|fb|messenger)\s*(:|is|@)?\s*[@]?\w+/gi,
  // Snapchat
  /\b(snapchat|snap|sc)\s*(:|is|@)?\s*[@]?\w+/gi,
  // Twitter/X
  /\b(twitter|x\.com)\s*(:|is|@)?\s*[@]?\w+/gi,
  // TikTok
  /\b(tiktok|tik\s?tok)\s*(:|is|@)?\s*[@]?\w+/gi,
  // LinkedIn
  /\b(linkedin|linked\s?in)\s*(:|is|@)?\s*[@]?\w+/gi,
  // Telegram
  /\b(telegram|tg)\s*(:|is|@)?\s*[@]?\w+/gi,
  // WeChat
  /\b(wechat|we\s?chat|wx)\s*(:|is|@)?\s*[@]?\w+/gi,
  // LINE
  /\b(line|line\s?app)\s*(:|is|@)?\s*[@]?\w+/gi,
];

const URL_PATTERNS = [
  // Standard URLs
  /\b(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi,
  // Obfuscated: "website dot com"
  /\b\w+\s*(dot|DOT|\.)\s*(com|org|net|io|co)\b/gi,
];

const CIRCUMVENTION_PATTERNS = [
  // Direct requests to go off-platform
  /\b(call me|text me|email me|dm me|message me|contact me|reach me|add me)\b/gi,
  /\b(let's talk|let's chat|let's discuss)\s+(outside|off|on|via)\b/gi,
  /\b(meet me|see me)\s+(outside|off)\s+(platform|here|zalpha|kiex)\b/gi,
  // Money/payment mentions outside platform
  /\b(pay|payment|cash|venmo|paypal|zelle|cashapp)\s+(directly|outside|off-platform)\b/gi,
  /\b(send money|transfer|wire)\b/gi,
  // Personal meeting locations
  /\b(meet\s+at|my\s+house|my\s+place|my\s+office|come\s+to)\b/gi,
  // Resume/CV file sharing outside platform
  /\b(send\s+(?:me\s+)?(?:your\s+)?(?:resume|cv)|email\s+(?:your\s+)?(?:resume|cv))\b/gi,
];

const SUSPICIOUS_PHRASES = [
  "let's continue this elsewhere",
  "let's move this to",
  "reach out to me directly",
  "contact me privately",
  "i'll send you my details",
  "here's my contact",
  "my personal",
  "off the record",
  "don't tell zalpha",
  "keep this between us",
  "bypass the system",
  "avoid the fee",
  "skip the platform",
  "work around the platform",
];

export function moderateMessage(message: string): ModerationResult {
  const violations: string[] = [];
  let redactedMessage = message;
  let riskLevel: ModerationResult['riskLevel'] = 'none';
  let flaggedForReview = false;

  // Check for phone numbers
  PHONE_PATTERNS.forEach((pattern, index) => {
    if (pattern.test(message)) {
      violations.push('Phone number detected');
      redactedMessage = redactedMessage.replace(pattern, '[PHONE NUMBER REDACTED]');
      riskLevel = 'high';
      flaggedForReview = true;
    }
  });

  // Check for emails
  EMAIL_PATTERNS.forEach((pattern) => {
    if (pattern.test(message)) {
      violations.push('Email address detected');
      redactedMessage = redactedMessage.replace(pattern, '[EMAIL REDACTED]');
      riskLevel = 'high';
      flaggedForReview = true;
    }
  });

  // Check for social media
  SOCIAL_MEDIA_PATTERNS.forEach((pattern) => {
    if (pattern.test(message)) {
      violations.push('Social media handle detected');
      redactedMessage = redactedMessage.replace(pattern, '[SOCIAL MEDIA REDACTED]');
      riskLevel = riskLevel === 'high' ? 'high' : 'medium';
      flaggedForReview = true;
    }
  });

  // Check for URLs
  URL_PATTERNS.forEach((pattern) => {
    if (pattern.test(message)) {
      violations.push('External website link detected');
      redactedMessage = redactedMessage.replace(pattern, '[LINK REDACTED]');
      riskLevel = riskLevel === 'high' ? 'high' : 'medium';
      flaggedForReview = true;
    }
  });

  // Check for circumvention attempts
  CIRCUMVENTION_PATTERNS.forEach((pattern) => {
    if (pattern.test(message)) {
      violations.push('Attempt to circumvent platform detected');
      riskLevel = 'critical';
      flaggedForReview = true;
    }
  });

  // Check for suspicious phrases
  const lowerMessage = message.toLowerCase();
  SUSPICIOUS_PHRASES.forEach((phrase) => {
    if (lowerMessage.includes(phrase)) {
      violations.push(`Suspicious phrase: "${phrase}"`);
      riskLevel = riskLevel === 'critical' ? 'critical' : 'high';
      flaggedForReview = true;
    }
  });

  // Advanced: Check for encoded/obfuscated contact info
  // Numbers written as words: "six seven zero..."
  const numberWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  let numberWordCount = 0;
  numberWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = message.match(regex);
    if (matches) numberWordCount += matches.length;
  });
  
  if (numberWordCount >= 8) {
    violations.push('Possible encoded phone number detected');
    redactedMessage += '\n\n[⚠️ Message flagged for containing possible encoded contact information]';
    riskLevel = 'high';
    flaggedForReview = true;
  }

  // Check for base64 or hex encoded strings (common obfuscation technique)
  const base64Pattern = /\b[A-Za-z0-9+\/]{20,}={0,2}\b/g;
  if (base64Pattern.test(message)) {
    violations.push('Possible encoded content detected');
    riskLevel = 'medium';
    flaggedForReview = true;
  }

  return {
    isClean: violations.length === 0,
    redactedMessage,
    violations,
    riskLevel,
    flaggedForReview
  };
}

// Log violations to backend for review
export async function logViolation(
  userId: string,
  userType: 'student' | 'employer',
  originalMessage: string,
  violations: string[],
  conversationId: string
) {
  try {
    const response = await fetch('/api/moderation/log-violation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        userType,
        originalMessage,
        violations,
        conversationId,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      console.error('Failed to log violation');
    }
  } catch (error) {
    console.error('Error logging violation:', error);
  }
}

// Strike system - after 3 violations, account is flagged/suspended
export interface UserViolationRecord {
  userId: string;
  violations: number;
  lastViolation: string;
  status: 'active' | 'warning' | 'suspended';
}

export function calculateUserStatus(violations: number): UserViolationRecord['status'] {
  if (violations === 0) return 'active';
  if (violations < 3) return 'warning';
  return 'suspended';
}
