import { useState } from 'react';
import { Zap, Shield, Users, Code, CheckCircle, Lock, AlertCircle, TrendingUp, DollarSign, Globe, Rocket, Star, FileText, Key, Plug, Database, BarChart, Settings } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface RecruiterIntegrationProps {
  onNavigate: (page: string) => void;
}

export function RecruiterIntegration({ onNavigate }: RecruiterIntegrationProps) {
  const [showBetaForm, setShowBetaForm] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    contactName: '',
    email: '',
    phone: '',
    companySize: '',
    candidatesPerMonth: '',
    industries: [] as string[],
    useCase: '',
    technicalContact: '',
    technicalEmail: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Beta application submitted:', formData);
    alert('Thank you for applying! Our team will review your application and contact you within 2-3 business days.');
    setShowBetaForm(false);
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 py-6 sm:py-8 px-4">
      <div className="max-w-6xl mx-auto sm:px-6">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Home" />
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-xs sm:text-sm mb-4">
            <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
            BETA PROGRAM
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 px-2">
            3rd Party Recruiter Integration
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Connect your recruiting platform with ZALPHA's Pacific Islands talent pool. 
            Access verified candidates, automated reference checks, and AI-powered matching.
          </p>
        </div>

        {/* Beta Status Banner */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border-2 border-purple-300">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-900 mb-2">
                Join Our Exclusive Beta Program
              </h2>
              <p className="text-sm sm:text-base text-purple-800 mb-4">
                We're currently accepting a limited number of recruiting partners for our beta integration program. 
                Get early access to our API, dedicated support, and special beta pricing.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <div className="font-bold text-purple-900 mb-1">Beta Slots</div>
                  <div className="text-sm text-purple-700">15 / 25 filled</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <div className="font-bold text-purple-900 mb-1">Launch Date</div>
                  <div className="text-sm text-purple-700">Q2 2026</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <div className="font-bold text-purple-900 mb-1">Beta Pricing</div>
                  <div className="text-sm text-purple-700">50% off for 1 year</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            What You Get with ZALPHA Integration
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Database className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Access Verified Talent</h3>
              <p className="text-gray-600 mb-4">
                Search and access our database of verified Pacific Islands candidates with ID verification, 
                skills assessments, and verified references.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>18,000+ verified student profiles</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Skills assessment scores included</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Real-time availability data</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100 hover:border-green-300 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pre-Screened References</h3>
              <p className="text-gray-600 mb-4">
                Save 30-45 minutes per candidate with our verified reference system. 
                All references pre-answered standard questions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>10 standard questions answered</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Video testimonials available</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>ZALPHA-verified authenticity</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Matching</h3>
              <p className="text-gray-600 mb-4">
                Our AI analyzes skills, location preferences, and career goals to match 
                candidates with your job openings automatically.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>70% reduction in screening time</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Smart skill gap analysis</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Cultural fit indicators</span>
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100 hover:border-orange-300 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy-First Design</h3>
              <p className="text-gray-600 mb-4">
                Students control what you see. FERPA compliant. All interactions tracked 
                and logged for transparency.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Student privacy controls</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>FERPA & GDPR compliant</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Full audit trail</span>
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-cyan-100 hover:border-cyan-300 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Code className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">RESTful API</h3>
              <p className="text-gray-600 mb-4">
                Modern REST API with comprehensive documentation, webhooks, and 
                real-time updates. Easy integration in days, not months.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Complete API documentation</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Webhook notifications</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Rate limiting & security</span>
                </li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100 hover:border-pink-300 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                <BarChart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Track candidate engagement, application rates, time-to-hire, and ROI 
                with detailed analytics and reporting.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Real-time metrics</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Custom reports</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Performance insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How Integration Works
          </h2>
          <div className="grid sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Apply for Beta</h3>
              <p className="text-sm text-gray-600">
                Submit your application and tell us about your recruiting business
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Get API Keys</h3>
              <p className="text-sm text-gray-600">
                Receive sandbox credentials and access to documentation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Integrate & Test</h3>
              <p className="text-sm text-gray-600">
                Build your integration with our support team's guidance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Go Live</h3>
              <p className="text-sm text-gray-600">
                Launch your integration and start accessing candidates
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 border-2 border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Beta Pricing (Limited Time)
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-4xl font-black text-gray-900">$299</span>
                <span className="text-gray-600">/month</span>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  50% off beta pricing
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Up to 50 candidate contacts/month</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Full API access</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
            </div>

            {/* Professional */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 shadow-lg text-white relative">
              <div className="absolute -top-3 right-4 px-3 py-1 bg-yellow-400 text-purple-900 rounded-full text-xs font-bold">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <div className="mb-4">
                <span className="text-4xl font-black">$699</span>
                <span className="text-purple-100">/month</span>
                <div className="text-sm text-yellow-300 font-semibold mt-1">
                  50% off beta pricing
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <span>Up to 200 candidate contacts/month</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <span>Full API access</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <span>Advanced analytics & reports</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <span>Webhook notifications</span>
                </li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-black text-gray-900">Custom</span>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  Contact for pricing
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Unlimited candidate contacts</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Full API access</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Custom analytics & white-label</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>SLA guarantee</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Preview */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-12 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl font-bold">API Preview</h2>
          </div>
          <p className="text-gray-300 mb-6">
            Our RESTful API is designed for easy integration. Here's a sample request:
          </p>
          <div className="bg-gray-800 rounded-xl p-6 font-mono text-sm overflow-x-auto">
            <div className="text-cyan-400 mb-2">// Search for candidates</div>
            <div className="text-gray-300">
              <span className="text-pink-400">POST</span>{' '}
              <span className="text-yellow-300">https://api.zalpharecruit.com/v1/candidates/search</span>
            </div>
            <div className="text-gray-400 my-3">{'{'}</div>
            <div className="ml-4 text-gray-300">
              <span className="text-cyan-300">"skills"</span>: [<span className="text-green-400">"JavaScript"</span>, <span className="text-green-400">"React"</span>],
            </div>
            <div className="ml-4 text-gray-300">
              <span className="text-cyan-300">"location"</span>: <span className="text-green-400">"CNMI"</span>,
            </div>
            <div className="ml-4 text-gray-300">
              <span className="text-cyan-300">"education_level"</span>: <span className="text-green-400">"bachelors"</span>,
            </div>
            <div className="ml-4 text-gray-300">
              <span className="text-cyan-300">"verified_references"</span>: <span className="text-purple-400">true</span>,
            </div>
            <div className="ml-4 text-gray-300">
              <span className="text-cyan-300">"limit"</span>: <span className="text-orange-400">20</span>
            </div>
            <div className="text-gray-400">{'}'}</div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-all flex items-center gap-2">
              <FileText className="w-5 h-5" />
              View Full Documentation
            </button>
            <button className="px-6 py-3 border-2 border-cyan-600 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-600 hover:text-white transition-all flex items-center gap-2">
              <Key className="w-5 h-5" />
              Get Sandbox API Key
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Partner with ZALPHA?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Untapped Market</h3>
                <p className="text-gray-600 text-sm">
                  First-mover advantage in the Pacific Islands market with 18,000+ verified candidates 
                  across 6 territories (CNMI, FSM, Guam, Hawaii, Marshall Islands, Palau).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Pre-Vetted Quality</h3>
                <p className="text-gray-600 text-sm">
                  All candidates are ID-verified, skills-assessed, and have verified professional references. 
                  Reduce your screening time by 70%.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">No Placement Fees</h3>
                <p className="text-gray-600 text-sm">
                  Unlike traditional recruiting platforms, ZALPHA charges subscription-only pricing. 
                  No commission on placements means better margins for you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Government Partnerships</h3>
                <p className="text-gray-600 text-sm">
                  ZALPHA partners with Pacific Island governments and educational institutions, 
                  providing credibility and a steady pipeline of new candidates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 sm:p-12 text-center text-white mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Join Our Beta Program?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Limited spots available. Get 50% off for your first year as a beta partner.
          </p>
          <button
            onClick={() => setShowBetaForm(true)}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <Rocket className="w-6 h-6" />
            Apply for Beta Access
          </button>
          <p className="text-sm text-purple-200 mt-4">
            ⚡ Our team responds within 2-3 business days
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                What's included in the beta program?
              </h3>
              <p className="text-gray-600">
                Beta partners receive full API access, dedicated technical support, priority feature requests, 
                50% discount for the first year, and early access to new features before general release.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                How does student privacy work?
              </h3>
              <p className="text-gray-600">
                Students have FULL control over what recruiters can see. They can choose to hide their profile 
                from 3rd party recruiters, show limited information, or allow full access. All interactions are 
                logged and transparent. We're FERPA compliant and take student privacy seriously.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                What's the difference between direct employers and recruiters?
              </h3>
              <p className="text-gray-600">
                Direct employers post jobs and hire directly through ZALPHA. 3rd party recruiters use our API 
                to access candidate data for placement with their own clients. Both have access to verified 
                references and skills assessments, but recruiters pay subscription fees instead of per-job posting fees.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                How long does integration take?
              </h3>
              <p className="text-gray-600">
                Most partners complete their integration in 2-4 weeks. We provide comprehensive documentation, 
                sandbox environment, and dedicated technical support to ensure smooth integration.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                Can we white-label the experience?
              </h3>
              <p className="text-gray-600">
                Enterprise tier partners can white-label candidate communications and some interface elements. 
                However, students will always know when a 3rd party recruiter accesses their profile for transparency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Beta Application Modal */}
      {showBetaForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-8 my-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Beta Program Application
                </h3>
                <p className="text-gray-600">
                  Tell us about your recruiting business and we'll get back to you within 2-3 business days.
                </p>
              </div>
              <button
                onClick={() => setShowBetaForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Information */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Company Information</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="https://"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size *
                    </label>
                    <select
                      required
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Candidates Placed/Month *
                    </label>
                    <select
                      required
                      value={formData.candidatesPerMonth}
                      onChange={(e) => setFormData({ ...formData, candidatesPerMonth: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="1-25">1-25 placements/month</option>
                      <option value="26-100">26-100 placements/month</option>
                      <option value="101-250">101-250 placements/month</option>
                      <option value="250+">250+ placements/month</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Primary Contact</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Technical Contact */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Technical Contact (Optional)</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Developer Name
                    </label>
                    <input
                      type="text"
                      value={formData.technicalContact}
                      onChange={(e) => setFormData({ ...formData, technicalContact: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Developer Email
                    </label>
                    <input
                      type="email"
                      value={formData.technicalEmail}
                      onChange={(e) => setFormData({ ...formData, technicalEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Use Case */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How do you plan to use ZALPHA's API? *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Tell us about your use case, integration plans, and how ZALPHA will fit into your recruiting workflow..."
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowBetaForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}