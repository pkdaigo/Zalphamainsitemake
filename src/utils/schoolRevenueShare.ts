/**
 * School Revenue Sharing System
 * Schools earn a small percentage from employer transactions when their students are involved
 */

export interface School {
  id: string;
  name: string;
  type: 'university' | 'college' | 'high_school' | 'vocational';
  location: {
    city: string;
    territory: 'CNMI' | 'FSM' | 'Guam' | 'Hawaii';
  };
  contactInfo: {
    adminName: string;
    adminEmail: string;
    phone: string;
    address: string;
  };
  verified: boolean;
  registrationDate: Date;
  
  // Revenue share configuration
  revenueShare: {
    enabled: boolean;
    percentage: number; // 0.5% default (0.005)
    minimumPayout: number; // $50 minimum
    payoutMethod: 'bank_transfer' | 'check' | 'paypal';
    payoutSchedule: 'monthly' | 'quarterly' | 'annual';
    bankInfo?: {
      accountName: string;
      accountNumber: string;
      routingNumber: string;
      bankName: string;
    };
  };
  
  // Statistics
  stats: {
    totalStudents: number;
    activeStudents: number;
    graduatedStudents: number;
    totalRevenue: number;
    lifetimeRevenue: number;
    lastPayoutDate?: Date;
    nextPayoutDate?: Date;
  };
}

export interface Transaction {
  id: string;
  type: 'job_post' | 'internship_post' | 'subscription' | 'premium_feature' | 'freelance_project';
  employerId: string;
  employerName: string;
  amount: number;
  date: Date;
  
  // School attribution
  schoolAttribution?: {
    schoolId: string;
    schoolName: string;
    studentId: string;
    studentName: string;
    studentAnonymous: boolean; // NEW: Privacy flag
    reason: 'student_applied' | 'student_hired' | 'student_connected' | 'subscription_with_students';
    schoolShareAmount: number;
    schoolSharePercentage: number;
  };
  
  status: 'pending' | 'completed' | 'refunded';
}

export interface SchoolPayout {
  id: string;
  schoolId: string;
  schoolName: string;
  period: {
    start: Date;
    end: Date;
  };
  totalTransactions: number;
  totalRevenue: number;
  schoolShareAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentMethod: 'bank_transfer' | 'check' | 'paypal';
  paymentDate?: Date;
  paymentReference?: string;
  transactions: Transaction[];
}

/**
 * Revenue Share Configuration
 */
export const REVENUE_SHARE_CONFIG = {
  // Default school share percentage
  defaultPercentage: 0.005, // 0.5% of transaction
  
  // Minimum amounts
  minimumPayout: 50, // $50 minimum to process payout
  minimumTransactionForShare: 10, // Only transactions $10+ qualify
  
  // Payout schedules
  payoutSchedules: {
    monthly: 30, // Days
    quarterly: 90,
    annual: 365,
  },
  
  // Transaction types that qualify for revenue share
  qualifyingTransactions: [
    'job_post',
    'internship_post',
    'subscription',
    'premium_feature',
    'freelance_project',
  ],
  
  // Attribution rules
  attributionRules: {
    // Student must have applied/been hired within this timeframe
    attributionWindow: 90, // 90 days
    
    // Multiple students from same school on one job
    multipleStudentRule: 'split', // 'split' or 'first' or 'all'
  },
};

/**
 * School Revenue Share Service
 */
class SchoolRevenueShareService {
  private schools: Map<string, School> = new Map();
  private transactions: Transaction[] = [];
  private payouts: SchoolPayout[] = [];

