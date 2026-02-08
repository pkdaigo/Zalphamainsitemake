/**
 * HeyGen Configuration Routes
 * Handles HeyGen API key setup
 */

import type { Context } from "npm:hono@4";

/**
 * POST /heygen/config/set-api-key
 * Sets the HeyGen API key (admin only)
 */
export async function setApiKey(c: Context) {
  try {
    const body = await c.req.json();
    const { apiKey } = body;

    if (!apiKey || !apiKey.trim()) {
      return c.json({ error: 'API key is required' }, 400);
    }

    // Validate API key format (HeyGen keys start with sk_V2_hgu_)
    if (!apiKey.startsWith('sk_V2_hgu_')) {
      return c.json({ error: 'Invalid HeyGen API key format. Key should start with sk_V2_hgu_' }, 400);
    }

    // In Supabase Edge Functions, we cannot directly set environment variables
    // The user must set HEYGEN_API_KEY via Supabase dashboard
    // This endpoint just validates the key format
    
    console.log('✅ HeyGen API key validated successfully');
    console.log('🔑 Key prefix:', apiKey.substring(0, 15) + '...');
    
    return c.json({ 
      success: true, 
      message: 'API key format validated. Please set HEYGEN_API_KEY in Supabase environment variables.',
      instruction: 'Go to Supabase Dashboard → Edge Functions → Environment Variables → Add HEYGEN_API_KEY'
    });
  } catch (error: any) {
    console.error('HeyGen config error:', error);
    return c.json({ error: error.message || 'Failed to configure API key' }, 500);
  }
}

/**
 * GET /heygen/config/status
 * Checks if HeyGen API key is configured
 */
export async function getConfigStatus(c: Context) {
  try {
    const HEYGEN_API_KEY = Deno.env.get('HEYGEN_API_KEY');
    
    return c.json({ 
      configured: !!HEYGEN_API_KEY,
      keyPrefix: HEYGEN_API_KEY ? HEYGEN_API_KEY.substring(0, 15) + '...' : null
    });
  } catch (error: any) {
    console.error('HeyGen config status error:', error);
    return c.json({ error: error.message }, 500);
  }
}
