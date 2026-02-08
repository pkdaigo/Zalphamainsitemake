import { Briefcase, Download, ArrowLeft, Lock } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';

interface InternalOperationalDocsProps {
  onNavigate: (page: string) => void;
}

export function InternalOperationalDocs({ onNavigate }: InternalOperationalDocsProps) {
  const documents = [
    { name: 'Platform User Manual', file: 'User_Manual.pdf', size: '5.7 MB', date: 'Jan 25, 2026' },
    { name: 'Admin Dashboard Guide', file: 'Admin_Guide.pdf', size: '4.3 MB', date: 'Jan 22, 2026' },
    { name: 'Customer Support Protocols', file: 'Support_Protocols.pdf', size: '2.8 MB', date: 'Jan 18, 2026' },
    { name: 'Onboarding Process Documentation', file: 'Onboarding_Docs.pdf', size: '3.5 MB', date: 'Jan 15, 2026' },
    { name: 'Quality Assurance Guidelines', file: 'QA_Guidelines.pdf', size: '2.1 MB', date: 'Jan 10, 2026' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BackButton
                onClick={() => onNavigate('internal-dashboard')}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </BackButton>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Operational Documents</h1>
                <p className="text-xs text-green-300">✓ {documents.length} Documents Available</p>
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
            <h2 className="text-4xl font-bold text-white mb-2">Operational Documentation</h2>
            <p className="text-white/70 text-lg">
              User manuals, admin guides, support protocols, and operational procedures
            </p>
          </div>

          {/* Documents Grid */}
          <div className="grid gap-4">
            {documents.map((doc, index) => (
              <button
                key={index}
                onClick={() => alert(`Opening ${doc.name}...`)}
                className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-green-400/30 hover:border-green-400/60 hover:bg-white/15 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{doc.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>Updated: {doc.date}</span>
                        <span>•</span>
                        <span className="text-green-400 font-semibold">PDF</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg">
                      <Download className="w-5 h-5 text-green-400" />
                      <span className="text-green-300 font-semibold">Download</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('internal-dashboard')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white rounded-xl font-bold transition-all inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}