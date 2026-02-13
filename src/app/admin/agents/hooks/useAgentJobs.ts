import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import type { AgentJob } from '@/services/agent/types'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export function useAgentJobs(limit: number = 50) {
  const [jobs, setJobs] = useState<AgentJob[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error('Failed to fetch agent jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return { jobs, loading, refresh }
}
