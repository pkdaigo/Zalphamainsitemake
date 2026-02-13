import { AgentContext, AgentResult } from '../types'

export abstract class BaseAgent {
  abstract name: string
  abstract description: string

  /**
   * Main execution method - must be implemented by each agent
   */
  abstract execute(context: AgentContext): Promise<AgentResult>

  /**
   * Validate input data before execution
   */
  protected validateInput(input: Record<string, any>, requiredFields: string[]): void {
    const missingFields = requiredFields.filter((field) => !(field in input))

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
    }
  }

  /**
   * Handle errors gracefully
   */
  protected handleError(error: any, context: AgentContext): AgentResult {
    const errorMessage = error instanceof Error ? error.message : String(error)
    context.logger.error('Agent execution failed', { error: errorMessage })

    return {
      success: false,
      error: errorMessage,
      logs: [],
    }
  }

  /**
   * Create success result
   */
  protected success(data: any): AgentResult {
    return {
      success: true,
      data,
      logs: [],
    }
  }
}
