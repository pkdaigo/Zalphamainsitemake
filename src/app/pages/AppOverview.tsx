import { 
  School, Users, Briefcase, Award, Globe, CheckCircle, 
  Target, Map, ArrowRight, Building2, GraduationCap,
  MessageSquare, TrendingUp, Sparkles, Monitor, Bot, Heart
} from 'lucide-react';
import { motion } from 'motion/react';
import { BackButton } from '@/app/components/BackButton';

interface AppOverviewProps {
  onNavigate: (page: string) => void;
}

export function AppOverview({ onNavigate }: AppOverviewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Back Button */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6">
        <BackButton onNavigate={onNavigate} label="Back to Home" />
      </div>

      {/* Floating Animated Orbs Background - Softer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 150, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, -80, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-slate-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-20 z-10">
          {/* Logo & Title */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.div 
              className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-xl px-8 py-4 rounded-3xl shadow-lg mb-8 border border-slate-200"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(100, 116, 139, 0.2)"
              }}
            >
              {/* ZALPHA Logo */}
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-md"
                animate={{ 
                  rotateY: [0, 360],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                whileHover={{ scale: 1.2 }}
              >
                <span className="text-white text-3xl font-black">Z</span>
              </motion.div>
              <div className="text-left">
                <motion.h1 
                  className="text-5xl font-bold text-slate-800 hover:text-cyan-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  ZALPHA RECRUIT
                </motion.h1>
                <p className="text-slate-600 text-sm font-semibold">The Career Platform for the Western Pacific, Micronesia, and the Hawaiian Islands</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        
        {/* Platform Overview - Main Description */}
        <motion.div 
          className="bg-gradient-to-br from-blue-500/80 via-cyan-500/80 to-sky-500/80 rounded-3xl p-12 mb-12 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)" }}
        >
          <div className="flex items-start gap-6 mb-8">
            <motion.div 
              className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Globe className="w-12 h-12 text-white" />
            </motion.div>
            <div>
              <motion.h3 
                className="text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Platform Overview
              </motion.h3>
              <motion.p 
                className="text-white/95 text-xl leading-relaxed mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                ZALPHA Recruit is a region‑first career platform connecting students, graduates, career centers, and employers across CNMI, Guam, the Federated States of Micronesia (FSM), the broader Micronesia region, the Republic of Palau, the Republic of the Marshall Islands, and the Hawaiian Islands with opportunities across these islands and the wider Asia‑Pacific region. All adopted users benefit: talent discovers meaningful roles, employers build reliable pipelines, and campuses scale their career services impact in one shared ecosystem.
              </motion.p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <motion.div 
                  className="bg-white/25 hover:bg-white/35 backdrop-blur-sm rounded-xl p-4 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Map className="w-8 h-8 text-white mb-2" />
                  <div className="text-white font-bold mb-1">Regional Focus</div>
                  <div className="text-white/90 text-sm">CNMI, Guam, FSM, Palau, Marshall Islands, Hawaii & APAC</div>
                </motion.div>
                <motion.div 
                  className="bg-white/25 hover:bg-white/35 backdrop-blur-sm rounded-xl p-4 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Users className="w-8 h-8 text-white mb-2" />
                  <div className="text-white font-bold mb-1">Brain Circulation</div>
                  <div className="text-white/90 text-sm">Turn brain drain into brain circulation</div>
                </motion.div>
                <motion.div 
                  className="bg-white/25 hover:bg-white/35 backdrop-blur-sm rounded-xl p-4 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className="w-8 h-8 text-white mb-2" />
                  <div className="text-white font-bold mb-1">One Ecosystem</div>
                  <div className="text-white/90 text-sm">Connect talent, employers & campuses</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three User Segments */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-4xl font-bold text-slate-800 text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Who We Serve
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Students & Graduates */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-cyan-200 relative overflow-hidden"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              whileHover={{ scale: 1.03, borderColor: "rgb(103, 232, 249)" }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                <GraduationCap className="w-10 h-10 text-white" />
              </motion.div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">For Students and Graduates</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Discover regional and Asia‑Pacific opportunities close to home, including roles in the Philippines, Japan, Korea, Singapore, and other APAC hubs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Stay connected to employers in CNMI, Guam, FSM, Micronesia, Palau, Marshall Islands, and the Hawaiian Islands while studying or working off‑island</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Build a rich profile that highlights your education, skills, languages, and preferred locations</span>
                </div>
              </div>
            </motion.div>

            {/* Career Centers */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-violet-200 relative overflow-hidden"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              whileHover={{ scale: 1.03, borderColor: "rgb(196, 181, 253)" }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                <School className="w-10 h-10 text-white" />
              </motion.div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">For Career Centers and Institutions</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Offer a dedicated regional hub instead of generic mainland‑centric job boards, tuned to Western Pacific, Micronesian, and Hawaiian realities</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Manage jobs, internships, events, and priority employer partnerships in one platform for your students and alumni</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Turn brain drain into brain circulation by tracking where graduates go and supporting pathways back to the islands</span>
                </div>
              </div>
            </motion.div>

            {/* Employers */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-200 relative overflow-hidden"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              whileHover={{ scale: 1.03, borderColor: "rgb(147, 197, 253)" }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                <Building2 className="w-10 h-10 text-white" />
              </motion.div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">For Regional Employers and Governments</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Reach talent that wants to live and work in the Western Pacific, Micronesia, and the Hawaiian Islands, not just "anywhere"</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Build sustainable local teams by recruiting students, graduates, and returning professionals who understand island culture</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Access candidates with APAC experience—languages, cultural fluency, and technical skills gained in nearby economies</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* How the Platform Connects Everyone */}
        <motion.div 
          className="bg-gradient-to-br from-violet-400/70 via-purple-400/70 to-fuchsia-400/70 rounded-3xl p-12 mb-12 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="text-center mb-8">
            <motion.div 
              className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-4xl font-bold text-white mb-4">How the Platform Connects Everyone</h3>
            <p className="text-white/95 text-xl max-w-4xl mx-auto leading-relaxed">
              This shared platform turns the Western Pacific, Micronesia, and the Hawaiian Islands into a connected career network—where talent can circulate through the Asia‑Pacific region and return home to strengthen their communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white/25 hover:bg-white/35 backdrop-blur-sm rounded-2xl p-6 border border-white/30 transition-colors"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Students & Graduates</h4>
              </div>
              <p className="text-white/90 text-sm">
                Create profiles and apply to regional and APAC roles
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/25 hover:bg-white/35 backdrop-blur-sm rounded-2xl p-6 border border-white/30 transition-colors"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                  <School className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Career Centers</h4>
              </div>
              <p className="text-white/90 text-sm">
                Onboard campuses, promote ZALPHA Recruit, and curate opportunities
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/25 hover:bg-white/35 backdrop-blur-sm rounded-2xl p-6 border border-white/30 transition-colors"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Employers</h4>
              </div>
              <p className="text-white/90 text-sm">
                Post jobs, search for candidates, and build long‑term pipelines
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Key Features & Differentiators */}
        <motion.div 
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 border border-slate-200 shadow-lg mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ borderColor: "rgb(148, 163, 184)" }}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-slate-800 mb-4">Platform Advantages</h3>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto">
              Built specifically for the Pacific Islands ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              className="flex items-start gap-4 bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">Region-First Approach</h4>
                <p className="text-slate-600 text-sm">
                  Not a generic mainland job board—tuned specifically to Western Pacific, Micronesian, and Hawaiian realities
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">APAC Integration</h4>
                <p className="text-slate-600 text-sm">
                  Access to opportunities across Asia-Pacific including Philippines, Japan, Korea, Singapore
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">Cultural Understanding</h4>
                <p className="text-slate-600 text-sm">
                  Connect with employers and talent who understand island culture, regulations, and community expectations
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">Brain Circulation</h4>
                <p className="text-slate-600 text-sm">
                  Track graduates abroad and support return pathways—turn brain drain into brain circulation
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-4xl font-bold text-slate-800 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Ready to Get Started?
          </motion.h3>
          <motion.p 
            className="text-slate-600 text-xl mb-8 max-w-2xl mx-auto"
          >
            Join the career network connecting talent across the Western Pacific, Micronesia, and Hawaiian Islands
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => onNavigate('student-dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-bold text-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GraduationCap className="w-6 h-6" />
              Student Portal
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => onNavigate('employer-dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Briefcase className="w-6 h-6" />
              Employer Portal
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => onNavigate('school-dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <School className="w-6 h-6" />
              Career Center Portal
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}