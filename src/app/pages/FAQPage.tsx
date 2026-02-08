import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { FAQ4Skepticism } from '@/app/components/FAQ4Skepticism';
import { useState } from 'react';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: "Getting Started",
      question: "What is ZALPHA?",
      answer: "ZALPHA is a comprehensive job connection platform designed specifically for college students and high school graduates across the Pacific Islands. We connect students with employers, provide skills training, and offer tools for career development."
    },
    {
      category: "Getting Started",
      question: "Which Pacific territories does ZALPHA serve?",
      answer: "ZALPHA serves all 6 Pacific territories: CNMI (Saipan, Tinian, Rota), Guam, Hawaii, Palau, Marshall Islands, and FSM (Federated States of Micronesia)."
    },
    {
      category: "Getting Started",
      question: "Is ZALPHA free for students?",
      answer: "Yes! ZALPHA is 100% free for students. We offer free skills assessments, training programs, job search, and basic platform features. Premium features like video showcases are available for $9.99-$19.99/mo."
    },
    {
      category: "Students",
      question: "What is the Basic Skills Assessment?",
      answer: "The Basic Skills Assessment is a required 10-minute test for high school graduates (18+) entering the workforce. It tests reading comprehension, basic math, problem-solving, and following instructions. Pass it to earn a 'Workforce Ready' badge that employers can see."
    },
    {
      category: "Students",
      question: "Do I control what employers see?",
      answer: "Absolutely! YOU have FULL control over your privacy settings. You decide what information employers and educational institutions can see, including transcripts, contact info, and assessment scores."
    },
    {
      category: "Students",
      question: "What is the Workforce Training Program?",
      answer: "Our 100% FREE training program (in English) includes interview prep, resume building, LinkedIn training, time management, professional communication, Excel skills, and more. All sessions are led by industry experts."
    },
    {
      category: "Students",
      question: "Can I apply for government education loans through ZALPHA?",
      answer: "Yes! We provide complete documentation and support for government education and training loan applications, with FERPA compliance and proper age verification (18+)."
    },
    {
      category: "Employers",
      question: "How much does ZALPHA cost for employers?",
      answer: "We offer tiered subscriptions: Basic ($99/mo), Premium ($199/mo), and Ultra Premium ($499/mo with AI video interviews). Contract job postings are FREE!"
    },
    {
      category: "Employers",
      question: "What is the ZALPHA ATS Integration?",
      answer: "Our ATS (Applicant Tracking System) integration allows seamless sync of jobs, candidates, and applications between your existing ZALPHA ATS, your website, and the ZALPHA platform—all automatic!"
    },
    {
      category: "Employers",
      question: "What are AI Video Interviews?",
      answer: "AI Video Interviews (Ultra Premium feature) allow automated first-round candidate screening. AI analyzes and scores responses, saving you time. You can review at your convenience."
    },
    {
      category: "Employers",
      question: "Can I see student skills assessment scores?",
      answer: "Yes! Premium and Ultra Premium subscribers can view verified skills assessment scores to reduce hiring risk and find qualified entry-level candidates faster."
    },
    {
      category: "Platform",
      question: "Is ZALPHA a mobile app?",
      answer: "ZALPHA is currently a web application accessible through any browser on desktop, mobile, or tablet—no download needed! Native iOS and Android apps are coming soon (Q3-Q4 2026)."
    },
    {
      category: "Platform",
      question: "How does ZALPHA protect my data?",
      answer: "We use enterprise-grade security: Google reCAPTCHA v3, honeypot bot detection, behavioral verification, server-side rate limiting, FERPA compliance for student records, and content moderation."
    },
    {
      category: "Platform",
      question: "What are Virtual Job Fairs?",
      answer: "Virtual Job/College Fairs allow students to connect with employers and educational institutions from anywhere in the Pacific. Features include live events, virtual booths, video chat, and more—completely free for students!"
    },
    {
      category: "Platform",
      question: "Do all interactions stay on ZALPHA?",
      answer: "Yes! To protect our revenue model and ensure quality, all job offers, applications, and employer-student communication must go through ZALPHA. This also helps us track success and provide better service."
    },
    {
      category: "Educational Institutions",
      question: "Can universities recruit students through ZALPHA?",
      answer: "Yes! Coming in Q3 2026, universities and colleges can recruit students directly through ZALPHA with admission management tools, virtual campus tours, and application tracking."
    },
    {
      category: "Educational Institutions",
      question: "What is the Admission Management Portal?",
      answer: "The Admission Management Portal (Q3 2026) is a complete system for educational institutions to manage applications, transcripts, enrollment, and student recruitment all in one place."
    },
    {
      category: "Beta Testing",
      question: "What is the current beta testing status?",
      answer: "We're currently in Phase 1 beta testing in CNMI (Saipan, Tinian, Rota) with 500 students. Guam launch is planned for Q2 2026, with full rollout to all 6 Pacific territories by Q3-Q4 2026."
    },
    {
      category: "Beta Testing",
      question: "How can I join the beta testing program?",
      answer: "Join our waitlist! Beta testers get early access, 6 months of premium features free, and the opportunity to shape the platform with direct feedback."
    },
    {
      category: "Technical",
      question: "Which browsers does ZALPHA support?",
      answer: "ZALPHA works on all modern browsers: Chrome, Safari, Firefox, Edge on desktop; Mobile Safari and Chrome on phones and tablets. For best experience, use the latest browser version."
    },
    {
      category: "Technical",
      question: "Can I add ZALPHA to my phone's home screen?",
      answer: "Yes! You can add a shortcut icon to your home screen for easy access like a native app. Instructions vary by device—check your browser's 'Add to Home Screen' option."
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Frequently Asked Questions</h1>
                <p className="text-xs text-blue-300">Everything you need to know about ZALPHA</p>
              </div>
            </div>
            <BackButton onNavigate={onNavigate} />
          </div>
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">How Can We Help?</h2>
            <p className="text-xl text-white/80">
              Find answers to common questions about the ZALPHA platform
            </p>
          </div>

          {/* FAQs by Category */}
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                {category}
              </h3>
              
              <div className="space-y-4">
                {faqs
                  .filter(faq => faq.category === category)
                  .map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq);
                    const isOpen = openIndex === globalIndex;
                    
                    return (
                      <div
                        key={globalIndex}
                        className="bg-white/10 backdrop-blur-xl rounded-2xl border-2 border-white/20 overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-all"
                        >
                          <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-6 h-6 text-blue-300 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-blue-300 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-8 pb-6">
                            <div className="pt-4 border-t border-white/10">
                              <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* PLATFORM COMPARISON TABLE */}
          <div className="mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30">
            <div className="text-center mb-6">
              <h3 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <div className="w-2 h-10 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                Platform Comparison
              </h3>
              <p className="text-white/80 text-lg">
                See how ZALPHA compares to other job platforms
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-white/90">
                <thead>
                  <tr className="border-b-2 border-white/30">
                    <th className="text-left py-3 px-4 font-bold text-white">Feature</th>
                    <th className="text-center py-3 px-4 font-bold text-white">LinkedIn</th>
                    <th className="text-center py-3 px-4 font-bold text-white">Indeed/Zip</th>
                    <th className="text-center py-3 px-4 font-bold text-white">Handshake</th>
                    <th className="text-center py-3 px-4 font-bold text-white">Upwork</th>
                    <th className="text-center py-3 px-4 font-bold text-green-400">ZALPHA</th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  <tr className="border-b border-white/20">
                    <td className="py-3 px-4">Pacific Islands Focus</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center text-green-400 font-bold">✅</td>
                  </tr>
                  <tr className="border-b border-white/20 bg-white/5">
                    <td className="py-3 px-4">Skills Assessments</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center text-green-400 font-bold">✅</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-3 px-4">Gamified Training</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center text-green-400 font-bold">✅</td>
                  </tr>
                  <tr className="border-b border-white/20 bg-white/5">
                    <td className="py-3 px-4">High School Graduates</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">✅</td>
                    <td className="text-center text-green-400 font-bold">✅</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-3 px-4">Entry-Level Jobs Focus</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center text-green-400 font-bold">✅</td>
                  </tr>
                  <tr className="border-b border-white/20 bg-white/5">
                    <td className="py-3 px-4">Small Business Affordable</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center text-green-400 font-bold">✅</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-3 px-4">Mobile-First Design</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center text-green-400 font-bold">✅</td>
                  </tr>
                  <tr className="border-b border-white/20 bg-white/5">
                    <td className="py-3 px-4">Pre-Screened Candidates</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center text-green-400 font-bold">✅</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-3 px-4">AI Chatbot Support</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center text-green-400 font-bold">✅ (Zee)</td>
                  </tr>
                  <tr className="border-b border-white/20 bg-white/5">
                    <td className="py-3 px-4">Virtual Job Fairs</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center">❌</td>
                    <td className="text-center text-green-400 font-bold">✅</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-3 px-4">Zero Platform Fees</td>
                    <td className="text-center">N/A</td>
                    <td className="text-center">N/A</td>
                    <td className="text-center">N/A</td>
                    <td className="text-center">❌ (10-20%)</td>
                    <td className="text-center text-green-400 font-bold">✅ (0%)</td>
                  </tr>
                  <tr className="border-b border-white/20 bg-white/5">
                    <td className="py-3 px-4">Local Market Focus</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">⚠️</td>
                    <td className="text-center">❌ (Global)</td>
                    <td className="text-center text-green-400 font-bold">✅</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="py-3 px-4 font-bold">Starting Cost</td>
                    <td className="text-center">$8K+/yr</td>
                    <td className="text-center">Free-$1K/mo</td>
                    <td className="text-center">$5K+/yr</td>
                    <td className="text-center">10-20% fees</td>
                    <td className="text-center text-green-400 font-bold">$99/mo</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-white/70 text-sm mt-4 italic">
                * Indeed offers free basic job postings but charges for sponsored listings and premium features
              </p>
            </div>
          </div>

          {/* TRANSPARENCY SECTION */}
          <div className="mt-16">
            <h3 className="text-4xl font-bold text-white mb-4 text-center flex items-center justify-center gap-3">
              <div className="w-2 h-10 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
              Transparency & Trust
            </h3>
            <p className="text-center text-white/80 mb-8 text-lg">
              Honest answers to important questions about ZALPHA
            </p>
            <FAQ4Skepticism />
          </div>

          {/* Contact Support */}
          <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-center border-4 border-white/30">
            <h3 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h3>
            <p className="text-xl text-white/90 mb-6">
              Our support team is here to help!
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-purple-700 px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-2xl"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}