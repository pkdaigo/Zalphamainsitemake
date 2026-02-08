import { Heart, Target, Globe, Users, TrendingUp, GraduationCap, Building2, Leaf, Shield, HandHeart, Sparkles, Award, ArrowRight } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { CollapsibleSection } from '@/app/components/CollapsibleSection';

interface MissionSocialImpactProps {
  onNavigate: (page: string) => void;
}

export function MissionSocialImpact({ onNavigate }: MissionSocialImpactProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Mission & Social Impact</h1>
                <p className="text-xs text-green-300">Our commitment to the Pacific Islands</p>
              </div>
            </div>
            <BackButton onNavigate={onNavigate} />
          </div>
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 px-4">More Than a Platform</h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto mb-4">
              We're building the economic future of the Pacific Islands, one connection at a time
            </p>
            <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-3 rounded-2xl border-2 border-white/30 shadow-2xl">
              <p className="text-lg font-bold">🌟 First EdTech SaaS Platform Born in the CNMI 🌟</p>
              <p className="text-xs mt-1 text-white/90">Trademark Pending ™ | IP Patent Pending</p>
            </div>
          </div>

          {/* Core Mission - Always Visible */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 border-4 border-white/30 shadow-2xl">
            <div className="text-center mb-8">
              <Target className="w-16 h-16 text-white mx-auto mb-4" />
              <h3 className="text-5xl font-bold text-white mb-4">Our Mission</h3>
            </div>
            <div className="text-white text-2xl leading-relaxed space-y-4 text-center max-w-4xl mx-auto">
              <p className="font-bold">
                To transform the Pacific Islands' workforce by creating equitable access to employment opportunities, 
                professional development, and economic prosperity.
              </p>
              <p className="text-xl text-white/90">
                We exist to solve the critical labor shortage and work-readiness crisis that has held back our region for too long.
              </p>
            </div>
          </div>

          {/* The Crisis We're Addressing - Collapsible */}
          <CollapsibleSection
            title="The Crisis We're Addressing"
            subtitle="Understanding the challenges facing our region"
            icon={<Shield className="w-8 h-8 text-red-400" />}
            colorScheme="red"
            defaultOpen={true}
          >
            <div className="p-4">
              <div className="text-white/90 text-lg space-y-6 leading-relaxed">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-500/20 rounded-2xl p-6 border-2 border-red-400/50">
                    <h4 className="text-2xl font-bold text-white mb-4">💔 Economic Struggle</h4>
                    <p className="text-white/80">
                      The CNMI, Guam, and surrounding Pacific territories face near-zero economic growth. Businesses struggle 
                      to find workers. Families struggle to find stable employment. Our economy is stagnant.
                    </p>
                  </div>

                  <div className="bg-red-500/20 rounded-2xl p-6 border-2 border-red-400/50">
                    <h4 className="text-2xl font-bold text-white mb-4">🚨 Labor Shortage Crisis</h4>
                    <p className="text-white/80">
                      Employers can't find qualified candidates. The lack of work-ready labor has created a terrible 
                      situation across Saipan, Guam, and the region—stifling business growth and economic development.
                    </p>
                  </div>

                  <div className="bg-red-500/20 rounded-2xl p-6 border-2 border-red-400/50">
                    <h4 className="text-2xl font-bold text-white mb-4">🎓 The Workforce Readiness Challenge</h4>
                    <p className="text-white/80">
                      In some Pacific regions, there's a gap between classroom learning and workplace expectations. While our schools 
                      and colleges are doing great work educating students, employers often need additional job-specific skills, 
                      certifications, and hands-on training. ZALPHA exists to complement our educational institutions by providing 
                      that extra layer of workforce preparation—bridging the final mile between graduation and employment success.
                    </p>
                  </div>

                  <div className="bg-red-500/20 rounded-2xl p-6 border-2 border-red-400/50">
                    <h4 className="text-2xl font-bold text-white mb-4">✈️ Brain Drain</h4>
                    <p className="text-white/80">
                      Our brightest students leave for the mainland or other regions because there's no clear path to 
                      meaningful employment here. We lose talent we desperately need.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-8 border-2 border-white/20 mt-8">
                  <p className="text-2xl font-bold text-yellow-300 text-center">
                    "Without intervention, this crisis will only get worse. ZALPHA is our intervention."
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* How ZALPHA Creates Social Impact - Collapsible */}
          <CollapsibleSection
            title="How ZALPHA Creates Social Impact"
            subtitle="Five ways we're transforming the Pacific Islands"
            icon={<Sparkles className="w-8 h-8 text-green-400" />}
            colorScheme="green"
          >
            <div className="p-4 space-y-6">
              {/* Impact Area 1 */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl p-8 border-2 border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white mb-3">1. Connecting Job Seekers to Opportunities</h4>
                    <p className="text-white/90 text-lg mb-4">
                      We make it free for students and job seekers to create profiles, access training, take skills assessments, 
                      and connect with employers—removing financial barriers that have kept opportunities out of reach.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-white/80">
                      <li>100% free for all Pacific Island students and job seekers</li>
                      <li>Access to skills training and gamified assessments</li>
                      <li>Direct connections to local and regional employers</li>
                      <li>Premium features available for those who can afford them, but core platform remains free</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Impact Area 2 */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl p-8 border-2 border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white mb-3">2. Building Work-Ready Skills</h4>
                    <p className="text-white/90 text-lg mb-4">
                      We don't just connect people to jobs—we prepare them to succeed. Our platform includes comprehensive 
                      training programs designed to complement what schools teach and bridge the gap between education and employment.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-white/80">
                      <li>Free basic skills assessments (typing, communication, critical thinking)</li>
                      <li>Cultural sensitivity training for diverse workplaces</li>
                      <li>Professional development courses and certifications</li>
                      <li>Real-world job simulations and interview practice with AI</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Impact Area 3 */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 border-2 border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white mb-3">3. Supporting Local Businesses</h4>
                    <p className="text-white/90 text-lg mb-4">
                      We provide affordable, subscription-based recruiting that doesn't drain business budgets. No massive 
                      upfront fees, no percentage-based recruiting costs—just transparent monthly pricing.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-white/80">
                      <li>Subscriptions starting at $99/month (vs. traditional recruiting that costs thousands per hire)</li>
                      <li>Contract job postings are 100% FREE</li>
                      <li>Access to pre-vetted, work-ready candidates</li>
                      <li>Supporting local economic growth by making hiring sustainable</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Impact Area 4 */}
              <div className="bg-gradient-to-r from-orange-600 to-red-700 rounded-2xl p-8 border-2 border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HandHeart className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white mb-3">4. Partnering with Schools & Institutions</h4>
                    <p className="text-white/90 text-lg mb-4">
                      We empower educational institutions to become active participants in workforce development, creating 
                      revenue opportunities while helping their students succeed.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-white/80">
                      <li>Revenue sharing with schools when their students subscribe to premium features</li>
                      <li>Free tools for career counselors and student success teams</li>
                      <li>Direct pathways from education to employment</li>
                      <li>Helping schools demonstrate ROI and student outcomes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Impact Area 5 */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 border-2 border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white mb-3">5. Strengthening Regional Economy</h4>
                    <p className="text-white/90 text-lg mb-4">
                      Every successful job placement strengthens our economy. Every student who gains skills is an investment 
                      in our future. Every business that finds talent can grow and create more opportunities.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-white/80">
                      <li>Keeping young talent in the Pacific Islands instead of forcing them to leave</li>
                      <li>Creating a virtuous cycle: more jobs → more skills → stronger economy → more opportunities</li>
                      <li>Reducing dependency on imported labor by developing local workforce</li>
                      <li>Building a data-driven understanding of our regional labor market</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Social Responsibility Commitments - Collapsible */}
          <CollapsibleSection
            title="Our Social Responsibility Commitments"
            subtitle="Six core principles guiding everything we do"
            icon={<Award className="w-8 h-8 text-blue-400" />}
            colorScheme="blue"
          >
            <div className="p-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-500/20 rounded-2xl p-6 border-2 border-blue-400/50">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-green-400" />
                    Environmental Stewardship
                  </h4>
                  <p className="text-white/80">
                    As island communities, we understand the fragility of our environment. ZALPHA operates as a digital-first 
                    platform, minimizing our carbon footprint and supporting remote work opportunities that reduce commuting.
                  </p>
                </div>

                <div className="bg-purple-500/20 rounded-2xl p-6 border-2 border-purple-400/50">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-400" />
                    Equal Opportunity
                  </h4>
                  <p className="text-white/80">
                    We're committed to providing equal access regardless of background, gender, age (18+), or economic status. 
                    Our platform is designed to level the playing field for all Pacific Islanders.
                  </p>
                </div>

                <div className="bg-green-500/20 rounded-2xl p-6 border-2 border-green-400/50">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-cyan-400" />
                    Privacy & Data Protection
                  </h4>
                  <p className="text-white/80">
                    Students have FULL control over their data. We're FERPA compliant and protect student privacy rigorously. 
                    You decide what employers see—not us.
                  </p>
                </div>

                <div className="bg-orange-500/20 rounded-2xl p-6 border-2 border-orange-400/50">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-pink-400" />
                    Community Investment
                  </h4>
                  <p className="text-white/80">
                    We reinvest in the communities we serve through partnerships with local schools, sponsorships, and 
                    continuous platform improvements based on user feedback.
                  </p>
                </div>

                <div className="bg-cyan-500/20 rounded-2xl p-6 border-2 border-cyan-400/50">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-yellow-400" />
                    Lifelong Learning
                  </h4>
                  <p className="text-white/80">
                    We believe education doesn't stop at graduation. ZALPHA provides continuous learning opportunities, 
                    upskilling programs, and career development resources for users at every stage.
                  </p>
                </div>

                <div className="bg-pink-500/20 rounded-2xl p-6 border-2 border-pink-400/50">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-indigo-400" />
                    Transparent Operations
                  </h4>
                  <p className="text-white/80">
                    No hidden fees, no surprise charges, no unfair practices. Everything about ZALPHA is designed to be 
                    transparent, fair, and honest—from pricing to privacy policies.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Our Vision for 2030 - Collapsible */}
          <CollapsibleSection
            title="Our Vision for 2030"
            subtitle="Building a thriving Pacific Islands workforce"
            icon={<Globe className="w-8 h-8 text-purple-400" />}
            colorScheme="purple"
          >
            <div className="p-4">
              <div className="text-white text-xl leading-relaxed space-y-4">
                <p className="text-2xl font-bold text-yellow-300 text-center">
                  A thriving Pacific Islands workforce where every student has a clear path to meaningful employment, 
                  every business can find qualified talent, and our regional economy is strong and sustainable.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white/20 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold mb-2">50,000+</div>
                    <div className="text-white/90">Students Connected to Jobs</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold mb-2">2,000+</div>
                    <div className="text-white/90">Employers Hiring Locally</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold mb-2">100%</div>
                    <div className="text-white/90">Coverage Across 6 Territories</div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Join the Movement - Always Visible CTA */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/30 text-center mt-12">
            <h3 className="text-4xl font-bold text-white mb-6">Join the Movement</h3>
            <p className="text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Every person who joins ZALPHA is part of the solution. Together, we're rebuilding the Pacific Islands' economy.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={() => onNavigate('student-signup')}
                className="px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl"
              >
                Start as a Job Seeker
              </button>
              <button
                onClick={() => onNavigate('employer-signup')}
                className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl"
              >
                Hire Through ZALPHA
              </button>
            </div>

            <div className="pt-8 border-t border-white/20">
              <button
                onClick={() => onNavigate('about-us')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white rounded-xl font-bold text-lg transition-all"
              >
                Learn More About Our Team
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
