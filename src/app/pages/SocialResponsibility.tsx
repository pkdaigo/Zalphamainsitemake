import { Heart, Shield } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { CollapsibleSection } from '@/app/components/CollapsibleSection';
import { FAQ4Skepticism } from '@/app/components/FAQ4Skepticism';
import { FAQ5SmallBusinessPricing } from '@/app/components/FAQ5SmallBusinessPricing';
import { FAQ6PlatformComparison } from '@/app/components/FAQ6PlatformComparison';
import { FAQ7EconomicReality } from '@/app/components/FAQ7EconomicReality';

interface SocialResponsibilityProps {
  onNavigate: (page: string) => void;
}

export function SocialResponsibility({ onNavigate }: SocialResponsibilityProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <BackButton onNavigate={onNavigate} />

        <div className="space-y-8 sm:space-y-12">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 px-2">
              Social Responsibility & Community Impact
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed px-4">
              ZALPHA is more than a business—it's a commitment to the Pacific Islands community. 
              We address the hard questions, acknowledge real concerns, and operate with radical transparency.
            </p>
          </div>

          {/* Our Commitment */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-white/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 flex-shrink-0" />
              <h3 className="text-3xl sm:text-4xl font-bold text-white">Our Commitment to the Community</h3>
            </div>
            <div className="space-y-4 text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">
              <p>
                <strong className="text-white">ZALPHA was born in the CNMI.</strong> We understand 
                the unique challenges facing our communities: high unemployment, brain drain, economic uncertainty, and limited opportunities for young people.
              </p>
              <p>
                We're not a mainland company trying to extract value from our region. <strong className="text-white">We live here. Our families are here. 
                Our futures are tied to the success of our community.</strong>
              </p>
              <p>
                That means we operate with <strong className="text-white">radical transparency</strong>, address concerns head-on, and hold ourselves 
                accountable to the communities we serve. This page answers the hard questions that stakeholders across the Pacific Islands are asking.
              </p>
            </div>
          </div>

          {/* FAQs Grid */}
          <div className="space-y-8">
            {/* FAQ 4: Skepticism */}
            <CollapsibleSection
              title={'💭 "How do we know ZALPHA isn\'t just another waste of time?"'}
              defaultOpen={true}
              colorScheme="red"
            >
              <FAQ4Skepticism />
            </CollapsibleSection>

            {/* FAQ 5: Small Business Pricing */}
            <CollapsibleSection
              title={'💵 "How can small businesses afford ZALPHA?"'}
              defaultOpen={true}
              colorScheme="green"
            >
              <FAQ5SmallBusinessPricing />
            </CollapsibleSection>

            {/* FAQ 6: Platform Comparison */}
            <CollapsibleSection
              title={'🤔 "What makes ZALPHA different from LinkedIn, Indeed, Zip Recruiter, Monster, Handshake, and Upwork?"'}
              defaultOpen={true}
              colorScheme="blue"
            >
              <FAQ6PlatformComparison />
            </CollapsibleSection>

            {/* FAQ 7: Economic Reality */}
            <CollapsibleSection
              title={'📊 "What\'s the real economic situation in Pacific Islands?"'}
              defaultOpen={true}
              colorScheme="purple"
            >
              <FAQ7EconomicReality />
            </CollapsibleSection>
          </div>

          {/* BETA TESTING OFFER */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-3xl p-8 sm:p-12 border-4 border-yellow-300/50 shadow-2xl">
            <div className="text-center">
              <div className="inline-block bg-yellow-300 text-purple-900 px-6 py-2 rounded-full font-black text-lg sm:text-xl mb-6 animate-pulse">
                🎉 LIMITED BETA OFFER 🎉
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Get 6 Months Premium FREE!
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-6 max-w-3xl mx-auto">
                <strong className="text-yellow-300">Employers:</strong> Premium Tier access free for 6 months (Worth $600+)<br/>
                <strong className="text-yellow-300">Students:</strong> Premium features free for 6 months (Worth $30+)
              </p>
              <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join our beta program, help shape the platform with your feedback, and get full premium access absolutely free — no credit card required!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button 
                  onClick={() => onNavigate('employer-signup')}
                  className="px-8 py-4 bg-white text-purple-700 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                >
                  I'm an Employer - Sign Up Free
                </button>
                <button 
                  onClick={() => onNavigate('student-signup')}
                  className="px-8 py-4 bg-white text-indigo-700 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                >
                  I'm a Student - Sign Up Free
                </button>
              </div>
              <p className="text-white/80 text-sm sm:text-base mt-6 italic">
                Limited beta slots available • Cancel anytime • No obligations
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 border-4 border-white/30 shadow-2xl text-center">
            <h3 className="text-4xl font-bold text-white mb-4">Still Have Questions or Concerns?</h3>
            <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              We're not hiding from tough conversations. If you have concerns about ZALPHA, discrimination, economic viability, 
              competition with local programs, or anything else—<strong className="text-white">reach out directly.</strong>
            </p>
            <p className="text-xl text-white/90 mb-6">
              The ZALPHA team will talk to you, address your concerns, and work together to find solutions. We're accountable to this community, 
              and we take that responsibility seriously.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-8 py-4 bg-white text-purple-700 rounded-xl font-bold text-lg hover:bg-white/90 transition-colors">
                Contact the ZALPHA Team
              </button>
              <button 
                onClick={() => onNavigate('home')}
                className="px-8 py-4 bg-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-colors border-2 border-white/50"
              >
                Return to Home
              </button>
            </div>
          </div>

          {/* Community Accountability Statement */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-green-400/30">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">Our Community Accountability Pledge</h3>
            <div className="space-y-4 text-white/90 text-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p>
                  <strong className="text-white">We will never discriminate</strong> based on ethnicity, citizenship status, gender, age, or disability. 
                  Every student deserves opportunity.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p>
                  <strong className="text-white">We will never compete with local programs</strong>—only partner. If a program already works, 
                  we support it rather than duplicate it.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p>
                  <strong className="text-white">We will keep ZALPHA affordable</strong> for small businesses and FREE for students, always.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p>
                  <strong className="text-white">We will operate with transparency</strong>—if we make mistakes, we'll own them and fix them publicly.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p>
                  <strong className="text-white">We will listen to feedback</strong> from students, employers, schools, and community leaders—and actually implement changes.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p>
                  <strong className="text-white">We will measure our success</strong> by community outcomes—not just revenue. Jobs created, students placed, 
                  businesses helped—that's what matters.
                </p>
              </div>
            </div>
            <p className="text-white text-xl font-bold text-center mt-8">
              This is our promise to the Pacific Islands. Hold us to it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}