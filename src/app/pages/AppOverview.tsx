import { 
  School, Users, Briefcase, Award, DollarSign, Shield, Zap, 
  Link as LinkIcon, Globe, Smartphone, TrendingUp, CheckCircle, 
  Star, Video, Lock, Bot, Heart, Target, Map, ArrowRight,
  UserCheck, Building2, GraduationCap, CreditCard, BarChart3,
  MessageSquare, Bell, Search, FileText, Wallet, Crown, Sparkles,
  AlertCircle, Monitor, Tablet
} from 'lucide-react';
import { motion } from 'motion/react';
import { BackButton } from '@/app/components/BackButton';

interface AppOverviewProps {
  onNavigate: (page: string) => void;
}

export function AppOverview({ onNavigate }: AppOverviewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* Back Button */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6">
        <BackButton onNavigate={onNavigate} label="Back to Home" />
      </div>

      {/* Floating Animated Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl"
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
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"
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
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -70, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 13,
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
              className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl shadow-2xl mb-8 border-2 border-cyan-300/50"
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
                boxShadow: "0 0 40px rgba(34, 211, 238, 0.6)"
              }}
            >
              {/* ZALPHA Logo */}
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl"
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
                  className="text-5xl font-bold text-white"
                  whileHover={{ scale: 1.05, color: "#22d3ee" }}
                >
                  ZALPHA
                </motion.h1>
                <p className="text-cyan-300 text-sm font-semibold">powered by KI Executive Group</p>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-6xl font-bold text-white mb-6 drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 12,
                delay: 0.4
              }}
            >
              Complete Platform Overview
            </motion.h2>
            <motion.p 
              className="text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              The Western Pacific's premier job connection platform connecting verified students 
              with opportunities across CNMI, FSM, Guam, Hawaii, Palau, and the Marshall Islands
            </motion.p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <motion.div 
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-cyan-300/50 text-center"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: 0.8
              }}
              whileHover={{ 
                scale: 1.1,
                borderColor: "rgb(34, 211, 238)",
                boxShadow: "0 20px 40px rgba(34, 211, 238, 0.4)"
              }}
            >
              <motion.div 
                className="text-5xl font-bold text-cyan-300 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                100%
              </motion.div>
              <div className="text-white text-sm">Verified Students</div>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-blue-300/50 text-center"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: 0.9
              }}
              whileHover={{ 
                scale: 1.1,
                borderColor: "rgb(59, 130, 246)",
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
              }}
            >
              <motion.div 
                className="text-5xl font-bold text-blue-300 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                6
              </motion.div>
              <div className="text-white text-sm">Pacific Territories</div>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-300/50 text-center"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: 1.0
              }}
              whileHover={{ 
                scale: 1.1,
                borderColor: "rgb(168, 85, 247)",
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
              }}
            >
              <motion.div 
                className="text-5xl font-bold text-purple-300 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                15%
              </motion.div>
              <div className="text-white text-sm">School Revenue Share</div>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-300/50 text-center"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: 1.1
              }}
              whileHover={{ 
                scale: 1.1,
                borderColor: "rgb(236, 72, 153)",
                boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)"
              }}
            >
              <motion.div 
                className="text-5xl font-bold text-pink-300 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
              >
                2
              </motion.div>
              <div className="text-white text-sm">Major Integrations</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        
        {/* Platform Mission */}
        <motion.div 
          className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl p-12 mb-12 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8
          }}
          whileHover={{ scale: 1.02, boxShadow: "0 40px 80px rgba(34, 211, 238, 0.5)" }}
        >
          <div className="flex items-start gap-6 mb-8">
            <motion.div 
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Target className="w-12 h-12 text-white" />
            </motion.div>
            <div>
              <motion.h3 
                className="text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Mission & Vision
              </motion.h3>
              <motion.p 
                className="text-white/95 text-xl leading-relaxed mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                ZALPHA bridges the gap between Pacific Island students and career opportunities, 
                providing a secure, verified platform that empowers youth while generating 
                sustainable revenue for educational institutions.
              </motion.p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <motion.div 
                  className="backdrop-blur-sm rounded-xl p-4"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Map className="w-8 h-8 text-white mb-2" />
                  </motion.div>
                  <div className="text-white font-bold mb-1">Regional Focus</div>
                  <div className="text-white/90 text-sm">CNMI, FSM, Guam, Hawaii, Palau, Marshall Islands</div>
                </motion.div>
                <motion.div 
                  className="backdrop-blur-sm rounded-xl p-4"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>
                    <Users className="w-8 h-8 text-white mb-2" />
                  </motion.div>
                  <div className="text-white font-bold mb-1">Free for Students</div>
                  <div className="text-white/90 text-sm">Premium optional ($19.99/mo)</div>
                </motion.div>
                <motion.div 
                  className="backdrop-blur-sm rounded-xl p-4"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>
                    <Building2 className="w-8 h-8 text-white mb-2" />
                  </motion.div>
                  <div className="text-white font-bold mb-1">Employer Subscriptions</div>
                  <div className="text-white/90 text-sm">$99 - $499/month tiers</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Types */}
        <div className="mb-12">
          <motion.h3 
            className="text-4xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            👥 Three User Types
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Students */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-cyan-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 100, rotateY: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
              whileHover={{ scale: 1.05, borderColor: "rgb(34, 211, 238)", boxShadow: "0 30px 60px rgba(34, 211, 238, 0.4)" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent"
                initial={{ x: "-100%" }}
                whileInView={{ x: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg relative"
                animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ rotateY: { duration: 5, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
                whileHover={{ scale: 1.3 }}
              >
                <GraduationCap className="w-10 h-10 text-white" />
              </motion.div>
              <h4 className="text-3xl font-bold text-slate-900 mb-4">Students</h4>
              <p className="text-slate-600 mb-6">College students & recent graduates (within 1 year)</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Free account (ID verification required)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">18+ age requirement</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Dual ID authentication (government + school)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Browse jobs, apply, review companies</span>
                </div>
                <div className="flex items-start gap-2">
                  <Crown className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm"><strong>Premium $19.99/mo:</strong> Share transcripts</span>
                </div>
              </div>
              
              <button
                onClick={() => onNavigate('student-dashboard')}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                View Student Dashboard →
              </button>
            </motion.div>

            {/* Employers */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-indigo-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              whileHover={{ scale: 1.05, borderColor: "rgb(99, 102, 241)", boxShadow: "0 30px 60px rgba(99, 102, 241, 0.4)" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-200/30 to-transparent"
                initial={{ x: "-100%" }}
                whileInView={{ x: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.6 }}
              />
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg relative"
                animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ rotateY: { duration: 5, repeat: Infinity, ease: "linear", delay: 0.3 }, scale: { duration: 2, repeat: Infinity, delay: 0.3 } }}
                whileHover={{ scale: 1.3 }}
              >
                <Building2 className="w-10 h-10 text-white" />
              </motion.div>
              <h4 className="text-3xl font-bold text-slate-900 mb-4">Employers</h4>
              <p className="text-slate-600 mb-6">Companies seeking verified Pacific talent</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm"><strong>Starter $99/mo:</strong> 5 jobs, basic search</span>
                </div>
                <div className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm"><strong>Professional $249/mo:</strong> 20 jobs, analytics</span>
                </div>
                <div className="flex items-start gap-2">
                  <Crown className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm"><strong>Ultra Premium $499/mo:</strong> Skills assessments</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Access verified talent pool</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Sign non-discrimination agreement</span>
                </div>
              </div>
              
              <button
                onClick={() => onNavigate('employer-dashboard')}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                View Employer Dashboard →
              </button>
            </motion.div>

            {/* Schools */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-emerald-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 100, rotateY: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
              whileHover={{ scale: 1.05, borderColor: "rgb(16, 185, 129)", boxShadow: "0 30px 60px rgba(16, 185, 129, 0.4)" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent"
                initial={{ x: "-100%" }}
                whileInView={{ x: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg relative"
                animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ rotateY: { duration: 5, repeat: Infinity, ease: "linear", delay: 0.6 }, scale: { duration: 2, repeat: Infinity, delay: 0.6 } }}
                whileHover={{ scale: 1.3 }}
              >
                <School className="w-10 h-10 text-white" />
              </motion.div>
              <h4 className="text-3xl font-bold text-slate-900 mb-4">Schools</h4>
              <p className="text-slate-600 mb-6">Educational institutions earning commissions</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm"><strong>15% commission</strong> on all employer subscriptions</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Revenue from student's school affiliation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Monthly automated payouts</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Revenue dashboard & analytics</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Affiliate program (10% referrals)</span>
                </div>
              </div>
              
              <button
                onClick={() => onNavigate('school-revenue-dashboard')}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                View School Dashboard →
              </button>
            </motion.div>
          </div>
        </div>

        {/* Integrations */}
        <div className="mb-12">
          <motion.h3 
            className="text-4xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            ⚡ Enterprise Integrations
          </motion.h3>
          
          {/* Integration Type Explanation */}
          <motion.div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-amber-300/50 mb-8"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150 }}
            whileHover={{ scale: 1.02, borderColor: "rgb(245, 158, 11)", boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)" }}
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-amber-300 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-white mb-4">🎯 Two Types of Integrations</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-lg font-bold text-cyan-300 mb-2">🏢 Platform Admin (KI Executive Group)</div>
                    <ul className="text-white/90 text-sm space-y-1">
                      <li>• <strong>Company Website:</strong> ZALPHA company website integration</li>
                      <li>• Admin/platform-level only</li>
                      <li>• Manages marketing content & blog</li>
                      <li>• Single configuration for KI Executive Group</li>
                    </ul>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-lg font-bold text-purple-300 mb-2">💼 Employer Integrations</div>
                    <ul className="text-white/90 text-sm space-y-1">
                      <li>• <strong>ZALPHA ATS:</strong> Built-in applicant tracking system</li>
                      <li>• Per-employer configuration</li>
                      <li>• Employers can also connect their own ATS</li>
                      <li>• Supports multiple ATS platforms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* ZALPHA ATS */}
            <motion.div 
              className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden"
              initial={{ opacity: 0, x: -100, rotateY: -30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ scale: 1.03, boxShadow: "0 40px 80px rgba(139, 92, 246, 0.5)" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileInView={{ x: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <motion.div 
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <h4 className="text-3xl font-bold">ZALPHA ATS</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 font-semibold">LIVE & BUILT-IN</span>
                  </div>
                </div>
              </div>
              
              <p className="text-white/90 mb-6 text-lg">
                Professional Applicant Tracking System integration for seamless job and candidate management.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Bi-directional job sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Automatic candidate submission</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Application status tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Real-time webhooks</span>
                </div>
              </div>
              
              <button
                onClick={() => onNavigate('integration-settings')}
                className="w-full bg-white text-purple-700 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                View Integration Settings →
              </button>
            </motion.div>

            {/* Company Website */}
            <motion.div 
              className="bg-gradient-to-br from-orange-600 to-pink-700 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden"
              initial={{ opacity: 0, x: 100, rotateY: 30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ scale: 1.03, boxShadow: "0 40px 80px rgba(236, 72, 153, 0.5)" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileInView={{ x: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.7 }}
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <motion.div 
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <LinkIcon className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <h4 className="text-3xl font-bold">Company Website</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="text-amber-300 font-semibold">CONFIGURED</span>
                  </div>
                </div>
              </div>
              
              <p className="text-white/90 mb-6 text-lg">
                Website platform integration for contact management, forms, and blog publishing.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Form submission sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Contact CRM integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Auto-post jobs to blog</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Student/employer contact sync</span>
                </div>
              </div>
              
              <button
                onClick={() => onNavigate('sync-dashboard')}
                className="w-full bg-white text-orange-700 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                View Sync Dashboard →
              </button>
            </motion.div>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-12">
          <motion.h3 
            className="text-4xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            🚀 Core Features
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* ID Verification */}
            <motion.div 
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-cyan-300/50 relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgb(34, 211, 238)",
                boxShadow: "0 20px 40px rgba(34, 211, 238, 0.3)"
              }}
            >
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <UserCheck className="w-12 h-12 text-cyan-300 mb-4" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-2">ID Verification</h4>
              <p className="text-cyan-100 text-sm">
                Dual authentication: Government ID + School ID required for all students. 18+ only.
              </p>
            </motion.div>

            {/* Job Search */}
            <motion.div 
              className="backdrop-blur-xl rounded-2xl p-6 border-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(59, 130, 246)", boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)", borderColor: "rgba(147, 197, 253, 0.5)" }}
            >
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}>
                <Search className="w-12 h-12 text-blue-300 mb-4" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-2">Smart Job Search</h4>
              <p className="text-blue-100 text-sm">
                AI-powered matching, filters by location, industry, salary, and remote options.
              </p>
            </motion.div>

            {/* Company Reviews */}
            <motion.div 
              className="backdrop-blur-xl rounded-2xl p-6 border-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(168, 85, 247)", boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)", borderColor: "rgba(216, 180, 254, 0.5)" }}
            >
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
                <Star className="w-12 h-12 text-purple-300 mb-4" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-2">Company Reviews</h4>
              <p className="text-purple-100 text-sm">
                Student-driven review system with company opt-in/opt-out controls and verified employer responses.
              </p>
            </motion.div>

            {/* Skills Assessment */}
            <motion.div 
              className="backdrop-blur-xl rounded-2xl p-6 border-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(236, 72, 153)", boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" }}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)", borderColor: "rgba(249, 168, 212, 0.5)" }}
            >
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Award className="w-12 h-12 text-pink-300 mb-4" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-2">Skills Assessment</h4>
              <p className="text-pink-100 text-sm">
                Gamified assessments with badges, leaderboards, and Ultra Premium employer access.
              </p>
            </motion.div>

            {/* AI Chatbot */}
            <motion.div 
              className="backdrop-blur-xl rounded-2xl p-6 border-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(16, 185, 129)", boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)", borderColor: "rgba(110, 231, 183, 0.5)" }}
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Bot className="w-12 h-12 text-emerald-300 mb-4" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-2">AI Chatbot "Zee"</h4>
              <p className="text-emerald-100 text-sm">
                24/7 AI assistant for job recommendations, career advice, and platform navigation.
              </p>
            </motion.div>

            {/* AI Video Interviews */}
            <motion.div 
              className="backdrop-blur-xl rounded-2xl p-6 border-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(139, 92, 246)", boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)", borderColor: "rgba(196, 181, 253, 0.5)" }}
            >
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <Video className="w-12 h-12 text-violet-300 mb-4" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-2">AI Interview with Candidates</h4>
              <p className="text-violet-100 text-sm">
                Automated first-round video screening with AI-powered analysis for Ultra Premium employers.
              </p>
            </motion.div>

            {/* Video Profiles */}
            <motion.div 
              className="backdrop-blur-xl rounded-2xl p-6 border-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(245, 158, 11)", boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)" }}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)", borderColor: "rgba(252, 211, 77, 0.5)" }}
            >
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
                <Video className="w-12 h-12 text-amber-300 mb-4" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-2">Video Showcases</h4>
              <p className="text-amber-100 text-sm">
                Premium featured profiles with video introductions for enhanced visibility.
              </p>
            </motion.div>

            {/* Payment Processing */}
            <motion.div 
              className="backdrop-blur-xl rounded-2xl p-6 border-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(99, 102, 241)", boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)", borderColor: "rgba(165, 180, 252, 0.5)" }}
            >
              <motion.div animate={{ rotateY: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <CreditCard className="w-12 h-12 text-indigo-300 mb-4" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-2">Payment System</h4>
              <p className="text-indigo-100 text-sm">
                Secure Stripe integration for subscriptions, payments, and automated school payouts.
              </p>
            </motion.div>

            {/* Analytics */}
            <motion.div 
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-rose-300/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(244, 63, 94)", boxShadow: "0 20px 40px rgba(244, 63, 94, 0.3)" }}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}
            >
              <motion.div animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <BarChart3 className="w-12 h-12 text-rose-300 mb-4" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-2">Analytics</h4>
              <p className="text-rose-100 text-sm">
                Comprehensive dashboards for students, employers, and schools with key metrics.
              </p>
            </motion.div>

            {/* PWA Support */}
            <motion.div 
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-teal-300/50"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, delay: 0.4 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(20, 184, 166)", boxShadow: "0 20px 40px rgba(20, 184, 166, 0.3)" }}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}
            >
              <motion.div animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Smartphone className="w-12 h-12 text-teal-300 mb-4" />
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-2">Progressive Web App</h4>
              <p className="text-teal-100 text-sm">
                Install on any device. Works offline. Native app experience with web convenience.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Web Application - Access from Any Device */}
        <div className="mb-12">
          <motion.h3 
            className="text-4xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            📱 Access from Any Device
          </motion.h3>
          
          <motion.div 
            className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 shadow-2xl border-2 border-cyan-300/50 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ scale: 1.01, borderColor: "rgb(34, 211, 238)", boxShadow: "0 40px 80px rgba(34, 211, 238, 0.4)" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-bold mb-6">
                <Globe className="w-4 h-4" />
                WEB APPLICATION
              </div>
              <h4 className="text-3xl font-bold text-white mb-4">
                ZALPHA works instantly in any browser. No download required.
              </h4>
              <p className="text-cyan-100 text-lg">
                Visit <span className="font-bold text-cyan-400">www.zalpharecruit.com</span> and start connecting
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12 relative">
              {/* Desktop */}
              <motion.div 
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 relative"
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(59, 130, 246)", boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Monitor className="w-8 h-8 text-white" />
                </motion.div>
                <h5 className="text-2xl font-bold mb-3 text-center text-white">Desktop</h5>
                <p className="text-blue-100 text-center mb-6">
                  Full-featured experience on any computer
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Chrome, Safari, Firefox, Edge</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Windows, Mac, Linux</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Optimized for productivity</span>
                  </div>
                </div>
              </motion.div>

              {/* Mobile */}
              <motion.div 
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(236, 72, 153)", boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Smartphone className="w-8 h-8 text-white" />
                </motion.div>
                <h5 className="text-2xl font-bold mb-3 text-center text-white">Mobile</h5>
                <p className="text-blue-100 text-center mb-6">
                  Fully responsive on smartphones
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>iPhone & Android</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Touch-optimized interface</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Apply jobs on-the-go</span>
                  </div>
                </div>
              </motion.div>

              {/* Tablet */}
              <motion.div 
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 relative"
                initial={{ opacity: 0, y: 50, rotateX: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)", borderColor: "rgb(249, 115, 22)", boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)" }}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
                  animate={{ rotateY: [0, 180, 360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <Tablet className="w-8 h-8 text-white" />
                </motion.div>
                <h5 className="text-2xl font-bold mb-3 text-center text-white">Tablet</h5>
                <p className="text-blue-100 text-center mb-6">
                  Perfect on iPad & Android tablets
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    <span>iPad & Android tablets</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    <span>Hybrid desktop/mobile view</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    <span>Comfortable experience</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-12 text-center">
              <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h4 className="text-3xl font-black text-white mb-4">No App Download Needed</h4>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                Access ZALPHA instantly without filling up storage or waiting for updates. Always use the latest version automatically.
              </p>
              <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div>
                  <div className="text-4xl font-black text-cyan-400 mb-2">0 MB</div>
                  <div className="text-blue-200">Storage Used</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-cyan-400 mb-2">Instant</div>
                  <div className="text-blue-200">Access</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-cyan-400 mb-2">Always</div>
                  <div className="text-blue-200">Updated</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Security Features */}
        <div className="mb-12">
          <h3 className="text-4xl font-bold text-white text-center mb-8">🔒 Security & Compliance</h3>
          
          <div className="bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-12 h-12 text-white" />
                  <h4 className="text-3xl font-bold text-white">Enterprise Security</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
                    <span className="text-white">Google reCAPTCHA v3 bot protection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
                    <span className="text-white">Invisible honeypot detection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
                    <span className="text-white">Behavioral pattern verification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
                    <span className="text-white">Server-side rate limiting</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
                    <span className="text-white">Encrypted data transmission (HTTPS)</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-12 h-12 text-white" />
                  <h4 className="text-3xl font-bold text-white">Legal Protection</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
                    <span className="text-white">FERPA compliance for student education records</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
                    <span className="text-white">Non-discrimination agreements for employers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
                    <span className="text-white">Hold harmless agreements (students & employers)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
                    <span className="text-white">GDPR & privacy compliance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
                    <span className="text-white">Age verification (18+ requirement)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
                    <span className="text-white">Content moderation system</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Model */}
        <div className="mb-12">
          <h3 className="text-4xl font-bold text-white text-center mb-8">💰 Revenue Model</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Employer Subscriptions */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h4 className="text-2xl font-bold text-slate-900 mb-6">Employer Subscriptions</h4>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900">Starter</span>
                    <span className="text-2xl font-bold text-blue-600">$99/mo</span>
                  </div>
                  <div className="text-sm text-slate-600">5 active jobs • Basic search • Email support</div>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-indigo-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900">Professional</span>
                    <span className="text-2xl font-bold text-indigo-600">$249/mo</span>
                  </div>
                  <div className="text-sm text-slate-600">20 jobs • Analytics • Priority support</div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900 flex items-center gap-2">
                      Ultra Premium <Crown className="w-5 h-5 text-amber-600" />
                    </span>
                    <span className="text-2xl font-bold text-amber-600">$499/mo</span>
                  </div>
                  <div className="text-sm text-slate-600">Unlimited • Skills assessment access • Dedicated manager</div>
                </div>
              </div>
            </div>

            {/* Revenue Distribution */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h4 className="text-2xl font-bold text-slate-900 mb-6">Revenue Distribution</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900">KI Executive Group</span>
                    <span className="text-2xl font-bold text-slate-900">75%</span>
                  </div>
                  <div className="h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-emerald-700">School Commission</span>
                    <span className="text-2xl font-bold text-emerald-700">15%</span>
                  </div>
                  <div className="h-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style={{ width: '60%' }}></div>
                  <p className="text-xs text-slate-600 mt-1">From student's affiliated school</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-purple-700">Affiliate Commission</span>
                    <span className="text-2xl font-bold text-purple-700">10%</span>
                  </div>
                  <div className="h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full" style={{ width: '40%' }}></div>
                  <p className="text-xs text-slate-600 mt-1">When employers referred by affiliates</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Example: $249/mo Professional</span>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">KI Executive Group:</span>
                    <span className="font-bold">$186.75</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">School (15%):</span>
                    <span className="font-bold text-emerald-600">$37.35</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Affiliate (10%):</span>
                    <span className="font-bold text-purple-600">$24.90</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-12">
          <h3 className="text-4xl font-bold text-white text-center mb-8">⚙️ Technology Stack</h3>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/30">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Frontend
                </h4>
                <ul className="space-y-2 text-white">
                  <li>• React 18 + TypeScript</li>
                  <li>• Tailwind CSS v4</li>
                  <li>• Vite build system</li>
                  <li>• PWA with service workers</li>
                  <li>• Lucide React icons</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  Backend
                </h4>
                <ul className="space-y-2 text-white">
                  <li>• Supabase (PostgreSQL)</li>
                  <li>• Edge Functions (Deno)</li>
                  <li>• Hono web framework</li>
                  <li>• Server-side KV store</li>
                  <li>• RESTful API design</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  <LinkIcon className="w-6 h-6" />
                  Integrations
                </h4>
                <ul className="space-y-2 text-white">
                  <li>• ZALPHA ATS (Built-in)</li>
                  <li>• Company Website API</li>
                  <li>• Stripe Payments</li>
                  <li>• Google reCAPTCHA</li>
                  <li>• Webhook support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Call-to-Action Buttons */}
        <motion.div 
          className="mt-16 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <h3 className="text-4xl font-bold text-white text-center mb-8">Ready to Get Started?</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              onClick={() => onNavigate('student-dashboard')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all flex items-center gap-3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(34, 211, 238, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              style={{ boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}
            >
              <GraduationCap className="w-8 h-8" />
              Get Started Free
            </motion.button>
            
            <motion.button
              onClick={() => onNavigate('employer-dashboard')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all flex items-center gap-3"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(99, 102, 241, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              style={{ boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}
            >
              <Briefcase className="w-8 h-8" />
              For Employers
            </motion.button>
            
            <motion.button
              onClick={() => onNavigate('school-revenue-dashboard')}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all flex items-center gap-3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(16, 185, 129, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              style={{ boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}
            >
              <School className="w-8 h-8" />
              Educational Partner Login
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-cyan-300 text-lg">
            Built for the Western Pacific • Powered by KI Executive Group
          </p>
          <p className="text-white/70 text-sm mt-2">
            Serving CNMI, FSM, Guam, Hawaii, Palau, and the Marshall Islands
          </p>
        </div>
      </div>
    </div>
  );
}