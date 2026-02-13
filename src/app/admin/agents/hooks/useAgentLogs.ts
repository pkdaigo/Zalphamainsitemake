import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import type { AgentLog } from '@/services/agent/types'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export function useAgentLogs(limit: number = 100) {
  const [logs, setLogs] = useState<AgentLog[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      setLogs(data || [])
    } catch (error) {
      console.error('Failed to fetch agent logs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return { logs, loading, refresh }
}