  /**
   * Register a new school
   */
  registerSchool(school: Omit<School, 'id' | 'registrationDate' | 'stats'>): School {
    const newSchool: School = {
      ...school,
      id: `school_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      registrationDate: new Date(),
      stats: {
        totalStudents: 0,
        activeStudents: 0,
        graduatedStudents: 0,
        totalRevenue: 0,
        lifetimeRevenue: 0,
      },
    };

    this.schools.set(newSchool.id, newSchool);
    return newSchool;
  }

  /**
   * Get school by ID
   */
  getSchool(schoolId: string): School | undefined {
    return this.schools.get(schoolId);
  }

  /**
   * Update school information
   */
  updateSchool(schoolId: string, updates: Partial<School>): School | null {
    const school = this.schools.get(schoolId);
    if (!school) return null;

    const updated = { ...school, ...updates };
    this.schools.set(schoolId, updated);
    return updated;
  }

  /**
   * Calculate school share for a transaction
   */
  calculateSchoolShare(
    transactionAmount: number,
    schoolId: string
  ): { amount: number; percentage: number } {
    const school = this.schools.get(schoolId);
    
    if (!school || !school.revenueShare.enabled) {
      return { amount: 0, percentage: 0 };
    }

    // Check minimum transaction amount
    if (transactionAmount < REVENUE_SHARE_CONFIG.minimumTransactionForShare) {
      return { amount: 0, percentage: 0 };
    }

    const percentage = school.revenueShare.percentage || REVENUE_SHARE_CONFIG.defaultPercentage;
    const amount = transactionAmount * percentage;

    return { amount, percentage };
  }

  /**
   * Record a transaction with school attribution
   */
  recordTransaction(transaction: Omit<Transaction, 'id'>): Transaction {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    this.transactions.push(newTransaction);

    // Update school stats if attributed
    if (newTransaction.schoolAttribution) {
      const school = this.schools.get(newTransaction.schoolAttribution.schoolId);
      if (school) {
        school.stats.totalRevenue += newTransaction.schoolAttribution.schoolShareAmount;
        school.stats.lifetimeRevenue += newTransaction.schoolAttribution.schoolShareAmount;
        this.schools.set(school.id, school);
      }
    }

    return newTransaction;
  }

  /**
   * Attribute transaction to school based on student
   */
  attributeTransactionToSchool(
    transaction: Omit<Transaction, 'id' | 'schoolAttribution'>,
    studentId: string,
    studentName: string,
    studentSchoolId: string,
    reason: Transaction['schoolAttribution']['reason']
  ): Transaction {
    const school = this.schools.get(studentSchoolId);
    
    if (!school || !school.revenueShare.enabled) {
      // School doesn't exist or revenue share not enabled
      return this.recordTransaction(transaction);
    }

    const { amount, percentage } = this.calculateSchoolShare(transaction.amount, studentSchoolId);

    return this.recordTransaction({
      ...transaction,
      schoolAttribution: {
        schoolId: studentSchoolId,
        schoolName: school.name,
        studentId,
        studentName,
        studentAnonymous: false, // Default to not anonymous
        reason,
        schoolShareAmount: amount,
        schoolSharePercentage: percentage,
      },
    });
  }

  /**
   * Get transactions for a school
   */
  getSchoolTransactions(
    schoolId: string,
    options?: {
      startDate?: Date;
      endDate?: Date;
      status?: Transaction['status'];
    }
  ): Transaction[] {
    let transactions = this.transactions.filter(
      txn => txn.schoolAttribution?.schoolId === schoolId
    );

    if (options?.startDate) {
      transactions = transactions.filter(txn => txn.date >= options.startDate!);
    }

    if (options?.endDate) {
      transactions = transactions.filter(txn => txn.date <= options.endDate!);
    }

    if (options?.status) {
      transactions = transactions.filter(txn => txn.status === options.status);
    }

    return transactions;
  }

  /**
   * Calculate pending payout for a school
   */
  calculatePendingPayout(schoolId: string): number {
    const school = this.schools.get(schoolId);
    if (!school) return 0;

    // Get all completed transactions that haven't been paid out yet
    const unpaidTransactions = this.getSchoolTransactions(schoolId, {
      status: 'completed',
    }).filter(txn => {
      // Check if transaction is in any completed payout
      const inPayout = this.payouts.some(
        payout =>
          payout.schoolId === schoolId &&
          payout.status === 'completed' &&
          payout.transactions.some(t => t.id === txn.id)
      );
      return !inPayout;
    });

    return unpaidTransactions.reduce(
      (sum, txn) => sum + (txn.schoolAttribution?.schoolShareAmount || 0),
      0
    );
  }

  /**
   * Process payout for a school
   */
  processPayout(
    schoolId: string,
    periodStart: Date,
    periodEnd: Date
  ): SchoolPayout | null {
    const school = this.schools.get(schoolId);
    if (!school) return null;

    // Get completed transactions in period that haven't been paid
    const transactions = this.getSchoolTransactions(schoolId, {
      startDate: periodStart,
      endDate: periodEnd,
      status: 'completed',
    }).filter(txn => {
      const inPayout = this.payouts.some(
        payout =>
          payout.schoolId === schoolId &&
          payout.status === 'completed' &&
          payout.transactions.some(t => t.id === txn.id)
      );
      return !inPayout;
    });

    const totalAmount = transactions.reduce(
      (sum, txn) => sum + (txn.schoolAttribution?.schoolShareAmount || 0),
      0
    );

    // Check minimum payout
    if (totalAmount < school.revenueShare.minimumPayout) {
      console.log(`Payout for ${school.name} ($${totalAmount}) is below minimum ($${school.revenueShare.minimumPayout})`);
      return null;
    }

    const payout: SchoolPayout = {
      id: `payout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      schoolId,
      schoolName: school.name,
      period: { start: periodStart, end: periodEnd },
      totalTransactions: transactions.length,
      totalRevenue: transactions.reduce((sum, txn) => sum + txn.amount, 0),
      schoolShareAmount: totalAmount,
      status: 'pending',
      paymentMethod: school.revenueShare.payoutMethod,
      transactions,
    };

    this.payouts.push(payout);
    return payout;
  }

