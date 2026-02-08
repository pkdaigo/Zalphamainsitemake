import { Review } from '@/app/components/CompanyReviewForm';

export interface ReviewThresholds {
  minAverageRating: number; // Below this triggers investigation
  criticalAverageRating: number; // Below this triggers automatic suspension
  minReviewsForAction: number; // Need at least this many reviews before taking action
  maxFlagsBeforeInvestigation: number; // Single review flags that trigger investigation
  suspensionDuration: number; // Days a company is suspended for investigation
}

export const DEFAULT_THRESHOLDS: ReviewThresholds = {
  minAverageRating: 3.0,
  criticalAverageRating: 2.5,
  minReviewsForAction: 3,
  maxFlagsBeforeInvestigation: 2,
  suspensionDuration: 30,
};

export interface ModerationAction {
  action: 'none' | 'flag' | 'investigate' | 'suspend';
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendedAction: string;
}

/**
 * Analyzes company reviews and determines if action should be taken
 */
export function analyzeCompanyReviews(
  reviews: Review[],
  thresholds: ReviewThresholds = DEFAULT_THRESHOLDS
): ModerationAction {
  // Not enough reviews to make a decision
  if (reviews.length < thresholds.minReviewsForAction) {
    return {
      action: 'none',
      reason: `Only ${reviews.length} reviews. Need ${thresholds.minReviewsForAction} minimum.`,
      severity: 'low',
      recommendedAction: 'Continue monitoring as more reviews come in.',
    };
  }

  // Calculate average rating
  const averageRating =
    reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length;

  // Check for flagged reviews
  const flaggedCount = reviews.filter(r => r.flagCount >= thresholds.maxFlagsBeforeInvestigation).length;
  
  // Check recommendation rate
  const recommendCount = reviews.filter(r => r.wouldRecommend).length;
  const recommendPercent = (recommendCount / reviews.length) * 100;

  // Recent reviews trend (last 5 reviews)
  const recentReviews = reviews.slice(-5);
  const recentAverage =
    recentReviews.reduce((sum, r) => sum + r.overallRating, 0) / recentReviews.length;

  // CRITICAL: Automatic suspension
  if (
    averageRating <= thresholds.criticalAverageRating &&
    reviews.length >= thresholds.minReviewsForAction
  ) {
    return {
      action: 'suspend',
      reason: `Average rating of ${averageRating.toFixed(1)} is critically low (threshold: ${thresholds.criticalAverageRating}). ${reviews.length} students reported negative experiences.`,
      severity: 'critical',
      recommendedAction: `SUSPEND IMMEDIATELY for ${thresholds.suspensionDuration} days. Contact company for investigation. Review all flagged reviews. Contact students to verify claims.`,
    };
  }

  // HIGH: Needs investigation
  if (
    averageRating <= thresholds.minAverageRating ||
    flaggedCount >= 2 ||
    recommendPercent < 40
  ) {
    return {
      action: 'investigate',
      reason: `Company shows concerning patterns: Average rating ${averageRating.toFixed(1)}, ${flaggedCount} flagged reviews, ${recommendPercent.toFixed(0)}% recommendation rate.`,
      severity: 'high',
      recommendedAction: `Begin formal investigation. Contact flagged review authors. Request company response. Consider temporary job posting restrictions.`,
    };
  }

  // MEDIUM: Trending down
  if (recentAverage < averageRating - 0.5) {
    return {
      action: 'flag',
      reason: `Recent reviews (${recentAverage.toFixed(1)}) significantly lower than overall average (${averageRating.toFixed(1)}). Possible deteriorating conditions.`,
      severity: 'medium',
      recommendedAction: `Monitor closely. Check for pattern changes. Contact recent reviewers if needed.`,
    };
  }

  // All good
  return {
    action: 'none',
    reason: `Company in good standing. Average rating: ${averageRating.toFixed(1)}, ${recommendPercent.toFixed(0)}% recommend.`,
    severity: 'low',
    recommendedAction: 'Continue normal monitoring.',
  };
}

/**
 * Generates email notification for company suspension
 */
