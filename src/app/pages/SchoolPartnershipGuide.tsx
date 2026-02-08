import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { Building2, Users, DollarSign, Award, CheckCircle, TrendingUp, BarChart3, Calendar, MessageSquare, Shield, FileText, Zap, Target, Heart, Globe, Sparkles, ArrowRight, ChevronDown, ChevronUp, BookOpen, GraduationCap, Briefcase, Star } from 'lucide-react';

interface SchoolPartnershipGuideProps {
  onNavigate: (page: string) => void;
}

export function SchoolPartnershipGuide({ onNavigate }: SchoolPartnershipGuideProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Back Button */}
        <BackButton onNavigate={onNavigate} label="Back" />

        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold">
            <Building2 className="w-4 h-4" />
            School Partnership Guide
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900">
            Partner with ZALPHA 🎓
          </h1>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto">
            Join 100+ Pacific Island schools helping students launch successful careers while earning revenue share and tracking placement success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('school-login')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-2xl transition-all font-bold text-lg inline-flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-6 h-6" />
              Become a Partner
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('school-dashboard-demo')}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-xl transition-all font-bold text-lg inline-flex items-center justify-center gap-2 border-2 border-blue-200"
            >
              <BarChart3 className="w-6 h-6" />
              View Dashboard Demo
            </button>
          </div>
        </div>

        {/* What is ZALPHA */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-200 p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">What is ZALPHA?</h2>
          <div className="max-w-4xl mx-auto space-y-4 text-lg text-slate-700">
            <p>
              <strong>ZALPHA</strong> is the Pacific's first and only ADA-compliant job connection platform specifically designed for college students and high school graduates across Pacific Islands.
            </p>
            <p>
              We connect your students with employers throughout the Pacific region while providing your school with powerful analytics, placement tracking, and <strong>revenue sharing opportunities</strong>.
            </p>
            <p className="text-blue-600 font-semibold">
              Every student who signs up through your school generates revenue for your institution while receiving world-class career support!
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: DollarSign,
                title: 'Revenue Sharing',
                desc: 'Earn a percentage of every student subscription from your school. The more students who join, the more your school earns!',
                color: 'green'
              },
              {
                icon: BarChart3,
                title: 'Real-Time Analytics',
                desc: 'Track student signups, job applications, placements, and employment outcomes through your dedicated school dashboard.',
                color: 'blue'
              },
              {
                icon: Award,
                title: 'Boost Career Services',
                desc: 'Supplement your career services office with AI-powered tools, virtual job fairs, and direct employer connections.',
                color: 'purple'
              },
              {
                icon: TrendingUp,
                title: 'Improve Placement Rates',
                desc: 'Better job placement rates mean higher rankings, more applications, and stronger alumni networks.',
                color: 'orange'
              },
              {
                icon: Calendar,
                title: 'Virtual Job Fairs',
                desc: 'Host unlimited virtual job and college fairs on our platform. No physical space or logistics required!',
                color: 'cyan'
              },
              {
                icon: Shield,
                title: 'FERPA Compliant',
                desc: 'Full FERPA compliance ensures student data privacy and security. 18+ age-gated with government ID verification.',
                color: 'red'
              },
              {
                icon: Users,
                title: 'Student Success Tools',
                desc: 'Your students get AI resume builders, interview practice, skills assessments, and direct employer messaging.',
                color: 'pink'
              },
              {
                icon: Globe,
                title: 'Pacific-Wide Network',
                desc: 'Connect your students with employers across all Pacific Islands - Guam, Saipan, Hawaii, Palau, and beyond.',
                color: 'teal'
              }
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className={`bg-white rounded-2xl shadow-lg border-2 border-${benefit.color}-200 p-6 hover:shadow-xl transition-all`}>
                  <div className={`w-14 h-14 bg-${benefit.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 text-${benefit.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partnership Tiers */}
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Partnership Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Basic Partner */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-300 p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic Partner</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">FREE</div>
                <div className="text-sm text-slate-600">Get Started Today</div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'School dashboard access',
                  'Basic analytics & reporting',
                  'Student signup tracking',
                  '10% revenue share',
                  'Virtual job fair hosting (2/year)',
                  'Email support'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate('school-login')}
                className="w-full py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-all font-bold"
              >
                Get Started Free
              </button>
            </div>

            {/* Premium Partner */}
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-blue-400 p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Premium Partner</h3>
                <div className="text-4xl font-bold text-blue-600 mb-1">$499/mo</div>
                <div className="text-sm text-slate-600">or $4,990/year (save 17%)</div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Everything in Basic',
                  'Advanced analytics dashboard',
                  'Custom branding options',
                  '15% revenue share',
                  'Unlimited virtual job fairs',
                  'Priority employer connections',
                  'Dedicated account manager',
                  'Phone & email support',
                  'Monthly strategy calls'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate('school-login')}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-xl transition-all font-bold"
              >
                Upgrade to Premium
              </button>
            </div>

            {/* Enterprise Partner */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-purple-300 p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise Partner</h3>
                <div className="text-4xl font-bold text-purple-600 mb-1">Custom</div>
                <div className="text-sm text-slate-600">Contact for Pricing</div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Everything in Premium',
                  'White-label options',
                  'API access for integrations',
                  '20% revenue share',
                  'Custom features & development',
                  'Multi-campus support',
                  'SLA guarantees',
                  'Dedicated technical team',
                  'On-site training & workshops'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => alert('Contact: schools@zalpharecruit.com for Enterprise pricing')}
                className="w-full py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-all font-bold"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Revenue Sharing Breakdown */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-8 text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">Revenue Sharing Explained 💰</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xl text-white/90 text-center">
              Your school earns a percentage of every student subscription fee. Here's how it works:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-5xl font-bold mb-2">10%</div>
                <div className="text-white/90 font-semibold mb-4">Basic Partners</div>
                <div className="text-sm text-white/80">
                  If 1,000 students @ $9.99/mo<br />
                  = <strong className="text-2xl">$999/month</strong>
                </div>
              </div>

              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-white/50">
                <div className="text-5xl font-bold mb-2">15%</div>
                <div className="text-white/90 font-semibold mb-4">Premium Partners</div>
                <div className="text-sm text-white/80">
                  If 1,000 students @ $9.99/mo<br />
                  = <strong className="text-2xl">$1,499/month</strong>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-5xl font-bold mb-2">20%</div>
                <div className="text-white/90 font-semibold mb-4">Enterprise Partners</div>
                <div className="text-sm text-white/80">
                  If 1,000 students @ $9.99/mo<br />
                  = <strong className="text-2xl">$1,999/month</strong>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="font-bold text-xl mb-3 text-center">📊 Revenue Share Calculation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-white/20">
                  <span>Student signs up through your school</span>
                  <span className="font-bold">$9.99/month</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/20">
                  <span>Your school's share (15% Premium)</span>
                  <span className="font-bold">$1.50/month per student</span>
                </div>
                <div className="flex justify-between py-2 text-lg font-bold">
                  <span>1,000 students = </span>
                  <span className="text-2xl">$1,499/month</span>
                </div>
                <div className="text-center text-white/80 mt-4">
                  💡 <strong>That's $17,988/year in passive revenue!</strong>
                </div>
              </div>
            </div>

            <p className="text-center text-white/90 italic">
              Revenue is paid monthly via direct deposit. No minimums, no hidden fees, completely transparent.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 p-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">How Partnership Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                icon: FileText,
                title: 'Sign Partnership Agreement',
                desc: 'Complete our simple online partnership form. Takes 5 minutes, no legal fees.',
                color: 'blue'
              },
              {
                step: '2',
                icon: GraduationCap,
                title: 'Get Your School Code',
                desc: 'Receive a unique school code for students to use during signup. Tracks all referrals.',
                color: 'purple'
              },
              {
                step: '3',
                icon: Users,
                title: 'Promote to Students',
                desc: 'Share ZALPHA with students via email, career fairs, orientation, and advisors.',
                color: 'green'
              },
              {
                step: '4',
                icon: DollarSign,
                title: 'Earn Revenue & Track Success',
                desc: 'Watch your dashboard fill with student signups, placements, and monthly revenue!',
                color: 'orange'
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="text-center">
                  <div className={`w-20 h-20 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 relative`}>
                    <Icon className={`w-10 h-10 text-${step.color}-600`} />
                    <div className={`absolute -top-2 -right-2 w-10 h-10 bg-${step.color}-500 text-white rounded-full flex items-center justify-center font-bold text-lg`}>
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* What Students Get */}
        <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl shadow-2xl p-8 text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">What Your Students Get</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Briefcase, title: 'Direct Employer Access', desc: 'Message employers, apply to jobs, and attend virtual fairs' },
              { icon: Target, title: 'Skills Assessments', desc: 'Gamified tests that earn badges and showcase abilities' },
              { icon: MessageSquare, title: 'AI Career Coach "Zee"', desc: '24/7 chatbot for resume help, interview prep, career advice' },
              { icon: Award, title: 'Profile Builder', desc: 'Professional profiles with video intros and skill showcases' },
              { icon: Calendar, title: 'Interview Practice', desc: 'AI-powered mock interviews with real-time feedback' },
              { icon: Heart, title: 'Student Privacy Control', desc: 'Full control over what employers see (FERPA compliant)' }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <Icon className="w-10 h-10 mb-3" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/90 text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 p-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Partner Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                school: 'University of Guam',
                logo: '🏛️',
                students: '3,200',
                revenue: '$4,800/mo',
                placement: '96%',
                quote: 'ZALPHA transformed our career services. Our placement rates increased 22% in the first year!'
              },
              {
                school: 'Pacific Islands University',
                logo: '🎓',
                students: '2,847',
                revenue: '$4,270/mo',
                placement: '94%',
                quote: 'The revenue share helps fund our career center while students get amazing job opportunities.'
              },
              {
                school: 'Northern Marianas College',
                logo: '🌺',
                students: '1,450',
                revenue: '$2,175/mo',
                placement: '91%',
                quote: 'Virtual job fairs saved us thousands in logistics while connecting students with more employers!'
              }
            ].map((story, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-2">{story.logo}</div>
                  <h3 className="font-bold text-lg text-slate-900">{story.school}</h3>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="font-bold text-blue-600">{story.students}</div>
                    <div className="text-xs text-slate-600">Students</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="font-bold text-green-600">{story.revenue}</div>
                    <div className="text-xs text-slate-600">Revenue</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="font-bold text-purple-600">{story.placement}</div>
                    <div className="text-xs text-slate-600">Placement</div>
                  </div>
                </div>
                <p className="text-sm text-slate-700 italic">"{story.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 p-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: 'Is there a setup fee or contract?',
                a: 'No setup fees for Basic partners (free forever). Premium and Enterprise have monthly/annual subscriptions. No long-term contracts - cancel anytime with 30 days notice.'
              },
              {
                q: 'How do students sign up with our school code?',
                a: 'Students enter your unique school code during registration. This automatically links them to your institution and starts revenue sharing. You can track all signups in your dashboard.'
              },
              {
                q: 'When do we receive revenue payments?',
                a: 'Revenue is calculated monthly based on active student subscriptions. Payments are processed on the 15th of each month via direct deposit or check.'
              },
              {
                q: 'Is ZALPHA FERPA compliant?',
                a: 'Yes! We are fully FERPA compliant. Students have complete control over their data, and we never share information with third parties without explicit consent. All users must be 18+ with government ID verification.'
              },
              {
                q: 'Can we customize the platform with our branding?',
                a: 'Premium partners get custom branding options (colors, logos). Enterprise partners can get full white-label solutions with custom domains and extensive branding.'
              },
              {
                q: 'What kind of support do we get?',
                a: 'Basic partners get email support. Premium partners get dedicated account managers and monthly strategy calls. Enterprise partners get a full technical team and on-site training.'
              },
              {
                q: 'How do virtual job fairs work?',
                a: 'Host unlimited virtual job fairs (Premium+) directly on ZALPHA. Employers set up booths, students join video calls, live chat, and apply for jobs - all tracked in your dashboard!'
              },
              {
                q: 'What if our students already have profiles?',
                a: 'Existing students can link their accounts to your school using your school code. They\'ll be added to your dashboard and you\'ll earn revenue share going forward.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="border-2 border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-all"
                >
                  <span className="font-bold text-slate-900 text-left">{faq.q}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="p-4 bg-white border-t-2 border-slate-200">
                    <p className="text-slate-700">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-3xl shadow-2xl p-12 text-white text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Partner? 🚀</h2>
          <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join the fastest-growing career platform in the Pacific Islands. Help your students succeed while earning revenue for your school!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('school-login')}
              className="px-10 py-5 bg-white text-blue-600 rounded-xl hover:bg-slate-100 transition-all font-bold text-xl inline-flex items-center justify-center gap-3"
            >
              <GraduationCap className="w-7 h-7" />
              Sign Up Now
              <ArrowRight className="w-6 h-6" />
            </button>
            <button
              onClick={() => onNavigate('school-dashboard-demo')}
              className="px-10 py-5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-bold text-xl inline-flex items-center justify-center gap-3"
            >
              <BarChart3 className="w-7 h-7" />
              View Demo Dashboard
            </button>
          </div>
          <div className="mt-8 text-white/80">
            <p>Questions? Email <a href="mailto:schools@zalpharecruit.com" className="underline font-bold">schools@zalpharecruit.com</a> or call 670-286-3010</p>
          </div>
        </div>
      </div>
    </div>
  );
}