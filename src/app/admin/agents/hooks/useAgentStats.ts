import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { AgentStatus } from '@/services/agent/types'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

interface AgentStats {
  idle: number
  running: number
  completed: number
  failed: number
  paused: number
}

export function useAgentStats() {
  const [stats, setStats] = useState<AgentStats | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_jobs')
        .select('status')

      if (error) throw error

      const counts: AgentStats = {
        idle: 0,
        running: 0,
        completed: 0,
        failed: 0,
        paused: 0,
      }

      data?.forEach((job) => {
        counts[job.status as AgentStatus]++
      })

      setStats(counts)
    } catch (error) {
      console.error('Failed to fetch agent stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return { stats, loading, refresh }
}
