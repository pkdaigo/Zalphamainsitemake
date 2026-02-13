import { AgentJob, AgentStatus, AgentPriority } from './types'

export class JobQueue {
  private supabase: any

  constructor(supabase: any) {
    this.supabase = supabase
  }

  async createJob(
    agentType: string,
    inputData: Record<string, any>,
    priority: AgentPriority = AgentPriority.MEDIUM,
    maxRetries: number = 3
  ): Promise<AgentJob> {
    const job: Partial<AgentJob> = {
      id: crypto.randomUUID(),
      agent_type: agentType,
      status: AgentStatus.IDLE,
      priority,
      input_data: inputData,
      retry_count: 0,
      max_retries: maxRetries,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await this.supabase
      .from('agent_jobs')
      .insert(job)
      .select()
      .single()

    if (error) throw new Error(`Failed to create job: ${error.message}`)
    return data
  }

  async getNextJob(): Promise<AgentJob | null> {
    const { data, error } = await this.supabase
      .from('agent_jobs')
      .select('*')
      .eq('status', AgentStatus.IDLE)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(1)
      .single()

    if (error || !data) return null
    return data
  }

  async updateJobStatus(
    jobId: string,
    status: AgentStatus,
    outputData?: Record<string, any>,
    errorMessage?: string
  ): Promise<void> {
    const updates: Partial<AgentJob> = {
      status,
      updated_at: new Date().toISOString(),
    }

    if (status === AgentStatus.RUNNING) {
      updates.started_at = new Date().toISOString()
    }

    if (status === AgentStatus.COMPLETED || status === AgentStatus.FAILED) {
      updates.completed_at = new Date().toISOString()
    }

    if (outputData) {
      updates.output_data = outputData
    }

    if (errorMessage) {
      updates.error_message = errorMessage
    }

    const { error } = await this.supabase
      .from('agent_jobs')
      .update(updates)
      .eq('id', jobId)

    if (error) throw new Error(`Failed to update job status: ${error.message}`)
  }

  async incrementRetryCount(jobId: string): Promise<void> {
    const { error } = await this.supabase.rpc('increment_retry_count', {
      job_id: jobId,
    })

    if (error) throw new Error(`Failed to increment retry count: ${error.message}`)
  }

  async getJobById(jobId: string): Promise<AgentJob | null> {
    const { data, error } = await this.supabase
      .from('agent_jobs')
      .select('*')
      .eq('id', jobId)
      .single()

    if (error || !data) return null
    return data
  }

  async listJobs(filters?: {
    status?: AgentStatus
    agentType?: string
    limit?: number
  }): Promise<AgentJob[]> {
    let query = this.supabase.from('agent_jobs').select('*')

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }

    if (filters?.agentType) {
      query = query.eq('agent_type', filters.agentType)
    }

    query = query
      .order('created_at', { ascending: false })
      .limit(filters?.limit || 50)

    const { data, error } = await query

    if (error) throw new Error(`Failed to list jobs: ${error.message}`)
    return data || []
  }
}
