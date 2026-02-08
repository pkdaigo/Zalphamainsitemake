import { useState } from 'react';
import { Building2, CreditCard, Check, Users } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import * as api from '@/utils/api';
import { DataBrokerDisclosure } from '@/app/components/DataBrokerDisclosure';
import { ReCaptcha, HoneypotField, BehavioralVerification, RateLimitWarning } from '@/app/components/ReCaptcha';
import { EmployerLiabilityAgreement } from '@/app/components/EmployerLiabilityAgreement';
import { AntiTraffickingPolicy } from '@/app/components/AntiTraffickingPolicy';
import { DisputeRefundPolicy } from '@/app/components/DisputeRefundPolicy';
import { PlaidIDVerification } from '@/app/components/PlaidIDVerification';
import { GLOBAL_COUNTRIES } from '@/app/utils/countries';

interface EmployerSignupProps {
  onNavigate: (page: string) => void;
}

export function EmployerSignup({ onNavigate }: EmployerSignupProps) {
  const [selectedPlan, setSelectedPlan] = useState<'free-contract' | 'starter' | 'professional' | 'ultra-premium' | 'rpo'>('professional');
  const [numberOfSeats, setNumberOfSeats] = useState(3); // Default to included seats
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    location: 'CNMI',
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    password: '',
    phone: '',
  });
  
  // Anti-bot protection state
  const [honeypotValue, setHoneypotValue] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [behavioralScore, setBehavioralScore] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const maxAttempts = 5;
  
  // Plaid verification state
  const [plaidVerified, setPlaidVerified] = useState(false);
  const [plaidData, setPlaidData] = useState<any>(null);
  
  // Legal agreements state
  const [liabilityAccepted, setLiabilityAccepted] = useState(false);
  const [trafficingPolicyAccepted, setTrafficingPolicyAccepted] = useState(false);
  const [disputeRefundPolicyAccepted, setDisputeRefundPolicyAccepted] = useState(false);

  // Seat pricing calculator
  const getSeatConfig = () => {
    switch (selectedPlan) {
      case 'free-contract':
        return { included: 1, perSeatCost: 0, canAddSeats: false };
      case 'starter':
        return { included: 3, perSeatCost: 25, canAddSeats: true };
      case 'professional':
        return { included: 5, perSeatCost: 35, canAddSeats: true };
      case 'ultra-premium':
        return { included: 10, perSeatCost: 50, canAddSeats: true };
      case 'rpo':
        return { included: Infinity, perSeatCost: 0, canAddSeats: false };
      default:
        return { included: 1, perSeatCost: 0, canAddSeats: false };
    }
  };

  const calculateTotal = () => {
    if (selectedPlan === 'free-contract' || selectedPlan === 'rpo') return 0;
    
    const seatConfig = getSeatConfig();
    const basePrices: { [key: string]: number } = {
      'starter': 49.99,
      'professional': 249,
      'ultra-premium': 499
    };
    
    const basePrice = basePrices[selectedPlan] || 0;
    const additionalSeats = Math.max(0, numberOfSeats - seatConfig.included);
    const additionalCost = additionalSeats * seatConfig.perSeatCost;
    
    return basePrice + additionalCost;
  };

  const handlePlanChange = (plan: 'free-contract' | 'starter' | 'professional' | 'ultra-premium' | 'rpo') => {
    setSelectedPlan(plan);
    const config = getSeatConfig();
    
    if (plan === 'free-contract') {
      setNumberOfSeats(1);
    } else if (plan === 'starter') {
      setNumberOfSeats(3);
    } else if (plan === 'professional') {
      setNumberOfSeats(5);
    } else if (plan === 'ultra-premium') {
      setNumberOfSeats(10);
    } else if (plan === 'rpo') {
      setNumberOfSeats(10);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Bot detection - Check honeypot field
    if (honeypotValue !== '') {
      setError('Automated submission detected. Please try again.');
      setFailedAttempts(prev => prev + 1);
      return;
    }
    
    // Check if account is locked due to too many attempts
    if (failedAttempts >= maxAttempts) {
      setError('Too many failed attempts. Please try again later or contact support.');
      return;
    }
    
    // Verify bot protections
    if (!recaptchaToken || behavioralScore < 50) {
      setError('Please complete all security verifications.');
      return;
    }
    
    // Verify legal agreements
    if (!liabilityAccepted || !trafficingPolicyAccepted || !disputeRefundPolicyAccepted) {
      setError('Please accept the liability agreement, anti-trafficking policy, and dispute refund policy.');
      return;
    }
    
    setLoading(true);
    
    try {
      await api.employerSignup({
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName,
        industry: formData.industry,
        location: formData.location,
        plan: selectedPlan,
        numberOfSeats: numberOfSeats,
        recaptchaToken: recaptchaToken,
        behavioralScore: behavioralScore,
      });
      
      // Auto sign in after signup
      await api.signIn(formData.email, formData.password);
      
      // Navigate to employer dashboard
      onNavigate('employer-dashboard');
    } catch (err: any) {
      console.error('Employer signup error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
      setFailedAttempts(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back to Home Button */}
        <div className="mb-4 sm:mb-6">
          <BackButton onNavigate={onNavigate} label="Back to Home" />
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Start Hiring Pacific Talent</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">Create your employer account and post your first job</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl">
            <span className="text-xl sm:text-2xl">🤖</span>
            <p className="text-sm sm:text-base md:text-lg font-bold text-purple-900">Our AI platform does 70% of the hiring work for you</p>
          </div>
        </div>

        {/* Pricing Selection */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Choose Your Plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Free Trial Tier - Compete with Indeed */}
            <button
              onClick={() => handlePlanChange('free-contract')}
              className={`text-left p-6 rounded-xl border-2 transition-all ${
                selectedPlan === 'free-contract'
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Free Trial</h3>
                  <div className="text-3xl font-bold text-green-600 mt-2">FREE</div>
                  <p className="text-xs text-gray-500 mt-1">14 Days - No Credit Card</p>
                </div>
                {selectedPlan === 'free-contract' && (
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Post 2 jobs (contract/temp)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Basic candidate search
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Watermarked profiles
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Email-only messaging
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span className="line-through">AI does 70% of work</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Try ZALPHA risk-free. Upgrade anytime for AI automation & verified candidates.
                </p>
              </div>
            </button>
            
            <button
              onClick={() => handlePlanChange('starter')}
              className={`text-left p-6 rounded-xl border-2 transition-all relative ${
                selectedPlan === 'starter'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="absolute -top-3 right-4 px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-xs font-bold">
                LIMITED TIME 50% OFF
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Starter</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <div className="text-3xl font-bold text-gray-900">$49.99<span className="text-lg text-gray-600">/mo</span></div>
                    <div className="text-lg text-gray-400 line-through">$99</div>
                  </div>
                  <p className="text-xs text-green-600 font-semibold mt-1">3-Day Free Trial</p>
                </div>
                {selectedPlan === 'starter' && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span className="font-bold">🤖 AI does 70% of work</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  Up to 5 job postings
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  Verified candidate profiles
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  AI candidate matching
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  ZALPHA ATS & Website Integration
                </li>
              </ul>
            </button>

            <button
              onClick={() => handlePlanChange('professional')}
              className={`text-left p-6 rounded-xl border-2 transition-all relative ${
                selectedPlan === 'professional'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="absolute -top-3 right-4 px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-xs font-bold">
                POPULAR
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Professional</h3>
                  <div className="text-3xl font-bold text-gray-900 mt-2">$249<span className="text-lg text-gray-600">/mo</span></div>
                  <p className="text-xs text-green-600 font-semibold mt-1">3-Day Free Trial</p>
                </div>
                {selectedPlan === 'professional' && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span className="font-bold">🤖 AI does 70% of work</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  Unlimited job postings
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  Advanced candidate search
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  Featured company profile
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  Integration with ZALPHA ATS & Custom Websites
                </li>
              </ul>
            </button>

            <button
              onClick={() => handlePlanChange('ultra-premium')}
              className={`text-left p-6 rounded-xl border-2 transition-all relative ${
                selectedPlan === 'ultra-premium'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 rounded-full text-xs font-bold">
                LIMITED TIME 38% OFF
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Ultra Premium</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <div className="text-3xl font-bold text-gray-900">$499<span className="text-lg text-gray-600">/mo</span></div>
                    <div className="text-lg text-gray-400 line-through">$799</div>
                  </div>
                  <p className="text-xs text-green-600 font-semibold mt-1">3-Day Free Trial</p>
                </div>
                {selectedPlan === 'ultra-premium' && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span className="font-bold">🤖 AI does 70% of work</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  AI Video Interviews
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  Unlimited job postings
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  Advanced analytics & reporting
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  Custom branding & logo
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  24/7 Priority support
                </li>
              </ul>
            </button>

            {/* RPO Level */}
            <button
              onClick={() => handlePlanChange('rpo')}
              className={`text-left p-6 rounded-xl border-2 transition-all relative ${
                selectedPlan === 'rpo'
                  ? 'border-gray-900 bg-gray-900/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 rounded-full text-xs font-bold">
                ENTERPRISE
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">RPO Level</h3>
                  <div className="text-2xl font-bold text-gray-900 mt-2">Contact Sales</div>
                </div>
                {selectedPlan === 'rpo' && (
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500" />
                  Dedicated ZALPHA team
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500" />
                  Full RPO services
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500" />
                  Custom pricing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500" />
                  White-glove screening
                </li>
              </ul>
            </button>
          </div>
        </div>

        {/* Seat Selection (for paid plans) */}
        {selectedPlan !== 'free-contract' && selectedPlan !== 'rpo' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Team Size</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">How many team members need access?</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Each seat allows one team member to access your ZALPHA account, post jobs, review candidates, and manage hiring activities.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Your Plan</div>
                      <div className="font-bold text-gray-900 text-lg capitalize">{selectedPlan}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Included Seats</div>
                      <div className="font-bold text-gray-900 text-lg">{getSeatConfig().included}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Additional Seats</div>
                      <div className="font-bold text-gray-900 text-lg">${getSeatConfig().perSeatCost}/seat/month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Number of Seats
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setNumberOfSeats(Math.max(getSeatConfig().included, numberOfSeats - 1))}
                  disabled={numberOfSeats <= getSeatConfig().included}
                  className="w-12 h-12 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <input
                    type="number"
                    min={getSeatConfig().included}
                    max="100"
                    value={numberOfSeats}
                    onChange={(e) => setNumberOfSeats(Math.max(getSeatConfig().included, parseInt(e.target.value) || getSeatConfig().included))}
                    className="w-32 px-4 py-3 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <div className="text-sm text-gray-600 mt-1">team members</div>
                </div>
                <button
                  type="button"
                  onClick={() => setNumberOfSeats(numberOfSeats + 1)}
                  className="w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Pricing Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Base Plan ({selectedPlan})</span>
                  <span className="font-semibold text-gray-900">
                    ${selectedPlan === 'starter' ? '49.99' : selectedPlan === 'professional' ? '249' : '499'}/month
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Included Seats</span>
                  <span className="font-semibold text-gray-900">{getSeatConfig().included} seats</span>
                </div>
                
                {numberOfSeats > getSeatConfig().included && (
                  <>
                    <div className="border-t border-gray-300 pt-3"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Additional Seats</span>
                      <span className="font-semibold text-gray-900">
                        {numberOfSeats - getSeatConfig().included} × ${getSeatConfig().perSeatCost}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Additional Cost</span>
                      <span className="font-semibold text-gray-900">
                        ${(numberOfSeats - getSeatConfig().included) * getSeatConfig().perSeatCost}/month
                      </span>
                    </div>
                  </>
                )}
                
                <div className="border-t-2 border-gray-400 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-bold text-xl">Total</span>
                    <span className="font-bold text-blue-600 text-2xl">
                      ${calculateTotal()}<span className="text-lg text-gray-600">/month</span>
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 text-right mt-1">
                    for {numberOfSeats} team {numberOfSeats === 1 ? 'member' : 'members'}
                  </div>
                </div>
              </div>

              <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  <strong>3-Day Free Trial:</strong> You won't be charged until after your trial ends
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Pacific Tech Solutions"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="hospitality">Hospitality & Tourism</option>
                  <option value="retail">Retail</option>
                  <option value="finance">Finance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size *
                </label>
                <select
                  required
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="https://www.example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  {GLOBAL_COUNTRIES.map(country => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Jane"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Smith"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="HR Manager"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="jane.smith@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="+1 (670) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="••••••••"
              />
              <p className="text-sm text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  {selectedPlan === 'free-contract' ? (
                    <>
                      <p className="text-sm text-green-900 font-medium">
                        Selected Plan: Contract Work - FREE
                      </p>
                      <p className="text-sm text-green-800 mt-1">
                        Post contract positions for free. No payment required. Upgrade anytime for more features.
                      </p>
                    </>
                  ) : selectedPlan === 'rpo' ? (
                    <>
                      <p className="text-sm text-gray-900 font-medium">
                        Selected Plan: RPO Level - Contact Sales
                      </p>
                      <p className="text-sm text-gray-800 mt-1">
                        Our sales team will contact you to discuss custom pricing and dedicated recruitment solutions for your enterprise needs.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-blue-900 font-medium">
                        Selected Plan: {selectedPlan === 'starter' ? 'Starter' : selectedPlan === 'professional' ? 'Professional' : 'Ultra Premium'} - ${selectedPlan === 'starter' ? '49.99' : selectedPlan === 'professional' ? '249' : '499'}/month
                      </p>
                      <p className="text-sm text-blue-800 mt-1">
                        <strong>3-Day Free Trial</strong> - You won't be charged until after your trial ends. Cancel anytime during the trial period.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Privacy Disclosure */}
            <DataBrokerDisclosure variant="minimal" onNavigate={onNavigate} />

            {/* Business/Employer ID Verification with Plaid */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 text-lg">Business Verification</h3>
              
              <PlaidIDVerification 
                userType="employer"
                onSuccess={(data) => {
                  setPlaidVerified(true);
                  setPlaidData(data);
                  console.log('Business Verification successful:', data);
                }}
                onError={(error) => {
                  console.error('Business Verification error:', error);
                  setError('Business verification failed. Please try again.');
                }}
              />
            </div>

            {/* Anti-Bot Protection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 text-lg">Security Verification</h3>
              
              {/* Rate Limit Warning */}
              <RateLimitWarning 
                attempts={failedAttempts} 
                maxAttempts={maxAttempts}
                resetTime={failedAttempts >= maxAttempts ? new Date(Date.now() + 30 * 60 * 1000) : undefined}
              />
              
              {/* Honeypot Field - Invisible to users, catches bots */}
              <HoneypotField onChange={setHoneypotValue} />
              
              {/* Behavioral Verification */}
              <BehavioralVerification onComplete={setBehavioralScore} />
              
              {/* reCAPTCHA */}
              <ReCaptcha 
                onVerify={setRecaptchaToken} 
                onError={() => setError('Security verification failed')}
                action="employer_signup"
              />
            </div>

            {/* Legal Agreements */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 text-lg">Legal Agreements</h3>
              
              {/* Employer Liability Agreement */}
              <EmployerLiabilityAgreement 
                accepted={liabilityAccepted} 
                onAccept={setLiabilityAccepted}
              />
              
              {/* Anti-Trafficking Policy */}
              <AntiTraffickingPolicy 
                accepted={trafficingPolicyAccepted} 
                onAccept={setTrafficingPolicyAccepted}
              />
              
              {/* Dispute Refund Policy */}
              <DisputeRefundPolicy 
                accepted={disputeRefundPolicyAccepted} 
                onAccept={setDisputeRefundPolicyAccepted}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : selectedPlan === 'free-contract' ? 'Create Free Account' : 'Continue to Payment'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => onNavigate('signin')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>

          {/* Demo Skip Button */}
          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate('employer-dashboard')}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium underline"
            >
              🎯 Skip to Demo Dashboard (No Signup Required)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}