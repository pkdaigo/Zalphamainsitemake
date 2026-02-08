// FERPA Audit Logging System
// Tracks all access to student education records as required by FERPA

import type { KVStore } from './kv_store.tsx';

export interface FERPAAuditLog {
  id: string;
  studentId: string;
  accessorId: string;
  accessorType: 'student' | 'employer' | 'admin' | 'educational_partner' | 'system';
  accessorName: string;
  action: 'view_profile' | 'view_transcript' | 'view_application' | 'export_data' | 'modify_record' | 'message_sent' | 'search_result';
  dataAccessed: string[];
  purpose: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  legitimate_interest: boolean;
  consent_override?: boolean;
}

export interface FERPAConsentRecord {
  studentId: string;
  studentConsent: boolean;
  parentalConsent?: boolean;
  directoryInfoOptIn: boolean;
  thirdPartyDisclosure: boolean;
  consentDate: string;
  studentSignature: string;
  parentSignature?: string;
  parentEmail?: string;
  lastUpdated: string;
}

/**
 * Log access to a student's education records
 * FERPA requires maintaining these logs for the life of the record
 */
export async function logFERPAAccess(
  kv: KVStore,
  logData: Omit<FERPAAuditLog, 'id' | 'timestamp'>
): Promise<void> {
  const auditLog: FERPAAuditLog = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...logData,
  };

  // Store individual log entry
  await kv.set(`ferpa:audit:${auditLog.id}`, auditLog);

  // Add to student's access log index
  const studentLogsKey = `ferpa:student:${logData.studentId}:access_logs`;
  const existingLogs = await kv.get(studentLogsKey) || [];
  existingLogs.push(auditLog.id);
  await kv.set(studentLogsKey, existingLogs);

  // Add to global access log index (for compliance reporting)
  const globalLogsKey = `ferpa:global:access_logs`;
  const globalLogs = await kv.get(globalLogsKey) || [];
  globalLogs.push(auditLog.id);
  await kv.set(globalLogsKey, globalLogs);

  console.log(`FERPA Access Logged: ${logData.accessorName} (${logData.accessorType}) accessed ${logData.action} for student ${logData.studentId}`);
}

/**
 * Get all access logs for a specific student
 */
