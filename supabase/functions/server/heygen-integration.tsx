/**
 * HeyGen API Integration
 * Provides AI-powered video avatars for ZALPHA platform
 * Documentation: https://docs.heygen.com/
 */

const HEYGEN_API_KEY = Deno.env.get('HEYGEN_API_KEY');
const HEYGEN_BASE_URL = 'https://api.heygen.com';

/**
 * Helper function to get authorization headers
 * HeyGen uses simple API key authentication
 */
function getAuthHeaders(): Record<string, string> {
  if (!HEYGEN_API_KEY) {
    throw new Error('HeyGen API key not configured. Please set HEYGEN_API_KEY environment variable.');
  }
  
  return {
    'x-api-key': HEYGEN_API_KEY,
    'Content-Type': 'application/json',
  };
}

/**
 * ============================================================================
 * AVATAR VIDEOS - Create AI Avatar Videos
 * ============================================================================
 */

export interface VideoInput {
  character: {
    type: 'avatar' | 'talking_photo';
    avatar_id?: string;
    avatar_style?: string;
  };
  voice: {
    type: 'text';
    input_text: string;
    voice_id?: string;
    speed?: number;
  };
  background?: {
    type: 'color' | 'image' | 'video';
    value?: string;
    url?: string;
  };
  test?: boolean;
  caption?: boolean;
  dimension?: {
    width: number;
    height: number;
  };
}

export interface VideoResponse {
  video_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  video_url?: string;
  thumbnail_url?: string;
  duration?: number;
  created_at: number;
}

/**
 * Creates an AI avatar video
 * @param input - Video configuration including avatar, voice, and script
 */
