import { useState } from 'react';
import { CreditCard, DollarSign, Bitcoin, CheckCircle, AlertCircle, Loader, Shield, Lock } from 'lucide-react';

interface PaymentProcessorProps {
  amount: number;
  description: string;
  planName: string;
  billingCycle: 'monthly' | 'yearly';
  onSuccess: (paymentData: PaymentData) => void;
  onCancel?: () => void;
}

interface PaymentData {
  paymentId: string;
  method: 'card' | 'paypal' | 'crypto';
  amount: number;
  currency: string;
  status: 'completed' | 'pending';
  transactionDate: Date;
}

type PaymentMethod = 'card' | 'paypal' | 'crypto';

export function PaymentProcessor({ amount, description, planName, billingCycle, onSuccess, onCancel }: PaymentProcessorProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardName, setCardName] = useState('');
  
  // Crypto details
  const [selectedCrypto, setSelectedCrypto] = useState<'bitcoin' | 'ethereum' | 'usdc'>('bitcoin');
  const [cryptoWalletAddress, setCryptoWalletAddress] = useState('');

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const validateCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleaned);
  };

  const validateExpiry = (expiry: string): boolean => {
    const [month, year] = expiry.split('/');
    if (!month || !year) return false;
    
    const monthNum = parseInt(month);
    const yearNum = parseInt('20' + year);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    if (monthNum < 1 || monthNum > 12) return false;
    if (yearNum < currentYear) return false;
    if (yearNum === currentYear && monthNum < currentMonth) return false;
    
    return true;
  };

  const validateCVC = (cvc: string): boolean => {
    return /^\d{3,4}$/.test(cvc);
  };

  const handleCardPayment = async () => {
    // Validation
    if (!validateCardNumber(cardNumber)) {
      setError('Invalid card number');
      return;
    }
    if (!validateExpiry(cardExpiry)) {
      setError('Invalid or expired card');
      return;
    }
    if (!validateCVC(cardCVC)) {
      setError('Invalid CVC code');
      return;
    }
    if (!cardName.trim()) {
      setError('Cardholder name is required');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // In production: Integrate with Stripe API
      // await stripe.confirmCardPayment(clientSecret, { ... })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful payment
      const paymentData: PaymentData = {
        paymentId: `stripe_${Date.now()}`,
        method: 'card',
        amount,
        currency: 'USD',
        status: 'completed',
        transactionDate: new Date(),
      };

      onSuccess(paymentData);
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const handlePayPalPayment = async () => {
    setProcessing(true);
    setError('');

    try {
      // In production: Integrate with PayPal SDK
      // const order = await paypal.orders.create({ ... })
      // await paypal.orders.capture(orderId)
      
      // Simulate PayPal flow
      await new Promise(resolve => setTimeout(resolve, 2000));

      const paymentData: PaymentData = {
        paymentId: `paypal_${Date.now()}`,
        method: 'paypal',
        amount,
        currency: 'USD',
        status: 'completed',
        transactionDate: new Date(),
      };

      onSuccess(paymentData);
    } catch (err: any) {
      setError(err.message || 'PayPal payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const handleCryptoPayment = async () => {
    if (!cryptoWalletAddress.trim()) {
      setError('Wallet address is required');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // In production: Integrate with crypto payment processor (Coinbase Commerce, BitPay, etc.)
      // const invoice = await coinbaseCommerce.createInvoice({ ... })
      
      // Simulate crypto payment flow
      await new Promise(resolve => setTimeout(resolve, 2000));

      const paymentData: PaymentData = {
        paymentId: `crypto_${selectedCrypto}_${Date.now()}`,
        method: 'crypto',
        amount,
        currency: selectedCrypto.toUpperCase(),
        status: 'pending', // Crypto payments typically need confirmation time
        transactionDate: new Date(),
      };

      onSuccess(paymentData);
    } catch (err: any) {
      setError(err.message || 'Cryptocurrency payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMethod === 'card') {
      await handleCardPayment();
    } else if (selectedMethod === 'paypal') {
      await handlePayPalPayment();
    } else if (selectedMethod === 'crypto') {
      await handleCryptoPayment();
    }
  };

  // Crypto conversion rates (mock - in production, fetch real-time rates)
  const cryptoRates = {
    bitcoin: (amount / 45000).toFixed(8),
    ethereum: (amount / 2500).toFixed(6),
    usdc: amount.toFixed(2),
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <DollarSign className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
            <p className="text-gray-600 text-sm">Choose your payment method</p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-blue-900 text-lg">{planName}</h3>
              <p className="text-sm text-blue-700">{description}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-900">${amount}</p>
              <p className="text-sm text-blue-700">per {billingCycle === 'monthly' ? 'month' : 'year'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <Shield className="w-4 h-4" />
            <span>Secure payment • Auto-renews • Cancel anytime</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Select Payment Method</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Credit/Debit Card */}
            <button
              type="button"
              onClick={() => setSelectedMethod('card')}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedMethod === 'card'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className={`w-8 h-8 mx-auto mb-2 ${
                selectedMethod === 'card' ? 'text-blue-600' : 'text-gray-600'
              }`} />
              <p className="text-sm font-semibold text-gray-900">Card</p>
              <p className="text-xs text-gray-600">Visa, Mastercard</p>
            </button>

            {/* PayPal */}
            <button
              type="button"
              onClick={() => setSelectedMethod('paypal')}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedMethod === 'paypal'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                selectedMethod === 'paypal' ? 'bg-blue-600' : 'bg-gray-600'
              }`}>
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">PayPal</p>
              <p className="text-xs text-gray-600">Fast & secure</p>
            </button>

            {/* Cryptocurrency */}
            <button
              type="button"
              onClick={() => setSelectedMethod('crypto')}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedMethod === 'crypto'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Bitcoin className={`w-8 h-8 mx-auto mb-2 ${
                selectedMethod === 'crypto' ? 'text-blue-600' : 'text-gray-600'
              }`} />
              <p className="text-sm font-semibold text-gray-900">Crypto</p>
              <p className="text-xs text-gray-600">BTC, ETH, USDC</p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Payment Form */}
          {selectedMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value.replace(/\s/g, ''));
                      if (formatted.replace(/\s/g, '').length <= 19) {
                        setCardNumber(formatted);
                      }
                    }}
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => {
                      const formatted = formatExpiry(e.target.value);
                      if (formatted.length <= 5) {
                        setCardExpiry(formatted);
                      }
                    }}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CVC <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cardCVC}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) {
                        setCardCVC(value);
                      }
                    }}
                    placeholder="123"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cardholder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          {/* PayPal Payment */}
          {selectedMethod === 'paypal' && (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">PP</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Pay with PayPal</h3>
              <p className="text-sm text-gray-600 mb-4">
                You'll be redirected to PayPal to complete your payment securely.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Secured by PayPal</span>
              </div>
            </div>
          )}

          {/* Crypto Payment */}
          {selectedMethod === 'crypto' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Cryptocurrency
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCrypto('bitcoin')}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      selectedCrypto === 'bitcoin'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Bitcoin className={`w-6 h-6 mx-auto mb-1 ${
                      selectedCrypto === 'bitcoin' ? 'text-orange-600' : 'text-gray-600'
                    }`} />
                    <p className="text-xs font-semibold">Bitcoin</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCrypto('ethereum')}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      selectedCrypto === 'ethereum'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 mx-auto mb-1 rounded-full flex items-center justify-center ${
                      selectedCrypto === 'ethereum' ? 'bg-purple-600' : 'bg-gray-600'
                    }`}>
                      <span className="text-white text-xs font-bold">Ξ</span>
                    </div>
                    <p className="text-xs font-semibold">Ethereum</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCrypto('usdc')}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      selectedCrypto === 'usdc'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 mx-auto mb-1 rounded-full flex items-center justify-center ${
                      selectedCrypto === 'usdc' ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                      <span className="text-white text-xs font-bold">$</span>
                    </div>
                    <p className="text-xs font-semibold">USDC</p>
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Amount to pay:</span>
                  <span className="font-bold text-gray-900">
                    {cryptoRates[selectedCrypto]} {selectedCrypto.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  ≈ ${amount} USD (Rate updates in real-time)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Wallet Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cryptoWalletAddress}
                  onChange={(e) => setCryptoWalletAddress(e.target.value)}
                  placeholder="0x... or bc1..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-mono text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your {selectedCrypto} wallet address for transaction verification
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-xs text-yellow-800">
                  <strong>Note:</strong> Cryptocurrency payments may take 10-60 minutes to confirm. 
                  Your subscription will be activated once the transaction is confirmed on the blockchain.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-900 mb-1">Payment Error</h4>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Lock className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-green-800">
                <strong>Secure Payment:</strong> All transactions are encrypted and secured. 
                We never store your full payment details. Powered by industry-leading payment processors.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={processing}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={processing}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  {selectedMethod === 'paypal' ? 'Continue with PayPal' : `Pay $${amount}`}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
