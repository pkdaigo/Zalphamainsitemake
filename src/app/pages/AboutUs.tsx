import { Users, Heart, Briefcase, GraduationCap, Target, Globe, Building2, ArrowRight } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { CollapsibleSection } from '@/app/components/CollapsibleSection';

interface AboutUsProps {
  onNavigate: (page: string) => void;
}

export function AboutUs({ onNavigate }: AboutUsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">About Us</h1>
                <p className="text-xs text-blue-300">Meet the team behind ZALPHA</p>
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
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Building Bridges to Opportunity</h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto mb-4">
              Built by residents who love the Pacific Islands, dedicated to transforming our region's workforce
            </p>
            <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-4 rounded-2xl border-2 border-white/30 shadow-2xl">
              <p className="text-2xl font-bold">🌟 The First EdTech SaaS Platform Born in the CNMI 🌟</p>
              <p className="text-sm mt-2 text-white/90">Trademark Pending ™ | Intellectual Property Patent Pending</p>
            </div>
          </div>

          {/* Our Story - Collapsible */}
          <CollapsibleSection
            title="Our Story"
            subtitle="Why ZALPHA exists and the crisis we're solving"
            icon={<Target className="w-8 h-8 text-blue-400" />}
            colorScheme="blue"
            defaultOpen={true}
          >
            <div className="text-white/90 text-lg space-y-4 leading-relaxed p-4">
              <p>
                ZALPHA was born out of necessity and passion—a deep understanding of the workforce challenges 
                facing the Commonwealth of the Northern Mariana Islands (CNMI), Guam, and the broader Pacific region.
              </p>
              <p>
                Our economy is struggling. The lack of work-ready labor has created a terrible situation that affects 
                businesses, communities, and families across Saipan, Guam, and other regional areas. We saw this crisis 
                firsthand and knew something had to change.
              </p>
              <p className="text-blue-300 font-semibold text-xl">
                ZALPHA is our answer—a comprehensive workforce development platform specifically designed for the Pacific Islands.
              </p>
            </div>
          </CollapsibleSection>

          {/* The Founders - Combined & Streamlined */}
          <CollapsibleSection
            title="Meet the Co-Founders"
            subtitle="Local leaders with deep Pacific Islands roots and expertise"
            icon={<Users className="w-8 h-8 text-purple-400" />}
            colorScheme="purple"
          >
            <div className="p-4 space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* PK Daigo */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Briefcase className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold text-white">PK Daigo</h4>
                      <p className="text-blue-200 font-semibold">Co-Founder</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-white/90">
                    <p className="text-lg">
                      <strong className="text-white">Talent Acquisition Expert & Business Leader</strong> with deep roots in Pacific Islands recruiting.
                    </p>
                    <p>
                      Holds a <strong className="text-white">dual Master's degree (MSW & MBA)</strong> and serves as 
                      <strong className="text-white"> President of the Marianas Business Network</strong>, bringing firsthand understanding 
                      of employer challenges in finding qualified local talent.
                    </p>
                    <p>
                      "We needed a solution built specifically for our region—one that understands our unique challenges, 
                      our culture, and our economic reality."
                    </p>
                    
                    <div className="pt-4 border-t border-white/20">
                      <p className="text-sm text-blue-200">
                        <strong>Education:</strong> Dual Master's (MSW & MBA)
                      </p>
                      <p className="text-sm text-blue-200 mt-1">
                        <strong>Role:</strong> President, Marianas Business Network
                      </p>
                      <p className="text-sm text-blue-200 mt-1">
                        <strong>Background:</strong> KI Executive Group
                      </p>
                      <a 
                        href="https://www.kiexgroup.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-white underline text-sm inline-flex items-center gap-2 mt-2"
                      >
                        Visit www.kiexgroup.com <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Eleanor Alinas */}
                <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold text-white">Eleanor Alinas</h4>
                      <p className="text-purple-200 font-semibold">Co-Founder</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-white/90">
                    <p className="text-lg">
                      <strong className="text-white">Veteran Educator & Business Leader</strong> with experience in CNMI schools 
                      and the San Francisco Bay Area.
                    </p>
                    <p>
                      Holds an <strong className="text-white">MBA</strong> and has been <strong className="text-white">CEO of Kalaayan for over 20 years</strong>, 
                      building it into the largest food service provider for CNMI Public Schools across all three islands. 
                      Kalaayan also serves Guam Community College and daycares throughout Guam.
                    </p>
                    <p>
                      "Our students are brilliant and capable, but they need the right tools, training, and connections 
                      to compete in today's job market."
                    </p>
                    
                    <div className="pt-4 border-t border-white/20">
                      <p className="text-sm text-purple-200">
                        <strong>Education:</strong> MBA
                      </p>
                      <p className="text-sm text-purple-200 mt-1">
                        <strong>Background:</strong> CNMI & SF Bay Area Education
                      </p>
                      <p className="text-sm text-purple-200 mt-1">
                        <strong>Role:</strong> CEO, Kalaayan (20+ Years)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partnership Summary */}
              <div className="bg-white/10 rounded-2xl p-6 mt-6">
                <div className="text-white/90 text-lg space-y-3 leading-relaxed">
                  <p className="text-center text-xl font-semibold text-white mb-4">
                    Two Perspectives. One Powerful Solution.
                  </p>
                  <p>
                    PK brings workforce development expertise and employer insights. Eleanor brings educational excellence 
                    and proven business leadership. Together, they created ZALPHA—a platform that bridges the gap between 
                    students and employers while addressing the systemic challenges facing the Pacific Islands.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Coming Soon - Collapsible */}
          <CollapsibleSection
            title="Coming Soon: ZALPHA for Everyone"
            subtitle="Expanding beyond students to serve all professionals"
            icon={<Globe className="w-8 h-8 text-green-400" />}
            colorScheme="green"
          >
            <div className="p-4">
              <div className="bg-white/10 rounded-2xl p-8 space-y-6 text-white/95 text-lg leading-relaxed">
                <div className="text-center mb-6">
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border-2 border-white/40">
                    <p className="text-2xl font-bold text-white">Currently in BETA Phase</p>
                  </div>
                </div>

                <p className="text-2xl font-bold text-white text-center border-b-2 border-white/40 pb-4">
                  We hear you! Many professionals have asked: "Can I sign up even if I'm not a college student or recent graduate?"
                </p>

                <p className="text-xl">
                  <strong className="text-white">Right now, ZALPHA is in beta focusing specifically on college students and high school graduates.</strong> We're 
                  perfecting this platform for our youth—building the features, testing the systems, and creating a proven model that truly works.
                </p>

                <p>
                  But here's the exciting news: <strong className="text-white">We're developing a second platform that will serve everyone else</strong>—
                  experienced professionals, career changers, skilled workers, and anyone seeking opportunities in the Pacific region.
                </p>

                <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6">
                  <p className="text-2xl font-bold text-white mb-4 text-center">🌏 Our Vision: A More Global Presence for Pacific Regions</p>
                  <p className="text-white/95 text-center">
                    We're not stopping at students. Our mission is to build comprehensive workforce solutions that serve the entire 
                    Pacific Islands community—from entry-level youth to seasoned professionals—while expanding our reach and impact globally.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/30">
                    <p className="font-bold text-white mb-2">✅ Phase 1 (Current - BETA):</p>
                    <p className="text-white/90">College students & high school graduates</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/30">
                    <p className="font-bold text-white mb-2">🚀 Phase 2 (Coming Soon):</p>
                    <p className="text-white/90">Experienced professionals & skilled workers</p>
                  </div>
                </div>

                <p className="text-xl font-semibold text-white bg-white/20 border-2 border-white/40 rounded-xl p-6 text-center mt-6">
                  Why focus on students first? Because they need it most—and once we get this right, we'll expand to serve everyone 
                  with the same quality, innovation, and commitment to the Pacific Islands.
                </p>

                <div className="bg-yellow-400/20 border-2 border-yellow-300/50 rounded-xl p-6 mt-6">
                  <p className="text-xl font-bold text-white mb-3 text-center">📬 Want to be notified when the professional platform launches?</p>
                  <p className="text-white/90 text-center">
                    Stay connected with us! Follow our progress, and you'll be the first to know when ZALPHA expands to serve 
                    all workforce levels across the Pacific Islands and beyond.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Our Team - Collapsible */}
          <CollapsibleSection
            title="A Team with Invested Interest"
            subtitle="Meet the dedicated professionals behind ZALPHA"
            icon={<Building2 className="w-8 h-8 text-cyan-400" />}
            colorScheme="cyan"
          >
            <div className="p-4">
              <p className="text-white/90 text-xl text-center mb-8">
                ZALPHA isn't just a business—it's a mission supported by a dedicated team of professionals 
                who are personally invested in transforming the Pacific Islands' workforce
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h4 className="text-2xl font-bold text-white mb-3">🌊 Rooted in the Pacific Islands</h4>
                  <p className="text-white/80">
                    Our team lives and works in the CNMI, Guam, and surrounding territories. We're deeply embedded in this community, 
                    committed to its future, and understand the challenges because we face them every day alongside our neighbors.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h4 className="text-2xl font-bold text-white mb-3">💼 Industry Experts</h4>
                  <p className="text-white/80">
                    Recruiting professionals, HR specialists, educators, and technology developers who bring 
                    decades of combined experience to the platform.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h4 className="text-2xl font-bold text-white mb-3">🎓 Educational Advocates</h4>
                  <p className="text-white/80">
                    Former teachers, career counselors, and education administrators dedicated to complementing what schools teach 
                    and creating pathways to success for Pacific Island students.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h4 className="text-2xl font-bold text-white mb-3">🌏 Community Stakeholders</h4>
                  <p className="text-white/80">
                    Business owners, community leaders, and economic development advocates who understand that 
                    ZALPHA's success is our region's success.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Why This Matters - Collapsible */}
          <CollapsibleSection
            title="Why This Matters"
            subtitle="Our commitment to the Pacific Islands"
            icon={<Heart className="w-8 h-8 text-green-400" />}
            colorScheme="green"
          >
            <div className="text-white/90 text-lg space-y-4 leading-relaxed p-4">
              <p className="text-xl font-semibold text-green-300">
                The Pacific Islands deserve the same workforce technology as anywhere else in the world.
              </p>
              <p>
                Our region has been overlooked for too long. Generic recruiting platforms don't understand our 
                unique challenges: small populations, geographic isolation, limited access to training, and economic 
                constraints that make traditional recruiting models unsustainable.
              </p>
              <p>
                <strong className="text-white">ZALPHA was built specifically for us, by people who live here and care deeply about our future.</strong>
              </p>
              <p>
                This isn't about profit—it's about impact. We're committed to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6 text-white/90">
                <li>Creating job opportunities for Pacific Island youth</li>
                <li>Helping local businesses find qualified talent without breaking the bank</li>
                <li>Building skills and work-readiness in our communities</li>
                <li>Strengthening our regional economy one connection at a time</li>
                <li>Keeping our young people home instead of forcing them to seek opportunities elsewhere</li>
              </ul>
            </div>
          </CollapsibleSection>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-12 text-center border-4 border-white/30 shadow-2xl mt-12">
            <h3 className="text-4xl font-bold text-white mb-4">Join Us in Building a Better Future</h3>
            <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Whether you're a job seeker, employer, or educational institution, you're part of the ZALPHA family.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => onNavigate('student-signup')}
                className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl"
              >
                I'm a Job Seeker
              </button>
              <button
                onClick={() => onNavigate('employer-signup')}
                className="px-10 py-5 bg-purple-600 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl border-2 border-white"
              >
                I'm an Employer
              </button>
              <button
                onClick={() => onNavigate('school-login')}
                className="px-10 py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl"
              >
                I'm a School
              </button>
            </div>
          </div>

          {/* Learn More */}
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('mission-social-impact')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white rounded-xl font-bold text-lg transition-all"
            >
              Learn About Our Mission & Social Impact
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}