export async function getStudentAccessLogs(
  kv: KVStore,
  studentId: string,
  limit: number = 100
): Promise<FERPAAuditLog[]> {
  const studentLogsKey = `ferpa:student:${studentId}:access_logs`;
  const logIds = await kv.get(studentLogsKey) || [];
  
  // Get the most recent logs
  const recentLogIds = logIds.slice(-limit);
  
  const logs: FERPAAuditLog[] = [];
  for (const logId of recentLogIds) {
    const log = await kv.get(`ferpa:audit:${logId}`);
    if (log) {
      logs.push(log);
    }
  }
  
  // Sort by timestamp descending (most recent first)
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

/**
 * Check if an accessor has legitimate educational interest to view records
 */
export function hasLegitimateEducationalInterest(
  accessorType: string,
  action: string,
  consent: FERPAConsentRecord
): boolean {
  // Students always have access to their own records
  if (accessorType === 'student') {
    return true;
  }

  // System automated processes (backups, sync, etc.) are allowed
  if (accessorType === 'system' && ['backup', 'sync', 'automated'].some(term => action.includes(term))) {
    return true;
  }

  // Admins have legitimate interest for support and compliance
  if (accessorType === 'admin') {
    return true;
  }

  // Employers have legitimate interest if student applied or consented
  if (accessorType === 'employer') {
    // If student has directory info enabled, employers can view basic profile
    if (consent.directoryInfoOptIn && action === 'view_profile') {
      return true;
    }
    // If student applied to a job, employer can view application
    if (action === 'view_application') {
      return true;
    }
  }

  // Educational partners need explicit consent
  if (accessorType === 'educational_partner') {
    return consent.thirdPartyDisclosure;
  }

  return false;
}

/**
 * Save FERPA consent record
 */
export async function saveFERPAConsent(
  kv: KVStore,
  studentId: string,
  consentData: Omit<FERPAConsentRecord, 'studentId' | 'lastUpdated'>
): Promise<void> {
  const consentRecord: FERPAConsentRecord = {
    studentId,
    lastUpdated: new Date().toISOString(),
    ...consentData,
  };

  await kv.set(`ferpa:consent:${studentId}`, consentRecord);

  // Log the consent update
  await logFERPAAccess(kv, {
    studentId,
    accessorId: studentId,
    accessorType: 'student',
    accessorName: 'Self',
    action: 'modify_record',
    dataAccessed: ['FERPA Consent Settings'],
    purpose: 'Student updated privacy consent preferences',
    legitimate_interest: true,
  });

  console.log(`FERPA Consent saved for student ${studentId}: Directory=${consentRecord.directoryInfoOptIn}, ThirdParty=${consentRecord.thirdPartyDisclosure}`);
}

/**
 * Get FERPA consent record for a student
 */
export async function getFERPAConsent(
  kv: KVStore,
  studentId: string
): Promise<FERPAConsentRecord | null> {
  const consent = await kv.get(`ferpa:consent:${studentId}`);
  return consent || null;
}

/**
 * Check if disclosure is allowed based on FERPA consent
 */
export async function isDisclosureAllowed(
  kv: KVStore,
  studentId: string,
  accessorType: string,
  dataType: 'directory' | 'education_records' | 'third_party'
): Promise<{ allowed: boolean; reason: string }> {
  const consent = await getFERPAConsent(kv, studentId);
  
  if (!consent) {
    return { 
      allowed: false, 
      reason: 'No FERPA consent on file - student must complete consent process' 
    };
  }

  // Directory information disclosure
  if (dataType === 'directory') {
    if (consent.directoryInfoOptIn) {
      return { allowed: true, reason: 'Student opted in to directory information disclosure' };
    } else {
      return { allowed: false, reason: 'Student opted out of directory information disclosure' };
    }
  }

  // Third-party educational partners
  if (dataType === 'third_party' || accessorType === 'educational_partner') {
    if (consent.thirdPartyDisclosure) {
      return { allowed: true, reason: 'Student consented to third-party educational partner sharing' };
    } else {
      return { allowed: false, reason: 'Student did not consent to third-party sharing' };
    }
  }

  // Full education records access
  if (dataType === 'education_records') {
    // Always requires explicit consent unless legitimate educational interest
    if (accessorType === 'student' || accessorType === 'admin') {
      return { allowed: true, reason: 'Legitimate educational interest' };
    }
    
    if (accessorType === 'employer') {
      return { 
        allowed: false, 
        reason: 'Employer access to full education records requires specific application context' 
      };
    }
  }

  return { allowed: false, reason: 'No consent basis for disclosure' };
}

/**
 * Generate FERPA compliance report (for administrative use)
 */
export async function generateFERPAComplianceReport(
  kv: KVStore,
  startDate?: string,
  endDate?: string
): Promise<{
  totalAccessLogs: number;
  accessByType: Record<string, number>;
  studentsWithConsent: number;
  studentsWithoutConsent: number;
  directoryOptInRate: number;
  thirdPartyConsentRate: number;
}> {
  const globalLogs = await kv.get('ferpa:global:access_logs') || [];
  
  // Get all consent records
  const consentKeys = await kv.getByPrefix('ferpa:consent:');
  const consents: FERPAConsentRecord[] = consentKeys.map(k => k.value);
  
  const accessByType: Record<string, number> = {};
  
  for (const logId of globalLogs) {
    const log: FERPAAuditLog = await kv.get(`ferpa:audit:${logId}`);
    if (log) {
      // Filter by date range if provided
      if (startDate && new Date(log.timestamp) < new Date(startDate)) continue;
      if (endDate && new Date(log.timestamp) > new Date(endDate)) continue;
      
      accessByType[log.accessorType] = (accessByType[log.accessorType] || 0) + 1;
    }
  }
  
  const studentsWithConsent = consents.filter(c => c.studentConsent).length;
  const studentsWithoutConsent = consents.filter(c => !c.studentConsent).length;
  const directoryOptInRate = consents.length > 0 
    ? consents.filter(c => c.directoryInfoOptIn).length / consents.length 
    : 0;
  const thirdPartyConsentRate = consents.length > 0
    ? consents.filter(c => c.thirdPartyDisclosure).length / consents.length
    : 0;
  
  return {
    totalAccessLogs: globalLogs.length,
    accessByType,
    studentsWithConsent,
    studentsWithoutConsent,
    directoryOptInRate,
    thirdPartyConsentRate,
  };
}

/**
 * Middleware to automatically log FERPA access
 * Use this in routes that access student education records
 */
export function createFERPAMiddleware(kv: KVStore) {
  return async (
    studentId: string,
    accessorId: string,
    accessorType: FERPAAuditLog['accessorType'],
    accessorName: string,
    action: FERPAAuditLog['action'],
    dataAccessed: string[],
    purpose: string,
    request?: Request
  ) => {
    const consent = await getFERPAConsent(kv, studentId);
    const legitimate_interest = consent 
      ? hasLegitimateEducationalInterest(accessorType, action, consent)
      : false;

    await logFERPAAccess(kv, {
      studentId,
      accessorId,
      accessorType,
      accessorName,
      action,
      dataAccessed,
      purpose,
      ipAddress: request?.headers.get('x-forwarded-for') || request?.headers.get('cf-connecting-ip') || undefined,
      userAgent: request?.headers.get('user-agent') || undefined,
      legitimate_interest,
    });
  };
}
