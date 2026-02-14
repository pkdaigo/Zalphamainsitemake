import { supabase } from '@/lib/supabase'
import { AgentEngine } from './AgentEngine'

export const agentEngine = new AgentEngine(supabase)
export { supabase }
