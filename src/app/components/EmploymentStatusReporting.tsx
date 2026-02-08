import { useState } from 'react';
import { AlertTriangle, CheckCircle, FileText, Calendar, User, Building, XCircle, Info, Shield } from 'lucide-react';

interface HiredStudent {
  id: string;
  studentName: string;
  studentId: string;
  jobTitle: string;
  startDate: string;
  salary: string;
  hireDate: string;
  daysEmployed: number;
  status: 'active' | 'reported_terminated' | 'reported_quit' | 'completed_30_days';
}

interface EmploymentStatusReportingProps {
  hiredStudent: HiredStudent;
  onSubmitReport: (studentId: string, reportData: EmploymentReport) => void;
  onClose?: () => void;
}

interface EmploymentReport {
  studentId: string;
  status: 'terminated' | 'voluntary_quit' | 'still_employed';
  terminationDate?: string;
  reason: string;
  detailedExplanation: string;
  wouldRehire: boolean;
  performanceRating: number;
  reportedBy: string;
  reportedAt: string;
  refundRequested: boolean;
}

export function EmploymentStatusReporting({ hiredStudent, onSubmitReport, onClose }: EmploymentStatusReportingProps) {
  const [reportType, setReportType] = useState<'terminated' | 'voluntary_quit' | 'still_employed' | null>(null);
  const [terminationDate, setTerminationDate] = useState('');
  const [reason, setReason] = useState('');
  const [detailedExplanation, setDetailedExplanation] = useState('');
  const [wouldRehire, setWouldRehire] = useState(false);
  const [performanceRating, setPerformanceRating] = useState(3);
  const [refundRequested, setRefundRequested] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = () => {
    if (!reportType || !reason || !detailedExplanation.trim() || !agreedToTerms) {
      alert('Please complete all required fields and agree to terms');
      return;
    }

    if ((reportType === 'terminated' || reportType === 'voluntary_quit') && !terminationDate) {
      alert('Please provide the termination/quit date');
      return;
    }

    const report: EmploymentReport = {
      studentId: hiredStudent.studentId,
      status: reportType,
      terminationDate: reportType !== 'still_employed' ? terminationDate : undefined,
      reason,
      detailedExplanation,
      wouldRehire,
      performanceRating,
      reportedBy: 'Employer Portal',
      reportedAt: new Date().toISOString(),
      refundRequested,
    };

    // Track in analytics and notify admin
    console.log('30-DAY EMPLOYMENT STATUS REPORT:', report);
    
    onSubmitReport(hiredStudent.studentId, report);
  };

  const daysRemaining = 30 - hiredStudent.daysEmployed;
  const isOverdue = daysRemaining < 0;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl mx-auto border-4 border-orange-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-orange-200">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">30-Day Employment Status Report</h2>
          <p className="text-sm text-gray-600">Required for all hires made through ZALPHA</p>
        </div>
        {isOverdue ? (
          <div className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-xs font-bold">
            OVERDUE
          </div>
        ) : (
          <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
            Due in {daysRemaining} days
          </div>
        )}
      </div>

      {/* Mandatory Reporting Notice */}
      <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-900">
            <p className="font-bold mb-2">⚠️ MANDATORY REPORTING REQUIRED</p>
            <p className="mb-2">
              All employers MUST report the employment status of hired students within 30 days of the hire date. 
              This is a non-negotiable platform requirement.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li><strong>Student Terminated:</strong> Report reason and circumstances</li>
              <li><strong>Student Quit Voluntarily:</strong> Report reason for departure</li>
              <li><strong>Still Employed:</strong> Confirm student is performing well</li>
              <li><strong>Failure to Report:</strong> May result in account suspension and forfeiture of posting privileges</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Student Info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-900 mb-3">Hired Student Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-700 mb-1">Student Name</p>
            <p className="font-semibold text-gray-900">{hiredStudent.studentName}</p>
          </div>
          <div>
            <p className="text-blue-700 mb-1">Position</p>
            <p className="font-semibold text-gray-900">{hiredStudent.jobTitle}</p>
          </div>
          <div>
            <p className="text-blue-700 mb-1">Hire Date</p>
            <p className="font-semibold text-gray-900">{hiredStudent.hireDate}</p>
          </div>
          <div>
            <p className="text-blue-700 mb-1">Start Date</p>
            <p className="font-semibold text-gray-900">{hiredStudent.startDate}</p>
          </div>
          <div>
            <p className="text-blue-700 mb-1">Days Employed</p>
            <p className="font-semibold text-gray-900">{hiredStudent.daysEmployed} days</p>
          </div>
          <div>
            <p className="text-blue-700 mb-1">Salary</p>
            <p className="font-semibold text-gray-900">{hiredStudent.salary}</p>
          </div>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 mb-3">Employment Status *</h3>
        <div className="space-y-3">
          {/* Still Employed */}
          <label className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
            reportType === 'still_employed' 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-green-300'
          }`}>
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="reportType"
                value="still_employed"
                checked={reportType === 'still_employed'}
                onChange={(e) => setReportType('still_employed')}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Still Employed - Performing Well</span>
                </div>
                <p className="text-sm text-gray-600">
                  Student is still employed and meeting or exceeding expectations
                </p>
              </div>
            </div>
          </label>

          {/* Terminated */}
          <label className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
            reportType === 'terminated' 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-200 hover:border-red-300'
          }`}>
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="reportType"
                value="terminated"
                checked={reportType === 'terminated'}
                onChange={(e) => setReportType('terminated')}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-gray-900">Terminated by Employer</span>
                </div>
                <p className="text-sm text-gray-600">
                  Student was terminated for performance, conduct, or other reasons
                </p>
              </div>
            </div>
          </label>

          {/* Voluntary Quit */}
          <label className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
            reportType === 'voluntary_quit' 
              ? 'border-orange-500 bg-orange-50' 
              : 'border-gray-200 hover:border-orange-300'
          }`}>
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="reportType"
                value="voluntary_quit"
                checked={reportType === 'voluntary_quit'}
                onChange={(e) => setReportType('voluntary_quit')}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-gray-900">Voluntary Quit by Student</span>
                </div>
                <p className="text-sm text-gray-600">
                  Student voluntarily resigned or abandoned the position
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Conditional Fields for Termination/Quit */}
      {(reportType === 'terminated' || reportType === 'voluntary_quit') && (
        <>
          {/* Termination/Quit Date */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {reportType === 'terminated' ? 'Termination Date' : 'Last Day of Work'} *
            </label>
            <input
              type="date"
              value={terminationDate}
              onChange={(e) => setTerminationDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Reason Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for {reportType === 'terminated' ? 'Termination' : 'Voluntary Quit'} *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select a reason...</option>
              {reportType === 'terminated' ? (
                <>
                  <option value="poor_performance">Poor Performance / Not Meeting Expectations</option>
                  <option value="attendance_issues">Attendance Issues / Excessive Absences</option>
                  <option value="misconduct">Misconduct / Policy Violation</option>
                  <option value="lack_of_skills">Lack of Required Skills</option>
                  <option value="attitude_problems">Attitude or Behavioral Problems</option>
                  <option value="position_eliminated">Position Eliminated / Business Reasons</option>
                  <option value="failed_probation">Failed Probationary Period</option>
                  <option value="other">Other (Explain Below)</option>
                </>
              ) : (
                <>
                  <option value="accepted_other_job">Accepted Another Job Offer</option>
                  <option value="school_conflict">School Schedule Conflict</option>
                  <option value="personal_reasons">Personal/Family Reasons</option>
                  <option value="too_difficult">Job Was Too Difficult</option>
                  <option value="poor_fit">Poor Culture Fit</option>
                  <option value="compensation_issues">Compensation/Benefits Issues</option>
                  <option value="no_show">No-Call, No-Show / Job Abandonment</option>
                  <option value="other">Other (Explain Below)</option>
                </>
              )}
            </select>
          </div>

          {/* Refund Request Option */}
          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={refundRequested}
                onChange={(e) => setRefundRequested(e.target.checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">
                  Request Subscription Credit
                </p>
                <p className="text-sm text-purple-800">
                  If the student left within 30 days due to performance or abandonment, you may request 
                  a subscription credit. ZALPHA will review and process within 5 business days.
                </p>
              </div>
            </label>
          </div>
        </>
      )}

      {/* Detailed Explanation */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Detailed Explanation * (Minimum 50 characters)
        </label>
        <textarea
          value={detailedExplanation}
          onChange={(e) => setDetailedExplanation(e.target.value)}
          placeholder={
            reportType === 'still_employed' 
              ? "Describe the student's performance, strengths, and areas of growth..."
              : reportType === 'terminated'
              ? "Provide specific details about the circumstances leading to termination..."
              : reportType === 'voluntary_quit'
              ? "Describe the circumstances of the student's resignation..."
              : "Please select a report type first..."
          }
          rows={6}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-600 mt-1">
          {detailedExplanation.length}/50 characters minimum
        </p>
      </div>

      {/* Performance Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Overall Performance Rating *
        </label>
        <div className="flex items-center gap-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="performance"
                value={rating}
                checked={performanceRating === rating}
                onChange={() => setPerformanceRating(rating)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">
                {rating} {rating === 1 ? '(Poor)' : rating === 5 ? '(Excellent)' : ''}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Would Rehire */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={wouldRehire}
            onChange={(e) => setWouldRehire(e.target.checked)}
            className="mt-1"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-900 mb-1">
              I would consider rehiring this student in the future
            </p>
            <p className="text-sm text-gray-600">
              Checking this helps us understand if issues were situational or fundamental
            </p>
          </div>
        </label>
      </div>

      {/* Department of Labor Disclaimer */}
      <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-900">
            <p className="font-bold mb-2">📊 Department of Labor Reporting Notice</p>
            <p className="mb-2">
              ZALPHA may report aggregated demographic data and employment statistics to the U.S. Department 
              of Labor and other government agencies to support workforce development initiatives in the Pacific Islands.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs mb-2">
              <li><strong>Demographics Reported:</strong> Age ranges, education levels, geographic locations, employment outcomes</li>
              <li><strong>NOT Reported:</strong> Names, addresses, Social Security Numbers, or other personally identifiable information</li>
              <li><strong>Purpose:</strong> Demonstrate program effectiveness and support funding for regional workforce development</li>
            </ul>
            <p className="text-xs font-bold text-red-800 mt-3">
              ⚠️ <strong>FRAUD ALERT:</strong> If ZALPHA suspects abuse of government benefits (unemployment fraud, 
              SNAP fraud, education grant misuse, etc.), we are legally required to report to appropriate authorities 
              including the Department of Labor, Department of Education, and relevant law enforcement agencies. 
              This may include personal information necessary for investigation.
            </p>
          </div>
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1"
          />
          <div className="flex-1 text-sm text-blue-900">
            <p className="font-semibold mb-1">I certify that:</p>
            <ul className="space-y-1 text-xs">
              <li>✓ All information provided is accurate and truthful</li>
              <li>✓ I understand this report may impact the student's profile and future opportunities</li>
              <li>✓ I understand false reporting may result in account termination</li>
              <li>✓ I agree to ZALPHA's reporting to government agencies as described</li>
              <li>✓ This report will be shared with the student's educational institution</li>
            </ul>
          </div>
        </label>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4">
        {onClose && (
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={!reportType || !reason || detailedExplanation.length < 50 || !agreedToTerms}
          className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Submit 30-Day Report
        </button>
      </div>

      {/* Consequences Warning */}
      {isOverdue && (
        <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-sm text-red-900 font-bold">
            ⚠️ This report is OVERDUE. Failure to submit may result in suspension of your employer account 
            and inability to post new jobs until compliance is achieved.
          </p>
        </div>
      )}
    </div>
  );
}
