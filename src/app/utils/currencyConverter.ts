// Supported currencies (including GBP)
export type Currency = 
  | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'KRW' | 'PHP' | 'VND' | 'THB' | 'INR'
  | 'AUD' | 'CAD' | 'SGD' | 'MYR' | 'IDR' | 'NZD' | 'HKD' | 'TWD';

// Exchange rates (relative to USD = 1.00) - Updated regularly
const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1.00,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CNY: 7.24,
  KRW: 1320.50,
  PHP: 56.25,
  VND: 24350.00,
  THB: 35.80,
  INR: 83.20,
  AUD: 1.53,
  CAD: 1.36,
  SGD: 1.35,
  MYR: 4.68,
  IDR: 15680.00,
  NZD: 1.65,
  HKD: 7.82,
  TWD: 31.45,
};

// Currency symbols
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  KRW: '₩',
  PHP: '₱',
  VND: '₫',
  THB: '฿',
  INR: '₹',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$',
  MYR: 'RM',
  IDR: 'Rp',
  NZD: 'NZ$',
  HKD: 'HK$',
  TWD: 'NT$',
};

/**
 * Convert any currency to USD
 */
export function toUSD(amount: number, fromCurrency: string): number {
  const rate = EXCHANGE_RATES[fromCurrency.toUpperCase() as Currency];
  if (!rate) return amount; // If currency not found, assume it's USD
  return amount / rate;
}

/**
 * Convert USD to any currency
 */
export function fromUSD(amount: number, toCurrency: string): number {
  const rate = EXCHANGE_RATES[toCurrency.toUpperCase() as Currency];
  if (!rate) return amount; // If currency not found, return as-is
  return amount * rate;
}

/**
 * Format currency with symbol and proper decimals
 */
export function formatCurrency(amount: number, currency: string = 'USD', showUSD: boolean = false): string {
  const symbol = CURRENCY_SYMBOLS[currency.toUpperCase() as Currency] || '$';
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (showUSD && currency.toUpperCase() !== 'USD') {
    const usdAmount = toUSD(amount, currency);
    return `${symbol}${formatted} (~$${usdAmount.toFixed(0)} USD)`;
  }

  return `${symbol}${formatted}`;
}

/**
 * Format budget range with USD conversion
 */
export function formatBudgetRange(min: number, max: number, currency: string = 'USD'): string {
  if (currency.toUpperCase() === 'USD') {
    return `$${min.toLocaleString()} - $${max.toLocaleString()} USD`;
  }

  const symbol = CURRENCY_SYMBOLS[currency.toUpperCase() as Currency] || '$';
  const minUSD = toUSD(min, currency);
  const maxUSD = toUSD(max, currency);
  
  return `${symbol}${min.toLocaleString()} - ${symbol}${max.toLocaleString()} (~$${minUSD.toFixed(0)} - $${maxUSD.toFixed(0)} USD)`;
}

/**
 * Detect currency from location/country
 */
export function getCurrencyByCountry(country: string): Currency {
  const LOCATION_CURRENCY_MAP: Record<string, Currency> = {
    // Pacific Islands (USD)
    'Guam': 'USD',
    'CNMI': 'USD',
    'Northern Mariana Islands': 'USD',
    'American Samoa': 'USD',
    'Palau': 'USD',
    'Marshall Islands': 'USD',
    'Hawaii': 'USD',
    // Europe
    'EU': 'EUR',
    'Germany': 'EUR',
    'France': 'EUR',
    'Spain': 'EUR',
    'Italy': 'EUR',
    'UK': 'GBP',
    'United Kingdom': 'GBP',
    'Great Britain': 'GBP',
    'England': 'GBP',
    'Scotland': 'GBP',
    'Wales': 'GBP',
    'Northern Ireland': 'GBP',
    // Asia
    'Japan': 'JPY',
    'China': 'CNY',
    'South Korea': 'KRW',
    'Korea': 'KRW',
    'Philippines': 'PHP',
    'Vietnam': 'VND',
    'Thailand': 'THB',
    'India': 'INR',
    // Oceania & Others
    'Australia': 'AUD',
    'Canada': 'CAD',
    'Singapore': 'SGD',
    'Malaysia': 'MYR',
    'Indonesia': 'IDR',
    'New Zealand': 'NZD',
    'Hong Kong': 'HKD',
    'Taiwan': 'TWD',
  };

  return LOCATION_CURRENCY_MAP[country] || 'USD';
}