import { Lock, Eye, EyeOff, FileText, TrendingUp, Briefcase, Download, Megaphone, ChevronRight } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { useState } from 'react';

interface InternalStaffPortalProps {
  onNavigate: (page: string) => void;
}

export function InternalStaffPortal({ onNavigate }: InternalStaffPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // For demo purposes - in production, this would be properly secured on backend
  const DEMO_PASSWORD = 'ZALPHA2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const documents = {
    legal: [
      { name: 'Terms of Service', file: 'TOS_2026.pdf', size: '2.4 MB' },
      { name: 'Privacy Policy', file: 'Privacy_Policy.pdf', size: '1.8 MB' },
      { name: 'User Agreement', file: 'User_Agreement.pdf', size: '1.2 MB' },
      { name: 'FERPA Compliance Documentation', file: 'FERPA_Docs.pdf', size: '3.1 MB' },
      { name: 'Employer Service Agreement', file: 'Employer_Agreement.pdf', size: '2.7 MB' },
      { name: 'Data Protection & Security Policies', file: 'Data_Security.pdf', size: '2.2 MB' },
    ],
    businessDevelopment: [
      { name: 'ZALPHA Investor Pitch Deck', file: 'Investor_Deck_Q1_2026.pdf', size: '15.3 MB' },
      { name: 'Partnership Proposal Template', file: 'Partnership_Template.pdf', size: '4.5 MB' },
      { name: 'University Partnership Deck', file: 'University_Deck.pdf', size: '12.8 MB' },
      { name: 'Employer Sales Deck', file: 'Employer_Sales.pdf', size: '8.9 MB' },
      { name: 'Market Analysis - Pacific Islands', file: 'Market_Analysis.pdf', size: '6.4 MB' },
      { name: 'Revenue Model Overview', file: 'Revenue_Model.pdf', size: '3.2 MB' },
    ],
    operational: [
      { name: 'Platform User Manual', file: 'User_Manual.pdf', size: '5.7 MB' },
      { name: 'Admin Dashboard Guide', file: 'Admin_Guide.pdf', size: '4.3 MB' },
      { name: 'Customer Support Protocols', file: 'Support_Protocols.pdf', size: '2.8 MB' },
      { name: 'Onboarding Process Documentation', file: 'Onboarding_Docs.pdf', size: '3.5 MB' },
      { name: 'Quality Assurance Guidelines', file: 'QA_Guidelines.pdf', size: '2.1 MB' },
    ],
    marketing: [
      { name: 'Brand Guidelines 2026', file: 'Brand_Guidelines.pdf', size: '18.2 MB' },
      { name: 'Marketing Strategy Q1-Q2 2026', file: 'Marketing_Strategy.pdf', size: '7.6 MB' },
      { name: 'Social Media Content Calendar', file: 'Content_Calendar.pdf', size: '3.9 MB' },
      { name: 'Student Recruitment Materials', file: 'Student_Materials.pdf', size: '11.4 MB' },
      { name: 'Employer Outreach Templates', file: 'Employer_Templates.pdf', size: '4.8 MB' },
    ],
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
        {/* Navigation */}
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Internal Staff Portal</h1>
                  <p className="text-xs text-red-300">Restricted Access - Authentication Required</p>
                </div>
              </div>
              <BackButton onNavigate={onNavigate} />
            </div>
          </div>
        </div>

        <div className="py-16 px-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-red-400/30 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Staff Authentication</h2>
                <p className="text-white/70">Enter your password to access internal documents</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-red-400 transition-all"
                      placeholder="Enter staff password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border-2 border-red-400 rounded-xl p-4">
                    <p className="text-red-300 text-sm font-semibold">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-2xl"
                >
                  Access Portal
                </button>

                <div className="text-center">
                  <p className="text-white/50 text-sm">
                    For demo purposes, password is: <span className="text-white/70 font-mono">ZALPHA2026</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Internal Staff Portal</h1>
                <p className="text-xs text-green-300">✓ Authenticated - Access Granted</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-6 py-2 bg-red-500/20 border-2 border-red-400 text-red-300 rounded-xl font-semibold hover:bg-red-500/30 transition-all"
              >
                Sign Out
              </button>
              <BackButton onNavigate={onNavigate} />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">Document Repository</h2>
            <p className="text-xl text-white/70">
              Select a section to access documents
            </p>
          </div>

          {/* Section Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Legal Section */}
            <button
              onClick={() => onNavigate('internal-legal')}
              className="group bg-white/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-blue-400/30 hover:border-blue-400/60 hover:bg-white/15 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">Legal</h3>
                    <p className="text-blue-300 text-sm">{documents.legal.length} documents</p>
                  </div>
                </div>
                <ChevronRight className="w-8 h-8 text-white/50 group-hover:text-blue-400 group-hover:translate-x-2 transition-all" />
              </div>
              <p className="text-white/70 text-lg">
                Terms of Service, Privacy Policies, FERPA Compliance, and all legal documentation
              </p>
            </button>

            {/* Business Development Section */}
            <button
              onClick={() => onNavigate('internal-bd')}
              className="group bg-white/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-purple-400/30 hover:border-purple-400/60 hover:bg-white/15 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">Business Development</h3>
                    <p className="text-purple-300 text-sm">{documents.businessDevelopment.length} documents</p>
                  </div>
                </div>
                <ChevronRight className="w-8 h-8 text-white/50 group-hover:text-purple-400 group-hover:translate-x-2 transition-all" />
              </div>
              <p className="text-white/70 text-lg">
                Investor decks, partnership proposals, sales materials, and market analysis
              </p>
            </button>

            {/* Operational Section */}
            <button
              onClick={() => onNavigate('internal-operational')}
              className="group bg-white/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-green-400/30 hover:border-green-400/60 hover:bg-white/15 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">Operational</h3>
                    <p className="text-green-300 text-sm">{documents.operational.length} documents</p>
                  </div>
                </div>
                <ChevronRight className="w-8 h-8 text-white/50 group-hover:text-green-400 group-hover:translate-x-2 transition-all" />
              </div>
              <p className="text-white/70 text-lg">
                User manuals, admin guides, support protocols, and operational procedures
              </p>
            </button>

            {/* Marketing Section */}
            <button
              onClick={() => onNavigate('internal-marketing')}
              className="group bg-white/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-orange-400/30 hover:border-orange-400/60 hover:bg-white/15 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                    <Megaphone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">Marketing</h3>
                    <p className="text-orange-300 text-sm">{documents.marketing.length} documents</p>
                  </div>
                </div>
                <ChevronRight className="w-8 h-8 text-white/50 group-hover:text-orange-400 group-hover:translate-x-2 transition-all" />
              </div>
              <p className="text-white/70 text-lg">
                Brand guidelines, marketing strategies, content calendars, and recruitment materials
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}