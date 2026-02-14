import { useState } from 'react';
import { DollarSign, Laptop, Tablet, Smartphone, Monitor, Headphones, Package, CheckCircle } from 'lucide-react';

interface PaymentOption {
  id: string;
  type: 'cash' | 'laptop' | 'tablet' | 'device' | 'equipment';
  name: string;
  icon: React.ReactNode;
  description: string;
  estimatedValue?: string;
  examples?: string[];
}

interface StudentPaymentPreferencesProps {
  onSave?: (preference: string) => void;
  isPremium?: boolean;
  onUpgrade?: () => void;
  onNavigate?: (page: string) => void;
}

export function StudentPaymentPreferences({ onSave, isPremium, onUpgrade, onNavigate }: StudentPaymentPreferencesProps) {
  const [selectedPreference, setSelectedPreference] = useState<string>('cash');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const paymentOptions: PaymentOption[] = [
    {
      id: 'cash',
      type: 'cash',
      name: 'Cash Payment',
      icon: <DollarSign className="w-8 h-8" />,
      description: 'Receive your earnings as direct cash payments via bank transfer or cryptocurrency',
      estimatedValue: 'Full monetary value'
    },
    {
      id: 'laptop',
      type: 'laptop',
      name: 'Laptop',
      icon: <Laptop className="w-8 h-8" />,
      description: 'Receive a laptop equivalent to your earnings value',
      estimatedValue: '$500 - $2,000',
      examples: [
        'MacBook Air (for higher earnings)',
        'Dell XPS 13',
        'HP Pavilion',
        'Lenovo ThinkPad',
        'ASUS VivoBook'
      ]
    },
    {
      id: 'tablet',
      type: 'tablet',
      name: 'Tablet',
      icon: <Tablet className="w-8 h-8" />,
      description: 'Receive a tablet device equivalent to your earnings value',
      estimatedValue: '$300 - $1,200',
      examples: [
        'iPad (various models)',
        'Samsung Galaxy Tab',
        'Microsoft Surface Go',
        'Amazon Fire HD'
      ]
    },
    {
      id: 'smartphone',
      type: 'device',
      name: 'Smartphone',
      icon: <Smartphone className="w-8 h-8" />,
      description: 'Receive a smartphone equivalent to your earnings value',
      estimatedValue: '$300 - $1,500',
      examples: [
        'iPhone SE / iPhone 13',
        'Samsung Galaxy A-series',
        'Google Pixel',
        'OnePlus'
      ]
    },
    {
      id: 'monitor',
      type: 'equipment',
      name: 'Monitor / Display',
      icon: <Monitor className="w-8 h-8" />,
      description: 'Receive a computer monitor or display',
      estimatedValue: '$200 - $800',
      examples: [
        '27" 4K Monitor',
        'Ultrawide Display',
        'Gaming Monitor',
        'Professional Display'
      ]
    },
    {
      id: 'accessories',
      type: 'equipment',
      name: 'Tech Accessories',
      icon: <Headphones className="w-8 h-8" />,
      description: 'Receive headphones, keyboards, mice, webcams, or other tech accessories',
      estimatedValue: '$50 - $500',
      examples: [
        'Noise-canceling headphones',
        'Mechanical keyboard',
        'Wireless mouse',
        'HD webcam',
        'External SSD'
      ]
    },
    {
      id: 'combo',
      type: 'device',
      name: 'Combination Package',
      icon: <Package className="w-8 h-8" />,
      description: 'Receive a combination of devices/accessories matching your total earnings',
      estimatedValue: 'Varies',
      examples: [
        'Tablet + keyboard case',
        'Laptop + mouse + bag',
        'Monitor + webcam + headphones',
        'Custom package based on needs'
      ]
    }
  ];

  const handleSelectPreference = (optionId: string) => {
    setSelectedPreference(optionId);
  };

  const handleSavePreference = () => {
    setShowConfirmation(true);
    if (onSave) {
      onSave(selectedPreference);
    }
    
    // Auto-hide confirmation after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const selectedOption = paymentOptions.find(opt => opt.id === selectedPreference);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-cyan-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Preferences</h3>
        <p className="text-gray-700">
          Choose how you'd like to receive your earnings. You can select cash payments or receive 
          laptops, tablets, smartphones, or other tech equipment of equivalent value! ZALPHA handles all equipment procurement and logistics.
        </p>
      </div>

      {/* Confirmation Banner */}
      {showConfirmation && (
        <div className="bg-green-100 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3 animate-pulse">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <div className="font-bold text-green-900">Preference Saved!</div>
            <div className="text-sm text-green-700">
              You've selected: {selectedOption?.name}
            </div>
          </div>
        </div>
      )}

      {/* Payment Options Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelectPreference(option.id)}
            className={`text-left p-6 rounded-xl border-2 transition-all ${
              selectedPreference === option.id
                ? 'border-blue-600 bg-blue-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${
                selectedPreference === option.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {option.icon}
              </div>
              {selectedPreference === option.id && (
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <h4 className="text-lg font-bold text-gray-900 mb-2">{option.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{option.description}</p>
            
            {option.estimatedValue && (
              <div className="text-xs font-semibold text-blue-600 mb-2">
                Value: {option.estimatedValue}
              </div>
            )}

            {option.examples && option.examples.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-700 mb-1">Examples:</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {option.examples.slice(0, 3).map((example, idx) => (
                    <li key={idx}>• {example}</li>
                  ))}
                  {option.examples.length > 3 && (
                    <li className="text-gray-500">+ {option.examples.length - 3} more</li>
                  )}
                </ul>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Option Details */}
      {selectedOption && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
          <h4 className="font-bold text-gray-900 mb-4 text-lg">Current Selection: {selectedOption.name}</h4>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-700">
              <strong>How it works:</strong>
              {selectedOption.id === 'cash' ? (
                <p className="mt-2">
                  You'll receive your full earnings as cash payments. Choose between bank transfer 
                  (ACH/wire) or cryptocurrency (Bitcoin, Ethereum, USDC) for faster international transfers.
                </p>
              ) : (
                <p className="mt-2">
                  When you have sufficient earnings, we'll match you with {selectedOption.name.toLowerCase()} 
                  options that equal your total payout value. You can choose from our pre-approved vendors 
                  or request specific models. Shipping is included to your location in the Pacific region.
                </p>
              )}
            </div>
          </div>

          {selectedOption.examples && selectedOption.examples.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-semibold text-gray-700 mb-2">Available Options:</div>
              <div className="grid md:grid-cols-2 gap-2">
                {selectedOption.examples.map((example, idx) => (
                  <div key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {example}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSavePreference}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl"
        >
          Save Payment Preference
        </button>
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div className="text-sm text-gray-700">
            <strong>Note:</strong> You can change your payment preference at any time before a payout is processed. 
            Device options are subject to availability and market pricing. We'll always confirm with you before 
            finalizing any equipment orders. For high-value items like laptops, you may need to accumulate 
            sufficient earnings over multiple payouts.
          </div>
        </div>
      </div>
    </div>
  );
}