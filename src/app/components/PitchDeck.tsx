/**
 * ZALPHA Co-Op Pitch Deck
 * "Work-Ready Pacific: Real Skills Through Real Work"
 * Mobile-first vertical slides (390x844)
 */

import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  FileText,
  Users,
  Wrench,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  ArrowDown,
  Mail,
  Calendar,
  Rocket,
  Globe,
  AlertCircle,
  Target,
  Award,
  BarChart3,
  GraduationCap,
  Briefcase,
  Smartphone,
  Clock,
  MessageSquare,
  BarChart,
  Zap,
  FileCheck,
  DollarSign,
  CreditCard,
  Wifi,
  Home,
  BookOpen,
  UserPlus,
  Bus,
  Network,
  Fingerprint,
  BadgeCheck,
} from 'lucide-react';

// Slide 1: Title
function Slide1() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-32 translate-y-32" />
      
      <div className="relative z-10 text-center">
        {/* Globe Icon */}
        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/30">
          <Globe className="w-12 h-12" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Work-Ready Pacific:
          <br />
          Real Skills Through
          <br />
          Real Work
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-blue-100 mb-8 max-w-md mx-auto">
          How ZALPHA Co-Op turns placements into career launchpads
        </p>

        {/* Icons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Users className="w-8 h-8" />
          </div>
          <div className="text-2xl">+</div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Target className="w-8 h-8" />
          </div>
        </div>

        {/* Regions */}
        <div className="space-y-1 text-sm text-blue-100">
          <p className="font-semibold text-white">Pacific Islands Region</p>
          <p>CNMI • Guam • FSM</p>
          <p>Palau • Marshall Islands</p>
        </div>

        {/* ZALPHA Logo */}
        <div className="mt-8">
          <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-base px-4 py-2">
            ZALPHA
          </Badge>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/80" />
      </div>
    </div>
  );
}

