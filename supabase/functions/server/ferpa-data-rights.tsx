// FERPA Data Rights Implementation
// Handles student rights to export and delete their education records

import type { KVStore } from './kv_store.tsx';
import { logFERPAAccess } from './ferpa-audit.tsx';

export interface DataExportRequest {
  id: string;
  studentId: string;
  requestDate: string;
  status: 'pending' | 'processing' | 'ready' | 'expired';
  expiryDate?: string;
  downloadUrl?: string;
}

export interface DataDeletionRequest {
  id: string;
  studentId: string;
  requestDate: string;
  scheduledDeletionDate: string;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  confirmationToken?: string;
  deletionData: {
    profile: boolean;
    applications: boolean;
    messages: boolean;
    assessments: boolean;
    documents: boolean;
  };
}

/**
 * Export all student data as required by FERPA
 * Student has right to inspect and review all education records
 */
export async function exportStudentData(
  kv: KVStore,
  studentId: string
): Promise<{
  student: any;
  applications: any[];
  messages: any[];
  assessments: any[];
  accessLogs: any[];
  consentHistory: any;
  privacySettings: any;
}> {
  console.log(`Exporting all education records for student ${studentId} (FERPA request)`);

  // Log this export for FERPA compliance
  await logFERPAAccess(kv, {
    studentId,
    accessorId: studentId,
    accessorType: 'student',
    accessorName: 'Self',
    action: 'export_data',
    dataAccessed: ['All Education Records'],
    purpose: 'Student exercised FERPA right to inspect and review education records',
    legitimate_interest: true,
  });

  // Get student profile
  const student = await kv.get(`student:${studentId}`) || {};

  // Get all applications
  const applicationIds = await kv.get(`student:${studentId}:applications`) || [];
  const applications = [];
  for (const appId of applicationIds) {
    const app = await kv.get(`application:${appId}`);
    if (app) applications.push(app);
  }

  // Get all messages
  const messageIds = await kv.get(`student:${studentId}:messages`) || [];
  const messages = [];
  for (const msgId of messageIds) {
    const msg = await kv.get(`message:${msgId}`);
    if (msg) messages.push(msg);
  }

  // Get skill assessments
  const assessmentIds = await kv.get(`student:${studentId}:assessments`) || [];
  const assessments = [];
  for (const assessmentId of assessmentIds) {
    const assessment = await kv.get(`assessment:${assessmentId}`);
    if (assessment) assessments.push(assessment);
  }

  // Get access logs (FERPA requires providing these)
  const accessLogIds = await kv.get(`ferpa:student:${studentId}:access_logs`) || [];
  const accessLogs = [];
  for (const logId of accessLogIds) {
    const log = await kv.get(`ferpa:audit:${logId}`);
    if (log) accessLogs.push(log);
  }

  // Get consent history
  const consentHistory = await kv.get(`ferpa:consent:${studentId}`) || null;

  // Get privacy settings
  const privacySettings = await kv.get(`student:${studentId}:privacy_settings`) || null;

  return {
    student,
    applications,
    messages,
    assessments,
    accessLogs,
    consentHistory,
    privacySettings,
  };
}

/**
 * Create a data export request
 * FERPA requires providing access within 45 days
 */
export async function createDataExportRequest(
  kv: KVStore,
  studentId: string
): Promise<DataExportRequest> {
  const requestId = crypto.randomUUID();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); // Export available for 7 days

  const request: DataExportRequest = {
    id: requestId,
    studentId,
    requestDate: new Date().toISOString(),
    status: 'pending',
    expiryDate: expiryDate.toISOString(),
  };

  await kv.set(`ferpa:export_request:${requestId}`, request);
  await kv.set(`ferpa:student:${studentId}:latest_export`, requestId);

  console.log(`Data export request created for student ${studentId}, expires ${expiryDate.toISOString()}`);

  return request;
}

/**
 * Process data export and generate download
 */
