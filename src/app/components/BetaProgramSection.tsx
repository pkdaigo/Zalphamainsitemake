import { motion } from 'motion/react';
import { Crown, ArrowRight } from 'lucide-react';

interface BetaProgramSectionProps {
  onNavigate: (page: string) => void;
}

export function BetaProgramSection({ onNavigate }: BetaProgramSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-3 rounded-full mb-6 shadow-xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-xl sm:text-2xl font-black text-slate-900">
              🚀 JOIN AS A BETA TESTER
            </p>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Shape the Future of Pacific Hiring
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Early adopters get full platform access and help us improve ZALPHA before our full launch!
          </p>
        </motion.div>

        {/* 4-Column Beta Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* EMPLOYERS */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-cyan-400/50 hover:border-cyan-400 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="text-4xl mb-4 text-center">💼</div>
            <h3 className="text-2xl font-black text-white text-center mb-3">Employers</h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-cyan-400">✓</span>
                <span>Full platform access</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-cyan-400">✓</span>
                <span>Unlimited job posts</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-cyan-400">✓</span>
                <span>Advanced analytics</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-cyan-400">✓</span>
                <span>Priority support</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('employer-signup')}
              className="w-full px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl font-bold hover:shadow-xl transition-all"
            >
              Claim Free Access →
            </button>
          </motion.div>

          {/* STUDENTS */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-blue-400/50 hover:border-blue-400 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="text-4xl mb-4 text-center">🎓</div>
            <h3 className="text-2xl font-black text-white text-center mb-3">Students</h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-blue-400">✓</span>
                <span>AI interview coach</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-blue-400">✓</span>
                <span>Priority job matching</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-blue-400">✓</span>
                <span>Skills assessments</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-blue-400">✓</span>
                <span>Premium employers</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('beta-tester-application')}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-xl font-bold hover:shadow-xl transition-all"
            >
              Join Beta Program →
            </button>
          </motion.div>

          {/* CAREER SERVICES */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-emerald-400/50 hover:border-emerald-400 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="text-4xl mb-4 text-center">🏫</div>
            <h3 className="text-2xl font-black text-white text-center mb-3">Schools</h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-emerald-400">✓</span>
                <span>Student tracking</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-emerald-400">✓</span>
                <span>Outcome reporting</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-emerald-400">✓</span>
                <span>Revenue sharing</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-emerald-400">✓</span>
                <span>Dedicated support</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('beta-tester-application')}
              className="w-full px-4 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-xl font-bold hover:shadow-xl transition-all"
            >
              Partner With Us →
            </button>
          </motion.div>

          {/* PEOPLE WITH DISABILITIES */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-purple-400/50 hover:border-purple-400 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="text-4xl mb-4 text-center">💜</div>
            <h3 className="text-2xl font-black text-white text-center mb-3">Accessibility</h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-purple-400">✓</span>
                <span>Ability assessment</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-purple-400">✓</span>
                <span>Tailored job matches</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-purple-400">✓</span>
                <span>Screen reader support</span>
              </div>
              <div className="flex items-start gap-2 text-white/90 text-sm">
                <span className="text-purple-400">✓</span>
                <span>Income support</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('beta-tester-application')}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl font-bold hover:shadow-xl transition-all"
            >
              Get Support →
            </button>
          </motion.div>
        </div>

        {/* Metgot Global Beta - Special 25+ Program */}
        <motion.div
          className="max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-2xl p-8 border-4 border-white/30 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Left: Icon & Title */}
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="text-6xl mb-3">🎯</div>
                <h3 className="text-3xl font-black text-white mb-2">
                  Metgot Global Beta
                </h3>
                <p className="text-purple-100 text-sm font-semibold">
                  Exclusive Program for Ages 25+
                </p>
              </div>

              {/* Middle: Features */}
              <div className="flex-1 grid md:grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="flex items-start gap-2 text-white text-sm">
                    <span className="text-yellow-300">⭐</span>
                    <span><strong>Focus Groups:</strong> In-person sessions with compensation</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="flex items-start gap-2 text-white text-sm">
                    <span className="text-yellow-300">⭐</span>
                    <span><strong>Early Access:</strong> Shape job fair technology</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="flex items-start gap-2 text-white text-sm">
                    <span className="text-yellow-300">⭐</span>
                    <span><strong>Professionals:</strong> For experienced workforce</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="flex items-start gap-2 text-white text-sm">
                    <span className="text-yellow-300">⭐</span>
                    <span><strong>Direct Impact:</strong> Influence platform features</span>
                  </div>
                </div>
              </div>

              {/* Right: CTA */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => onNavigate('metgot-beta-application')}
                  className="px-8 py-4 bg-white text-purple-700 rounded-xl font-black text-lg hover:bg-yellow-300 hover:text-purple-900 transition-all shadow-lg hover:shadow-2xl hover:scale-105 whitespace-nowrap"
                >
                  Apply Now →
                </button>
                <p className="text-purple-100 text-xs text-center mt-2 italic">
                  Ages 25+ Only
                </p>
              </div>
            </div>

            {/* Additional Info Banner */}
            <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <p className="text-white text-sm text-center">
                <strong>💼 Focus Group Participants Needed:</strong> Share your job fair experiences 
                and technology comfort level. Transportation assistance available. Selected participants receive compensation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA and Info */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-300/40 max-w-4xl mx-auto mb-6">
            <p className="text-yellow-200 font-bold text-lg mb-3">🌟 Why Join Our Beta Program?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90 text-sm text-left">
              <p>✓ <strong className="text-white">Help shape the platform</strong> with your feedback</p>
              <p>✓ <strong className="text-white">Access new features first</strong> before public launch</p>
              <p>✓ <strong className="text-white">Connect with beta testers</strong> across Pacific Islands</p>
              <p>✓ <strong className="text-white">Support local innovation</strong> - Built in CNMI</p>
            </div>
          </div>

          <motion.button
            onClick={() => onNavigate('demo-showcase')}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3 border-4 border-white/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Crown className="w-6 h-6" />
            <span>👀 View Beta User Demo</span>
            <ArrowRight className="w-6 h-6" />
          </motion.button>
          <p className="text-white/90 text-sm mt-4 italic">
            See what beta testers experience across all user types
          </p>
        </motion.div>
      </div>
    </section>
  );
}