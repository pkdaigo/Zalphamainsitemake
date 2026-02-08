import { GraduationCap, Lock, Eye, MessageSquare, Trophy, HelpCircle, Globe, UserCheck, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface StudentFAQsProps {
  onNavigate: (page: string) => void;
}

export function StudentFAQs({ onNavigate }: StudentFAQsProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0); // First FAQ open by default

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* GENERAL QUESTIONS SECTION */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border-2 border-cyan-400/50">
        <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Globe className="w-8 h-8 text-cyan-300" />
          General Eligibility Questions
        </h3>
        <p className="text-white/80 text-lg">Essential questions about who can use ZALPHA</p>
      </div>

      {/* FAQ 1: Citizenship Requirements */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-cyan-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(0)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Globe className="w-6 h-6 text-cyan-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">Do I need to be a U.S. citizen to use ZALPHA?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-cyan-300 flex-shrink-0 transition-transform ${openFAQ === 0 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 0 ? 'max-h-[3000px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">No, you do NOT need to be a U.S. citizen!</strong> ZALPHA serves the entire Pacific Islands region, and we welcome students and graduates with various citizenship and residency statuses.
            </p>
            
            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-5">
              <p className="font-bold text-white mb-3">✅ Who Can Use ZALPHA:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">U.S. Citizens</strong> (from any of the 50 states or territories)</li>
                <li>• <strong className="text-white">U.S. Permanent Residents</strong> (Green Card holders)</li>
                <li>• <strong className="text-white">Citizens of CNMI</strong> (Northern Mariana Islands)</li>
                <li>• <strong className="text-white">Citizens of Guam</strong></li>
                <li>• <strong className="text-white">Citizens of U.S. Virgin Islands</strong></li>
                <li>• <strong className="text-white">Citizens of American Samoa</strong></li>
                <li>• <strong className="text-white">Citizens of Palau</strong></li>
                <li>• <strong className="text-white">Citizens of Federated States of Micronesia (FSM)</strong></li>
                <li>• <strong className="text-white">Citizens of Marshall Islands</strong></li>
                <li>• <strong className="text-white">Students with valid work authorization</strong> (F-1 OPT, CPT, H-1B, etc.)</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🌴 Pacific Islands Special Status:</p>
              <p className="text-white/90">
                If you're from <strong className="text-white">Palau, FSM, or Marshall Islands</strong>, you have special access to work in the U.S. under the Compact of Free Association (COFA). ZALPHA employers understand this and many actively recruit from these regions!
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">📋 What You'll Need to Verify:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Valid government-issued ID</strong> from your country/territory</li>
                <li>• <strong className="text-white">Proof of work authorization</strong> (if applicable—COFA citizens automatically have this)</li>
                <li>• <strong className="text-white">Student status verification</strong> (school enrollment or graduation proof)</li>
                <li>• <strong className="text-white">Be 18+ years old</strong> (age requirement for platform access)</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">⚠️ Employer-Specific Requirements:</p>
              <p className="text-white/90">
                While ZALPHA welcomes all Pacific Islands residents, <strong className="text-white">individual employers may have citizenship or work authorization requirements</strong> for specific positions. Job listings will clearly state these requirements, so you can focus on opportunities you qualify for.
              </p>
            </div>

            <p className="text-white font-semibold mt-4">
              🌏 <strong>Bottom line:</strong> ZALPHA is designed for the diverse Pacific Islands community. Your citizenship status won't prevent you from creating an account—just make sure you meet the work authorization requirements for jobs you apply to!
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 2: Not Currently in School */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-purple-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(1)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <UserCheck className="w-6 h-6 text-purple-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">What if I'm NOT currently in school? Can I still sign up?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-purple-300 flex-shrink-0 transition-transform ${openFAQ === 1 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 1 ? 'max-h-[4000px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">Yes! You can absolutely sign up if you're not currently enrolled in school.</strong> ZALPHA serves both current students AND recent graduates (within 5 years of graduation).
            </p>
            
            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-5">
              <p className="font-bold text-white mb-3">✅ Who Qualifies as a "Student" on ZALPHA:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Current high school students</strong> (age 18+)</li>
                <li>• <strong className="text-white">Current college/university students</strong> (any year, any major)</li>
                <li>• <strong className="text-white">Current vocational/trade school students</strong></li>
                <li>• <strong className="text-white">Recent high school graduates</strong> (graduated within the last 5 years)</li>
                <li>• <strong className="text-white">Recent college graduates</strong> (graduated within the last 5 years)</li>
                <li>• <strong className="text-white">Recent vocational/trade school graduates</strong> (graduated within the last 5 years)</li>
                <li>• <strong className="text-white">GED holders</strong> (obtained within the last 5 years)</li>
                <li>• <strong className="text-white">18-year-olds who just graduated</strong> and are entering the workforce (even if not planning to attend college)</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🎓 "I graduated more than 5 years ago. Can I still use ZALPHA?"</p>
              <p className="text-white/90">
                Unfortunately, no. ZALPHA is specifically designed for <strong className="text-white">students and recent graduates (Gen Z and Alpha generations)</strong>. Our platform focuses on:
              </p>
              <ul className="ml-6 mt-2 space-y-1 text-white/80">
                <li>• First-time job seekers</li>
                <li>• Entry-level positions</li>
                <li>• Recent graduates building their careers</li>
                <li>• Young adults (typically ages 18-27)</li>
              </ul>
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 rounded-xl p-5 mt-4">
                <p className="text-white/90 mb-3">
                  <strong className="text-cyan-300">🚀 Good news!</strong> We have another platform specifically for experienced professionals that we're rolling out soon!
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('experienced-professionals-coming-soon');
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>✉️ Sign Up for Early Access</span>
                </button>
                <p className="text-cyan-200 text-sm mt-2 text-center">
                  Be the first to know when we launch!
                </p>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">📝 What You'll Need to Verify (If Not Currently Enrolled):</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Diploma or transcript</strong> showing your graduation date</li>
                <li>• <strong className="text-white">GED certificate</strong> (if applicable) with date issued</li>
                <li>• <strong className="text-white">Proof of age</strong> (government ID showing you're 18+)</li>
              </ul>
              <p className="text-white/90 mt-3">
                ZALPHA will verify your graduation date during signup. As long as it's within the last 5 years, you're good to go!
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🚀 Special Case: 18-Year-Old High School Graduates</p>
              <p className="text-white/90">
                If you <strong className="text-white">just graduated high school at age 18 and aren't planning to attend college right away</strong>, ZALPHA is PERFECT for you! We specifically cater to:
              </p>
              <ul className="ml-6 mt-2 space-y-1 text-white/80">
                <li>• Recent grads entering the workforce immediately</li>
                <li>• Students taking gap years</li>
                <li>• Students working before college</li>
                <li>• Students pursuing trades or vocational careers</li>
              </ul>
              <p className="text-white/90 mt-3">
                You're our core demographic! Sign up and start building your career TODAY.
              </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">💼 "What if I have work experience already?"</p>
              <p className="text-white/90">
                <strong className="text-white">That's great!</strong> ZALPHA welcomes recent graduates with work experience. Your work history will make your profile even stronger. Just make sure you meet the graduation timeline requirement (within 5 years).
              </p>
            </div>

            <p className="text-white font-semibold mt-4">
              ✅ <strong>Bottom line:</strong> You don't need to be actively enrolled in school—you just need to be a recent graduate (within 5 years) OR a current student. ZALPHA bridges the gap between education and employment for young Pacific Islanders!
            </p>
          </div>
        </div>
      </div>

      {/* PLATFORM FEATURES SECTION */}
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border-2 border-green-400/50 mt-8">
        <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-green-300" />
          Platform Features & Getting Started
        </h3>
        <p className="text-white/80 text-lg">Everything you need to know about using ZALPHA</p>
      </div>

      {/* FAQ 3: How do I get started */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-green-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(2)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-green-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">How do I get started on ZALPHA as a student?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-green-300 flex-shrink-0 transition-transform ${openFAQ === 2 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 2 ? 'max-h-[2500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">Getting started is easy and completely FREE for students!</strong> Here's your step-by-step guide:
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-3">
              <div>
                <p className="font-bold text-white">🔹 Step 1: Create Your Account (5 minutes)</p>
                <p>Sign up with your email, create a password, and verify your student status through your school or by uploading proof of enrollment/graduation (diploma, transcript, student ID).</p>
              </div>
              
              <div>
                <p className="font-bold text-white">🔹 Step 2: Build Your Profile (10-15 minutes)</p>
                <p>Add basic info: name, location, education, interests, and career goals. No fancy résumé needed—just be yourself!</p>
              </div>
              
              <div>
                <p className="font-bold text-white">🔹 Step 3: Take Skills Assessments (30-60 minutes)</p>
                <p>Complete gamified assessments in areas you're interested in—customer service, math, tech skills, communication, etc. These help you earn badges and show employers what you can do.</p>
              </div>
              
              <div>
                <p className="font-bold text-white">🔹 Step 4: Browse Jobs & Apply (Ongoing)</p>
                <p>Search for positions that match your skills and interests. Apply directly through ZALPHA with one click—your verified skills speak for themselves!</p>
              </div>
              
              <div>
                <p className="font-bold text-white">🔹 Step 5: Connect with Employers (When they reach out)</p>
                <p>Respond to messages from interested employers, schedule interviews, and negotiate offers—all tracked on the platform.</p>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5">
              <p className="font-bold text-white mb-2">🤖 Meet "Zee" - Your AI Guide:</p>
              <p className="text-white/90">
                Throughout this process, our AI chatbot "Zee" is available 24/7 to help you:
              </p>
              <ul className="ml-6 mt-2 space-y-1 text-white/80">
                <li>• Complete your profile</li>
                <li>• Choose which assessments to take</li>
                <li>• Write better job applications</li>
                <li>• Prepare for interviews</li>
                <li>• Answer any questions about the platform</li>
              </ul>
            </div>

            <p className="text-white font-semibold">
              💡 <strong>Pro tip:</strong> The more assessments you complete and the better your profile, the more employers will find you. Think of ZALPHA as your online job portfolio—keep building it!
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 4: Privacy & Employer Visibility */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-purple-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(3)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Eye className="w-6 h-6 text-purple-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">What information do employers see about me? Can I control my privacy?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-purple-300 flex-shrink-0 transition-transform ${openFAQ === 3 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 3 ? 'max-h-[3500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">YOU have FULL CONTROL over what employers and educational institutions see.</strong> Privacy and transparency are core to ZALPHA. Here's exactly what happens:
            </p>
            
            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-5">
              <p className="font-bold text-white mb-3">✅ What Employers CAN See (With Your Permission):</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Your name and profile photo</strong> (if you choose to add one)</li>
                <li>• <strong className="text-white">Your location</strong> (island/territory—not exact address)</li>
                <li>• <strong className="text-white">Education level and school</strong> (high school, college, trade school)</li>
                <li>• <strong className="text-white">Skills badges you've earned</strong> from assessments</li>
                <li>• <strong className="text-white">Assessment scores</strong> (only for skills relevant to jobs you apply for)</li>
                <li>• <strong className="text-white">Your bio and career interests</strong> (what you write in your profile)</li>
                <li>• <strong className="text-white">Work history</strong> (only if you add it—not required)</li>
                <li>• <strong className="text-white">Availability</strong> (full-time, part-time, contract, internship)</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-3">❌ What Employers CANNOT See:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Your exact home address</strong></li>
                <li>• <strong className="text-white">Your phone number or personal email</strong> (unless you choose to share after connecting)</li>
                <li>• <strong className="text-white">Your age or birthdate</strong> (we only verify you're 18+)</li>
                <li>• <strong className="text-white">Your social security number or government ID</strong></li>
                <li>• <strong className="text-white">Assessment attempts or failures</strong> (only final passing scores are shown)</li>
                <li>• <strong className="text-white">Messages with other employers</strong> (all conversations are private)</li>
                <li>• <strong className="text-white">Jobs you've applied to</strong> (unless it's THEIR job)</li>
                <li>• <strong className="text-white">Any info you mark as "private" in settings</strong></li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-3">🔒 Your Privacy Controls:</p>
              <div className="space-y-3 text-white/90">
                <p>
                  <strong className="text-white">1. Profile Visibility:</strong> Choose who can see your profile:
                </p>
                <ul className="ml-6 space-y-1 text-white/80">
                  <li>• Public (all employers can find you)</li>
                  <li>• Limited (only employers whose jobs you apply to)</li>
                  <li>• Hidden (you're invisible until you apply to specific jobs)</li>
                </ul>

                <p className="mt-3">
                  <strong className="text-white">2. Skills Display:</strong> Choose which skill badges to show publicly vs. keep private
                </p>

                <p className="mt-3">
                  <strong className="text-white">3. Application History:</strong> Employers only see applications to THEIR jobs—never your full history
                </p>

                <p className="mt-3">
                  <strong className="text-white">4. Messaging Control:</strong> Block or report employers who send inappropriate messages
                </p>

                <p className="mt-3">
                  <strong className="text-white">5. Data Download & Deletion:</strong> Request a copy of your data or delete your account at any time
                </p>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">⚖️ FERPA Compliance & Educational Records:</p>
              <p className="text-white/90">
                If you're a current student, ZALPHA follows <strong className="text-white">FERPA regulations</strong> to protect your educational records. 
                Your school can see your activity on ZALPHA ONLY if you explicitly grant permission, and you can revoke that permission at any time.
              </p>
            </div>

            <p className="text-white font-semibold mt-4">
              🛡️ <strong>Bottom line:</strong> You decide what employers see. ZALPHA will NEVER share your personal information without your explicit consent. All interactions stay on-platform until YOU choose to share contact details.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 5: Is ZALPHA free */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-blue-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(4)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-blue-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">Is ZALPHA really FREE for students? What's the catch?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-blue-300 flex-shrink-0 transition-transform ${openFAQ === 4 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 4 ? 'max-h-[2500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">Yes, ZALPHA is 100% FREE for students—no hidden fees, no subscriptions, no credit card required. Ever.</strong>
            </p>
            
            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-5">
              <p className="font-bold text-white mb-3">💰 What's Free for Students:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>✅ Account creation and profile setup</li>
                <li>✅ ALL skills assessments and training modules</li>
                <li>✅ Unlimited job applications</li>
                <li>✅ Direct messaging with employers</li>
                <li>✅ Access to virtual job fairs and college fairs</li>
                <li>✅ AI chatbot "Zee" support (24/7)</li>
                <li>✅ Career resources and interview prep</li>
                <li>✅ Application tracking and job search tools</li>
                <li>✅ Access to educational institution partnerships</li>
              </ul>
              <p className="text-white font-bold mt-3">
                Everything you need to find a job or educational opportunity = FREE.
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🤔 "So what's the catch?"</p>
              <p className="text-white/90">
                <strong className="text-white">There is no catch.</strong> Here's how ZALPHA makes money:
              </p>
              <ul className="ml-6 mt-3 space-y-2 text-white/90">
                <li>• <strong className="text-white">Employers pay subscriptions</strong> ($99-$799/month) to access our platform and post jobs</li>
                <li>• <strong className="text-white">Educational institutions pay subscriptions</strong> to partner with us and track outcomes</li>
                <li>• <strong className="text-white">We take ZERO commission from your salary</strong>—what you earn is 100% yours</li>
                <li>• <strong className="text-white">We don't sell your data</strong>—your privacy is protected</li>
              </ul>
              <p className="text-white/90 mt-3">
                Students are free because <strong className="text-white">employers and schools pay to access the talented workforce we're building.</strong> 
                You're not the product—you're the VALUE we're creating for our paying customers.
              </p>
            </div>

            <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🚫 What ZALPHA Will NEVER Do:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>❌ Charge students to apply for jobs</li>
                <li>❌ Take a percentage of your salary</li>
                <li>❌ Sell your personal information to third parties</li>
                <li>❌ Force you to pay for "premium" features to be competitive</li>
                <li>❌ Lock features behind paywalls that employers expect you to have</li>
              </ul>
            </div>

            <p className="text-white font-semibold mt-4">
              🌴 <strong>Our mission:</strong> Remove financial barriers for Pacific Islands students and make job opportunities accessible to EVERYONE, regardless of ability to pay. We succeed when YOU succeed—and that means keeping ZALPHA free for students, forever.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 6: Skills Assessments */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-orange-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(5)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-orange-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">How do skills assessments work? What if I fail?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-orange-300 flex-shrink-0 transition-transform ${openFAQ === 5 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 5 ? 'max-h-[3000px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">Skills assessments are gamified, interactive tests that help you demonstrate your abilities—and they're designed to be learning experiences, not just pass/fail tests.</strong>
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-4">
              <div>
                <p className="font-bold text-white">🎮 How Assessments Work:</p>
                <ul className="ml-6 mt-2 space-y-2 text-white/90">
                  <li>• <strong className="text-white">Choose your focus:</strong> Pick assessments for jobs you're interested in (customer service, tech, trades, etc.)</li>
                  <li>• <strong className="text-white">Interactive scenarios:</strong> Answer questions, solve problems, complete tasks—feels like a game, not a test</li>
                  <li>• <strong className="text-white">Instant feedback:</strong> See your results immediately and learn from mistakes</li>
                  <li>• <strong className="text-white">Earn badges:</strong> Pass assessments to earn skill badges that show up on your profile</li>
                  <li>• <strong className="text-white">Level up:</strong> Complete beginner → intermediate → advanced levels to show mastery</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white">📊 Assessment Categories:</p>
                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  <div className="bg-blue-500/10 rounded p-3 text-white/90">
                    <p className="font-semibold text-white">Soft Skills</p>
                    <p className="text-sm text-white/80">Communication, teamwork, problem-solving, customer service</p>
                  </div>
                  <div className="bg-green-500/10 rounded p-3 text-white/90">
                    <p className="font-semibold text-white">Technical Skills</p>
                    <p className="text-sm text-white/80">Computer literacy, software, coding, data entry</p>
                  </div>
                  <div className="bg-orange-500/10 rounded p-3 text-white/90">
                    <p className="font-semibold text-white">Math & Logic</p>
                    <p className="text-sm text-white/80">Basic math, financial literacy, analytical thinking</p>
                  </div>
                  <div className="bg-purple-500/10 rounded p-3 text-white/90">
                    <p className="font-semibold text-white">Industry-Specific</p>
                    <p className="text-sm text-white/80">Hospitality, retail, construction, healthcare, etc.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-5">
              <p className="font-bold text-white mb-2">✅ "What if I fail an assessment?"</p>
              <div className="space-y-3 text-white/90">
                <p>
                  <strong className="text-white">First: You can't really "fail."</strong> Here's what happens:
                </p>
                <ul className="ml-6 space-y-2">
                  <li>• <strong className="text-white">Try again:</strong> You can retake assessments as many times as needed—no limit, no penalty</li>
                  <li>• <strong className="text-white">Learn from mistakes:</strong> After each attempt, you see which areas need improvement</li>
                  <li>• <strong className="text-white">Get training:</strong> ZALPHA provides learning resources and practice modules before retaking</li>
                  <li>• <strong className="text-white">Ask Zee for help:</strong> Our AI chatbot can explain concepts and help you prepare</li>
                  <li>• <strong className="text-white">Employers don't see failures:</strong> Only your PASSED assessments and final scores show on your profile</li>
                </ul>
                <p className="text-white font-semibold mt-3">
                  💡 Think of assessments as practice and training, not just tests. The goal is to LEARN and IMPROVE, not to judge you.
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🎯 Pro Tips for Success:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• Start with beginner assessments to build confidence</li>
                <li>• Take your time—there's no time pressure on most assessments</li>
                <li>• Complete training modules BEFORE taking the assessment</li>
                <li>• Focus on quality over quantity—it's better to master 3-4 skills than barely pass 10</li>
                <li>• Retake assessments periodically to improve your score and show growth</li>
              </ul>
            </div>

            <p className="text-white font-semibold mt-4">
              🏆 <strong>Remember:</strong> The more assessments you complete and the higher your scores, the more attractive you are to employers. But don't stress—these are tools to help you improve, not barriers to entry!
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 7: After Applying */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-teal-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(6)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-6 h-6 text-teal-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">What happens after I apply for a job?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-teal-300 flex-shrink-0 transition-transform ${openFAQ === 6 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 6 ? 'max-h-[3500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">Unlike other job sites where applications disappear into a black hole, ZALPHA keeps you informed every step of the way.</strong>
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-4">
              <div>
                <p className="font-bold text-white">🔹 Step 1: Application Submitted</p>
                <p>You'll receive instant confirmation that your application was received. The employer is notified immediately.</p>
              </div>

              <div>
                <p className="font-bold text-white">🔹 Step 2: Employer Reviews (1-3 days typically)</p>
                <p>The employer looks at your profile, skills badges, and application. You can see the status: "Under Review."</p>
              </div>

              <div>
                <p className="font-bold text-white">🔹 Step 3: Response or Follow-Up</p>
                <p>You'll get one of these outcomes:</p>
                <ul className="ml-6 mt-2 space-y-1 text-white/80">
                  <li>• <strong className="text-white">Interview request:</strong> Employer messages you to schedule an interview</li>
                  <li>• <strong className="text-white">Questions:</strong> Employer asks clarifying questions before deciding</li>
                  <li>• <strong className="text-white">Not selected:</strong> You receive a message explaining why (helps you improve!)</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white">🔹 Step 4: Interview & Offer (If Selected)</p>
                <p>Schedule interviews through ZALPHA messaging. If you're selected, the employer extends an offer ON ZALPHA (for tracking purposes), then you finalize details.</p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">✅ What Makes ZALPHA Different:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">No black holes:</strong> You ALWAYS get a response—even if it's "not selected," you know where you stand</li>
                <li>• <strong className="text-white">Real-time updates:</strong> See when employers view your application, when they're actively reviewing, etc.</li>
                <li>• <strong className="text-white">Direct communication:</strong> Message employers directly—no third-party gatekeepers</li>
                <li>• <strong className="text-white">Feedback guaranteed:</strong> Employers are encouraged to provide constructive feedback (beta feature—we're working on making this mandatory)</li>
                <li>• <strong className="text-white">All tracked on-platform:</strong> Your application history, messages, and outcomes are saved for your records</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">⏰ Typical Timeline:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Application to initial response:</strong> 1-5 business days (most employers respond within 3 days)</li>
                <li>• <strong className="text-white">Interview scheduling:</strong> 1-2 weeks from application</li>
                <li>• <strong className="text-white">Job offer:</strong> 2-4 weeks from initial application (varies by role and employer)</li>
              </ul>
              <p className="text-white/90 italic mt-3">
                Note: These are averages during our beta phase. As more employers join and we optimize the process, we expect these timelines to get faster.
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🤖 Zee Keeps You on Track:</p>
              <p className="text-white/90">
                Our AI chatbot "Zee" will send you reminders if:
              </p>
              <ul className="ml-6 mt-2 space-y-1 text-white/80">
                <li>• An employer messages you and you haven't responded</li>
                <li>• You have an upcoming interview</li>
                <li>• Your application has been under review for a while (Zee will suggest following up)</li>
                <li>• You should update your profile or complete more assessments to improve your chances</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">⚠️ Important: ALL Communication Must Stay On-Platform</p>
              <p className="text-white/90">
                ZALPHA requires that <strong className="text-white">all job-related communication happens ON our platform until an offer is formally accepted.</strong> This protects both you and the employer:
              </p>
              <ul className="ml-6 mt-2 space-y-1 text-white/80">
                <li>• Prevents scams and fraudulent job offers</li>
                <li>• Ensures accountability and transparency</li>
                <li>• Protects your privacy until you're ready to share contact details</li>
                <li>• Allows ZALPHA to track outcomes and improve the platform</li>
              </ul>
              <p className="text-white/90 mt-3">
                Once you accept an offer, you can exchange personal contact info and move communication off-platform for onboarding.
              </p>
            </div>

            <p className="text-white font-semibold mt-4">
              🎯 <strong>Bottom line:</strong> You're never left wondering. ZALPHA keeps you informed, connected, and supported throughout your entire job search journey.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 8: Work Experience */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-pink-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(7)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-6 h-6 text-pink-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">Do I need work experience to use ZALPHA? I'm a fresh graduate with no job history.</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-pink-300 flex-shrink-0 transition-transform ${openFAQ === 7 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 7 ? 'max-h-[2000px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">Absolutely NOT! ZALPHA was specifically designed for students and recent graduates with ZERO work experience.</strong>
            </p>
            
            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-5">
              <p className="font-bold text-white mb-3">✅ Why ZALPHA Is Perfect for First-Time Job Seekers:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Skills-first, not experience-first:</strong> We focus on what you CAN do, not what you've DONE before</li>
                <li>• <strong className="text-white">Assessments replace résumés:</strong> Prove your abilities through tests, not by listing past jobs</li>
                <li>• <strong className="text-white">Entry-level focus:</strong> Most jobs on ZALPHA are designed for people entering the workforce</li>
                <li>• <strong className="text-white">Training built-in:</strong> Learn job-ready skills WHILE using the platform</li>
                <li>• <strong className="text-white">Employers know you're new:</strong> They're specifically looking for trainable candidates, not experts</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🎓 Perfect for:</p>
              <ul className="ml-6 space-y-1 text-white/90">
                <li>✅ High school graduates looking for their first job</li>
                <li>✅ College students seeking part-time or internship opportunities</li>
                <li>✅ Trade school students entering skilled trades</li>
                <li>✅ Career changers with no experience in their new field</li>
                <li>✅ Anyone who's been out of the workforce and needs to restart</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">💡 How to Stand Out Without Experience:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Complete ALL relevant skills assessments:</strong> Show employers you're competent even without job history</li>
                <li>• <strong className="text-white">Highlight transferable skills:</strong> Volunteering, school projects, family responsibilities—these COUNT as experience!</li>
                <li>• <strong className="text-white">Be enthusiastic and coachable:</strong> Employers value attitude and willingness to learn over experience</li>
                <li>• <strong className="text-white">Show up prepared:</strong> Research companies before applying, write thoughtful messages</li>
                <li>• <strong className="text-white">Leverage Zee:</strong> Ask our AI chatbot to help you frame your strengths effectively</li>
              </ul>
            </div>

            <p className="text-white font-semibold mt-4">
              🌟 <strong>The whole point of ZALPHA is to break the "no experience = no job, no job = no experience" cycle.</strong> We give you a way to prove yourself WITHOUT needing years of work history. Start building your career TODAY, regardless of your background!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
