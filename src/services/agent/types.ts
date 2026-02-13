// Agent System Types

export enum AgentStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  PAUSED = 'paused',
}

export enum AgentPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export interface AgentJob {
  id: string
  agent_type: string
  status: AgentStatus
  priority: AgentPriority
  input_data: Record<string, any>
  output_data?: Record<string, any>
  error_message?: string
  retry_count: number
  max_retries: number
  started_at?: string
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface AgentLog {
  id: string
  job_id: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  metadata?: Record<string, any>
  created_at: string
}

export interface AgentConfig {
  id: string
  agent_type: string
  is_enabled: boolean
  config: Record<string, any>
  schedule?: string // Cron expression
  created_at: string
  updated_at: string
}

export interface AgentResult {
  success: boolean
  data?: any
  error?: string
  logs: string[]
}

export interface AgentContext {
  jobId: string
  input: Record<string, any>
  config: Record<string, any>
  logger: AgentLogger
}

export interface AgentLogger {
  info: (message: string, metadata?: Record<string, any>) => void
  warn: (message: string, metadata?: Record<string, any>) => void
  error: (message: string, metadata?: Record<string, any>) => void
  debug: (message: string, metadata?: Record<string, any>) => void
}