// Slide 2: The Problem
function Slide2() {
  const problems = [
    {
      icon: FileText,
      text: 'Students log hours but struggle to show real, resume-worthy skills',
    },
    {
      icon: Target,
      text: 'Employers can\'t attract youth to roles seen as "just food service" or "basic retail"',
    },
    {
      icon: Award,
      text: 'Co-op coordinators can\'t easily see what students actually learned beyond attendance',
    },
  ];

  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="font-semibold text-red-200">The Problem</span>
          </div>
        </div>

        <div className="space-y-4">
          {problems.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <Card key={idx} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <p className="text-slate-200 leading-relaxed flex-1 pt-2">
                    {problem.text}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-400 italic text-sm">
            Traditional co-ops track time,
            <br />
            not skills or real outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}

// Slide 3: The ZALPHA Difference
function Slide3() {
  const categories = [
    { icon: FileText, label: 'HR Admin', color: '#8b5cf6' },
    { icon: Users, label: 'POS Service', color: '#06b6d4' },
    { icon: Wrench, label: 'Hands-On Ops', color: '#10b981' },
    { icon: Lightbulb, label: 'R&D Ideas', color: '#f59e0b' },
  ];

  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-900">The ZALPHA Difference</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            From vague experience to
            <br />
            <span className="text-blue-600">clear deliverables</span>
          </h2>
        </div>

        {/* Before/After */}
        <div className="bg-slate-50 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="bg-slate-200 text-slate-600 rounded-lg px-4 py-2 mb-2 text-sm font-medium">
                Before
              </div>
              <p className="text-slate-700 font-semibold">"Front Desk"</p>
            </div>
            <ArrowDown className="w-6 h-6 text-blue-500 rotate-[-90deg]" />
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-lg px-4 py-2 mb-2 text-sm font-medium">
                After
              </div>
              <p className="text-blue-900 font-semibold text-sm">
                Customer Service
                <br />& POS Specialist
              </p>
            </div>
          </div>
        </div>

        {/* Business Functions */}
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3 text-center">
            Business Functions:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card
                  key={cat.label}
                  className="border-2 hover:shadow-lg transition-all"
                  style={{ borderColor: `${cat.color}40` }}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2"
                      style={{ background: `${cat.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: cat.color }} />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">
                      {cat.label}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 4: How It Works
function Slide4() {
  const steps = [
    { number: 1, emoji: '🏢', title: 'Employer', desc: 'Defines Deliverables' },
    { number: 2, emoji: '👨‍🎓', title: 'Student', desc: 'Completes & Reflects' },
    { number: 3, emoji: '💾', title: 'ZALPHA', desc: 'Records Skill Data' },
    { number: 4, emoji: '🎓', title: 'Co-Op Admin', desc: 'Sees Outcomes' },
  ];

  const examples = [
    'SOP drafting',
    'POS training',
    'Inventory checks',
    'Recipe R&D ideas',
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            How It Works:
            <br />
            Deliverables System
          </h2>
        </div>

        {/* Process Flow */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={step.number}>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{step.emoji}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-600">
                      {step.number}. {step.title}
                    </p>
                    <p className="text-slate-700">{step.desc}</p>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className="ml-8 my-2">
                    <ArrowDown className="w-5 h-5 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-blue-900 mb-3">
            Example Deliverables:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {examples.map((example) => (
              <div
                key={example}
                className="bg-white rounded-lg px-3 py-2 text-sm text-slate-700 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>{example}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 5: How Users Use ZALPHA
function Slide5() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-4">
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-900">Platform Usage</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            How Users Use ZALPHA
          </h2>
        </div>

        {/* Students */}
        <Card className="border-2 border-blue-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Students</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>PWA on phone (works offline)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Clock in/out, log deliverables</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Send messages (auto-CC admin)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Export verified achievements</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Employers */}
        <Card className="border-2 border-purple-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Employers</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Define deliverables by function</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Track progress & approve requests</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>See skill signals, adjust training</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Co-Op Admins */}
        <Card className="border-2 border-teal-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <BarChart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Co-Op Admins</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>View all placements (CNMI, Guam, COFA)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>Map to WIOA elements</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>Generate compliance reports</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>Design skill-building pathways</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Post-Secondary & Technical Institutions */}
        <Card className="border-2 border-orange-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 relative">
                <GraduationCap className="w-6 h-6 text-white" />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <Wrench className="w-2.5 h-2.5 text-orange-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">NMC & NMTech</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Track CTE co-op & apprenticeships</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Define trade skill deliverables</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Map to CTE outcomes & credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>PSS → NMC/NMTech → workforce pathways</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Z-UID Advantage */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-2xl p-4 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BadgeCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-base font-bold text-slate-900">The Z-UID Advantage</h3>
          </div>
          <p className="text-xs font-semibold text-indigo-900 mb-2">Lifelong Talent Identity</p>
          
          {/* Visual Flow */}
          <div className="flex items-center justify-center gap-1 mb-3 bg-white rounded-lg p-2">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="text-[8px] text-slate-600 mt-1 font-mono font-bold">Z-00123456</span>
            </div>
            <ArrowDown className="w-3 h-3 rotate-[-90deg] text-indigo-400" />
            <div className="flex flex-col items-center text-center">
              <span className="text-[9px] font-bold text-blue-600">Recruit</span>
            </div>
            <ArrowDown className="w-3 h-3 rotate-[-90deg] text-indigo-400" />
            <div className="flex flex-col items-center text-center">
              <span className="text-[9px] font-bold text-purple-600">MicroGig</span>
            </div>
            <ArrowDown className="w-3 h-3 rotate-[-90deg] text-indigo-400" />
            <div className="flex flex-col items-center text-center">
              <span className="text-[9px] font-bold text-emerald-600">Global</span>
            </div>
          </div>

          <ul className="space-y-1.5 text-[10px] text-slate-700">
            <li className="flex items-start gap-1.5">
              <Fingerprint className="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>Every student gets unique Z-UID tracking entire career journey</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>Co-op achievements → MicroGig work → Full-time—all in one verified profile</span>
            </li>
            <li className="flex items-start gap-1.5">
              <ArrowDown className="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5 rotate-[-90deg]" />
              <span>Seamless transition from Recruit to Global HRIS when hired</span>
            </li>
            <li className="flex items-start gap-1.5">
              <BadgeCheck className="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>Employers see verified work history, not just resumes</span>
            </li>
            <li className="flex items-start gap-1.5">
              <Users className="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>Students own their data—portable, verified, lifelong</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Slide 6: Introducing MicroGig Marketplace
function Slide6() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-5 text-white overflow-y-auto">
      <div className="max-w-md w-full space-y-4 py-6">
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold mb-2">
            Introducing MicroGig Marketplace
          </h2>
          <p className="text-sm text-white/90 leading-tight">
            From co-op to paid work: Pacific Islander talent meets flexible opportunities
          </p>
        </div>

        {/* Hero Visual */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-400/30 rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <ArrowDown className="w-4 h-4 rotate-[-90deg]" />
            <Globe className="w-8 h-8 text-cyan-300" />
            <ArrowDown className="w-4 h-4 rotate-[-90deg]" />
            <div className="w-8 h-8 bg-purple-400/30 rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 3 Tiers */}
        <div className="space-y-3">
          {/* MicroGigs */}
          <Card className="border-2 border-yellow-200 bg-white">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900">MicroGigs</h3>
              </div>
              <ul className="space-y-1 text-xs text-slate-700">
                <li>• Short-term tasks (1 day - 2 weeks)</li>
                <li>• $15-$50/hour typical</li>
                <li>• Perfect for students earning while learning</li>
                <li className="italic text-slate-600">Ex: Event help, delivery, admin tasks</li>
              </ul>
            </CardContent>
          </Card>

          {/* MicroContracts */}
          <Card className="border-2 border-blue-200 bg-white">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900">MicroContracts</h3>
              </div>
              <ul className="space-y-1 text-xs text-slate-700">
                <li>• Project-based work (1-6 months)</li>
                <li>• $500-$10,000 typical projects</li>
                <li>• Build portfolio & professional experience</li>
                <li className="italic text-slate-600">Ex: Social media, bookkeeping, web design</li>
              </ul>
            </CardContent>
          </Card>

          {/* Professional Contracts */}
          <Card className="border-2 border-purple-200 bg-white">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Professional Contracts</h3>
              </div>
              <ul className="space-y-1 text-xs text-slate-700">
                <li>• Full placements (6-12+ months)</li>
                <li>• Competitive regional/international rates</li>
                <li>• Career-level opportunities with benefits</li>
                <li className="italic text-slate-600">Ex: IT specialists, nurses, teachers</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
          <p className="text-xs font-semibold mb-2">How it works:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="font-semibold mb-1">For Workers:</p>
              <p className="text-white/80 leading-tight">Profile pulls from verified co-op achievements → Apply → Get paid → Build ratings</p>
            </div>
            <div>
              <p className="font-semibold mb-1">For Employers:</p>
              <p className="text-white/80 leading-tight">Post opportunities → Browse verified talent → Hire & manage → Pay securely</p>
            </div>
          </div>
        </div>

        {/* Talent Pipeline */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
          <p className="text-xs font-semibold mb-2">The Talent Pipeline:</p>
          <div className="flex items-center justify-center gap-1 text-[10px] text-center">
            <span>High School Co-Op</span>
            <ArrowDown className="w-3 h-3 rotate-[-90deg] flex-shrink-0" />
            <span>College Work-Study</span>
            <ArrowDown className="w-3 h-3 rotate-[-90deg] flex-shrink-0" />
            <span>MicroGigs</span>
            <ArrowDown className="w-3 h-3 rotate-[-90deg] flex-shrink-0" />
            <span>Full-Time</span>
          </div>
        </div>

        {/* Revenue Note */}
        <div className="text-center">
          <p className="text-[10px] text-white/70">
            Platform fee: 10-15% per transaction • Employer premium: $149/month
          </p>
        </div>
      </div>
    </div>
  );
}

// Slide 7: Student Advantage
function Slide7() {
  const achievements = [
    'Helped draft HR SOPs for Student Co-Op Program (Employer verified)',
    'Operated POS system independently during lunch rush',
    'Contributed 3 new menu R&D ideas; 1 implemented',
  ];

  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center mb-2">
          <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
            <Target className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-emerald-900">Student Advantage</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            From <span className="text-slate-500">"I worked at a café"</span>
            <br />
            to <span className="text-emerald-600">real achievements</span>
          </h2>
        </div>

        <div className="space-y-3">
          {achievements.map((achievement, idx) => (
            <Card key={idx} className="border-2 border-emerald-200 bg-emerald-50/50">
              <CardContent className="p-4 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed flex-1">
                  {achievement}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-800">
            <strong>Export to:</strong> Resume, Portfolio, or
            <br />
            Zee Bot–generated CV ✓
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-emerald-600">5.2x</p>
            <p className="text-xs text-slate-600">More callbacks</p>
          </div>
          <div className="w-px h-12 bg-slate-200" />
          <div>
            <p className="text-3xl font-bold text-blue-600">78%</p>
            <p className="text-xs text-slate-600">Get hired</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 8: Employer Advantage
function Slide8() {
  const roles = [
    { emoji: '💡', title: 'Recipe R&D Assistant', count: 23, color: '#f59e0b' },
    { emoji: '👥', title: 'Customer Insights & Service Design', count: 18, color: '#06b6d4' },
    { emoji: '📋', title: 'HR & People Operations Support', count: 31, color: '#8b5cf6' },
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-4">
            <Target className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-purple-900">Employer Advantage</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Attract the right students
            <br />
            with <span className="text-purple-600">real work</span>,
            <br />
            not stereotypes
          </h2>
        </div>

        <p className="text-sm font-semibold text-slate-700 text-center">
          Function-Based Roles:
        </p>

        <div className="space-y-3">
          {roles.map((role) => (
            <Card
              key={role.title}
              className="border-2 hover:shadow-lg transition-all"
              style={{ borderColor: `${role.color}40`, background: `${role.color}08` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{role.emoji}</span>
                  <p className="text-sm font-semibold text-slate-900 flex-1">
                    {role.title}
                  </p>
                </div>
                <div className="flex items-center justify-between ml-11">
                  <span className="text-xs text-slate-600">Student interest:</span>
                  <Badge
                    className="font-bold"
                    style={{ background: role.color, color: 'white' }}
                  >
                    {role.count} students
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-4 text-center">
          <p className="text-sm mb-1">
            Students see <strong>skills and deliverables</strong>,
            <br />
            not just job titles
          </p>
          <p className="text-2xl font-bold">3.9x more applicants! 📊</p>
        </div>
      </div>
    </div>
  );
}

// Slide 9: Co-Op Admin Advantage
function Slide9() {
  const interests = [
    { label: 'R&D', percent: 67, color: '#f59e0b' },
    { label: 'HR', percent: 54, color: '#8b5cf6' },
    { label: 'Tech', percent: 43, color: '#3b82f6' },
  ];

  const skills = [
    { skill: 'Communication', count: 71 },
    { skill: 'Reliability', count: 68 },
    { skill: 'Documentation', count: 54 },
  ];

  const pathways = [
    'Mental readiness & professionalism',
    'HR fundamentals in small business',
    'Innovation & R&D in food service',
  ];

  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-violet-100 rounded-full px-4 py-2 mb-4">
            <Award className="w-5 h-5 text-violet-600" />
            <span className="font-semibold text-violet-900">Co-Op Admin Advantage</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Design better programs
            <br />
            with <span className="text-violet-600">real data</span>
          </h2>
        </div>

        {/* Top Interests */}
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Top Student Interests:
          </p>
          <div className="grid grid-cols-3 gap-3">
            {interests.map((item) => (
              <div
                key={item.label}
                className="bg-white border-2 rounded-lg p-3 text-center"
                style={{ borderColor: `${item.color}40` }}
              >
                <p className="text-2xl font-bold" style={{ color: item.color }}>
                  {item.percent}%
                </p>
                <p className="text-xs text-slate-600 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-2">
            Skills to Strengthen:
          </p>
          <div className="space-y-2">
            {skills.map((item) => (
              <div key={item.skill} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                <span className="text-sm text-slate-700">{item.skill}</span>
                <Badge variant="secondary" className="font-semibold">
                  {item.count} students
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Pathways */}
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-2">
            Design Co-Op Pathways:
          </p>
          <div className="flex flex-wrap gap-2">
            {pathways.map((pathway) => (
              <Badge key={pathway} className="bg-violet-100 text-violet-700 border border-violet-200">
                {pathway}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-center">
          <p className="text-sm text-violet-800">
            Data from <strong>87 students</strong> across
            <br />
            <strong>23 placements</strong> 📊
          </p>
        </div>
      </div>
    </div>
  );
}

// Slide 10: Data Flow
function Slide10() {
  const steps = [
    { icon: Users, label: 'Student signals', sublabel: '(Skills & Interests)' },
    { icon: CheckCircle, label: 'Verified Achievements', sublabel: '' },
    { icon: Target, label: 'Employer SOP/Training', sublabel: 'Improvements' },
    { icon: Award, label: 'Co-Op Admin Program', sublabel: 'Design' },
    { icon: TrendingUp, label: 'Better Matches &', sublabel: 'Higher Success' },
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-white/30">
            <BarChart3 className="w-5 h-5" />
            <span className="font-semibold">Data Flow Across All Users</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.label}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{step.label}</p>
                      {step.sublabel && (
                        <p className="text-sm text-white/80">{step.sublabel}</p>
                      )}
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="ml-6 my-3">
                      <ArrowDown className="w-5 h-5 text-white/60" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-white">
            Everyone benefits from
            <br />
            the same deliverable data 📈
          </p>
        </div>
      </div>
    </div>
  );
}

// Slide 11: Pacific Context
function Slide11() {
  const features = [
    { text: 'CNMI • Guam • FSM • Palau • Marshall Islands' },
    { text: 'First-time workforce entry for high school students across Pacific Island communities' },
    { text: 'Small business & tourism sector focus' },
    { text: 'Mobile-first for island connectivity' },
    { text: 'Culturally relevant design with Pacific Islander themes' },
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-teal-500 to-blue-500 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
            <Globe className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-3">
            Built for Pacific Islander
            <br />
            Co-Op Programs 🌺
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="space-y-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <p className="text-white/90 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold italic">
            Designed with and for
            <br />
            Pacific Islander communities 🏝️
          </p>
        </div>
      </div>
    </div>
  );
}

// Slide 12: ZALPHA R&D - Building Complete Workforce Infrastructure
function Slide12() {
  const initiatives = [
    {
      icon: CreditCard,
      title: 'ZALPHA Debit Card',
      color: '#3b82f6',
      bullets: [
        'Financial inclusion for unbanked students',
        'Auto-loads from MicroGigs, co-op pay',
        'No fees, instant access to earnings',
      ],
    },
    {
      icon: Wifi,
      title: 'ZALPHA Connect (Starlink/BEAD)',
      color: '#06b6d4',
      bullets: [
        'Subsidized connectivity hubs at schools',
        'Offline-first app syncs when connected',
        'Closing digital divide for outer islands',
      ],
    },
    {
      icon: Home,
      title: 'ZALPHA Housing Finder',
      color: '#8b5cf6',
      bullets: [
        'Student housing near colleges & co-op sites',
        'Roommate matching, verified landlords',
        'Rent payments via ZALPHA Debit Card',
      ],
    },
    {
      icon: BookOpen,
      title: 'ZALPHA Learning Hub',
      color: '#10b981',
      bullets: [
        'Mobile-first micro-credentials & skills training',
        'Industry certificates (hospitality, construction, IT)',
        'Free for students, employer-sponsored',
      ],
    },
    {
      icon: UserPlus,
      title: 'ZALPHA Mentor Network',
      color: '#f59e0b',
      bullets: [
        'Connect with alumni and professionals',
        'Virtual and in-person mentorship',
        'Career guidance from Pacific job market experts',
      ],
    },
    {
      icon: Bus,
      title: 'ZALPHA Transportation Hub',
      color: '#ec4899',
      bullets: [
        'Carpool matching & employer shuttle coordination',
        'Discounted rides for students',
        'Solve the "last mile" to co-op sites',
      ],
    },
    {
      icon: Network,
      title: 'ZALPHA Alumni Network',
      color: '#6366f1',
      bullets: [
        'Lifelong career hub for ZALPHA users',
        'Job board, networking events, mentorship',
        'Stay connected to Pacific employers & peers',
      ],
    },
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 flex flex-col items-center justify-center p-5 text-white overflow-y-auto">
      <div className="max-w-md w-full space-y-3 py-6">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 mb-2 border border-white/30">
            <Rocket className="w-4 h-4" />
            <span className="font-semibold text-sm">Future Innovation</span>
          </div>
          <h2 className="text-xl font-bold mb-1 leading-tight">
            ZALPHA R&D: Building Complete Workforce Infrastructure
          </h2>
          <p className="text-xs text-white/90 leading-tight">
            Future innovations to support Pacific Islander students and workers
          </p>
        </div>

        {/* 7 R&D Initiatives */}
        <div className="grid grid-cols-1 gap-2.5">
          {initiatives.map((initiative) => {
            const Icon = initiative.icon;
            return (
              <Card key={initiative.title} className="border border-white/20 bg-white/95">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${initiative.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: initiative.color }} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight pt-1">
                      {initiative.title}
                    </h3>
                  </div>
                  <ul className="space-y-1 ml-10">
                    {initiative.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-[10px] text-slate-700 leading-tight flex items-start gap-1">
                        <span className="text-teal-500 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
          <p className="text-[10px] text-white/90 leading-tight text-center">
            <strong className="text-white">Complete ecosystem:</strong> From financial access and connectivity, to housing and transportation, to lifelong learning and career support—all designed for Pacific Islander students and workers.
          </p>
        </div>

        {/* In Development Badge */}
        <div className="text-center">
          <Badge className="bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 text-amber-100 text-[10px] px-3 py-1">
            🚧 Strategic R&D Initiatives - In Development
          </Badge>
        </div>
      </div>
    </div>
  );
}

// Slide 13: CTA
function Slide13() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform
            <br />
            Your Co-Op Program?
          </h2>
          <p className="text-xl text-blue-100">
            Pilot ZALPHA Co-Op at your
            <br />
            school or business
          </p>
        </div>

        <div className="space-y-3">
          <Button size="lg" className="w-full bg-white text-blue-600 hover:bg-blue-50 h-14 text-lg font-semibold">
            <Calendar className="w-5 h-5 mr-2" />
            Book a Demo
          </Button>

          <Button size="lg" className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 h-14 text-lg font-semibold">
            <Rocket className="w-5 h-5 mr-2" />
            Join Beta Program
          </Button>

          <Button size="lg" className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 h-14 text-lg font-semibold">
            <Mail className="w-5 h-5 mr-2" />
            Contact Us
          </Button>
        </div>

        <div className="space-y-2 text-blue-100">
          <p className="text-sm">hello@zalpha.work</p>
          <p className="text-sm">www.zalpha.work/coop</p>
        </div>

        <div className="pt-4">
          <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xl px-6 py-3">
            ZALPHA
          </Badge>
        </div>
      </div>
    </div>
  );
}

// Main Pitch Deck Component
export function PitchDeck() {
  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen w-full bg-white">
      <div className="snap-start">
        <Slide1 />
      </div>
      <div className="snap-start">
        <Slide2 />
      </div>
      <div className="snap-start">
        <Slide3 />
      </div>
      <div className="snap-start">
        <Slide4 />
      </div>
      <div className="snap-start">
        <Slide5 />
      </div>
      <div className="snap-start">
        <Slide6 />
      </div>
      <div className="snap-start">
        <Slide7 />
      </div>
      <div className="snap-start">
        <Slide8 />
      </div>
      <div className="snap-start">
        <Slide9 />
      </div>
      <div className="snap-start">
        <Slide10 />
      </div>
      <div className="snap-start">
        <Slide11 />
      </div>
      <div className="snap-start">
        <Slide12 />
      </div>
      <div className="snap-start">
        <Slide13 />
      </div>
    </div>
  );
}