import { useState } from 'react';
import { TrendingUp, DollarSign, Clock, Users, Target, Award, Zap, BarChart3, CheckCircle, Star, Calendar, Download } from 'lucide-react';

interface HiringMetrics {
  totalHires: number;
  activeJobs: number;
  totalApplicants: number;
  avgTimeToHire: number; // days
  avgCostPerHire: number;
  acceptanceRate: number;
  retentionRate30Days: number;
  retentionRate90Days: number;
  qualityOfHireScore: number;
}

interface TimeMetrics {
  timeSavedScreening: number; // hours
  timeSavedScheduling: number; // hours
  timeSavedMessaging: number; // hours
  automatedActions: number;
  aiInterviewsCompleted: number;
}

interface CostMetrics {
  totalSpent: number;
  costSavings: number;
  traditionalCost: number;
  zalphaCost: number;
  roiPercentage: number;
}

interface EmployerROIDashboardProps {
  employerName: string;
  subscriptionTier: 'starter' | 'professional' | 'ultra_premium';
}

export function EmployerROIDashboard({ employerName, subscriptionTier }: EmployerROIDashboardProps) {
  // Mock data - In production, this comes from real analytics
  const hiringMetrics: HiringMetrics = {
    totalHires: 24,
    activeJobs: 8,
    totalApplicants: 342,
    avgTimeToHire: 12, // 12 days (industry avg is 36 days)
    avgCostPerHire: 450, // ZALPHA cost (industry avg is $4,700)
    acceptanceRate: 89, // %
    retentionRate30Days: 96, // %
    retentionRate90Days: 87, // %
    qualityOfHireScore: 8.4, // out of 10
  };

  const timeMetrics: TimeMetrics = {
    timeSavedScreening: 168, // hours (1 week of work)
    timeSavedScheduling: 48, // hours
    timeSavedMessaging: 32, // hours
    automatedActions: 1247,
    aiInterviewsCompleted: 156,
  };

  const costMetrics: CostMetrics = {
    totalSpent: 10800, // Total spent on ZALPHA (24 hires × $450)
    costSavings: 102000, // Savings vs traditional ($4,700 - $450) × 24
    traditionalCost: 112800, // What they would have spent (24 × $4,700)
    zalphaCost: 10800, // What they actually spent
    roiPercentage: 944, // (costSavings / zalphaCost) × 100
  };

  const totalTimeSaved = timeMetrics.timeSavedScreening + timeMetrics.timeSavedScheduling + timeMetrics.timeSavedMessaging;
  const totalTimeSavedWeeks = Math.round(totalTimeSaved / 40); // 40-hour work week

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-green-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-green-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ROI & Performance Dashboard
            </h2>
            <p className="text-gray-600 font-medium">{employerName}</p>
          </div>
        </div>
        <div>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold flex items-center gap-2 shadow-lg">
            <Download className="w-5 h-5" />
            Export ROI Report
          </button>
        </div>
      </div>

      {/* ROI Highlight Banner */}
      <div className="mb-8 p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl text-white">
        <div className="flex items-center gap-3 mb-4">
          <Star className="w-10 h-10" />
          <div>
            <h3 className="text-2xl font-bold">Your ZALPHA ROI</h3>
            <p className="text-green-100 text-sm">Compared to traditional hiring methods</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-6xl font-bold mb-2">{costMetrics.roiPercentage}%</p>
            <p className="text-green-100">Return on Investment</p>
          </div>
          <div>
            <p className="text-6xl font-bold mb-2">${(costMetrics.costSavings / 1000).toFixed(0)}K</p>
            <p className="text-green-100">Total Cost Savings</p>
          </div>
          <div>
            <p className="text-6xl font-bold mb-2">{totalTimeSavedWeeks}</p>
            <p className="text-green-100">Weeks of Time Saved</p>
          </div>
          <div>
            <p className="text-6xl font-bold mb-2">{hiringMetrics.qualityOfHireScore}</p>
            <p className="text-green-100">Quality of Hire Score</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white/20 backdrop-blur rounded-lg">
          <p className="text-sm text-white">
            🎉 <strong>Congratulations!</strong> You've saved <strong>${(costMetrics.costSavings / 1000).toFixed(0)}K</strong> and <strong>{totalTimeSavedWeeks} weeks</strong> of work 
            by using ZALPHA instead of traditional hiring. That's like getting {Math.round(totalTimeSaved / 8)} extra workdays back!
          </p>
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" />
          Cost Per Hire Comparison
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
            <p className="text-sm text-red-700 font-semibold mb-2">Traditional Hiring Cost</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-red-900">${(hiringMetrics.avgCostPerHire * 10.44).toFixed(0)}</span>
              <span className="text-gray-600">per hire</span>
            </div>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• Job board postings: $400-$800</li>
              <li>• External recruiting: $1,000-$2,000</li>
              <li>• Background checks: $50-$100</li>
              <li>• Internal HR time: $800-$1,200</li>
              <li>• Onboarding costs: $500-$800</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-red-300">
              <p className="text-sm font-bold text-red-900">
                Total for {hiringMetrics.totalHires} hires: ${costMetrics.traditionalCost.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm text-green-700 font-semibold">ZALPHA Platform Cost</p>
              <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full">90% SAVINGS</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-green-900">${hiringMetrics.avgCostPerHire}</span>
              <span className="text-gray-600">per hire</span>
            </div>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Unlimited job postings included
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                AI screening & matching included
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Verified student profiles included
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Built-in messaging & ATS included
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Compliance & documentation included
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-green-300">
              <p className="text-sm font-bold text-green-900">
                Total for {hiringMetrics.totalHires} hires: ${costMetrics.zalphaCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Savings Breakdown */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" />
          Time Savings Breakdown
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl">
            <Zap className="w-8 h-8 text-blue-600 mb-3" />
            <p className="text-4xl font-bold text-blue-900 mb-1">{timeMetrics.timeSavedScreening}h</p>
            <p className="text-sm text-blue-700 font-medium">AI Auto-Screening</p>
            <p className="text-xs text-blue-600 mt-2">
              AI screened {hiringMetrics.totalApplicants} applicants instantly
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl">
            <Calendar className="w-8 h-8 text-purple-600 mb-3" />
            <p className="text-4xl font-bold text-purple-900 mb-1">{timeMetrics.timeSavedScheduling}h</p>
            <p className="text-sm text-purple-700 font-medium">Auto-Scheduling</p>
            <p className="text-xs text-purple-600 mt-2">
              {timeMetrics.aiInterviewsCompleted} AI interviews scheduled automatically
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
            <Users className="w-8 h-8 text-green-600 mb-3" />
            <p className="text-4xl font-bold text-green-900 mb-1">{timeMetrics.timeSavedMessaging}h</p>
            <p className="text-sm text-green-700 font-medium">Bulk Messaging</p>
            <p className="text-xs text-green-600 mt-2">
              Automated messages to multiple candidates
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl">
            <Target className="w-8 h-8 text-orange-600 mb-3" />
            <p className="text-4xl font-bold text-orange-900 mb-1">{timeMetrics.automatedActions}</p>
            <p className="text-sm text-orange-700 font-medium">AI Actions Taken</p>
            <p className="text-xs text-orange-600 mt-2">
              Automated tasks completed by AI
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            💡 <strong>Time Savings Analysis:</strong> Traditional hiring requires ~10 hours per hire for screening, scheduling, 
            and communications. ZALPHA's AI reduces this to ~1.5 hours per hire - that's <strong>85% time savings</strong>. 
            With {hiringMetrics.totalHires} hires, you've saved approximately <strong>{totalTimeSavedWeeks} weeks</strong> of full-time work!
          </p>
        </div>
      </div>

      {/* Hiring Performance Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-purple-600" />
          Hiring Performance Metrics
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-white border-2 border-gray-200 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600 font-medium">Time to Hire</p>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">67% FASTER</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold text-gray-900">{hiringMetrics.avgTimeToHire}</span>
              <span className="text-gray-600">days</span>
            </div>
            <p className="text-xs text-gray-500">Industry avg: 36 days</p>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${(12/36)*100}%` }}></div>
            </div>
          </div>

          <div className="p-6 bg-white border-2 border-gray-200 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600 font-medium">Offer Acceptance Rate</p>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">EXCELLENT</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold text-gray-900">{hiringMetrics.acceptanceRate}%</span>
            </div>
            <p className="text-xs text-gray-500">Industry avg: 75%</p>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${hiringMetrics.acceptanceRate}%` }}></div>
            </div>
          </div>

          <div className="p-6 bg-white border-2 border-gray-200 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600 font-medium">30-Day Retention</p>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">OUTSTANDING</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold text-gray-900">{hiringMetrics.retentionRate30Days}%</span>
            </div>
            <p className="text-xs text-gray-500">Industry avg: 82%</p>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${hiringMetrics.retentionRate30Days}%` }}></div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium mb-1">90-Day Retention Rate</p>
                <p className="text-3xl font-bold text-purple-900">{hiringMetrics.retentionRate90Days}%</p>
              </div>
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-purple-700" />
              </div>
            </div>
            <p className="text-xs text-purple-600 mt-2">Above industry avg of 75%</p>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium mb-1">Quality of Hire Score</p>
                <p className="text-3xl font-bold text-yellow-900">{hiringMetrics.qualityOfHireScore}/10</p>
              </div>
              <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-yellow-700" />
              </div>
            </div>
            <p className="text-xs text-yellow-600 mt-2">Based on manager feedback & performance</p>
          </div>
        </div>
      </div>

      {/* Platform Analytics */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          Platform Usage Analytics
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
            <p className="text-3xl font-bold text-indigo-900 mb-1">{hiringMetrics.totalHires}</p>
            <p className="text-sm text-indigo-700">Total Hires Made</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <p className="text-3xl font-bold text-blue-900 mb-1">{hiringMetrics.activeJobs}</p>
            <p className="text-sm text-blue-700">Active Job Postings</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <p className="text-3xl font-bold text-green-900 mb-1">{hiringMetrics.totalApplicants}</p>
            <p className="text-sm text-green-700">Total Applicants</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <p className="text-3xl font-bold text-purple-900 mb-1">{Math.round(hiringMetrics.totalApplicants / hiringMetrics.totalHires)}</p>
            <p className="text-sm text-purple-700">Applicants per Hire</p>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl">
        <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          Key Takeaways & ROI Summary
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-bold text-green-900 mb-2">💰 Financial Impact:</p>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Saved <strong>${(costMetrics.costSavings / 1000).toFixed(0)}K</strong> compared to traditional hiring</li>
              <li>• <strong>{costMetrics.roiPercentage}% ROI</strong> on your ZALPHA investment</li>
              <li>• Cost per hire reduced from <strong>${(hiringMetrics.avgCostPerHire * 10.44).toFixed(0)}</strong> to <strong>${hiringMetrics.avgCostPerHire}</strong></li>
              <li>• <strong>90% cost reduction</strong> vs industry average</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-green-900 mb-2">⏰ Time Impact:</p>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Saved <strong>{totalTimeSavedWeeks} weeks</strong> of full-time work</li>
              <li>• <strong>67% faster</strong> time-to-hire (12 days vs 36 days)</li>
              <li>• AI completed <strong>{timeMetrics.automatedActions}</strong> automated actions</li>
              <li>• <strong>85% reduction</strong> in manual screening time</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
          <p className="text-sm text-green-900">
            <strong>🎯 Bottom Line:</strong> By using ZALPHA, you've achieved <strong>hiring efficiency</strong> that would 
            be impossible with traditional methods. Your investment of <strong>${(costMetrics.zalphaCost / 1000).toFixed(0)}K</strong> has 
            returned <strong>${(costMetrics.costSavings / 1000).toFixed(0)}K in savings</strong> plus <strong>{totalTimeSavedWeeks} weeks</strong> of 
            time - allowing your team to focus on what matters: growing your business and supporting your new hires.
          </p>
        </div>
      </div>
    </div>
  );
}
