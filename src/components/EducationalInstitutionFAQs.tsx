import { School, Link, BarChart3, Users, FileCheck, Handshake, ChevronDown, DollarSign } from 'lucide-react';
import { useState } from 'react';

export function EducationalInstitutionFAQs() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0); // First FAQ open by default

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* FAQ 1: How does ZALPHA help educational institutions? */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-blue-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(0)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <School className="w-6 h-6 text-blue-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">How does ZALPHA help educational institutions?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-blue-300 flex-shrink-0 transition-transform ${openFAQ === 0 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 0 ? 'max-h-[2000px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">ZALPHA is a workforce development partner that helps schools, colleges, and training programs demonstrate real outcomes and improve employment rates.</strong>
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-4">
              <div>
                <p className="font-bold text-white">🎓 For High Schools:</p>
                <ul className="ml-6 mt-2 space-y-2 text-white/90">
                  <li>• Track career readiness of graduating seniors</li>
                  <li>• Connect students with entry-level job opportunities</li>
                  <li>• Provide career exploration and skills assessments</li>
                  <li>• Demonstrate post-graduation employment outcomes to accreditors and funders</li>
                  <li>• Integrate career services without hiring additional staff</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white">🏫 For Community Colleges & Universities:</p>
                <ul className="ml-6 mt-2 space-y-2 text-white/90">
                  <li>• Expand career services reach to ALL students (not just seniors)</li>
                  <li>• Track internship placements and part-time employment</li>
                  <li>• Connect academic programs with industry demand data</li>
                  <li>• Improve job placement rates for accreditation and rankings</li>
                  <li>• Facilitate employer partnerships and recruiting events</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white">🔧 For Trade Schools & Vocational Programs:</p>
                <ul className="ml-6 mt-2 space-y-2 text-white/90">
                  <li>• Direct pipeline to employers seeking skilled trades workers</li>
                  <li>• Skills verification through industry-relevant assessments</li>
                  <li>• Track certification completion and job placement</li>
                  <li>• Connect with apprenticeship opportunities</li>
                  <li>• Demonstrate ROI to students considering enrollment</li>
                </ul>
              </div>
            </div>
            
            <p className="text-white font-semibold">
              🎯 <strong>Bottom line:</strong> ZALPHA helps you prove that your programs WORK by tracking student outcomes from graduation to employment.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 2: How does integration work? */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-green-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(1)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Link className="w-6 h-6 text-green-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">How does ZALPHA integrate with our existing systems?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-green-300 flex-shrink-0 transition-transform ${openFAQ === 1 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 1 ? 'max-h-[2500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">ZALPHA is designed to complement your existing career services, student information systems, and programs—not replace them.</strong>
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-4">
              <div>
                <p className="font-bold text-white">🔹 Integration Options:</p>
                
                <div className="mt-3 space-y-3">
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-400/30">
                    <p className="font-semibold text-white">Option 1: Standalone Platform (Easiest)</p>
                    <p className="text-white/90 mt-2">
                      Students create accounts directly on ZALPHA using their school email address. Your institution gets a dashboard to view aggregated outcomes data. 
                      <strong className="text-white"> No technical integration required—students simply use ZALPHA as an additional career resource.</strong>
                    </p>
                    <p className="text-green-300 mt-2">✅ Setup time: 1-2 days | Technical lift: None</p>
                  </div>

                  <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-400/30">
                    <p className="font-semibold text-white">Option 2: Single Sign-On (SSO) Integration</p>
                    <p className="text-white/90 mt-2">
                      Students log into ZALPHA using their existing school credentials (Google, Microsoft, Canvas, etc.). Seamless authentication means students don't need another password.
                    </p>
                    <p className="text-green-300 mt-2">✅ Setup time: 1-2 weeks | Technical lift: Minimal (IT coordinates with ZALPHA)</p>
                  </div>

                  <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-400/30">
                    <p className="font-semibold text-white">Option 3: Student Information System (SIS) Integration</p>
                    <p className="text-white/90 mt-2">
                      ZALPHA connects with your SIS (Banner, PeopleSoft, Ellucian, etc.) to automatically enroll students, sync enrollment data, and push outcomes back to your system.
                    </p>
                    <p className="text-green-300 mt-2">✅ Setup time: 4-8 weeks | Technical lift: Moderate (requires API coordination)</p>
                  </div>

                  <div className="bg-pink-500/10 rounded-lg p-4 border border-pink-400/30">
                    <p className="font-semibold text-white">Option 4: Full API Integration (Enterprise)</p>
                    <p className="text-white/90 mt-2">
                      Custom integration with your career services platform, learning management system, and data warehouse. Bi-directional data flow, white-label career pages, custom reporting.
                    </p>
                    <p className="text-green-300 mt-2">✅ Setup time: 8-12 weeks | Technical lift: High (dedicated implementation team)</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 mt-4">
                <p className="font-bold text-white mb-2">🔐 FERPA Compliance & Data Privacy:</p>
                <p className="text-white/90">
                  All integrations are <strong className="text-white">FERPA-compliant</strong>. Students control what data is shared. Schools cannot access individual student activity without explicit student consent. 
                  We only share aggregated, anonymized data for reporting purposes unless students opt-in to share their records with your institution.
                </p>
              </div>
            </div>

            <p className="text-white font-semibold mt-4">
              🛠️ <strong>Our approach:</strong> Start simple (standalone), prove value, then explore deeper integrations if desired. We don't require complex IT projects to get started.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 3: What data and reporting do we get? */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-purple-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(2)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-6 h-6 text-purple-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">What data and reporting do we get access to?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-purple-300 flex-shrink-0 transition-transform ${openFAQ === 2 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 2 ? 'max-h-[2500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">ZALPHA provides comprehensive analytics that help you track student outcomes, demonstrate program effectiveness, and identify improvement opportunities.</strong>
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-4">
              <div>
                <p className="font-bold text-white">📊 Standard Reporting (Included for All Partners):</p>
                <ul className="ml-6 mt-2 space-y-2 text-white/90">
                  <li>
                    • <strong className="text-white">Student Participation Metrics:</strong> How many students from your institution are active on ZALPHA, profile completion rates, assessment participation
                  </li>
                  <li>
                    • <strong className="text-white">Employment Outcomes:</strong> Job placement rates, time-to-employment after graduation, types of jobs secured, salary ranges (anonymized)
                  </li>
                  <li>
                    • <strong className="text-white">Skills Data:</strong> Most commonly earned badges, skills gaps identified through assessments, competency trends over time
                  </li>
                  <li>
                    • <strong className="text-white">Employer Demand:</strong> Which industries are hiring your students, most in-demand skills from employers, geographic trends
                  </li>
                  <li>
                    • <strong className="text-white">Program Performance:</strong> Compare outcomes across majors, departments, and cohorts to identify high-performing programs
                  </li>
                  <li>
                    • <strong className="text-white">Virtual Fair Analytics:</strong> Attendance at your virtual job/college fairs, employer engagement, student follow-through rates
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                <p className="font-bold text-white mb-2">📈 Dashboard Access:</p>
                <p className="text-white/90">
                  Your institution gets a dedicated dashboard with:
                </p>
                <ul className="ml-6 mt-2 space-y-1 text-white/80">
                  <li>• Real-time employment tracking</li>
                  <li>• Customizable reports for accreditation and grant applications</li>
                  <li>• Trend analysis and year-over-year comparisons</li>
                  <li>• Export capabilities (CSV, PDF) for sharing with stakeholders</li>
                  <li>• Visualizations and charts for presentations</li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                <p className="font-bold text-white mb-2">🔍 Advanced Analytics (Premium Tier):</p>
                <ul className="ml-6 space-y-1 text-white/90">
                  <li>• Predictive models: Which students are at risk of unemployment?</li>
                  <li>• Skills gap analysis: What competencies should you add to curriculum?</li>
                  <li>• ROI calculations: Demonstrate value to prospective students and funders</li>
                  <li>• Cohort tracking: Follow specific graduating classes over time</li>
                  <li>• Custom reports: Tailored analytics for your specific needs</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🔐 Privacy & Consent:</p>
              <p className="text-white/90">
                <strong className="text-white">FERPA compliance is our priority.</strong> You receive <strong className="text-white">aggregated, anonymized data</strong> by default. 
                If you want to track individual student outcomes, students must provide explicit consent. We never share personally identifiable information without student permission.
              </p>
            </div>

            <p className="text-white font-semibold mt-4">
              📊 <strong>Use cases for your data:</strong> Accreditation reports, grant applications, board presentations, program improvement planning, marketing to prospective students, employer partnership development.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 4: What's the pricing? */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-orange-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(3)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileCheck className="w-6 h-6 text-orange-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">What's the pricing for educational institutions?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-orange-300 flex-shrink-0 transition-transform ${openFAQ === 3 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 3 ? 'max-h-[3500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">ZALPHA pricing for schools is based on enrollment size and level of integration—designed to be affordable even for small institutions.</strong>
            </p>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-6 border border-blue-400/30">
                <p className="text-3xl font-bold text-white mb-2">$299/month</p>
                <p className="text-xl text-white/90 mb-3">Basic Partnership (Small Schools)</p>
                <p className="text-white/80 text-base mb-3">For institutions with 500 or fewer students</p>
                <div className="space-y-2 text-white/90">
                  <p>✅ Student access to full ZALPHA platform (FREE for students)</p>
                  <p>✅ Institution dashboard with standard reporting</p>
                  <p>✅ Up to 3 administrative accounts</p>
                  <p>✅ Career services resources and training materials</p>
                  <p>✅ Virtual job fair participation (1 per semester)</p>
                  <p>✅ Email support</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-6 border border-green-400/30">
                <p className="text-3xl font-bold text-white mb-2">$799/month</p>
                <p className="text-xl text-white/90 mb-3">Premium Partnership (Medium Schools)</p>
                <p className="text-white/80 text-base mb-3">For institutions with 501-2,000 students</p>
                <div className="space-y-2 text-white/90">
                  <p>✅ Everything in Basic, PLUS:</p>
                  <p>✅ Advanced analytics and predictive insights</p>
                  <p>✅ SSO integration (Google, Microsoft, Canvas, etc.)</p>
                  <p>✅ Up to 10 administrative accounts</p>
                  <p>✅ Unlimited virtual job fairs and career events</p>
                  <p>✅ Custom branding on student career pages</p>
                  <p>✅ Dedicated account manager</p>
                  <p>✅ Priority support (phone + email)</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-400/30">
                <p className="text-3xl font-bold text-white mb-2">$1,999/month</p>
                <p className="text-xl text-white/90 mb-3">Enterprise Partnership (Large Schools)</p>
                <p className="text-white/80 text-base mb-3">For institutions with 2,000+ students</p>
                <div className="space-y-2 text-white/90">
                  <p>✅ Everything in Premium, PLUS:</p>
                  <p>✅ Full SIS integration (Banner, PeopleSoft, Ellucian, etc.)</p>
                  <p>✅ API access for custom integrations</p>
                  <p>✅ Unlimited administrative accounts</p>
                  <p>✅ White-label career services platform</p>
                  <p>✅ Custom skills assessments aligned to your programs</p>
                  <p>✅ On-site training and implementation support</p>
                  <p>✅ Dedicated success team (24/7 support)</p>
                  <p>✅ Multi-campus support</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5 mt-6">
              <p className="font-bold text-white mb-2">💰 Compare to Traditional Career Services Costs:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Hiring 1 career counselor:</strong> $50,000-$70,000/year + benefits</li>
                <li>• <strong className="text-white">Job board subscriptions:</strong> $5,000-$15,000/year per platform</li>
                <li>• <strong className="text-white">Career fair logistics:</strong> $10,000-$30,000 per in-person event</li>
                <li>• <strong className="text-white">Outcomes tracking software:</strong> $10,000-$50,000/year</li>
              </ul>
              <p className="text-green-300 font-bold mt-3">
                ✅ ZALPHA replaces ALL of these at a fraction of the cost while serving MORE students effectively.
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🎓 Beta Testing Discount:</p>
              <p className="text-white/90">
                We're currently in BETA and offering <strong className="text-white">50% off the first year</strong> for early adopter institutions. 
                Join now to help shape the platform while saving significantly on costs.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🤝 Grant & Funding Support:</p>
              <p className="text-white/90">
                Many schools use <strong className="text-white">workforce development grants, Perkins funding, or Title III funds</strong> to cover ZALPHA subscriptions. 
                We provide documentation, ROI calculations, and support materials to help you secure funding.
              </p>
            </div>

            <p className="text-white font-semibold mt-4">
              💡 <strong>Flexible payment:</strong> Annual subscriptions receive 2 months free. Multi-year contracts available with additional discounts. Talk to us about custom pricing for consortiums or district-wide implementations.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 5: Employer participation */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-teal-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(4)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Handshake className="w-6 h-6 text-teal-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">How do we get employers to participate and recruit our students?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-teal-300 flex-shrink-0 transition-transform ${openFAQ === 4 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 4 ? 'max-h-[2500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">ZALPHA actively recruits employers across the Pacific Islands—you don't have to build the employer network yourself.</strong> But we also support your existing relationships:
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-4">
              <div>
                <p className="font-bold text-white">🔹 ZALPHA's Employer Recruitment:</p>
                <ul className="ml-6 mt-2 space-y-2 text-white/90">
                  <li>• We actively market ZALPHA to businesses across all 6 Pacific territories</li>
                  <li>• Employers subscribe to access talent from ALL partner institutions, not just yours</li>
                  <li>• Our subscription model means employers are financially committed to hiring</li>
                  <li>• We handle employer onboarding, training, and support</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white">🔹 Your Existing Employer Relationships:</p>
                <ul className="ml-6 mt-2 space-y-2 text-white/90">
                  <li>• Invite your advisory board members, internship partners, and alumni employers to join ZALPHA</li>
                  <li>• We provide co-branded marketing materials to promote ZALPHA to your network</li>
                  <li>• Employers who partner with your institution get highlighted in your students' feeds</li>
                  <li>• Track which of "your" employers are actively recruiting students</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white">🔹 Virtual Job Fairs & Events:</p>
                <ul className="ml-6 mt-2 space-y-2 text-white/90">
                  <li>• Host virtual career fairs exclusively for your students</li>
                  <li>• Invite specific employers to participate at no additional cost to them (included in their subscription)</li>
                  <li>• Students connect with employers in real-time through chat and video</li>
                  <li>• All interactions tracked—follow up on leads and outcomes afterward</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">💼 Employer Incentives to Recruit From ZALPHA:</p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Pre-screened candidates:</strong> Students have completed skills assessments—employers trust the quality</li>
                <li>• <strong className="text-white">100% Pacific Islands talent:</strong> Every candidate is local and understands the region</li>
                <li>• <strong className="text-white">Cost-effective:</strong> $99-$799/month beats recruiters and traditional job boards</li>
                <li>• <strong className="text-white">Active job seekers:</strong> Students on ZALPHA are serious about finding work</li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">🎯 Our Partnership Approach:</p>
              <p className="text-white/90">
                <strong className="text-white">We're not just a tech platform—we're your workforce development partner.</strong> The ZALPHA team will:
              </p>
              <ul className="ml-6 mt-2 space-y-1 text-white/80">
                <li>• Co-present to your advisory boards and employer partners</li>
                <li>• Attend your career fairs and networking events</li>
                <li>• Provide data on employer demand to inform program development</li>
                <li>• Work with your career services team to maximize student outcomes</li>
              </ul>
            </div>

            <p className="text-white font-semibold mt-4">
              🤝 <strong>Bottom line:</strong> You focus on educating students. We focus on connecting them to employers. Together, we create a sustainable talent pipeline that benefits everyone.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 6: Student adoption */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-pink-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(5)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-pink-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">What if students don't use ZALPHA? How do we drive adoption?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-pink-300 flex-shrink-0 transition-transform ${openFAQ === 5 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 5 ? 'max-h-[2500px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">Great question—student adoption is critical to success. Here's how we help you drive engagement:</strong>
            </p>
            
            <div className="bg-white/5 rounded-lg p-5 space-y-4">
              <div>
                <p className="font-bold text-white">🎯 Strategies That Work:</p>
                
                <div className="mt-3 space-y-3">
                  <div className="bg-blue-500/10 rounded p-4 border border-blue-400/30">
                    <p className="font-semibold text-white">1. Integrate into Required Courses</p>
                    <p className="text-white/90 mt-2">
                      Add ZALPHA profile completion and skills assessments as assignments in career readiness courses, senior seminars, or first-year programs. 
                      Students complete it because it's required, then continue using it because it's valuable.
                    </p>
                  </div>

                  <div className="bg-green-500/10 rounded p-4 border border-green-400/30">
                    <p className="font-semibold text-white">2. Gamification & Incentives</p>
                    <p className="text-white/90 mt-2">
                      ZALPHA's skill badges and progress tracking are inherently gamified. Add your own incentives: prize drawings for completing profiles, 
                      recognition for students who earn the most badges, etc.
                    </p>
                  </div>

                  <div className="bg-purple-500/10 rounded p-4 border border-purple-400/30">
                    <p className="font-semibold text-white">3. Peer Marketing & Success Stories</p>
                    <p className="text-white/90 mt-2">
                      When students land jobs through ZALPHA, feature them in newsletters, social media, and campus events. 
                      Nothing drives adoption like seeing peers succeed.
                    </p>
                  </div>

                  <div className="bg-orange-500/10 rounded p-4 border border-orange-400/30">
                    <p className="font-semibold text-white">4. Faculty & Advisor Buy-In</p>
                    <p className="text-white/90 mt-2">
                      Train faculty and advisors on ZALPHA so they can recommend it during advising sessions. 
                      When trusted mentors endorse the platform, students listen.
                    </p>
                  </div>

                  <div className="bg-teal-500/10 rounded p-4 border border-teal-400/30">
                    <p className="font-semibold text-white">5. Onboarding Events & Workshops</p>
                    <p className="text-white/90 mt-2">
                      Host ZALPHA registration events during orientation, career fairs, or club meetings. 
                      Provide hands-on support to get students started.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-2">💡 ZALPHA Provides Marketing Support:</p>
              <ul className="ml-6 space-y-1 text-white/90">
                <li>• Co-branded posters, flyers, and social media graphics</li>
                <li>• Student onboarding videos and tutorials</li>
                <li>• Email templates for faculty and student communications</li>
                <li>• Live webinars and Q&A sessions for students</li>
                <li>• Success metrics to celebrate wins and drive engagement</li>
              </ul>
            </div>

            <p className="text-white font-semibold mt-4">
              🚀 <strong>Bottom line:</strong> ZALPHA provides the tools and support, but adoption success requires partnership. We'll work with you to create a customized launch plan that fits your institution's culture and goals.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 7: Revenue Sharing vs Paid Subscriptions */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-yellow-400/30 overflow-hidden">
        <button
          onClick={() => toggleFAQ(6)}
          className="w-full flex items-start gap-4 p-6 sm:p-8 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6 text-yellow-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-2xl font-bold text-white pr-8">What's the difference between paid subscriptions and the free revenue sharing model?</h4>
          </div>
          <ChevronDown className={`w-6 h-6 text-yellow-300 flex-shrink-0 transition-transform ${openFAQ === 6 ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === 6 ? 'max-h-[4000px]' : 'max-h-0'}`}>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-24 space-y-4 text-white/90 text-base sm:text-lg">
            <p>
              <strong className="text-white">ZALPHA offers TWO partnership models for educational institutions:</strong> Paid Subscriptions (upfront monthly fees) OR Revenue Sharing (FREE to join, share in placement success). Choose the model that best fits your institution's budget and goals.
            </p>

            {/* Revenue Sharing Model */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border-2 border-green-400/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="text-2xl font-bold text-white">💚 Revenue Sharing Model (FREE to Join)</h5>
                  <p className="text-green-300 font-semibold">Perfect for budget-constrained institutions</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-5 space-y-4">
                <div>
                  <p className="font-bold text-white mb-2">How It Works:</p>
                  <ul className="ml-6 space-y-2 text-white/90">
                    <li>• <strong className="text-white">$0 upfront cost</strong> - No monthly subscription fees, no setup fees, no hidden costs</li>
                    <li>• <strong className="text-white">FREE platform access</strong> - Your students get full access to ZALPHA without your institution paying anything</li>
                    <li>• <strong className="text-white">Revenue share on placements</strong> - When your student gets hired through ZALPHA, we share a percentage of the employer's subscription revenue with your institution</li>
                    <li>• <strong className="text-white">Success-based model</strong> - You only "pay" (through revenue sharing) when students successfully get jobs</li>
                  </ul>
                </div>

                <div className="bg-green-500/20 border-2 border-green-400/50 rounded-lg p-5">
                  <p className="font-bold text-yellow-300 mb-3">💰 Revenue Sharing Breakdown:</p>
                  <div className="space-y-3 text-white/95">
                    <p>
                      <strong className="text-white">Example:</strong> If an employer pays $249/month (Professional tier) and hires 3 of your students:
                    </p>
                    <ul className="ml-6 space-y-2">
                      <li>• ZALPHA shares <strong className="text-yellow-300">15-20% of employer revenue</strong> with your institution</li>
                      <li>• That's <strong className="text-yellow-300">$37-$50 per month</strong> for each active employment connection</li>
                      <li>• Multiply this by ALL successful placements across all employers</li>
                      <li>• Revenue continues as long as the employer remains subscribed and your graduates remain employed</li>
                    </ul>
                    <p className="text-yellow-300 font-bold mt-3">
                      ⚡ The more students you place, the more revenue you earn!
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-white mb-2">✅ What's Included (FREE):</p>
                  <ul className="ml-6 space-y-1 text-white/90">
                    <li>✅ Unlimited student access to ZALPHA platform</li>
                    <li>✅ Basic institution dashboard with placement tracking</li>
                    <li>✅ Standard reporting and analytics</li>
                    <li>✅ Virtual job fair participation (limited)</li>
                    <li>✅ Email support</li>
                    <li>✅ Co-branded marketing materials</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-white mb-2">❌ What's Limited or Not Included:</p>
                  <ul className="ml-6 space-y-1 text-white/80">
                    <li>❌ Advanced analytics and predictive insights (Premium/Enterprise only)</li>
                    <li>❌ SSO or SIS integration (Premium/Enterprise only)</li>
                    <li>❌ White-label career pages (Enterprise only)</li>
                    <li>❌ Dedicated account manager (Premium/Enterprise only)</li>
                    <li>❌ Priority support (Premium/Enterprise only)</li>
                    <li>❌ Custom skills assessments (Enterprise only)</li>
                  </ul>
                </div>

                <div className="bg-blue-500/20 border border-blue-400/40 rounded-lg p-4 mt-4">
                  <p className="font-bold text-white mb-2">👍 Best For:</p>
                  <ul className="ml-6 space-y-1 text-white/90 text-sm">
                    <li>• Small institutions with tight budgets</li>
                    <li>• Schools wanting to test ZALPHA risk-free</li>
                    <li>• Institutions confident in high placement rates</li>
                    <li>• Programs focused on employment outcomes over analytics</li>
                    <li>• Schools that don't need technical integrations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Paid Subscription Model */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border-2 border-blue-400/40 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="text-2xl font-bold text-white">💙 Paid Subscription Model</h5>
                  <p className="text-blue-300 font-semibold">Full-featured partnership with predictable costs</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-5 space-y-4">
                <div>
                  <p className="font-bold text-white mb-2">How It Works:</p>
                  <ul className="ml-6 space-y-2 text-white/90">
                    <li>• <strong className="text-white">Fixed monthly subscription</strong> - Predictable costs: $299, $799, or $1,999/month based on school size</li>
                    <li>• <strong className="text-white">Full platform access</strong> - All features available at your tier level</li>
                    <li>• <strong className="text-white">No revenue sharing</strong> - Keep 100% of any employer relationships or outcomes</li>
                    <li>• <strong className="text-white">Premium features</strong> - Access to advanced analytics, integrations, and support</li>
                  </ul>
                </div>

                <div className="bg-blue-500/20 border-2 border-blue-400/50 rounded-lg p-5">
                  <p className="font-bold text-yellow-300 mb-3">💎 Subscription Tiers Quick Reference:</p>
                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    <div className="bg-white/10 rounded-lg p-4 border border-cyan-400/30">
                      <p className="font-bold text-cyan-300 mb-2">Basic - $299/month</p>
                      <p className="text-sm text-white/80">≤500 students</p>
                      <p className="text-sm text-white/80 mt-2">Dashboard + basic reporting</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 border border-emerald-400/30">
                      <p className="font-bold text-emerald-300 mb-2">Premium - $799/month</p>
                      <p className="text-sm text-white/80">501-2,000 students</p>
                      <p className="text-sm text-white/80 mt-2">Advanced analytics + SSO</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 border border-purple-400/30">
                      <p className="font-bold text-purple-300 mb-2">Enterprise - $1,999/month</p>
                      <p className="text-sm text-white/80">2,000+ students</p>
                      <p className="text-sm text-white/80 mt-2">Full SIS integration + white-label</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-white mb-2">✅ What's Included:</p>
                  <ul className="ml-6 space-y-1 text-white/90">
                    <li>✅ Everything in revenue sharing model, PLUS:</li>
                    <li>✅ Advanced analytics and predictive insights (Premium+)</li>
                    <li>✅ SSO and/or SIS integration options (Premium+)</li>
                    <li>✅ Unlimited virtual job fairs (Premium+)</li>
                    <li>✅ Dedicated account manager (Premium+)</li>
                    <li>✅ Priority support (Premium+)</li>
                    <li>✅ White-label and API access (Enterprise)</li>
                    <li>✅ Custom skills assessments (Enterprise)</li>
                  </ul>
                </div>

                <div className="bg-green-500/20 border border-green-400/40 rounded-lg p-4 mt-4">
                  <p className="font-bold text-white mb-2">👍 Best For:</p>
                  <ul className="ml-6 space-y-1 text-white/90 text-sm">
                    <li>• Institutions with dedicated workforce development budgets</li>
                    <li>• Schools needing advanced analytics for accreditation</li>
                    <li>• Institutions requiring SSO or SIS integration</li>
                    <li>• Large schools with 500+ students</li>
                    <li>• Programs seeking priority support and dedicated account management</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white/5 rounded-2xl p-6 border-2 border-white/20 mt-6">
              <h5 className="text-2xl font-bold text-white mb-4 text-center">📊 Side-by-Side Comparison</h5>
              
              <div className="overflow-x-auto">
                <table className="w-full text-white/90">
                  <thead>
                    <tr className="border-b-2 border-white/30">
                      <th className="text-left py-3 px-4 text-white">Feature</th>
                      <th className="text-center py-3 px-4 text-green-300">Revenue Sharing</th>
                      <th className="text-center py-3 px-4 text-blue-300">Paid Subscription</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Upfront Cost</td>
                      <td className="text-center py-3 px-4 text-green-400 font-bold">$0</td>
                      <td className="text-center py-3 px-4">$299 - $1,999/month</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Student Platform Access</td>
                      <td className="text-center py-3 px-4">✅ Free</td>
                      <td className="text-center py-3 px-4">✅ Free</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Basic Dashboard & Reporting</td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Advanced Analytics</td>
                      <td className="text-center py-3 px-4 text-red-400">❌</td>
                      <td className="text-center py-3 px-4 text-green-400">✅ (Premium+)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">SSO/SIS Integration</td>
                      <td className="text-center py-3 px-4 text-red-400">❌</td>
                      <td className="text-center py-3 px-4 text-green-400">✅ (Premium+)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Dedicated Account Manager</td>
                      <td className="text-center py-3 px-4 text-red-400">❌</td>
                      <td className="text-center py-3 px-4 text-green-400">✅ (Premium+)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Priority Support</td>
                      <td className="text-center py-3 px-4 text-red-400">❌</td>
                      <td className="text-center py-3 px-4 text-green-400">✅ (Premium+)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Revenue Sharing</td>
                      <td className="text-center py-3 px-4">15-20% of employer fees</td>
                      <td className="text-center py-3 px-4 text-green-400">None (keep 100%)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Risk Level</td>
                      <td className="text-center py-3 px-4 text-green-400">Zero risk</td>
                      <td className="text-center py-3 px-4">Predictable investment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* When to Choose Which */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border-2 border-purple-400/40 mt-6">
              <h5 className="text-2xl font-bold text-white mb-4">🤔 Which Model Should You Choose?</h5>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-5">
                  <p className="font-bold text-green-300 mb-2">Choose Revenue Sharing If:</p>
                  <ul className="ml-6 space-y-2 text-white/90">
                    <li>• You have <strong className="text-white">limited or no budget</strong> for career services technology</li>
                    <li>• You want to <strong className="text-white">test ZALPHA with zero financial risk</strong></li>
                    <li>• You're confident in your <strong className="text-white">ability to drive student placements</strong></li>
                    <li>• You <strong className="text-white">don't need advanced integrations</strong> or premium features right now</li>
                    <li>• You prefer <strong className="text-white">performance-based partnerships</strong> over fixed costs</li>
                  </ul>
                </div>

                <div className="bg-white/10 rounded-lg p-5">
                  <p className="font-bold text-blue-300 mb-2">Choose Paid Subscription If:</p>
                  <ul className="ml-6 space-y-2 text-white/90">
                    <li>• You have <strong className="text-white">workforce development grant funding</strong> or budget allocated</li>
                    <li>• You need <strong className="text-white">advanced analytics</strong> for accreditation or reporting</li>
                    <li>• You require <strong className="text-white">SSO or SIS integration</strong> for seamless student access</li>
                    <li>• You want <strong className="text-white">priority support and dedicated account management</strong></li>
                    <li>• You prefer <strong className="text-white">predictable monthly costs</strong> for budgeting</li>
                    <li>• You're a <strong className="text-white">larger institution (500+ students)</strong> needing enterprise features</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Can You Switch? */}
            <div className="bg-yellow-500/10 border-2 border-yellow-400/40 rounded-lg p-5 mt-4">
              <p className="font-bold text-white mb-3">🔄 Can You Switch Between Models?</p>
              <p className="text-white/90 mb-3">
                <strong className="text-white">Yes!</strong> You can start with revenue sharing and upgrade to a paid subscription anytime (or vice versa). Many institutions:
              </p>
              <ul className="ml-6 space-y-2 text-white/90">
                <li>• <strong className="text-white">Start with revenue sharing</strong> to prove value with zero risk</li>
                <li>• <strong className="text-white">Upgrade to paid</strong> once they see placement success and want premium features</li>
                <li>• <strong className="text-white">Downgrade to revenue sharing</strong> if budget constraints arise</li>
              </ul>
              <p className="text-yellow-300 font-bold mt-3">
                💡 We're flexible! Choose what works for your institution's current situation.
              </p>
            </div>

            <p className="text-white font-semibold mt-6 text-center text-xl">
              🎯 <strong>Bottom line:</strong> Revenue sharing = Zero risk, lower features. Paid subscription = Full features, predictable costs. Both models support your students' success!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}