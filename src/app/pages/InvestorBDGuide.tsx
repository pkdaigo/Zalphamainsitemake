import { useState } from 'react';
import { TrendingUp, Target, DollarSign, Users, Award, CheckCircle, Phone, Mail, BarChart3, Briefcase, Star, MapPin, ChevronDown, ChevronUp, ArrowRight, Zap, Shield, Globe, PieChart, Rocket, Building2, GraduationCap } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface InvestorBDGuideProps {
  onNavigate: (page: string) => void;
}

export function InvestorBDGuide({ onNavigate }: InvestorBDGuideProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-12 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Demo" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl mb-6 shadow-2xl">
            <TrendingUp className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Investor Business Development Guide
          </h1>
          <p className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Access Fresh Talent. Develop Future Leaders.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete pitch deck and fundraising strategy for acquiring Angel Investors, VCs, and Strategic Partners
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 mb-12 text-white">
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-4xl font-black mb-2">$2M</div>
              <div className="text-purple-100">Seed Round Target</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">1,300+</div>
              <div className="text-purple-100">Students (2026)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">500K+</div>
              <div className="text-purple-100">Addressable Market</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">944%</div>
              <div className="text-purple-100">Employer ROI</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">6</div>
              <div className="text-purple-100">Pacific Islands</div>
            </div>
          </div>
        </div>

        {/* Section 1: Investment Thesis */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-purple-200 overflow-hidden">
          <button
            onClick={() => toggleSection('overview')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">1. Investment Thesis & Opportunity</h2>
            </div>
            {expandedSection === 'overview' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'overview' && (
            <div className="p-8 space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 The Problem</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-bold text-gray-900 mb-2">❌ Youth Unemployment Crisis</p>
                    <p className="text-gray-700">18-24 year olds in Pacific islands face 35% unemployment rate - 3x the national average</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-bold text-gray-900 mb-2">❌ Employer Hiring Challenges</p>
                    <p className="text-gray-700">Businesses struggle to find quality local talent, spending $5,000-10,000 per hire on traditional recruiting</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-bold text-gray-900 mb-2">❌ Geographic Isolation</p>
                    <p className="text-gray-700">Pacific islands lack access to modern job platforms - Indeed, LinkedIn have minimal presence in Micronesia</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-bold text-gray-900 mb-2">❌ Brain Drain</p>
                    <p className="text-gray-700">70% of college graduates leave islands due to lack of opportunity, weakening local economies</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✅ The ZALPHA Solution</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                    <p className="font-bold text-gray-900 mb-1">For Students</p>
                    <p className="text-sm text-gray-700">Free platform connecting verified students with employers. Gamified skills assessments, AI matching, and career coaching.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                    <p className="font-bold text-gray-900 mb-1">For Employers</p>
                    <p className="text-sm text-gray-700">SaaS platform ($99-499/month) with pre-verified talent pool, AI matching, video interviews, and 12-day average time-to-hire.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                    <p className="font-bold text-gray-900 mb-1">For Schools</p>
                    <p className="text-sm text-gray-700">Partnership program with 5% revenue share on student subscriptions. Track placement rates and career outcomes.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                    <p className="font-bold text-gray-900 mb-1">Regional Expertise</p>
                    <p className="text-sm text-gray-700">Only platform built specifically for Pacific island markets with localized compliance, cultural training, and multi-island reach.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 border-2 border-blue-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Market Opportunity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200">
                    <div>
                      <p className="font-bold text-gray-900">Total Addressable Market (TAM)</p>
                      <p className="text-sm text-gray-600">All 18-35 year olds in Pacific islands</p>
                    </div>
                    <p className="text-2xl font-black text-blue-600">500,000+</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200">
                    <div>
                      <p className="font-bold text-gray-900">Serviceable Addressable Market (SAM)</p>
                      <p className="text-sm text-gray-600">High school grads + current students</p>
                    </div>
                    <p className="text-2xl font-black text-blue-600">200,000+</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200">
                    <div>
                      <p className="font-bold text-gray-900">Serviceable Obtainable Market (SOM)</p>
                      <p className="text-sm text-gray-600">Target first 3 years</p>
                    </div>
                    <p className="text-2xl font-black text-blue-600">25,000</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white">
                    <p className="font-bold mb-2">💰 Revenue Opportunity (Year 3)</p>
                    <p className="text-3xl font-black">$8.5M ARR</p>
                    <p className="text-sm text-green-100 mt-2">Based on 1,000 employer subscriptions + premium student tier + partnerships</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Traction & Metrics */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-purple-200 overflow-hidden">
          <button
            onClick={() => toggleSection('traction')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">2. Current Traction & Metrics</h2>
            </div>
            {expandedSection === 'traction' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'traction' && (
            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
                  <Users className="w-12 h-12 mb-4" />
                  <div className="text-4xl font-black mb-2">2,000+</div>
                  <div className="text-blue-100 font-semibold">Active Students</div>
                  <div className="mt-3 text-sm text-blue-100">Growing 15% month-over-month</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
                  <Building2 className="w-12 h-12 mb-4" />
                  <div className="text-4xl font-black mb-2">85</div>
                  <div className="text-purple-100 font-semibold">Employer Partners</div>
                  <div className="mt-3 text-sm text-purple-100">$18K+ MRR</div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
                  <GraduationCap className="w-12 h-12 mb-4" />
                  <div className="text-4xl font-black mb-2">12</div>
                  <div className="text-green-100 font-semibold">School Partnerships</div>
                  <div className="mt-3 text-sm text-green-100">UOG, NMC, GCC, UH</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 border-2 border-yellow-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Key Growth Metrics</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm text-gray-600 mb-1">Monthly Recurring Revenue</p>
                    <p className="text-3xl font-black text-gray-900">$18,000</p>
                    <p className="text-sm text-green-600 font-semibold mt-1">↑ 23% month-over-month</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm text-gray-600 mb-1">Average Contract Value</p>
                    <p className="text-3xl font-black text-gray-900">$212</p>
                    <p className="text-sm text-gray-600 mt-1">Employer monthly subscription</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm text-gray-600 mb-1">Customer Acquisition Cost</p>
                    <p className="text-3xl font-black text-gray-900">$75</p>
                    <p className="text-sm text-gray-600 mt-1">Per employer (BD + marketing)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm text-gray-600 mb-1">Lifetime Value</p>
                    <p className="text-3xl font-black text-gray-900">$3,816</p>
                    <p className="text-sm text-gray-600 mt-1">18-month avg retention</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm text-gray-600 mb-1">Churn Rate</p>
                    <p className="text-3xl font-black text-gray-900">5.2%</p>
                    <p className="text-sm text-green-600 font-semibold mt-1">Below industry avg (8-12%)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm text-gray-600 mb-1">Net Promoter Score</p>
                    <p className="text-3xl font-black text-gray-900">72</p>
                    <p className="text-sm text-green-600 font-semibold mt-1">Excellent (50+ is good)</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏆 Notable Customers & Case Studies</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-gray-900">Pacific Islands Club (PIC)</p>
                      <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">Ultra Premium</span>
                    </div>
                    <p className="text-sm text-gray-700">Hired 12 front desk associates in 3 weeks. Previously spent $15,000 on recruiting agencies.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-gray-900">Bank of Guam</p>
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">Professional</span>
                    </div>
                    <p className="text-sm text-gray-700">Filled 6 bank teller positions with verified UOG graduates. 100% retention after 6 months.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-gray-900">Hyatt Regency Guam</p>
                      <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">Ultra Premium</span>
                    </div>
                    <p className="text-sm text-gray-700">8 restaurant servers hired. Reduced time-to-hire from 45 days to 12 days.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Business Model */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-purple-200 overflow-hidden">
          <button
            onClick={() => toggleSection('business')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">3. Business Model & Revenue Streams</h2>
            </div>
            {expandedSection === 'business' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'business' && (
            <div className="p-8 space-y-6">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 border-2 border-blue-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Revenue Stream #1: Employer SaaS Subscriptions (85% of revenue)</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="font-bold text-gray-900 mb-2">Starter - $99/month</p>
                    <p className="text-sm text-gray-700 mb-3">3 job postings, basic search, email support</p>
                    <p className="text-xs text-gray-600">Target: Small businesses (300 customers)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="font-bold text-gray-900 mb-2">Professional - $249/month</p>
                    <p className="text-sm text-gray-700 mb-3">10 postings, AI matching, video interviews</p>
                    <p className="text-xs text-gray-600">Target: Mid-size (500 customers)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="font-bold text-gray-900 mb-2">Ultra Premium - $499/month</p>
                    <p className="text-sm text-gray-700 mb-3">Unlimited postings, white-glove service</p>
                    <p className="text-xs text-gray-600">Target: Enterprise (200 customers)</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                  <p className="font-bold text-gray-900 mb-2">Year 3 Projection:</p>
                  <p className="text-2xl font-black text-blue-600">$7.2M ARR from employer subscriptions</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💎 Revenue Stream #2: Premium Student Subscriptions (10% of revenue)</h3>
                <div className="bg-white rounded-lg p-4 border border-purple-200 mb-4">
                  <p className="font-bold text-gray-900 mb-2">Premium Student - $9.99/month</p>
                  <p className="text-sm text-gray-700 mb-2">Priority job matching, resume builder, unlimited applications, interview coaching</p>
                  <p className="text-xs text-gray-600">Target: 10% of active students (2,500 paying students by Year 3)</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-purple-200">
                  <p className="font-bold text-gray-900 mb-2">Year 3 Projection:</p>
                  <p className="text-2xl font-black text-purple-600">$300K ARR from student subscriptions</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🤝 Revenue Stream #3: School Partnerships (5% of revenue)</h3>
                <div className="bg-white rounded-lg p-4 border border-green-200 mb-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Schools earn 5% revenue share on premium student subscriptions + placement fees when their graduates get hired.
                  </p>
                  <p className="text-xs text-gray-600">Target: 50 partner schools by Year 3</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <p className="font-bold text-gray-900 mb-2">Year 3 Projection:</p>
                  <p className="text-2xl font-black text-green-600">$400K ARR from partnerships</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-6 border-2 border-orange-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Future Revenue Streams (Post-Series A)</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="font-bold text-gray-900 text-sm">📚 Skills Training Marketplace</p>
                    <p className="text-xs text-gray-600">Students purchase courses, we take 30% commission</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="font-bold text-gray-900 text-sm">🎯 Targeted Job Ads</p>
                    <p className="text-xs text-gray-600">Sponsored job listings and featured employer placement</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="font-bold text-gray-900 text-sm">🔌 API & Integration Services</p>
                    <p className="text-xs text-gray-600">Enterprise clients pay for custom ATS integrations</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Use of Funds */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-purple-200 overflow-hidden">
          <button
            onClick={() => toggleSection('funds')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <PieChart className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">4. Use of Funds ($2M Seed Round)</h2>
            </div>
            {expandedSection === 'funds' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'funds' && (
            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
                  <Users className="w-12 h-12 mb-4" />
                  <div className="text-4xl font-black mb-2">40%</div>
                  <div className="text-blue-100 font-semibold mb-3">Team & Talent</div>
                  <ul className="text-sm space-y-2 text-blue-100">
                    <li>• 3 Full-stack Engineers</li>
                    <li>• 1 Product Designer</li>
                    <li>• 2 BD/Sales Reps</li>
                    <li>• 1 Marketing Manager</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-blue-400">
                    <p className="text-2xl font-black">$800K</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
                  <Rocket className="w-12 h-12 mb-4" />
                  <div className="text-4xl font-black mb-2">30%</div>
                  <div className="text-purple-100 font-semibold mb-3">Marketing & Growth</div>
                  <ul className="text-sm space-y-2 text-purple-100">
                    <li>• Digital advertising campaigns</li>
                    <li>• School partnership outreach</li>
                    <li>• Content marketing</li>
                    <li>• Events & job fairs</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-purple-400">
                    <p className="text-2xl font-black">$600K</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
                  <Zap className="w-12 h-12 mb-4" />
                  <div className="text-4xl font-black mb-2">20%</div>
                  <div className="text-green-100 font-semibold mb-3">Product Development</div>
                  <ul className="text-sm space-y-2 text-green-100">
                    <li>• AI matching improvements</li>
                    <li>• Mobile app development</li>
                    <li>• Video interview platform</li>
                    <li>• Analytics dashboard</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-green-400">
                    <p className="text-2xl font-black">$400K</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
                  <Shield className="w-12 h-12 mb-4" />
                  <div className="text-4xl font-black mb-2">10%</div>
                  <div className="text-orange-100 font-semibold mb-3">Operations & Legal</div>
                  <ul className="text-sm space-y-2 text-orange-100">
                    <li>• Legal & compliance</li>
                    <li>• Cloud infrastructure (AWS)</li>
                    <li>• Insurance & admin</li>
                    <li>• Office space</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-orange-400">
                    <p className="text-2xl font-black">$200K</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 border-2 border-yellow-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 18-Month Milestones</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="font-bold text-gray-900 mb-2">6 Months</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 5,000 active students</li>
                      <li>• 200 paying employers</li>
                      <li>• $50K MRR</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="font-bold text-gray-900 mb-2">12 Months</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 12,000 active students</li>
                      <li>• 500 paying employers</li>
                      <li>• $120K MRR</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="font-bold text-gray-900 mb-2">18 Months</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 25,000 active students</li>
                      <li>• 1,000 paying employers</li>
                      <li>• $250K MRR</li>
                      <li>• <strong>Series A ready</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 5: Investment Terms */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-purple-200 overflow-hidden">
          <button
            onClick={() => toggleSection('terms')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <Briefcase className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">5. Investment Terms & Structure</h2>
            </div>
            {expandedSection === 'terms' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'terms' && (
            <div className="p-8 space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Seed Round Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Round Size</p>
                    <p className="text-3xl font-black text-gray-900">$2M</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Pre-Money Valuation</p>
                    <p className="text-3xl font-black text-gray-900">$8M</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Equity Offered</p>
                    <p className="text-3xl font-black text-gray-900">20%</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Minimum Check Size</p>
                    <p className="text-3xl font-black text-gray-900">$50K</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 border-2 border-blue-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Investment Tiers</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200">
                    <div>
                      <p className="font-bold text-gray-900">Angel Tier</p>
                      <p className="text-sm text-gray-600">$50K - $100K</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Equity + Advisory Role</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200">
                    <div>
                      <p className="font-bold text-gray-900">Institutional Tier</p>
                      <p className="text-sm text-gray-600">$250K - $500K</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Equity + Board Observer Seat</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200">
                    <div>
                      <p className="font-bold text-gray-900">Lead Investor Tier</p>
                      <p className="text-sm text-gray-600">$500K - $1M</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Equity + Board Seat + Pro Rata Rights</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Exit Strategy & Returns</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="font-bold text-gray-900 mb-2">Scenario 1: Strategic Acquisition (Year 4-5)</p>
                    <p className="text-sm text-gray-700 mb-2">Acquired by larger HR tech company (Indeed, ZipRecruiter, Handshake)</p>
                    <p className="text-2xl font-black text-green-600">$40M-60M valuation → 5-7.5x return</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="font-bold text-gray-900 mb-2">Scenario 2: Series B Growth (Year 3-4)</p>
                    <p className="text-sm text-gray-700 mb-2">Raise Series B at $30M-50M valuation, expand to other island markets</p>
                    <p className="text-2xl font-black text-green-600">Partial liquidity available</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="font-bold text-gray-900 mb-2">Scenario 3: IPO (Year 6-8)</p>
                    <p className="text-sm text-gray-700 mb-2">Public offering as profitable regional platform</p>
                    <p className="text-2xl font-black text-green-600">$100M+ valuation → 10x+ return</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 6: Investor Pitch Script */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-purple-200 overflow-hidden">
          <button
            onClick={() => toggleSection('pitch')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">6. Investor Pitch Script</h2>
            </div>
            {expandedSection === 'pitch' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'pitch' && (
            <div className="p-8 space-y-6">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 border-2 border-blue-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎤 30-Second Elevator Pitch</h3>
                <div className="bg-white rounded-lg p-6 border border-blue-200">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    <strong className="text-blue-600">"ZALPHA is the LinkedIn for Pacific island Gen Z talent. We solve the 35% youth unemployment crisis by connecting 500,000+ students and recent grads with employers across Guam, Hawaii, CNMI, and Micronesia."</strong>
                  </p>
                  <p className="text-lg text-gray-800 leading-relaxed mt-4">
                    <strong className="text-blue-600">"We have 2,000 active users, $18K MRR growing 23% monthly, and we're raising $2M to scale from 85 to 1,000 employer clients. We project $8.5M ARR by Year 3."</strong>
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📧 Email Introduction to Investors</h3>
                <div className="bg-white rounded-lg p-6 border border-purple-200 font-mono text-sm">
                  <p className="mb-3"><strong>Subject:</strong> Seeking $2M Seed for Pacific Island HR-Tech Platform</p>
                  <p className="mb-3">Hi [Investor Name],</p>
                  <p className="mb-3">
                    I'm [Your Name], founder of ZALPHA - the first job platform built specifically for Gen Z talent in the Western Pacific islands (Guam, Hawaii, CNMI, FSM, Palau, Marshall Islands).
                  </p>
                  <p className="mb-3">
                    <strong>The Problem:</strong> 500K+ young adults in Pacific islands face 35% unemployment while employers spend $5-10K per hire on traditional recruiting.
                  </p>
                  <p className="mb-3">
                    <strong>Our Solution:</strong> Pre-verified talent platform with AI matching, skills assessments, and regional compliance tools. SaaS model ($99-499/month for employers).
                  </p>
                  <p className="mb-3">
                    <strong>Traction:</strong><br />
                    • 2,000 active students<br />
                    • 85 paying employers ($18K MRR, 23% monthly growth)<br />
                    • 12 school partnerships (UOG, NMC, UH, GCC)<br />
                    • 5.2% churn rate, 72 NPS score
                  </p>
                  <p className="mb-3">
                    <strong>Ask:</strong> Raising $2M seed round at $8M pre-money (20% equity) to scale to 1,000 employers and $8.5M ARR by Year 3.
                  </p>
                  <p className="mb-3">
                    Would love to share our pitch deck and financials. Available for a 15-minute call [Date/Time] or [Date/Time]?
                  </p>
                  <p>
                    Best regards,<br />
                    [Your Name]<br />
                    Founder & CEO, ZALPHA<br />
                    📞 [Phone] | 📧 founder@zalpharecruit.com
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 border-2 border-yellow-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Key Talking Points</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="font-bold text-gray-900 mb-2">1. Massive Untapped Market</p>
                    <p className="text-sm text-gray-700">"LinkedIn and Indeed have zero presence in Micronesia. We're the only platform serving 500K+ Gen Z workers across 6 Pacific islands."</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="font-bold text-gray-900 mb-2">2. Proven Product-Market Fit</p>
                    <p className="text-sm text-gray-700">"72 NPS score, 5.2% churn rate, and 23% monthly revenue growth prove employers love our product."</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="font-bold text-gray-900 mb-2">3. Strong Unit Economics</p>
                    <p className="text-sm text-gray-700">"$75 CAC, $212 ACV, $3,816 LTV. That's a 51x LTV:CAC ratio - exceptional for SaaS."</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="font-bold text-gray-900 mb-2">4. Network Effects & Moat</p>
                    <p className="text-sm text-gray-700">"More students attract more employers. More employers attract more students. Plus, we have exclusive school partnerships creating barriers to entry."</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="font-bold text-gray-900 mb-2">5. Clear Path to Profitability</p>
                    <p className="text-sm text-gray-700">"We'll be EBITDA positive by Month 24 at current growth rates. This $2M seed round gets us to Series A with 18+ months runway."</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-black mb-4">Join Us in Building the Future of Pacific Island Workforce</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            We're solving a real problem for 500,000+ young adults while building a profitable SaaS business with massive growth potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => alert('Investor deck download')}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-colors font-bold text-lg flex items-center justify-center gap-2"
            >
              Download Full Pitch Deck
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="px-8 py-4 bg-purple-700 hover:bg-purple-800 text-white rounded-xl transition-colors font-bold text-lg"
            >
              Back to Home
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-purple-200">
              For investor inquiries, contact:
            </p>
            <p className="font-bold text-xl">
              📧 contact@zalpharecruit.com | 📞 WhatsApp/Phone: 1-670-286-3010
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}