/*
 * ZALPHA Platform - Pacific Job Connection System
 * Copyright © 2026 KI Manpower Services. All Rights Reserved.
 * 
 * The First EdTech SaaS Platform Born in the CNMI
 * Trademark Pending ™ | Intellectual Property Patent Pending
 * 
 * UNAUTHORIZED DISTRIBUTION, MODIFICATION, OR USE IS STRICTLY PROHIBITED.
 * 
 * Operated by: KI Manpower Services DBA ZALPHA
 * Website: www.zalpharecruit.com
 * 
 * For licensing inquiries: legal@zalpharecruit.com
 */

import { useState, useEffect } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { PasswordGate } from '@/app/components/PasswordGate';
import { Landing } from '@/app/pages/Landing';
import { SignIn } from '@/app/pages/SignIn';
import { StudentSignup } from '@/app/pages/StudentSignup';
import { EmployerSignup } from '@/app/pages/EmployerSignup';
import { StudentDashboard } from '@/app/pages/StudentDashboard';
import { JobSearch } from '@/app/pages/JobSearch';
import { StudentProfile } from '@/app/pages/StudentProfile';
import { EmployerDashboard } from '@/app/pages/EmployerDashboard';
import { TrainingHub } from '@/app/pages/TrainingHub';
import { InstallGuide } from '@/app/pages/InstallGuide';
import { QRCodePage } from '@/app/pages/QRCodePage';
import { CompanyReviewDemo } from '@/app/pages/CompanyReviewDemo';
import { AdminModeration } from '@/app/pages/AdminModeration';
import { PrivacyPolicy } from '@/app/pages/PrivacyPolicy';
import { TermsOfService } from '@/app/pages/TermsOfService';
import { DemoShowcase } from '@/app/pages/DemoShowcase';
import { HeyGenDemo } from '@/app/pages/HeyGenDemo';
import { HeyGenConfiguration } from '@/app/pages/HeyGenConfiguration';
import { HeyGenAgentDemo } from '@/app/pages/HeyGenAgentDemo';
import { StudentPlatformFeatures } from '@/app/pages/StudentPlatformFeatures';
import { EmployerPlatformFeatures } from '@/app/pages/EmployerPlatformFeatures';
import { PricingPage } from '@/app/pages/PricingPage';
import { ComingSoon } from '@/app/pages/ComingSoon';
import { ExperiencedProfessionalsComingSoon } from '@/app/pages/ExperiencedProfessionalsComingSoon';
import { FAQ } from '@/app/pages/FAQ';
import { LegalDisclaimers } from '@/app/pages/LegalDisclaimers';
import { InternalStaffPortal } from '@/app/pages/InternalStaffPortal';
import { InternalLegalDocs } from '@/app/pages/InternalLegalDocs';
import { InternalBDDocs } from '@/app/pages/InternalBDDocs';
import { InternalOperationalDocs } from '@/app/pages/InternalOperationalDocs';
import { InternalMarketingDocs } from '@/app/pages/InternalMarketingDocs';
import { AboutUs } from '@/app/pages/AboutUs';
import { MissionSocialImpact } from '@/app/pages/MissionSocialImpact';
import { SocialResponsibility } from '@/app/pages/SocialResponsibility';
import { VirtualCollegeFairs } from '@/app/pages/VirtualCollegeFairs';
import { StudentPrivacySettingsPage } from '@/app/pages/StudentPrivacySettingsPage';
import { ADAInformation } from '@/app/pages/ADAInformation';
import { ADASettings } from '@/app/pages/ADASettings';
import { InclusiveHiring } from '@/app/pages/InclusiveHiring';
import { IntegrationSettings } from '@/app/pages/IntegrationSettings';
import { SyncDashboard } from '@/app/pages/SyncDashboard';
import { AppOverview } from '@/app/pages/AppOverview';
import { GlobalContractsMarketplace } from '@/app/pages/GlobalContractsMarketplace';
import { CoOpRoleSelection } from '@/app/pages/CoOpRoleSelection';
import { HighSchoolCoOpDashboard } from '@/app/pages/HighSchoolCoOpDashboard';
import { CoOpAdminDashboard } from '@/app/pages/CoOpAdminDashboard';
import { CoOpEmployerDashboard } from '@/app/pages/CoOpEmployerDashboard';
import { PitchDeckEmployers } from '@/app/pages/PitchDeckEmployers';
import { DIDAgentDemo } from '@/app/pages/DIDAgentDemo';
import { EmployerAIAgents } from '@/app/pages/EmployerAIAgents';
import { DIDConfiguration } from '@/app/pages/DIDConfiguration';
import DIDSetup from '@/app/pages/DIDSetup';
import DIDKnowledgeManager from '@/app/pages/DIDKnowledgeManager';
import { TutorialAdmin } from '@/app/pages/TutorialAdmin';
import { PitchDeckStudents } from '@/app/pages/PitchDeckStudents';
import { PitchDeckSchools } from '@/app/pages/PitchDeckSchools';
import { PitchDeckInvestors } from '@/app/pages/PitchDeckInvestors';
import { PitchDeckInternal } from '@/app/pages/PitchDeckInternal';
import { ContractMarketplace } from '@/app/pages/ContractMarketplace';
import { CustomIntegrations } from '@/app/pages/CustomIntegrations';
import { PitchDeckAdvertisers } from '@/app/pages/PitchDeckAdvertisers';
import { PitchDeckRecruit } from '@/app/pages/PitchDeckRecruit';
import { BasicSkillsDemo } from '@/app/pages/BasicSkillsDemo';
import { VideoInterviews } from '@/app/pages/VideoInterviews';
import { SchoolBDGuide } from '@/app/pages/SchoolBDGuide';
import { SchoolLogin } from '@/app/pages/SchoolLogin';
import { SchoolDashboard } from '@/app/pages/SchoolDashboard';
import { KickstarterCampaign } from '@/app/pages/KickstarterCampaign';
import { LegalChecklist } from '@/app/pages/LegalChecklist';
import { LegalDocumentRepository } from '@/app/pages/LegalDocumentRepository';
import { OperationalDocumentRepository } from '@/app/pages/OperationalDocumentRepository';
import { MarketingMaterialsRepository } from '@/app/pages/MarketingMaterialsRepository';
import { BusinessDevelopmentRepository } from '@/app/pages/BusinessDevelopmentRepository';
import { ContractWorkPortal } from '@/app/pages/ContractWorkPortal';
import { CoachDashboard } from '@/app/pages/CoachDashboard';
import { EmployerAssessments } from '@/app/pages/EmployerAssessments';
import { StudentAICourses } from '@/app/pages/StudentAICourses';
import { CulturalSensitivityTraining } from '@/app/pages/CulturalSensitivityTraining';
import { VideoTutorials } from '@/app/pages/VideoTutorials';
import { EmployerBDGuide } from '@/app/pages/EmployerBDGuide';
import { InvestorBDGuide } from '@/app/pages/InvestorBDGuide';
import { ZALPHAvsIndeed } from '@/app/pages/ZALPHAvsIndeed';
import { InternalLogin } from '@/app/pages/InternalLogin';
import { InternalDashboard } from '@/app/pages/InternalDashboard';
import { HealthCheck } from '@/app/pages/HealthCheck';
import { RecruiterIntegration } from '@/app/pages/RecruiterIntegration';
import { CandidateSearch } from '@/app/pages/CandidateSearch';
import { EmployerProfile } from '@/app/pages/EmployerProfile';
import { PrivacyDashboard } from '@/app/pages/PrivacyDashboard';
import { FreelanceMarketplace } from '@/app/pages/FreelanceMarketplace';
import { InternshipBoard } from '@/app/pages/InternshipBoard';
import { InternshipTracking } from '@/app/pages/InternshipTracking';
import { MentorInternWorkspace } from '@/app/pages/MentorInternWorkspace';
import { ProjectWorkspace } from '@/app/pages/ProjectWorkspace';
import { EducationalInstitutionDashboard } from '@/app/pages/EducationalInstitutionDashboard';
import { EmployerPlanDemos } from '@/app/pages/EmployerPlanDemos';
import { StudentAddonDemo } from '@/app/pages/StudentAddonDemo';
import { AIInterviewPractice } from '@/app/pages/AIInterviewPractice';
import { SchoolDashboardDemo } from '@/app/pages/SchoolDashboardDemo';
import { SchoolPartnershipGuide } from '@/app/pages/SchoolPartnershipGuide';
import { BetaTesterApplication } from '@/app/pages/BetaTesterApplication';
import { BetaApplicationsAdmin } from '@/app/pages/BetaApplicationsAdmin';
import { BetaUserDemo } from '@/app/pages/BetaUserDemo';
import { MetgotBetaApplication } from '@/app/pages/MetgotBetaApplication';
import { DataRecoveryCheck } from '@/app/pages/DataRecoveryCheck';
import { DatabaseDirectCheck } from '@/app/pages/DatabaseDirectCheck';
import { UserManagement } from '@/app/pages/UserManagement';
import { AdminVerifications } from '@/app/pages/AdminVerifications';
import { AdminDashboard } from '@/app/pages/AdminDashboard';
import { LogoShowcase } from '@/app/pages/LogoShowcase';
import { ColorMockup } from '@/app/components/ColorMockup';
import { initPWA } from '@/pwa-register';
import { SignupMonitor } from '@/app/pages/SignupMonitor';
import { AdminDataViewer } from '@/app/components/AdminDataViewer';
import { DataCheck } from '@/app/pages/DataCheck';
import { CoOpLogin } from '@/app/pages/CoOpLogin';
import { CoOpStudentDashboard } from '@/app/pages/CoOpStudentDashboard';
import { CoOpCoordinatorDashboard } from '@/app/pages/CoOpCoordinatorDashboard';
import { CoOpFundraisingHub } from '@/app/pages/CoOpFundraisingHub';
import { CoOpStudentTimeLog } from '@/app/pages/CoOpStudentTimeLog';
import { CoOpCoordinatorCohortSetup } from '@/app/pages/CoOpCoordinatorCohortSetup';
import { CoOpCoordinatorPlacementManagement } from '@/app/pages/CoOpCoordinatorPlacementManagement';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [userType, setUserType] = useState<'student' | 'employer' | 'school' | null>(null);
  const [schoolId, setSchoolId] = useState<string>('school_001'); // Mock school ID
  const [internalUser, setInternalUser] = useState<{ name: string; role: string } | null>(null);

  // Initialize PWA features
  useEffect(() => {
    initPWA();

    // Handle browser back/forward buttons
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page || 'landing';
      setCurrentPage(page);
      
      // Update user type based on the page
      if (page === 'student-dashboard') {
        setUserType('student');
      } else if (page === 'employer-dashboard') {
        setUserType('employer');
      } else if (page === 'school-dashboard') {
        setUserType('school');
      } else if (page === 'landing') {
        setUserType(null);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Set initial state if none exists
    if (!window.history.state) {
      window.history.replaceState({ page: 'landing' }, '', window.location.href);
    } else {
      // Restore the page from history state
      const savedPage = window.history.state.page;
      if (savedPage) {
        setCurrentPage(savedPage);
      }
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleInternalLogin = (userName: string, userRole: string) => {
    setInternalUser({ name: userName, role: userRole });
  };

  const handleInternalLogout = () => {
    setInternalUser(null);
    setCurrentPage('internal-login');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    
    // Push to browser history
    window.history.pushState({ page }, '', window.location.pathname);
    
    // Set user type based on dashboard
    if (page === 'student-dashboard') {
      setUserType('student');
    } else if (page === 'employer-dashboard') {
      setUserType('employer');
    } else if (page === 'school-dashboard') {
      setUserType('school');
    } else if (page === 'landing') {
      setUserType(null);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  };

  return (
    <PasswordGate correctPassword="demo2026">
      <div className="overflow-x-hidden w-full">
        <Navigation 
          userType={userType}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
        
        {currentPage === 'landing' && <Landing onNavigate={handleNavigate} />}
        {currentPage === 'signin' && <SignIn onNavigate={handleNavigate} />}
        {currentPage === 'student-signup' && <StudentSignup onNavigate={handleNavigate} />}
        {currentPage === 'employer-signup' && <EmployerSignup onNavigate={handleNavigate} />}
        {currentPage === 'student-dashboard' && <StudentDashboard onNavigate={handleNavigate} />}
        {currentPage === 'job-search' && <JobSearch onNavigate={handleNavigate} />}
        {currentPage === 'student-profile' && <StudentProfile onNavigate={handleNavigate} />}
        {currentPage === 'employer-dashboard' && <EmployerDashboard onNavigate={handleNavigate} />}
        {currentPage === 'training-hub' && <TrainingHub onNavigate={handleNavigate} />}
        {currentPage === 'install-guide' && <InstallGuide onNavigate={handleNavigate} />}
        {currentPage === 'qr-code' && <QRCodePage onNavigate={handleNavigate} />}
        {currentPage === 'company-review-demo' && <CompanyReviewDemo onNavigate={handleNavigate} />}
        {currentPage === 'admin-moderation' && <AdminModeration onNavigate={handleNavigate} />}
        {currentPage === 'privacy-policy' && <PrivacyPolicy onNavigate={handleNavigate} />}
        {currentPage === 'terms-of-service' && <TermsOfService onNavigate={handleNavigate} />}
        {currentPage === 'demo-showcase' && <DemoShowcase onNavigate={handleNavigate} />}
        {currentPage === 'heygen-demo' && <HeyGenDemo onNavigate={handleNavigate} />}
        {currentPage === 'heygen-configuration' && <HeyGenConfiguration onNavigate={handleNavigate} />}
        {currentPage === 'heygen-agent-demo' && <HeyGenAgentDemo onNavigate={handleNavigate} />}
        {currentPage === 'student-features' && <StudentPlatformFeatures onNavigate={handleNavigate} />}
        {currentPage === 'employer-features' && <EmployerPlatformFeatures onNavigate={handleNavigate} />}
        {currentPage === 'pricing' && <PricingPage onNavigate={handleNavigate} />}
        {currentPage === 'coming-soon' && <ComingSoon onNavigate={setCurrentPage} />}
        {currentPage === 'experienced-professionals-coming-soon' && <ExperiencedProfessionalsComingSoon onNavigate={setCurrentPage} />}
        {currentPage === 'faq' && <FAQ onNavigate={setCurrentPage} />}
        {currentPage === 'legal-disclaimers' && <LegalDisclaimers onNavigate={setCurrentPage} />}
        {currentPage === 'internal-staff-portal' && <InternalStaffPortal onNavigate={setCurrentPage} />}
        {currentPage === 'internal-legal' && <InternalLegalDocs onNavigate={setCurrentPage} />}
        {currentPage === 'internal-bd' && <InternalBDDocs onNavigate={setCurrentPage} />}
        {currentPage === 'internal-operational' && <InternalOperationalDocs onNavigate={setCurrentPage} />}
        {currentPage === 'internal-marketing' && <InternalMarketingDocs onNavigate={setCurrentPage} />}
        {currentPage === 'about-us' && <AboutUs onNavigate={setCurrentPage} />}
        {currentPage === 'mission-social-impact' && <MissionSocialImpact onNavigate={setCurrentPage} />}
        {currentPage === 'social-responsibility' && <SocialResponsibility onNavigate={setCurrentPage} />}
        {currentPage === 'virtual-college-fairs' && <VirtualCollegeFairs onNavigate={setCurrentPage} />}
        {currentPage === 'student-privacy-settings' && <StudentPrivacySettingsPage onNavigate={handleNavigate} />}
        {currentPage === 'ada-information' && <ADAInformation onNavigate={handleNavigate} />}
        {currentPage === 'ada-settings' && <ADASettings onNavigate={handleNavigate} />}
        {currentPage === 'inclusive-hiring' && <InclusiveHiring onNavigate={handleNavigate} />}
        {currentPage === 'integration-settings' && <IntegrationSettings onNavigate={handleNavigate} />}
        {currentPage === 'sync-dashboard' && <SyncDashboard onNavigate={handleNavigate} />}
        {currentPage === 'did-agent-demo' && <DIDAgentDemo />}
        {currentPage === 'employer-ai-agents' && <EmployerAIAgents />}
        {currentPage === 'did-configuration' && <DIDConfiguration />}
        {currentPage === 'did-setup' && <DIDSetup onNavigate={handleNavigate} />}
        {currentPage === 'did-knowledge-manager' && <DIDKnowledgeManager onNavigate={handleNavigate} />}
        {currentPage === 'tutorial-admin' && <TutorialAdmin onNavigate={handleNavigate} />}
        {currentPage === 'app-overview' && <AppOverview onNavigate={handleNavigate} />}
        {currentPage === 'global-contracts-marketplace' && <GlobalContractsMarketplace onNavigate={handleNavigate} />}
        {currentPage === 'coop-role-selection' && <CoOpRoleSelection onNavigate={handleNavigate} />}
        {currentPage === 'coop-student-dashboard' && <HighSchoolCoOpDashboard onNavigate={handleNavigate} />}
        {currentPage === 'coop-admin-dashboard' && <CoOpAdminDashboard onNavigate={handleNavigate} />}
        {currentPage === 'coop-employer-dashboard' && <CoOpEmployerDashboard onNavigate={handleNavigate} />}
        {currentPage === 'pitch-deck-employers' && <PitchDeckEmployers onNavigate={handleNavigate} />}
        {currentPage === 'pitch-deck-students' && <PitchDeckStudents onNavigate={handleNavigate} />}
        {currentPage === 'pitch-deck-schools' && <PitchDeckSchools onNavigate={handleNavigate} />}
        {currentPage === 'pitch-deck-investors' && <PitchDeckInvestors onNavigate={handleNavigate} />}
        {currentPage === 'pitch-deck-internal' && <PitchDeckInternal onNavigate={handleNavigate} />}
        {currentPage === 'pitch-deck-recruit' && <PitchDeckRecruit onNavigate={handleNavigate} />}
        {currentPage === 'contract-marketplace' && <ContractMarketplace onNavigate={setCurrentPage} userType={userType} />}
        {currentPage === 'custom-integrations' && <CustomIntegrations onNavigate={setCurrentPage} />}
        {currentPage === 'pitch-deck-advertisers' && <PitchDeckAdvertisers onNavigate={setCurrentPage} />}
        {currentPage === 'basic-skills-demo' && <BasicSkillsDemo onNavigate={handleNavigate} />}
        {currentPage === 'video-interviews' && <VideoInterviews onNavigate={handleNavigate} />}
        {currentPage === 'school-bd-guide' && <SchoolBDGuide onNavigate={handleNavigate} />}
        {currentPage === 'school-login' && <SchoolLogin onNavigate={handleNavigate} />}
        {currentPage === 'school-dashboard' && <SchoolDashboard onNavigate={handleNavigate} />}
        {currentPage === 'kickstarter-campaign' && <KickstarterCampaign onNavigate={handleNavigate} />}
        {currentPage === 'legal-checklist' && <LegalChecklist onNavigate={handleNavigate} />}
        {currentPage === 'legal-document-repository' && <LegalDocumentRepository onNavigate={handleNavigate} />}
        {currentPage === 'operational-document-repository' && <OperationalDocumentRepository onNavigate={handleNavigate} />}
        {currentPage === 'marketing-materials-repository' && <MarketingMaterialsRepository onNavigate={handleNavigate} />}
        {currentPage === 'business-development-repository' && <BusinessDevelopmentRepository onNavigate={handleNavigate} />}
        {currentPage === 'contract-work-portal' && <ContractWorkPortal onNavigate={handleNavigate} />}
        {currentPage === 'coach-dashboard' && <CoachDashboard onNavigate={handleNavigate} />}
        {currentPage === 'employer-assessments' && <EmployerAssessments onNavigate={handleNavigate} />}
        {currentPage === 'student-ai-courses' && <StudentAICourses onNavigate={handleNavigate} />}
        {currentPage === 'cultural-training' && <CulturalSensitivityTraining onNavigate={handleNavigate} />}
        {currentPage === 'video-tutorials' && <VideoTutorials onNavigate={handleNavigate} userType={userType || 'student'} />}
        {currentPage === 'employer-bd-guide' && <EmployerBDGuide onNavigate={handleNavigate} />}
        {currentPage === 'investor-bd-guide' && <InvestorBDGuide onNavigate={handleNavigate} />}
        {currentPage === 'zalpha-vs-indeed' && <ZALPHAvsIndeed onNavigate={handleNavigate} />}
        {currentPage === 'internal-login' && <InternalLogin onNavigate={handleNavigate} onLogin={handleInternalLogin} />}
        {currentPage === 'internal-dashboard' && internalUser && (
          <InternalDashboard 
            onNavigate={handleNavigate} 
            userRole={internalUser.role} 
            userName={internalUser.name} 
            onLogout={handleInternalLogout} 
          />
        )}
        {currentPage === 'health-check' && <HealthCheck onNavigate={handleNavigate} />}
        {currentPage === 'recruiter-integration' && <RecruiterIntegration onNavigate={handleNavigate} />}
        {currentPage === 'candidate-search' && <CandidateSearch onNavigate={handleNavigate} />}
        {currentPage === 'employer-profile' && <EmployerProfile onNavigate={handleNavigate} />}
        {currentPage === 'privacy-dashboard' && <PrivacyDashboard onNavigate={handleNavigate} />}
        {currentPage === 'freelance-marketplace' && <FreelanceMarketplace onNavigate={handleNavigate} userType={userType || 'student'} />}
        {currentPage === 'internship-board' && <InternshipBoard onNavigate={handleNavigate} userType={userType || 'student'} />}
        {currentPage === 'internship-tracking' && <InternshipTracking userType={userType || 'student'} />}
        {currentPage === 'mentor-intern-workspace' && <MentorInternWorkspace internshipId="INT001" internName="John Doe" mentorName="Jane Smith" userType="student" startDate={new Date('2026-01-15')} endDate={new Date('2026-06-15')} />}
        {currentPage === 'project-workspace' && <ProjectWorkspace onNavigate={handleNavigate} projectId="PRJ001" projectTitle="Website Redesign" userType={userType || 'student'} currentMilestone={1} />}
        {currentPage === 'educational-institution-dashboard' && <EducationalInstitutionDashboard onNavigate={handleNavigate} institutionName="Northern Marianas College" />}
        {currentPage === 'employer-plan-demos' && <EmployerPlanDemos onNavigate={handleNavigate} />}
        {currentPage === 'student-addon-demo' && <StudentAddonDemo onNavigate={handleNavigate} />}
        {currentPage === 'ai-interview-practice' && <AIInterviewPractice onNavigate={handleNavigate} />}
        {currentPage === 'school-dashboard-demo' && <SchoolDashboardDemo onNavigate={handleNavigate} />}
        {currentPage === 'school-partnership-guide' && <SchoolPartnershipGuide onNavigate={handleNavigate} />}
        {currentPage === 'beta-tester-application' && <BetaTesterApplication onNavigate={handleNavigate} />}
        {currentPage === 'metgot-beta-application' && <MetgotBetaApplication onNavigate={handleNavigate} />}
        {currentPage === 'beta-applications-admin' && <BetaApplicationsAdmin onNavigate={handleNavigate} />}
        {currentPage === 'beta-user-demo' && <BetaUserDemo onNavigate={handleNavigate} />}
        {currentPage === 'data-recovery-check' && <DataRecoveryCheck onNavigate={handleNavigate} />}
        {currentPage === 'database-direct-check' && <DatabaseDirectCheck onNavigate={handleNavigate} />}
        {currentPage === 'user-management' && <UserManagement onNavigate={handleNavigate} />}
        {currentPage === 'admin-verifications' && <AdminVerifications onNavigate={handleNavigate} />}
        {currentPage === 'admin-dashboard' && <AdminDashboard onNavigate={handleNavigate} />}
        {currentPage === 'logo-showcase' && <LogoShowcase onNavigate={handleNavigate} />}
        {currentPage === 'color-mockup' && <ColorMockup />}
        {currentPage === 'signup-monitor' && <SignupMonitor onNavigate={handleNavigate} />}
        {currentPage === 'admin-data-viewer' && <AdminDataViewer onNavigate={handleNavigate} />}
        {currentPage === 'data-check' && <DataCheck onNavigate={handleNavigate} />}
        {currentPage === 'co-op-login' && <CoOpLogin onNavigate={handleNavigate} />}
        {currentPage === 'co-op-student-dashboard' && <CoOpStudentDashboard onNavigate={handleNavigate} />}
        {currentPage === 'co-op-coordinator-dashboard' && <CoOpCoordinatorDashboard onNavigate={handleNavigate} />}
        {currentPage === 'co-op-fundraising-hub' && <CoOpFundraisingHub onNavigate={handleNavigate} />}
        {currentPage === 'co-op-student-time-log' && <CoOpStudentTimeLog onNavigate={handleNavigate} />}
        {currentPage === 'co-op-coordinator-cohort-setup' && <CoOpCoordinatorCohortSetup onNavigate={handleNavigate} />}
        {currentPage === 'co-op-coordinator-placement-management' && <CoOpCoordinatorPlacementManagement onNavigate={handleNavigate} />}
      </div>
    </PasswordGate>
  );
}