import { createClient } from '@supabase/supabase-js'
import { AgentEngine } from './AgentEngine'

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Create singleton agent engine instance
export const agentEngine = new AgentEngine(supabase)

// Export for use in components
export { supabase }
