import { TrendingUp, Users, Target, BarChart3, DollarSign, CheckCircle, Star, Zap, Globe, Award, Eye, MousePointer, ArrowRight, Building2, GraduationCap, Download } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface PitchDeckAdvertisersProps {
  onNavigate: (page: string) => void;
}

export function PitchDeckAdvertisers({ onNavigate }: PitchDeckAdvertisersProps) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Download and Back Buttons */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 px-6 py-4 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">ZALPHA Advertiser Pitch</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-xl transition-all text-sm font-semibold hover:shadow-lg"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={() => onNavigate('demo-showcase')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all text-sm font-semibold"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Target className="w-6 h-6" />
              <span className="font-semibold text-lg">Advertiser Solutions</span>
            </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight px-4">
            Reach 50,000+ Verified Students<br/>in the Western Pacific
          </h1>
            <p className="text-2xl text-purple-100 max-w-4xl mx-auto mb-8">
              Connect with college students and recent graduates in CNMI, FSM, Guam, and Hawaii. 
              Highly engaged audience with verified identities and academic credentials.
            </p>
            <div className="flex items-center justify-center gap-6">
              <button className="px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all">
                Start Advertising
              </button>
              <button className="px-10 py-5 border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">
                View Media Kit
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border-2 border-white/30">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-purple-200">Verified Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border-2 border-white/30">
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-purple-200">Daily Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border-2 border-white/30">
              <div className="text-4xl font-bold mb-2">6 Regions</div>
              <div className="text-purple-200">CNMI, FSM, Guam, Hawaii, Palau, Marshall Islands</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border-2 border-white/30">
              <div className="text-4xl font-bold mb-2">18-25</div>
              <div className="text-purple-200">Target Age Range</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Why Advertise on ZALPHA */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">Why Advertise on ZALPHA?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The only platform exclusively serving verified college students in the Pacific region
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Verified Audience</h3>
              <p className="text-slate-600 mb-4">
                Every user is ID-verified with dual authentication. No bots, no fake accounts - just real students.
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>100% verified student IDs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Academic credentials confirmed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Active job seekers</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-200">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Precise Targeting</h3>
              <p className="text-slate-600 mb-4">
                Target by school, major, graduation year, skills, location, and more. Reach exactly who you want.
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Filter by university/college</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Target specific majors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Geographic precision</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">High Engagement</h3>
              <p className="text-slate-600 mb-4">
                Students use ZALPHA daily for job search and career development. Your ads reach them when they're most engaged.
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>85% daily active users</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Avg 25 min session time</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>8+ sessions per week</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ad Formats */}
        <section className="mb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">Advertising Formats</h2>
            <p className="text-xl text-slate-300">
              Multiple placement options to meet your campaign goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-cyan-400/30">
              <Eye className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Banner Ads</h3>
              <p className="text-slate-300 text-sm mb-4">
                Strategic placements throughout the app for maximum visibility
              </p>
              <div className="text-cyan-400 font-semibold">From $299/month</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-400/30">
              <Star className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Featured Sponsor</h3>
              <p className="text-slate-300 text-sm mb-4">
                Premium placement on dashboard with enhanced branding
              </p>
              <div className="text-purple-400 font-semibold">From $799/month</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-400/30">
              <Building2 className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Sponsored Content</h3>
              <p className="text-slate-300 text-sm mb-4">
                Native content that appears in student feeds and job searches
              </p>
              <div className="text-pink-400 font-semibold">From $1,499/month</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-yellow-400/30">
              <GraduationCap className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Virtual Fair Sponsorship</h3>
              <p className="text-slate-300 text-sm mb-4">
                Sponsor Virtual Job Fairs or College Fairs - exclusive premium exposure
              </p>
              <div className="text-yellow-400 font-semibold">From $3,999/event</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-orange-400/30">
              <Zap className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Takeover Campaign</h3>
              <p className="text-slate-300 text-sm mb-4">
                Exclusive homepage placement for maximum brand impact
              </p>
              <div className="text-orange-400 font-semibold">From $2,999/month</div>
            </div>
          </div>
        </section>

        {/* Platform Features - Unique Reach Opportunities */}
        <section className="mb-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">Exclusive Platform Features</h2>
            <p className="text-xl text-slate-600">Reach students through unique engagement opportunities</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Virtual Job Fairs</h3>
                  <p className="text-slate-600">Live employment events</p>
                </div>
              </div>
              <p className="text-slate-700 mb-4">
                Sponsor or exhibit at our Pacific-wide virtual job fairs. Students attend live events to meet employers, submit applications in real-time, and interview on the spot.
              </p>
              <ul className="space-y-2 text-slate-600 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>2,922 students registered for upcoming events</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>93 employers and 35 schools participating</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Industry-specific fairs (Hospitality, STEM, etc.)</span>
                </li>
              </ul>
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <p className="text-sm text-slate-700 font-semibold">Advertising Options:</p>
                <p className="text-sm text-slate-600">Booth sponsorship, banner ads, opening sponsor, virtual swag bags</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Virtual College Fairs</h3>
                  <p className="text-slate-600">Higher education pathways</p>
                </div>
              </div>
              <p className="text-slate-700 mb-4">
                Reach high school graduates exploring colleges in Guam, CNMI, FSM & Hawaii. Perfect for targeting students interested in financial services, education loans, student products.
              </p>
              <ul className="space-y-2 text-slate-600 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>6,510 students registered across 4 upcoming fairs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>38 colleges & universities participating</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>$42M+ in scholarships promoted</span>
                </li>
              </ul>
              <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                <p className="text-sm text-slate-700 font-semibold">Advertising Options:</p>
                <p className="text-sm text-slate-600">Event sponsorship, branded materials, scholarship sponsor, attendee swag</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-center">
            <p className="text-2xl font-bold text-slate-900 mb-2">🎯 Dual Pathway = Double the Reach</p>
            <p className="text-slate-800">
              ZALPHA is the ONLY platform with both employment AND education pathways. Advertise to students whether they're job-hunting OR college-bound!
            </p>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">Advertising Packages</h2>
            <p className="text-xl text-slate-600">Choose the package that fits your budget and goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
                <div className="text-5xl font-bold text-purple-600 mb-2">$299</div>
                <p className="text-slate-600">per month</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700"><strong>50,000</strong> monthly impressions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Standard banner placements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Basic targeting (region)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Monthly performance reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Self-service dashboard</span>
                </li>
              </ul>
              <button className="w-full py-4 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-xl font-bold transition-all">
                Get Started
              </button>
            </div>

            {/* Professional */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-6 py-2 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                <div className="text-5xl font-bold text-white mb-2">$799</div>
                <p className="text-purple-100">per month</p>
              </div>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                  <span><strong>200,000</strong> monthly impressions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                  <span>Featured sponsor placement</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                  <span>Advanced targeting (school, major, skills)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-1" />
                  <span>Weekly performance reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-1" />
                  <span>A/B testing capabilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-1" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl transition-all">
                Get Started
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
                <div className="text-5xl font-bold text-orange-600 mb-2">$2,999</div>
                <p className="text-slate-600">per month</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700"><strong>Unlimited</strong> impressions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Homepage takeover campaigns</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Sponsored content & native ads</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Custom targeting criteria</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Real-time analytics dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Custom creative services</span>
                </li>
              </ul>
              <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold hover:shadow-xl transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* Target Audience Demographics */}
        <section className="mb-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-8 text-center">Target Audience Demographics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <GraduationCap className="w-16 h-16 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">18-25</div>
              <div className="text-cyan-100">Age Range</div>
              <div className="text-sm text-cyan-200 mt-2">College students & recent grads</div>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">52% / 48%</div>
              <div className="text-cyan-100">Gender Split</div>
              <div className="text-sm text-cyan-200 mt-2">Female / Male</div>
            </div>
            <div className="text-center">
              <Globe className="w-16 h-16 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">6 Regions</div>
              <div className="text-cyan-100">Geographic Reach</div>
              <div className="text-sm text-cyan-200 mt-2">CNMI, FSM, Guam, Hawaii, Palau, Marshall Islands</div>
            </div>
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-cyan-100">Verified Users</div>
              <div className="text-sm text-cyan-200 mt-2">Dual ID authentication</div>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Perfect For These Industries</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'Education & Training', percentage: '28%' },
              { name: 'Financial Services', percentage: '18%' },
              { name: 'Technology & Software', percentage: '15%' },
              { name: 'Retail & E-commerce', percentage: '12%' },
              { name: 'Healthcare', percentage: '10%' },
              { name: 'Hospitality & Tourism', percentage: '8%' },
              { name: 'Food & Beverage', percentage: '5%' },
              { name: 'Other', percentage: '4%' }
            ].map((category, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">{category.percentage}</div>
                <div className="text-slate-700 font-semibold">{category.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-16 bg-slate-50 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Advertiser Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "We reached 15,000 students in our target demographic within the first month. The targeting options are incredibly precise."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  BP
                </div>
                <div>
                  <div className="font-bold text-slate-900">Bank of the Pacific</div>
                  <div className="text-slate-600 text-sm">Financial Services</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "The ROI on our ZALPHA advertising has been exceptional. We've seen a 340% increase in applications from qualified candidates."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  PT
                </div>
                <div>
                  <div className="font-bold text-slate-900">Pacific Tech Solutions</div>
                  <div className="text-slate-600 text-sm">Technology</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "Being able to target students by major and school made all the difference. We found exactly who we were looking for."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  GH
                </div>
                <div>
                  <div className="font-bold text-slate-900">Guam Healthcare Network</div>
                  <div className="text-slate-600 text-sm">Healthcare</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Reach Pacific Students?</h2>
          <p className="text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Join leading brands advertising to the most engaged student audience in the Western Pacific
          </p>
          <div className="flex items-center justify-center gap-6">
            <button className="px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all flex items-center gap-3">
              Start Your Campaign
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="px-10 py-5 border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">
              Download Media Kit
            </button>
          </div>
          <p className="purple-200 mt-6">
            Questions? Email <a href="mailto:advertise@zalpharecruit.com" className="underline font-semibold">advertise@zalpharecruit.com</a> or call 670-286-3010
          </p>
        </section>
      </div>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <BackButton onNavigate={onNavigate} />
      </div>
    </div>
  );
}