import { FileText, Scale, Shield, AlertTriangle } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { CollapsibleSection } from '@/app/components/CollapsibleSection';

interface TermsOfServiceProps {
  onNavigate: (page: string) => void;
}

export function TermsOfService({ onNavigate }: TermsOfServiceProps) {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gray-50 py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Home" />
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 border-2 border-blue-200">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-sm sm:text-base text-gray-600">ZALPHA Job Connection Platform</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            <strong>Last Updated:</strong> January 28, 2025
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            <strong>Effective Date:</strong> January 28, 2025
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 sm:p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-red-900 mb-2 text-sm sm:text-base">IMPORTANT - PLEASE READ CAREFULLY</h2>
              <p className="text-xs sm:text-sm text-red-800 leading-relaxed">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and 
                <strong> Zee Executive Group</strong> and its subsidiaries. By accessing or using the ZALPHA platform, 
                you agree to be bound by these Terms, including the Non-Discrimination Policy and Hold Harmless Agreement. 
                If you do not agree to these Terms, you may not use the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content - Collapsible Sections */}
        <div className="space-y-4">
          {/* 1. Definitions */}
          <CollapsibleSection
            title="1. Definitions"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-2 text-sm text-gray-700 ml-6">
              <p><strong>"Company," "we," "us," or "our"</strong> refers to Zee Executive Group and all of its subsidiaries, affiliates, parent companies, officers, directors, employees, agents, contractors, and assigns.</p>
              <p><strong>"Platform" or "ZALPHA"</strong> refers to the ZALPHA job connection platform, including the website, mobile applications, and all associated services.</p>
              <p><strong>"Student" or "Candidate"</strong> refers to college students and high school graduates using the platform to seek employment opportunities.</p>
              <p><strong>"Employer"</strong> refers to companies and organizations using the platform to post jobs and recruit candidates.</p>
              <p><strong>"User" or "you"</strong> refers to any person or entity accessing or using the platform.</p>
              <p><strong>"Content"</strong> refers to all text, images, data, information, and materials on the platform.</p>
            </div>
          </CollapsibleSection>

          {/* 2. Acceptance of Terms */}
          <CollapsibleSection
            title="2. Acceptance of Terms"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p>By creating an account, accessing, or using the ZALPHA platform, you acknowledge that you have read, understood, and agree to be bound by:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>These Terms of Service</li>
                <li>The Non-Discrimination Policy</li>
                <li>The Hold Harmless and Indemnification Agreement</li>
                <li>The Privacy Policy</li>
                <li>Any additional policies or guidelines posted on the platform</li>
              </ul>
              <p>These documents are incorporated by reference and collectively constitute the entire agreement between you and the Company.</p>
            </div>
          </CollapsibleSection>

          {/* 3. Eligibility */}
          <CollapsibleSection
            title="3. Eligibility Requirements"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p><strong>3.1 Age Requirement:</strong> You must be at least 18 years of age to use the platform.</p>
              <p><strong>3.2 Student Eligibility:</strong> Students must be:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Currently enrolled in college or have graduated from high school/college</li>
                <li>Have graduated within one (1) year from the date of application</li>
                <li>Located in or willing to work in CNMI, FSM, Guam, Hawaii, Marshall Islands, or Palau</li>
              </ul>
              <p><strong>3.3 Verification:</strong> All students must complete ID verification by submitting valid government-issued identification and student ID. Accounts will remain restricted until verification is approved.</p>
              <p><strong>3.4 Employer Eligibility:</strong> Employers must be legitimate businesses or organizations with valid business operations.</p>
              <p><strong>3.5 Legal Capacity:</strong> You represent that you have the legal capacity to enter into this binding agreement.</p>
            </div>
          </CollapsibleSection>

          {/* 4. Account Registration */}
          <CollapsibleSection
            title="4. Account Registration and Security"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p><strong>4.1 Accurate Information:</strong> You must provide accurate, current, and complete information during registration and maintain the accuracy of such information.</p>
              <p><strong>4.2 Account Security:</strong> You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</p>
              <p><strong>4.3 One Account Per Person:</strong> Each user may maintain only one account. Multiple accounts are prohibited.</p>
              <p><strong>4.4 Account Sharing:</strong> You may not share your account with others or allow others to access your account.</p>
              <p><strong>4.5 Notification of Breach:</strong> You must immediately notify the Company of any unauthorized use of your account.</p>
            </div>
          </CollapsibleSection>

          {/* 5. Non-Discrimination Policy */}
          <CollapsibleSection
            title="5. Non-Discrimination Policy (MANDATORY)"
            icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p className="font-bold text-purple-900">ALL EMPLOYERS MUST COMPLY WITH THIS POLICY</p>
              <p><strong>5.1 Equal Opportunity Commitment:</strong> The Company is committed to equal opportunity employment. All employers using the platform must evaluate candidates based solely on qualifications, skills, and experience.</p>
              <p><strong>5.2 Prohibited Discrimination:</strong> Employers SHALL NOT discriminate against candidates on the basis of:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-purple-900">
                <li>Race, color, ethnicity, or national origin</li>
                <li>Religion or creed</li>
                <li>Sex, gender, gender identity, or gender expression</li>
                <li>Sexual orientation</li>
                <li>Age (except minimum age requirements)</li>
                <li>Disability, physical condition, or medical condition</li>
                <li>Genetic information</li>
                <li>Marital or family status</li>
                <li>Pregnancy or parental status</li>
                <li>Military or veteran status</li>
                <li>Any other characteristic protected by applicable law</li>
              </ul>
              <p><strong>5.3 Enforcement:</strong> Violations of this policy may result in immediate account suspension and permanent removal from the platform.</p>
              <p><strong>5.4 Reporting:</strong> Students may report discriminatory behavior through the platform's reporting system or by emailing <a href="mailto:compliance@zalpharecruit.com" className="text-purple-600 underline">compliance@zalpharecruit.com</a>.</p>
            </div>
          </CollapsibleSection>

          {/* 6. Hold Harmless Agreement */}
          <CollapsibleSection
            title="6. Hold Harmless & Indemnification (MANDATORY)"
            icon={<Scale className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p className="font-bold text-amber-900 uppercase">By using ZALPHA, you agree to the following:</p>
              
              <p><strong>6.1 Release of Liability:</strong> You release, discharge, and hold harmless Zee Executive Group and its subsidiaries from any and all claims, demands, damages, losses, liabilities, costs, and expenses arising from:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your use of the platform</li>
                <li>Employment relationships formed through the platform</li>
                <li>Actions of other users, employers, or third parties</li>
                <li>Accuracy of job postings, profiles, or application materials</li>
                <li>Communications between users</li>
                <li>Verification processes or account decisions</li>
                <li>Platform availability, technical errors, or service interruptions</li>
                <li>Third-party integrations (Custom ATS, Websites, etc.)</li>
              </ul>

              <p><strong>6.2 Indemnification:</strong> You agree to indemnify, defend, and hold harmless the Company from all claims arising from:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your violation of these Terms or applicable laws</li>
                <li>Your use or misuse of the platform</li>
                <li>Content you post or transmit</li>
                <li>Your hiring decisions or employment practices (for employers)</li>
                <li>Your interactions with employers (for students)</li>
                <li>Breach of your representations or obligations</li>
              </ul>

              <p><strong>6.3 Disclaimer of Warranties:</strong> THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. The Company disclaims all warranties, including merchantability, fitness for a particular purpose, and accuracy of content.</p>

              <p><strong>6.4 Limitation of Liability:</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, the Company's total liability shall not exceed the amount you paid in the preceding 12 months, or $100 USD, whichever is less. The Company is not liable for indirect, incidental, or consequential damages.</p>
            </div>
          </CollapsibleSection>

          {/* 7. User Responsibilities */}
          <CollapsibleSection
            title="7. User Responsibilities"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p><strong>7.1 Lawful Use:</strong> You agree to use the platform only for lawful purposes and in compliance with all applicable laws.</p>
              <p><strong>7.2 Prohibited Conduct:</strong> You may not:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Post false, misleading, or fraudulent information</li>
                <li>Impersonate another person or entity</li>
                <li>Engage in discriminatory practices (employers)</li>
                <li>Harass, threaten, or abuse other users</li>
                <li>Violate intellectual property rights</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Scrape, data mine, or use automated tools without authorization</li>
                <li>Interfere with platform operation or security</li>
                <li>Use the platform for unauthorized commercial purposes</li>
                <li><strong>Take contract work "off-platform" or arrange side deals outside of ZALPHA</strong></li>
                <li><strong>Conduct any work, negotiations, or payments outside the ZALPHA platform</strong></li>
                <li><strong>Cheat on skills assessments, basic skills tests, or any evaluation</strong></li>
                <li><strong>Submit fake, fraudulent, or unverified reviews of employers</strong></li>
                <li><strong>Create multiple accounts to abuse the system or circumvent restrictions</strong></li>
                <li><strong>Manipulate profile information, credentials, or qualifications</strong></li>
              </ul>
              <p><strong>7.3 On-Platform Work Requirement (Contract Work):</strong> ALL contract work, negotiations, deliverables, communications, payments, and disputes MUST be conducted exclusively through the ZALPHA platform. Violating this requirement may result in immediate account suspension and legal action. This rule protects both parties legally and ensures payment security.</p>
              <p><strong>7.4 Content Standards:</strong> All content you post must be professional, respectful, and appropriate for a job platform.</p>
            </div>
          </CollapsibleSection>

          {/* 7A. Student/Candidate Violations & Account Termination - NEW SECTION */}
          <CollapsibleSection
            title="7A. Student/Candidate Account Suspension & Termination (CRITICAL)"
            icon={<AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p className="font-bold text-red-900 uppercase">STUDENTS/CANDIDATES: READ CAREFULLY</p>
              
              <p><strong>7A.1 Zero Tolerance Policy:</strong> ZALPHA maintains a zero-tolerance policy for student/candidate misconduct. Your account MAY BE IMMEDIATELY SUSPENDED OR PERMANENTLY TERMINATED for any of the following violations:</p>
              
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 my-3">
                <p className="font-bold text-red-900 mb-2">Automatic Termination Offenses:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-red-900">
                  <li><strong>Cheating on Assessments:</strong> Using unauthorized assistance, copying answers, having someone else take tests, or manipulating assessment results on the Basic Skills Test, employer custom assessments, or any evaluation</li>
                  <li><strong>Fake or Fraudulent Reviews:</strong> Submitting false, unverified, defamatory, or malicious reviews of employers intended to cause reputational harm or damage</li>
                  <li><strong>Review Manipulation:</strong> Creating multiple accounts to post fake reviews, coordinating review attacks with other users, or accepting payment to post fake reviews</li>
                  <li><strong>Credential Fraud:</strong> Falsifying education credentials, work history, skills, certifications, or ID verification documents</li>
                  <li><strong>Identity Theft:</strong> Impersonating another person, using stolen identification, or creating accounts with false identities</li>
                  <li><strong>System Abuse:</strong> Creating multiple accounts to circumvent restrictions, game the system, or harass employers</li>
                  <li><strong>Defamation & Libel:</strong> Posting knowingly false statements about employers with intent to harm their reputation or business</li>
                </ul>
              </div>

              <p><strong>7A.2 Legal Consequences for Violations:</strong></p>
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 my-3">
                <p className="font-bold text-amber-900 mb-2">Students who violate these policies may face:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-amber-900">
                  <li><strong>Immediate Account Suspension:</strong> Temporary or permanent removal from platform</li>
                  <li><strong>Permanent Termination:</strong> Lifetime ban from ZALPHA platform with no opportunity for reinstatement</li>
                  <li><strong>Legal Action:</strong> Civil lawsuits for defamation, fraud, or damages caused by fake reviews or false statements</li>
                  <li><strong>Criminal Referral:</strong> Reporting to law enforcement for identity theft, fraud, or other criminal conduct</li>
                  <li><strong>Financial Liability:</strong> You may be held personally liable for damages to employers' reputations or business losses</li>
                  <li><strong>Collection of Damages:</strong> Employers may sue you individually for monetary damages, legal fees, and injunctive relief</li>
                </ul>
              </div>

              <p><strong>7A.3 Fake Review Examples (PROHIBITED):</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Posting negative reviews about companies you never worked for or interviewed with</li>
                <li>Exaggerating or fabricating harassment, discrimination, or workplace safety issues</li>
                <li>Coordinating with other students to "brigade" or mass-downvote an employer</li>
                <li>Posting reviews under multiple fake accounts</li>
                <li>Accepting money or favors to post fake positive/negative reviews</li>
                <li>Making unverified claims of illegal activity without evidence</li>
              </ul>

              <p><strong>7A.4 Assessment Cheating Examples (PROHIBITED):</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Having someone else take the Basic Skills Test or employer assessments for you</li>
                <li>Using answer keys, cheat sheets, or unauthorized study materials during tests</li>
                <li>Screen-sharing or collaborating with others during individual assessments</li>
                <li>Using AI tools, ChatGPT, or other automated assistance without permission</li>
                <li>Taking screenshots of test questions to share with other students</li>
                <li>Attempting to hack, manipulate, or access assessment databases</li>
              </ul>

              <p><strong>7A.5 Investigation & Due Process:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>ZALPHA reserves the right to investigate suspected violations using platform data, IP logs, assessment patterns, and user reports</li>
                <li>You may be asked to provide evidence, participate in interviews, or retake assessments if misconduct is suspected</li>
                <li>Refusal to cooperate with investigations may result in immediate account suspension</li>
                <li>ZALPHA will notify you of suspension/termination decisions, but is not required to disclose specific evidence or investigative methods</li>
              </ul>

              <p><strong>7A.6 No Refunds or Compensation:</strong> If your account is terminated for violations, you forfeit:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Any pending job applications or contract work</li>
                <li>Access to employer connections and networking opportunities</li>
                <li>Any paid subscription features (no refunds issued)</li>
                <li>All profile data, reviews, and platform history</li>
              </ul>

              <p className="font-bold text-red-900 mt-4">
                ⚠️ WARNING: Employers have the legal right to sue you individually for defamation, libel, or damages caused by fake reviews. ZALPHA will cooperate with legal proceedings and may be required to disclose your identity, contact information, and evidence of violations.
              </p>

              <p className="font-bold text-red-900">
                By using ZALPHA, you acknowledge that you understand these policies and accept full legal responsibility for your actions on the platform.
              </p>
            </div>
          </CollapsibleSection>

          {/* 8. Subscriptions and Payments */}
          <CollapsibleSection
            title="8. Subscriptions and Payments"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p><strong>8.1 Student Accounts:</strong> Basic student accounts are free. Ultra Premium features ($19.99/month) are optional.</p>
              <p><strong>8.2 Employer Accounts:</strong> Employer subscriptions are required ($99 Starter, $249 Professional, $499 Ultra Premium per month).</p>
              <p><strong>8.3 Billing:</strong> Subscriptions are billed monthly. You authorize recurring charges to your payment method.</p>
              <p><strong>8.4 Cancellation:</strong> You may cancel at any time. No refunds for partial months.</p>
              <p><strong>8.5 Price Changes:</strong> We reserve the right to change pricing with 30 days' notice.</p>
            </div>
          </CollapsibleSection>

          {/* 9. Intellectual Property */}
          <CollapsibleSection
            title="9. Intellectual Property Rights"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p><strong>9.1 Company Ownership:</strong> The ZALPHA platform, including all content, features, and functionality, is owned by the Company and protected by copyright, trademark, and other intellectual property laws.</p>
              <p><strong>9.2 User Content License:</strong> By posting content, you grant the Company a worldwide, royalty-free license to use, display, and distribute such content in connection with the platform.</p>
            </div>
          </CollapsibleSection>

          {/* 10. Privacy and Data */}
          <CollapsibleSection
            title="10. Privacy and Data Protection"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p><strong>10.1 Privacy Policy:</strong> Our collection and use of personal information is governed by our Privacy Policy.</p>
              <p><strong>10.2 ID Verification:</strong> ID documents are encrypted, stored securely, and never shared with employers or third parties.</p>
              <p><strong>10.3 Student Data:</strong> Students control what information is visible to employers through opt-in settings.</p>
              <p><strong>10.4 Data Security:</strong> We implement reasonable security measures, but cannot guarantee absolute security.</p>
            </div>
          </CollapsibleSection>

          {/* 11. Account Termination */}
          <CollapsibleSection
            title="11. Account Termination"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p><strong>11.1 Termination by User:</strong> You may terminate your account at any time through account settings.</p>
              <p><strong>11.2 Termination by Company:</strong> We may suspend or terminate your account immediately for:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Violation of these Terms</li>
                <li>Violation of the Non-Discrimination Policy</li>
                <li>Fraudulent or illegal activity</li>
                <li>Failure to pay subscription fees (employers)</li>
                <li>Inactivity for extended periods</li>
                <li>Any reason at our sole discretion</li>
              </ul>
              <p><strong>11.3 Effect of Termination:</strong> Upon termination, your access to the platform will cease, and we may delete your data after a reasonable period.</p>
            </div>
          </CollapsibleSection>

          {/* 12. Dispute Resolution */}
          <CollapsibleSection
            title="12. Dispute Resolution and Arbitration"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p><strong>12.1 Informal Resolution:</strong> Before filing any claim, you agree to attempt to resolve disputes informally by contacting us at <a href="mailto:legal@zalpharecruit.com" className="text-blue-600 underline">legal@zalpharecruit.com</a>.</p>
              <p><strong>12.2 Arbitration:</strong> Any disputes that cannot be resolved informally shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>
              <p><strong>12.3 Class Action Waiver:</strong> You agree to resolve disputes individually and waive the right to participate in class actions or class arbitrations.</p>
              <p><strong>12.4 Exceptions:</strong> Either party may seek injunctive relief in court for intellectual property violations or breaches of confidentiality.</p>
            </div>
          </CollapsibleSection>

          {/* 13. Governing Law */}
          <CollapsibleSection
            title="13. Governing Law and Jurisdiction"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where Zee Executive Group is incorporated, without regard to conflict of law principles.</p>
            </div>
          </CollapsibleSection>

          {/* 14. General Provisions */}
          <CollapsibleSection
            title="14. General Provisions"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-3 text-sm text-gray-700 ml-6">
              <p><strong>14.1 Entire Agreement:</strong> These Terms constitute the entire agreement between you and the Company.</p>
              <p><strong>14.2 Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in effect.</p>
              <p><strong>14.3 Waiver:</strong> Failure to enforce any provision does not waive our right to enforce it later.</p>
              <p><strong>14.4 Assignment:</strong> You may not assign these Terms. We may assign them without restriction.</p>
              <p><strong>14.5 Amendments:</strong> We may modify these Terms at any time. Continued use constitutes acceptance of modifications.</p>
              <p><strong>14.6 Notices:</strong> We may provide notices through the platform, email, or postal mail.</p>
            </div>
          </CollapsibleSection>

          {/* Contact Information */}
          <CollapsibleSection
            title="Contact Information"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Zee Executive Group</strong></p>
              <p>For questions about these Terms:</p>
              <p>Email: <a href="mailto:legal@zalpharecruit.com" className="text-blue-600 underline">legal@zalpharecruit.com</a></p>
              <p>For compliance issues: <a href="mailto:compliance@zalpharecruit.com" className="text-blue-600 underline">compliance@zalpharecruit.com</a></p>
              <p>For support: <a href="mailto:support@zalpharecruit.com" className="text-blue-600 underline">support@zalpharecruit.com</a></p>
            </div>
          </CollapsibleSection>

          {/* Acknowledgement */}
          <CollapsibleSection
            title="Acknowledgement"
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            defaultOpen={false}
          >
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Zee Executive Group</strong></p>
              <p>For questions about these Terms:</p>
              <p>Email: <a href="mailto:legal@zalpharecruit.com" className="text-blue-600 underline">legal@zalpharecruit.com</a></p>
              <p>For compliance issues: <a href="mailto:compliance@zalpharecruit.com" className="text-blue-600 underline">compliance@zalpharecruit.com</a></p>
              <p>For support: <a href="mailto:support@zalpharecruit.com" className="text-blue-600 underline">support@zalpharecruit.com</a></p>
            </div>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
}