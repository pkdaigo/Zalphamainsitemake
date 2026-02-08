// Comprehensive content expansion for all document types

export function expandDocumentContent(doc: any): string {
  let fullContent = '';

  // HEADER SECTION
  fullContent += `${doc.name.toUpperCase()}\n`;
  fullContent += `${'='.repeat(100)}\n\n`;
  fullContent += `Document ID: ${doc.id}\n`;
  fullContent += `Category: ${doc.category.toUpperCase()}\n`;
  fullContent += `Version: ${doc.version}\n`;
  fullContent += `Last Updated: ${doc.lastUpdated}\n`;
  fullContent += `Status: ${doc.status.toUpperCase()}\n`;
  fullContent += `File: ${doc.file}\n`;
  fullContent += `Size: ${doc.size} | Pages: ${doc.pages}\n`;
  if (doc.description) {
    fullContent += `\nDescription: ${doc.description}\n`;
  }
  fullContent += `\n${'='.repeat(100)}\n\n`;

  // EXECUTIVE SUMMARY
  fullContent += `EXECUTIVE SUMMARY\n`;
  fullContent += `${'-'.repeat(100)}\n\n`;
  fullContent += `This document serves as a comprehensive reference for ${doc.name}. `;
  fullContent += `It has been prepared to ensure consistency, compliance, and excellence in execution `;
  fullContent += `across ZALPHA's operations in the Pacific Islands region (CNMI, Guam, Palau, FSM, RMI, and beyond).\n\n`;
  
  fullContent += `Key Objectives:\n`;
  fullContent += `• Provide clear, actionable guidelines for all stakeholders\n`;
  fullContent += `• Ensure ADA compliance and accessibility for persons with disabilities\n`;
  fullContent += `• Maintain FERPA compliance for educational records (where applicable)\n`;
  fullContent += `• Support ZALPHA's mission: connecting Pacific Islands youth with meaningful employment\n`;
  fullContent += `• Deliver measurable results aligned with organizational KPIs\n\n`;

  // TABLE OF CONTENTS (auto-generated from bullet points)
  if (doc.content && doc.content.includes('•')) {
    fullContent += `${'='.repeat(100)}\n\n`;
    fullContent += `TABLE OF CONTENTS\n`;
    fullContent += `${'-'.repeat(100)}\n\n`;
    const sections = doc.content.split('\n').filter((line: string) => line.trim().startsWith('•'));
    sections.forEach((section: string, index: number) => {
      const cleanSection = section.trim().substring(1).trim();
      fullContent += `${index + 1}. ${cleanSection}\n`;
    });
    fullContent += `\n`;
  }

  // MAIN CONTENT
  fullContent += `${'='.repeat(100)}\n\n`;
  fullContent += `DETAILED CONTENT\n`;
  fullContent += `${'-'.repeat(100)}\n\n`;
  
  // Expand each bullet point into detailed sections
  if (doc.content) {
    const lines = doc.content.split('\n');
    let sectionNumber = 1;
    
    lines.forEach((line: string) => {
      if (line.trim().startsWith('•')) {
        const topic = line.trim().substring(1).trim();
        fullContent += `\nSECTION ${sectionNumber}: ${topic.toUpperCase()}\n`;
        fullContent += `${'-'.repeat(100)}\n\n`;
        
        // Add detailed content for each bullet point
        fullContent += `Overview:\n`;
        fullContent += `${topic} is a critical component of this ${doc.category}. This section provides `;
        fullContent += `comprehensive guidelines, step-by-step procedures, and best practices to ensure `;
        fullContent += `successful implementation and consistent results.\n\n`;
        
        fullContent += `Purpose and Importance:\n`;
        fullContent += `The ${topic} component directly supports ZALPHA's core value proposition of being `;
        fullContent += `the Pacific's first and only ADA-compliant job platform. Proper execution ensures:\n`;
        fullContent += `• Compliance with all legal and regulatory requirements\n`;
        fullContent += `• Exceptional user experience for students, employers, and schools\n`;
        fullContent += `• Operational efficiency and scalability\n`;
        fullContent += `• Data accuracy and security\n`;
        fullContent += `• Measurable business outcomes\n\n`;
        
        fullContent += `Key Stakeholders:\n`;
        fullContent += `• Primary: Operations Team, Customer Success Team\n`;
        fullContent += `• Secondary: Technical Support, Product Team, Legal/Compliance\n`;
        fullContent += `• External: Students, Employers, Educational Institutions\n\n`;
        
        fullContent += `Implementation Guidelines:\n`;
        fullContent += `1. Review Requirements: Ensure all prerequisites are met before beginning\n`;
        fullContent += `2. Follow Standard Process: Adhere to documented procedures consistently\n`;
        fullContent += `3. Document Actions: Record all activities in appropriate systems (CRM, ticketing, etc.)\n`;
        fullContent += `4. Quality Check: Verify completion criteria before marking as complete\n`;
        fullContent += `5. Continuous Improvement: Provide feedback on process optimization\n\n`;
        
        fullContent += `Success Criteria:\n`;
        fullContent += `✓ All required steps completed accurately\n`;
        fullContent += `✓ Documentation updated in real-time\n`;
        fullContent += `✓ Stakeholder communication maintained\n`;
        fullContent += `✓ Quality standards met or exceeded\n`;
        fullContent += `✓ Timelines adhered to (see SLA requirements below)\n\n`;
        
        fullContent += `Timeline and SLA:\n`;
        fullContent += `• Initial Response: Within 2 business hours\n`;
        fullContent += `• Standard Completion: Within 24-48 hours\n`;
        fullContent += `• Complex Cases: Within 5 business days\n`;
        fullContent += `• Emergency/Critical: Immediate escalation protocol\n\n`;
        
        fullContent += `Tools and Resources:\n`;
        fullContent += `• CRM System: For customer data and interaction tracking\n`;
        fullContent += `• Knowledge Base: Searchable repository of solutions and guides\n`;
        fullContent += `• Communication Tools: Slack, Email, Phone, Video conferencing\n`;
        fullContent += `• Analytics Dashboard: For performance monitoring and reporting\n`;
        fullContent += `• Document Repository: For templates, forms, and reference materials\n\n`;
        
        fullContent += `Common Challenges and Solutions:\n`;
        fullContent += `Challenge #1: Incomplete information provided\n`;
        fullContent += `Solution: Use standardized intake forms and checklists to ensure all required data collected\n\n`;
        
        fullContent += `Challenge #2: Timeline pressures and competing priorities\n`;
        fullContent += `Solution: Implement priority matrix (urgent/important), escalate appropriately, communicate delays proactively\n\n`;
        
        fullContent += `Challenge #3: Technical issues or system limitations\n`;
        fullContent += `Solution: Maintain backup processes, engage technical support early, document workarounds\n\n`;
        
        fullContent += `Best Practices:\n`;
        fullContent += `✓ Start with clear communication of expectations\n`;
        fullContent += `✓ Use templates and automation where appropriate\n`;
        fullContent += `✓ Double-check accuracy before finalizing\n`;
        fullContent += `✓ Maintain professional and culturally sensitive communication\n`;
        fullContent += `✓ Follow-up proactively to ensure satisfaction\n`;
        fullContent += `✓ Document lessons learned for future improvement\n\n`;
        
        fullContent += `Escalation Path:\n`;
        fullContent += `Level 1: Team Lead/Supervisor (routine escalations)\n`;
        fullContent += `Level 2: Department Manager (complex or sensitive issues)\n`;
        fullContent += `Level 3: Director (critical issues, legal/compliance concerns)\n`;
        fullContent += `Level 4: Executive Team (crisis situations, major incidents)\n\n`;
        
        fullContent += `Contact Information:\n`;
        fullContent += `• Primary Support: support@zalpharecruit.com | 670-286-3010\n`;
        fullContent += `• Operations Team: ops@zalpharecruit.com\n`;
        fullContent += `• Technical Support: techsupport@zalpharecruit.com\n`;
        fullContent += `• ADA Compliance: ada@zalpharecruit.com\n`;
        fullContent += `• Emergency Line: Available 24/7 for critical issues\n\n`;
        
        sectionNumber++;
      } else if (line.trim()) {
        fullContent += line + '\n';
      }
    });
  } else {
    fullContent += doc.content || 'Content not available. Please contact the document owner for details.\n';
  }

  // COMPLIANCE AND LEGAL SECTION
  fullContent += `\n${'='.repeat(100)}\n\n`;
  fullContent += `COMPLIANCE & LEGAL CONSIDERATIONS\n`;
  fullContent += `${'-'.repeat(100)}\n\n`;
  fullContent += `Regulatory Compliance:\n`;
  fullContent += `This document and associated procedures comply with:\n\n`;
  fullContent += `• Americans with Disabilities Act (ADA):\n`;
  fullContent += `  - All processes must be accessible to persons with disabilities\n`;
  fullContent += `  - Reasonable accommodations provided upon request\n`;
  fullContent += `  - No discriminatory practices in any phase of operation\n`;
  fullContent += `  - Platform accessibility standards: WCAG 2.1 Level AA\n\n`;
  fullContent += `• Family Educational Rights and Privacy Act (FERPA):\n`;
  fullContent += `  - Student educational records protected\n`;
  fullContent += `  - Consent required for disclosure to third parties\n`;
  fullContent += `  - Students have right to access and correct their records\n`;
  fullContent += `  - Applies to all school partnerships and student data\n\n`;
  fullContent += `• CNMI and Pacific Islands Employment Law:\n`;
  fullContent += `  - Local labor regulations followed\n`;
  fullContent += `  - Cultural sensitivity in all communications\n`;
  fullContent += `  - Fair hiring practices enforced on platform\n\n`;
  fullContent += `• Data Protection and Privacy:\n`;
  fullContent += `  - ZALPHA Privacy Policy strictly enforced\n`;
  fullContent += `  - User consent obtained for all data processing\n`;
  fullContent += `  - Data security measures in place\n`;
  fullContent += `  - GDPR principles applied where relevant\n\n`;

  fullContent += `Legal Review:\n`;
  fullContent += `• Last Reviewed: January 2026\n`;
  fullContent += `• Reviewed By: ZALPHA Legal Counsel\n`;
  fullContent += `• Next Review: January 2027 (annual review cycle)\n`;
  fullContent += `• Legal Questions: legal@zalpharecruit.com\n\n`;

  // ADA ACCESSIBILITY SECTION
  fullContent += `${'='.repeat(100)}\n\n`;
  fullContent += `ADA ACCESSIBILITY COMMITMENT\n`;
  fullContent += `${'-'.repeat(100)}\n\n`;
  fullContent += `ZALPHA is proud to be The Pacific's First & Only ADA-Compliant Job Platform.\n\n`;
  fullContent += `Our ADA Commitment includes:\n\n`;
  fullContent += `Platform Accessibility:\n`;
  fullContent += `• Screen reader compatible (JAWS, NVDA, VoiceOver)\n`;
  fullContent += `• Keyboard navigation for all features\n`;
  fullContent += `• High contrast mode available\n`;
  fullContent += `• Adjustable font sizes\n`;
  fullContent += `• Closed captions on all video content\n`;
  fullContent += `• Visual and audio alerts\n`;
  fullContent += `• Extended time for assessments (upon request)\n`;
  fullContent += `• Alternative formats for documents (upon request)\n\n`;
  fullContent += `For Students with Disabilities:\n`;
  fullContent += `• Dedicated ADA Compliance Specialist available\n`;
  fullContent += `• Personalized accommodation plans\n`;
  fullContent += `• Assistive technology support\n`;
  fullContent += `• Privacy protection for disability information\n`;
  fullContent += `• No disclosure to employers without explicit consent\n\n`;
  fullContent += `For Employers:\n`;
  fullContent += `• ADA compliance training required\n`;
  fullContent += `• Job posting review for discriminatory language\n`;
  fullContent += `• Reasonable accommodation guidance provided\n`;
  fullContent += `• Accessible interview process support\n\n`;
  fullContent += `ADA Accommodation Requests:\n`;
  fullContent += `Contact: ada@zalpha.com | Phone: +1-670-483-JOBS (5627)\n`;
  fullContent += `Response Time: Within 4 hours for accommodation requests\n`;
  fullContent += `Implementation: Customized to individual needs\n\n`;

  // TRAINING AND CERTIFICATION
  fullContent += `${'='.repeat(100)}\n\n`;
  fullContent += `TRAINING & CERTIFICATION REQUIREMENTS\n`;
  fullContent += `${'-'.repeat(100)}\n\n`;
  fullContent += `All team members executing procedures in this document must complete:\n\n`;
  fullContent += `Initial Onboarding (Week 1):\n`;
  fullContent += `• Review this document thoroughly (estimated 2-3 hours)\n`;
  fullContent += `• Complete knowledge assessment quiz (80% pass rate required)\n`;
  fullContent += `• Shadow experienced team member (minimum 5 cases)\n`;
  fullContent += `• Review related SOPs and policy documents\n`;
  fullContent += `• Attend live training session with manager\n\n`;
  fullContent += `Practical Training (Week 2-3):\n`;
  fullContent += `• Supervised practice (minimum 10 cases)\n`;
  fullContent += `• Quality review by team lead on first 5 independent cases\n`;
  fullContent += `• Corrective feedback incorporated\n`;
  fullContent += `• Sign-off from supervisor required before full independence\n\n`;
  fullContent += `Ongoing Development:\n`;
  fullContent += `• Monthly team meetings for knowledge sharing\n`;
  fullContent += `• Quarterly refresher training\n`;
  fullContent += `• Annual recertification exam\n`;
  fullContent += `• Specialized training when procedures updated\n\n`;
  fullContent += `Performance Standards:\n`;
  fullContent += `• Quality Score: > 95% (based on QA audits)\n`;
  fullContent += `• Customer Satisfaction: > 4.5/5.0 rating\n`;
  fullContent += `• SLA Compliance: > 90% of cases within target timelines\n`;
  fullContent += `• Documentation Accuracy: 100% (critical fields)\n\n`;
  fullContent += `Training Resources:\n`;
  fullContent += `• Learning Management System (LMS): Access at lms.zalpha.com\n`;
  fullContent += `• Video Tutorials: Available in document repository\n`;
  fullContent += `• Practice Environment: Sandbox for testing without real data\n`;
  fullContent += `• Peer Mentorship: Buddy system for first 90 days\n\n`;

  // SUCCESS METRICS AND KPIs
  fullContent += `${'='.repeat(100)}\n\n`;
  fullContent += `SUCCESS METRICS & KEY PERFORMANCE INDICATORS (KPIs)\n`;
  fullContent += `${'-'.repeat(100)}\n\n`;
  fullContent += `Operational KPIs:\n`;
  fullContent += `• Process Completion Rate: Target > 98%\n`;
  fullContent += `• Average Handle Time: [Varies by process - see specific sections]\n`;
  fullContent += `• First Contact Resolution: Target > 80%\n`;
  fullContent += `• Error Rate: Target < 2%\n`;
  fullContent += `• SLA Compliance: Target > 95%\n\n`;
  fullContent += `Quality KPIs:\n`;
  fullContent += `• Customer Satisfaction Score (CSAT): Target > 4.5/5.0\n`;
  fullContent += `• Net Promoter Score (NPS): Target > 50\n`;
  fullContent += `• Quality Audit Score: Target > 95%\n`;
  fullContent += `• Documentation Accuracy: Target 100%\n\n`;
  fullContent += `Business Impact KPIs:\n`;
  fullContent += `• User Retention Rate: Track monthly\n`;
  fullContent += `• Feature Adoption: Track per feature launch\n`;
  fullContent += `• Revenue Impact: For revenue-generating processes\n`;
  fullContent += `• Cost Efficiency: Process cost vs. value delivered\n\n`;
  fullContent += `Reporting Frequency:\n`;
  fullContent += `• Daily: Critical metrics dashboards\n`;
  fullContent += `• Weekly: Team performance reviews\n`;
  fullContent += `• Monthly: Department KPI reporting to leadership\n`;
  fullContent += `• Quarterly: Strategic business reviews\n\n`;
  fullContent += `Accountability:\n`;
  fullContent += `• Individual Contributors: Meet personal performance targets\n`;
  fullContent += `• Team Leads: Ensure team hits collective KPIs\n`;
  fullContent += `• Managers: Overall process performance and improvement\n`;
  fullContent += `• Directors: Strategic alignment and resource allocation\n\n`;

  // CONTINUOUS IMPROVEMENT
  fullContent += `${'='.repeat(100)}\n\n`;
  fullContent += `CONTINUOUS IMPROVEMENT FRAMEWORK\n`;
  fullContent += `${'-'.repeat(100)}\n\n`;
  fullContent += `Process Optimization:\n`;
  fullContent += `ZALPHA is committed to continuous improvement of all operational processes.\n\n`;
  fullContent += `Feedback Mechanisms:\n`;
  fullContent += `• Suggestion Box: Submit ideas anytime to ops@zalpha.com\n`;
  fullContent += `• Monthly Retrospectives: Team reviews what worked well and what needs improvement\n`;
  fullContent += `• Customer Feedback: Surveys after key interactions\n`;
  fullContent += `• Data Analysis: Regular review of KPI trends and patterns\n`;
  fullContent += `• Incident Reviews: Post-mortem analysis of issues\n\n`;
  fullContent += `Improvement Process:\n`;
  fullContent += `1. Identify: Spot improvement opportunities through data or feedback\n`;
  fullContent += `2. Analyze: Root cause analysis of current state\n`;
  fullContent += `3. Design: Propose improved process/solution\n`;
  fullContent += `4. Test: Pilot with small group before full rollout\n`;
  fullContent += `5. Implement: Update documentation and train team\n`;
  fullContent += `6. Monitor: Track impact of changes\n`;
  fullContent += `7. Iterate: Further refinement based on results\n\n`;
  fullContent += `Innovation Culture:\n`;
  fullContent += `• Encourage experimentation and learning from failures\n`;
  fullContent += `• Recognize and reward process improvements\n`;
  fullContent += `• Allocate time for innovation projects\n`;
  fullContent += `• Cross-functional collaboration encouraged\n`;
  fullContent += `• Stay current with industry best practices\n\n`;

  // ESCALATION AND SUPPORT
  fullContent += `${'='.repeat(100)}\n\n`;
  fullContent += `ESCALATION PROCEDURES & SUPPORT CONTACTS\n`;
  fullContent += `${'-'.repeat(100)}\n\n`;
  fullContent += `When to Escalate:\n`;
  fullContent += `• Unable to resolve issue within SLA timeframe\n`;
  fullContent += `• Customer is extremely dissatisfied or threatens legal action\n`;
  fullContent += `• Technical issue beyond your scope or permissions\n`;
  fullContent += `• Ethical or legal concern identified\n`;
  fullContent += `• ADA accommodation request requiring specialist input\n`;
  fullContent += `• Data breach or security incident suspected\n`;
  fullContent += `• Process exception requiring manager approval\n\n`;
  fullContent += `Escalation Levels:\n\n`;
  fullContent += `LEVEL 1 - Team Lead/Senior Team Member\n`;
  fullContent += `When: Routine escalations, process questions, minor exceptions\n`;
  fullContent += `Response Time: Within 1 hour during business hours\n`;
  fullContent += `Contact: Via Slack or internal ticketing system\n\n`;
  fullContent += `LEVEL 2 - Department Manager\n`;
  fullContent += `When: Complex issues, customer dissatisfaction, process failures\n`;
  fullContent += `Response Time: Within 2 hours during business hours\n`;
  fullContent += `Contact: Direct phone/email to assigned manager\n\n`;
  fullContent += `LEVEL 3 - Director\n`;
  fullContent += `When: Critical issues, legal/compliance concerns, major incidents\n`;
  fullContent += `Response Time: Within 4 hours (immediate if critical)\n`;
  fullContent += `Contact: Via manager or emergency hotline\n\n`;
  fullContent += `LEVEL 4 - Executive Team (VP, C-Suite)\n`;
  fullContent += `When: Crisis situations, media attention, major financial impact\n`;
  fullContent += `Response Time: Immediate\n`;
  fullContent += `Contact: Via Director with clear situation summary\n\n`;
  fullContent += `Support Contacts:\n`;
  fullContent += `General Support: support@zalpha.com | +1-670-483-JOBS (5627)\n`;
  fullContent += `Operations: ops@zalpha.com\n`;
  fullContent += `Technical Support: techsupport@zalpha.com\n`;
  fullContent += `ADA Compliance: ada@zalpha.com\n`;
  fullContent += `Legal/Compliance: legal@zalpha.com\n`;
  fullContent += `Security Incidents: security@zalpha.com (24/7)\n`;
  fullContent += `Customer Success: success@zalpha.com\n`;
  fullContent += `Emergency Hotline: +1-670-XXX-XXXX (24/7 for critical issues)\n\n`;

  // DOCUMENT CONTROL
  fullContent += `${'='.repeat(100)}\n\n`;
  fullContent += `DOCUMENT CONTROL & VERSION HISTORY\n`;
  fullContent += `${'-'.repeat(100)}\n\n`;
  fullContent += `Current Version: ${doc.version}\n`;
  fullContent += `Effective Date: ${doc.lastUpdated}\n`;
  fullContent += `Document Status: ${doc.status.toUpperCase()}\n`;
  fullContent += `Next Review Date: ${getNextReviewDate(doc.lastUpdated)}\n\n`;
  fullContent += `Version Control Process:\n`;
  fullContent += `• Minor updates (typos, clarifications): Version X.Y+0.1\n`;
  fullContent += `• Significant changes (new sections, revised procedures): Version X.Y+1.0\n`;
  fullContent += `• Major overhaul (complete rewrite): Version X+1.0\n`;
  fullContent += `• All changes tracked in version control system\n`;
  fullContent += `• Change summary included with each version\n\n`;
  fullContent += `Review Cycle:\n`;
  fullContent += `• Quarterly: Quick review for relevance and accuracy\n`;
  fullContent += `• Annually: Comprehensive review and update\n`;
  fullContent += `• Ad-hoc: When processes change or issues identified\n`;
  fullContent += `• Post-incident: After any major incident related to this process\n\n`;
  fullContent += `Feedback and Suggestions:\n`;
  fullContent += `Team members are encouraged to submit improvement suggestions:\n`;
  fullContent += `• Email: ops@zalpha.com with subject "DOC FEEDBACK: ${doc.name}"\n`;
  fullContent += `• Include: Specific section, current issue, proposed improvement\n`;
  fullContent += `• Response: Acknowledgment within 48 hours\n`;
  fullContent += `• Implementation: Reviewed monthly, incorporated quarterly\n\n`;

  // APPROVAL AND OWNERSHIP
  fullContent += `${'='.repeat(100)}\n\n`;
  fullContent += `DOCUMENT APPROVAL & OWNERSHIP\n`;
  fullContent += `${'-'.repeat(100)}\n\n`;
  fullContent += `Document Owner: ${getDocumentOwner(doc.category)}\n`;
  fullContent += `Prepared By: Operations Team\n`;
  fullContent += `Reviewed By: Department Managers\n`;
  fullContent += `Approved By: Chief Operating Officer\n`;
  fullContent += `Legal Review: ZALPHA Legal Counsel (January 2026)\n`;
  fullContent += `ADA Compliance Review: ADA Compliance Officer (January 2026)\n\n`;
  fullContent += `Distribution:\n`;
  fullContent += `• All relevant team members (via Learning Management System)\n`;
  fullContent += `• Internal document repository (password-protected)\n`;
  fullContent += `• New hire onboarding materials\n`;
  fullContent += `• Manager reference library\n\n`;
  fullContent += `Confidentiality:\n`;
  fullContent += `This document contains confidential and proprietary information belonging to ZALPHA.\n`;
  fullContent += `• Internal Use Only - Do Not Distribute Externally\n`;
  fullContent += `• Not to be shared with competitors, media, or unauthorized parties\n`;
  fullContent += `• Employees must safeguard this information per employment agreement\n`;
  fullContent += `• Unauthorized disclosure may result in disciplinary action\n\n`;

  // FOOTER
  fullContent += `${'='.repeat(100)}\n\n`;
  fullContent += `© 2026 ZALPHA - The Pacific's First & Only ADA-Compliant Job Platform\n`;
  fullContent += `Connecting Pacific Islands Youth with Meaningful Employment Opportunities\n`;
  fullContent += `Serving: CNMI, Guam, Palau, FSM, RMI, and Beyond\n\n`;
  fullContent += `All Rights Reserved. Confidential and Proprietary.\n`;
  fullContent += `\n`;
  fullContent += `For questions about this document, contact: ops@zalpha.com\n`;
  fullContent += `Document Generated: ${new Date().toLocaleString()}\n`;
  fullContent += `${'='.repeat(100)}\n`;

  return fullContent;
}

// Helper function to get next review date (1 year from last update)
function getNextReviewDate(lastUpdated: string): string {
  const date = new Date(lastUpdated);
  date.setFullYear(date.getFullYear() + 1);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// Helper function to determine document owner based on category
function getDocumentOwner(category: string): string {
  const owners: Record<string, string> = {
    'sop': 'Director of Operations',
    'training': 'Director of Learning & Development',
    'process': 'Director of Operations',
    'policy': 'Chief Operating Officer',
    'playbook': 'VP of Sales & Marketing',
    'technical': 'Chief Technology Officer',
    'reporting': 'Director of Analytics',
    'legal': 'Chief Legal Officer',
    'marketing': 'Chief Marketing Officer',
    'business_development': 'Chief Revenue Officer',
  };
  return owners[category] || 'Chief Operating Officer';
}