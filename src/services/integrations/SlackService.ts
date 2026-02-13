export interface SlackMessage {
  channel: string
  text: string
  blocks?: any[]
  thread_ts?: string
}

export class SlackService {
  private webhookUrl: string

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl
  }

  /**
   * Send message to Slack channel
   */
  async send(message: SlackMessage): Promise<void> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: message.channel,
          text: message.text,
          blocks: message.blocks,
        }),
      })

      if (!response.ok) {
        throw new Error(`Slack API error: ${response.statusText}`)
      }

      console.log('💬 Slack message sent')
    } catch (error) {
      console.error('Failed to send Slack message:', error)
      throw error
    }
  }

  /**
   * Notify about new interview completion
   */
  async notifyInterviewCompleted(params: {
    candidateName: string
    jobTitle: string
    score: number
    dashboardUrl: string
  }): Promise<void> {
    const { candidateName, jobTitle, score, dashboardUrl } = params

    await this.send({
      channel: '#recruitment',
      text: `New interview completed: ${candidateName} - ${jobTitle}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*New Interview Completed* 🎥`,
          },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Candidate:*\n${candidateName}` },
            { type: 'mrkdwn', text: `*Position:*\n${jobTitle}` },
            { type: 'mrkdwn', text: `*Score:*\n${score}/100` },
          ],
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: { type: 'plain_text', text: 'View Details' },
              url: dashboardUrl,
            },
          ],
        },
      ],
    })
  }
}
