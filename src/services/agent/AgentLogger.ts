import { AgentLog } from './types'

export class AgentLogger {
  private jobId: string
  private logs: AgentLog[] = []

  constructor(jobId: string) {
    this.jobId = jobId
  }

  info(message: string, metadata?: Record<string, any>) {
    this.log('info', message, metadata)
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log('warn', message, metadata)
  }

  error(message: string, metadata?: Record<string, any>) {
    this.log('error', message, metadata)
  }

  debug(message: string, metadata?: Record<string, any>) {
    this.log('debug', message, metadata)
  }

  private log(
    level: 'info' | 'warn' | 'error' | 'debug',
    message: string,
    metadata?: Record<string, any>
  ) {
    const logEntry: AgentLog = {
      id: crypto.randomUUID(),
      job_id: this.jobId,
      level,
      message,
      metadata,
      created_at: new Date().toISOString(),
    }

    this.logs.push(logEntry)
    console.log(`[${level.toUpperCase()}] [Job: ${this.jobId}] ${message}`, metadata || '')
  }

  getLogs(): AgentLog[] {
    return this.logs
  }

  async persistLogs(supabase: any) {
    if (this.logs.length === 0) return

    try {
      const { error } = await supabase
        .from('agent_logs')
        .insert(this.logs)

      if (error) throw error
    } catch (err) {
      console.error('Failed to persist logs:', err)
    }
  }
}
