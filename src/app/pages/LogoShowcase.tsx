import { BackButton } from '@/app/components/BackButton';
import { ZalphaBrainLogo } from '@/app/components/ZalphaBrainLogo';
import { Download, Monitor, Palette, QrCode } from 'lucide-react';

interface LogoShowcaseProps {
  onNavigate: (page: string) => void;
}

export function LogoShowcase({ onNavigate }: LogoShowcaseProps) {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <BackButton onNavigate={onNavigate} label="Back to Home" />
        
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            ZALPHA Custom Logo Showcase
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            100% Original, Trademark-Ready Logo Design • No Stock Elements • Full Ownership
          </p>
        </div>

        {/* Main Logo Display */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8">
          <div className="flex justify-center mb-8">
            <ZalphaBrainLogo className="w-full max-w-2xl h-auto" />
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Primary Logo</h2>
            <p className="text-gray-600">Brain design with QR code • Pacific wave elements • Ocean Professional colors</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Dark Background */}
          <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-white text-2xl font-bold mb-6 text-center">On Dark Background</h3>
            <div className="flex justify-center">
              <ZalphaBrainLogo className="w-full max-w-md h-auto" />
            </div>
          </div>

          {/* Light Background */}
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 shadow-2xl border-2 border-purple-200">
            <h3 className="text-gray-900 text-2xl font-bold mb-6 text-center">On Light Background</h3>
            <div className="flex justify-center">
              <ZalphaBrainLogo className="w-full max-w-md h-auto" />
            </div>
          </div>
        </div>

        {/* Logo Features */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Custom Logo Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-200">
              <Monitor className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Computer Screen</h3>
              <p className="text-sm text-gray-600">Professional monitor design with stand, representing digital platform</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
              <QrCode className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">QR Code Element</h3>
              <p className="text-sm text-gray-600">Decorative QR pattern inside screen, symbolizing easy access</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
              <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
                <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3" stroke="#3b82f6" strokeWidth="2"/>
              </svg>
              <h3 className="font-bold text-gray-900 mb-2">Pacific Waves</h3>
              <p className="text-sm text-gray-600">Gradient ocean waves below screen, representing Pacific Islands</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200">
              <Palette className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Brand Colors</h3>
              <p className="text-sm text-gray-600">Ocean Professional palette: Cyan, Blue, Purple, Orange gradients</p>
            </div>
          </div>
        </div>

        {/* Size Variations */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Logo Sizes & Variations</h2>
          
          <div className="space-y-8">
            {/* Large */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 bg-gray-50">
              <p className="text-sm font-bold text-gray-600 mb-4">LARGE (Hero/Header)</p>
              <div className="flex justify-center">
                <ZalphaBrainLogo className="w-full max-w-2xl h-auto" />
              </div>
            </div>

            {/* Medium */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 bg-gray-50">
              <p className="text-sm font-bold text-gray-600 mb-4">MEDIUM (Navigation/Cards)</p>
              <div className="flex justify-center">
                <ZalphaBrainLogo className="w-96 h-auto" />
              </div>
            </div>

            {/* Small */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 bg-gray-50">
              <p className="text-sm font-bold text-gray-600 mb-4">SMALL (Mobile/Compact)</p>
              <div className="flex justify-center">
                <ZalphaBrainLogo className="w-64 h-auto" />
              </div>
            </div>

            {/* Extra Small */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 bg-gray-50">
              <p className="text-sm font-bold text-gray-600 mb-4">EXTRA SMALL (Favicon/Icon)</p>
              <div className="flex justify-center">
                <ZalphaBrainLogo className="w-32 h-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Ownership */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-8 text-white mb-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-black mb-4">100% Custom Design - Full Ownership</h2>
            <div className="text-lg space-y-3">
              <p>✓ <strong>NO Canva elements</strong> - Created from scratch with custom SVG code</p>
              <p>✓ <strong>NO stock graphics</strong> - Completely original artwork</p>
              <p>✓ <strong>Trademark-ready</strong> - Unique design you can register</p>
              <p>✓ <strong>Scalable vector</strong> - Perfect quality at any size</p>
              <p>✓ <strong>Customizable</strong> - Easy to modify colors, elements, or layout</p>
              <p>✓ <strong>Professional branding</strong> - Communicates tech, accessibility, Pacific culture</p>
            </div>
          </div>
        </div>

        {/* Logo Symbolism */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Logo Symbolism & Meaning</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-3">💻 Computer Screen</h3>
              <p className="text-gray-700 leading-relaxed">
                Represents the digital platform that connects students and employers. The modern monitor design conveys professionalism and technology.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-3">📱 QR Code Pattern</h3>
              <p className="text-gray-700 leading-relaxed">
                Symbolizes easy access, quick connection, and modern tech. Also represents the seamless bridge between opportunities and talent.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl border-2 border-cyan-200">
              <h3 className="text-xl font-bold text-cyan-900 mb-3">🌊 Pacific Waves</h3>
              <p className="text-gray-700 leading-relaxed">
                Gradient ocean waves honor Pacific Island culture and geography. The flowing design represents movement, growth, and opportunity.
              </p>
            </div>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200">
            <h3 className="text-xl font-bold text-orange-900 mb-3">🎨 Ocean Professional Color Palette</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The gradient from cyan through blue, purple, to orange represents:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-cyan-500"></div>
                <span className="text-gray-700"><strong>Cyan:</strong> Pacific Ocean, clarity, innovation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-500"></div>
                <span className="text-gray-700"><strong>Blue:</strong> Trust, professionalism, stability</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-purple-500"></div>
                <span className="text-gray-700"><strong>Purple:</strong> Creativity, ambition, growth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-orange-500"></div>
                <span className="text-gray-700"><strong>Orange:</strong> Energy, opportunity, sunset</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="mt-8 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 rounded-3xl shadow-2xl p-8 text-white">
          <h2 className="text-3xl font-black mb-6 text-center">Technical Specifications</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">File Format</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Format:</strong> Inline SVG (Scalable Vector Graphics)</li>
                <li>• <strong>Quality:</strong> Infinite scalability, no quality loss</li>
                <li>• <strong>File Size:</strong> Lightweight, fast loading</li>
                <li>• <strong>Browser Support:</strong> All modern browsers</li>
                <li>• <strong>Responsive:</strong> Adapts to any screen size</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">Customization Options</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Colors:</strong> Easy gradient modifications</li>
                <li>• <strong>QR Code:</strong> Can be toggled on/off</li>
                <li>• <strong>Size:</strong> Responsive className prop</li>
                <li>• <strong>Animation:</strong> Pulsing power light included</li>
                <li>• <strong>Elements:</strong> All SVG paths editable</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">Usage in Code</h3>
            <pre className="bg-black/50 rounded-lg p-4 text-sm overflow-x-auto">
              <code className="text-cyan-300">{`import { ZalphaBrainLogo } from '@/app/components/ZalphaBrainLogo';

// Default usage
<ZalphaBrainLogo />

// Custom size
<ZalphaBrainLogo className="w-96 h-auto" />

// Without QR code
<ZalphaBrainLogo showQR={false} />`}</code>
            </pre>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl font-black text-white mb-4">
            Your Logo, Your Brand, Your Success
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            This custom-designed logo is now the official face of ZALPHA across the Pacific Islands. 
            No other company can use this design - it's 100% yours!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('landing')}
              className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Download className="w-6 h-6" />
              See Logo Live on Site
            </button>
            <button
              onClick={() => onNavigate('marketing-materials')}
              className="px-8 py-4 bg-yellow-500 text-gray-900 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              View Marketing Materials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}