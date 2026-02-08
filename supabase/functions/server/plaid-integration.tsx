import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

// Plaid API configuration
const PLAID_CLIENT_ID = Deno.env.get('PLAID_CLIENT_ID');
const PLAID_SECRET = Deno.env.get('PLAID_SECRET');
const PLAID_ENV = 'sandbox'; // Change to 'production' for live environment

const PLAID_BASE_URL = PLAID_ENV === 'production' 
  ? 'https://production.plaid.com' 
  : 'https://sandbox.plaid.com';

/**
 * Create a Plaid Link token for initiating the verification flow
 */
export async function createLinkToken(userId: string, userName: string): Promise<any> {
  try {
    const response = await fetch(`${PLAID_BASE_URL}/link/token/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PLAID-CLIENT-ID': PLAID_CLIENT_ID!,
        'PLAID-SECRET': PLAID_SECRET!,
      },
      body: JSON.stringify({
        client_name: 'ZALPHA',
        user: {
          client_user_id: userId,
        },
        products: ['auth', 'identity', 'income_verification'],
        country_codes: ['US'],
        language: 'en',
        webhook: `${Deno.env.get('SUPABASE_URL')}/functions/v1/make-server-9bd83859/plaid/webhook`,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Plaid API error: ${JSON.stringify(data)}`);
    }

    return {
      link_token: data.link_token,
      expiration: data.expiration,
    };
  } catch (error) {
    console.error('Error creating Plaid link token:', error);
    throw error;
  }
}

/**
 * Exchange public token for access token after user completes Link flow
 */
export async function exchangePublicToken(publicToken: string): Promise<string> {
  try {
    const response = await fetch(`${PLAID_BASE_URL}/item/public_token/exchange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PLAID-CLIENT-ID': PLAID_CLIENT_ID!,
        'PLAID-SECRET': PLAID_SECRET!,
      },
      body: JSON.stringify({
        public_token: publicToken,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Plaid token exchange error: ${JSON.stringify(data)}`);
    }

    return data.access_token;
  } catch (error) {
    console.error('Error exchanging Plaid public token:', error);
    throw error;
  }
}

/**
 * Get identity verification data from Plaid
 */
export async function getIdentityData(accessToken: string): Promise<any> {
  try {
    const response = await fetch(`${PLAID_BASE_URL}/identity/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PLAID-CLIENT-ID': PLAID_CLIENT_ID!,
        'PLAID-SECRET': PLAID_SECRET!,
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Plaid identity fetch error: ${JSON.stringify(data)}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching Plaid identity data:', error);
    throw error;
  }
}

/**
 * Get auth/bank account verification data from Plaid
 */
export async function getAuthData(accessToken: string): Promise<any> {
  try {
    const response = await fetch(`${PLAID_BASE_URL}/auth/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PLAID-CLIENT-ID': PLAID_CLIENT_ID!,
        'PLAID-SECRET': PLAID_SECRET!,
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Plaid auth fetch error: ${JSON.stringify(data)}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching Plaid auth data:', error);
    throw error;
  }
}

/**
 * Get income/employment verification data from Plaid
 */
export async function getIncomeData(accessToken: string): Promise<any> {
  try {
    const response = await fetch(`${PLAID_BASE_URL}/income/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PLAID-CLIENT-ID': PLAID_CLIENT_ID!,
        'PLAID-SECRET': PLAID_SECRET!,
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Plaid income fetch error: ${JSON.stringify(data)}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching Plaid income data:', error);
    throw error;
  }
}

/**
 * Store verification data in the database
 */
export async function storeVerificationData(
  userId: string,
  verificationType: 'identity' | 'bank' | 'income',
  verificationData: any
): Promise<void> {
  try {
    const key = `plaid_verification_${userId}_${verificationType}`;
    const data = {
      userId,
      verificationType,
      data: verificationData,
      verifiedAt: new Date().toISOString(),
      status: 'verified',
    };

    await kv.set(key, data);
  } catch (error) {
    console.error(`Error storing ${verificationType} verification data:`, error);
    throw error;
  }
}

/**
 * Get verification data for a user
 */
export async function getVerificationData(
  userId: string,
  verificationType?: 'identity' | 'bank' | 'income'
): Promise<any> {
  try {
    if (verificationType) {
      const key = `plaid_verification_${userId}_${verificationType}`;
      const data = await kv.get(key);
      return data || null;
    } else {
      // Get all verification types
      const prefix = `plaid_verification_${userId}`;
      const allData = await kv.getByPrefix(prefix);
      return allData || [];
    }
  } catch (error) {
    console.error('Error fetching verification data:', error);
    throw error;
  }
}

/**
 * Get all verified users (for admin dashboard)
 */
export async function getAllVerifiedUsers(): Promise<any[]> {
  try {
    const prefix = 'plaid_verification_';
    const allData = await kv.getByPrefix(prefix);
    
    // Group by user and aggregate verification types
    const userMap = new Map();
    
    for (const item of allData) {
      // item is already parsed by kv.getByPrefix, no need to JSON.parse
      const data = item;
      if (!userMap.has(data.userId)) {
        userMap.set(data.userId, {
          userId: data.userId,
          verifications: [],
          lastVerified: data.verifiedAt,
        });
      }
      
      const userData = userMap.get(data.userId);
      userData.verifications.push({
        type: data.verificationType,
        verifiedAt: data.verifiedAt,
        status: data.status,
      });
      
      // Update lastVerified to most recent
      if (new Date(data.verifiedAt) > new Date(userData.lastVerified)) {
        userData.lastVerified = data.verifiedAt;
      }
    }
    
    return Array.from(userMap.values());
  } catch (error) {
    console.error('Error fetching all verified users:', error);
    throw error;
  }
}

/**
 * Check if a user has completed specific verifications
 */
export async function checkVerificationStatus(userId: string): Promise<{
  identity: boolean;
  bank: boolean;
  income: boolean;
  completedCount: number;
}> {
  try {
    const verifications = await getVerificationData(userId);
    
    const status = {
      identity: false,
      bank: false,
      income: false,
      completedCount: 0,
    };
    
    if (verifications && verifications.length > 0) {
      verifications.forEach((v: any) => {
        if (v.verificationType === 'identity') {
          status.identity = true;
          status.completedCount++;
        } else if (v.verificationType === 'bank') {
          status.bank = true;
          status.completedCount++;
        } else if (v.verificationType === 'income') {
          status.income = true;
          status.completedCount++;
        }
      });
    }
    
    return status;
  } catch (error) {
    console.error('Error checking verification status:', error);
    throw error;
  }
}