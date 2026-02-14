import { 
  ChevronLeft, ChevronRight, MapPin, Users, DollarSign, 
  TrendingUp, CheckCircle, Shield, Zap, Globe, Building2, 
  GraduationCap, Award, Target, BarChart3, Briefcase, 
  FileText, Lock, Eye, Accessibility, Bot, Star, Crown,
  ArrowRight, Phone, Mail, Heart, Fingerprint, Clock, User, Smartphone
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BackButton } from '@/app/components/BackButton';

interface PitchDeckRecruitProps {
  onNavigate: (page: string) => void;
}

export function PitchDeckRecruit({ onNavigate }: PitchDeckRecruitProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      id: 'title',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-7xl font-black text-white mb-6">
              ZALFA RECRUIT
            </h1>
            <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-8">
              FRESH TALENT. FUTURE LEADERS.
            </div>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Co-op, internships, early-career hiring, and global contract placements for Pacific students 
              and employers in one connected platform.
            </p>
          </motion.div>
          <div className="mt-12 text-blue-200 text-lg">
            <p className="font-semibold">KI Executive Group</p>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Contact: TBD</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@kiexgroup.com</span>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 2: Problem
    {
      id: 'problem',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">The Pacific Workforce Challenge</h2>
          <div className="space-y-6 max-w-5xl">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                <p className="text-xl text-blue-50 leading-relaxed">
                  High-school co-op programs in CNMI and Guam rely on <strong className="text-white">manual paperwork 
                  and spreadsheets</strong>; placements and hours are hard to track.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="text-xl text-blue-50 leading-relaxed">
                  Local employers struggle to find <strong className="text-white">qualified Pacific talent</strong> for 
                  skilled and EPA/federally mandated roles.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <Globe className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-xl text-blue-50 leading-relaxed">
                  International contractors hiring for infrastructure and public utility projects face{' '}
                  <strong className="text-white">complex compliance</strong> across CNMI DOL, Guam DOL, US DOL, 
                  Philippine DOLE, and COFA partner states.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <Building2 className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <p className="text-xl text-blue-50 leading-relaxed">
                  Existing platforms (Indeed, ZipRecruiter, Handshake) are <strong className="text-white">not built 
                  for the Pacific context</strong>, co-op programs, or regional compliance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 3: Solution
    {
      id: 'solution',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-8">ZALFA Recruit: One Platform, Three Markets</h2>
          <div className="grid grid-cols-3 gap-8 mt-12">
            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <GraduationCap className="w-16 h-16 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Co-Op & Work-Based Learning</h3>
              <p className="text-blue-100 leading-relaxed">
                Digital co-op marketplace for CNMI/Guam high-school students; applications, placements, 
                hours tracking, and certificates in one system.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Briefcase className="w-16 h-16 text-green-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Local Hiring & HR</h3>
              <p className="text-blue-100 leading-relaxed">
                Job board + ATS + HR tools for Pacific employers; AI interviewer, candidate profiles, 
                and compliance tracking.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Globe className="w-16 h-16 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Global Contracts Marketplace</h3>
              <p className="text-blue-100 leading-relaxed">
                A vertical marketplace connecting international contractors and agencies with Pacific talent 
                for fixed-term professional contracts (EPA, CUC, infrastructure, healthcare, education).
              </p>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 4: Revenue Model
    {
      id: 'revenue',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">Revenue Model</h2>
          <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-8 h-8 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">School Licenses</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Annual subscription per institution or per student cohort for co-op, internships, and early-career 
                tools. <strong className="text-white">$15K–$30K/year per school</strong> or{' '}
                <strong className="text-white">$50–$100 per active student/year</strong>.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-bold text-white">Employer Subscriptions</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Low monthly plans for local SMBs, utilities, and government contractors to access students, 
                alumni, and hiring tools. <strong className="text-white">$29–$99/month</strong>.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Credits (Usage-Based)</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                <strong className="text-white">$5–$20 per credit</strong> for high-value actions like boosting 
                jobs, running AI interviews, or unlocking candidate profiles.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Global Contracts</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                <strong className="text-white">10–15% commission</strong> on each successful contract placement, 
                or subscription <strong className="text-white">$299–$999/month</strong> plus reduced commission (5–8%).
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-2 border-cyan-400/50 rounded-xl p-6 col-span-2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-pink-400" />
                <h3 className="text-xl font-bold text-white">Revenue Share with Schools</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Schools receive <strong className="text-white">10% of employer subscription + credit spend</strong>{' '}
                tied to their students or employers they bring into the platform.
              </p>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 5: Unit Economics
    {
      id: 'unit-economics',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">Path to Profitability</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">Example Year 1 Revenue</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-blue-100">3 school licenses × $20,000/year</span>
                  <span className="text-white font-bold text-xl">$60,000</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-blue-100">30 employers × $79/month × 12</span>
                  <span className="text-white font-bold text-xl">$28,440</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-blue-100">Employer credits: 30 × $150/month × 12</span>
                  <span className="text-white font-bold text-xl">$54,000</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-blue-100">5 contract placements × $18,000 avg commission</span>
                  <span className="text-white font-bold text-xl">$90,000</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-green-400 font-semibold">Total Annual Revenue</span>
                  <span className="text-green-400 font-bold text-2xl">$232,440</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-orange-300">10% school revenue share</span>
                  <span className="text-orange-300 font-bold text-xl">-$8,244</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-cyan-400 font-semibold">Net Revenue</span>
                  <span className="text-cyan-400 font-bold text-2xl">$224,196</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-red-300">Monthly burn: $13,000 × 12</span>
                  <span className="text-red-300 font-bold text-xl">-$156,000</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white font-bold text-xl">Estimated Annual Profit</span>
                  <span className="text-green-400 font-black text-3xl">$68,000</span>
                </div>
              </div>
            </div>
            <motion.div
              className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm border-2 border-green-400/50 rounded-xl p-6 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xl text-white font-bold">
                Breakeven at ≈2 schools + 20 employers, or 4–5 contract placements per year
              </p>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 6: Market Opportunity
    {
      id: 'market',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">Pacific Workforce + Federal Spending</h2>
          <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <MapPin className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Pacific Population</h3>
              <p className="text-blue-100">
                CNMI/Guam/COFA region with young, US-connected workforce ready for opportunities
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <GraduationCap className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">CNMI PSS Co-Op</h3>
              <p className="text-blue-100">
                150+ students across 3 islands participating in co-op programs annually
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">NMC + NMTECH</h3>
              <p className="text-blue-100">
                Combined enrollment of ≈2,000 students seeking career pathways
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <DollarSign className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Federal Investment</h3>
              <p className="text-blue-100">
                Significant US federal infrastructure and military spending in the Pacific over next decade
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-8 text-center col-span-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">EPA/DOL-Mandated Roles</h3>
              <p className="text-blue-100 text-lg">
                Utilities and public works require compliance-focused hiring for infrastructure projects
              </p>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 7: Global Contracts Marketplace
    {
      id: 'global-contracts',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-8">High-Value Contract Recruiting</h2>
          <div className="max-w-5xl mx-auto">
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              A specialized marketplace inside ZALFA Recruit for placing Pacific talent into high-value 
              fixed-term contracts (EPA compliance roles, CUC and utility engineers, healthcare, education, 
              and infrastructure).
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Crown className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Pure Commission</h3>
                <p className="text-blue-100 text-sm mb-2">
                  <strong className="text-white">10–15%</strong> of first-year salary
                </p>
                <p className="text-blue-200 text-xs">
                  Example: $150K contract → $15K–$22.5K fee
                </p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Star className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Subscription + Commission</h3>
                <p className="text-blue-100 text-sm mb-2">
                  <strong className="text-white">$299–$999/month</strong> with lower commission
                </p>
                <p className="text-blue-200 text-xs">
                  5–8% success fee for regular users
                </p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Award className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Retainer + Success Fee</h3>
                <p className="text-blue-100 text-sm mb-2">
                  <strong className="text-white">$5K–$15K</strong> quarterly retainer
                </p>
                <p className="text-blue-200 text-xs">
                  Plus 3–5% success fee for exclusive partners
                </p>
              </motion.div>
            </div>

            <motion.div
              className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm border-2 border-green-400/50 rounded-xl p-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-white mb-3">Traction Path</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-green-400 font-bold mb-1">Year 1</p>
                  <p className="text-blue-100">5–10 placements</p>
                </div>
                <div>
                  <p className="text-green-400 font-bold mb-1">Year 2</p>
                  <p className="text-blue-100">20–30 placements with agency partnerships</p>
                </div>
                <div>
                  <p className="text-green-400 font-bold mb-1">Year 3+</p>
                  <p className="text-blue-100">Regional government programs</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 7A: Dual Contract Marketplaces
    {
      id: 'dual-marketplaces',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">Dual Contract Marketplaces</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-8 mb-10">
              {/* Left: ZALFA Contract Marketplace */}
              <motion.div
                className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-8"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">ZALFA Contract Marketplace</h3>
                </div>
                <p className="text-blue-50 text-lg leading-relaxed mb-6">
                  <strong className="text-white">Our own contract marketplace</strong> for CNMI, Guam, and COFA 
                  talent and employers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-blue-100">
                      <strong className="text-white">End-to-end ownership:</strong> ZALFA controls sourcing, 
                      AI screening, compliance checks, and placement
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-blue-100">
                      <strong className="text-white">Direct postings:</strong> Employers and agencies post 
                      EPA roles, CUC utilities, infrastructure, healthcare, education
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-blue-100">
                      <strong className="text-white">Revenue:</strong> Commission per hire (10–15%) and/or 
                      employer subscriptions
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* Right: Curated Partner Marketplaces */}
              <motion.div
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-8"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Curated Partner Marketplaces</h3>
                </div>
                <p className="text-blue-50 text-lg leading-relaxed mb-6">
                  <strong className="text-white">A curated network</strong> of trusted marketplaces and agencies 
                  we plug into.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                    <span className="text-blue-100">
                      <strong className="text-white">Vetted partners only:</strong> Global talent marketplaces, 
                      government labor exchanges, and partner MSPs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                    <span className="text-blue-100">
                      <strong className="text-white">Seamless access:</strong> Users access additional contracts 
                      without leaving ZALFA (partners clearly branded)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                    <span className="text-blue-100">
                      <strong className="text-white">Revenue:</strong> Revenue share/commission or referral 
                      fees on partner-fulfilled contracts
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Bottom Summary */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xl text-white font-bold mb-3">
                Why This Dual Approach Works
              </p>
              <p className="text-blue-100 text-lg leading-relaxed">
                This strategy lets us <strong className="text-white">own the Pacific niche</strong> (CNMI, Guam, 
                COFA) with full control over quality, compliance, and user experience—while still connecting our 
                users to <strong className="text-white">larger global networks</strong> through vetted partners. 
                We don't need to hold all inventory; we curate the best external sources and earn revenue share.
              </p>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 8: Technology & Compliance
    {
      id: 'technology',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-8">Built to Last: Compliance-First Architecture</h2>
          <p className="text-xl text-cyan-400 mb-10 text-center font-semibold">20-Year Strategy</p>
          <div className="grid grid-cols-3 gap-6">
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Shield className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">Continuous Compliance</h3>
              <p className="text-blue-100 text-sm">
                Automated monitoring for CNMI/Guam/US/Philippine labor rules, real-time audit trails, 
                and auto-updated forms.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">API-First, Modular Design</h3>
              <p className="text-blue-100 text-sm">
                Each major feature is an independent API so you can swap AI models, add regions, 
                or white-label without replatforming.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Building2 className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">Multi-Tenant SaaS</h3>
              <p className="text-blue-100 text-sm">
                Every school, employer, and agency is a separate tenant with isolated data, branding, 
                and roles, ready to scale from 3 schools to 300.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FileText className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">Automated Documentation</h3>
              <p className="text-blue-100 text-sm">
                Every job, hire, interview, and compliance check is timestamped, logged, 
                and exportable for audits and legal requirements.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Accessibility className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">ADA & Accessibility</h3>
              <p className="text-blue-100 text-sm">
                Full ADA web compliance targeting WCAG 2.1 AA: screen reader support, keyboard navigation, 
                high-contrast modes, and accessible job/co-op application flows.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Bot className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">Certified AI Interviewer</h3>
              <p className="text-blue-100 text-sm">
                AI interviewer designed for fair, consistent hiring with EEOC-aligned question sets, 
                GDPR-style privacy protections, and full audit logs.
              </p>
            </motion.div>
          </div>
          <motion.div
            className="mt-8 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-sm border-2 border-cyan-400/50 rounded-xl p-6 text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-xl text-white font-bold">
              Future-proof architecture for the next 20 years of Pacific workforce and compliance needs
            </p>
          </motion.div>
        </div>
      )
    },

    // Slide 8A: Pacific-Wide & COFA Compliance
    {
      id: 'pacific-cofa-compliance',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">Pacific-Wide Compliance Engine</h2>
          <div className="max-w-5xl mx-auto space-y-8">
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start gap-4">
                <Shield className="w-10 h-10 text-cyan-400 flex-shrink-0 mt-1" />
                <p className="text-xl text-blue-50 leading-relaxed">
                  Supports <strong className="text-white">CNMI and Guam labor</strong> and{' '}
                  <strong className="text-white">EPA/federal contract requirements</strong>.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <Globe className="w-10 h-10 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-xl text-blue-50 leading-relaxed">
                  Designed for <strong className="text-white">COFA partners</strong>: Federated States of 
                  Micronesia (FSM), Republic of Palau, and Republic of the Marshall Islands (citizens can live 
                  and work in the U.S. and territories under the Compacts of Free Association).
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <FileText className="w-10 h-10 text-purple-400 flex-shrink-0 mt-1" />
                <p className="text-xl text-blue-50 leading-relaxed">
                  Incorporates <strong className="text-white">federal guidance on employment eligibility 
                  and documentation</strong> for COFA citizens working in U.S. territories.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <Zap className="w-10 h-10 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="text-xl text-blue-50 leading-relaxed">
                  <strong className="text-white">Architecture can adapt</strong> as COFA agreements and 
                  local labor rules evolve over the next decades.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 9: Accessibility & AI Certifications
    {
      id: 'certifications',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">Built for Everyone, Certified for Trust</h2>
          <div className="grid grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm border-2 border-pink-400/50 rounded-2xl p-8"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Accessibility className="w-12 h-12 text-pink-400" />
                <h3 className="text-2xl font-bold text-white">ADA & Disability Inclusion</h3>
              </div>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <span>ADA and WCAG 2.1 AA-oriented web experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <span>Screen reader and keyboard-friendly UI; high-contrast option</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <span>Fully accessible flows for students, jobseekers, and employers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <span>Disability accommodation fields and reporting to support DOL and internal policies</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-8"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Bot className="w-12 h-12 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">AI Interviewer Certifications</h3>
              </div>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>AI interviewer trained on fair hiring practices and bias mitigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>No discriminatory questions; structured, role-relevant question banks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Privacy-aware design with clear consent and data handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Security and compliance standards roadmap (EEOC alignment, GDPR-style privacy, SOC 2, ISO 27001)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>All AI interviews logged with explanations and human override</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 10: Native Mobile App
    {
      id: 'mobile-app',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">Native Mobile App – Secure & Ready to Go</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Left: Phone Mockup */}
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative" style={{ maxWidth: '280px' }}>
                  <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-3 shadow-2xl">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl"></div>
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-[2rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                      <div className="h-full flex flex-col p-6 pt-10">
                        <div className="text-white mb-6">
                          <p className="text-xs opacity-80 mb-1">ZALFA Recruit</p>
                          <p className="text-lg font-bold">Co-Op Portal</p>
                        </div>
                        <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-3">
                          <div className="bg-white/20 rounded-lg p-3 flex items-center gap-2">
                            <Smartphone className="w-5 h-5 text-white" />
                            <span className="text-white text-sm">Quick Check-In</span>
                          </div>
                          <div className="bg-white/20 rounded-lg p-3 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-white" />
                            <span className="text-white text-sm">Log Hours</span>
                          </div>
                          <div className="bg-white/20 rounded-lg p-3 flex items-center gap-2">
                            <User className="w-5 h-5 text-white" />
                            <span className="text-white text-sm">View Profile</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-6 top-1/4 bg-white rounded-xl shadow-xl p-3 border-2 border-blue-200">
                    <Fingerprint className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              {/* Right: Feature List */}
              <div className="space-y-6">
                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">iOS and Android App</h3>
                      <p className="text-blue-100">
                        For students, schools, and employers to access ZALFA Recruit on the go.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Fingerprint className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Biometric Sign-In</h3>
                      <p className="text-blue-100">
                        Fingerprint or face/retina (Face ID / Face Unlock) where supported, plus secure 
                        PIN/password fallback.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Optimized for Speed</h3>
                      <p className="text-blue-100">
                        Co-op students can quickly log hours, and employers can review candidates from 
                        their phones in seconds.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 11: Traction
    {
      id: 'traction',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">Early Wins & Pipeline</h2>
          <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Award className="w-16 h-16 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">High-Level EPA Placements</h3>
              <p className="text-blue-100">
                Successful placement of high-level EPA-related roles for CUC (e.g., Deputy Director & 
                Chief Engineer for Water/Wastewater).
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <GraduationCap className="w-16 h-16 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">CNMI PSS Co-Op Pilot</h3>
              <p className="text-blue-100">
                Active pilot with 150+ students across islands demonstrating the co-op module in real-world conditions.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Users className="w-16 h-16 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">NMC & NMTECH Discussions</h3>
              <p className="text-blue-100">
                Active discussions for integrated career services with Northern Marianas College and NMTECH.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Building2 className="w-16 h-16 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Employer Beta Pipeline</h3>
              <p className="text-blue-100">
                Employers in beta pipeline including utilities, contractors, and SMBs across the Pacific.
              </p>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 10: Go-to-Market
    {
      id: 'gtm',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">Go-to-Market: Land & Expand</h2>
          <div className="max-w-5xl mx-auto space-y-8">
            <motion.div
              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-cyan-400 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white">Phase 1 (2026)</h3>
              </div>
              <p className="text-blue-100 text-lg ml-16">
                Launch with CNMI PSS co-op module, onboard initial schools and employers.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-400 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white">Phase 2 (2026–2027)</h3>
              </div>
              <p className="text-blue-100 text-lg ml-16">
                Add NMC/NMTECH, expand local employer subscriptions, deepen co-op integration.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-400 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white">Phase 3 (2027+)</h3>
              </div>
              <p className="text-blue-100 text-lg ml-16">
                Scale global contracts marketplace, partner with Philippine agencies and regional governments 
                (FSM, Palau, Marshall Islands).
              </p>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 13: Competitive Landscape
    {
      id: 'competitive-landscape',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">How We Compare</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-12">
              {/* Left Column: Competitors */}
              <div className="space-y-8">
                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-8 h-8 text-red-400" />
                    <h3 className="text-2xl font-bold text-white">Indeed & ZipRecruiter</h3>
                  </div>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    <strong className="text-white">Global, generic job traffic</strong>; no Pacific-specific 
                    compliance or co-op focus.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-8 h-8 text-orange-400" />
                    <h3 className="text-2xl font-bold text-white">Handshake</h3>
                  </div>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    <strong className="text-white">Strong for US mainland universities</strong>, but limited 
                    coverage for small island colleges, trades, and high-school co-op programs.
                  </p>
                </motion.div>
              </div>

              {/* Right Column: ZALFA Recruit */}
              <motion.div
                className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-8 flex flex-col justify-center"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">ZALFA Recruit</h3>
                </div>
                <p className="text-blue-50 text-xl leading-relaxed mb-6">
                  <strong className="text-white">Pacific-first</strong>, co-op and contracts-aware, built to{' '}
                  <strong className="text-white">complement Handshake</strong>, not replace it, by handling 
                  the CNMI/Guam/COFA piece they don't.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-4 py-2 bg-cyan-500 text-white rounded-full text-sm font-bold">CNMI</span>
                  <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-bold">Guam</span>
                  <span className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-bold">FSM</span>
                  <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold">Palau</span>
                  <span className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-bold">RMI</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Positioning Statement */}
            <motion.div
              className="mt-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-2xl text-white font-bold">
                "ZALFA Recruit focuses on the Pacific—CNMI, Guam, and COFA partners—and plugs into 
                existing tools like Handshake rather than trying to replace them."
              </p>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 14: Competitive Advantage
    {
      id: 'competitive-advantage',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12">Why ZALFA Recruit Wins</h2>
          <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-10 h-10 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Pacific-Native Compliance</h3>
              </div>
              <p className="text-blue-100 text-sm">
                Purpose-built for CNMI/Guam/COFA labor and EPA/federal contract requirements.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-10 h-10 text-green-400" />
                <h3 className="text-xl font-bold text-white">Multi-Sided Network</h3>
              </div>
              <p className="text-blue-100 text-sm">
                Students, schools, local employers, and global contractors in one ecosystem.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-10 h-10 text-pink-400" />
                <h3 className="text-xl font-bold text-white">Revenue Share with Schools</h3>
              </div>
              <p className="text-blue-100 text-sm">
                Schools receive 10% of employer spend, aligning incentives and encouraging adoption.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Accessibility className="w-10 h-10 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Full Accessibility & AI Governance</h3>
              </div>
              <p className="text-blue-100 text-sm">
                ADA/WCAG-aligned platform and a fair, auditable AI interviewer.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-2 border-cyan-400/50 rounded-xl p-6 col-span-2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-10 h-10 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">20-Year Architecture</h3>
              </div>
              <p className="text-blue-100">
                API-first, multi-tenant, compliance-automated design that can evolve with new laws, AI models, and regions.
              </p>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 15: Team
    {
      id: 'team',
      content: (
        <div className="px-12 py-8">
          <h2 className="text-5xl font-black text-white mb-12 text-center">Team & Advisors</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">PK Daigo</h3>
                <p className="text-cyan-400 font-semibold mb-3">Chief Product Officer</p>
                <p className="text-blue-100 text-sm">
                  ZALFA Powered by KI EX
                </p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Eleanor Alinas</h3>
                <p className="text-green-400 font-semibold mb-3">Chief Executive Officer</p>
                <p className="text-blue-100 text-sm">
                  KI Executive Group
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 inline-block">
                <div className="flex items-center gap-3 justify-center">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  <a href="mailto:contact@kiexgroup.com" className="text-xl text-white hover:text-cyan-400 transition">
                    contact@kiexgroup.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },

    // Slide 16: The Ask
    {
      id: 'ask',
      content: (
        <div className="px-12 py-8 flex flex-col items-center justify-center h-full">
          <motion.div
            className="max-w-4xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl font-black text-white mb-12 text-center">The Ask</h2>
            
            <div className="bg-gradient-to-br from-cyan-500/30 to-blue-500/30 backdrop-blur-sm border-2 border-cyan-400/50 rounded-3xl p-12 mb-8">
              <div className="text-center mb-8">
                <p className="text-5xl font-black text-white mb-4">$[Amount]</p>
                <p className="text-xl text-blue-100">Seed/Series A Funding</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6">Use of Funds:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                    <p className="text-blue-100">Finish CNMI PSS/NMC/NMTECH integrations</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                    <p className="text-blue-100">Scale sales and employer onboarding</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                    <p className="text-blue-100">Expand global marketplace and agency partnerships</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                    <p className="text-blue-100">Invest in compliance infrastructure and security certifications</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-blue-200 text-lg">
              <p>Contact us to schedule a full product demo and discuss partnership opportunities</p>
            </div>
          </motion.div>
        </div>
      )
    },

    // Slide 17: Closing
    {
      id: 'closing',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-8xl font-black text-white mb-8">
              ZALFA RECRUIT
            </h1>
            <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-12">
              FRESH TALENT. FUTURE LEADERS.
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Leadership Team</h3>
              <div className="space-y-4 text-blue-100 mb-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">PK Daigo</p>
                  <p className="text-cyan-400">Chief Product Officer, ZALFA Powered by KI EX</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">Eleanor Alinas</p>
                  <p className="text-green-400">Chief Executive Officer</p>
                </div>
              </div>
              <div className="pt-6 border-t border-white/20">
                <h4 className="text-lg font-bold text-white mb-4 text-center">Contact</h4>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <a href="mailto:contact@kiexgroup.com" className="text-lg hover:text-cyan-400 transition">
                      contact@kiexgroup.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <span className="text-lg">www.zalpharecruit.com</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-blue-200 text-xl">
              KI Executive Group | Pacific Workforce Solutions
            </p>
          </motion.div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <BackButton onNavigate={onNavigate} label="Back" />
      </div>

      {/* Slide Container */}
      <div className="h-screen flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-8 py-4">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all ${
                  index === currentSlide
                    ? 'w-8 h-3 bg-cyan-400'
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4">
          <span className="text-white/70 text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
}