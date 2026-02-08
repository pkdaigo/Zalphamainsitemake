import { CollapsibleSection } from '@/app/components/CollapsibleSection';

export function FAQ6PlatformComparison() {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 space-y-6">
      <div className="bg-white/30 border-3 border-white/60 rounded-xl p-6">
        <p className="text-2xl font-bold text-white mb-4 text-center">
          🤔 "What makes ZALPHA different from LinkedIn, Indeed, Zip Recruiter, Monster, Handshake, and Upwork?"
        </p>
      </div>

      <div className="space-y-6 text-white/95 text-lg leading-relaxed">
        <p className="text-xl font-semibold text-white">
          Great question—because if we're just another job board, <strong className="text-white">why would you use us?</strong> Let's break down exactly what's broken about existing platforms and why they fail for the Pacific Islands:
        </p>

        <div className="bg-red-600/30 border-3 border-red-400/50 rounded-xl p-6">
          <p className="text-2xl font-bold text-white mb-4">⚠️ The Brutal Truth About Existing Platforms:</p>
          <p className="text-white/95 text-xl mb-4">
            <strong className="text-white">Every platform you mentioned was built for mainland U.S. job markets.</strong> They don't understand the Pacific Islands, 
            they don't serve our unique challenges, and they actively FAIL small businesses and students in our region. Here's why:
          </p>
        </div>

        {/* LINKEDIN */}
        <div className="bg-gradient-to-r from-blue-600/40 to-blue-700/40 rounded-xl p-6 border-2 border-blue-400/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💼</span>
            </div>
            <h4 className="text-2xl font-bold text-white">LinkedIn</h4>
          </div>
          
          <div className="space-y-4 text-white/90">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-bold text-white mb-2">❌ What's Broken:</p>
              <ul className="space-y-2 ml-4">
                <li>• Designed for corporate professionals and white-collar jobs—useless for hospitality, construction, retail, food service</li>
                <li>• Students in the Pacific Islands don't have polished LinkedIn profiles or professional networks</li>
                <li>• Requires existing work history and "connections"—our high school graduates have neither</li>
                <li>• Zero focus on skills assessment or training—just résumés and self-reported experience</li>
                <li>• Employers pay for "LinkedIn Recruiter" at <strong className="text-white">$8,000-$10,000/year</strong> for features that don't work for small Pacific Islands businesses</li>
              </ul>
            </div>

            <div className="bg-green-600/20 rounded-lg p-4 border border-green-400/30">
              <p className="font-bold text-white mb-2">✅ How ZALPHA Is Different:</p>
              <ul className="space-y-2 ml-4">
                <li>• Built specifically for Pacific Islands job market—hospitality, retail, construction, food service, trades</li>
                <li>• No résumé required—students demonstrate skills through gamified assessments</li>
                <li>• Fresh graduates with ZERO work history can still showcase abilities</li>
                <li>• Skills-first approach—prove you can do the job, regardless of "experience"</li>
                <li>• Affordable for small businesses: <strong className="text-white">$99/month vs. $8,000+/year</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* INDEED / ZIP RECRUITER / MONSTER */}
        <div className="bg-gradient-to-r from-orange-600/40 to-red-600/40 rounded-xl p-6 border-2 border-orange-400/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📰</span>
            </div>
            <h4 className="text-2xl font-bold text-white">Indeed / Zip Recruiter / Monster</h4>
          </div>
          
          <div className="space-y-4 text-white/90">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-bold text-white mb-2">❌ Challenges with Traditional Job Boards:</p>
              <ul className="space-y-2 ml-4">
                <li>• Generic job boards with NO Pacific Islands focus—our jobs get buried in millions of mainland postings</li>
                <li>• <strong className="text-white">Indeed:</strong> Free basic postings, but sponsored posts cost $5-$500+ per day for visibility</li>
                <li>• <strong className="text-white">Zip Recruiter:</strong> Plans start at $249/month but can exceed $1,000/month for full features</li>
                <li>• No candidate screening—employers get hundreds of unqualified applications and waste hours sorting</li>
                <li>• Students apply to 50+ jobs, never hear back, get demoralized</li>
                <li>• Zero skills verification—people lie on résumés, employers discover this after wasting time on interviews</li>
                <li>• No training, no development, no support—just "post and pray"</li>
              </ul>
            </div>

            <div className="bg-green-600/20 rounded-lg p-4 border border-green-400/30">
              <p className="font-bold text-white mb-2">✅ How ZALPHA Is Different:</p>
              <ul className="space-y-2 ml-4">
                <li>• <strong className="text-white">100% focused on Pacific Islands</strong>—every job is local, every student is from our region</li>
                <li>• Unlimited job postings for one flat fee: <strong className="text-white">$99/month total</strong>, not per posting</li>
                <li>• Pre-screened candidates through skills assessments—employers only see qualified applicants</li>
                <li>• Students get feedback and know where they stand—no black hole applications</li>
                <li>• Skills verified through assessments—employers know candidates can actually do the work</li>
                <li>• Gamified training built-in—students improve skills while using the platform</li>
              </ul>
            </div>
          </div>
        </div>

        {/* HANDSHAKE */}
        <div className="bg-gradient-to-r from-purple-600/40 to-pink-600/40 rounded-xl p-6 border-2 border-purple-400/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <h4 className="text-2xl font-bold text-white">Handshake</h4>
          </div>
          
          <div className="space-y-4 text-white/90">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-bold text-white mb-2">❌ What's Broken:</p>
              <ul className="space-y-2 ml-4">
                <li>• Only works if you're currently enrolled in a partner college/university—excludes high school graduates and trade school students</li>
                <li>• Focused on internships and entry-level corporate jobs—not retail, hospitality, trades, or contract work</li>
                <li>• Limited Pacific Islands school partnerships—most of our students can't even access it</li>
                <li>• No skills training or assessments—just résumé submissions</li>
                <li>• Designed for 4-year degree students seeking corporate careers—irrelevant for 90% of Pacific Islands job seekers</li>
              </ul>
            </div>

            <div className="bg-green-600/20 rounded-lg p-4 border border-green-400/30">
              <p className="font-bold text-white mb-2">✅ How ZALPHA Is Different:</p>
              <ul className="space-y-2 ml-4">
                <li>• Open to <strong className="text-white">ALL students and recent graduates</strong>—high school, trade schools, community colleges, universities</li>
                <li>• Focused on ALL job types—hospitality, retail, construction, food service, trades, AND professional roles</li>
                <li>• Specifically built for Pacific Islands schools and workforce</li>
                <li>• Built-in skills assessments and training—students develop job-ready abilities</li>
                <li>• Serves the ACTUAL job market in the Pacific Islands—not just "dream corporate internships"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* UPWORK */}
        <CollapsibleSection
          title="💻 Upwork / Fiverr / Freelancer"
          defaultOpen={false}
          colorScheme="green"
        >
          <div className="space-y-4 text-white/90">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-bold text-white mb-2">❌ What's Broken:</p>
              <ul className="space-y-2 ml-4">
                <li>• <strong className="text-white">Upwork takes 10-20% of every dollar you earn</strong> as a platform fee—students lose significant income to fees</li>
                <li>• <strong className="text-white">Race to the bottom pricing:</strong> Pacific Islands workers compete against people in countries with far lower costs of living—$5/hour gigs become the norm</li>
                <li>• Global competition means your profile is buried among millions of freelancers worldwide</li>
                <li>• No local employer relationships—you're chasing one-off gigs from strangers, not building career connections</li>
                <li>• Zero skills verification—clients take huge risks hiring unknown freelancers with no proof of abilities</li>
                <li>• Payment disputes and scams are common—freelancers often don't get paid for completed work</li>
                <li>• No support or training—you're on your own to figure out how to compete globally</li>
                <li>• Contract-only work with no benefits, no stability, no path to full-time employment</li>
              </ul>
            </div>

            <div className="bg-green-600/20 rounded-lg p-4 border border-green-400/30">
              <p className="font-bold text-white mb-2">✅ How ZALPHA Is Different:</p>
              <ul className="space-y-2 ml-4">
                <li>• <strong className="text-white">ZERO platform fees taken from students</strong>—you keep 100% of what you earn</li>
                <li>• <strong className="text-white">Local market rates:</strong> Pacific Islands employers pay fair local wages—no competing with $3/hour overseas workers</li>
                <li>• 100% Pacific Islands focused—you're competing with local peers, not 5 million global freelancers</li>
                <li>• Build relationships with LOCAL employers who can offer long-term work and full-time positions</li>
                <li>• Skills verified through assessments—employers trust you can do the work before hiring</li>
                <li>• Protected platform—all transactions happen through ZALPHA with payment guarantees</li>
                <li>• Training and support built-in—we help you develop skills and succeed</li>
                <li>• Contract jobs AND full-time positions—a real career path, not just gig work</li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        {/* THE CORE DIFFERENCE */}
        <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 rounded-xl p-8 border-3 border-white/50">
          <p className="text-3xl font-bold text-white mb-6 text-center">
            🎯 The Core Difference: ZALPHA Is Built FOR the Pacific Islands, Not ADAPTED For It
          </p>
          
          <div className="space-y-4 text-white/95 text-xl">
            <div className="bg-white/10 rounded-lg p-5">
              <p className="font-bold text-white mb-3">❌ Every Other Platform:</p>
              <p>
                Built for mainland U.S. job markets → tried to adapt for Pacific Islands → failed because the fundamental \n                assumptions don't match our reality → gave up or ignored us
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-5">
              <p className="font-bold text-white mb-3">✅ ZALPHA:</p>
              <p>
                <strong className="text-white">Started with Pacific Islands workforce challenges as the foundation</strong> → designed every feature \n                around OUR needs → built with deep understanding of the local market and culture → continuously improved based on \n                feedback from local students, employers, and schools
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}