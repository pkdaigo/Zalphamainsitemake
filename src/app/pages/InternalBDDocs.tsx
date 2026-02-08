import { TrendingUp, Download, ArrowLeft, Lock } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface InternalBDDocsProps {
  onNavigate: (page: string) => void;
}

export function InternalBDDocs({ onNavigate }: InternalBDDocsProps) {
  const documents = [
    { name: 'ZALPHA Investor Pitch Deck', file: 'Investor_Deck_Q1_2026.pdf', size: '15.3 MB', date: 'Jan 20, 2026' },
    { name: 'Partnership Proposal Template', file: 'Partnership_Template.pdf', size: '4.5 MB', date: 'Jan 18, 2026' },
    { name: 'University Partnership Deck', file: 'University_Deck.pdf', size: '12.8 MB', date: 'Jan 15, 2026' },
    { name: 'Employer Sales Deck', file: 'Employer_Sales.pdf', size: '8.9 MB', date: 'Jan 12, 2026' },
    { name: 'Market Analysis - Pacific Islands', file: 'Market_Analysis.pdf', size: '6.4 MB', date: 'Jan 8, 2026' },
    { name: 'Revenue Model Overview', file: 'Revenue_Model.pdf', size: '3.2 MB', date: 'Dec 28, 2025' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('internal-dashboard')}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Business Development</h1>
                <p className="text-xs text-purple-300">✓ {documents.length} Documents Available</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-xl">
                <Lock className="w-4 h-4 text-green-300" />
                <span className="text-green-300 text-sm font-semibold">Authenticated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">Business Development Materials</h2>
            <p className="text-white/70 text-lg">
              Investor decks, partnership proposals, sales materials, and market analysis
            </p>
          </div>

          {/* Documents Grid */}
          <div className="grid gap-4">
            {documents.map((doc, index) => (
              <button
                key={index}
                onClick={() => alert(`Opening ${doc.name}...`)}
                className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-400/30 hover:border-purple-400/60 hover:bg-white/15 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{doc.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>Updated: {doc.date}</span>
                        <span>•</span>
                        <span className="text-purple-400 font-semibold">PDF</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-lg">
                      <Download className="w-5 h-5 text-purple-400" />
                      <span className="text-purple-300 font-semibold">Download</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <BackButton
              onClick={() => onNavigate('internal-dashboard')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white rounded-xl font-bold transition-all inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </BackButton>
          </div>
        </div>
      </div>
    </div>
  );
}