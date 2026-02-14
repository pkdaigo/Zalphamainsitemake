import { Briefcase, DollarSign, Users, Search, Clock, ShieldCheck, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function EmployerFAQs() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0); // First FAQ open by default

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* FAQ 1: How does ZALPHA work for employers? */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-blue-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(0)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-6 h-6 text-blue-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">How does ZALPHA work for employers?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-blue-300 flex-shrink-0 transition-transform ${openFAQ === 0 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 0 ? 'max-h-[2000px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              ZALPHA connects you with <strong className="text-white">pre-screened, job-ready candidates</strong> from across the Pacific Islands through a simple subscription model:
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-3">
              <p className="font-bold text-white">🔹 Step 1: Create Your Company Profile</p>
              <p>Set up your business profile, add your logo, describe your company culture, and list open positions.</p>
              
              <p className="font-bold text-white mt-4">🔹 Step 2: Post Unlimited Jobs</p>
              <p>Create as many job listings as you need—entry-level, skilled trades, professional roles. No per-posting fees.</p>
              
              <p className="font-bold text-white mt-4">🔹 Step 3: Review Pre-Screened Candidates</p>
              <p>See applicants who have completed skills assessments relevant to your positions. View their verified abilities, not just résumés.</p>
              
              <p className="font-bold text-white mt-4">🔹 Step 4: Connect Directly</p>
              <p>Message candidates directly through the platform, schedule interviews, and make offers—all tracked on ZALPHA.</p>
              
              <p className="font-bold text-white mt-4">🔹 Step 5: Hire with Confidence</p>
              <p>Track your hiring pipeline, manage applications, and access support from the ZALPHA team throughout the process.</p>
            </div>
            
            <p className="text-white font-semibold">
              💡 <strong>Bottom line:</strong> We save you time on screening, money on postings, and reduce bad hires by connecting you with candidates who've already proven their skills.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 2: What's the pricing? */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-green-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(1)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6 text-green-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">What's the pricing structure?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-green-300 flex-shrink-0 transition-transform ${openFAQ === 1 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 1 ? 'max-h-[2500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            {/* BETA FREEMIUM HIGHLIGHT */}
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-2xl p-6 border-4 border-yellow-300 shadow-2xl mb-6">
              <div className="text-center">
                <div className="inline-block bg-white px-4 py-2 rounded-full mb-3">
                  <p className="text-lg font-black bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                    🎉 BETA LAUNCH SPECIAL 🎉
                  </p>
                </div>
                <h4 className="text-3xl font-black text-white mb-3">
                  Get 3 Months FREE!
                </h4>
                <p className="text-xl text-white/95 mb-4">
                  Sign up during our beta period and receive <strong className="text-yellow-300">3 months of access absolutely FREE</strong> — no credit card required!
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-2xl mb-1">✅</p>
                    <p className="text-white text-sm font-semibold">All Features</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-2xl mb-1">🎁</p>
                    <p className="text-white text-sm font-semibold">No Payment</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-2xl mb-1">💡</p>
                    <p className="text-white text-sm font-semibold">Shape It</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-2xl mb-1">🚀</p>
                    <p className="text-white text-sm font-semibold">Zero Risk</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm italic">
                  After 3 months, choose to continue with a paid plan or cancel — no obligations!
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-6 border border-green-400/30">
              <p className="text-3xl font-bold text-white mb-2">💰 Low Monthly Subscription: $29/month</p>
              <p className="text-lg text-white/90 mb-4">Simple, affordable base plan with all core features</p>
              <div className="mt-4 space-y-2 text-white/90">
                <p>✅ Unlimited job postings</p>
                <p>✅ Access to entire student database</p>
                <p>✅ Basic application tracking</p>
                <p>✅ Company profile page</p>
                <p>✅ Direct messaging with applicants</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-blue-400/30">
              <p className="text-2xl font-bold text-white mb-4">💳 Pay-As-You-Go Add-Ons:</p>
              <p className="text-white/90 mb-4">Choose only the services you need. No forced premium tiers.</p>
              <div className="grid md:grid-cols-2 gap-3 text-white/90">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-white">Pre-screened candidate verification</p>
                  <p className="text-2xl font-bold text-green-300">$5 <span className="text-sm font-normal text-white/70">per candidate</span></p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-white">Priority job placement</p>
                  <p className="text-2xl font-bold text-green-300">$15 <span className="text-sm font-normal text-white/70">per posting</span></p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-white">Advanced analytics report</p>
                  <p className="text-2xl font-bold text-green-300">$25 <span className="text-sm font-normal text-white/70">per month</span></p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-white">AI video interview (powered by Zal)</p>
                  <p className="text-2xl font-bold text-green-300">$10 <span className="text-sm font-normal text-white/70">per interview</span></p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-white">Skills assessment custom requests</p>
                  <p className="text-2xl font-bold text-green-300">$20 <span className="text-sm font-normal text-white/70">per assessment</span></p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-white">Virtual job fair participation</p>
                  <p className="text-2xl font-bold text-green-300">$99 <span className="text-sm font-normal text-white/70">per event</span></p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-white">Dedicated account support</p>
                  <p className="text-2xl font-bold text-green-300">$49 <span className="text-sm font-normal text-white/70">per month</span></p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/20 rounded-lg p-5 border border-yellow-400/40">
              <p className="text-yellow-300 font-bold text-xl mb-3">💡 Why this model works:</p>
              <p className="text-white/95 mb-2">
                Pay only for what you need. Start small with basic features and scale up as you grow. No forced premium tiers—you choose your features.
              </p>
            </div>

            <p className="text-white font-semibold mt-4">
              📊 <strong>Compare to alternatives:</strong> Traditional job boards charge $200-$500 PER posting. Recruiters charge $5,000-$15,000 PER hire. With ZALPHA, you pay a low base rate and add only the services you use.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 3: How do you screen candidates? */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-purple-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(2)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-purple-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">How do you screen candidates? Are they actually qualified?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-purple-300 flex-shrink-0 transition-transform ${openFAQ === 2 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 2 ? 'max-h-[2500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">Great question—this is where ZALPHA is fundamentally different from traditional job boards.</strong> We don't just collect résumés and hope for the best. Here's our screening process:
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-4">
              <div>
                <p className="font-bold text-white">🎮 1. Gamified Skills Assessments</p>
                <p>Students complete interactive, job-specific assessments that test real abilities:</p>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• Customer service scenarios and communication skills</li>
                  <li>• Math and problem-solving for retail/cashier roles</li>
                  <li>• Technical skills for IT and trades positions</li>
                  <li>• Workplace professionalism and soft skills</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white">✅ 2. Verified Skill Badges</p>
                <p>Students earn badges by passing assessments. You see exactly which skills they've demonstrated, not what they claim on a résumé.</p>
              </div>

              <div>
                <p className="font-bold text-white">📊 3. Performance Scoring</p>
                <p>Each student has performance scores across key competencies. You can filter candidates by minimum score thresholds for your requirements.</p>
              </div>

              <div>
                <p className="font-bold text-white">🎓 4. Educational Verification</p>
                <p>We partner with schools and institutions to verify enrollment and completion status—no fake credentials.</p>
              </div>

              <div>
                <p className="font-bold text-white">🤖 5. AI Chatbot "Zee" Pre-Screening</p>
                <p>Zee helps students prepare applications, ensures they understand job requirements, and guides them to positions that match their abilities.</p>
              </div>

              <div>
                <p className="font-bold text-white">🚦 6. Application Quality Filters</p>
                <p>Our system flags incomplete applications, ensures students meet basic requirements, and prioritizes serious candidates.</p>
              </div>
            </div>
            
            <p className="text-white font-semibold">
              🎯 <strong>Result:</strong> You receive applications from candidates who've proven they can do the work, not just people who clicked "Apply" 500 times across the internet. This dramatically reduces wasted time on unqualified candidates.
            </p>

            <p className="text-white/90 italic mt-4">
              Note: We're in BETA, so we're continuously improving our screening algorithms based on employer feedback. If you hire someone who doesn't work out, let us know—we use that data to refine our matching.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 4: How long does it take to fill positions? */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-orange-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(3)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-orange-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">How long does it typically take to fill a position?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-orange-300 flex-shrink-0 transition-transform ${openFAQ === 3 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 3 ? 'max-h-[2500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">Honest answer: It depends on the role, your requirements, and the current talent pool.</strong> But here's what we're seeing in beta testing:
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-4">
              <div>
                <p className="font-bold text-green-300">⚡ Entry-Level Positions (Retail, Food Service, Hospitality):</p>
                <p><strong className="text-white">1-2 weeks average</strong></p>
                <p className="text-white/80">These roles have the largest talent pool of job-ready students and recent graduates.</p>
              </div>

              <div>
                <p className="font-bold text-blue-300">🔧 Skilled Trades & Technical Roles:</p>
                <p><strong className="text-white">2-4 weeks average</strong></p>
                <p className="text-white/80">More specialized skills take longer, but pre-screening significantly reduces time vs. traditional hiring.</p>
              </div>

              <div>
                <p className="font-bold text-purple-300">👔 Professional & Management Positions:</p>
                <p><strong className="text-white">3-6 weeks average</strong></p>
                <p className="text-white/80">Higher-level roles require more extensive vetting, but you get higher-quality candidates faster than general job boards.</p>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">📊 Compare to Traditional Hiring:</p>
              <p className="text-white/90">
                Traditional hiring on the Pacific Islands takes <strong className="text-white">8-12 weeks on average</strong> due to:
              </p>
              <ul className="ml-6 mt-2 space-y-1 text-white/80">
                <li>• Weeks spent posting on multiple platforms</li>
                <li>• Days sorting through unqualified applications</li>
                <li>• Multiple rounds of screening and interviews</li>
                <li>• Back-to-square-one when top candidates don't work out</li>
              </ul>
              <p className="text-green-300 font-bold mt-3">
                ✅ ZALPHA cuts this timeline by 50-70% on average by delivering pre-qualified candidates from day one.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🚀 Want to hire faster? Pro tips:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Clear job descriptions:</strong> Be specific about requirements and expectations</li>
                <li>• <strong className="text-white">Competitive pay:</strong> Transparent salary ranges attract more applicants</li>
                <li>• <strong className="text-white">Quick response times:</strong> Message candidates within 24-48 hours</li>
                <li>• <strong className="text-white">Flexible requirements:</strong> Consider "trainable" vs. "must have experience"</li>
                <li>• <strong className="text-white">Upgrade to Premium:</strong> Priority placement gets you seen first</li>
              </ul>
            </div>

            <p className="text-white/90 italic mt-4">
              <strong className="text-white">Beta reality check:</strong> These are current averages. As more students and employers join ZALPHA, we expect time-to-hire to decrease further. Help us grow by spreading the word!
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 5: What types of businesses use ZALPHA? */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-cyan-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(4)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-cyan-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">What types of businesses use ZALPHA?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-cyan-300 flex-shrink-0 transition-transform ${openFAQ === 4 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 4 ? 'max-h-[2500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">ZALPHA works for ANY business that hires Pacific Islands-based talent.</strong> Our current beta users include:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 rounded-lg p-5 border border-blue-400/30">
                <p className="font-bold text-white mb-2">🏨 Hospitality & Tourism</p>
                <ul className="ml-4 space-y-1 text-white/80 text-base">
                  <li>• Hotels and resorts</li>
                  <li>• Restaurants and cafes</li>
                  <li>• Tour operators</li>
                  <li>• Event venues</li>
                </ul>
              </div>

              <div className="bg-green-500/10 rounded-lg p-5 border border-green-400/30">
                <p className="font-bold text-white mb-2">🛒 Retail & Sales</p>
                <ul className="ml-4 space-y-1 text-white/80 text-base">
                  <li>• Retail stores</li>
                  <li>• Supermarkets</li>
                  <li>• Boutiques and specialty shops</li>
                  <li>• Sales and distribution</li>
                </ul>
              </div>

              <div className="bg-orange-500/10 rounded-lg p-5 border border-orange-400/30">
                <p className="font-bold text-white mb-2">🔧 Trades & Construction</p>
                <ul className="ml-4 space-y-1 text-white/80 text-base">
                  <li>• Construction companies</li>
                  <li>• Electricians and plumbers</li>
                  <li>• HVAC services</li>
                  <li>• Landscaping and maintenance</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 rounded-lg p-5 border border-purple-400/30">
                <p className="font-bold text-white mb-2">💼 Professional Services</p>
                <ul className="ml-4 space-y-1 text-white/80 text-base">
                  <li>• Accounting firms</li>
                  <li>• Law offices</li>
                  <li>• Marketing agencies</li>
                  <li>• IT services</li>
                </ul>
              </div>

              <div className="bg-pink-500/10 rounded-lg p-5 border border-pink-400/30">
                <p className="font-bold text-white mb-2">🏥 Healthcare & Wellness</p>
                <ul className="ml-4 space-y-1 text-white/80 text-base">
                  <li>• Clinics and hospitals</li>
                  <li>• Dental offices</li>
                  <li>• Fitness centers</li>
                  <li>• Care facilities</li>
                </ul>
              </div>

              <div className="bg-teal-500/10 rounded-lg p-5 border border-teal-400/30">
                <p className="font-bold text-white mb-2">🏛️ Government & Non-Profits</p>
                <ul className="ml-4 space-y-1 text-white/80 text-base">
                  <li>• Government agencies</li>
                  <li>• Non-profit organizations</li>
                  <li>• Community services</li>
                  <li>• Educational support</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-5 border border-blue-400/30 mt-4">
              <p className="font-bold text-white mb-2">📏 Business Size Doesn't Matter:</p>
              <p className="text-white/90">
                Whether you're a <strong className="text-white">single small business hiring 1-2 people</strong> or a <strong className="text-white">large enterprise filling dozens of positions across multiple locations</strong>, ZALPHA scales to your needs.
              </p>
              <p className="text-white/90 mt-2">
                Our pricing is designed to be accessible for <strong className="text-white">mom-and-pop shops</strong> while offering advanced features for <strong className="text-white">large organizations</strong> through tiered subscriptions.
              </p>
            </div>

            <p className="text-white font-semibold">
              🌴 <strong>Bottom line:</strong> If you hire people in the Pacific Islands, ZALPHA can help you find them faster, cheaper, and with better quality than traditional methods.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 6: Can I try before committing? */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-yellow-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(5)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Search className="w-6 h-6 text-yellow-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">Can I try ZALPHA before fully committing?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-yellow-300 flex-shrink-0 transition-transform ${openFAQ === 5 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 5 ? 'max-h-[2000px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">Absolutely!</strong> We understand that you need to see results before investing long-term. Here's how you can test ZALPHA:
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-4">
              <div>
                <p className="font-bold text-green-300">✅ Option 1: Start with 1 Month ($99)</p>
                <p>Subscribe for a single month, post your jobs, and see the quality of candidates you receive. No long-term contract required—cancel anytime.</p>
              </div>

              <div>
                <p className="font-bold text-blue-300">✅ Option 2: 3-Month Trial ($297 total)</p>
                <p>Give us a full quarter to demonstrate value. This gives you time to post multiple positions, evaluate candidates, and make hires.</p>
              </div>

              <div>
                <p className="font-bold text-purple-300">✅ Option 3: Free Employer Profile</p>
                <p>Create a free profile to browse the platform, see available candidates (limited view), and explore features before subscribing.</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🤝 Our Beta Promise:</p>
              <p className="text-white/90">
                We're currently in BETA testing, which means we're working directly with early adopters to refine the platform. 
                <strong className="text-white"> If you join during beta and give us honest feedback, we'll work with you personally to ensure success.</strong>
              </p>
              <p className="text-white/90 mt-2">
                Not happy with the results in your first month? Let us know what's not working, and we'll help troubleshoot—or offer a refund if we can't deliver value.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">💬 Still Hesitant? Talk to Us First:</p>
              <p className="text-white/90">
                Before you spend a dollar, reach out to the ZALPHA team. We'll:
              </p>
              <ul className="ml-6 mt-2 space-y-1 text-white/80">
                <li>• Walk you through the platform</li>
                <li>• Discuss your specific hiring needs</li>
                <li>• Show you examples of candidate profiles</li>
                <li>• Answer any questions or concerns</li>
                <li>• Provide realistic expectations for your industry/role</li>
              </ul>
            </div>

            <p className="text-white font-semibold mt-4">
              🎯 <strong>No pressure, no BS:</strong> We'd rather have businesses join when they're confident ZALPHA will work for them than push subscriptions and disappoint people. Try it, test it, and decide for yourself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}