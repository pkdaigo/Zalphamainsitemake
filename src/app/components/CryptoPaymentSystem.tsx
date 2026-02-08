import { useState, useEffect } from 'react';
import { DollarSign, Bitcoin, Wallet, Copy, Check, AlertCircle, Shield, TrendingUp, Zap, QrCode, ExternalLink, Info } from 'lucide-react';

interface CryptoPaymentSystemProps {
  studentName: string;
  studentId: string;
  paymentAmount: number;
  jobTitle: string;
  employerName: string;
  onPaymentComplete: (transactionId: string, method: string) => void;
}

interface CryptoOption {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  networkFee: string;
  processingTime: string;
  exchangeRate: number; // USD to crypto
}

export function CryptoPaymentSystem({
  studentName,
  studentId,
  paymentAmount,
  jobTitle,
  employerName,
  onPaymentComplete
}: CryptoPaymentSystemProps) {
  const [selectedMethod, setSelectedMethod] = useState<'bank' | 'crypto' | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select' | 'details' | 'confirm' | 'processing' | 'complete'>('select');

  const cryptoOptions: CryptoOption[] = [
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      networkFee: '$2-5',
      processingTime: '10-60 minutes',
      exchangeRate: 0.000023 // Example rate
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'Ξ',
      networkFee: '$1-3',
      processingTime: '2-10 minutes',
      exchangeRate: 0.00042 // Example rate
    },
    {
      id: 'usdt',
      name: 'Tether',
      symbol: 'USDT',
      icon: '₮',
      networkFee: '$1-2',
      processingTime: '1-5 minutes',
      exchangeRate: 1.0 // Stablecoin
    },
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      icon: '$',
      networkFee: '$1-2',
      processingTime: '1-5 minutes',
      exchangeRate: 1.0 // Stablecoin
    },
    {
      id: 'sol',
      name: 'Solana',
      symbol: 'SOL',
      icon: '◎',
      networkFee: '$0.01-0.10',
      processingTime: '1-2 minutes',
      exchangeRate: 0.0095 // Example rate
    }
  ];

  // Generate wallet address (in production, this would be from your payment processor)
  useEffect(() => {
    if (selectedCrypto) {
      // Generate unique wallet address for this payment
      const mockAddress = `${selectedCrypto.symbol}${studentId}${Date.now()}`.substring(0, 42);
      setWalletAddress(mockAddress);
    }
  }, [selectedCrypto, studentId]);

  const handleSelectPaymentMethod = (method: 'bank' | 'crypto') => {
    setSelectedMethod(method);
    if (method === 'bank') {
      // Handle traditional bank transfer
      setPaymentStep('details');
    } else {
      setPaymentStep('select');
    }
  };

  const handleSelectCrypto = (crypto: CryptoOption) => {
    setSelectedCrypto(crypto);
    setPaymentStep('details');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirmPayment = () => {
    setPaymentStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('complete');
      const transactionId = `TXN-${selectedCrypto?.symbol || 'BANK'}-${Date.now()}`;
      onPaymentComplete(transactionId, selectedCrypto?.name || 'Bank Transfer');
    }, 3000);
  };

  if (paymentStep === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <Wallet className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Processing Payment...
          </h2>
          
          <p className="text-xl text-gray-700 mb-6">
            {selectedCrypto 
              ? `Waiting for ${selectedCrypto.name} transaction confirmation...`
              : 'Processing your payment...'
            }
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <p className="text-sm text-blue-900">
              ⏱️ This usually takes {selectedCrypto?.processingTime || '1-3 business days'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStep === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mb-8">
            <Check className="w-20 h-20 text-white" />
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Payment Received!
          </h2>
          
          <p className="text-xl text-gray-700 mb-8">
            Your payment of <strong>${paymentAmount.toFixed(2)}</strong> has been processed successfully!
          </p>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Job:</span>
                <span className="font-bold text-gray-900">{jobTitle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Employer:</span>
                <span className="font-bold text-gray-900">{employerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Payment Method:</span>
                <span className="font-bold text-gray-900">{selectedCrypto?.name || 'Bank Transfer'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Amount:</span>
                <span className="font-bold text-green-600">${paymentAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Receipt sent to your email • Funds will be available after project completion
          </p>
        </div>
      </div>
    );
  }

  if (paymentStep === 'details' && selectedCrypto) {
    const cryptoAmount = (paymentAmount * selectedCrypto.exchangeRate).toFixed(8);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 text-3xl">
                {selectedCrypto.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">Pay with {selectedCrypto.name}</h1>
                <p className="text-xl text-blue-100">
                  Send exactly <strong>{cryptoAmount} {selectedCrypto.symbol}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Instructions</h2>

            {/* Amount */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Amount to Send</p>
                <p className="text-5xl font-bold text-gray-900 mb-2">
                  {cryptoAmount} {selectedCrypto.symbol}
                </p>
                <p className="text-lg text-gray-600">
                  ≈ ${paymentAmount.toFixed(2)} USD
                </p>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                ZALPHA Wallet Address
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  className="flex-1 px-4 py-4 bg-gray-100 border-2 border-gray-300 rounded-xl font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(walletAddress)}
                  className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                ⚠️ Double-check this address before sending!
              </p>
            </div>

            {/* QR Code */}
            <div className="bg-gray-100 rounded-xl p-8 text-center mb-6">
              <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center border-4 border-gray-300 mb-4">
                <QrCode className="w-32 h-32 text-gray-400" />
                <p className="text-xs text-gray-500 absolute mt-40">QR Code Placeholder</p>
              </div>
              <p className="text-sm text-gray-600">
                Scan this QR code with your crypto wallet
              </p>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Important Notes
              </h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">•</span>
                  <span>Send <strong>EXACTLY {cryptoAmount} {selectedCrypto.symbol}</strong> to avoid processing delays</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">•</span>
                  <span>Network fee: {selectedCrypto.networkFee} (paid by you)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">•</span>
                  <span>Processing time: {selectedCrypto.processingTime}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">•</span>
                  <span>DO NOT send from an exchange - use a personal wallet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">•</span>
                  <span>This address is valid for 24 hours</span>
                </li>
              </ul>
            </div>

            {/* Transaction Details */}
            <div className="border-2 border-gray-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Transaction Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Job:</span>
                  <span className="font-semibold text-gray-900">{jobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employer:</span>
                  <span className="font-semibold text-gray-900">{employerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Amount:</span>
                  <span className="font-semibold text-gray-900">${paymentAmount.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Crypto Amount:</span>
                  <span className="font-semibold text-gray-900">{cryptoAmount} {selectedCrypto.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exchange Rate:</span>
                  <span className="font-semibold text-gray-900">1 USD = {selectedCrypto.exchangeRate} {selectedCrypto.symbol}</span>
                </div>
              </div>
            </div>

            <button
              onClick={confirmPayment}
              className="w-full px-8 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center justify-center gap-3"
            >
              <Check className="w-6 h-6" />
              I've Sent the Payment
            </button>

            <button
              onClick={() => setPaymentStep('select')}
              className="w-full mt-3 px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-bold"
            >
              ← Change Payment Method
            </button>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Need Help?
            </h3>
            <p className="text-sm text-blue-800 mb-3">
              First time sending crypto? No problem!
            </p>
            <a
              href="https://zalpha.help/crypto-payments"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
            >
              View Crypto Payment Guide
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Payment Method Selection
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-3">💰 Choose Payment Method</h1>
          <p className="text-xl text-blue-100">
            Receive your payment of <strong>${paymentAmount.toFixed(2)}</strong> for {jobTitle}
          </p>
        </div>

        {/* Payment Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Traditional Banking */}
          <button
            onClick={() => handleSelectPaymentMethod('bank')}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all border-2 border-gray-200 hover:border-blue-400 text-left"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Traditional Banking</h3>
                <p className="text-gray-600">Direct deposit or wire transfer</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-600" />
                <span>Bank account or debit card</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-600" />
                <span>Processing: 1-3 business days</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-600" />
                <span>No crypto knowledge needed</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <span className="text-green-800 font-bold">Most Popular</span>
            </div>
          </button>

          {/* Cryptocurrency */}
          <button
            onClick={() => handleSelectPaymentMethod('crypto')}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all border-2 border-gray-200 hover:border-purple-400 text-left"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bitcoin className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Cryptocurrency</h3>
                <p className="text-gray-600">Bitcoin, Ethereum, USDT & more</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Zap className="w-4 h-4 text-orange-600" />
                <span>Processing: Minutes to 1 hour</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Shield className="w-4 h-4 text-orange-600" />
                <span>Lower fees than traditional</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span>5+ cryptocurrencies supported</span>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
              <span className="text-orange-800 font-bold">Fastest Option ⚡</span>
            </div>
          </button>
        </div>

        {/* Crypto Options (if crypto selected) */}
        {selectedMethod === 'crypto' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Cryptocurrency</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {cryptoOptions.map(crypto => (
                <button
                  key={crypto.id}
                  onClick={() => handleSelectCrypto(crypto)}
                  className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-400 text-left"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                      {crypto.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{crypto.name}</h3>
                      <p className="text-sm text-gray-600">{crypto.symbol}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Network Fee:</span>
                      <span className="font-semibold">{crypto.networkFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing:</span>
                      <span className="font-semibold">{crypto.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>You'll Receive:</span>
                      <span className="font-semibold text-green-600">
                        {(paymentAmount * crypto.exchangeRate).toFixed(8)} {crypto.symbol}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Why Choose Crypto?
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span><strong>Faster:</strong> Receive payment in minutes, not days</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span><strong>Lower Fees:</strong> Save money on transaction costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span><strong>Global:</strong> Works anywhere in the Pacific region</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span><strong>Secure:</strong> Blockchain-verified transactions</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-green-200">
            <Shield className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1">Secure Escrow</h3>
            <p className="text-sm text-gray-600">ZALPHA holds payment until work is approved</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-blue-200">
            <Zap className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1">Fast Processing</h3>
            <p className="text-sm text-gray-600">Crypto payments process in minutes</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-purple-200">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1">Flexible Options</h3>
            <p className="text-sm text-gray-600">Choose the payment method that works for you</p>
          </div>
        </div>
      </div>
    </div>
  );
}
