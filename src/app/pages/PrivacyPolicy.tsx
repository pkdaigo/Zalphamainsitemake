import { ArrowLeft, AlertTriangle, Shield, Database, Users } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { CollapsibleSection } from '@/app/components/CollapsibleSection';

interface PrivacyPolicyProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-slate-50 pb-12 sm:pb-20 px-4">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto pt-6">
        <BackButton onNavigate={onNavigate} label="Back to Home" />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-6 sm:py-8 px-4 mt-6 rounded-2xl max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm sm:text-base text-slate-300">Last Updated: January 28, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6 sm:py-8">
        <div className="space-y-4">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
            <p className="text-slate-700 leading-relaxed">
              ZALPHA ("we," "our," or "us") operates a job connection platform for students and employers 
              in the Western Pacific region. This Privacy Policy explains how we collect, use, disclose, 
              and protect your personal information.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
            <div className="flex items-start gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-sm text-blue-700 font-medium">
                  We use cookies and similar technologies to improve your experience on ZALPHA
                </p>
              </div>
            </div>
            
            <div className="space-y-4 text-slate-800">
              <p>
                Cookies are small text files stored on your device that help us provide and improve our services. 
                You can manage your cookie preferences at any time.
              </p>
              
              <div>
                <h3 className="font-bold text-lg mb-2">Types of Cookies We Use:</h3>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <p className="font-semibold text-blue-900">Essential Cookies (Always Active)</p>
                    <p className="text-sm text-slate-700">
                      Required for the website to function properly. Enable core features like security, 
                      authentication, and session management.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <p className="font-semibold text-blue-900">Analytics Cookies</p>
                    <p className="text-sm text-slate-700">
                      Help us understand how visitors use our website by collecting information anonymously. 
                      This helps us improve the user experience.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <p className="font-semibold text-blue-900">Marketing Cookies</p>
                    <p className="text-sm text-slate-700">
                      Used to track visitors across websites to display relevant advertisements and measure 
                      campaign effectiveness.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <p className="font-semibold text-blue-900">Functional Cookies</p>
                    <p className="text-sm text-slate-700">
                      Enable enhanced functionality and personalization, such as remembering your preferences 
                      and settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Your Privacy Rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Your Privacy Rights
            </h2>
            
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-bold mb-2">Rights Under CCPA/GDPR:</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Right to Know:</strong> Request what personal information we've collected about you</li>
                  <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
                  <li><strong>Right to Correct:</strong> Request correction of inaccurate information</li>
                  <li><strong>Right to Data Portability:</strong> Receive a copy of your data in a portable format</li>
                  <li><strong>Right to Non-Discrimination:</strong> We won't discriminate against you for exercising your rights</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  To exercise any of these rights, contact us at privacy@zalpharecruit.com or call 670-286-3010. 
                  We will respond within 30 days as required by law.
                </p>
              </div>
            </div>
          </section>

          {/* Information Collection */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-purple-600" />
              Information We Collect
            </h2>
            
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-bold mb-2">1. Information You Provide:</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Account registration information</li>
                  <li>Profile information (resume, skills, education)</li>
                  <li>Job applications and communications</li>
                  <li>Company reviews and ratings</li>
                  <li>Payment information (for employers)</li>
                  <li>Verification documents (ID, transcripts)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">2. Information Collected Automatically:</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Device information and IP address</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Clickstream data and interactions</li>
                  <li>Cookies and tracking technologies</li>
                  <li>Location data (with permission)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">3. Information from Third Parties:</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Social media profiles (if you connect them)</li>
                  <li>Background check results</li>
                  <li>Education verification from institutions</li>
                  <li>Employer references</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Share Information */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-green-600" />
              How We Share Your Information
            </h2>
            
            <div className="space-y-3 text-slate-700">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-bold">1. With Employers (when you apply)</p>
                <p className="text-sm">When you apply to jobs, we share your profile with those specific employers</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-bold">2. Service Providers</p>
                <p className="text-sm">Hosting, email, analytics, and payment processing partners who help us operate ZALPHA</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-bold">3. With Your Consent</p>
                <p className="text-sm">When you explicitly authorize us to share your information</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-bold">4. Legal Requirements</p>
                <p className="text-sm">When required by law, court order, or government request</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-green-900">
                  <strong>We do NOT:</strong> Sell your data to marketers, share it with data brokers, 
                  or give it to third-party recruiters without your permission.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t pt-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-700 mb-4">
              For privacy questions or to exercise your rights:
            </p>
            <div className="bg-slate-50 rounded-lg p-4 text-sm">
              <p><strong>Email:</strong> privacy@zalpharecruit.com</p>
              <p><strong>Phone:</strong> 670-286-3010</p>
              <p><strong>Mail:</strong> ZALPHA Privacy Team, P.O. Box 1234, Tamuning, GU 96913</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-slate-100 rounded-lg p-6 text-center">
            <p className="text-slate-700">
              By using ZALPHA, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}