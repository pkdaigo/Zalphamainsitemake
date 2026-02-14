import { useState } from 'react'
import { agentEngine } from '@/services/agent/init'
import { AgentPriority } from '@/services/agent/types'

export function useTriggerAgent() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)

  const trigger = async (
    agentType: string,
    inputData: Record<string, any>,
    priority: AgentPriority = AgentPriority.MEDIUM
  ) => {
    setLoading(true)
    setSuccess(false)
    setError(null)
    setJobId(null)

    try {
      const id = await agentEngine.triggerAgent(agentType, inputData, priority)
      setJobId(id)
      setSuccess(true)
      return id
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { trigger, loading, success, error, jobId }
}
