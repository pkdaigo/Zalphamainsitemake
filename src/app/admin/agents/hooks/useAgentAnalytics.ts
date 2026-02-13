import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { formatDistanceToNow, subDays, format } from 'date-fns'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

interface AgentAnalytics {
  successRate: number
  avgExecutionTime: number
  totalExecutions: number
  byAgentType: Array<{
    agent_type: string
    total: number
    completed: number
    failed: number
    avg_duration: number
    success_rate: number
  }>
  recentTrend: Array<{
    date: string
    count: number
  }>
}

export function useAgentAnalytics() {
  const [analytics, setAnalytics] = useState<AgentAnalytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch all jobs
        const { data: jobs, error } = await supabase
          .from('agent_jobs')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        if (!jobs || jobs.length === 0) {
          setAnalytics(null)
          setLoading(false)
          return
        }

        // Calculate success rate
        const completed = jobs.filter((j) => j.status === 'completed').length
        const failed = jobs.filter((j) => j.status === 'failed').length
        const total = completed + failed
        const successRate = total > 0 ? (completed / total) * 100 : 0

        // Calculate average execution time
        const executedJobs = jobs.filter((j) => j.started_at && j.completed_at)
        const totalDuration = executedJobs.reduce((sum, job) => {
          const duration =
            new Date(job.completed_at!).getTime() - new Date(job.started_at!).getTime()
          return sum + duration / 1000 // Convert to seconds
        }, 0)
        const avgExecutionTime =
          executedJobs.length > 0 ? Math.round(totalDuration / executedJobs.length) : 0

        // Group by agent type
        const byAgentType = Object.entries(
          jobs.reduce((acc, job) => {
            if (!acc[job.agent_type]) {
              acc[job.agent_type] = []
            }
            acc[job.agent_type].push(job)
            return acc
          }, {} as Record<string, any[]>)
        ).map(([agent_type, agentJobs]) => {
          const completed = agentJobs.filter((j) => j.status === 'completed').length
          const failed = agentJobs.filter((j) => j.status === 'failed').length
          const total = agentJobs.length
          const success_rate = completed + failed > 0 ? (completed / (completed + failed)) * 100 : 0

          const executedAgentJobs = agentJobs.filter((j) => j.started_at && j.completed_at)
          const totalDuration = executedAgentJobs.reduce((sum, job) => {
            const duration =
              new Date(job.completed_at!).getTime() - new Date(job.started_at!).getTime()
            return sum + duration / 1000
          }, 0)
          const avg_duration =
            executedAgentJobs.length > 0 ? Math.round(totalDuration / executedAgentJobs.length) : 0

          return {
            agent_type,
            total,
            completed,
            failed,
            avg_duration,
            success_rate,
          }
        })

        // Recent trend (last 7 days)
        const recentTrend = Array.from({ length: 7 }, (_, i) => {
          const date = subDays(new Date(), 6 - i)
          const count = jobs.filter(
            (j) => format(new Date(j.created_at), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          ).length
          return {
            date: format(date, 'MMM d'),
            count,
          }
        })

        setAnalytics({
          successRate,
          avgExecutionTime,
          totalExecutions: jobs.length,
          byAgentType,
          recentTrend,
        })
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  return { analytics, loading }
}