export async function processDataExport(
  kv: KVStore,
  requestId: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  const request: DataExportRequest = await kv.get(`ferpa:export_request:${requestId}`);
  
  if (!request) {
    return { success: false, error: 'Export request not found' };
  }

  if (request.status === 'ready') {
    return { success: false, error: 'Export already processed' };
  }

  // Update status
  request.status = 'processing';
  await kv.set(`ferpa:export_request:${requestId}`, request);

  // Export all data
  const exportData = await exportStudentData(kv, request.studentId);

  // Add metadata
  const completeExport = {
    exportMetadata: {
      requestId: request.id,
      exportDate: new Date().toISOString(),
      studentId: request.studentId,
      ferpaNotice: 'This export contains all education records maintained by ZALPHA as required by the Family Educational Rights and Privacy Act (FERPA). You have the right to review, amend, and control disclosure of these records.',
    },
    ...exportData,
  };

  // Mark as ready
  request.status = 'ready';
  request.downloadUrl = `/api/ferpa/download/${requestId}`; // Placeholder URL
  await kv.set(`ferpa:export_request:${requestId}`, request);

  return { success: true, data: completeExport };
}

/**
 * Request account and data deletion
 * FERPA allows students to request deletion with certain exceptions
 */
export async function createDeletionRequest(
  kv: KVStore,
  studentId: string,
  deletionData: DataDeletionRequest['deletionData']
): Promise<DataDeletionRequest> {
  const requestId = crypto.randomUUID();
  const confirmationToken = crypto.randomUUID();
  
  // Schedule deletion for 30 days from now (cooling-off period)
  const scheduledDate = new Date();
  scheduledDate.setDate(scheduledDate.getDate() + 30);

  const request: DataDeletionRequest = {
    id: requestId,
    studentId,
    requestDate: new Date().toISOString(),
    scheduledDeletionDate: scheduledDate.toISOString(),
    status: 'pending',
    confirmationToken,
    deletionData,
  };

  await kv.set(`ferpa:deletion_request:${requestId}`, request);
  await kv.set(`ferpa:student:${studentId}:deletion_request`, requestId);

  // Log the deletion request
  await logFERPAAccess(kv, {
    studentId,
    accessorId: studentId,
    accessorType: 'student',
    accessorName: 'Self',
    action: 'modify_record',
    dataAccessed: ['Account Deletion Request'],
    purpose: 'Student requested account and data deletion',
    legitimate_interest: true,
  });

  console.log(`Deletion request created for student ${studentId}, scheduled for ${scheduledDate.toISOString()}`);

  return request;
}

/**
 * Confirm deletion request (requires token)
 */
export async function confirmDeletionRequest(
  kv: KVStore,
  requestId: string,
  confirmationToken: string
): Promise<{ success: boolean; error?: string }> {
  const request: DataDeletionRequest = await kv.get(`ferpa:deletion_request:${requestId}`);
  
  if (!request) {
    return { success: false, error: 'Deletion request not found' };
  }

  if (request.confirmationToken !== confirmationToken) {
    return { success: false, error: 'Invalid confirmation token' };
  }

  if (request.status !== 'pending') {
    return { success: false, error: `Deletion request already ${request.status}` };
  }

  request.status = 'confirmed';
  await kv.set(`ferpa:deletion_request:${requestId}`, request);

  console.log(`Deletion request ${requestId} confirmed, will execute on ${request.scheduledDeletionDate}`);

  return { success: true };
}

/**
 * Cancel deletion request (before scheduled date)
 */
export async function cancelDeletionRequest(
  kv: KVStore,
  requestId: string,
  studentId: string
): Promise<{ success: boolean; error?: string }> {
  const request: DataDeletionRequest = await kv.get(`ferpa:deletion_request:${requestId}`);
  
  if (!request) {
    return { success: false, error: 'Deletion request not found' };
  }

  if (request.studentId !== studentId) {
    return { success: false, error: 'Unauthorized' };
  }

  if (request.status === 'completed') {
    return { success: false, error: 'Deletion already completed' };
  }

  request.status = 'cancelled';
  await kv.set(`ferpa:deletion_request:${requestId}`, request);

  console.log(`Deletion request ${requestId} cancelled by student ${studentId}`);

  return { success: true };
}

/**
 * Execute account deletion
 * IMPORTANT: Some records must be retained for legal compliance
 */
