import { useState, useCallback } from 'react';
import { usePlaidLink, PlaidLinkOnSuccess, PlaidLinkOptions } from 'react-plaid-link';
import { Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface PlaidIDVerificationProps {
  onSuccess: (identityData: any) => void;
  onError?: (error: any) => void;
  userType: 'student' | 'employer';
}

export function PlaidIDVerification({ onSuccess, onError, userType }: PlaidIDVerificationProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  // Generate link token from your backend
  const generateLinkToken = async () => {
    setLoading(true);
    setError('');
    
    try {
      // In production, call your backend to create a Plaid link token
      // For demo purposes, we'll use a mock token
      // const response = await fetch('/api/plaid/create-link-token', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userType })
      // });
      // const data = await response.json();
      // setLinkToken(data.link_token);
      
      // Demo mode: simulate token generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLinkToken('link-sandbox-demo-token-' + Date.now());
      
    } catch (err) {
      const errorMessage = 'Failed to initialize ID verification. Please try again.';
      setError(errorMessage);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSuccess = useCallback<PlaidLinkOnSuccess>((public_token, metadata) => {
    // Exchange public token for identity verification data
    // In production, send the public_token to your backend
    console.log('Plaid Link success:', { public_token, metadata });
    
    // Demo mode: simulate successful verification
    setVerified(true);
    onSuccess({
      verified: true,
      identityData: {
        name: metadata.accounts?.[0]?.name || 'Verified User',
        verifiedAt: new Date().toISOString(),
        plaidToken: public_token,
        metadata: metadata
      }
    });
  }, [onSuccess]);

  const config: PlaidLinkOptions = {
    token: linkToken || '',
    onSuccess: handleOnSuccess,
    onExit: (err, metadata) => {
      console.log('Plaid Link exit:', { err, metadata });
      if (err) {
        setError('ID verification was cancelled or failed.');
        if (onError) onError(err);
      }
    }
  };

  const { open, ready } = usePlaidLink(config);

  // Auto-generate token when component mounts
  useState(() => {
    if (!linkToken && !loading) {
      generateLinkToken();
    }
  });

  if (verified) {
    return (
      <div className="p-6 bg-green-50 border-2 border-green-500 rounded-xl">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <div>
            <h3 className="text-lg font-bold text-green-900">ID Verified Successfully!</h3>
            <p className="text-sm text-green-700">Your identity has been verified with Plaid.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Info Section */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">ID Verification Required</h4>
            <p className="text-sm text-blue-700 mt-1">
              {userType === 'student' 
                ? 'Verify your identity to access job opportunities. We use Plaid to securely verify your government-issued ID.'
                : 'Verify your company identity to post jobs. Plaid will securely verify your business credentials.'}
            </p>
            <div className="mt-2 text-xs text-blue-600 space-y-1">
              <p>✓ Bank-level security & encryption</p>
              <p>✓ Instant verification</p>
              <p>✓ Your data is never stored</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900">Verification Error</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Verification Button */}
      <button
        onClick={() => {
          if (ready && linkToken) {
            open();
          } else {
            generateLinkToken();
          }
        }}
        disabled={loading}
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold 
                   hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Initializing verification...
          </>
        ) : (
          <>
            <Shield className="w-5 h-5" />
            Verify ID with Plaid
          </>
        )}
      </button>

      {/* Demo Mode Notice */}
      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>Demo Mode:</strong> In production, this will connect to Plaid's Identity Verification API. 
          For this demo, click the button above to simulate the verification process.
        </p>
      </div>

      {/* What We Verify */}
      <div className="text-sm text-gray-600 space-y-2">
        <p className="font-semibold text-gray-900">What we verify:</p>
        <ul className="space-y-1 pl-5 list-disc">
          {userType === 'student' ? (
            <>
              <li>Government-issued photo ID (Driver's License, Passport, or State ID)</li>
              <li>Selfie verification to match your ID</li>
              <li>Address verification</li>
              <li>Date of birth confirmation</li>
            </>
          ) : (
            <>
              <li>Business registration documents</li>
              <li>Employer Identification Number (EIN)</li>
              <li>Business address verification</li>
              <li>Authorized representative identity</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
