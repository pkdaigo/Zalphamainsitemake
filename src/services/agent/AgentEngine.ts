import { AgentStatus, AgentContext } from './types'
import { JobQueue } from './JobQueue'
import { AgentLogger } from './AgentLogger'
import { BaseAgent } from './agents/BaseAgent'
import { FirstInterviewAgent } from './agents/FirstInterviewAgent'

export class AgentEngine {
  private supabase: any
  private jobQueue: JobQueue
  private agents: Map<string, BaseAgent>
  private isRunning: boolean = false

  constructor(supabase: any) {
    this.supabase = supabase
    this.jobQueue = new JobQueue(supabase)
    this.agents = new Map()

    // Register available agents
    this.registerAgent('first_interview', new FirstInterviewAgent())
    // Add more agents here as you build them
    // this.registerAgent('resume_screener', new ResumeScreenerAgent())
    // this.registerAgent('email_followup', new EmailFollowUpAgent())
  }

  /**
   * Register a new agent type
   */
  registerAgent(type: string, agent: BaseAgent): void {
    this.agents.set(type, agent)
    console.log(`✓ Registered agent: ${agent.name} (${type})`)
  }

  /**
   * Start the agent engine (processes jobs from queue)
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      console.warn('Agent engine is already running')
      return
    }

    this.isRunning = true
    console.log('🤖 Agent engine started')

    while (this.isRunning) {
      try {
        const job = await this.jobQueue.getNextJob()

        if (job) {
          await this.executeJob(job.id)
        } else {
          // No jobs available, wait before checking again
          await new Promise((resolve) => setTimeout(resolve, 5000))
        }
      } catch (error) {
        console.error('Error in agent engine loop:', error)
        await new Promise((resolve) => setTimeout(resolve, 10000))
      }
    }
  }

  /**
   * Stop the agent engine
   */
  stop(): void {
    this.isRunning = false
    console.log('🛑 Agent engine stopped')
  }

  /**
   * Execute a specific job
   */
  async executeJob(jobId: string): Promise<void> {
    const job = await this.jobQueue.getJobById(jobId)

    if (!job) {
      console.error(`Job ${jobId} not found`)
      return
    }

    const agent = this.agents.get(job.agent_type)

    if (!agent) {
      await this.jobQueue.updateJobStatus(
        jobId,
        AgentStatus.FAILED,
        undefined,
        `Unknown agent type: ${job.agent_type}`
      )
      return
    }

    // Update status to running
    await this.jobQueue.updateJobStatus(jobId, AgentStatus.RUNNING)

    // Create logger
    const logger = new AgentLogger(jobId)

    try {
      logger.info(`Starting ${agent.name}`, { job_id: jobId })

      // Get agent config
      const config = await this.getAgentConfig(job.agent_type)

      // Create context
      const context: AgentContext = {
        jobId,
        input: job.input_data,
        config: config?.config || {},
        logger,
      }

      // Execute agent
      const result = await agent.execute(context)

      // Persist logs
      await logger.persistLogs(this.supabase)

      if (result.success) {
        await this.jobQueue.updateJobStatus(jobId, AgentStatus.COMPLETED, result.data)
        logger.info('Job completed successfully')
      } else {
        // Check if we should retry
        if (job.retry_count < job.max_retries) {
          await this.jobQueue.incrementRetryCount(jobId)
          await this.jobQueue.updateJobStatus(jobId, AgentStatus.IDLE)
          logger.warn(`Job failed, retry ${job.retry_count + 1}/${job.max_retries}`)
        } else {
          await this.jobQueue.updateJobStatus(
            jobId,
            AgentStatus.FAILED,
            undefined,
            result.error || 'Unknown error'
          )
          logger.error('Job failed after max retries')
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error('Unexpected error during job execution', { error: errorMessage })

      await logger.persistLogs(this.supabase)

      if (job.retry_count < job.max_retries) {
        await this.jobQueue.incrementRetryCount(jobId)
        await this.jobQueue.updateJobStatus(jobId, AgentStatus.IDLE)
      } else {
        await this.jobQueue.updateJobStatus(jobId, AgentStatus.FAILED, undefined, errorMessage)
      }
    }
  }

  /**
   * Get agent configuration from database
   */
  private async getAgentConfig(agentType: string): Promise<any> {
    const { data } = await this.supabase
      .from('agent_config')
      .select('*')
      .eq('agent_type', agentType)
      .eq('is_enabled', true)
      .single()

    return data
  }

  /**
   * Manually trigger an agent (creates a job)
   */
  async triggerAgent(
    agentType: string,
    inputData: Record<string, any>,
    priority?: any
  ): Promise<string> {
    const job = await this.jobQueue.createJob(agentType, inputData, priority)
    return job.id
  }

  /**
   * Get list of registered agents
   */
  getRegisteredAgents(): Array<{ type: string; name: string; description: string }> {
    return Array.from(this.agents.entries()).map(([type, agent]) => ({
      type,
      name: agent.name,
      description: agent.description,
    }))
  }
}
