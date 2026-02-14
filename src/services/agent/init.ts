import { createClient } from '@supabase/supabase-js'
import { AgentEngine } from './AgentEngine'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// Create singleton agent engine instance
export const agentEngine = new AgentEngine(supabase)

// Export for use in components
export { supabase }
// env update
