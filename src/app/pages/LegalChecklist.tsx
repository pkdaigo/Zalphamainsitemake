import { Shield, CheckCircle, XCircle, Clock, DollarSign, FileText, AlertTriangle, Target, Calendar, Award } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { useState } from 'react';

interface LegalChecklistProps {
  onNavigate: (page: string) => void;
}

export function LegalChecklist({ onNavigate }: LegalChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getCompletionRate = () => {
    const total = Object.keys(checklistData).reduce((sum, category) => 
      sum + checklistData[category as keyof typeof checklistData].length, 0
    );
    const completed = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const checklistData = {
    critical: [
      { id: 'trademark-search', title: '✅ Search USPTO for "ZALPHA" trademark conflicts (COMPLETED!)', cost: 'FREE', time: '15 min', link: 'https://www.uspto.gov/trademarks/search' },
      { id: 'dba-filing', title: 'File DBA for "ZALPHA" with CNMI Commerce', cost: '$50-$150', time: '1-3 days', link: null },
      { id: 'dba-certificate', title: 'Receive DBA certificate and order certified copies', cost: '$10-$25 per copy', time: '1-2 weeks', link: null },
      { id: 'bank-update', title: 'Update bank account to "KI Manpower Services DBA ZALPHA"', cost: 'FREE', time: '1 week', link: null },
      { id: 'trademark-file', title: 'File trademark application for "ZALPHA" (after DBA approved)', cost: '$700-$2,500', time: '1 hour (8-12 months approval)', link: 'https://www.uspto.gov/trademarks/apply' },
      { id: 'copyright-notices', title: 'Add copyright notices to all code files', cost: 'FREE', time: '30 min', link: null },
      { id: 'terms-review', title: 'Have lawyer review Terms of Service', cost: '$1,000-$2,000', time: '1-2 weeks', link: null },
      { id: 'privacy-review', title: 'Have lawyer review Privacy Policy', cost: '$1,000-$2,000', time: '1-2 weeks', link: null },
      { id: 'ip-agreements', title: 'All team members sign IP assignment agreements', cost: 'FREE', time: '1 day', link: null },
    ],
    important: [
      { id: 'guam-registration', title: 'Register business in Guam', cost: '$200', time: '2-3 weeks', link: null },
      { id: 'business-licenses', title: 'Get business licenses/permits (CNMI)', cost: '$100-$500', time: '2-4 weeks', link: null },
      { id: 'zee-trademark', title: 'File for "Zee" trademark (chatbot name)', cost: '$350-$1,500', time: '1 hour', link: null },
      { id: 'copyright-register', title: 'Copyright register platform code', cost: '$65', time: '1 hour (6-8 months certificate)', link: 'https://www.copyright.gov' },
      { id: 'employer-agreements', title: 'Create employer subscription agreements', cost: '$500-$1,000', time: '1-2 weeks', link: null },
      { id: 'school-agreements', title: 'Create school partnership agreements', cost: '$500-$1,000', time: '1-2 weeks', link: null },
      { id: 'business-insurance', title: 'Get business insurance (E&O, cyber liability)', cost: '$1,000-$3,000/yr', time: '1-2 weeks', link: null },
    ],
    niceToHave: [
      { id: 'fsm-trademark', title: 'International trademark protection (FSM)', cost: '$1,000-$3,000', time: '3-6 months', link: null },
      { id: 'additional-domains', title: 'Register additional domain names (.co, .io)', cost: '$50-$100', time: '30 min', link: null },
      { id: 'logo-trademark', title: 'Trademark your logo/design mark', cost: '$350-$1,500', time: '1 hour', link: null },
      { id: 'trade-secret-policies', title: 'Create trade secret protection policies', cost: '$500-$1,000', time: '1 week', link: null },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 py-12 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="legal-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#legal-grid)"/>
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl mb-6 border-4 border-purple-300">
            <Shield className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Legal Protection Checklist</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg px-4">
            Pre-Launch Legal Tasks
          </h1>
          <p className="text-xl text-white/95 max-w-3xl mx-auto drop-shadow-md mb-6">
            Complete these steps to protect your ZALPHA intellectual property before launch
          </p>
          <div className="inline-block bg-white/95 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border-4 border-green-300">
            <div className="text-sm text-gray-600 font-semibold mb-1">Business Structure</div>
            <div className="text-lg font-bold text-gray-900">KI Manpower Services <span className="text-indigo-600">DBA</span> ZALPHA</div>
            <div className="text-sm text-gray-600 mt-1">✅ Trademark Search Complete • ✅ "ZALPHA" Available</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border-4 border-purple-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Overall Progress</h2>
            <div className="text-4xl font-bold text-purple-600">{getCompletionRate()}%</div>
          </div>
          <div className="relative">
            <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-500"
                style={{ width: `${getCompletionRate()}%` }}
              ></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700">
                {Object.values(checkedItems).filter(Boolean).length} / {Object.keys(checklistData).reduce((sum, category) => 
                  sum + checklistData[category as keyof typeof checklistData].length, 0
                )} tasks completed
              </span>
            </div>
          </div>
        </div>

        {/* Cost Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-4 border-green-300">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Minimum Budget</h3>
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">$750</div>
            <p className="text-gray-700 text-sm">DBA + DIY trademark (saving $150!)</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-4 border-cyan-300">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-8 h-8 text-cyan-600" />
              <h3 className="text-xl font-bold text-gray-900">Recommended</h3>
            </div>
            <div className="text-4xl font-bold text-cyan-600 mb-2">$4,650</div>
            <p className="text-gray-700 text-sm">DBA + attorney trademark & reviews</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-4 border-purple-300">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">VC-Ready</h3>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">$11,850</div>
            <p className="text-gray-700 text-sm">Full protection + international</p>
          </div>
        </div>

        {/* CRITICAL TASKS */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border-4 border-red-300">
          <div className="flex items-center gap-4 mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">🔴 CRITICAL (Before Public Launch)</h2>
              <p className="text-gray-600">Must complete before announcing or launching ZALPHA</p>
            </div>
          </div>

          <div className="space-y-4">
            {checklistData.critical.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                  checkedItems[item.id]
                    ? 'bg-green-50 border-green-400'
                    : 'bg-white border-red-300 hover:border-red-400'
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {checkedItems[item.id] ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-2 ${
                      checkedItems[item.id] ? 'text-green-900 line-through' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{item.cost}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        → Start Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* DBA Strategy Info Box */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Why DBA Instead of New LLC?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✅ <strong>Faster:</strong> 1-3 days vs 1-2 weeks for new LLC</li>
                  <li>✅ <strong>Cheaper:</strong> $50-$150 vs $200-$500 for LLC formation</li>
                  <li>✅ <strong>Same Protection:</strong> Trademark is just as strong with DBA</li>
                  <li>✅ <strong>Keep Everything:</strong> Use existing EIN, bank account, business history</li>
                  <li>✅ <strong>Perfect Fit:</strong> "Manpower Services" aligns with employment/staffing industry</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-sm text-gray-600"><strong>Next Step:</strong> Call CNMI Commerce at <span className="font-mono text-indigo-600">(670) 664-3000</span> to file DBA for "ZALPHA"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IMPORTANT TASKS */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border-4 border-orange-300">
          <div className="flex items-center gap-4 mb-6">
            <Calendar className="w-10 h-10 text-orange-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">🟠 IMPORTANT (Before Beta Launch)</h2>
              <p className="text-gray-600">Complete before onboarding first users</p>
            </div>
          </div>

          <div className="space-y-4">
            {checklistData.important.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                  checkedItems[item.id]
                    ? 'bg-green-50 border-green-400'
                    : 'bg-white border-orange-300 hover:border-orange-400'
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {checkedItems[item.id] ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Clock className="w-6 h-6 text-orange-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-2 ${
                      checkedItems[item.id] ? 'text-green-900 line-through' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{item.cost}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        → Start Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NICE TO HAVE */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border-4 border-blue-300">
          <div className="flex items-center gap-4 mb-6">
            <Target className="w-10 h-10 text-blue-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">🟢 NICE TO HAVE (Post-Launch)</h2>
              <p className="text-gray-600">Additional protection for growth phase</p>
            </div>
          </div>

          <div className="space-y-4">
            {checklistData.niceToHave.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                  checkedItems[item.id]
                    ? 'bg-green-50 border-green-400'
                    : 'bg-white border-blue-300 hover:border-blue-400'
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {checkedItems[item.id] ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Clock className="w-6 h-6 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-2 ${
                      checkedItems[item.id] ? 'text-green-900 line-through' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{item.cost}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        → Start Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border-4 border-green-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-8 h-8 text-green-600" />
            Helpful Resources
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📄 Legal Templates</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <a href="/IP_ASSIGNMENT_AGREEMENT_TEMPLATE.md" target="_blank" className="text-blue-600 hover:underline">IP Assignment Agreement</a></li>
                <li>• <a href="/COPYRIGHT_NOTICES.md" target="_blank" className="text-blue-600 hover:underline">Copyright Notices Guide</a></li>
                <li>• <a href="/LEGAL_PROTECTION_GUIDE.md" target="_blank" className="text-blue-600 hover:underline">Full Legal Protection Guide</a></li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🔗 Government Links</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <a href="https://www.uspto.gov/trademarks/search" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">USPTO Trademark Search</a></li>
                <li>• <a href="https://www.uspto.gov/trademarks/apply" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">USPTO Trademark Filing</a></li>
                <li>• <a href="https://www.copyright.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">US Copyright Office</a></li>
                <li>• <a href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IRS EIN Application</a></li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍⚖️ CNMI Attorneys</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• O'Connor Berman Dotts & Banes<br/><span className="text-sm">☎️ (670) 322-7171</span></li>
                <li>• White Pierce Mailman & Nutting<br/><span className="text-sm">☎️ (670) 234-5678</span></li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💻 Online Services</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <a href="https://www.legalzoom.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LegalZoom</a> - DIY business formation</li>
                <li>• <a href="https://www.rocketlawyer.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Rocket Lawyer</a> - Legal templates</li>
                <li>• <a href="https://stripe.com/atlas" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Stripe Atlas</a> - Startup incorporation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-2xl p-12 text-center border-4 border-white/50">
          <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
            🛡️ Protect Your Platform!
          </h2>
          <p className="text-xl text-white/95 mb-8">
            Complete these legal steps to secure your intellectual property before launch
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BackButton
              onClick={() => onNavigate('demo-showcase')}
              className="bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              ← Back to Demo
            </BackButton>
            <a
              href="https://www.uspto.gov/trademarks/search"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all border-4 border-white/50"
            >
              Start Trademark Search →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}