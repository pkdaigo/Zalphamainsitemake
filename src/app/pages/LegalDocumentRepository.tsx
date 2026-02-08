import { FileText, Download, Eye, Shield, Lock, Calendar, FileCheck, AlertTriangle, Search, Filter, ChevronDown } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { useState } from 'react';
import { generatePDF } from '@/app/utils/pdfGenerator';

interface LegalDocumentRepositoryProps {
  onNavigate: (page: string) => void;
}

export function LegalDocumentRepository({ onNavigate }: LegalDocumentRepositoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const documents = [
    // Core Legal Documents
    {
      id: 'terms-of-service',
      name: 'Terms of Service',
      category: 'core',
      description: 'Complete terms governing use of ZALPHA platform by all users',
      file: 'ZALPHA_Terms_of_Service_2026.pdf',
      size: '2.4 MB',
      pages: 24,
      version: '2.0',
      lastUpdated: 'January 15, 2026',
      status: 'active',
      mandatory: true,
      content: `Complete Terms of Service covering:
• User Responsibilities & Conduct
• Platform Access & Account Terms
• Payment Terms & Refund Policy
• Intellectual Property Rights
• Limitation of Liability
• Dispute Resolution & Arbitration
• Termination Conditions
• Governing Law (CNMI/Pacific Jurisdiction)`,
    },
    {
      id: 'privacy-policy',
      name: 'Privacy Policy',
      category: 'core',
      description: 'Comprehensive privacy policy detailing data collection, usage, and protection',
      file: 'ZALPHA_Privacy_Policy_2026.pdf',
      size: '1.8 MB',
      pages: 18,
      version: '2.0',
      lastUpdated: 'January 10, 2026',
      status: 'active',
      mandatory: true,
      content: `Privacy Policy includes:
• What Data We Collect (Personal, Profile, Usage)
• How We Use Your Data
• Data Sharing & Third Parties
• User Rights (Access, Deletion, Portability)
• Cookie Policy & Tracking
• Security Measures
• International Data Transfers
• Contact Information for Privacy Concerns`,
    },
    {
      id: 'user-agreement',
      name: 'User Agreement',
      category: 'core',
      description: 'Master user agreement for all platform participants',
      file: 'ZALPHA_User_Agreement_2026.pdf',
      size: '1.2 MB',
      pages: 12,
      version: '1.5',
      lastUpdated: 'January 5, 2026',
      status: 'active',
      mandatory: true,
      content: `User Agreement covers:
• Account Creation & Verification
• User Obligations & Prohibited Activities
• Content Ownership & Licensing
• Platform Rules & Community Standards
• Age Requirements (18+)
• Communication Guidelines
• Data Accuracy Requirements`,
    },

    // Compliance Documents
    {
      id: 'ferpa-compliance',
      name: 'FERPA Compliance Documentation',
      category: 'compliance',
      description: 'Educational records protection and FERPA compliance framework',
      file: 'ZALPHA_FERPA_Compliance_2026.pdf',
      size: '3.1 MB',
      pages: 32,
      version: '1.0',
      lastUpdated: 'December 20, 2025',
      status: 'active',
      mandatory: true,
      content: `FERPA Compliance includes:
• Educational Records Definition
• Student Consent Requirements
• Data Access Controls & Logging
• Third-Party Disclosure Rules
• School Partnership Agreements
• Parent/Guardian Rights
• Record Amendment Procedures
• Annual Notification Requirements
• Audit & Compliance Reporting`,
    },
    {
      id: 'ada-compliance',
      name: 'ADA Compliance & Accessibility Policy',
      category: 'compliance',
      description: 'Americans with Disabilities Act compliance and accessibility standards',
      file: 'ZALPHA_ADA_Compliance_2026.pdf',
      size: '2.8 MB',
      pages: 28,
      version: '1.0',
      lastUpdated: 'January 30, 2026',
      status: 'active',
      mandatory: true,
      content: `ADA Compliance covers:
• WCAG 2.1 AA Compliance Standards
• Disability Accommodation Procedures
• Assistive Technology Support
• Alternative Format Provisions
• Reasonable Accommodation Requests
• Disability Non-Discrimination Policy
• Accessibility Testing & Monitoring
• Grievance Procedures
• Third-Party Accessibility Requirements`,
    },
    {
      id: 'coppa-compliance',
      name: 'COPPA Compliance (Under 18 Policy)',
      category: 'compliance',
      description: 'Children\'s Online Privacy Protection Act compliance (18+ requirement)',
      file: 'ZALPHA_COPPA_Age_Policy_2026.pdf',
      size: '1.1 MB',
      pages: 10,
      version: '1.0',
      lastUpdated: 'December 15, 2025',
      status: 'active',
      mandatory: true,
      content: `COPPA Compliance includes:
• 18+ Age Requirement Policy
• Age Verification Procedures
• Parental Consent (if under 18)
• Data Collection Restrictions
• Account Termination for Minors
• Legal Liability Protection
• School-Sanctioned Access Exceptions`,
    },
    {
      id: 'gdpr-compliance',
      name: 'GDPR Compliance Documentation',
      category: 'compliance',
      description: 'General Data Protection Regulation compliance for international users',
      file: 'ZALPHA_GDPR_Compliance_2026.pdf',
      size: '2.5 MB',
      pages: 26,
      version: '1.0',
      lastUpdated: 'January 8, 2026',
      status: 'active',
      mandatory: false,
      content: `GDPR Compliance covers:
• Lawful Basis for Processing
• Data Subject Rights (Access, Erasure, Portability)
• Consent Management
• Data Protection Impact Assessment
• Data Breach Notification Procedures
• Data Processing Agreements
• Cross-Border Data Transfers
• Privacy by Design & Default
• DPO Contact Information`,
    },

    // Business Agreements
    {
      id: 'employer-agreement',
      name: 'Employer Service Agreement',
      category: 'agreements',
      description: 'Master service agreement for employer subscriptions',
      file: 'ZALPHA_Employer_Agreement_2026.pdf',
      size: '2.7 MB',
      pages: 22,
      version: '2.0',
      lastUpdated: 'December 15, 2025',
      status: 'active',
      mandatory: true,
      content: `Employer Agreement includes:
• Subscription Terms & Pricing
• Service Level Agreements (SLAs)
• Data Access & Usage Rights
• Payment Terms & Billing
• Cancellation & Refund Policy
• Non-Discrimination Requirements
• ATS Integration Terms
• White-Label Restrictions
• Confidentiality Obligations
• Dispute Resolution`,
    },
    {
      id: 'school-partnership',
      name: 'Educational Institution Partnership Agreement',
      category: 'agreements',
      description: 'Partnership terms for colleges, universities, and high schools',
      file: 'ZALPHA_School_Partnership_2026.pdf',
      size: '3.2 MB',
      pages: 30,
      version: '1.5',
      lastUpdated: 'January 12, 2026',
      status: 'active',
      mandatory: true,
      content: `School Partnership includes:
• Revenue Share Model (40% to schools)
• FERPA Compliance Requirements
• Student Data Protection
• Marketing & Branding Guidelines
• Success Metrics & Reporting
• Training & Support Services
• Contract Duration & Renewal
• Termination Conditions
• Liability & Indemnification
• Government Loan Integration`,
    },
    {
      id: 'contractor-agreement',
      name: 'Independent Contractor Agreement',
      category: 'agreements',
      description: 'Agreement for freelancers and contractors on the platform',
      file: 'ZALPHA_Contractor_Agreement_2026.pdf',
      size: '1.9 MB',
      pages: 16,
      version: '1.0',
      lastUpdated: 'December 22, 2025',
      status: 'active',
      mandatory: true,
      content: `Contractor Agreement covers:
• Independent Contractor Status
• Project-Based Work Terms
• Payment Terms & Milestones
• Intellectual Property Rights
• Confidentiality & NDA
• Work Quality Standards
• Dispute Resolution
• Tax Responsibilities
• Insurance Requirements`,
    },

    // Security & Data Protection
    {
      id: 'data-security',
      name: 'Data Protection & Security Policies',
      category: 'security',
      description: 'Comprehensive data security framework and incident response',
      file: 'ZALPHA_Data_Security_2026.pdf',
      size: '2.2 MB',
      pages: 20,
      version: '1.0',
      lastUpdated: 'December 10, 2025',
      status: 'active',
      mandatory: true,
      content: `Data Security Policy includes:
• Encryption Standards (AES-256, TLS 1.3)
• Access Control & Authentication
• Data Backup & Recovery
• Incident Response Procedures
• Security Monitoring & Logging
• Vulnerability Management
• Third-Party Security Audits
• Employee Security Training
• Physical Security Controls
• Business Continuity Planning`,
    },
    {
      id: 'data-breach',
      name: 'Data Breach Response Plan',
      category: 'security',
      description: 'Incident response and breach notification procedures',
      file: 'ZALPHA_Breach_Response_2026.pdf',
      size: '1.6 MB',
      pages: 14,
      version: '1.0',
      lastUpdated: 'December 28, 2025',
      status: 'active',
      mandatory: true,
      content: `Breach Response Plan covers:
• Incident Detection & Classification
• Containment & Eradication
• User Notification Procedures (72 hours)
• Regulatory Notification Requirements
• Forensic Investigation Process
• Legal & PR Communication
• Post-Incident Review
• Preventive Measures`,
    },
    {
      id: 'data-retention',
      name: 'Data Retention & Deletion Policy',
      category: 'security',
      description: 'Data lifecycle management and retention schedules',
      file: 'ZALPHA_Data_Retention_2026.pdf',
      size: '1.3 MB',
      pages: 11,
      version: '1.0',
      lastUpdated: 'January 3, 2026',
      status: 'active',
      mandatory: true,
      content: `Data Retention Policy includes:
• Active Account Data (indefinite)
• Inactive Account Data (3 years)
• Deleted Account Data (30-day grace period)
• Application Data (7 years for compliance)
• Log Files (90 days)
• Backup Retention (30 days)
• Legal Hold Procedures
• Right to Erasure Implementation`,
    },

    // Intellectual Property
    {
      id: 'ip-policy',
      name: 'Intellectual Property Policy',
      category: 'ip',
      description: 'Trademark, copyright, and IP protection policies',
      file: 'ZALPHA_IP_Policy_2026.pdf',
      size: '2.0 MB',
      pages: 18,
      version: '1.0',
      lastUpdated: 'January 20, 2026',
      status: 'active',
      mandatory: true,
      content: `IP Policy covers:
• ZALPHA Trademark Rights
• Copyright Notices & Protections
• User-Generated Content Licensing
• DMCA Takedown Procedures
• Infringement Reporting
• Platform Code Copyright
• Trade Secret Protection
• Logo & Branding Guidelines
• Third-Party Content Attribution`,
    },
    {
      id: 'dmca-policy',
      name: 'DMCA Takedown Policy',
      category: 'ip',
      description: 'Digital Millennium Copyright Act compliance procedures',
      file: 'ZALPHA_DMCA_Policy_2026.pdf',
      size: '1.4 MB',
      pages: 12,
      version: '1.0',
      lastUpdated: 'December 18, 2025',
      status: 'active',
      mandatory: true,
      content: `DMCA Policy includes:
• Copyright Infringement Reporting
• Designated DMCA Agent
• Takedown Request Procedures
• Counter-Notification Process
• Repeat Infringer Policy (3-strike rule)
• Safe Harbor Provisions
• Response Timeframes (24-48 hours)`,
    },

    // Platform Operations
    {
      id: 'content-moderation',
      name: 'Content Moderation & Community Guidelines',
      category: 'operations',
      description: 'Platform rules and moderation policies',
      file: 'ZALPHA_Moderation_Policy_2026.pdf',
      size: '1.7 MB',
      pages: 15,
      version: '1.0',
      lastUpdated: 'January 17, 2026',
      status: 'active',
      mandatory: true,
      content: `Content Moderation includes:
• Prohibited Content Types
• User Conduct Standards
• Reporting Mechanisms
• Moderation Review Process
• Appeal Procedures
• Account Suspension/Termination
• Cultural Sensitivity Requirements
• Harassment & Discrimination Policy
• Spam & Fraud Prevention`,
    },
    {
      id: 'payment-terms',
      name: 'Payment Processing & Refund Policy',
      category: 'operations',
      description: 'Financial terms, payment processing, and refund procedures',
      file: 'ZALPHA_Payment_Terms_2026.pdf',
      size: '1.5 MB',
      pages: 13,
      version: '1.0',
      lastUpdated: 'December 30, 2025',
      status: 'active',
      mandatory: true,
      content: `Payment Terms cover:
• Accepted Payment Methods
• Subscription Billing Cycles
• Transaction Fees (5% platform fee)
• Refund Policy & Procedures
• Chargeback Handling
• Payment Disputes
• Currency Conversion
• Tax Collection & Remittance
• Payout Schedules for Schools`,
    },
    {
      id: 'api-terms',
      name: 'API Terms of Use',
      category: 'operations',
      description: 'Third-party API access and integration terms',
      file: 'ZALPHA_API_Terms_2026.pdf',
      size: '1.8 MB',
      pages: 16,
      version: '1.0',
      lastUpdated: 'January 5, 2026',
      status: 'active',
      mandatory: false,
      content: `API Terms include:
• API Access Credentials
• Rate Limits & Quotas
• Data Access Permissions
• Security Requirements
• Acceptable Use Policy
• Integration Testing
• Support & Documentation
• Service Level Agreements
• Termination Conditions`,
    },

    // Regional & Cultural
    {
      id: 'pacific-cultural-policy',
      name: 'Pacific Islands Cultural Sensitivity Policy',
      category: 'regional',
      description: 'Cultural respect and sensitivity guidelines for Pacific communities',
      file: 'ZALPHA_Cultural_Policy_2026.pdf',
      size: '2.1 MB',
      pages: 19,
      version: '1.0',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      mandatory: true,
      content: `Cultural Policy includes:
• Pacific Island Cultural Values
• Language & Communication Guidelines
• Cultural Competency Training
• Indigenous Knowledge Protection
• Community Engagement Standards
• Traditional Practice Respect
• Cultural Representation Requirements
• Feedback from Island Communities`,
    },
    {
      id: 'cnmi-compliance',
      name: 'CNMI Business Compliance Documentation',
      category: 'regional',
      description: 'Commonwealth of Northern Mariana Islands regulatory compliance',
      file: 'ZALPHA_CNMI_Compliance_2026.pdf',
      size: '1.9 MB',
      pages: 17,
      version: '1.0',
      lastUpdated: 'January 2, 2026',
      status: 'active',
      mandatory: true,
      content: `CNMI Compliance covers:
• Business License & Registration
• DBA Filing (KI Manpower Services DBA ZALPHA)
• Local Tax Compliance
• Employment Law Compliance
• Data Residency Requirements
• Local Hiring Preferences
• Government Reporting`,
    },

    // Insurance & Liability
    {
      id: 'insurance-policy',
      name: 'Insurance Coverage & Liability Policy',
      category: 'insurance',
      description: 'Platform insurance coverage and liability protections',
      file: 'ZALPHA_Insurance_2026.pdf',
      size: '1.6 MB',
      pages: 14,
      version: '1.0',
      lastUpdated: 'December 12, 2025',
      status: 'active',
      mandatory: true,
      content: `Insurance Policy includes:
• Errors & Omissions (E&O) Coverage
• Cyber Liability Insurance
• General Liability Coverage
• Professional Indemnity
• Data Breach Insurance
• Coverage Limits & Deductibles
• Claims Procedures
• Insurance Certificates for Partners`,
    },
    {
      id: 'indemnification',
      name: 'Indemnification & Limitation of Liability',
      category: 'insurance',
      description: 'Liability limitations and indemnification terms',
      file: 'ZALPHA_Indemnification_2026.pdf',
      size: '1.3 MB',
      pages: 11,
      version: '1.0',
      lastUpdated: 'December 20, 2025',
      status: 'active',
      mandatory: true,
      content: `Indemnification covers:
• Platform Liability Limitations
• User Indemnification Obligations
• Third-Party Claims
• Consequential Damages Exclusion
• Maximum Liability Caps
• Defense & Settlement Rights
• Survival of Terms`,
    },

    // Additional Legal
    {
      id: 'cookie-policy',
      name: 'Cookie Policy & Tracking Technologies',
      category: 'additional',
      description: 'Cookie usage and tracking technology disclosures',
      file: 'ZALPHA_Cookie_Policy_2026.pdf',
      size: '1.2 MB',
      pages: 10,
      version: '1.0',
      lastUpdated: 'January 7, 2026',
      status: 'active',
      mandatory: true,
      content: `Cookie Policy includes:
• Types of Cookies Used
• Essential vs. Optional Cookies
• Third-Party Cookies
• Cookie Consent Management
• Tracking Technology Disclosure
• Opt-Out Procedures
• Cookie Lifespan
• Analytics & Advertising Cookies`,
    },
    {
      id: 'accessibility-statement',
      name: 'Accessibility Statement & VPAT',
      category: 'additional',
      description: 'Voluntary Product Accessibility Template and accessibility commitment',
      file: 'ZALPHA_VPAT_Accessibility_2026.pdf',
      size: '2.3 MB',
      pages: 21,
      version: '1.0',
      lastUpdated: 'February 1, 2026',
      status: 'active',
      mandatory: true,
      content: `Accessibility Statement includes:
• WCAG 2.1 AA Compliance Status
• VPAT (Voluntary Product Accessibility Template)
• Accessibility Features List
• Known Limitations
• Remediation Timeline
• Accessibility Contact Information
• Third-Party Accessibility Testing Results
• Continuous Improvement Commitment`,
    },
    {
      id: 'government-loan-terms',
      name: 'Government Loan Application Terms',
      category: 'additional',
      description: 'Terms for government-backed student loan applications',
      file: 'ZALPHA_Loan_Terms_2026.pdf',
      size: '2.6 MB',
      pages: 24,
      version: '1.0',
      lastUpdated: 'January 18, 2026',
      status: 'active',
      mandatory: true,
      content: `Government Loan Terms include:
• Loan Application Procedures
• Eligibility Requirements
• Documentation Requirements
• School Certification Process
• Disbursement Procedures
• Loan Servicer Information
• Repayment Terms & Options
• Default Consequences
• FERPA Compliance for Loan Data
• Privacy Protections`,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Documents', count: documents.length },
    { id: 'core', name: 'Core Legal', count: documents.filter(d => d.category === 'core').length },
    { id: 'compliance', name: 'Compliance', count: documents.filter(d => d.category === 'compliance').length },
    { id: 'agreements', name: 'Agreements', count: documents.filter(d => d.category === 'agreements').length },
    { id: 'security', name: 'Security', count: documents.filter(d => d.category === 'security').length },
    { id: 'ip', name: 'Intellectual Property', count: documents.filter(d => d.category === 'ip').length },
    { id: 'operations', name: 'Operations', count: documents.filter(d => d.category === 'operations').length },
    { id: 'regional', name: 'Regional', count: documents.filter(d => d.category === 'regional').length },
    { id: 'insurance', name: 'Insurance', count: documents.filter(d => d.category === 'insurance').length },
    { id: 'additional', name: 'Additional', count: documents.filter(d => d.category === 'additional').length },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (doc: typeof documents[0]) => {
    generatePDF(doc, {
      repositoryName: 'Legal Document Repository',
      headerColor: [99, 102, 241], // Indigo
      accentColor: [79, 70, 229]
    });
  };

  const handleView = (docId: string) => {
    setExpandedDoc(expandedDoc === docId ? null : docId);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      core: 'from-blue-500 to-indigo-600',
      compliance: 'from-green-500 to-emerald-600',
      agreements: 'from-purple-500 to-pink-600',
      security: 'from-red-500 to-orange-600',
      ip: 'from-yellow-500 to-amber-600',
      operations: 'from-cyan-500 to-teal-600',
      regional: 'from-violet-500 to-purple-600',
      insurance: 'from-indigo-500 to-blue-600',
      additional: 'from-gray-500 to-slate-600',
    };
    return colors[category] || 'from-gray-500 to-slate-600';
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      core: { bg: 'bg-blue-500/20', text: 'text-blue-300', label: 'Core Legal' },
      compliance: { bg: 'bg-green-500/20', text: 'text-green-300', label: 'Compliance' },
      agreements: { bg: 'bg-purple-500/20', text: 'text-purple-300', label: 'Agreements' },
      security: { bg: 'bg-red-500/20', text: 'text-red-300', label: 'Security' },
      ip: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', label: 'IP' },
      operations: { bg: 'bg-cyan-500/20', text: 'text-cyan-300', label: 'Operations' },
      regional: { bg: 'bg-violet-500/20', text: 'text-violet-300', label: 'Regional' },
      insurance: { bg: 'bg-indigo-500/20', text: 'text-indigo-300', label: 'Insurance' },
      additional: { bg: 'bg-gray-500/20', text: 'text-gray-300', label: 'Additional' },
    };
    return badges[category] || badges.additional;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-b-4 border-blue-400">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BackButton onNavigate={onNavigate} destination="internal-dashboard" variant="light" />
          <div className="flex items-center gap-6 mt-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border-4 border-white/40 shadow-2xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Legal Document Repository</h1>
              <p className="text-xl text-white/90">
                {documents.length} Comprehensive Legal Documents • Download & View Available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-gray-900">
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-500/20 border-2 border-blue-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-300 mb-1">{documents.length}</div>
              <div className="text-sm text-blue-200">Total Documents</div>
            </div>
            <div className="bg-green-500/20 border-2 border-green-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-300 mb-1">{documents.filter(d => d.mandatory).length}</div>
              <div className="text-sm text-green-200">Mandatory Docs</div>
            </div>
            <div className="bg-purple-500/20 border-2 border-purple-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-300 mb-1">{documents.reduce((sum, d) => sum + d.pages, 0)}</div>
              <div className="text-sm text-purple-200">Total Pages</div>
            </div>
            <div className="bg-cyan-500/20 border-2 border-cyan-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-cyan-300 mb-1">{filteredDocuments.length}</div>
              <div className="text-sm text-cyan-200">Filtered Results</div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-20">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Documents Found</h3>
              <p className="text-white/70">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDocuments.map((doc) => {
                const badge = getCategoryBadge(doc.category);
                const isExpanded = expandedDoc === doc.id;

                return (
                  <div
                    key={doc.id}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl border-2 border-white/20 hover:border-cyan-400/50 transition-all overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        {/* Document Info */}
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(doc.category)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <FileText className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white">{doc.name}</h3>
                              {doc.mandatory && (
                                <span className="bg-red-500/20 border border-red-400/30 text-red-300 text-xs px-2 py-1 rounded-lg font-semibold flex-shrink-0">
                                  MANDATORY
                                </span>
                              )}
                            </div>
                            <p className="text-white/70 mb-3">{doc.description}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                              <span className={`${badge.bg} ${badge.text} px-3 py-1 rounded-lg font-semibold`}>
                                {badge.label}
                              </span>
                              <span className="flex items-center gap-1">
                                <FileCheck className="w-4 h-4" />
                                {doc.pages} pages
                              </span>
                              <span>{doc.size}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {doc.lastUpdated}
                              </span>
                              <span className="text-cyan-400 font-semibold">v{doc.version}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 flex-shrink-0">
                          <button
                            onClick={() => handleView(doc.id)}
                            className="px-4 py-2 bg-blue-500/20 border-2 border-blue-400/30 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all flex items-center gap-2 font-semibold"
                          >
                            <Eye className="w-4 h-4" />
                            {isExpanded ? 'Hide' : 'View'}
                          </button>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="px-4 py-2 bg-green-500/20 border-2 border-green-400/30 text-green-300 rounded-xl hover:bg-green-500/30 transition-all flex items-center gap-2 font-semibold"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <h4 className="text-lg font-bold text-white mb-3">Document Contents:</h4>
                          <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                            <pre className="text-white/80 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                              {doc.content}
                            </pre>
                          </div>
                          <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-2">
                              <Lock className="w-4 h-4 text-green-400" />
                              <span className="text-green-300">Confidential Document</span>
                            </div>
                            <span>•</span>
                            <span>Status: <span className="text-green-400 font-semibold uppercase">{doc.status}</span></span>
                            <span>•</span>
                            <span>File: {doc.file}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Download All Section */}
          {filteredDocuments.length > 0 && (
            <div className="mt-12 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border-2 border-cyan-400/30 rounded-3xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Download All Documents</h3>
                <p className="text-white/70 mb-6">
                  Get the complete legal document package ({documents.length} documents, {documents.reduce((sum, d) => sum + d.pages, 0)} pages total)
                </p>
                <button
                  onClick={() => {
                    documents.forEach(doc => setTimeout(() => handleDownload(doc), 100));
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-3"
                >
                  <Download className="w-6 h-6" />
                  Download Complete Legal Package
                </button>
              </div>
            </div>
          )}

          {/* Legal Notice */}
          <div className="mt-8 bg-yellow-500/10 border-2 border-yellow-400/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-yellow-300 mb-2">Legal Notice</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  These documents are proprietary and confidential. They are provided for review and reference purposes.
                  All documents are subject to change and should be reviewed with legal counsel before implementation.
                  For legal inquiries, contact: <a href="mailto:legal@zalpharecruit.com" className="text-cyan-400 hover:text-cyan-300 underline">legal@zalpharecruit.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}