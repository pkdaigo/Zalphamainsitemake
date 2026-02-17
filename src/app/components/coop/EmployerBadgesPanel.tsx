import { Award, Coins, Star, ShoppingCart, CheckCircle } from 'lucide-react';

type EmployerBadge = {
  id: string;
  name: string;
  description: string;
  creditCost: number;
  isActive: boolean;
};

type EmployerBadgesPanelProps = {
  badges: EmployerBadge[];
  availableCredits: number;
  onPurchaseBadge: (id: string) => void;
};

export function EmployerBadgesPanel(props: EmployerBadgesPanelProps) {
  return (
    <div className="w-full rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-900 via-slate-950 to-orange-900 p-6 shadow-xl text-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">Badges & Rewards</h2>
            <p className="text-sm text-amber-100 mt-1">
              Purchase digital badges students can earn and redeem at your business or partners.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl px-5 py-3 shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <Coins className="w-5 h-5 text-white" />
              <p className="text-xs text-amber-100 font-semibold">Available Credits</p>
            </div>
            <p className="text-3xl font-black text-white">{props.availableCredits}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {props.badges.map((badge) => {
          const canAfford = props.availableCredits >= badge.creditCost;
          
          return (
            <div
              key={badge.id}
              className={`flex items-start gap-4 rounded-2xl p-5 backdrop-blur-sm border-2 transition-all ${
                badge.isActive 
                  ? 'bg-emerald-900/40 border-emerald-400/60'
                  : 'bg-slate-900/80 border-amber-500/30 hover:border-amber-400/50'
              }`}
            >
              {/* Badge Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                badge.isActive
                  ? 'bg-gradient-to-br from-emerald-500 to-green-500'
                  : 'bg-gradient-to-br from-amber-500 to-orange-500'
              }`}>
                {badge.isActive ? (
                  <CheckCircle className="w-8 h-8 text-white" />
                ) : (
                  <Star className="w-8 h-8 text-white" />
                )}
              </div>

              {/* Badge Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-lg font-bold text-slate-50">{badge.name}</p>
                      {badge.isActive && (
                        <span className="px-3 py-1 bg-emerald-500/30 border border-emerald-400/40 rounded-full text-xs font-bold text-emerald-100">
                          ✓ Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{badge.description}</p>
                  </div>
                </div>

                {/* Cost & Purchase */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-amber-200">
                      <Coins className="w-5 h-5" />
                      <span className="text-lg font-bold">{badge.creditCost}</span>
                      <span className="text-sm">credits per badge</span>
                    </div>
                  </div>

                  {badge.isActive ? (
                    <button
                      type="button"
                      className="px-6 py-3 bg-slate-700 text-slate-400 rounded-xl font-bold cursor-not-allowed flex items-center gap-2"
                      disabled
                    >
                      <CheckCircle className="w-5 h-5" />
                      Already Active
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => props.onPurchaseBadge(badge.id)}
                      disabled={!canAfford}
                      className={`px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2 ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 hover:shadow-lg hover:scale-105'
                          : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {canAfford ? 'Purchase Badge Set' : 'Not Enough Credits'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {props.badges.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg font-semibold mb-2">No badges available yet</p>
          <p className="text-slate-500 text-sm">
            Check back soon for gamification rewards you can offer to students
          </p>
        </div>
      )}

      {/* Info Footer */}
      <div className="mt-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-4 border border-amber-400/30">
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-100">
            <p className="font-bold mb-1">How Badges Work:</p>
            <p className="text-xs leading-relaxed">
              Students earn badges by completing deliverables and reaching milestones. 
              They can redeem badges for perks at your business (discounts, free items, etc.) 
              or partner businesses. You set the redemption value!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
