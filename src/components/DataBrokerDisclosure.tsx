import { Info, ExternalLink } from 'lucide-react';

interface DataBrokerDisclosureProps {
  variant: 'prominent' | 'standard' | 'minimal' | 'footer';
  onNavigate?: (page: string) => void;
}

export function DataBrokerDisclosure({ variant, onNavigate }: DataBrokerDisclosureProps) {
  // PROMINENT - Most visible
  if (variant === 'prominent') {
    return (
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-blue-800 mb-2">
              By continuing, you agree to our use of cookies and data collection practices as described in our{' '}
              <button
                onClick={() => onNavigate?.('privacy-policy')}
                className="text-blue-700 hover:text-blue-900 font-semibold underline"
              >
                Privacy Policy
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD - Visible notice
  if (variant === 'standard') {
    return (
      <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 mb-4">
        <p className="text-sm text-slate-700">
          By continuing, you agree to our{' '}
          <button
            onClick={() => onNavigate?.('privacy-policy')}
            className="text-blue-600 hover:underline font-semibold"
          >
            Privacy Policy
          </button>
          {' '}and use of cookies.
        </p>
      </div>
    );
  }

  // MINIMAL - Small text
  if (variant === 'minimal') {
    return (
      <p className="text-xs text-slate-500 mb-3">
        By continuing, you agree to our{' '}
        <button
          onClick={() => onNavigate?.('privacy-policy')}
          className="text-slate-600 hover:underline"
        >
          Privacy Policy
        </button>
        .
      </p>
    );
  }

  // FOOTER - Footer link
  if (variant === 'footer') {
    return (
      <p className="text-xs text-slate-400">
        <button
          onClick={() => onNavigate?.('privacy-policy')}
          className="hover:underline"
        >
          Privacy Policy
        </button>
      </p>
    );
  }

  return null;
}