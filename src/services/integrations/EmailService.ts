export interface EmailMessage {
  to: string | string[]
  from?: string
  subject: string
  html?: string
  text?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
  }>
}

export class EmailService {
  private apiKey: string
  private fromEmail: string

  constructor(apiKey: string, fromEmail: string = 'noreply@zalpha.ai') {
    this.apiKey = apiKey
    this.fromEmail = fromEmail
  }

  /**
   * Send email using your preferred provider (SendGrid, Postmark, etc.)
   */
  async send(message: EmailMessage): Promise<void> {
    // TODO: Integrate with actual email service
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(this.apiKey)
    
    await sgMail.send({
      to: message.to,
      from: message.from || this.fromEmail,
      subject: message.subject,
      text: message.text,
      html: message.html,
    })
    */

    console.log('📧 Email sent:', {
      to: message.to,
      subject: message.subject,
    })
  }

  /**
   * Send interview invitation
   */
  async sendInterviewInvitation(params: {
    candidateName: string
    candidateEmail: string
    jobTitle: string
    interviewUrl: string
  }): Promise<void> {
    const { candidateName, candidateEmail, jobTitle, interviewUrl } = params

    await this.send({
      to: candidateEmail,
      subject: `First Round Interview - ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hi ${candidateName},</h2>
          <p>Thank you for applying to the <strong>${jobTitle}</strong> position!</p>
          <p>We'd like to invite you to complete a first-round video interview with our AI interviewer, Zal.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Interview Details:</strong></p>
            <ul>
              <li>Duration: 10-15 minutes</li>
              <li>Complete within: 48 hours</li>
              <li>Format: Video interview</li>
            </ul>
          </div>

          <a href="${interviewUrl}" style="display: inline-block; background: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Start Interview</a>

          <p><strong>Tips for success:</strong></p>
          <ul>
            <li>Find a quiet, well-lit space</li>
            <li>Test your camera and microphone</li>
            <li>Speak clearly and naturally</li>
          </ul>

          <p>If you have any questions, feel free to reply to this email.</p>
          <p>Best regards,<br>The ZALPHA Team</p>
        </div>
      `,
    })
  }
}
