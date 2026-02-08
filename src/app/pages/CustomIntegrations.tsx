import { Plug, Database, MessageSquare, Calendar, Shield, Users, BarChart3, FileText, Mail, CheckCircle, Zap, ArrowRight, Settings } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface CustomIntegrationsProps {
  onNavigate: (page: string) => void;
}

export function CustomIntegrations({ onNavigate }: CustomIntegrationsProps) {
  const integrations = [
    {
      category: 'HRIS & Payroll Systems',
      icon: <Users className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Seamlessly sync hired candidates with your existing HR systems',
      options: [
        { name: 'Workday', description: 'Auto-create employee profiles after hire', setupTime: '2-3 days' },
        { name: 'BambooHR', description: 'Sync candidate data to employee records', setupTime: '1-2 days' },
        { name: 'ADP Workforce Now', description: 'Automatic payroll & benefits enrollment', setupTime: '2-4 days' },
        { name: 'Paylocity', description: 'Onboarding workflow automation', setupTime: '2-3 days' },
        { name: 'Gusto', description: 'Employee data sync for payroll', setupTime: '1-2 days' },
        { name: 'Paychex', description: 'New hire reporting & tax forms', setupTime: '2-3 days' }
      ]
    },
    {
      category: 'Communication & Collaboration',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Connect your team communication tools for seamless hiring workflows',
      options: [
        { name: 'Slack', description: 'Real-time candidate notifications & updates', setupTime: '1 day' },
        { name: 'Microsoft Teams', description: 'Interview scheduling & team alerts', setupTime: '1-2 days' },
        { name: 'Google Workspace', description: 'Calendar sync & Gmail integration', setupTime: '1 day' },
        { name: 'Zoom', description: 'Automatic video interview scheduling', setupTime: '1 day' }
      ]
    },
    {
      category: 'Background Checks & Verification',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      description: 'Automate background checks and additional verification processes',
      options: [
        { name: 'Checkr', description: 'Automated background screening', setupTime: '2-3 days' },
        { name: 'Sterling', description: 'Comprehensive background checks', setupTime: '2-4 days' },
        { name: 'GoodHire', description: 'Employment & education verification', setupTime: '2-3 days' },
        { name: 'HireRight', description: 'Drug testing & credential verification', setupTime: '3-4 days' }
      ]
    },
    {
      category: 'Skills Assessment Platforms',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      description: 'Integrate technical assessments and skills testing',
      options: [
        { name: 'Codility', description: 'Technical coding assessments', setupTime: '2-3 days' },
        { name: 'HackerRank', description: 'Programming challenges & tests', setupTime: '2-3 days' },
        { name: 'TestGorilla', description: 'Multi-skill assessments', setupTime: '1-2 days' },
        { name: 'Criteria Corp', description: 'Aptitude & personality tests', setupTime: '2-3 days' }
      ]
    },
    {
      category: 'Calendar & Scheduling',
      icon: <Calendar className="w-8 h-8" />,
      color: 'from-indigo-500 to-purple-500',
      description: 'Sync interview scheduling with your calendar systems',
      options: [
        { name: 'Google Calendar', description: 'Two-way calendar sync', setupTime: '1 day' },
        { name: 'Outlook Calendar', description: 'Microsoft 365 integration', setupTime: '1 day' },
        { name: 'Calendly', description: 'Self-service interview scheduling', setupTime: '1 day' },
        { name: 'Microsoft Bookings', description: 'Enterprise scheduling solution', setupTime: '1-2 days' }
      ]
    },
    {
      category: 'Onboarding & Training',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-cyan-500 to-blue-500',
      description: 'Streamline new hire onboarding and training processes',
      options: [
        { name: 'WorkBright', description: 'Digital onboarding forms & I-9', setupTime: '2-3 days' },
        { name: 'Click Boarding', description: 'Automated onboarding workflows', setupTime: '2-4 days' },
        { name: 'Lessonly', description: 'Training & knowledge management', setupTime: '3-4 days' },
        { name: 'SAP SuccessFactors', description: 'Enterprise onboarding suite', setupTime: '4-5 days' }
      ]
    },
    {
      category: 'Analytics & Reporting',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      description: 'Export hiring data to your BI and analytics platforms',
      options: [
        { name: 'Tableau', description: 'Custom hiring analytics dashboards', setupTime: '3-4 days' },
        { name: 'Power BI', description: 'Microsoft data visualization', setupTime: '3-4 days' },
        { name: 'Google Data Studio', description: 'Free reporting & analytics', setupTime: '2-3 days' },
        { name: 'Looker', description: 'Advanced data exploration', setupTime: '3-5 days' }
      ]
    },
    {
      category: 'Custom API & Webhooks',
      icon: <Plug className="w-8 h-8" />,
      color: 'from-pink-500 to-purple-500',
      description: 'Build custom integrations with your internal systems',
      options: [
        { name: 'REST API Access', description: 'Full programmatic access to ZALPHA data', setupTime: 'Custom' },
        { name: 'Webhook Events', description: 'Real-time notifications for any action', setupTime: 'Custom' },
        { name: 'Custom Data Exports', description: 'Scheduled exports to your format', setupTime: 'Custom' },
        { name: 'SSO Integration', description: 'Single Sign-On with your identity provider', setupTime: '3-5 days' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <BackButton
            onClick={() => onNavigate('employer-dashboard')}
            className="mb-8 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all font-semibold"
          />
          
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Plug className="w-11 h-11 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-5xl font-bold">Custom Integrations</h1>
                <span className="px-4 py-2 bg-yellow-400/30 backdrop-blur-sm border-2 border-yellow-300 rounded-xl text-yellow-100 font-bold text-sm">
                  ⭐ ULTRA PREMIUM EXCLUSIVE
                </span>
              </div>
              <p className="text-xl text-purple-100">Available only with Ultra Premium • $499/month</p>
            </div>
          </div>
          
          <p className="text-2xl text-white/90 max-w-4xl mb-8">
            Connect ZALPHA with your existing HR tech stack. Our team will configure and maintain integrations tailored to your workflow.
          </p>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/30">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-purple-200">Integration Options</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">1-5 days</div>
                <div className="text-purple-200">Average Setup Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">Dedicated</div>
                <div className="text-purple-200">Account Manager</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-purple-200">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* How It Works */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 mb-12 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">How Custom Integrations Work</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Choose Integration</h3>
              <p className="text-sm text-blue-100">Select the systems you want to connect</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Setup Call</h3>
              <p className="text-sm text-blue-100">Your account manager schedules configuration</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">We Configure</h3>
              <p className="text-sm text-blue-100">Our team handles all technical setup</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">Go Live</h3>
              <p className="text-sm text-blue-100">Test and activate your integration</p>
            </div>
          </div>
        </div>

        {/* Integration Categories */}
        <div className="space-y-8">
          {integrations.map((category, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-white`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{category.category}</h2>
                  <p className="text-slate-600">{category.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.options.map((option, optIdx) => (
                  <div key={optIdx} className="bg-slate-50 rounded-xl p-5 border-2 border-slate-200 hover:border-cyan-400 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-slate-900 text-lg">{option.name}</h3>
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{option.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Settings className="w-4 h-4" />
                      <span>Setup: {option.setupTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-8 text-center">Why Ultra Premium Customers Love Custom Integrations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Save 10+ Hours/Week</h3>
              <p className="text-purple-100">Eliminate manual data entry and duplicate work across systems</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reduce Errors</h3>
              <p className="text-purple-100">Automated data sync ensures accuracy and compliance</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Better Experience</h3>
              <p className="text-purple-100">Seamless workflows for your team and candidates</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-purple-200">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to Connect Your Tech Stack?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Upgrade to Ultra Premium and get custom integrations configured by our expert team
          </p>
          <div className="flex items-center justify-center gap-6">
            <button className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold text-xl hover:shadow-2xl transition-all flex items-center gap-3">
              Upgrade to Ultra Premium
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="px-10 py-5 border-2 border-purple-500 text-purple-600 rounded-2xl font-bold text-xl hover:bg-purple-50 transition-all">
              Schedule Demo
            </button>
          </div>
          <p className="text-slate-500 mt-6">
            <strong>$499/month</strong> • Includes dedicated account manager • All integrations included
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-12 bg-slate-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">How long does setup take?</h3>
              <p className="text-slate-600">Most integrations are configured within 1-5 business days. Complex enterprise systems may take up to 2 weeks.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Do I need technical knowledge?</h3>
              <p className="text-slate-600">No! Our team handles all technical configuration. You just need to provide access credentials and approve the connection.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">How many integrations can I have?</h3>
              <p className="text-slate-600">Unlimited! Ultra Premium includes as many integrations as you need at no additional cost.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">What if my system isn't listed?</h3>
              <p className="text-slate-600">We can build custom integrations using APIs or webhooks. Contact your account manager to discuss options.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Can I cancel integrations later?</h3>
              <p className="text-slate-600">Yes, you can disable or reconfigure integrations anytime through your account manager.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}