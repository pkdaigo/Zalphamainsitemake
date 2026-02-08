import { FileText, Download, Eye, Briefcase, Lock, Calendar, FileCheck, AlertTriangle, Search, Filter, ChevronDown, BarChart3, DollarSign, Handshake, Award, TrendingUp, Users, Target } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { useState } from 'react';
import { generatePDF } from '@/app/utils/pdfGenerator';

interface BusinessDevelopmentRepositoryProps {
  onNavigate: (page: string) => void;
}

export function BusinessDevelopmentRepository({ onNavigate }: BusinessDevelopmentRepositoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const documents = [
    // Sales Materials
    {
      id: 'sales-deck-employers',
      name: 'Employer Sales Presentation Deck',
      category: 'sales',
      description: 'Comprehensive sales pitch deck for recruiting employer clients',
      file: 'ZALPHA_Employer_Sales_Deck_2026.pptx',
      size: '24.7 MB',
      pages: 38,
      version: '4.0',
      lastUpdated: 'February 1, 2026',
      status: 'active',
      critical: true,
      content: `Employer Sales Deck includes:
• Problem: Talent shortage in Pacific Islands
• Solution: ZALPHA platform overview
• Key Differentiators: ADA compliance, cultural fit, local talent
• Subscription Tier Comparison (Bronze, Silver, Gold, Platinum)
• ROI Calculator & Success Metrics
• ATS Integration Benefits
• Candidate Quality Metrics
• Success Stories (3 employer testimonials)
• Pricing & Packages
• Implementation Timeline
• Support & Training Included
• Competitive Comparison vs. Indeed, LinkedIn
• Next Steps & Call-to-Action`,
    },
    {
      id: 'sales-deck-schools',
      name: 'School Partnership Sales Deck',
      category: 'sales',
      description: 'Partnership proposal presentation for educational institutions',
      file: 'ZALPHA_School_Sales_Deck_2026.pptx',
      size: '28.3 MB',
      pages: 42,
      version: '3.5',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      critical: true,
      content: `School Sales Deck includes:
• Problem: Student career placement challenges
• Solution: ZALPHA career platform partnership
• Revenue Share Model (40% to schools)
• Student Success Metrics & Outcomes
• FERPA Compliance Framework
• Government Loan Integration
• Career Services Integration
• Co-Marketing Opportunities
• White-Label Options
• Partnership Tiers (Standard, Premium, Enterprise)
• Implementation & Training
• Success Stories (2 school partnerships)
• Investment & ROI Projections
• Partnership Agreement Overview`,
    },
    {
      id: 'sales-one-pager-employer',
      name: 'Employer One-Pager Overview',
      category: 'sales',
      description: 'Single-page sales sheet highlighting key employer benefits',
      file: 'ZALPHA_Employer_OnePager_2026.pdf',
      size: '3.2 MB',
      pages: 1,
      version: '2.5',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      critical: false,
      content: `Employer One-Pager includes:
• Headline: "Find Pacific's Best Talent"
• 3 Key Benefits: Quality Candidates, ADA Compliant, Cost-Effective
• Platform Features (bullet points)
• Subscription Pricing Overview
• Quick Stats: X students, Y employers, Z% success rate
• ATS Integration Logos
• Testimonial Quote
• QR Code for Demo Request
• Contact Information
• Pacific Islands-themed visual design`,
    },
    {
      id: 'sales-one-pager-school',
      name: 'School Partnership One-Pager',
      category: 'sales',
      description: 'Single-page partnership overview for schools',
      file: 'ZALPHA_School_OnePager_2026.pdf',
      size: '3.5 MB',
      pages: 1,
      version: '2.0',
      lastUpdated: 'January 22, 2026',
      status: 'active',
      critical: false,
      content: `School One-Pager includes:
• Headline: "Empower Your Students' Careers"
• 40% Revenue Share Highlighted
• Key Benefits: Student Success, Additional Revenue, Career Services
• Partnership Model Overview
• Student Outcomes Metrics
• FERPA Compliance Badge
• Testimonial from Partner School
• Implementation Timeline (4-6 weeks)
• Contact & Next Steps
• Pacific-themed design`,
    },

    // Proposals & Contracts
    {
      id: 'proposal-template-employer',
      name: 'Employer Proposal Template',
      category: 'proposals',
      description: 'Customizable proposal template for employer prospects',
      file: 'ZALPHA_Employer_Proposal_Template_2026.docx',
      size: '6.8 MB',
      pages: 18,
      version: '3.0',
      lastUpdated: 'January 30, 2026',
      status: 'active',
      critical: true,
      content: `Employer Proposal Template includes:
• Executive Summary
• [Company Name] Hiring Challenges (customizable)
• ZALPHA Solution Overview
• Recommended Subscription Tier
• Implementation Plan & Timeline
• Pricing & Investment
• ROI Projections (based on hires)
• Success Metrics & KPIs
• Terms & Conditions Summary
• Next Steps
• Signatures & Approvals
• Appendix: Case Studies, Platform Screenshots
• Editable sections marked clearly`,
    },
    {
      id: 'proposal-template-school',
      name: 'School Partnership Proposal Template',
      category: 'proposals',
      description: 'Comprehensive partnership proposal for educational institutions',
      file: 'ZALPHA_School_Proposal_Template_2026.docx',
      size: '8.4 MB',
      pages: 24,
      version: '2.5',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      critical: true,
      content: `School Proposal Template includes:
• Executive Summary
• [Institution Name] Career Services Assessment
• ZALPHA Partnership Overview
• Revenue Share Model Details
• Student Success Framework
• FERPA Compliance Plan
• Government Loan Integration
• Co-Marketing Strategy
• Implementation Roadmap (6-week plan)
• Training & Support Included
• Investment & Financial Projections
• Terms & Partnership Agreement
• Success Stories from Similar Schools
• Next Steps & Signatures`,
    },
    {
      id: 'msa-template',
      name: 'Master Service Agreement Template',
      category: 'proposals',
      description: 'Legal contract template for client agreements',
      file: 'ZALPHA_MSA_Template_2026.pdf',
      size: '4.7 MB',
      pages: 16,
      version: '2.0',
      lastUpdated: 'January 15, 2026',
      status: 'active',
      critical: true,
      content: `MSA Template includes:
• Parties & Effective Date
• Services Provided
• Subscription Terms & Pricing
• Payment Terms & Billing
• Service Level Agreements (SLAs)
• Data Protection & Privacy
• Intellectual Property Rights
• Confidentiality Obligations
• Term & Termination
• Liability & Indemnification
• Dispute Resolution
• Governing Law (CNMI jurisdiction)
• Signatures
• Schedules & Exhibits`,
    },
    {
      id: 'sow-template',
      name: 'Statement of Work Template',
      category: 'proposals',
      description: 'Project scope and deliverables template for implementations',
      file: 'ZALPHA_SOW_Template_2026.docx',
      size: '3.9 MB',
      pages: 12,
      version: '1.5',
      lastUpdated: 'January 10, 2026',
      status: 'active',
      critical: false,
      content: `SOW Template includes:
• Project Overview & Objectives
• Scope of Work & Deliverables
• Timeline & Milestones
• Roles & Responsibilities (Client & ZALPHA)
• Acceptance Criteria
• Assumptions & Dependencies
• Out of Scope Items
• Change Management Process
• Payment Schedule
• Success Metrics
• Post-Implementation Support
• Signatures & Approvals`,
    },

    // Competitive Intelligence
    {
      id: 'competitive-analysis',
      name: 'Competitive Analysis Report',
      category: 'intelligence',
      description: 'Detailed analysis of competitors (Indeed, LinkedIn, local platforms)',
      file: 'ZALPHA_Competitive_Analysis_2026.pdf',
      size: '16.2 MB',
      pages: 48,
      version: '3.0',
      lastUpdated: 'January 30, 2026',
      status: 'active',
      critical: true,
      content: `Competitive Analysis includes:
• Market Overview: Pacific Islands Job Market
• Competitor #1: Indeed (strengths, weaknesses, pricing)
• Competitor #2: LinkedIn (strengths, weaknesses, pricing)
• Competitor #3: Local Job Boards (fragmented, limited features)
• ZALPHA Competitive Advantages:
  - Only ADA-compliant platform in Pacific
  - Cultural sensitivity & local focus
  - School partnerships with revenue share
  - Government loan integration
  - Gamified skills assessments
• Market Positioning Map
• Pricing Comparison Matrix
• Feature Comparison Table
• Market Share Analysis
• Threats & Opportunities (SWOT)
• Competitive Response Strategies`,
    },
    {
      id: 'battlecards',
      name: 'Sales Battlecards',
      category: 'intelligence',
      description: 'Quick-reference cards for handling competitor objections',
      file: 'ZALPHA_Battlecards_2026.pdf',
      size: '5.8 MB',
      pages: 12,
      version: '2.5',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      critical: false,
      content: `Battlecards include:
• Battlecard: vs. Indeed
  - If they say: "Indeed has more traffic"
  - We say: "But we have Pacific-focused talent & ADA compliance"
  
• Battlecard: vs. LinkedIn
  - If they say: "LinkedIn is the standard"
  - We say: "But LinkedIn doesn't understand Pacific culture or integrate with schools"
  
• Battlecard: vs. Local Job Boards
  - If they say: "We already use local boards"
  - We say: "But they lack ADA compliance, ATS integration, and modern features"
  
• Common Objections & Responses:
  - "Too expensive" → ROI calculator, cost per hire comparison
  - "Not enough candidates" → Growth metrics, school partnerships
  - "Implementation too complex" → 4-6 week timeline, full support
  
• Key Talking Points (3-5 per competitor)`,
    },
    {
      id: 'value-proposition',
      name: 'Value Proposition Canvas',
      category: 'intelligence',
      description: 'Framework for articulating ZALPHA value to different audiences',
      file: 'ZALPHA_Value_Proposition_2026.pdf',
      size: '7.4 MB',
      pages: 18,
      version: '2.0',
      lastUpdated: 'January 20, 2026',
      status: 'active',
      critical: false,
      content: `Value Proposition Canvas includes:
• For Students:
  - Jobs: Find dream job, build career, develop skills
  - Pains: Limited opportunities, lack of guidance, discrimination
  - Gains: Career success, financial stability, personal growth
  - Value: Accessible, supportive, opportunity-rich platform
  
• For Employers:
  - Jobs: Hire quality talent, fill positions quickly, build team
  - Pains: Talent shortage, high costs, cultural misalignment
  - Gains: Better hires, cost savings, diverse workforce
  - Value: Quality candidates, ADA compliance, local expertise
  
• For Schools:
  - Jobs: Help students succeed, generate revenue, improve outcomes
  - Pains: Limited career services, low placement rates, budget cuts
  - Gains: Better outcomes, additional revenue (40%), reputation
  - Value: Partnership model, FERPA compliant, comprehensive solution`,
    },

    // ROI & Business Case
    {
      id: 'roi-calculator',
      name: 'ROI Calculator & Business Case Tool',
      category: 'roi',
      description: 'Interactive spreadsheet for calculating client ROI',
      file: 'ZALPHA_ROI_Calculator_2026.xlsx',
      size: '2.9 MB',
      pages: 1,
      version: '3.0',
      lastUpdated: 'February 1, 2026',
      status: 'active',
      critical: true,
      content: `ROI Calculator includes:
• Input Fields:
  - Average cost per hire (current)
  - Number of hires per year
  - Time to fill (current average)
  - Subscription tier selected
  
• Calculations:
  - Total cost with ZALPHA
  - Total cost without ZALPHA
  - Annual savings
  - ROI percentage
  - Payback period (months)
  - Cost per hire improvement
  - Time to fill improvement
  
• Outputs:
  - Summary dashboard with charts
  - Printable business case
  - 3-year projection
  
• Pre-filled industry benchmarks for Pacific Islands`,
    },
    {
      id: 'case-study-template',
      name: 'Customer Success Case Study Template',
      category: 'roi',
      description: 'Template for creating compelling client success stories',
      file: 'ZALPHA_CaseStudy_Template_2026.docx',
      size: '4.3 MB',
      pages: 8,
      version: '2.0',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      critical: false,
      content: `Case Study Template includes:
• Client Overview (company, industry, size, location)
• Challenge: What problem were they facing?
• Solution: How did ZALPHA help?
• Implementation: Timeline and process
• Results (quantifiable):
  - X% reduction in time to fill
  - Y% reduction in cost per hire
  - Z hires made in [timeframe]
  - Diversity improvements
• Quote from Client (HR leader or hiring manager)
• Key Takeaways (3-5 bullet points)
• Visual: Before/After comparison chart
• Call-to-Action for readers
• Client logo and photo (with permissions)`,
    },
    {
      id: 'testimonial-collection',
      name: 'Client Testimonials Collection',
      category: 'roi',
      description: 'Library of client quotes and success metrics',
      file: 'ZALPHA_Testimonials_2026.pdf',
      size: '6.7 MB',
      pages: 22,
      version: '2.5',
      lastUpdated: 'January 30, 2026',
      status: 'active',
      critical: false,
      content: `Testimonials Collection includes:
• 12 Employer Testimonials (with company, name, title, photo)
• 8 School Partnership Testimonials
• 15 Student Success Stories
• Usage Guidelines (permissions, attribution)
• Testimonial Request Template (email)
• Video Testimonial Script Template
• Photo Release Forms
• Categorized by: Industry, Company Size, Use Case
• Quotes range from 1 sentence to 3 paragraphs
• Metrics highlighted where available`,
    },

    // Partnership Materials
    {
      id: 'partnership-program',
      name: 'Partnership Program Overview',
      category: 'partnerships',
      description: 'Guide to ZALPHA partnership opportunities and benefits',
      file: 'ZALPHA_Partnership_Program_2026.pdf',
      size: '12.4 MB',
      pages: 32,
      version: '2.0',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      critical: true,
      content: `Partnership Program includes:
• Partnership Types:
  - School Partnerships (40% revenue share)
  - ATS Integration Partners (technology)
  - Referral Partners (commission-based)
  - Reseller Partners (white-label opportunities)
  - Community Organizations (non-profit)
  
• Benefits by Partnership Tier:
  - Bronze: Basic listing, co-marketing
  - Silver: Revenue share, dedicated support
  - Gold: White-label options, custom integrations
  
• Partnership Requirements & Qualifications
• Onboarding Process (4-6 weeks)
• Revenue Share Models
• Co-Marketing Opportunities
• Support & Training Provided
• Partner Portal Access
• Success Metrics & Reporting
• Application Process`,
    },
    {
      id: 'referral-program',
      name: 'Referral Partner Program Kit',
      category: 'partnerships',
      description: 'Complete kit for referral partners to promote ZALPHA',
      file: 'ZALPHA_Referral_Kit_2026.zip',
      size: '45.8 MB',
      pages: 1,
      version: '1.5',
      lastUpdated: 'January 20, 2026',
      status: 'active',
      critical: false,
      content: `Referral Kit includes:
• Referral Program Overview (PDF)
• Commission Structure (10-20% per sale)
• Marketing Materials for Partners:
  - Email templates (3 variations)
  - Social media posts (10 pre-written)
  - Referral link & tracking codes
  - Co-branded one-pagers
  - Digital banner ads
  
• Partner Portal Login Instructions
• Referral Tracking Dashboard
• Payment & Commission Schedule
• Terms & Conditions
• FAQs for Referral Partners
• Best Practices Guide
• Top Performer Recognition Program`,
    },
    {
      id: 'white-label-package',
      name: 'White-Label Partnership Package',
      category: 'partnerships',
      description: 'Information on white-label opportunities for partners',
      file: 'ZALPHA_WhiteLabel_Package_2026.pdf',
      size: '18.9 MB',
      pages: 28,
      version: '1.0',
      lastUpdated: 'January 15, 2026',
      status: 'active',
      critical: false,
      content: `White-Label Package includes:
• What is White-Label? (Platform under partner branding)
• Ideal Partner Profile:
  - Educational institutions
  - Large employers with recruiting needs
  - Staffing agencies
  - Government workforce programs
  
• Customization Options:
  - Custom branding (logo, colors, domain)
  - Unique content and messaging
  - Custom workflows
  - Data segregation & privacy
  
• Pricing & Revenue Models
• Technical Requirements
• Implementation Timeline (8-12 weeks)
• Support & Maintenance Included
• Success Stories (2 white-label partners)
• Contract & Legal Terms
• Discovery Call & Assessment Process`,
    },

    // Training & Enablement
    {
      id: 'sales-training',
      name: 'Sales Team Training Manual',
      category: 'training',
      description: 'Comprehensive training guide for new sales representatives',
      file: 'ZALPHA_Sales_Training_2026.pdf',
      size: '28.7 MB',
      pages: 86,
      version: '3.5',
      lastUpdated: 'February 1, 2026',
      status: 'active',
      critical: true,
      content: `Sales Training Manual includes:
• Module 1: Company Overview & Mission
• Module 2: Product Knowledge (all features & benefits)
• Module 3: Target Customers (employers, schools)
• Module 4: Sales Process (prospecting to close)
• Module 5: Discovery & Qualification (BANT framework)
• Module 6: Demo Best Practices
• Module 7: Objection Handling
• Module 8: Closing Techniques
• Module 9: CRM & Tools Training
• Module 10: Contract & Legal Terms
• Module 11: Post-Sale Handoff to Customer Success
• Module 12: Ongoing Learning & Development
• Quizzes & Knowledge Checks
• Role-Play Scenarios (10 examples)
• Certification Requirements`,
    },
    {
      id: 'demo-script',
      name: 'Product Demo Script & Guide',
      category: 'training',
      description: 'Step-by-step guide for conducting effective product demos',
      file: 'ZALPHA_Demo_Script_2026.pdf',
      size: '9.4 MB',
      pages: 24,
      version: '2.5',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      critical: true,
      content: `Demo Script includes:
• Pre-Demo Checklist (environment setup, data prepared)
• Introduction (5 min):
  - Welcome & agenda
  - Discovery questions
  - Set expectations
  
• Platform Demo (20-30 min):
  - For Employers: Job posting → Candidate search → Hire
  - For Schools: Admin dashboard → Student monitoring → Revenue reports
  - Key features to highlight
  - "Show, don't tell" approach
  
• Customization Demo (10 min):
  - Show features specific to their needs
  - Address pain points discovered
  
• Q&A (10 min)
• Next Steps & Call-to-Action (5 min)
• Follow-up Email Template
• Common Questions & Answers
• Demo Do's and Don'ts
• Technical Troubleshooting`,
    },
    {
      id: 'objection-handling',
      name: 'Objection Handling Playbook',
      category: 'training',
      description: 'Responses to common sales objections',
      file: 'ZALPHA_Objections_Playbook_2026.pdf',
      size: '11.3 MB',
      pages: 36,
      version: '2.0',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      critical: false,
      content: `Objection Handling Playbook includes:
• Price Objections:
  - "Too expensive" → ROI calculator, cost per hire comparison
  - "Budget constraints" → Payment plans, phased approach
  
• Product Objections:
  - "Not enough features" → Feature roadmap, customization
  - "Too complex" → Training & support, implementation assistance
  
• Competition Objections:
  - "Using Indeed already" → Niche focus, better for Pacific
  - "LinkedIn works fine" → School partnerships, ADA compliance
  
• Timing Objections:
  - "Not ready now" → Pilot program, trial period
  - "Need more info" → Case studies, reference calls
  
• Trust Objections:
  - "New company" → Track record, success stories
  - "Security concerns" → Compliance certifications, data protection
  
• Framework: Listen, Empathize, Respond, Confirm
• Role-Play Exercises (15 scenarios)`,
    },

    // Analytics & Reporting
    {
      id: 'sales-dashboard',
      name: 'Sales Performance Dashboard Template',
      category: 'analytics',
      description: 'Metrics and KPIs for tracking sales team performance',
      file: 'ZALPHA_Sales_Dashboard_2026.xlsx',
      size: '4.2 MB',
      pages: 1,
      version: '2.5',
      lastUpdated: 'January 30, 2026',
      status: 'active',
      critical: false,
      content: `Sales Dashboard includes:
• Key Metrics:
  - Pipeline value (by stage)
  - Win rate (%)
  - Average deal size
  - Sales cycle length (days)
  - Monthly recurring revenue (MRR)
  - Customer acquisition cost (CAC)
  - Churn rate (%)
  - Quota attainment (%)
  
• By Salesperson:
  - Individual quotas & attainment
  - Deals closed (this month/quarter/year)
  - Pipeline health
  
• By Segment:
  - Employers vs. Schools
  - Subscription tier breakdown
  - Geographic distribution
  
• Visualizations: Charts, graphs, heat maps
• Automated calculations
• Monthly/Quarterly/Annual views
• Exportable reports`,
    },
    {
      id: 'market-analysis',
      name: 'Pacific Islands Market Analysis',
      category: 'analytics',
      description: 'Comprehensive analysis of target markets across Pacific Islands',
      file: 'ZALPHA_Market_Analysis_2026.pdf',
      size: '21.6 MB',
      pages: 64,
      version: '2.0',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      critical: true,
      content: `Market Analysis includes:
• CNMI (Commonwealth of Northern Mariana Islands):
  - Population: ~50,000
  - Key industries: Tourism, government, retail
  - Employment trends
  - Educational institutions (3 colleges)
  
• Guam:
  - Population: ~170,000
  - Key industries: Tourism, military, healthcare
  - Major employers
  - Educational institutions (2 universities)
  
• FSM (Federated States of Micronesia):
  - Population: ~100,000
  - Key industries: Government, fishing, agriculture
  
• Palau, Marshall Islands, American Samoa
  
• Total Addressable Market (TAM):
  - Students: ~15,000 annually
  - Employers: ~5,000 businesses
  - Schools: ~50 institutions
  
• Market Sizing & Opportunity
• Competitive Landscape
• Entry Strategy by Market
• Regulatory Considerations`,
    },

    // Outreach & Communication
    {
      id: 'cold-email-templates',
      name: 'Cold Outreach Email Templates',
      category: 'outreach',
      description: 'Proven email templates for prospecting',
      file: 'ZALPHA_Email_Templates_2026.pdf',
      size: '5.7 MB',
      pages: 18,
      version: '3.0',
      lastUpdated: 'February 1, 2026',
      status: 'active',
      critical: false,
      content: `Email Templates include:
• Initial Outreach (Employers):
  - Subject: "Hiring Pacific talent made easy"
  - Brief, value-focused, CTA: demo request
  
• Initial Outreach (Schools):
  - Subject: "Generate revenue while helping students"
  - Highlight 40% revenue share
  
• Follow-up Sequence (5 emails):
  - Day 3: Value proposition reminder
  - Day 7: Social proof (case study)
  - Day 14: Special offer or urgency
  - Day 21: "Break-up" email (last attempt)
  - Day 30: Re-engagement
  
• Post-Demo Follow-up
• Post-Meeting Recap
• Contract Sent Follow-up
• Referral Request Template
  
• Each template includes:
  - Subject line variations (A/B testing)
  - Personalization tokens
  - Best time to send
  - Expected response rate`,
    },
    {
      id: 'linkedin-outreach',
      name: 'LinkedIn Outreach Playbook',
      category: 'outreach',
      description: 'Guide for social selling and LinkedIn prospecting',
      file: 'ZALPHA_LinkedIn_Playbook_2026.pdf',
      size: '8.9 MB',
      pages: 28,
      version: '2.0',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      critical: false,
      content: `LinkedIn Playbook includes:
• Profile Optimization:
  - Headline, summary, experience
  - ZALPHA branding
  
• Prospecting Strategy:
  - Boolean search strings
  - Sales Navigator filters
  - Target titles (HR, recruiters, career services)
  
• Connection Request Messages (5 templates)
• Engagement Strategy:
  - Like, comment on prospect posts
  - Share valuable content
  - Build relationships before pitching
  
• InMail Templates (3 variations)
• Content Calendar for Personal Brand
• Group Engagement Strategy
• Measuring LinkedIn ROI
• Best Practices & Don'ts`,
    },
    {
      id: 'cold-calling-script',
      name: 'Cold Calling Scripts',
      category: 'outreach',
      description: 'Phone scripts for cold calling prospects',
      file: 'ZALPHA_Calling_Scripts_2026.pdf',
      size: '6.4 MB',
      pages: 20,
      version: '1.5',
      lastUpdated: 'January 20, 2026',
      status: 'active',
      critical: false,
      content: `Calling Scripts include:
• Gatekeeper Script (getting past receptionist)
• Initial Cold Call Script:
  - Introduction (10 sec)
  - Permission to continue (5 sec)
  - Value proposition (20 sec)
  - Qualifying question
  - CTA: Schedule demo
  
• Voicemail Script (30 sec max)
• Follow-up Call Script
• Objection Responses (phone-specific)
• Call-to-Demo Transition
• Closing for Next Steps
• Call Best Practices:
  - Best times to call
  - Tone & energy
  - Active listening
  - Note-taking tips
• Call Recording & Review Process`,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Materials', count: documents.length },
    { id: 'sales', name: 'Sales Materials', count: documents.filter(d => d.category === 'sales').length },
    { id: 'proposals', name: 'Proposals & Contracts', count: documents.filter(d => d.category === 'proposals').length },
    { id: 'intelligence', name: 'Competitive Intelligence', count: documents.filter(d => d.category === 'intelligence').length },
    { id: 'roi', name: 'ROI & Business Case', count: documents.filter(d => d.category === 'roi').length },
    { id: 'partnerships', name: 'Partnership Materials', count: documents.filter(d => d.category === 'partnerships').length },
    { id: 'training', name: 'Training & Enablement', count: documents.filter(d => d.category === 'training').length },
    { id: 'analytics', name: 'Analytics & Reporting', count: documents.filter(d => d.category === 'analytics').length },
    { id: 'outreach', name: 'Outreach & Communication', count: documents.filter(d => d.category === 'outreach').length },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (doc: typeof documents[0]) => {
    generatePDF(doc, {
      repositoryName: 'Business Development Repository',
      headerColor: [16, 185, 129], // Green
      accentColor: [5, 150, 105]
    });
  };

  const handleView = (docId: string) => {
    setExpandedDoc(expandedDoc === docId ? null : docId);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      sales: 'from-green-500 to-emerald-600',
      proposals: 'from-blue-500 to-cyan-600',
      intelligence: 'from-purple-500 to-pink-600',
      roi: 'from-yellow-500 to-orange-600',
      partnerships: 'from-indigo-500 to-purple-600',
      training: 'from-red-500 to-pink-600',
      analytics: 'from-cyan-500 to-teal-600',
      outreach: 'from-orange-500 to-red-600',
    };
    return colors[category] || 'from-gray-500 to-slate-600';
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { bg: string; text: string; label: string; icon: any }> = {
      sales: { bg: 'bg-green-500/20', text: 'text-green-300', label: 'Sales', icon: Target },
      proposals: { bg: 'bg-blue-500/20', text: 'text-blue-300', label: 'Proposals', icon: FileText },
      intelligence: { bg: 'bg-purple-500/20', text: 'text-purple-300', label: 'Intelligence', icon: BarChart3 },
      roi: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', label: 'ROI', icon: DollarSign },
      partnerships: { bg: 'bg-indigo-500/20', text: 'text-indigo-300', label: 'Partnerships', icon: Handshake },
      training: { bg: 'bg-red-500/20', text: 'text-red-300', label: 'Training', icon: Award },
      analytics: { bg: 'bg-cyan-500/20', text: 'text-cyan-300', label: 'Analytics', icon: TrendingUp },
      outreach: { bg: 'bg-orange-500/20', text: 'text-orange-300', label: 'Outreach', icon: Users },
    };
    return badges[category] || { bg: 'bg-gray-500/20', text: 'text-gray-300', label: 'Other', icon: FileText };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BackButton onNavigate={onNavigate} destination="internal-dashboard" variant="light" />
          <div className="flex items-center gap-6 mt-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border-4 border-white/40 shadow-2xl">
              <Handshake className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Business Development Repository</h1>
              <p className="text-xl text-white/90">
                {documents.length} BD Materials • Sales, Proposals, Partnerships & More
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search BD materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-all"
              />
            </div>

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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-500/20 border-2 border-green-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-300 mb-1">{documents.length}</div>
              <div className="text-sm text-green-200">Total Materials</div>
            </div>
            <div className="bg-emerald-500/20 border-2 border-emerald-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-emerald-300 mb-1">{documents.filter(d => d.critical).length}</div>
              <div className="text-sm text-emerald-200">Critical</div>
            </div>
            <div className="bg-teal-500/20 border-2 border-teal-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-teal-300 mb-1">{categories.length - 1}</div>
              <div className="text-sm text-teal-200">Categories</div>
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
              <h3 className="text-2xl font-bold text-white mb-2">No Materials Found</h3>
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
                              {doc.pages > 1 && (
                                <span className="flex items-center gap-1">
                                  <FileCheck className="w-4 h-4" />
                                  {doc.pages} pages
                                </span>
                              )}
                              <span>{doc.size}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {doc.lastUpdated}
                              </span>
                              <span className="text-green-400 font-semibold">v{doc.version}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 flex-shrink-0">
                          <button
                            onClick={() => handleView(doc.id)}
                            className="px-4 py-2 bg-emerald-500/20 border-2 border-emerald-400/30 text-emerald-300 rounded-xl hover:bg-emerald-500/30 transition-all flex items-center gap-2 font-semibold"
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

                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <h4 className="text-lg font-bold text-white mb-3">Contents:</h4>
                          <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                            <pre className="text-white/80 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                              {doc.content}
                            </pre>
                          </div>
                          <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-2">
                              <Lock className="w-4 h-4 text-green-400" />
                              <span className="text-green-300">BD Team Use Only</span>
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

          {filteredDocuments.length > 0 && (
            <div className="mt-12 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 border-2 border-green-400/30 rounded-3xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Download All BD Materials</h3>
                <p className="text-white/70 mb-6">
                  Get the complete business development package ({documents.length} files, ready to close deals)
                </p>
                <button
                  onClick={() => {
                    documents.forEach(doc => setTimeout(() => handleDownload(doc), 100));
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-3"
                >
                  <Download className="w-6 h-6" />
                  Download Complete BD Package
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 bg-green-500/10 border-2 border-green-400/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Handshake className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-green-300 mb-2">Business Development Notice</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  These business development materials are confidential and for internal sales team use only. 
                  All pricing, proposals, and strategies should be customized for each prospect. For questions or custom materials, 
                  contact: <a href="mailto:bd@zalpharecruit.com" className="text-green-400 hover:text-green-300 underline">bd@zalpharecruit.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}