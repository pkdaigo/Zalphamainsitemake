export interface WebhookPayload {
  event: string
  data: Record<string, any>
  timestamp: string
}

export class WebhookService {
  /**
   * Send webhook notification
   */
  async send(url: string, payload: WebhookPayload): Promise<void> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'ZALPHA-Agent/1.0',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.statusText}`)
      }

      console.log('🔗 Webhook sent successfully')
    } catch (error) {
      console.error('Failed to send webhook:', error)
      throw error
    }
  }

  /**
   * Trigger interview completed webhook
   */
  async triggerInterviewCompleted(webhookUrl: string, data: Record<string, any>): Promise<void> {
    await this.send(webhookUrl, {
      event: 'interview.completed',
      data,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Trigger candidate status change webhook
   */
  async triggerCandidateStatusChange(
    webhookUrl: string,
    data: Record<string, any>
  ): Promise<void> {
    await this.send(webhookUrl, {
      event: 'candidate.status_changed',
      data,
      timestamp: new Date().toISOString(),
    })
  }
}