export async function createVideo(input: VideoInput): Promise<VideoResponse> {
  if (!HEYGEN_API_KEY) {
    console.warn('⚠️ HeyGen API key not configured. Video avatar features will be disabled.');
    throw new Error('HeyGen API key not configured. Please add your HeyGen API key to continue.');
  }

  console.log('🎬 Creating HeyGen video with API key:', HEYGEN_API_KEY.substring(0, 10) + '...');

  try {
    const requestBody = {
      video_inputs: [input],
      test: input.test || false,
      caption: input.caption || false,
      dimension: input.dimension || { width: 1920, height: 1080 },
    };
    
    console.log('📤 HeyGen request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(`${HEYGEN_BASE_URL}/v2/video/generate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      console.error('HeyGen video creation error:', errorData);
      console.error('Response status:', response.status);
      console.error('Response headers:', response.headers);
      
      if (response.status === 401) {
        throw new Error('HeyGen API key is invalid or expired. Please check your HEYGEN_API_KEY environment variable.');
      }
      
      throw new Error(`Failed to create HeyGen video: ${errorData.error?.message || errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ HeyGen video created successfully:', data.data?.video_id);
    return {
      video_id: data.data?.video_id,
      status: 'pending',
      created_at: Date.now(),
    };
  } catch (error) {
    console.error('❌ Error creating HeyGen video:', error);
    throw error;
  }
}

/**
 * Gets the status and details of a video
 * @param videoId - The video ID to check
 */
export async function getVideoStatus(videoId: string): Promise<VideoResponse> {
  if (!HEYGEN_API_KEY) {
    throw new Error('HeyGen API key not configured.');
  }

  try {
    const response = await fetch(`${HEYGEN_BASE_URL}/v1/video_status.get?video_id=${videoId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      console.error('HeyGen video status error:', errorData);
      throw new Error(`Failed to get video status: ${errorData.error?.message || errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      video_id: videoId,
      status: data.data?.status || 'pending',
      video_url: data.data?.video_url,
      thumbnail_url: data.data?.thumbnail_url,
      duration: data.data?.duration,
      created_at: data.data?.created_at,
    };
  } catch (error) {
    console.error('Error fetching HeyGen video status:', error);
    throw error;
  }
}

/**
 * ============================================================================
 * AVATARS - List Available Avatars
 * ============================================================================
 */

export interface Avatar {
  avatar_id: string;
  avatar_name: string;
  gender: string;
  preview_image_url: string;
  preview_video_url?: string;
}

/**
 * Lists all available avatars
 */
export async function listAvatars(): Promise<Avatar[]> {
  if (!HEYGEN_API_KEY) {
    throw new Error('HeyGen API key not configured.');
  }

  try {
    const response = await fetch(`${HEYGEN_BASE_URL}/v2/avatars`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Failed to list avatars: ${errorData.error?.message || errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data.data?.avatars || [];
  } catch (error) {
    console.error('Error listing HeyGen avatars:', error);
    throw error;
  }
}

/**
 * ============================================================================
 * VOICES - List Available Voices
 * ============================================================================
 */

export interface Voice {
  voice_id: string;
  language: string;
  gender: string;
  name: string;
  preview_audio?: string;
}

/**
 * Lists all available voices
 */
export async function listVoices(): Promise<Voice[]> {
  if (!HEYGEN_API_KEY) {
    throw new Error('HeyGen API key not configured.');
  }

  try {
    const response = await fetch(`${HEYGEN_BASE_URL}/v2/voices`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Failed to list voices: ${errorData.error?.message || errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data.data?.voices || [];
  } catch (error) {
    console.error('Error listing HeyGen voices:', error);
    throw error;
  }
}

/**
 * ============================================================================
 * ZALPHA-SPECIFIC HELPERS
 * ============================================================================
 */

/**
 * Creates a Zee AI career assistant video
 * @param script - What Zee should say
 * @param avatarId - Optional specific avatar ID (REQUIRED - must be from your HeyGen account)
 */
export async function createZeeVideo(
  script: string,
  avatarId?: string
): Promise<VideoResponse> {
  // Avatar ID is now REQUIRED - no default avatar
  if (!avatarId) {
    throw new Error('Avatar ID is required. Please select an avatar from your HeyGen account first by calling the /heygen/avatars endpoint.');
  }
  
  const videoInput: VideoInput = {
    character: {
      type: 'avatar',
      avatar_id: avatarId,
      avatar_style: 'normal',
    },
    voice: {
      type: 'text',
      input_text: script,
      voice_id: '1bd001e7e50f421d891986aad5158bc8', // Professional female voice
    },
    background: {
      type: 'color',
      value: '#006B7D', // ZALPHA Ocean Professional primary color
    },
    test: false,
    caption: true,
    dimension: {
      width: 1920,
      height: 1080,
    },
  };

  return createVideo(videoInput);
}

/**
 * Creates a recruiter/employer video message
 * @param companyName - Name of the company
 * @param script - What the recruiter should say
 * @param avatarId - REQUIRED specific avatar ID from your HeyGen account
 */
export async function createRecruiterVideo(
  companyName: string,
  script: string,
  avatarId?: string
): Promise<VideoResponse> {
  // Avatar ID is now REQUIRED - no default avatar
  if (!avatarId) {
    throw new Error('Avatar ID is required. Please select an avatar from your HeyGen account first by calling the /heygen/avatars endpoint.');
  }
  
  const videoInput: VideoInput = {
    character: {
      type: 'avatar',
      avatar_id: avatarId,
      avatar_style: 'normal',
    },
    voice: {
      type: 'text',
      input_text: script,
      voice_id: '2d5b0e6cf36f460aa7fc47e3eee4ba54', // Professional male voice
    },
    background: {
      type: 'color',
      value: '#FFFFFF', // Clean white background
    },
    test: false,
    caption: true,
    dimension: {
      width: 1920,
      height: 1080,
    },
  };

  return createVideo(videoInput);
}

/**
 * Creates a career fair booth video
 * @param organizationName - Name of the organization
 * @param script - Welcome message or booth information
 * @param avatarId - REQUIRED specific avatar ID from your HeyGen account
 */
export async function createCareerFairVideo(
  organizationName: string,
  script: string,
  avatarId?: string
): Promise<VideoResponse> {
  // Avatar ID is now REQUIRED - no default avatar
  if (!avatarId) {
    throw new Error('Avatar ID is required. Please select an avatar from your HeyGen account first by calling the /heygen/avatars endpoint.');
  }
  
  const videoInput: VideoInput = {
    character: {
      type: 'avatar',
      avatar_id: avatarId,
      avatar_style: 'normal',
    },
    voice: {
      type: 'text',
      input_text: script,
      voice_id: '1bd001e7e50f421d891986aad5158bc8',
    },
    background: {
      type: 'color',
      value: '#006B7D', // ZALPHA branding
    },
    test: false,
    caption: true,
    dimension: {
      width: 1920,
      height: 1080,
    },
  };

  return createVideo(videoInput);
}

/**
 * Creates a tutorial/educational video
 * @param tutorialInfo - Tutorial details
 * @param avatarId - REQUIRED specific avatar ID from your HeyGen account
 */
export async function createTutorialVideo(
  tutorialInfo: {
    title: string;
    script: string;
    category: string;
  },
  avatarId?: string
): Promise<VideoResponse> {
  // Avatar ID is now REQUIRED - no default avatar
  if (!avatarId) {
    throw new Error('Avatar ID is required. Please select an avatar from your HeyGen account first by calling the /heygen/avatars endpoint.');
  }
  
  const videoInput: VideoInput = {
    character: {
      type: 'avatar',
      avatar_id: avatarId,
      avatar_style: 'normal',
    },
    voice: {
      type: 'text',
      input_text: tutorialInfo.script,
      voice_id: '1bd001e7e50f421d891986aad5158bc8',
      speed: 1.0, // Normal speed for educational content
    },
    background: {
      type: 'color',
      value: '#006B7D',
    },
    test: false,
    caption: true, // Always show captions for tutorials
    dimension: {
      width: 1920,
      height: 1080,
    },
  };

  return createVideo(videoInput);
}

/**
 * ============================================================================
 * TALKING PHOTO - Convert Photos to Talking Avatars
 * ============================================================================
 */

export interface TalkingPhotoInput {
  image_url: string;
  voice: {
    type: 'text';
    input_text: string;
    voice_id?: string;
  };
  test?: boolean;
  caption?: boolean;
}

/**
 * Creates a talking photo from a user's image
 * Perfect for personalized messages from employers or students
 */
export async function createTalkingPhoto(
  imageUrl: string,
  script: string,
  voiceId?: string
): Promise<VideoResponse> {
  if (!HEYGEN_API_KEY) {
    throw new Error('HeyGen API key not configured.');
  }

  try {
    const input: TalkingPhotoInput = {
      image_url: imageUrl,
      voice: {
        type: 'text',
        input_text: script,
        voice_id: voiceId || '1bd001e7e50f421d891986aad5158bc8',
      },
      test: false,
      caption: true,
    };

    const response = await fetch(`${HEYGEN_BASE_URL}/v2/video/generate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        video_inputs: [{
          character: {
            type: 'talking_photo',
            talking_photo_url: imageUrl,
          },
          voice: input.voice,
        }],
        test: input.test || false,
        caption: input.caption || false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Failed to create talking photo: ${errorData.error?.message || errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Talking photo created successfully:', data.data?.video_id);
    return {
      video_id: data.data?.video_id,
      status: 'pending',
      created_at: Date.now(),
    };
  } catch (error) {
    console.error('Error creating talking photo:', error);
    throw error;
  }
}

/**
 * ============================================================================
 * STREAMING AVATARS (Real-time Interactive Avatars)
 * ============================================================================
 */

export interface StreamingSession {
  session_id: string;
  ice_servers?: any[];
  sdp?: any;
  url?: string;
}

/**
 * Creates a new streaming avatar session for real-time interaction
 * Perfect for: Live chat with Zee, interactive career counseling
 */
export async function createStreamingSession(
  avatarId?: string,
  voiceId?: string
): Promise<StreamingSession> {
  if (!HEYGEN_API_KEY) {
    throw new Error('HeyGen API key not configured.');
  }

  try {
    const response = await fetch(`${HEYGEN_BASE_URL}/v1/streaming.new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        avatar_id: avatarId || 'josh_lite3_20230714', // Public avatar
        voice_id: voiceId || '1bd001e7e50f421d891986aad5158bc8',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Failed to create streaming session: ${errorData.error?.message || errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Streaming session created:', data.data?.session_id);
    return {
      session_id: data.data?.session_id,
      ice_servers: data.data?.ice_servers,
      sdp: data.data?.sdp,
    };
  } catch (error) {
    console.error('Error creating streaming session:', error);
    throw error;
  }
}

/**
 * Sends a message to a streaming avatar
 */
export async function sendStreamingMessage(
  sessionId: string,
  text: string
): Promise<void> {
  if (!HEYGEN_API_KEY) {
    throw new Error('HeyGen API key not configured.');
  }

  try {
    const response = await fetch(`${HEYGEN_BASE_URL}/v1/streaming.task`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        session_id: sessionId,
        text: text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Failed to send streaming message: ${errorData.error?.message || errorData.message || response.statusText}`);
    }

    console.log('Streaming message sent successfully');
  } catch (error) {
    console.error('Error sending streaming message:', error);
    throw error;
  }
}

/**
 * Stops a streaming avatar session
 */
export async function stopStreamingSession(sessionId: string): Promise<void> {
  if (!HEYGEN_API_KEY) {
    throw new Error('HeyGen API key not configured.');
  }

  try {
    const response = await fetch(`${HEYGEN_BASE_URL}/v1/streaming.stop`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        session_id: sessionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Failed to stop streaming session: ${errorData.error?.message || errorData.message || response.statusText}`);
    }

    console.log('Streaming session stopped:', sessionId);
  } catch (error) {
    console.error('Error stopping streaming session:', error);
    throw error;
  }
}

/**
 * ============================================================================
 * WEBHOOKS - Get notifications when videos are ready
 * ============================================================================
 */

export interface WebhookEvent {
  event_type: 'video.success' | 'video.fail';
  video_id: string;
  video_url?: string;
  thumbnail_url?: string;
  error_message?: string;
}

/**
 * Handles HeyGen webhook events
 * Call this from your webhook endpoint
 */
export function handleWebhook(payload: WebhookEvent): void {
  console.log('HeyGen webhook received:', payload.event_type, payload.video_id);
  
  switch (payload.event_type) {
    case 'video.success':
      console.log('✅ Video completed successfully:', payload.video_id);
      console.log('Video URL:', payload.video_url);
      // You can add database updates here to mark video as completed
      break;
      
    case 'video.fail':
      console.error('❌ Video generation failed:', payload.video_id);
      console.error('Error:', payload.error_message);
      // You can add database updates here to mark video as failed
      break;
      
    default:
      console.warn('Unknown webhook event type:', payload.event_type);
  }
}

/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 */

/**
 * Polls a video until it's completed or failed
 * Returns the final video URL
 */
export async function waitForVideoCompletion(
  videoId: string,
  maxWaitTimeMs: number = 300000, // 5 minutes default
  pollIntervalMs: number = 5000 // Check every 5 seconds
): Promise<string> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWaitTimeMs) {
    const status = await getVideoStatus(videoId);
    
    if (status.status === 'completed' && status.video_url) {
      console.log('✅ Video completed:', status.video_url);
      return status.video_url;
    }
    
    if (status.status === 'failed') {
      throw new Error(`Video generation failed for video ID: ${videoId}`);
    }
    
    // Still processing, wait and try again
    await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
  }
  
  throw new Error(`Video generation timed out after ${maxWaitTimeMs}ms for video ID: ${videoId}`);
}

/**
 * Gets a list of recommended avatars for ZALPHA use cases
 */
export function getRecommendedAvatars(): {
  zee: string;
  recruiter_male: string;
  recruiter_female: string;
  tutor: string;
} {
  return {
    zee: 'josh_lite3_20230714', // Professional, friendly - public avatar
    recruiter_male: 'Wayne_20240711', // Professional male
    recruiter_female: 'Susan_public_3_20240328', // Professional female - public avatar
    tutor: 'josh_lite3_20230714', // Clear, instructional - public avatar
  };
}

/**
 * Gets a list of recommended voices for ZALPHA use cases
 */
export function getRecommendedVoices(): {
  zee: string;
  recruiter_male: string;
  recruiter_female: string;
  tutor: string;
} {
  return {
    zee: '1bd001e7e50f421d891986aad5158bc8', // Professional female
    recruiter_male: '2d5b0e6cf36f460aa7fc47e3eee4ba54', // Professional male
    recruiter_female: '1bd001e7e50f421d891986aad5158bc8', // Professional female
    tutor: '1bd001e7e50f421d891986aad5158bc8', // Clear, instructional female
  };
}