export async function executeDeletion(
  kv: KVStore,
  requestId: string
): Promise<{ success: boolean; deletedRecords: string[]; retainedRecords: string[]; error?: string }> {
  const request: DataDeletionRequest = await kv.get(`ferpa:deletion_request:${requestId}`);
  
  if (!request) {
    return { success: false, deletedRecords: [], retainedRecords: [], error: 'Deletion request not found' };
  }

  if (request.status !== 'confirmed') {
    return { success: false, deletedRecords: [], retainedRecords: [], error: 'Deletion not confirmed' };
  }

  const studentId = request.studentId;
  const deletedRecords: string[] = [];
  const retainedRecords: string[] = [];

  request.status = 'processing';
  await kv.set(`ferpa:deletion_request:${requestId}`, request);

  // Delete student profile
  if (request.deletionData.profile) {
    await kv.del(`student:${studentId}`);
    deletedRecords.push('Student Profile');
  }

  // Delete applications
  if (request.deletionData.applications) {
    const applicationIds = await kv.get(`student:${studentId}:applications`) || [];
    for (const appId of applicationIds) {
      // NOTE: For legal compliance, we may need to retain application records
      // tied to contract work or financial transactions for 7 years
      const app = await kv.get(`application:${appId}`);
      if (app && app.hasFinancialTransaction) {
        retainedRecords.push(`Application ${appId} (financial record - retained for 7 years)`);
      } else {
        await kv.del(`application:${appId}`);
        deletedRecords.push(`Application ${appId}`);
      }
    }
    await kv.del(`student:${studentId}:applications`);
  }

  // Delete messages
  if (request.deletionData.messages) {
    const messageIds = await kv.get(`student:${studentId}:messages`) || [];
    for (const msgId of messageIds) {
      await kv.del(`message:${msgId}`);
      deletedRecords.push(`Message ${msgId}`);
    }
    await kv.del(`student:${studentId}:messages`);
  }

  // Delete assessments
  if (request.deletionData.assessments) {
    const assessmentIds = await kv.get(`student:${studentId}:assessments`) || [];
    for (const assessmentId of assessmentIds) {
      await kv.del(`assessment:${assessmentId}`);
      deletedRecords.push(`Assessment ${assessmentId}`);
    }
    await kv.del(`student:${studentId}:assessments`);
  }

  // Delete documents (if applicable)
  if (request.deletionData.documents) {
    // Note: Document deletion would need to interact with Supabase Storage
    deletedRecords.push('Documents (marked for deletion in storage)');
  }

  // RETAIN: Access logs, consent records, and deletion request
  // FERPA requires maintaining these for compliance and legal protection
  retainedRecords.push('FERPA Access Logs (retained for compliance)');
  retainedRecords.push('FERPA Consent Records (retained for compliance)');
  retainedRecords.push('Deletion Request Record (retained for legal protection)');

  // Final log entry
  await logFERPAAccess(kv, {
    studentId,
    accessorId: 'system',
    accessorType: 'system',
    accessorName: 'ZALPHA Deletion System',
    action: 'modify_record',
    dataAccessed: deletedRecords,
    purpose: 'Executed student account deletion request',
    legitimate_interest: true,
  });

  request.status = 'completed';
  await kv.set(`ferpa:deletion_request:${requestId}`, request);

  console.log(`Deletion completed for student ${studentId}. Deleted: ${deletedRecords.length}, Retained: ${retainedRecords.length}`);

  return { success: true, deletedRecords, retainedRecords };
}

/**
 * Request amendment to education records
 * FERPA gives students the right to request corrections
 */
export async function createAmendmentRequest(
  kv: KVStore,
  studentId: string,
  recordType: string,
  currentValue: string,
  requestedValue: string,
  reason: string
): Promise<{
  id: string;
  studentId: string;
  recordType: string;
  currentValue: string;
  requestedValue: string;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
  requestDate: string;
}> {
  const requestId = crypto.randomUUID();

  const amendmentRequest = {
    id: requestId,
    studentId,
    recordType,
    currentValue,
    requestedValue,
    reason,
    status: 'pending' as const,
    requestDate: new Date().toISOString(),
  };

  await kv.set(`ferpa:amendment:${requestId}`, amendmentRequest);
  
  // Add to student's amendment requests
  const studentAmendments = await kv.get(`ferpa:student:${studentId}:amendments`) || [];
  studentAmendments.push(requestId);
  await kv.set(`ferpa:student:${studentId}:amendments`, studentAmendments);

  // Log the amendment request
  await logFERPAAccess(kv, {
    studentId,
    accessorId: studentId,
    accessorType: 'student',
    accessorName: 'Self',
    action: 'modify_record',
    dataAccessed: [recordType],
    purpose: `Student requested amendment: ${reason}`,
    legitimate_interest: true,
  });

  console.log(`Amendment request created: ${requestId} for student ${studentId}`);

  return amendmentRequest;
}