  /**
   * Complete a payout
   */
  completePayout(payoutId: string, paymentReference: string): SchoolPayout | null {
    const payout = this.payouts.find(p => p.id === payoutId);
    if (!payout) return null;

    payout.status = 'completed';
    payout.paymentDate = new Date();
    payout.paymentReference = paymentReference;

    // Update school stats
    const school = this.schools.get(payout.schoolId);
    if (school) {
      school.stats.lastPayoutDate = new Date();
      
      // Calculate next payout date
      const scheduleData = REVENUE_SHARE_CONFIG.payoutSchedules[school.revenueShare.payoutSchedule];
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + scheduleData);
      school.stats.nextPayoutDate = nextDate;
      
      this.schools.set(school.id, school);
    }

    return payout;
  }

  /**
   * Get all payouts for a school
   */
  getSchoolPayouts(schoolId: string): SchoolPayout[] {
    return this.payouts.filter(p => p.schoolId === schoolId);
  }

  /**
   * Get school analytics
   */
  getSchoolAnalytics(schoolId: string) {
    const school = this.schools.get(schoolId);
    if (!school) return null;

    const transactions = this.getSchoolTransactions(schoolId);
    const payouts = this.getSchoolPayouts(schoolId);
    const pendingPayout = this.calculatePendingPayout(schoolId);

    return {
      school,
      transactions: {
        total: transactions.length,
        completed: transactions.filter(t => t.status === 'completed').length,
        pending: transactions.filter(t => t.status === 'pending').length,
        totalValue: transactions.reduce((sum, t) => sum + t.amount, 0),
        totalSchoolShare: transactions.reduce(
          (sum, t) => sum + (t.schoolAttribution?.schoolShareAmount || 0),
          0
        ),
      },
      payouts: {
        total: payouts.length,
        completed: payouts.filter(p => p.status === 'completed').length,
        pending: payouts.filter(p => p.status === 'pending').length,
        totalPaid: payouts
          .filter(p => p.status === 'completed')
          .reduce((sum, p) => sum + p.schoolShareAmount, 0),
        pendingAmount: pendingPayout,
      },
      students: school.stats,
    };
  }

  /**
   * Get all schools
   */
  getAllSchools(): School[] {
    return Array.from(this.schools.values());
  }

  /**
   * Export data for a school (for transparency)
   */
  exportSchoolData(schoolId: string) {
    const analytics = this.getSchoolAnalytics(schoolId);
    const transactions = this.getSchoolTransactions(schoolId);
    const payouts = this.getSchoolPayouts(schoolId);

    return {
      analytics,
      transactions,
      payouts,
      exportDate: new Date().toISOString(),
    };
  }
}

// Create singleton instance
export const schoolRevenueService = new SchoolRevenueShareService();

/**
 * Helper function to determine if a transaction qualifies for revenue share
 */
export function qualifiesForRevenueShare(transaction: Partial<Transaction>): boolean {
  if (!transaction.type || !transaction.amount) return false;
  
  return (
    REVENUE_SHARE_CONFIG.qualifyingTransactions.includes(transaction.type) &&
    transaction.amount >= REVENUE_SHARE_CONFIG.minimumTransactionForShare
  );
}

/**
 * Format currency
 */
export function formatRevenue(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Make available in console for debugging
if (typeof window !== 'undefined') {
  (window as any).kiexSchoolRevenue = schoolRevenueService;
}

export default schoolRevenueService;