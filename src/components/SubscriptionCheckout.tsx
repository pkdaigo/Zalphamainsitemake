import { useState } from 'react';
import { Crown, Zap, Rocket, CheckCircle, Tag, AlertCircle } from 'lucide-react';
import { PaymentProcessor } from './PaymentProcessor';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  icon: 'crown' | 'zap' | 'rocket';
  popular?: boolean;
  color: string;
}

interface SubscriptionCheckoutProps {
  userType: 'student' | 'employer';
  onSuccess: (subscriptionData: SubscriptionData) => void;
  onCancel?: () => void;
}

interface SubscriptionData {
  planId: string;
  planName: string;
  billingCycle: 'monthly' | 'yearly';
  amount: number;
  paymentId: string;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
}

export function SubscriptionCheckout({ userType, onSuccess, onCancel }: SubscriptionCheckoutProps) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showPayment, setShowPayment] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  // Subscription plans
  const employerPlans: SubscriptionPlan[] = [
    {
      id: 'emp-starter',
      name: 'Starter',
      price: 99,
      yearlyPrice: 990, // ~$82.50/mo (2 months free)
      description: 'Perfect for small businesses',
      icon: 'zap',
      color: 'blue',
      features: [
        '5 active job postings',
        'Access to verified student profiles',
        'Basic candidate filtering',
        'Email notifications',
        'Company profile page',
        'Application tracking',
      ],
    },
    {
      id: 'emp-professional',
      name: 'Professional',
      price: 249,
      yearlyPrice: 2490, // ~$207.50/mo (2 months free)
      description: 'For growing organizations',
      icon: 'crown',
      color: 'purple',
      popular: true,
      features: [
        '20 active job postings',
        'Priority in search results',
        'Advanced candidate filtering',
        'Skills assessment results',
        'Bulk messaging to candidates',
        'Analytics dashboard',
        'ZALPHA ATS integration',
        'Dedicated support',
      ],
    },
    {
      id: 'emp-ultra',
      name: 'Ultra Premium',
      price: 499,
      yearlyPrice: 4990, // ~$415.83/mo (2 months free)
      description: 'Maximum recruitment power',
      icon: 'rocket',
      color: 'orange',
      features: [
        'Unlimited job postings',
        'Featured employer badge',
        'Access to skills assessment data',
        'AI-powered candidate matching',
        'Custom branding',
        'API access',
        'White-label options',
        'Account manager',
        'Priority customer support',
      ],
    },
  ];

  const studentPlans: SubscriptionPlan[] = [
    {
      id: 'stu-ultra',
      name: 'Ultra Premium',
      price: 19.99,
      yearlyPrice: 199.90, // ~$16.66/mo (2 months free)
      description: 'Unlock premium features',
      icon: 'crown',
      color: 'purple',
      features: [
        'Priority application status',
        'Featured profile badge',
        'Transcript sharing with employers',
        'Access to gamified skills assessments',
        'Advanced job matching',
        'Resume templates',
        'Career coaching resources',
        'Early access to new jobs',
      ],
    },
  ];

  const plans = userType === 'employer' ? employerPlans : studentPlans;

  // Calculate discount for yearly billing
  const getYearlySavings = (plan: SubscriptionPlan) => {
    const monthlyTotal = plan.price * 12;
    const yearlySavings = monthlyTotal - plan.yearlyPrice;
    return yearlySavings;
  };

  // Apply coupon code
  const applyCoupon = () => {
    const validCodes: Record<string, number> = {
      'STUDENT15': 15, // 15% off
      'EMPLOYER25': 25, // 25% off
      'ZALPHA10': 10, // 10% off
    };

    const discount = validCodes[couponCode.toUpperCase()];
    if (discount) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount });
    } else {
      setAppliedCoupon(null);
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  // Calculate final price
  const calculateFinalPrice = (plan: SubscriptionPlan) => {
    const basePrice = billingCycle === 'monthly' ? plan.price : plan.yearlyPrice;
    if (appliedCoupon) {
      return basePrice * (1 - appliedCoupon.discount / 100);
    }
    return basePrice;
  };

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    if (!selectedPlan) return;

    const startDate = new Date();
    const endDate = new Date();
    
    if (billingCycle === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const subscriptionData: SubscriptionData = {
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      billingCycle,
      amount: calculateFinalPrice(selectedPlan),
      paymentId: paymentData.paymentId,
      startDate,
      endDate,
      autoRenew: true,
    };

    onSuccess(subscriptionData);
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'crown':
        return Crown;
      case 'zap':
        return Zap;
      case 'rocket':
        return Rocket;
      default:
        return CheckCircle;
    }
  };

  // If showing payment screen
  if (showPayment && selectedPlan) {
    const finalPrice = calculateFinalPrice(selectedPlan);
    const description = `${selectedPlan.name} - ${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'} Subscription`;

    return (
      <PaymentProcessor
        amount={finalPrice}
        description={description}
        planName={selectedPlan.name}
        billingCycle={billingCycle}
        onSuccess={handlePaymentSuccess}
        onCancel={() => setShowPayment(false)}
      />
    );
  }

  // Plan selection screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {userType === 'employer' ? 'Choose Your Plan' : 'Upgrade to Premium'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {userType === 'employer' 
              ? 'Find the perfect talent with the right tools'
              : 'Unlock premium features and stand out to employers'
            }
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                Save up to 17%
              </span>
            </button>
          </div>
        </div>

        {/* Coupon Code */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-lg shadow p-4 border-2 border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Have a coupon code?</h3>
            </div>
            {appliedCoupon ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">{appliedCoupon.code}</p>
                    <p className="text-sm text-green-700">{appliedCoupon.discount}% discount applied!</p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-sm text-red-600 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Plans */}
        <div className={`grid gap-8 mb-12 ${
          plans.length === 3 ? 'md:grid-cols-3' : 'max-w-md mx-auto'
        }`}>
          {plans.map((plan) => {
            const Icon = getIcon(plan.icon);
            const finalPrice = calculateFinalPrice(plan);
            const originalPrice = billingCycle === 'monthly' ? plan.price : plan.yearlyPrice;
            const yearlySavings = billingCycle === 'yearly' ? getYearlySavings(plan) : 0;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl shadow-xl p-8 border-4 transition-all hover:shadow-2xl ${
                  plan.popular
                    ? 'border-purple-500 relative'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${plan.color}-500 to-${plan.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  {appliedCoupon && (
                    <div className="mb-2">
                      <span className="text-2xl text-gray-400 line-through">${originalPrice}</span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      ${Math.round(finalPrice)}
                    </span>
                    <span className="text-gray-600">
                      {billingCycle === 'monthly' ? '/mo' : '/yr'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-green-600 font-semibold mt-2">
                      Save ${yearlySavings}/year!
                    </p>
                  )}
                  {appliedCoupon && (
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      {appliedCoupon.discount}% off applied
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                  }`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>

        {/* Free Plan for Students */}
        {userType === 'student' && (
          <div className="max-w-md mx-auto bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Free Plan</h3>
            <p className="text-gray-600 mb-4">Basic features at no cost</p>
            <ul className="space-y-2 mb-6 text-sm text-gray-700 text-left">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                <span>Create student profile</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                <span>Apply to jobs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                <span>Basic job search</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                <span>Company reviews</span>
              </li>
            </ul>
            <button
              onClick={onCancel}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Continue with Free
            </button>
          </div>
        )}

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-sm text-gray-600">
                Yes! You can cancel your subscription at any time. Your access will continue until the end of your 
                current billing period, with no additional charges.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-gray-600">
                We accept credit/debit cards (Visa, Mastercard, AmEx), PayPal, and cryptocurrency (Bitcoin, 
                Ethereum, USDC) for maximum flexibility.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-sm text-gray-600">
                Absolutely! You can change your plan at any time. Upgrades take effect immediately, while 
                downgrades take effect at the end of your current billing period.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-sm text-gray-600">
                We offer a 7-day money-back guarantee. If you're not satisfied within the first 7 days, 
                contact us for a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        {onCancel && (
          <div className="text-center mt-8">
            <button
              onClick={onCancel}
              className="text-gray-600 hover:text-gray-900 font-semibold"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}