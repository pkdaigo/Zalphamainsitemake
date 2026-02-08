import { MapPin, Users, TrendingUp, ChevronRight, GraduationCap, Building2, Zap, Shield, Search, FileCheck, MessageSquare, Star, Monitor, Smartphone, Tablet, Globe, Sparkles, Award, Target, CheckCircle2, ArrowRight, Phone, Mail, Briefcase, Heart, Crown } from 'lucide-react';
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
                Access Fresh Talent.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2 sm:mt-3">
                  Develop Future Leaders
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
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0.7] }}
                  transition={{ 
                    duration: 2,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="font-bold text-cyan-300"
                >
                  Today.
                </motion.span>{' '}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0.7] }}
                  transition={{ 
                    duration: 2,
                    delay: 1.2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="font-bold text-blue-300"
                >
                  Tomorrow.
                </motion.span>{' '}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0.7] }}
                  transition={{ 
                    duration: 2,
                    delay: 1.9,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="font-bold text-purple-300"
                >
                  Forever.
                </motion.span>{' '}
                <motion.span
                  className="block mt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  The platform built for the future of career connections.
                </motion.span>
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

      {/* Features Section - Duplicate removed */}
    </div>
  );
}