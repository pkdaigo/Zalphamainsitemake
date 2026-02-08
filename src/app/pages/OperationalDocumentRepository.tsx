import { FileText, Download, Eye, Settings, Lock, Calendar, FileCheck, AlertTriangle, Search, Filter, ChevronDown, Zap, Users, BookOpen, Briefcase, Target, TrendingUp, Shield } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { useState } from 'react';
import { generatePDF } from '@/app/utils/pdfGenerator';

interface OperationalDocumentRepositoryProps {
  onNavigate: (page: string) => void;
}

export function OperationalDocumentRepository({ onNavigate }: OperationalDocumentRepositoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const documents = [
    // Standard Operating Procedures (SOPs)
    {
      id: 'sop-onboarding',
      name: 'Student Onboarding Process SOP',
      category: 'sop',
      description: 'Complete procedures for onboarding new students to the platform',
      file: 'SOP_Student_Onboarding_2026.pdf',
      size: '2.8 MB',
      pages: 26,
      version: '3.0',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      critical: true,
      content: `Student Onboarding SOP includes:
• Welcome Email Sequence (Days 1-7)
• Account Verification Process
• Profile Completion Checklist (18 required fields)
• ADA Accommodation Assessment
• Skills Assessment Scheduling
• Platform Orientation Video (15 min)
• Initial Privacy Settings Configuration
• First Job Application Tutorial
• Success Metrics Tracking
• Follow-up Communication Schedule
• Common Issues & Troubleshooting
• Quality Check Requirements`,
    },
    {
      id: 'sop-employer-onboarding',
      name: 'Employer Onboarding Process SOP',
      category: 'sop',
      description: 'Standard procedures for bringing new employers onto the platform',
      file: 'SOP_Employer_Onboarding_2026.pdf',
      size: '3.1 MB',
      pages: 28,
      version: '2.5',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      critical: true,
      content: `Employer Onboarding SOP includes:
• Initial Sales Call Protocol
• Subscription Tier Selection Guide
• Company Verification Process (CNMI business license check)
• Payment Setup & Processing
• ATS Integration Configuration (if applicable)
• Posting First Job (guided walkthrough)
• Candidate Search Training (30 min session)
• Communication Best Practices
• ADA Compliance Requirements
• Success Manager Assignment
• 30-Day Check-in Schedule
• Billing & Invoicing Procedures`,
    },
    {
      id: 'sop-school-partnership',
      name: 'School Partnership Setup SOP',
      category: 'sop',
      description: 'Procedures for establishing educational institution partnerships',
      file: 'SOP_School_Partnership_2026.pdf',
      size: '3.5 MB',
      pages: 32,
      version: '2.0',
      lastUpdated: 'January 20, 2026',
      status: 'active',
      critical: true,
      content: `School Partnership SOP includes:
• Initial Partnership Inquiry Response
• Partnership Proposal Preparation
• Contract Negotiation Guidelines
• FERPA Compliance Setup
• Revenue Share Configuration (40% to schools)
• School Administrator Account Creation
• Career Services Integration
• Student Bulk Import Process
• White-Label Setup (if applicable)
• Training for School Staff (2-hour session)
• Co-Marketing Materials Preparation
• Launch Communication Plan
• Quarterly Business Review Schedule`,
    },
    {
      id: 'sop-job-posting',
      name: 'Job Posting Review & Approval SOP',
      category: 'sop',
      description: 'Quality control procedures for reviewing and approving job postings',
      file: 'SOP_Job_Posting_Review_2026.pdf',
      size: '2.3 MB',
      pages: 20,
      version: '1.8',
      lastUpdated: 'January 15, 2026',
      status: 'active',
      critical: true,
      content: `Job Posting Review SOP includes:
• Automated Screening Checklist
• Manual Review Requirements (Gold/Platinum tiers)
• Prohibited Content Detection
• ADA Compliance Verification
• Salary Range Validation
• Job Description Quality Standards
• Required vs. Preferred Skills Review
• Location & Remote Work Clarity
• Application Process Verification
• Approval/Rejection Criteria
• Revision Request Process
• Average Review Time: 2 hours (manual), 5 min (automated)`,
    },
    {
      id: 'sop-support-tickets',
      name: 'Customer Support Ticket Management SOP',
      category: 'sop',
      description: 'Standard procedures for handling customer support requests',
      file: 'SOP_Support_Tickets_2026.pdf',
      size: '2.6 MB',
      pages: 24,
      version: '2.2',
      lastUpdated: 'January 18, 2026',
      status: 'active',
      critical: true,
      content: `Support Ticket SOP includes:
• Ticket Priority Levels (Critical, High, Medium, Low)
• Response Time SLAs (Critical: 1 hour, High: 4 hours, Medium: 24 hours, Low: 48 hours)
• Ticket Assignment Rules
• Escalation Procedures
• Common Issue Knowledge Base
• Student Support Guidelines
• Employer Support Guidelines
• School Support Guidelines
• Resolution Documentation Requirements
• Customer Satisfaction Survey
• Follow-up Procedures
• Ticket Closure Checklist`,
    },
    {
      id: 'sop-data-breach',
      name: 'Data Breach Response SOP',
      category: 'sop',
      description: 'Emergency procedures for responding to data security incidents',
      file: 'SOP_Data_Breach_Response_2026.pdf',
      size: '2.9 MB',
      pages: 27,
      version: '1.5',
      lastUpdated: 'December 28, 2025',
      status: 'active',
      critical: true,
      content: `Data Breach Response SOP includes:
• Incident Detection & Reporting (immediately)
• Incident Commander Assignment
• Initial Assessment (within 1 hour)
• Containment Actions (within 2 hours)
• Evidence Preservation
• Affected User Identification
• Notification Requirements (within 72 hours)
• Regulatory Reporting (FERPA, GDPR if applicable)
• Public Communication Plan
• Legal Counsel Engagement
• Forensic Investigation
• Post-Incident Review & Improvements`,
    },

    // Training Materials
    {
      id: 'training-student-platform',
      name: 'Student Platform Training Guide',
      category: 'training',
      description: 'Complete training materials for students using ZALPHA',
      file: 'Training_Student_Platform_2026.pdf',
      size: '4.2 MB',
      pages: 38,
      version: '3.5',
      lastUpdated: 'February 1, 2026',
      status: 'active',
      critical: false,
      content: `Student Training Guide includes:
• Platform Overview & Navigation
• Creating a Winning Profile
• Resume Building Best Practices
• Job Search Strategies
• Application Process Step-by-Step
• Interview Preparation (including Video Interviews)
• Skills Assessment Preparation
• Using Zee AI Chatbot
• Setting Privacy Controls
• ADA Accommodations Request Process
• Contract Work Opportunities
• Government Loan Applications
• Troubleshooting Common Issues
• Mobile App Usage (future)`,
    },
    {
      id: 'training-employer-platform',
      name: 'Employer Platform Training Guide',
      category: 'training',
      description: 'Comprehensive training for employers using ZALPHA',
      file: 'Training_Employer_Platform_2026.pdf',
      size: '3.8 MB',
      pages: 34,
      version: '2.8',
      lastUpdated: 'January 30, 2026',
      status: 'active',
      critical: false,
      content: `Employer Training Guide includes:
• Dashboard Overview
• Creating Effective Job Postings
• Candidate Search & Filtering
• ATS Integration Setup
• Video Interview Scheduling
• Candidate Communication Best Practices
• Subscription Management
• Billing & Invoicing
• Analytics & Reporting
• Team Member Management
• ADA Compliance Requirements
• Cultural Sensitivity Guidelines
• Contract Worker Management
• Success Metrics Tracking`,
    },
    {
      id: 'training-school-admin',
      name: 'School Administrator Training Guide',
      category: 'training',
      description: 'Training materials for educational institution administrators',
      file: 'Training_School_Admin_2026.pdf',
      size: '3.6 MB',
      pages: 32,
      version: '2.5',
      lastUpdated: 'January 22, 2026',
      status: 'active',
      critical: false,
      content: `School Admin Training Guide includes:
• Admin Dashboard Overview
• Student Bulk Import Process
• Student Progress Monitoring
• Revenue Dashboard & Reports
• Career Services Integration
• FERPA Compliance Management
• Student Privacy Controls
• Employer Partnership Management
• Virtual College Fair Setup
• Success Metrics & KPIs
• Co-Marketing Materials
• Government Loan Integration
• Support Resources
• Quarterly Business Reviews`,
    },
    {
      id: 'training-internal-staff',
      name: 'Internal Staff Training Manual',
      category: 'training',
      description: 'Complete training for ZALPHA internal team members',
      file: 'Training_Internal_Staff_2026.pdf',
      size: '5.1 MB',
      pages: 46,
      version: '4.0',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      critical: true,
      content: `Internal Staff Training includes:
• Company Mission & Values
• Platform Architecture Overview
• All User Role Dashboards
• Customer Support Procedures
• Sales & Business Development
• Technical Support Basics
• Content Moderation Guidelines
• Data Privacy & Security
• FERPA & ADA Compliance
• Communication Standards
• Escalation Procedures
• Tools & Systems Access
• Performance Metrics
• Professional Development Resources`,
    },
    {
      id: 'training-cultural-sensitivity',
      name: 'Pacific Islands Cultural Sensitivity Training',
      category: 'training',
      description: 'Cultural competency training for working with Pacific communities',
      file: 'Training_Cultural_Sensitivity_2026.pdf',
      size: '2.7 MB',
      pages: 24,
      version: '1.5',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      critical: true,
      content: `Cultural Sensitivity Training includes:
• Pacific Islands Overview (CNMI, Guam, FSM, Palau, Marshall Islands)
• Cultural Values & Practices
• Communication Styles
• Family & Community Importance
• Respect for Elders & Authority
• Language Considerations
• Religious & Spiritual Practices
• Time Orientation Differences
• Conflict Resolution Approaches
• Gift-Giving Customs
• Business Etiquette
• Common Misunderstandings
• Best Practices for Engagement
• Case Studies & Scenarios`,
    },

    // Process Documentation
    {
      id: 'process-quality-assurance',
      name: 'Platform Quality Assurance Process',
      category: 'process',
      description: 'Quality control procedures for platform maintenance',
      file: 'Process_Quality_Assurance_2026.pdf',
      size: '2.4 MB',
      pages: 22,
      version: '2.0',
      lastUpdated: 'January 10, 2026',
      status: 'active',
      critical: true,
      content: `Quality Assurance Process includes:
• Daily System Health Checks
• Weekly Feature Testing Protocol
• Monthly Comprehensive Audits
• User Acceptance Testing (UAT)
• Bug Reporting & Tracking
• Release Testing Checklist
• Accessibility Testing (WCAG 2.1 AA)
• Mobile Responsiveness Testing
• Browser Compatibility Testing
• Performance Monitoring
• Security Vulnerability Scanning
• Regression Testing Requirements
• Quality Metrics Dashboard`,
    },
    {
      id: 'process-content-moderation',
      name: 'Content Moderation Process',
      category: 'process',
      description: 'Procedures for monitoring and moderating platform content',
      file: 'Process_Content_Moderation_2026.pdf',
      size: '2.8 MB',
      pages: 26,
      version: '2.3',
      lastUpdated: 'January 15, 2026',
      status: 'active',
      critical: true,
      content: `Content Moderation Process includes:
• Automated Content Screening
• Manual Review Triggers
• Prohibited Content Categories
• User-Generated Content Review
• Profile Content Guidelines
• Job Posting Standards
• Comment & Message Monitoring
• Reporting Mechanisms
• Moderation Decision Matrix
• Appeal Process
• Account Suspension Criteria
• Permanent Ban Procedures
• Transparency Reports
• Moderator Training Requirements`,
    },
    {
      id: 'process-payment-processing',
      name: 'Payment Processing & Reconciliation Process',
      category: 'process',
      description: 'Financial procedures for payment processing and reconciliation',
      file: 'Process_Payment_Processing_2026.pdf',
      size: '2.5 MB',
      pages: 23,
      version: '1.8',
      lastUpdated: 'December 30, 2025',
      status: 'active',
      critical: true,
      content: `Payment Processing includes:
• Subscription Billing Cycles
• Payment Gateway Integration
• Transaction Processing Flow
• Failed Payment Handling
• Refund Request Process
• Chargeback Management
• Revenue Recognition Rules
• School Revenue Share (40%) Calculation
• Payout Scheduling
• Invoice Generation
• Tax Collection & Remittance
• Financial Reconciliation (daily/monthly)
• Fraud Detection & Prevention
• Accounting System Integration`,
    },
    {
      id: 'process-user-verification',
      name: 'User Identity Verification Process',
      category: 'process',
      description: 'Procedures for verifying user identities and credentials',
      file: 'Process_User_Verification_2026.pdf',
      size: '2.1 MB',
      pages: 19,
      version: '1.5',
      lastUpdated: 'January 8, 2026',
      status: 'active',
      critical: true,
      content: `User Verification Process includes:
• Student Email Verification (.edu domains)
• Age Verification (18+ requirement)
• Employer Company Verification
• Business License Validation (CNMI)
• Educational Institution Accreditation Check
• Government Loan Eligibility Verification
• Identity Document Review (when required)
• Phone Number Verification
• Address Validation
• Social Media Profile Linking
• Professional Credential Verification
• Fraud Detection Signals
• Verification Appeals Process`,
    },

    // Policies & Procedures
    {
      id: 'policy-remote-work',
      name: 'Remote Work Policy & Procedures',
      category: 'policy',
      description: 'Internal remote work guidelines for ZALPHA team',
      file: 'Policy_Remote_Work_2026.pdf',
      size: '1.9 MB',
      pages: 16,
      version: '2.0',
      lastUpdated: 'January 5, 2026',
      status: 'active',
      critical: false,
      content: `Remote Work Policy includes:
• Eligibility Requirements
• Equipment Provisioning
• Home Office Setup Standards
• Working Hours & Availability
• Communication Expectations
• Security Requirements
• Data Protection at Home
• Video Meeting Etiquette
• Productivity Metrics
• Performance Management
• Team Collaboration Tools
• Expense Reimbursement
• Work-Life Balance Guidelines
• Mental Health Resources`,
    },
    {
      id: 'policy-incident-response',
      name: 'Incident Response & Crisis Management',
      category: 'policy',
      description: 'Procedures for handling platform incidents and crises',
      file: 'Policy_Incident_Response_2026.pdf',
      size: '2.7 MB',
      pages: 25,
      version: '1.8',
      lastUpdated: 'December 20, 2025',
      status: 'active',
      critical: true,
      content: `Incident Response Policy includes:
• Incident Severity Levels (P0-P4)
• On-Call Rotation Schedule
• Incident Commander Role
• Communication Protocols
• Escalation Matrix
• Status Page Updates
• Customer Communication Templates
• War Room Procedures
• Postmortem Requirements
• Root Cause Analysis
• Prevention Measures
• Business Continuity Plans
• Disaster Recovery Procedures
• Crisis PR Guidelines`,
    },
    {
      id: 'policy-data-retention',
      name: 'Data Retention & Archival Policy',
      category: 'policy',
      description: 'Guidelines for data lifecycle management and retention',
      file: 'Policy_Data_Retention_2026.pdf',
      size: '2.2 MB',
      pages: 20,
      version: '1.5',
      lastUpdated: 'January 3, 2026',
      status: 'active',
      critical: true,
      content: `Data Retention Policy includes:
• Active Account Data (indefinite retention)
• Inactive Account Data (3-year retention)
• Deleted Account Grace Period (30 days)
• Application History (7 years - compliance)
• Communication Logs (1 year)
• Financial Records (7 years)
• System Logs (90 days)
• Backup Retention (30 days rolling)
• Archival Procedures
• Data Disposal Methods
• Legal Hold Procedures
• Audit Trail Requirements
• GDPR Right to Erasure
• FERPA Compliance`,
    },

    // Playbooks
    {
      id: 'playbook-sales',
      name: 'Sales & Business Development Playbook',
      category: 'playbook',
      description: 'Comprehensive guide for sales and BD activities',
      file: 'Playbook_Sales_BD_2026.pdf',
      size: '4.5 MB',
      pages: 42,
      version: '3.2',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      critical: false,
      content: `Sales Playbook includes:
• Target Customer Profiles (Employers, Schools)
• Lead Generation Strategies
• Qualification Criteria (BANT)
• Sales Pitch Scripts (Elevator, Demo, Close)
• Objection Handling Responses
• Pricing & Negotiation Guidelines
• Competitive Positioning vs. Indeed/LinkedIn
• Demo Best Practices
• Proposal Templates
• Contract Negotiation Tips
• Onboarding Handoff Process
• Upsell & Cross-sell Strategies
• Success Metrics & KPIs
• CRM Usage Guidelines`,
    },
    {
      id: 'playbook-customer-success',
      name: 'Customer Success Playbook',
      category: 'playbook',
      description: 'Guide for ensuring customer success and retention',
      file: 'Playbook_Customer_Success_2026.pdf',
      size: '3.9 MB',
      pages: 36,
      version: '2.5',
      lastUpdated: 'January 22, 2026',
      status: 'active',
      critical: false,
      content: `Customer Success Playbook includes:
• Customer Lifecycle Stages
• Onboarding Milestones (Days 1, 7, 30, 90)
• Health Score Calculation
• Engagement Metrics Monitoring
• Proactive Outreach Schedule
• Quarterly Business Reviews (QBRs)
• Renewal Management
• Churn Risk Identification
• Win-Back Strategies
• Expansion Opportunities
• Best Practice Sharing
• Customer Advocacy Program
• Case Study Development
• NPS Survey Management`,
    },
    {
      id: 'playbook-marketing',
      name: 'Marketing & Growth Playbook',
      category: 'playbook',
      description: 'Marketing strategies and growth tactics for ZALPHA',
      file: 'Playbook_Marketing_Growth_2026.pdf',
      size: '4.1 MB',
      pages: 38,
      version: '2.8',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      critical: false,
      content: `Marketing Playbook includes:
• Brand Positioning & Messaging
• Target Audience Personas
• Content Marketing Strategy
• Social Media Guidelines
• Email Marketing Campaigns
• SEO Best Practices
• Paid Advertising (Google, Meta, LinkedIn)
• Partnership Marketing
• Event Marketing (Virtual Fairs)
• PR & Media Relations
• Influencer Partnerships
• Referral Program Management
• Marketing Analytics & Attribution
• Budget Allocation Guidelines`,
    },
    {
      id: 'playbook-product-launch',
      name: 'Product Launch Playbook',
      category: 'playbook',
      description: 'Standard procedures for launching new features',
      file: 'Playbook_Product_Launch_2026.pdf',
      size: '3.3 MB',
      pages: 30,
      version: '2.0',
      lastUpdated: 'January 10, 2026',
      status: 'active',
      critical: false,
      content: `Product Launch Playbook includes:
• Launch Tier Classification (Major, Minor, Patch)
• Pre-Launch Checklist
• Beta Testing Program
• Internal Training Requirements
• Documentation Updates
• Marketing Materials Preparation
• Customer Communication Plan
• Phased Rollout Strategy
• Feature Flagging
• Monitoring & Metrics
• Feedback Collection
• Bug Triage Process
• Post-Launch Review
• Success Criteria`,
    },

    // Technical Documentation
    {
      id: 'tech-system-architecture',
      name: 'System Architecture Overview',
      category: 'technical',
      description: 'Technical documentation of ZALPHA platform architecture',
      file: 'Tech_System_Architecture_2026.pdf',
      size: '3.7 MB',
      pages: 34,
      version: '2.5',
      lastUpdated: 'January 15, 2026',
      status: 'active',
      critical: true,
      content: `System Architecture includes:
• Overall System Design
• Frontend Architecture (React, Tailwind CSS)
• Backend Architecture (Supabase, Hono, Deno)
• Database Schema & ER Diagrams
• API Architecture & Endpoints
• Authentication & Authorization Flow
• Third-Party Integrations (ATS, Payment)
• File Storage & CDN
• Caching Strategy
• Load Balancing
• Scalability Considerations
• Disaster Recovery Architecture
• Security Architecture
• Monitoring & Logging Infrastructure`,
    },
    {
      id: 'tech-api-documentation',
      name: 'API Integration Documentation',
      category: 'technical',
      description: 'Complete API documentation for integrations',
      file: 'Tech_API_Documentation_2026.pdf',
      size: '4.8 MB',
      pages: 44,
      version: '3.0',
      lastUpdated: 'January 20, 2026',
      status: 'active',
      critical: true,
      content: `API Documentation includes:
• Authentication Methods (API Keys, OAuth)
• Rate Limits & Quotas
• Endpoint Reference (REST APIs)
• Request/Response Examples
• Error Codes & Handling
• Webhooks Configuration
• ATS Integration Endpoints
• Payment Integration APIs
• User Management APIs
• Job Posting APIs
• Search & Filter APIs
• Analytics APIs
• Bulk Operations
• API Versioning Strategy
• SDK Documentation (if available)`,
    },
    {
      id: 'tech-deployment',
      name: 'Deployment & Release Process',
      category: 'technical',
      description: 'Technical procedures for deploying code and releases',
      file: 'Tech_Deployment_Process_2026.pdf',
      size: '2.6 MB',
      pages: 24,
      version: '2.2',
      lastUpdated: 'January 8, 2026',
      status: 'active',
      critical: true,
      content: `Deployment Process includes:
• Development Environment Setup
• Git Workflow & Branching Strategy
• Code Review Requirements
• Automated Testing (Unit, Integration, E2E)
• CI/CD Pipeline Configuration
• Staging Environment Testing
• Production Deployment Checklist
• Feature Flag Management
• Database Migration Procedures
• Rollback Procedures
• Monitoring Post-Deployment
• Deployment Windows
• Communication Protocol
• Hotfix Procedures`,
    },
    {
      id: 'tech-security-guidelines',
      name: 'Technical Security Guidelines',
      category: 'technical',
      description: 'Security best practices for development and operations',
      file: 'Tech_Security_Guidelines_2026.pdf',
      size: '3.2 MB',
      pages: 29,
      version: '2.0',
      lastUpdated: 'December 15, 2025',
      status: 'active',
      critical: true,
      content: `Security Guidelines include:
• Secure Coding Practices
• Input Validation & Sanitization
• Authentication Best Practices
• Password Requirements & Storage
• Session Management
• API Security
• SQL Injection Prevention
• XSS Protection
• CSRF Protection
• Encryption Standards (at rest & in transit)
• Secret Management
• Access Control Implementation
• Security Testing Requirements
• Vulnerability Disclosure Process
• Security Incident Response`,
    },

    // Reporting & Analytics
    {
      id: 'reporting-kpis',
      name: 'KPI Reporting Framework',
      category: 'reporting',
      description: 'Key performance indicators and reporting guidelines',
      file: 'Reporting_KPIs_2026.pdf',
      size: '2.9 MB',
      pages: 27,
      version: '2.5',
      lastUpdated: 'January 30, 2026',
      status: 'active',
      critical: false,
      content: `KPI Reporting includes:
• Platform Health Metrics (Uptime, Performance)
• User Growth Metrics (Students, Employers, Schools)
• Engagement Metrics (DAU, MAU, Session Duration)
• Job Posting Metrics (New, Filled, Time-to-Fill)
• Application Metrics (Submission Rate, Success Rate)
• Revenue Metrics (MRR, ARR, Churn)
• School Revenue Share Reporting
• Customer Success Metrics (NPS, CSAT, Retention)
• Marketing Metrics (CAC, Conversion Rates)
• Support Metrics (Ticket Volume, Resolution Time)
• Reporting Cadence (Daily, Weekly, Monthly)
• Dashboard Access & Permissions
• Data Visualization Standards`,
    },
    {
      id: 'reporting-monthly-business',
      name: 'Monthly Business Review Template',
      category: 'reporting',
      description: 'Standard template for monthly business performance reviews',
      file: 'Reporting_Monthly_Business_Review_2026.pdf',
      size: '2.1 MB',
      pages: 18,
      version: '1.5',
      lastUpdated: 'January 20, 2026',
      status: 'active',
      critical: false,
      content: `Monthly Business Review includes:
• Executive Summary
• Key Metrics Dashboard
• User Growth Analysis
• Revenue Performance
• Customer Success Updates
• Product Development Progress
• Marketing & Sales Performance
• Support & Operations Summary
• Key Wins & Achievements
• Challenges & Risks
• Action Items & Next Steps
• Financial Projections
• Strategic Initiatives Update
• Team Updates`,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Documents', count: documents.length },
    { id: 'sop', name: 'Standard Operating Procedures', count: documents.filter(d => d.category === 'sop').length },
    { id: 'training', name: 'Training Materials', count: documents.filter(d => d.category === 'training').length },
    { id: 'process', name: 'Process Documentation', count: documents.filter(d => d.category === 'process').length },
    { id: 'policy', name: 'Policies & Procedures', count: documents.filter(d => d.category === 'policy').length },
    { id: 'playbook', name: 'Playbooks', count: documents.filter(d => d.category === 'playbook').length },
    { id: 'technical', name: 'Technical Documentation', count: documents.filter(d => d.category === 'technical').length },
    { id: 'reporting', name: 'Reporting & Analytics', count: documents.filter(d => d.category === 'reporting').length },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (doc: typeof documents[0]) => {
    generatePDF(doc, {
      repositoryName: 'Operational Document Repository',
      headerColor: [6, 182, 212], // Cyan
      accentColor: [8, 145, 178]
    });
  };

  const handleView = (docId: string) => {
    setExpandedDoc(expandedDoc === docId ? null : docId);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      sop: 'from-blue-500 to-cyan-600',
      training: 'from-green-500 to-emerald-600',
      process: 'from-purple-500 to-pink-600',
      policy: 'from-orange-500 to-red-600',
      playbook: 'from-yellow-500 to-amber-600',
      technical: 'from-indigo-500 to-blue-600',
      reporting: 'from-cyan-500 to-teal-600',
    };
    return colors[category] || 'from-gray-500 to-slate-600';
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { bg: string; text: string; label: string; icon: any }> = {
      sop: { bg: 'bg-blue-500/20', text: 'text-blue-300', label: 'SOP', icon: Settings },
      training: { bg: 'bg-green-500/20', text: 'text-green-300', label: 'Training', icon: BookOpen },
      process: { bg: 'bg-purple-500/20', text: 'text-purple-300', label: 'Process', icon: Zap },
      policy: { bg: 'bg-orange-500/20', text: 'text-orange-300', label: 'Policy', icon: Shield },
      playbook: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', label: 'Playbook', icon: Target },
      technical: { bg: 'bg-indigo-500/20', text: 'text-indigo-300', label: 'Technical', icon: Settings },
      reporting: { bg: 'bg-cyan-500/20', text: 'text-cyan-300', label: 'Reporting', icon: TrendingUp },
    };
    return badges[category] || { bg: 'bg-gray-500/20', text: 'text-gray-300', label: 'Other', icon: FileText };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 border-b-4 border-green-400">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BackButton onNavigate={onNavigate} destination="internal-dashboard" variant="light" />
          <div className="flex items-center gap-6 mt-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border-4 border-white/40 shadow-2xl">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Operational Documentation Repository</h1>
              <p className="text-xl text-white/90">
                {documents.length} Comprehensive Operational Documents • SOPs, Training, Processes & More
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
                placeholder="Search operational documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-green-400 transition-all appearance-none cursor-pointer"
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
              <div className="text-3xl font-bold text-green-300 mb-1">{documents.filter(d => d.critical).length}</div>
              <div className="text-sm text-green-200">Critical Docs</div>
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
                const CategoryIcon = badge.icon;

                return (
                  <div
                    key={doc.id}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl border-2 border-white/20 hover:border-green-400/50 transition-all overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        {/* Document Info */}
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(doc.category)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <CategoryIcon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white">{doc.name}</h3>
                              {doc.critical && (
                                <span className="bg-red-500/20 border border-red-400/30 text-red-300 text-xs px-2 py-1 rounded-lg font-semibold flex-shrink-0">
                                  CRITICAL
                                </span>
                              )}
                            </div>
                            <p className="text-white/70 mb-3">{doc.description}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                              <span className={`${badge.bg} ${badge.text} px-3 py-1 rounded-lg font-semibold flex items-center gap-1`}>
                                <CategoryIcon className="w-3 h-3" />
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
                              <span className="text-green-300">Internal Use Only</span>
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
            <div className="mt-12 bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-blue-500/20 border-2 border-green-400/30 rounded-3xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Download All Documents</h3>
                <p className="text-white/70 mb-6">
                  Get the complete operational documentation package ({documents.length} documents, {documents.reduce((sum, d) => sum + d.pages, 0)} pages total)
                </p>
                <button
                  onClick={() => {
                    documents.forEach(doc => setTimeout(() => handleDownload(doc), 100));
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-3"
                >
                  <Download className="w-6 h-6" />
                  Download Complete Operational Package
                </button>
              </div>
            </div>
          )}

          {/* Operational Notice */}
          <div className="mt-8 bg-cyan-500/10 border-2 border-cyan-400/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-cyan-300 mb-2">Operational Notice</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  These operational documents are for internal use only and contain confidential business processes.
                  All SOPs, training materials, and procedures should be followed as documented. For questions or suggested
                  improvements, contact your manager or the operations team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}