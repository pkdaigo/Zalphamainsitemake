import { BaseAgent } from './BaseAgent'
import { AgentContext, AgentResult } from '../types'

interface FirstInterviewInput {
  candidate_id: string
  candidate_name: string
  candidate_email: string
  job_id: string
  job_title: string
  questions?: string[] // Optional custom questions
}

interface InterviewQuestion {
  question: string
  category: 'background' | 'skills' | 'motivation' | 'availability'
  duration_seconds: number
}

interface InterviewResult {
  candidate_id: string
  interview_id: string
  status: 'scheduled' | 'completed' | 'failed'
  scheduled_at?: string
  video_url?: string
  transcript?: string
  analysis?: {
    overall_score: number
    communication_score: number
    enthusiasm_score: number
    qualification_score: number
    red_flags: string[]
    highlights: string[]
    recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no'
  }
}

export class FirstInterviewAgent extends BaseAgent {
  name = 'First Interview Agent'
  description = 'Conducts automated first-round video interviews with candidates using AI'

  async execute(context: AgentContext): Promise<AgentResult> {
    try {
      context.logger.info('Starting first interview process')

      // Validate input
      this.validateInput(context.input, [
        'candidate_id',
        'candidate_name',
        'candidate_email',
        'job_id',
        'job_title',
      ])

      const input = context.input as FirstInterviewInput

      // Step 1: Generate interview questions
      context.logger.info('Generating interview questions')
      const questions = await this.generateQuestions(input, context)

      // Step 2: Create D-ID interview session
      context.logger.info('Creating AI interviewer session')
      const interviewSession = await this.createInterviewSession(input, questions, context)

      // Step 3: Send invitation email to candidate
      context.logger.info('Sending interview invitation')
      await this.sendInterviewInvitation(input, interviewSession, context)

      // Step 4: Schedule follow-up job to check completion
      context.logger.info('Scheduling follow-up check')
      await this.scheduleFollowUp(interviewSession.interview_id, context)

      const result: InterviewResult = {
        candidate_id: input.candidate_id,
        interview_id: interviewSession.interview_id,
        status: 'scheduled',
        scheduled_at: new Date().toISOString(),
        video_url: interviewSession.interview_url,
      }

      context.logger.info('First interview scheduled successfully', { interview_id: result.interview_id })

      return this.success(result)
    } catch (error) {
      return this.handleError(error, context)
    }
  }

  /**
   * Generate tailored interview questions based on job requirements
   */
  private async generateQuestions(
    input: FirstInterviewInput,
    context: AgentContext
  ): Promise<InterviewQuestion[]> {
    // Use custom questions if provided, otherwise generate default set
    if (input.questions && input.questions.length > 0) {
      return input.questions.map((q) => ({
        question: q,
        category: 'skills',
        duration_seconds: 90,
      }))
    }

    // Default first-round interview questions
    const defaultQuestions: InterviewQuestion[] = [
      {
        question: `Tell me about yourself and why you're interested in the ${input.job_title} position.`,
        category: 'background',
        duration_seconds: 120,
      },
      {
        question: 'What relevant experience do you have for this role?',
        category: 'skills',
        duration_seconds: 120,
      },
      {
        question: 'Why do you want to work with our company?',
        category: 'motivation',
        duration_seconds: 90,
      },
      {
        question: 'What are your salary expectations for this position?',
        category: 'background',
        duration_seconds: 60,
      },
      {
        question: 'When would you be available to start if selected?',
        category: 'availability',
        duration_seconds: 30,
      },
    ]

    // TODO: In production, call AI API to generate custom questions based on job description
    // const aiQuestions = await this.callAIQuestionGenerator(input.job_id)

    return defaultQuestions
  }

  /**
   * Create D-ID AI interviewer session
   */
  private async createInterviewSession(
    input: FirstInterviewInput,
    questions: InterviewQuestion[],
    context: AgentContext
  ): Promise<{ interview_id: string; interview_url: string }> {
    // TODO: Integrate with D-ID API
    // For now, return mock data

    const interviewId = `int_${crypto.randomUUID()}`
    const interviewUrl = `https://zalpha.ai/interview/${interviewId}`

    context.logger.debug('Created interview session', {
      interview_id: interviewId,
      questions_count: questions.length,
    })

    // Store interview session in database
    // await supabase.from('interview_sessions').insert({ ... })

    return {
      interview_id: interviewId,
      interview_url: interviewUrl,
    }
  }

  /**
   * Send email invitation to candidate
   */
  private async sendInterviewInvitation(
    input: FirstInterviewInput,
    session: { interview_id: string; interview_url: string },
    context: AgentContext
  ): Promise<void> {
    const emailContent = {
      to: input.candidate_email,
      subject: `First Round Interview - ${input.job_title}`,
      body: `
Hi ${input.candidate_name},

Thank you for applying to the ${input.job_title} position!

We'd like to invite you to complete a first-round video interview. This will be conducted by our AI interviewer, Zal, and should take approximately 10-15 minutes.

You can complete the interview at your convenience within the next 48 hours:
${session.interview_url}

The interview will cover:
- Your background and experience
- Your interest in the role
- Your availability and expectations

Tips for success:
- Find a quiet, well-lit space
- Test your camera and microphone
- Be yourself and speak clearly

If you have any questions, feel free to reply to this email.

Best regards,
The ZALPHA Recruiting Team
      `,
    }

    // TODO: Integrate with email service
    context.logger.debug('Sending invitation email', { to: input.candidate_email })

    // Mock email send
    console.log('Email sent:', emailContent)
  }

  /**
   * Schedule a follow-up job to check if interview is completed
   */
  private async scheduleFollowUp(interviewId: string, context: AgentContext): Promise<void> {
    // TODO: Create a new agent job to check interview completion after 48 hours
    context.logger.debug('Follow-up scheduled', {
      interview_id: interviewId,
      check_after: '48 hours',
    })
  }

  /**
   * Analyze completed interview (called by follow-up agent)
   */
  async analyzeInterview(interviewId: string): Promise<InterviewResult['analysis']> {
    // TODO: Call AI analysis service to evaluate:
    // - Video/audio quality
    // - Response content
    // - Communication skills
    // - Enthusiasm and fit

    // Mock analysis for now
    return {
      overall_score: 75,
      communication_score: 80,
      enthusiasm_score: 85,
      qualification_score: 65,
      red_flags: [],
      highlights: ['Strong communication skills', 'Relevant experience mentioned'],
      recommendation: 'yes',
    }
  }
}
