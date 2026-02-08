import { useState } from 'react';
import { Building2, Target, DollarSign, Users, TrendingUp, CheckCircle, Phone, Mail, Award, Briefcase, Star, MapPin, ChevronDown, ChevronUp, ArrowRight, Zap, Shield, Clock, BarChart3, FileText, MessageSquare, Calendar, Gift } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface EmployerBDGuideProps {
  onNavigate: (page: string) => void;
}

export function EmployerBDGuide({ onNavigate }: EmployerBDGuideProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 py-12 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Demo" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl mb-6 shadow-2xl">
            <Building2 className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Employer Business Development Guide
          </h1>
          <p className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Access Fresh Talent. Develop Future Leaders.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete training system for acquiring employer clients across the Western Pacific and Micronesian markets
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-8 mb-12 text-white">
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-4xl font-black mb-2">$99-499</div>
              <div className="text-blue-100">Monthly Plans</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">1,300+</div>
              <div className="text-blue-100">Students (2026)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">1000+</div>
              <div className="text-blue-100">Target Employers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">15-25%</div>
              <div className="text-blue-100">Your Commission</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">6</div>
              <div className="text-blue-100">Pacific Islands</div>
            </div>
          </div>
        </div>

        {/* Section 1: Overview & Value Proposition */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-blue-200 overflow-hidden">
          <button
            onClick={() => toggleSection('overview')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">1. Overview & Value Proposition</h2>
            </div>
            {expandedSection === 'overview' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'overview' && (
            <div className="p-8 space-y-6 text-sm">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 border-2 border-blue-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 What is ZALPHA?</h3>
                <p className="text-gray-700 mb-4">
                  ZALPHA is the #1 job connection platform specifically designed for Gen Z and Alpha talent in the Western Pacific region (CNMI, Guam, Hawaii, Palau, Marshall Islands, FSM).
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                    <p className="font-bold text-gray-900 mb-1">Pre-Verified Students</p>
                    <p className="text-sm text-gray-600">All candidates verified through .edu emails and skill assessments</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                    <p className="font-bold text-gray-900 mb-1">Skills-First Matching</p>
                    <p className="text-sm text-gray-600">AI-powered matching based on real skills, not just resumes</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                    <p className="font-bold text-gray-900 mb-1">Regional Focus</p>
                    <p className="text-sm text-gray-600">Deep understanding of Pacific island hiring needs</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                    <p className="font-bold text-gray-900 mb-1">Cost-Effective</p>
                    <p className="text-sm text-gray-600">Plans starting at $99/month vs. $5,000+ traditional recruiting</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Your Earning Potential</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-yellow-200">
                    <span className="font-semibold text-gray-900">Sign up 5 employers/month at Starter ($99)</span>
                    <span className="text-2xl font-black text-green-600">$75/month</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-yellow-200">
                    <span className="font-semibold text-gray-900">Sign up 10 employers/month at Professional ($249)</span>
                    <span className="text-2xl font-black text-green-600">$498/month</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-yellow-200">
                    <span className="font-semibold text-gray-900">Sign up 5 employers/month at Ultra Premium ($499)</span>
                    <span className="text-2xl font-black text-green-600">$624/month</span>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white text-center">
                    <p className="text-sm mb-1">Average BD Rep Earnings</p>
                    <p className="text-3xl font-black">$1,500-3,000/month</p>
                    <p className="text-sm text-green-100">Plus renewal commissions!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Pricing Tiers */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-blue-200 overflow-hidden">
          <button
            onClick={() => toggleSection('pricing')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">2. Pricing Tiers & Features</h2>
            </div>
            {expandedSection === 'pricing' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'pricing' && (
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Starter Plan */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-300">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                    <div className="text-5xl font-black text-gray-900 mb-1">$99</div>
                    <div className="text-gray-600">per month</div>
                    <div className="mt-4 px-4 py-2 bg-gray-200 rounded-full text-sm font-bold text-gray-700">
                      Your Commission: $15/month (15%)
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">3 active job postings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Basic candidate search</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">50 monthly applications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Company profile page</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Email support</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-white rounded-lg border border-gray-300">
                    <p className="text-xs font-bold text-gray-900 mb-2">BEST FOR:</p>
                    <p className="text-sm text-gray-600">Small businesses, restaurants, retail stores</p>
                  </div>
                </div>

                {/* Professional Plan */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-4 border-blue-500 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold text-sm shadow-lg">
                    MOST POPULAR
                  </div>
                  <div className="text-center mb-6 mt-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                    <div className="text-5xl font-black text-blue-600 mb-1">$249</div>
                    <div className="text-gray-600">per month</div>
                    <div className="mt-4 px-4 py-2 bg-blue-200 rounded-full text-sm font-bold text-blue-900">
                      Your Commission: $50/month (20%)
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>10 active job postings</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Advanced AI matching</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Unlimited applications</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Video interview tools</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Skills assessments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Priority support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Analytics dashboard</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-white rounded-lg border border-blue-300">
                    <p className="text-xs font-bold text-gray-900 mb-2">BEST FOR:</p>
                    <p className="text-sm text-gray-600">Hotels, hospitals, banks, mid-size companies</p>
                  </div>
                </div>

                {/* Ultra Premium Plan */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-400">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Ultra Premium</h3>
                    <div className="text-5xl font-black text-purple-600 mb-1">$499</div>
                    <div className="text-gray-600">per month</div>
                    <div className="mt-4 px-4 py-2 bg-purple-200 rounded-full text-sm font-bold text-purple-900">
                      Your Commission: $125/month (25%)
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Unlimited job postings</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Dedicated account manager</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">White-glove recruiting</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Custom branding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Virtual job fair access</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">API integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">24/7 priority support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Featured company listing</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-white rounded-lg border border-purple-300">
                    <p className="text-xs font-bold text-gray-900 mb-2">BEST FOR:</p>
                    <p className="text-sm text-gray-600">Major hotels, government, enterprise companies</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Target Employer List */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-blue-200 overflow-hidden">
          <button
            onClick={() => toggleSection('targets')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">3. Target Employer Database</h2>
            </div>
            {expandedSection === 'targets' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'targets' && (
            <div className="p-8 space-y-6">
              {/* Guam Employers */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🏝️ GUAM - Priority Targets (200+ employers)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="font-bold text-green-900 mb-3">🏨 Hotels & Resorts</p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Hyatt Regency Guam</li>
                      <li>• Dusit Thani Guam Resort</li>
                      <li>• Hilton Guam Resort & Spa</li>
                      <li>• PIC (Pacific Islands Club)</li>
                      <li>• Outrigger Guam Beach Resort</li>
                      <li>• LeoPalace Resort Guam</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="font-bold text-green-900 mb-3">🏦 Banks & Finance</p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Bank of Guam</li>
                      <li>• First Hawaiian Bank</li>
                      <li>• Bank of Hawaii</li>
                      <li>• Community First Federal Credit Union</li>
                      <li>• Coast360 Federal Credit Union</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="font-bold text-green-900 mb-3">🏥 Healthcare</p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Guam Memorial Hospital</li>
                      <li>• Guam Regional Medical City</li>
                      <li>• FHP Health Center</li>
                      <li>• SentryHealth</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="font-bold text-green-900 mb-3">🛒 Retail & Services</p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• IT&E (GTA TeleGuam)</li>
                      <li>• Docomo Pacific</li>
                      <li>• Ross Dress for Less</li>
                      <li>• Cost-U-Less</li>
                      <li>• Pay-Less Markets</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Hawaii Employers */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🌺 HAWAII - Priority Targets (500+ employers)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="font-bold text-yellow-900 mb-3">🏨 Hospitality</p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Hilton Hawaiian Village</li>
                      <li>• Hyatt Regency Waikiki</li>
                      <li>• Marriott Waikiki Beach</li>
                      <li>• Four Seasons Resort Oahu</li>
                      <li>• Outrigger Waikiki</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <p className="font-bold text-yellow-900 mb-3">🍽️ Restaurants & Food Service</p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Zippy's Restaurants</li>
                      <li>• L&L Hawaiian BBQ</li>
                      <li>• Foodland Super Market</li>
                      <li>• Times Supermarket</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CNMI Employers */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🏖️ CNMI (Saipan) - Priority Targets (100+ employers)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="font-bold text-blue-900 mb-3">🏨 Hotels & Tourism</p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Kensington Hotel Saipan</li>
                      <li>• Hyatt Regency Saipan</li>
                      <li>• Pacific Islands Club Saipan</li>
                      <li>• Fiesta Resort & Spa Saipan</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="font-bold text-blue-900 mb-3">🏢 Retail & Services</p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• IT&E (GTA NMI)</li>
                      <li>• Joeten Shopping Center</li>
                      <li>• Marianas Business Plaza</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Other Islands */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🌊 FSM, PALAU, MARSHALL ISLANDS - Priority Targets (200+ employers)
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-bold text-purple-900 mb-3">🇫🇲 FSM</p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• FSM Telecom</li>
                      <li>• Bank of FSM</li>
                      <li>• Truk Stop Hotel</li>
                      <li>• Caroline Fisheries</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-bold text-purple-900 mb-3">🇵🇼 Palau</p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Palau Pacific Resort</li>
                      <li>• Palau Royal Resort</li>
                      <li>• Bank of Hawaii - Palau</li>
                      <li>• PNCC (Utilities)</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-bold text-purple-900 mb-3">🇲🇭 Marshall Islands</p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Marshall Islands Resort</li>
                      <li>• Bank of Marshall Islands</li>
                      <li>• Marshall Islands Shipping</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-6 border-2 border-gray-300">
                <p className="text-sm text-gray-700">
                  <strong>📋 Complete Database:</strong> Access the full target employer database with 1000+ contacts, phone numbers, decision-maker names, and best contact times in your BD rep portal.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Sales Scripts */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-blue-200 overflow-hidden">
          <button
            onClick={() => toggleSection('scripts')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">4. Sales Scripts & Pitch</h2>
            </div>
            {expandedSection === 'scripts' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'scripts' && (
            <div className="p-8 space-y-6">
              {/* Cold Call Script */}
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 border-2 border-blue-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📞 Cold Call Script (30 seconds)</h3>
                <div className="bg-white rounded-lg p-6 border border-blue-200">
                  <p className="text-gray-800 leading-relaxed mb-4">
                    <strong className="text-blue-600">"Hi [Name], this is [Your Name] with ZALPHA - we're the #1 platform connecting Gen Z talent across Guam and the Pacific islands."</strong>
                  </p>
                  <p className="text-gray-800 leading-relaxed mb-4">
                    <strong className="text-blue-600">"I noticed [Company Name] is hiring for [position] - we have 2,000+ pre-verified students and recent grads ready to work. We've helped Pacific Islands Club fill 12 positions just this month."</strong>
                  </p>
                  <p className="text-gray-800 leading-relaxed">
                    <strong className="text-blue-600">"Would you have 5 minutes this week for me to show you how we can cut your recruiting time by 70%? It's just $99 to get started."</strong>
                  </p>
                </div>
              </div>

              {/* Email Template */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📧 Email Introduction Template</h3>
                <div className="bg-white rounded-lg p-6 border border-green-200 font-mono text-sm">
                  <p className="mb-3"><strong>Subject:</strong> Fill [Position Name] roles faster - $99/month</p>
                  <p className="mb-3">Hi [First Name],</p>
                  <p className="mb-3">
                    I see [Company Name] is actively hiring [job titles]. I work with ZALPHA - the #1 job platform for Gen Z talent across Guam, CNMI, Hawaii, and the Pacific islands.
                  </p>
                  <p className="mb-3">
                    <strong>Here's what makes us different:</strong><br />
                    ✅ 2,000+ pre-verified students & recent graduates<br />
                    ✅ All candidates pass skills assessments before you see them<br />
                    ✅ Average time-to-hire: 12 days (vs. 45+ days traditional)<br />
                    ✅ Plans starting at just $99/month
                  </p>
                  <p className="mb-3">
                    <strong>Recent success:</strong> Pacific Islands Club hired 12 front desk associates in 3 weeks using ZALPHA.
                  </p>
                  <p className="mb-3">
                    Can I show you a 5-minute demo this week? I'm available [Day/Time] or [Day/Time].
                  </p>
                  <p>
                    Best regards,<br />
                    [Your Name]<br />
                    ZALPHA Business Development<br />
                    📞 [Your Phone] | 📧 [Your Email]
                  </p>
                </div>
              </div>

              {/* Value Proposition One-Liner */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 border-2 border-yellow-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Value Proposition (One-Liner)</h3>
                <div className="bg-white rounded-lg p-6 border border-yellow-200 text-center">
                  <p className="text-2xl font-bold text-gray-900 leading-relaxed">
                    "ZALPHA connects you with pre-verified Gen Z talent across the Pacific in 12 days or less - for 95% less than traditional recruiting."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 5: Objection Handling */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-blue-200 overflow-hidden">
          <button
            onClick={() => toggleSection('objections')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">5. Objection Handling</h2>
            </div>
            {expandedSection === 'objections' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'objections' && (
            <div className="p-8 space-y-4">
              {[
                {
                  objection: "\"We already use Handshake\"",
                  response: "Perfect! Handshake is excellent for 4-year university students, but here's where ZALPHA is different: We're the ONLY platform focused on Pacific island Gen Z talent including community college students, trade school grads, and high school graduates. Handshake doesn't reach students at GCC, NMC, or most Pacific island high schools. We complement Handshake by giving you access to the 70% of local talent that Handshake misses. Plus, our students are already skills-tested for hospitality, retail, and service roles - perfect for your Pacific operations."
                },
                {
                  objection: "\"We already post on Indeed/LinkedIn\"",
                  response: "That's great! ZALPHA is specifically for Pacific island Gen Z talent - 80% of our candidates aren't active on Indeed. Think of us as your regional specialist that complements your broader recruiting. Plus, at $99-249/month, we're 10x cheaper than Indeed's cost-per-click."
                },
                {
                  objection: "\"We don't have budget right now\"",
                  response: "I understand budget is tight. That's exactly why ZALPHA makes sense - at $99/month for our Starter plan, you're paying less than the cost of ONE newspaper ad. Plus, if you calculate cost-per-hire, traditional recruiting costs $5,000+ per position. We're less than 2% of that cost."
                },
                {
                  objection: "\"We get applications through our website\"",
                  response: "That's excellent! But how many of those applicants are pre-verified students with skill assessments already completed? Our candidates are all .edu verified and have passed basic skills tests. This cuts your screening time by 70%. You can keep your website - we just add quality candidates to your pipeline."
                },
                {
                  objection: "\"Gen Z workers aren't reliable\"",
                  response: "I hear that concern a lot, but here's the difference: our students are academically verified and come with references from their schools. Plus, companies like Pacific Islands Club and Hyatt have hired 50+ students through us with 92% retention after 90 days. These aren't random applicants - they're motivated students building their careers."
                },
                {
                  objection: "\"We need experienced workers, not students\"",
                  response: "Great point! We actually have a mix - 60% are recent graduates (18-24) with work experience, and 40% are current students. Many have completed internships and part-time roles. For entry-level positions like [front desk, server, bank teller, retail], our candidates are perfect. And they cost 30-40% less to hire than experienced workers from off-island."
                },
                {
                  objection: "\"Can I think about it?\"",
                  response: "Absolutely! Let me send you a 5-minute video demo so you can see the platform. Can I also offer you a 30-day free trial of our Professional plan (normally $249/month)? That way you can test it risk-free and see real results before committing."
                }
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-red-900 mb-2 text-lg">OBJECTION: {item.objection}</p>
                      <p className="text-gray-700 leading-relaxed"><strong className="text-green-700">RESPONSE:</strong> {item.response}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 6: Commission Structure */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-blue-200 overflow-hidden">
          <button
            onClick={() => toggleSection('commission')}
            className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all"
          >
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">6. Commission Structure & Bonuses</h2>
            </div>
            {expandedSection === 'commission' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          {expandedSection === 'commission' && (
            <div className="p-8 space-y-6">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Base Commission Rates</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200">
                    <div>
                      <p className="font-bold text-gray-900">Starter Plan ($99/month)</p>
                      <p className="text-sm text-gray-600">1.5% recurring commission (Year 1 only)</p>
                    </div>
                    <p className="text-2xl font-black text-green-600">$1.49/month</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200">
                    <div>
                      <p className="font-bold text-gray-900">Professional Plan ($249/month)</p>
                      <p className="text-sm text-gray-600">1.5% recurring commission (Year 1 only)</p>
                    </div>
                    <p className="text-2xl font-black text-green-600">$3.74/month</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200">
                    <div>
                      <p className="font-bold text-gray-900">Ultra Premium Plan ($499/month)</p>
                      <p className="text-sm text-gray-600">1.5% recurring commission (Year 1 only)</p>
                    </div>
                    <p className="text-2xl font-black text-green-600">$7.49/month</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-orange-50 border border-orange-300 rounded-lg">
                  <p className="text-xs text-orange-900"><strong>⚠️ Important:</strong> Recurring revenue share terminates immediately upon contract termination or end of independent contractor status. Commission is for first year only.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎁 Performance Bonuses</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <p className="font-bold text-purple-900 mb-2">🥉 Bronze Tier: 10+ Active Clients</p>
                    <p className="text-gray-700">+5% commission boost on all new signups</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <p className="font-bold text-purple-900 mb-2">🥈 Silver Tier: 25+ Active Clients</p>
                    <p className="text-gray-700">+10% commission boost + $500 monthly bonus</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <p className="font-bold text-purple-900 mb-2">🥇 Gold Tier: 50+ Active Clients</p>
                    <p className="text-gray-700">+15% commission boost + $1,500 monthly bonus</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg text-white">
                    <p className="font-bold mb-2">💎 Diamond Tier: 100+ Active Clients</p>
                    <p>+20% commission boost + $3,000 monthly bonus + Profit sharing</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 border-2 border-blue-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔄 Recurring Revenue</h3>
                <div className="bg-white rounded-lg p-6 border border-blue-200">
                  <p className="text-gray-800 mb-4">
                    <strong className="text-blue-600">You earn 1.5% recurring commission every month during first year ONLY (while active contractor)!</strong>
                  </p>
                  <p className="text-gray-700 mb-4">
                    Example: If you sign up 20 Professional plan clients ($249/month), you earn <strong className="text-green-600">$74.70/month</strong> in recurring commissions during year 1 (1.5% of $4,980).
                  </p>
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300 mb-4">
                    <p className="font-bold text-green-900">🎯 Commission Structure</p>
                    <p className="text-sm text-gray-700 mt-2">• 1.5% recurring for first 12 months only</p>
                    <p className="text-sm text-gray-700">• Terminates upon contract termination</p>
                    <p className="text-sm text-gray-700">• Paid monthly while contractor status is active</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-300">
                    <p className="text-xs font-bold text-orange-900 mb-1">⚠️ IMPORTANT:</p>
                    <p className="text-xs text-orange-900">All recurring revenue share terminates immediately if your independent contractor status ends or your contract is terminated for any reason.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-black mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our Business Development team and help connect Pacific island employers with Gen Z talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => alert('BD Rep Application Portal')}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-colors font-bold text-lg flex items-center justify-center gap-2"
            >
              Apply as BD Rep
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-colors font-bold text-lg"
            >
              Back to Home
            </button>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            Questions? Contact <strong>contact@zalpharecruit.com</strong> | WhatsApp/Phone: <strong>1-670-286-3010</strong>
          </p>
        </div>
      </div>
    </div>
  );
}