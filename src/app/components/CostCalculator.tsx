import { useState } from 'react';
import { DollarSign, TrendingUp, Clock, Calculator } from 'lucide-react';

export function CostCalculator() {
  const [hiresPerYear, setHiresPerYear] = useState(5);
  
  // Cost constants
  const INDEED_COST_PER_HIRE = 4500;
  const ZALPHA_COST_PER_HIRE = 1250;
  const ZALPHA_MONTHLY_COST = 49.99;
  
  const INDEED_DAYS_PER_HIRE = 60;
  const ZALPHA_DAYS_PER_HIRE = 20;
  
  // Calculations
  const indeedTotalCost = hiresPerYear * INDEED_COST_PER_HIRE;
  const zalphaTotalCost = (ZALPHA_MONTHLY_COST * 12) + (hiresPerYear * ZALPHA_COST_PER_HIRE);
  const totalSavings = indeedTotalCost - zalphaTotalCost;
  
  const indeedTotalDays = hiresPerYear * INDEED_DAYS_PER_HIRE;
  const zalphaTotalDays = hiresPerYear * ZALPHA_DAYS_PER_HIRE;
  const daysSaved = indeedTotalDays - zalphaTotalDays;
  
  const roiPercentage = ((totalSavings / zalphaTotalCost) * 100).toFixed(0);

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-400/50">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
          <Calculator className="w-9 h-9 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">💰 ROI Calculator</h2>
          <p className="text-purple-300 text-lg">See your exact savings with ZALPHA</p>
        </div>
      </div>

      {/* Slider Input */}
      <div className="bg-white/10 rounded-2xl p-6 mb-8">
        <label className="block text-white font-bold text-lg mb-4">
          How many people do you hire per year?
        </label>
        <div className="flex items-center gap-6">
          <input
            type="range"
            min="1"
            max="50"
            value={hiresPerYear}
            onChange={(e) => setHiresPerYear(parseInt(e.target.value))}
            className="flex-1 h-3 bg-purple-300 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${(hiresPerYear / 50) * 100}%, rgba(255,255,255,0.2) ${(hiresPerYear / 50) * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
          <div className="w-24 text-center">
            <div className="text-4xl font-bold text-white">{hiresPerYear}</div>
            <div className="text-purple-300 text-sm">hires/year</div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Indeed Column */}
        <div className="bg-red-900/30 rounded-2xl p-6 border-2 border-red-400/50">
          <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
            <span>❌</span> Indeed (Free Tier)
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-red-200 text-sm mb-1">Annual Cost</p>
              <p className="text-4xl font-bold text-white">
                ${indeedTotalCost.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-red-200 text-sm mb-1">Total Time Spent</p>
              <p className="text-2xl font-bold text-white">
                {indeedTotalDays} days
              </p>
              <p className="text-red-300 text-xs">(~{Math.round(indeedTotalDays / 30)} months)</p>
            </div>
            <div className="pt-4 border-t border-red-400/30">
              <p className="text-red-200 text-sm">Hidden Costs:</p>
              <ul className="text-white/80 text-sm mt-2 space-y-1">
                <li>• Recruiter time @ $100/hr</li>
                <li>• Bad hire turnover</li>
                <li>• Unverified candidates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ZALPHA Column */}
        <div className="bg-green-900/30 rounded-2xl p-6 border-2 border-green-400/50">
          <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
            <span>✅</span> ZALPHA ($49.99/mo)
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-green-200 text-sm mb-1">Annual Cost</p>
              <p className="text-4xl font-bold text-white">
                ${zalphaTotalCost.toLocaleString()}
              </p>
              <p className="text-green-300 text-xs mt-1">
                (${ZALPHA_MONTHLY_COST * 12} subscription + ${(hiresPerYear * ZALPHA_COST_PER_HIRE).toLocaleString()} hiring costs)
              </p>
            </div>
            <div>
              <p className="text-green-200 text-sm mb-1">Total Time Spent</p>
              <p className="text-2xl font-bold text-white">
                {zalphaTotalDays} days
              </p>
              <p className="text-green-300 text-xs">(~{Math.round(zalphaTotalDays / 30)} months)</p>
            </div>
            <div className="pt-4 border-t border-green-400/30">
              <p className="text-green-200 text-sm">Benefits:</p>
              <ul className="text-white/80 text-sm mt-2 space-y-1">
                <li>• 🤖 AI does 70% of work</li>
                <li>• Verified candidates</li>
                <li>• Cultural fit screening</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Highlight */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl p-6 border-2 border-yellow-400/50 text-center">
          <DollarSign className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
          <p className="text-yellow-300 font-semibold mb-2">Total Savings</p>
          <p className="text-5xl font-bold text-white mb-2">
            ${totalSavings.toLocaleString()}
          </p>
          <p className="text-yellow-200 text-sm">per year</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border-2 border-blue-400/50 text-center">
          <Clock className="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <p className="text-blue-300 font-semibold mb-2">Time Saved</p>
          <p className="text-5xl font-bold text-white mb-2">
            {daysSaved}
          </p>
          <p className="text-blue-200 text-sm">days per year</p>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border-2 border-green-400/50 text-center">
          <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <p className="text-green-300 font-semibold mb-2">ROI</p>
          <p className="text-5xl font-bold text-white mb-2">
            {roiPercentage}%
          </p>
          <p className="text-green-200 text-sm">return on investment</p>
        </div>
      </div>

      <div className="mt-8 bg-white/10 rounded-xl p-6 text-center">
        <p className="text-2xl font-bold text-white mb-2">
          ⚡ You save ${(totalSavings / hiresPerYear).toLocaleString()} per hire
        </p>
        <p className="text-lg text-purple-200">
          That's enough to pay for ZALPHA for {Math.round(totalSavings / (ZALPHA_MONTHLY_COST * 12))} years!
        </p>
      </div>
    </div>
  );
}
