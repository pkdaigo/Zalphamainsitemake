import { MapPin, Users, TrendingUp, ChevronRight, GraduationCap, Building2, Zap, Shield, Search, FileCheck, MessageSquare, Star, Monitor, Smartphone, Tablet, Globe, Sparkles, Award, Target, CheckCircle2, ArrowRight, Phone, Mail, Briefcase, Heart, Crown, Accessibility, Bot, Wrench, Fingerprint, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { TollaiBot } from '@/app/components/TollaiBot';
import { CollapsibleSection } from '@/app/components/CollapsibleSection';
import { BetaProgramSection } from '@/app/components/BetaProgramSection';

interface LandingProps {
  onNavigate: (page: string) => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* TollaiBot Helper */}
      <TollaiBot onNavigate={onNavigate} />
      
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-20" style={{ background: 'linear-gradient(to bottom right, rgb(15, 23, 42), rgb(30, 58, 138), rgb(15, 23, 42))' }}>
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgb(59, 130, 246)' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgb(6, 182, 212)', animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgb(168, 85, 247)', animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 sm:space-y-10 z-10">
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs sm:text-base font-medium">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                <span className="truncate">CNMI • Guam • Hawaii • Palau • Marshall Islands • FSM</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight">
                FRESH TALENT.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2 sm:mt-3">
                  FUTURE LEADERS.
                </span>
              </h1>

              <motion.p 
                className="text-lg sm:text-xl lg:text-2xl text-blue-100 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut"
                }}
              >
                Internships, early-career hiring, and global contract placements for Pacific 
                students and employers in one connected platform.
              </motion.p>

              {/* Stats Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-10">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mb-2">500+</div>
                  <div className="text-base sm:text-lg text-blue-200 font-medium">Active Jobs</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mb-2">2K+</div>
                  <div className="text-base sm:text-lg text-blue-200 font-medium">Verified Students</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mb-2">100+</div>
                  <div className="text-base sm:text-lg text-blue-200 font-medium">Top Employers</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mb-2">6</div>
                  <div className="text-base sm:text-lg text-blue-200 font-medium">Island Regions</div>
                </div>
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 pt-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex -space-x-3">
                  <motion.div 
                    className="w-10 h-10 rounded-full border-2 border-white"
                    style={{
                      background: "linear-gradient(to bottom right, rgb(251, 113, 133), rgb(248, 113, 113))",
                      animation: "float 3s ease-in-out infinite"
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 1.0
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  />
                  <motion.div 
                    className="w-10 h-10 rounded-full border-2 border-white"
                    style={{
                      background: "linear-gradient(to bottom right, rgb(96, 165, 250), rgb(34, 211, 238))",
                      animation: "float 3s ease-in-out infinite 0.5s"
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 1.1
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  />
                  <motion.div 
                    className="w-10 h-10 rounded-full border-2 border-white"
                    style={{
                      background: "linear-gradient(to bottom right, rgb(74, 222, 128), rgb(52, 211, 153))",
                      animation: "float 3s ease-in-out infinite 1s"
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 1.2
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  />
                  <motion.div 
                    className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "linear-gradient(to bottom right, rgb(192, 132, 252), rgb(244, 114, 182))",
                      animation: "float 3s ease-in-out infinite 1.5s"
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 1.3
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <motion.span
                      animate={{ 
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      2K+
                    </motion.span>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <p className="font-bold text-lg">2,000+ Students</p>
                  <p className="text-blue-200 text-sm">Already connected</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Right - Interactive Map */}
            <div className="relative z-10">
              <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
                {/* Map Title */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 sm:px-4 md:px-6 py-2 md:py-3">
                    <p className="text-xs md:text-sm text-blue-200 mb-1">Connecting Talent Across</p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-white">Western Pacific Islands</p>
                  </div>
                </div>

                {/* Islands with better positioning */}
                <div className="relative w-full h-full pt-16 sm:pt-20">
                  {/* Hawaii - Top Right */}
                  <div className="absolute top-8 sm:top-8 right-8 sm:right-12 group cursor-pointer z-20">
                    <div className="relative">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-2xl ring-4 ring-white/30 animate-pulse" style={{background: 'linear-gradient(to bottom right, rgb(250, 204, 21), rgb(251, 146, 60))'}}></div>
                      <div className="absolute top-0 left-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full animate-ping opacity-75" style={{backgroundColor: 'rgb(250, 204, 21)'}}></div>
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-30">
                        <p className="font-bold text-gray-900 text-sm">🏝️ Hawaii</p>
                        <p className="text-xs text-gray-600">O'ahu, Maui, Big Island, Kaua'i, Moloka'i, Lāna'i</p>
                        <p className="text-xs text-blue-600 font-semibold mt-1">US State</p>
                      </div>
                    </div>
                  </div>

                  {/* Marshall Islands - Top Center-Right */}
                  <div className="absolute top-12 sm:top-16 right-24 sm:right-32 group cursor-pointer z-20">
                    <div className="relative">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-2xl ring-4 ring-white/30 animate-pulse" style={{background: 'linear-gradient(to bottom right, rgb(251, 113, 133), rgb(244, 114, 182))', animationDelay: '0.3s'}}></div>
                      <div className="absolute top-0 left-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full animate-ping opacity-75" style={{backgroundColor: 'rgb(251, 113, 133)', animationDelay: '0.3s'}}></div>
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-30">
                        <p className="font-bold text-gray-900 text-sm">🏝️ Marshall Islands</p>
                        <p className="text-xs text-gray-600">Atolls & Islands</p>
                        <p className="text-xs text-purple-600 font-semibold mt-1">Compact of Free Association (COFA)</p>
                      </div>
                    </div>
                  </div>

                  {/* Guam - Center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20">
                    <div className="relative">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-2xl ring-4 ring-white/30 animate-pulse" style={{background: 'linear-gradient(to bottom right, rgb(34, 211, 238), rgb(96, 165, 250))', animationDelay: '0.6s'}}></div>
                      <div className="absolute top-0 left-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full animate-ping opacity-75" style={{backgroundColor: 'rgb(34, 211, 238)', animationDelay: '0.6s'}}></div>
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-30">
                        <p className="font-bold text-gray-900 text-sm">🏝️ Guam</p>
                        <p className="text-xs text-gray-600">Gateway hub</p>
                        <p className="text-xs text-blue-600 font-semibold mt-1">US Territory</p>
                      </div>
                    </div>
                  </div>

                  {/* CNMI - Top Left */}
                  <div className="absolute top-8 sm:top-12 left-12 sm:left-16 group cursor-pointer z-20">
                    <div className="relative">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-2xl ring-4 ring-white/30 animate-pulse" style={{background: 'linear-gradient(to bottom right, rgb(192, 132, 252), rgb(244, 114, 182))', animationDelay: '0.9s'}}></div>
                      <div className="absolute top-0 left-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full animate-ping opacity-75" style={{backgroundColor: 'rgb(192, 132, 252)', animationDelay: '0.9s'}}></div>
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-30">
                        <p className="font-bold text-gray-900 text-sm">🏝️ CNMI</p>
                        <p className="text-xs text-gray-600">Saipan, Tinian & Luta (Rota)</p>
                        <p className="text-xs text-blue-600 font-semibold mt-1">US Territory</p>
                      </div>
                    </div>
                  </div>

                  {/* Palau - Bottom Left */}
                  <div className="absolute bottom-6 sm:bottom-8 left-8 sm:left-12 group cursor-pointer z-20">
                    <div className="relative">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-2xl ring-4 ring-white/30 animate-pulse" style={{background: 'linear-gradient(to bottom right, rgb(74, 222, 128), rgb(52, 211, 153))', animationDelay: '1.2s'}}></div>
                      <div className="absolute top-0 left-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full animate-ping opacity-75" style={{backgroundColor: 'rgb(74, 222, 128)', animationDelay: '1.2s'}}></div>
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-30">
                        <p className="font-bold text-gray-900 text-sm">🏝️ Palau</p>
                        <p className="text-xs text-gray-600">Rock Islands</p>
                        <p className="text-xs text-purple-600 font-semibold mt-1">Compact of Free Association (COFA)</p>
                      </div>
                    </div>
                  </div>

                  {/* FSM - Bottom Center */}
                  <div className="absolute bottom-8 sm:bottom-12 left-[35%] sm:left-1/3 group cursor-pointer z-20">
                    <div className="relative">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-2xl ring-4 ring-white/30 animate-pulse" style={{background: 'linear-gradient(to bottom right, rgb(129, 140, 248), rgb(96, 165, 250))', animationDelay: '1.5s'}}></div>
                      <div className="absolute top-0 left-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full animate-ping opacity-75" style={{backgroundColor: 'rgb(129, 140, 248)', animationDelay: '1.5s'}}></div>
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-30">
                        <p className="font-bold text-gray-900 text-sm">🏝️ FSM</p>
                        <p className="text-xs text-gray-600">Yap, Chuuk, Pohnpei & Kosrae</p>
                        <p className="text-xs text-purple-600 font-semibold mt-1">Compact of Free Association (COFA)</p>
                      </div>
                    </div>
                  </div>

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(34,211,238,0.6)" />
                        <stop offset="100%" stopColor="rgba(168,85,247,0.6)" />
                      </linearGradient>
                    </defs>
                    {/* Hawaii to Marshall Islands */}
                    <line x1="85%" y1="15%" x2="75%" y2="25%" stroke="url(#lineGradient1)" strokeWidth="2" strokeDasharray="6,6">
                      <animate attributeName="stroke-dashoffset" from="12" to="0" dur="2s" repeatCount="indefinite"/>
                    </line>
                    {/* Hawaii to Guam */}
                    <line x1="85%" y1="15%" x2="50%" y2="50%" stroke="url(#lineGradient1)" strokeWidth="2" strokeDasharray="6,6">
                      <animate attributeName="stroke-dashoffset" from="12" to="0" dur="2s" repeatCount="indefinite"/>
                    </line>
                    {/* Marshall Islands to Guam */}
                    <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="url(#lineGradient1)" strokeWidth="2" strokeDasharray="6,6">
                      <animate attributeName="stroke-dashoffset" from="12" to="0" dur="2s" repeatCount="indefinite"/>
                    </line>
                    {/* Guam to CNMI */}
                    <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#lineGradient1)" strokeWidth="2" strokeDasharray="6,6">
                      <animate attributeName="stroke-dashoffset" from="12" to="0" dur="2s" repeatCount="indefinite"/>
                    </line>
                    {/* Guam to FSM */}
                    <line x1="50%" y1="50%" x2="35%" y2="80%" stroke="url(#lineGradient1)" strokeWidth="2" strokeDasharray="6,6">
                      <animate attributeName="stroke-dashoffset" from="12" to="0" dur="2s" repeatCount="indefinite"/>
                    </line>
                    {/* CNMI to Palau */}
                    <line x1="20%" y1="20%" x2="15%" y2="85%" stroke="url(#lineGradient1)" strokeWidth="2" strokeDasharray="6,6">
                      <animate attributeName="stroke-dashoffset" from="12" to="0" dur="2s" repeatCount="indefinite"/>
                    </line>
                    {/* Palau to FSM */}
                    <line x1="15%" y1="85%" x2="35%" y2="80%" stroke="url(#lineGradient1)" strokeWidth="2" strokeDasharray="6,6">
                      <animate attributeName="stroke-dashoffset" from="12" to="0" dur="2s" repeatCount="indefinite"/>
                    </line>
                    {/* CNMI to FSM */}
                    <line x1="20%" y1="20%" x2="35%" y2="80%" stroke="url(#lineGradient1)" strokeWidth="2" strokeDasharray="6,6">
                      <animate attributeName="stroke-dashoffset" from="12" to="0" dur="2s" repeatCount="indefinite"/>
                    </line>
                  </svg>
                </div>

                {/* Stats Badge */}
                <div className="absolute bottom-6 right-6">
                  <div className="bg-white rounded-2xl px-5 py-3 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-gray-900">500+</p>
                        <p className="text-xs text-gray-600">Active Jobs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* HOW IT WORKS - Co-Op Ecosystem */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full mb-4">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700 font-semibold text-sm">Co-Op Platform</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                Built for Everyone in the
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Co-Op Ecosystem
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Students, employers, and school admins work together seamlessly with ZALPHA's Co-Op platform
              </p>
            </motion.div>
          </div>

          {/* Role Cards - Mobile-First Vertical Stack */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Card 1: Co-Op Students */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 sm:p-8 border-2 border-blue-200 hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <GraduationCap className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Co-Op Students</h3>
                  <p className="text-blue-700 font-medium text-sm sm:text-base">High School Work-Based Learning</p>
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    <strong>Install ZALPHA as a PWA on your phone</strong>—works offline and syncs when you're back online
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    See your placement, schedule, and assigned <strong>deliverables</strong> (Admin, POS, Operations, R&D)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    <strong>Clock in/out, log hours,</strong> and tag time to specific deliverables
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Send <strong>late/absent/time-off messages</strong> that automatically CC your school co-op admin
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Track which skills you're <strong>strong in, need practice, or aren't interested in</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    <strong>Export verified achievements</strong> to your resume or portfolio
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Card 2: Co-Op Employers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 sm:p-8 border-2 border-purple-200 hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Briefcase className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Co-Op Employers</h3>
                  <p className="text-purple-700 font-medium text-sm sm:text-base">Small Business Partners</p>
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Create placements and define <strong>clear deliverables by business function</strong> (HR/SOPs, POS, inventory, R&D)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    <strong>Track student progress,</strong> approve time-off requests, and mark deliverables complete
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    See <strong>student skill and interest signals</strong> to adjust training and job descriptions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    <strong>Communicate with students and school admins</strong> in recorded message threads
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Card 3: School Co-Op Admins & WIOA Staff */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FileCheck className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">School Co-Op Admins</h3>
                  <p className="text-emerald-700 font-medium text-sm sm:text-base">& WIOA Staff</p>
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    View <strong>all placements across CNMI, Guam, and COFA</strong> in one dashboard
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Map deliverables to <strong>school outcomes and WIOA youth elements</strong> (work experience, leadership, occupational skills)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Generate <strong>compliance reports for CNMI WIA, Guam WIOA, and Federal requirements</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Design <strong>co-op pathways and mental readiness programs</strong> based on real student performance data
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Card 4: Post-Secondary & Technical Institutions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-orange-200 hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg relative">
                  <GraduationCap className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <Wrench className="w-3 h-3 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Post-Secondary & Technical Institutions</h3>
                  <p className="text-orange-700 font-medium text-sm sm:text-base">(NMC & NMTech)</p>
                </div>
              </div>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                Northern Marianas College (NMC) and Northern Marianas Technical Institute (NMTech) use ZALPHA to manage work-based learning for their students in career and technical education (CTE) programs.
              </p>

              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Track students in <strong>certificate, associate, and technical training programs</strong> doing co-op and apprenticeship placements
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Define deliverables tied to <strong>trade skills</strong> (welding, HVAC, construction, hospitality, IT, business admin)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Map work experiences to <strong>CTE learning outcomes and credential requirements</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Generate reports for <strong>CNMI DOL, WIOA, and accreditation</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Partner with high schools to create <strong>seamless pathways from PSS co-op → NMC/NMTech programs → workforce</strong>
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={() => onNavigate('student-signup')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-xl transition-all text-base sm:text-lg"
              >
                Sign Up as Student
              </button>
              <button
                onClick={() => onNavigate('employer-signup')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all text-base sm:text-lg"
              >
                Sign Up as Employer
              </button>
              <button
                onClick={() => onNavigate('school-login')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-xl transition-all text-base sm:text-lg"
              >
                School Admin Login
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Z-UID SYSTEM FEATURE HIGHLIGHT */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6">
              <BadgeCheck className="w-5 h-5 text-white" />
              <span className="text-white font-semibold text-sm">One Student, One Identity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
              The Z-UID System
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Every student who enters the ZALPHA ecosystem receives a unique <strong className="text-blue-600">Z-UID (ZALPHA Universal Identifier)</strong> that follows them throughout their entire career journey:
            </p>
          </motion.div>

          {/* Visual Flow */}
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Student with Z-UID */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 shadow-xl">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              <div className="bg-white border-2 border-blue-500 rounded-xl px-6 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-blue-600" />
                  <span className="font-mono font-bold text-blue-900 text-lg">Z-00123456</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden lg:block">
              <ArrowRight className="w-8 h-8 text-blue-400" />
            </div>
            <div className="lg:hidden">
              <div className="h-12 w-0.5 bg-blue-400"></div>
            </div>

            {/* Three Platforms */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* ZALPHA Recruit */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-blue-200"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">ZALPHA Recruit</h4>
                <p className="text-xs text-slate-600">High School Co-Op</p>
              </motion.div>

              {/* MicroGig Marketplace */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-200"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">MicroGig Marketplace</h4>
                <p className="text-xs text-slate-600">College & Gig Work</p>
              </motion.div>

              {/* ZALPHA Global HRIS */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-emerald-200"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-3">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">ZALPHA Global HRIS</h4>
                <p className="text-xs text-slate-600">Full-Time Career</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Journey Details */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 pt-2">High School Co-Op</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-blue-600">Z-UID tracks</strong> verified deliverables, time logs, skills, and employer feedback
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-bold text-slate-900 pt-2">College & MicroGigs</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-purple-600">Z-UID carries</strong> co-op achievements into paid work, building a verified portfolio
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-emerald-500"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-900 pt-2">Professional Career</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-emerald-600">Z-UID becomes</strong> the employee record in HRIS—no data re-entry, seamless transition
              </p>
            </motion.div>
          </div>

          {/* Why It Matters */}
          <motion.div
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 sm:p-12 text-white shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-black mb-8 text-center">Why it matters:</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-200 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Portable Identity</p>
                  <p className="text-sm text-blue-100">Students never lose their work history—it's portable across employers, schools, and regions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-200 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Verified Experience</p>
                  <p className="text-sm text-blue-100">Employers can see verified work experience from day one, not just a resume</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-200 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Long-Term Tracking</p>
                  <p className="text-sm text-blue-100">Schools and coordinators can track long-term outcomes (from co-op → MicroGig → full-time employment)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-200 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Lifelong Career Data</p>
                  <p className="text-sm text-blue-100">One profile, one identity, lifelong career data</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONSOLIDATED BETA PROGRAM - ALL USER TYPES */}
      <BetaProgramSection onNavigate={onNavigate} />

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(96, 165, 250, 0.1)' }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(34, 211, 238, 0.1)' }}
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(192, 132, 252, 0.1)' }}
            animate={{
              x: [0, -50, 0],
              y: [0, 80, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div 
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
              whileHover={{ 
                scale: 1.1
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
              WHY CHOOSE ZALPHA
            </motion.div>
            
            <motion.h2 
              className="text-4xl lg:text-5xl font-black text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 12,
                delay: 0.3 
              }}
            >
              <motion.span
                className="inline-block"
                style={{ color: "rgb(30, 41, 59)" }}
                whileHover={{ 
                  scale: 1.05,
                  color: "rgb(59, 130, 246)",
                  transition: { duration: 0.2 }
                }}
              >
                Built for Gen Z & Alpha Gen
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Connecting Gen Z & Alpha Gen talent with forward-thinking employers across the Pacific Islands. Built by locals, for locals.
            </motion.p>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-12 sm:mt-16">
              <motion.div 
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-bold text-gray-900 text-2xl mb-3">Smart Matching</h3>
                <p className="text-gray-600">AI-powered job matching connects the right talent with the right opportunities</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-5xl mb-4">🎮</div>
                <h3 className="font-bold text-gray-900 text-2xl mb-3">Gamified Skills</h3>
                <p className="text-gray-600">Earn badges and showcase abilities through fun, interactive assessments</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="font-bold text-gray-900 text-2xl mb-3">AI Career Coach</h3>
                <p className="text-gray-600">Meet Zee, your 24/7 career assistant for guidance and support</p>
              </motion.div>

              <motion.div 
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-5xl mb-4">🌊</div>
                <h3 className="font-bold text-gray-900 text-2xl mb-3">Pacific First</h3>
                <p className="text-gray-600">Built by islanders, for islanders - understanding our unique needs</p>
              </motion.div>

              <motion.div 
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-5xl mb-4">💼</div>
                <h3 className="font-bold text-gray-900 text-2xl mb-3">Full Job Cycle</h3>
                <p className="text-gray-600">From discovery to offer negotiation - all on one platform</p>
              </motion.div>

              <motion.div 
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="font-bold text-gray-900 text-2xl mb-3">Virtual Job Fairs</h3>
                <p className="text-gray-600">Connect with multiple employers in immersive online events</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-bold mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Users className="w-4 h-4" />
              WHO IT'S FOR
            </motion.div>
            
            <motion.h2 
              className="text-4xl lg:text-5xl font-black text-gray-900 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Built for Every Stage of Your Journey
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Students Card */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Students</h3>
              <p className="text-gray-600 mb-6">
                High school students, college students, and recent graduates finding internships, 
                and early-career opportunities across the Pacific.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Free job search tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">AI career coach & skill assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Virtual job fairs & networking</span>
                </li>
              </ul>
              <button
                onClick={() => onNavigate('student-signup')}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                Join as Student
              </button>
            </motion.div>

            {/* Schools Card */}
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 hover:border-green-400 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Schools</h3>
              <p className="text-gray-600 mb-6">
                Career services and educational institutions empowering students 
                with <strong>affordable subscription model</strong>—free for all your students.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm"><strong>Free for all your students</strong>—your school pays a flat annual fee</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm"><strong>Predictable budgeting</strong> with no per-student charges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm"><strong>ROI:</strong> Higher placement rates + career services enhancement</span>
                </li>
              </ul>
              <button
                onClick={() => onNavigate('school-login')}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                School Portal
              </button>
            </motion.div>

            {/* Employers Card */}
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Employers & Contractors</h3>
              <p className="text-gray-600 mb-6">
                Local businesses, global contractors, and agencies hiring Pacific talent for internships, 
                full-time roles, and fixed-term contracts.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Access verified Pacific talent pool</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">AI interviewer & ATS integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">EPA/DOL compliance support</span>
                </li>
              </ul>
              <button
                onClick={() => onNavigate('employer-signup')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                Hire Pacific Talent
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance & Accessibility Strip */}
      <section className="py-12 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-3">Built with Trust & Accessibility</h3>
            <p className="text-blue-100 text-lg">
              Compliant, accessible, and fair for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Accessibility className="w-12 h-12 text-pink-300 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-white text-center mb-3">ADA & WCAG 2.1 AA Accessible</h4>
              <p className="text-blue-100 text-sm text-center">
                Full accessibility support including screen readers, keyboard navigation, and high-contrast modes
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Bot className="w-12 h-12 text-cyan-300 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-white text-center mb-3">AI Interviewer – Fair & Auditable</h4>
              <p className="text-blue-100 text-sm text-center">
                EEOC-aligned, bias-mitigated AI with full audit trails and human oversight options
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Shield className="w-12 h-12 text-green-300 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-white text-center mb-3">Pacific Labor & EPA Compliance</h4>
              <p className="text-blue-100 text-sm text-center">
                Purpose-built for CNMI, Guam, US, and Philippine DOL requirements with automated tracking
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* High School Co-Op Program Demo Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ 
            backgroundImage: 'radial-gradient(circle, #0891b2 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-5 py-2 rounded-full mb-6">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-blue-900">For School Administrators</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              High School Co-Op Program Management
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              ZALPHA Co-Op mirrors and supports work-based learning programs across the Pacific region, 
              giving administrators a centralized platform for student placements, hours tracking, and employer partnerships.
            </p>
          </motion.div>

          {/* 3-Column Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">CNMI PSS Co-Op</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Support the CNMI Public School System's Cooperative Education Program with digital placement tracking, 
                employer coordination, and student progress monitoring.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Placement management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Hours verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Employer evaluations</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Guam DOE Programs</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Align with Guam Department of Education's work-based learning and Co-Op style programs, 
                streamlining student-employer connections and compliance reporting.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>DOL compliance tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time progress tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>Outcome reporting</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">COFA Region Schools</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Extend support to school systems in RMI, FSM, and Palau with similar Co-Op or work-based 
                learning pathways, fostering cross-regional employer connections.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Multi-island coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Standardized workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Regional best practices</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Request Demo Card */}
          <motion.div
            className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Background Glow Effects */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/50 px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span className="text-sm font-bold text-cyan-200">Book a Demo</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
                  See ZALPHA Co-Op in Action
                </h3>
                <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                  Discover how administrators can use ZALPHA to manage student placements, track work hours, 
                  coordinate with employer partners, and monitor student progress—all in one centralized platform 
                  built for Pacific Island school systems.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-white">
                    <div className="w-6 h-6 bg-cyan-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                    </div>
                    <span><strong>Placement Workflow:</strong> Match students with regional employers seamlessly</span>
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <div className="w-6 h-6 bg-cyan-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                    </div>
                    <span><strong>Hours Tracking:</strong> Automated time logs verified by employers</span>
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <div className="w-6 h-6 bg-cyan-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                    </div>
                    <span><strong>Progress Reports:</strong> Real-time dashboards for coordinators and counselors</span>
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <div className="w-6 h-6 bg-cyan-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                    </div>
                    <span><strong>Compliance Ready:</strong> DOL-aligned reporting for all territories</span>
                  </li>
                </ul>

                <button
                  onClick={() => onNavigate('co-op-coordinator-dashboard')}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl hover:shadow-2xl"
                >
                  <Monitor className="w-6 h-6" />
                  Book a Co-Op Demo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Right: Visual/Stats */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20">
                <h4 className="text-xl font-bold text-white mb-6 text-center">
                  What You'll See in the Demo
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-300" />
                      </div>
                      <span className="font-bold text-white">Student Placement Dashboard</span>
                    </div>
                    <p className="text-blue-200 text-sm">
                      Browse available positions, match students with employers, and track application status
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-cyan-500/30 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-cyan-300" />
                      </div>
                      <span className="font-bold text-white">Real-Time Analytics</span>
                    </div>
                    <p className="text-blue-200 text-sm">
                      Monitor hours worked, employer feedback, and student performance metrics
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-indigo-500/30 rounded-lg flex items-center justify-center">
                        <FileCheck className="w-5 h-5 text-indigo-300" />
                      </div>
                      <span className="font-bold text-white">Compliance Reporting</span>
                    </div>
                    <p className="text-blue-200 text-sm">
                      Generate DOL-ready reports and maintain audit trails for all placements
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                  <p className="text-blue-200 text-sm">
                    <strong className="text-white">Perfect for:</strong> Co-Op Coordinators, Career Counselors, 
                    School Administrators, and Regional Education Leaders
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Shape the Future of Pacific Talent?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of students, schools, and employers building careers and communities 
            across the Western Pacific Islands.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => onNavigate('beta-tester-application')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl hover:shadow-2xl"
            >
              <Star className="w-5 h-5" />
              Join the Beta
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('app-overview')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              <Monitor className="w-5 h-5" />
              Platform Overview
            </button>

            <button
              onClick={() => onNavigate('pitch-deck-recruit')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              <FileCheck className="w-5 h-5" />
              View Pitch Deck
            </button>
          </motion.div>

          <motion.div 
            className="mt-12 pt-12 border-t border-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-white text-lg mb-2">Contact our team:</p>
            <a href="mailto:contact@kiexgroup.com" className="flex items-center gap-2 justify-center text-cyan-300 hover:text-white transition text-lg font-semibold">
              <Mail className="w-5 h-5" />
              <span>contact@kiexgroup.com</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}