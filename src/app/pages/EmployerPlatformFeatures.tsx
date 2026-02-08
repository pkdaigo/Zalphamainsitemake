import { Briefcase, Zap, Crown, Video, Award, CheckCircle, TrendingUp, LinkIcon, ArrowRight, DollarSign, Users } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { EmployerHelpBot } from '@/app/components/EmployerHelpBot';
import { useState } from 'react';

interface EmployerPlatformFeaturesProps {
  onNavigate: (page: string) => void;
}

export function EmployerPlatformFeatures({ onNavigate }: EmployerPlatformFeaturesProps) {
  const [showHelpBot, setShowHelpBot] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">Employer Features</h1>
                <p className="text-xs text-purple-300 hidden sm:block">Powerful tools for hiring excellence</p>
              </div>
            </div>
            <BackButton onNavigate={onNavigate} label="Back to Demo" />
          </div>
        </div>
      </div>

      <div className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-2xl mb-4 sm:mb-6 border-2 sm:border-4 border-purple-300">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              <span className="text-base sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Employer Platform Features</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg px-4">
              Hire Smarter, Faster
            </h1>
            <p className="text-base sm:text-xl text-white/95 max-w-3xl mx-auto drop-shadow-md px-4">
              Everything you need to find and hire verified Pacific Island talent
            </p>
          </div>

          {/* ZALPHA ATS & Website Integration */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-500 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-white mb-6 border-2 sm:border-4 border-white/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-white/40">
                    <Zap className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">ZALPHA ATS & Website Integration</h2>
                </div>
                <p className="text-base sm:text-xl text-white/95 mb-6 sm:mb-8 drop-shadow">
                  Seamlessly connect your ZALPHA ATS and your own website API with ZALPHA for automatic data sync!
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <button
                    onClick={() => onNavigate('integration-settings')}
                    className="bg-white/95 backdrop-blur-sm text-indigo-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-indigo-200 text-left"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Zap className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Integration Settings</h3>
                    </div>
                    <p className="text-slate-700 mb-4">
                      Configure your ZALPHA ATS and website API credentials for seamless data synchronization
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700 mb-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Connect ZALPHA ATS
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Connect website API
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Test connections
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Secure API key storage
                      </li>
                    </ul>
                    <span className="text-purple-600 font-semibold flex items-center gap-2">
                      Configure Integrations <ArrowRight className="w-5 h-5" />
                    </span>
                  </button>

                  <button
                    onClick={() => onNavigate('sync-dashboard')}
                    className="bg-white/95 backdrop-blur-sm text-indigo-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all group border-4 border-pink-200 text-left"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Sync Dashboard</h3>
                    </div>
                    <p className="text-slate-700 mb-4">
                      Monitor real-time data synchronization and manage integration activities
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700 mb-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                        Real-time sync status
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                        Activity logs
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                        Manual sync triggers
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                        Performance metrics
                      </li>
                    </ul>
                    <span className="text-orange-600 font-semibold flex items-center gap-2">
                      View Sync Status <ArrowRight className="w-5 h-5" />
                    </span>
                  </button>
                </div>

                {/* Integration Features */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border-4 border-purple-300 hover:scale-105 transition-transform shadow-xl">
                    <Zap className="w-8 h-8 text-purple-600 mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1 text-lg">ZALPHA ATS Sync</h4>
                    <p className="text-sm text-gray-600">Auto-sync jobs, candidates, and applications</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border-4 border-pink-300 hover:scale-105 transition-transform shadow-xl">
                    <LinkIcon className="w-8 h-8 text-pink-600 mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1 text-lg">Website Integration</h4>
                    <p className="text-sm text-gray-600">Sync contacts, forms, and job postings</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border-4 border-indigo-300 hover:scale-105 transition-transform shadow-xl">
                    <CheckCircle className="w-8 h-8 text-indigo-600 mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1 text-lg">Real-Time Updates</h4>
                    <p className="text-sm text-gray-600">Webhooks for instant synchronization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Video Interviews & Skills Assessments Access */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-pink-600 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-white mb-6 border-2 sm:border-4 border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-white/40">
                    <Crown className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div>
                    <div className="inline-block bg-amber-400 text-amber-900 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold mb-2">
                      <Crown className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      ULTRA PREMIUM ONLY
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">AI Video Interviews & Skills Access</h2>
                  </div>
                </div>
                
                <p className="text-base sm:text-xl text-white/95 mb-6 sm:mb-8 drop-shadow">
                  Exclusive features for Ultra Premium employers ($499/mo) - automated video screening and full skills assessment access!
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 sm:border-4 border-violet-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <Video className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">AI Video Interviews</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Automated first-round screening
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        AI-powered analysis & scoring
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Save time on initial interviews
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Review at your convenience
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 sm:border-4 border-pink-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Skills Assessment Access</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        View all candidate assessment scores
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Filter by skill proficiency levels
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Reduce hiring risk with verified skills
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Find qualified candidates faster
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Employer Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Subscription Plans */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-indigo-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Tiered Subscription Plans</h3>
              <p className="text-white/80 mb-4">
                Choose from Basic ($99/mo), Premium ($199/mo), or Ultra Premium ($499/mo) with AI video interviews.
              </p>
              <button
                onClick={() => onNavigate('employer-pricing')}
                className="bg-white/95 text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                View Pricing
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Recruiter Dashboard */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Recruiter Dashboard</h3>
              <p className="text-white/80 mb-4">
                Manage job postings, review applications, track candidates, and communicate with verified talent.
              </p>
              <button
                onClick={() => onNavigate('employer-dashboard')}
                className="bg-white/95 text-purple-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                View Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Revenue & Analytics */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-pink-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Revenue Dashboard & Analytics</h3>
              <p className="text-white/80 mb-4">
                Track hiring metrics, cost-per-hire, candidate quality scores, and ROI analytics.
              </p>
              <button
                onClick={() => onNavigate('employer-revenue-dashboard')}
                className="bg-white/95 text-pink-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                View Analytics
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Contract Jobs & Pricing */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-cyan-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Contract Job Pricing</h3>
              <p className="text-white/80 mb-4">
                Flexible pricing options for contract positions with transparent subscription-based model.
              </p>
              <button
                onClick={() => onNavigate('contract-pricing')}
                className="bg-white/95 text-cyan-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                View Contract Pricing
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Virtual Job Fairs */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-green-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Virtual Job/College Fairs</h3>
              <p className="text-white/80 mb-4">
                Host and participate in virtual recruitment events connecting you with hundreds of qualified candidates.
              </p>
              <button
                onClick={() => onNavigate('virtual-job-fairs')}
                className="bg-white/95 text-green-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                Browse Job Fairs
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Video Interviews */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-violet-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Video Interview Platform</h3>
              <p className="text-white/80 mb-4">
                Conduct live video interviews or review pre-recorded candidate introductions - all on platform.
              </p>
              <button
                onClick={() => onNavigate('video-interviews')}
                className="bg-white/95 text-violet-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-12 border-2 border-indigo-400/50 mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Why Employers Choose ZALPHA</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">100% Verified Talent</h4>
                <p className="text-white/80 text-sm">All candidates are ID-verified and background-checked</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Skills-Verified</h4>
                <p className="text-white/80 text-sm">See gamified assessment scores before you hire</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Reduced Time-to-Hire</h4>
                <p className="text-white/80 text-sm">AI-powered matching and automated screening</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8 sm:mt-16">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl border-2 sm:border-4 border-white/50">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">Ready to Find Top Talent?</h3>
              <p className="text-base sm:text-xl text-white/90 mb-4 sm:mb-6 px-4">
                Join 100+ employers already hiring verified Pacific Island talent
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <button
                  onClick={() => onNavigate('employer-signup')}
                  className="bg-white text-purple-700 px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl"
                >
                  Get Started →
                </button>
                <button
                  onClick={() => onNavigate('employer-pricing')}
                  className="bg-purple-700/50 backdrop-blur-sm border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all"
                >
                  View Pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Bot - Floating Button */}
      <button
        onClick={() => setShowHelpBot(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center z-40"
      >
        <span className="text-3xl">💼</span>
      </button>

      {/* Help Bot Modal */}
      {showHelpBot && (
        <EmployerHelpBot onClose={() => setShowHelpBot(false)} />
      )}
    </div>
  );
}