import { useState } from 'react';
import { GraduationCap, Target, DollarSign, CheckCircle, TrendingUp, Users, Phone, Mail, FileText, Award, Lightbulb, MessageSquare, Calendar, ArrowRight, Star, AlertCircle, BookOpen, Briefcase } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface SchoolBDGuideProps {
  onNavigate: (page: string) => void;
}

export function SchoolBDGuide({ onNavigate }: SchoolBDGuideProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-8 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <BackButton
            onClick={() => onNavigate('demo-showcase')}
            className="text-blue-600 hover:text-blue-700 font-semibold mb-4"
          >
            ← Back to Dashboard
          </BackButton>
          <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-purple-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">School Business Development Guide</h1>
                <p className="text-lg text-purple-600 font-semibold">How to Sign Up Schools & Universities to ZALPHA</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-4 border-2 border-purple-300">
              <p className="text-gray-800">
                <strong>👋 Welcome, Business Development Representative!</strong> This guide will teach you EVERYTHING you need to know to successfully sign up schools and universities to ZALPHA. Follow these simple steps to bring our platform to educational institutions across the Pacific!
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats - Earnings Potential */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
            <Users className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold mb-1">1,300+</div>
            <div className="text-sm opacity-90">Current Students (2026)</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
            <Target className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold mb-1">150+</div>
            <div className="text-sm opacity-90">Schools in Pacific</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <Award className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold mb-1">2-3 weeks</div>
            <div className="text-sm opacity-90">Average Close Time</div>
          </div>
        </div>

        {/* Section 1: Overview */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden border-2 border-purple-200">
          <button
            onClick={() => toggleSection('overview')}
            className="w-full p-6 flex items-center justify-between hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900">What Is School BD & Why Does It Matter?</h2>
                <p className="text-gray-600">Understanding your role and why schools need ZALPHA</p>
              </div>
            </div>
            <ArrowRight className={`w-6 h-6 text-purple-600 transition-transform ${expandedSection === 'overview' ? 'rotate-90' : ''}`} />
          </button>
          
          {expandedSection === 'overview' && (
            <div className="p-6 pt-0 space-y-6 text-sm">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="font-bold text-xl text-gray-900 mb-4">🎯 Your Job (In Simple Terms)</h3>
                <p className="text-gray-800 mb-4">
                  As a <strong>Business Development Representative (BD Rep)</strong>, your job is to:
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Find schools, colleges, and universities in the Western Pacific (CNMI, FSM, Guam, Hawaii, Palau, Marshall Islands)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Contact their <strong>Career Services</strong> or <strong>Student Affairs</strong> departments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Explain how ZALPHA helps their students find jobs locally (so they don't have to leave the Pacific)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Sign a partnership agreement so their students can use ZALPHA for FREE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Earn commission for every school you successfully sign up! 💰</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="font-bold text-xl text-gray-900 mb-4">💚 Why Schools NEED ZALPHA</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                    <h4 className="font-bold text-green-900 mb-2">Problem Schools Have:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 70% of graduates leave the Pacific after college</li>
                      <li>• Students can't find jobs in CNMI, FSM, Guam, Hawaii, Palau, Marshall Islands</li>
                      <li>• Career centers have limited employer connections</li>
                      <li>• Brain drain weakens local communities</li>
                      <li>• Students waste money on degrees they can't use locally</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                    <h4 className="font-bold text-green-900 mb-2">How ZALPHA Solves It:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ FREE job platform for all students</li>
                      <li>✓ Connects students with 500+ local employers</li>
                      <li>✓ AI matching ensures best job fit</li>
                      <li>✓ Keeps graduates in the Pacific (near family)</li>
                      <li>✓ Improves career center placement rates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                <h3 className="font-bold text-xl text-yellow-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" />
                  Key Message to Remember
                </h3>
                <p className="text-yellow-900 text-lg">
                  <strong>"ZALPHA helps your graduates find jobs at HOME, so they don't have to leave their families and communities to make a living."</strong>
                </p>
                <p className="text-sm text-yellow-800 mt-2">
                  This is the #1 selling point. Schools care about student success AND keeping talent in the Pacific.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Finding Target Schools */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden border-2 border-blue-200">
          <button
            onClick={() => toggleSection('targeting')}
            className="w-full p-6 flex items-center justify-between hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900">Step 1: Find Target Schools</h2>
                <p className="text-gray-600">Who to contact and how to find them</p>
              </div>
            </div>
            <ArrowRight className={`w-6 h-6 text-blue-600 transition-transform ${expandedSection === 'targeting' ? 'rotate-90' : ''}`} />
          </button>
          
          {expandedSection === 'targeting' && (
            <div className="p-6 pt-0 space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-xl text-gray-900 mb-4">🎓 Target Schools List (150+ in Pacific)</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* CNMI */}
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      CNMI (Commonwealth of Northern Mariana Islands)
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="font-semibold">• Northern Marianas College (NMC) ⭐ TOP PRIORITY</li>
                      <li>• Marianas High School</li>
                      <li>• Mt. Carmel School</li>
                      <li>• Grace Christian Academy</li>
                      <li>• Saipan Community School</li>
                    </ul>
                  </div>

                  {/* Guam */}
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Guam
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="font-semibold">• University of Guam (UOG) ⭐ TOP PRIORITY</li>
                      <li className="font-semibold">• Guam Community College (GCC) ⭐</li>
                      <li>• Pacific Islands University</li>
                      <li> John F. Kennedy High School</li>
                      <li>• George Washington High School</li>
                      <li>• Simon Sanchez High School</li>
                    </ul>
                  </div>

                  {/* FSM */}
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      FSM (Federated States of Micronesia)
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="font-semibold">• College of Micronesia - FSM (COM-FSM) ⭐ TOP</li>
                      <li>• Pohnpei State Campus</li>
                      <li>• Chuuk State Campus</li>
                      <li>• Yap State Campus</li>
                      <li>• Kosrae State Campus</li>
                    </ul>
                  </div>

                  {/* Hawaii */}
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Hawaii (Huge Market!)
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="font-semibold">• University of Hawaii System (10 campuses) ⭐⭐⭐</li>
                      <li>• UH Manoa (Oahu) - 20,000+ students</li>
                      <li>• UH Hilo (Big Island)</li>
                      <li>• UH West Oahu</li>
                      <li className="font-semibold">• Hawaii Pacific University ⭐</li>
                      <li className="font-semibold">• Chaminade University ⭐</li>
                      <li>• Brigham Young University - Hawaii</li>
                      <li>• Hawaii Community College</li>
                    </ul>
                  </div>

                  {/* Palau */}
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Palau
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="font-semibold">• Palau Community College (PCC) ⭐ TOP PRIORITY</li>
                      <li className="text-xs text-gray-600 ml-4">~500 students | Associate degrees, certificates</li>
                      <li>• Palau High School (~800 students)</li>
                      <li>• Emmaus High School (~400 students)</li>
                      <li>• Mindszenty High School</li>
                    </ul>
                  </div>

                  {/* Marshall Islands */}
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Marshall Islands
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="font-semibold">• College of the Marshall Islands (CMI) ⭐ TOP</li>
                      <li className="text-xs text-gray-600 ml-4">~900 students | Associate degrees, vocational training</li>
                      <li>• Marshall Islands High School (~600 students)</li>
                      <li>• Assumption High School (~300 students)</li>
                      <li>• Laura High School</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="font-bold text-xl text-gray-900 mb-4">👤 WHO to Contact at Each School</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-bold text-gray-900 mb-2">BEST Contact:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Career Services Director</strong></li>
                      <li>• Career Center Coordinator</li>
                      <li>• Job Placement Officer</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                    <div className="text-2xl mb-2">🎓</div>
                    <h4 className="font-bold text-gray-900 mb-2">Backup Contact:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Dean of Students</li>
                      <li>• VP of Student Affairs</li>
                      <li>• Student Success Director</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                    <div className="text-2xl mb-2">📞</div>
                    <h4 className="font-bold text-gray-900 mb-2">How to Find Them:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Google: "[School Name] Career Services"</li>
                      <li>• Check school website</li>
                      <li>• Call main number, ask for Career Center</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: The Pitch */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden border-2 border-green-200">
          <button
            onClick={() => toggleSection('pitch')}
            className="w-full p-6 flex items-center justify-between hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900">Step 2: The Pitch (What to Say)</h2>
                <p className="text-gray-600">Exact scripts and talking points to use</p>
              </div>
            </div>
            <ArrowRight className={`w-6 h-6 text-green-600 transition-transform ${expandedSection === 'pitch' ? 'rotate-90' : ''}`} />
          </button>
          
          {expandedSection === 'pitch' && (
            <div className="p-6 pt-0 space-y-6">
              {/* Email Template */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-purple-600" />
                  📧 Email Template (Copy & Paste This!)
                </h3>
                <div className="bg-white rounded-lg p-6 border-2 border-purple-300 font-mono text-sm">
                  <p className="mb-4"><strong>Subject:</strong> Free Job Platform for [School Name] Students - ZALPHA Partnership</p>
                  <hr className="my-4" />
                  <div className="space-y-4 text-gray-800">
                    <p>Hi [Career Services Director Name],</p>
                    <p>
                      My name is [Your Name], and I'm reaching out on behalf of <strong>ZALPHA</strong> – a new job connection platform built specifically for Western Pacific students.
                    </p>
                    <p>
                      <strong>The Problem:</strong> 70% of Pacific graduates leave CNMI/FSM/Guam/Hawaii after college because they can't find good jobs at home. This brain drain hurts families and communities.
                    </p>
                    <p>
                      <strong>Our Solution:</strong> ZALPHA connects your students with 500+ local employers, so they can build careers WITHOUT leaving the Pacific.
                    </p>
                    <p><strong>What Your Students Get (100% FREE):</strong></p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>AI-powered job matching to local employers</li>
                      <li>Free resume builder & interview prep</li>
                      <li>Skills assessments & certifications</li>
                      <li>Virtual job fairs with Pacific employers</li>
                      <li>24/7 AI career advisor chatbot</li>
                    </ul>
                    <p>
                      <strong>What [School Name] Gets:</strong> Better job placement rates, revenue sharing (2-5% commission on paid subscriptions), and real-time analytics on student outcomes.
                    </p>
                    <p>
                      Can we schedule a 15-minute call this week to discuss a partnership? I'd love to show you a quick demo!
                    </p>
                    <p className="mt-4">
                      Best regards,<br />
                      [Your Name]<br />
                      Business Development Representative, ZALPHA<br />
                      📧 [your.email@zalpharecruit.com]<br />
                      📱 [Your Phone Number]
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Script */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
                <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="w-6 h-6 text-orange-600" />
                  📞 Phone Call Script
                </h3>
                <div className="bg-white rounded-lg p-6 border-2 border-orange-300">
                  <div className="space-y-4 text-gray-800">
                    <div>
                      <p className="font-bold text-orange-900 mb-2">Opening:</p>
                      <p className="bg-orange-50 p-3 rounded italic">
                        "Hi, my name is [Your Name]. I'm calling from ZALPHA – we're a new job platform helping Pacific students find careers in CNMI, Guam, Hawaii, and FSM. Is this a good time to talk for 2 minutes?"
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-orange-900 mb-2">If they say YES:</p>
                      <p className="bg-orange-50 p-3 rounded italic">
                        "Great! So, we've partnered with over 500 employers in the Western Pacific to help students find jobs close to home. Right now, 70% of graduates leave the region after college because they can't find work. We're trying to change that. Would it make sense to set up a quick 15-minute demo with your career services team?"
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-orange-900 mb-2">If they say "Email me instead":</p>
                      <p className="bg-orange-50 p-3 rounded italic">
                        "Absolutely! What's the best email address? I'll send you some info and a link to schedule a demo at your convenience."
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-orange-900 mb-2">If they ask "How much does it cost?":</p>
                      <p className="bg-orange-50 p-3 rounded italic">
                        "It's 100% FREE for students and your school. We make money from employers who pay to post jobs. Plus, your school earns 2-5% commission on any student who upgrades to a premium account. It's a win-win!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Talking Points */}
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-xl text-gray-900 mb-4">💬 Key Talking Points (Memorize These!)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                    <h4 className="font-bold text-blue-900 mb-3">✅ DO Say This:</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• "Keeps graduates in the Pacific near family"</li>
                      <li>• "100% FREE for students and schools"</li>
                      <li>• "500+ local employers already using it"</li>
                      <li>• "Improves your job placement rates"</li>
                      <li>• "Schools earn passive income (2-5% commission)"</li>
                      <li>• "We handle all the tech – zero work for your staff"</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-red-300">
                    <h4 className="font-bold text-red-900 mb-3">❌ DON'T Say This:</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• "We're better than [competitor]" (don't trash-talk)</li>
                      <li>• "This is just like LinkedIn" (it's NOT – it's Pacific-only)</li>
                      <li>• "You NEED this" (sounds pushy)</li>
                      <li>Technical jargon (AI algorithms, machine learning, etc.)</li>
                      <li>• "We're a startup" (sounds risky)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Handling Objections */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden border-2 border-orange-200">
          <button
            onClick={() => toggleSection('objections')}
            className="w-full p-6 flex items-center justify-between hover:bg-orange-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900">Step 3: Handle Objections</h2>
                <p className="text-gray-600">What to say when they push back</p>
              </div>
            </div>
            <ArrowRight className={`w-6 h-6 text-orange-600 transition-transform ${expandedSection === 'objections' ? 'rotate-90' : ''}`} />
          </button>
          
          {expandedSection === 'objections' && (
            <div className="p-6 pt-0 space-y-4">
              {[
                {
                  objection: "We already use Handshake/Indeed/LinkedIn",
                  response: "That's great! But those platforms serve the entire U.S. – students have to compete with millions of applicants nationwide. ZALPHA is ONLY for the Pacific, so your students are matched with LOCAL employers who actually hire here. Think of us as a complement, not a replacement. Many schools use both!"
                },
                {
                  objection: "We don't have budget for this",
                  response: "Perfect – because ZALPHA is 100% FREE for schools! There's zero cost, no contracts, no software to install. We make money from employers, not schools. Plus, YOU earn 2-5% commission when students upgrade to premium accounts. It's free money for your career center!"
                },
                {
                  objection: "Our students already find jobs fine",
                  response: "That's awesome! But do they find jobs HERE in the Pacific, or do they have to move to the mainland? Our data shows 70% of Pacific grads leave the region. ZALPHA helps them stay close to family while building careers. Wouldn't it be great if more of your graduates stayed local?"
                },
                {
                  objection: "We're too busy to implement new systems",
                  response: "Totally understand! The good news: there's ZERO setup work for your team. We handle everything. All you do is share a signup link with students (we even create the flyers and emails for you!). It takes 5 minutes. We can even come to campus and do student orientations ourselves."
                },
                {
                  objection: "How do I know this is legitimate?",
                  response: "Great question! We're already partnered with [list any schools you've signed]. We're based in the Pacific and backed by local investors. I can send you references from other career directors, or we can do a video demo right now so you can see the platform yourself. Would that help?"
                },
                {
                  objection: "I need to talk to my boss first",
                  response: "Absolutely! That makes sense. Would it help if I sent you a one-page PDF that explains everything, so you can forward it to your supervisor? I can also jump on a call with both of you – whatever works best!"
                },
                {
                  objection: "Students won't use it",
                  response: "We've seen 80%+ adoption rates at partner schools! Why? Because it's FREE, mobile-friendly, and students can apply to jobs in ONE CLICK. Plus, the AI chatbot helps with resumes and interview prep 24/7. Students love it because it actually WORKS – they get interviews within days."
                },
                {
                  objection: "Call me back in [future date]",
                  response: "Sure! Can I ask – is there something specific you need to evaluate first, or is it just a timing thing? If it's timing, I can follow up then. But if there's info I can send now to help you decide, I'm happy to do that!"
                }
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border-2 border-orange-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        Objection #{index + 1}: "{item.objection}"
                      </h4>
                      <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                        <p className="text-sm text-gray-700 font-semibold mb-1">✅ Your Response:</p>
                        <p className="text-gray-800 italic">{item.response}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 5: Closing the Deal */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden border-2 border-green-200">
          <button
            onClick={() => toggleSection('closing')}
            className="w-full p-6 flex items-center justify-between hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                5
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900">Step 4: Close the Deal & Onboard</h2>
                <p className="text-gray-600">Final steps to seal the partnership</p>
              </div>
            </div>
            <ArrowRight className={`w-6 h-6 text-green-600 transition-transform ${expandedSection === 'closing' ? 'rotate-90' : ''}`} />
          </button>
          
          {expandedSection === 'closing' && (
            <div className="p-6 pt-0 space-y-6">
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="font-bold text-xl text-gray-900 mb-4">📋 Onboarding Checklist</h3>
                <div className="space-y-3">
                  {[
                    { step: '1', task: 'Schedule Demo Call', time: '15-30 min', description: 'Show them the platform, answer questions live' },
                    { step: '2', task: 'Send Partnership Agreement', time: '5 min', description: 'Simple 1-page contract (we provide template)' },
                    { step: '3', task: 'Get Agreement Signed', time: '1-3 days', description: 'DocuSign or email signature (easy!)' },
                    { step: '4', task: 'Create School Profile', time: '10 min', description: 'Logo, description, contact info' },
                    { step: '5', task: 'Generate Student Signup Link', time: '2 min', description: 'Custom link with school name' },
                    { step: '6', task: 'Provide Marketing Materials', time: '5 min', description: 'Flyers, email templates, social media posts' },
                    { step: '7', task: 'Launch Announcement', time: '1 day', description: 'School sends email/posts to students' },
                    { step: '8', task: 'Track Signups & Celebrate!', time: 'Ongoing', description: 'Monitor student adoption, earn commission' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white rounded-lg p-4 border-2 border-green-300">
                      <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-900">{item.task}</h4>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">{item.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-xl text-gray-900 mb-4">📄 Partnership Agreement (What's Included)</h3>
                <div className="bg-white rounded-lg p-5 border-2 border-blue-300">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>FREE access</strong> for all students (current and alumni)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Revenue sharing:</strong> School earns 2-5% commission on student premium subscriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Custom branding:</strong> School logo on platform, co-branded emails</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Analytics dashboard:</strong> Track student signups, applications, job placements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Virtual job fair hosting:</strong> 2 free virtual career fairs per year</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>No exclusivity:</strong> School can still use other job platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Cancel anytime:</strong> No long-term commitment (though we hope you love it!)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 6: Resources */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden border-2 border-blue-200">
          <button
            onClick={() => toggleSection('resources')}
            className="w-full p-6 flex items-center justify-between hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                📚
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900">Resources & Tools</h2>
                <p className="text-gray-600">Everything you need to succeed</p>
              </div>
            </div>
            <ArrowRight className={`w-6 h-6 text-blue-600 transition-transform ${expandedSection === 'resources' ? 'rotate-90' : ''}`} />
          </button>
          
          {expandedSection === 'resources' && (
            <div className="p-6 pt-0 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    Documents You'll Need
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Partnership Agreement Template (we provide)</li>
                    <li>✓ One-page ZALPHA Overview PDF</li>
                    <li>✓ Email templates for school outreach</li>
                    <li>✓ Phone scripts (included above)</li>
                    <li>✓ Demo video link (5 minutes)</li>
                    <li>✓ FAQ document for career directors</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-green-600" />
                    Your BD Rep Dashboard
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Track all your school prospects</li>
                    <li>✓ See real-time commission earnings</li>
                    <li>✓ Access all marketing materials</li>
                    <li>✓ View leaderboard (compete with other reps!)</li>
                    <li>✓ Download reports for your records</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-600" />
                    Support Team
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>📧 Email: contact@zalpharecruit.com (24hr response)</li>
                    <li>📱 WhatsApp: 1-670-286-3010</li>
                    <li>📞 Phone: 1-670-286-3010</li>
                    <li>👥 Mentorship from senior BD reps</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                  <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-yellow-600" />
                    Ongoing Training
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Monthly webinars on BD best practices</li>
                    <li>✓ Role-play practice sessions</li>
                    <li>✓ Case studies from successful deals</li>
                    <li>✓ Sales certification program (optional)</li>
                    <li>✓ Top performer spotlight interviews</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Checklist */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">✅ Your First Week Action Plan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-xl mb-4">🎯 Monday - Wednesday:</h3>
              <ul className="space-y-2">
                <li>☐ Read this entire guide (30 minutes)</li>
                <li>☐ Watch ZALPHA demo video (5 minutes)</li>
                <li>☐ Create list of 20 target schools</li>
                <li>☐ Find contact info for career directors</li>
                <li>☐ Customize email template with your info</li>
                <li>☐ Send 10 emails to schools</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">🚀 Thursday - Friday:</h3>
              <ul className="space-y-2">
                <li>☐ Follow up on emails sent Monday</li>
                <li>☐ Make 10 cold calls to schools</li>
                <li>☐ Schedule 3-5 demo meetings</li>
                <li>☐ Join Friday BD team call</li>
                <li>☐ Celebrate your first school signup! 🎉</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-white/20 rounded-xl p-6 text-center">
            <p className="text-xl font-bold mb-2">Goal: Sign 1 School by End of Week 1</p>
            <p className="text-sm opacity-90">Most reps close their first deal within 5-10 days. You've got this! 💪</p>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-4 border-purple-200 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions? We're Here to Help!</h2>
          <p className="text-gray-600 mb-6">
            Your success is our success. If you get stuck, confused, or need advice, reach out anytime!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:contact@zalpharecruit.com"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              contact@zalpharecruit.com
            </a>
            <a 
              href="tel:+16702863010"
              className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              1-670-286-3010
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Average response time: Under 2 hours during business hours
          </p>
        </div>
      </div>
    </div>
  );
}

const MapPin = Phone;