export function generateSuspensionNotification(
  companyName: string,
  averageRating: number,
  totalReviews: number,
  keyIssues: string[]
): string {
  return `
Subject: URGENT: Your KiEX Company Account Has Been Suspended

Dear ${companyName} Team,

Your company account on KiEX has been temporarily suspended pending investigation.

SUSPENSION DETAILS:
- Average Rating: ${averageRating.toFixed(1)}/5.0
- Total Student Reviews: ${totalReviews}
- Suspension Duration: ${DEFAULT_THRESHOLDS.suspensionDuration} days (pending resolution)

REPORTED ISSUES:
${keyIssues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

IMMEDIATE ACTIONS REQUIRED:
1. Respond to this email within 48 hours
2. Address each reported issue with evidence/documentation
3. Provide corrective action plan
4. Schedule call with KiEX moderation team

DURING SUSPENSION:
- Students cannot apply to your job postings
- Your profile is marked as "Under Investigation"
- All postings are temporarily hidden

WHY WE DO THIS:
KiEX is committed to protecting students from unfair working conditions. Multiple students have reported concerning experiences at your organization. We take these reports seriously and conduct thorough investigations.

TO RESOLVE:
Email: moderation@kiex.com
Phone: (671) 555-0100
Response Deadline: 48 hours from receipt

Failure to respond may result in permanent account suspension.

Sincerely,
KiEX Moderation Team
Protecting Pacific Students Since 2024
  `.trim();
}

/**
 * Generates student notification when a company they reviewed gets suspended
 */
export function generateStudentNotification(
  studentName: string,
  companyName: string
): string {
  return `
Subject: Thank You - Your Review Helped Protect Other Students

Hi ${studentName},

Thank you for your honest review of ${companyName} on KiEX.

IMPORTANT UPDATE:
Based on your review and others from fellow students, ${companyName} has been suspended from KiEX pending investigation.

WHAT THIS MEANS:
✓ Your voice mattered and protected other students
✓ We're investigating the issues you reported
✓ The company cannot post jobs until issues are resolved
✓ We may contact you for additional information

YOUR PRIVACY:
- Your identity remains protected
- We will not share your personal information
- Anonymous reviews stay anonymous

NEXT STEPS:
We may reach out if we need clarification about your experience. Your continued honesty helps us maintain a safe platform for all Pacific students.

Thank you for building a stronger, safer KiEX community.

Sincerely,
KiEX Team

Questions? Email: support@kiex.com
  `.trim();
}

/**
 * Checks if a specific review should be flagged for admin review
 */
export function shouldFlagReview(review: Review): { shouldFlag: boolean; reason: string } {
  // Extremely low rating
  if (review.overallRating === 1 && !review.wouldRecommend) {
    return {
      shouldFlag: true,
      reason: 'Extremely negative review (1 star, would not recommend)',
    };
  }

  // Contains keywords indicating serious issues
  const seriousKeywords = [
    'abuse',
    'harassment',
    'discrimination',
    'illegal',
    'unsafe',
    'unpaid',
    'scam',
    'fraud',
  ];

  const reviewText = `${review.cons} ${review.advice}`.toLowerCase();
  const foundKeywords = seriousKeywords.filter(keyword => reviewText.includes(keyword));

  if (foundKeywords.length > 0) {
    return {
      shouldFlag: true,
      reason: `Contains serious allegations: ${foundKeywords.join(', ')}`,
    };
  }

  // No flag needed
  return {
    shouldFlag: false,
    reason: '',
  };
}

/**
 * Calculate company health score (0-100)
 */
export function calculateCompanyHealthScore(reviews: Review[]): number {
  if (reviews.length === 0) return 100;

  const weights = {
    averageRating: 0.4,
    recommendRate: 0.3,
    flagRate: 0.2,
    reviewVolume: 0.1,
  };

  // Average rating score (0-100)
  const avgRating = reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length;
  const ratingScore = (avgRating / 5) * 100;

  // Recommendation rate score
  const recommendCount = reviews.filter(r => r.wouldRecommend).length;
  const recommendScore = (recommendCount / reviews.length) * 100;

  // Flag rate score (inverse - fewer flags is better)
  const flaggedCount = reviews.filter(r => r.flagCount > 0).length;
  const flagScore = Math.max(0, 100 - (flaggedCount / reviews.length) * 100);

  // Review volume score (more reviews = more data = better)
  const volumeScore = Math.min(100, (reviews.length / 10) * 100);

  const healthScore =
    ratingScore * weights.averageRating +
    recommendScore * weights.recommendRate +
    flagScore * weights.flagRate +
    volumeScore * weights.reviewVolume;

  return Math.round(healthScore);
}
