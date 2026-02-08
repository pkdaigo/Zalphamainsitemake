/**
 * HeyGen API Routes for ZALPHA Platform
 * Handles all AI video avatar functionality using HeyGen
 */

import type { Context } from "npm:hono@4";
import * as heygenIntegration from "./heygen-integration.tsx";
import * as kv from "./kv_store.tsx";

/**
 * ============================================================================
 * VIDEO CREATION ENDPOINTS
 * ============================================================================
 */

/**
 * POST /heygen/videos/create
 * Creates a new HeyGen video
 */
export async function createVideo(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { 
      videoType, 
      script, 
      avatarId, 
      voiceId, 
      companyName, 
      tutorialTitle, 
      tutorialCategory, 
      organizationName 
    } = body;

    if (!script || script.trim() === '') {
      return c.json({ error: 'Script is required' }, 400);
    }

    // Validate that avatarId is provided and not empty
    if (!avatarId || avatarId.trim() === '') {
      return c.json({ 
        error: 'Avatar ID is required. Please select an avatar from your HeyGen account first.',
        hint: 'Use the "List Available Avatars" button to load and select an avatar before creating a video.'
      }, 400);
    }

    let video;
    
    // Create different types of videos based on use case
    switch (videoType) {
      case 'zee':
        // Zee AI career assistant
        video = await heygenIntegration.createZeeVideo(script, avatarId);
        break;
        
      case 'recruiter':
        // Employer/recruiter video
        if (!companyName) {
          return c.json({ error: 'Company name required for recruiter video' }, 400);
        }
        video = await heygenIntegration.createRecruiterVideo(companyName, script, avatarId);
        break;
        
      case 'career-fair':
        // Career fair booth video
        if (!organizationName) {
          return c.json({ error: 'Organization name required for career fair video' }, 400);
        }
        video = await heygenIntegration.createCareerFairVideo(organizationName, script, avatarId);
        break;
        
      case 'tutorial':
        // Educational tutorial video
        if (!tutorialTitle || !tutorialCategory) {
          return c.json({ error: 'Tutorial title and category are required for tutorial video' }, 400);
        }
        video = await heygenIntegration.createTutorialVideo({
          title: tutorialTitle,
          script: script,
          category: tutorialCategory,
        }, avatarId);
        break;
        
      case 'custom':
      default:
        // Custom video with specified avatar and voice
        // Avatar ID is REQUIRED for custom videos
        if (!avatarId) {
          return c.json({ 
            error: 'Avatar ID is required. Please select an avatar from your HeyGen account first.',
            hint: 'Use the /heygen/avatars endpoint to list available avatars.'
          }, 400);
        }
        
        video = await heygenIntegration.createVideo({
          character: {
            type: 'avatar',
            avatar_id: avatarId,
            avatar_style: 'normal',
          },
          voice: {
            type: 'text',
            input_text: script,
            voice_id: voiceId || '1bd001e7e50f421d891986aad5158bc8',
          },
          background: {
            type: 'color',
            value: '#006B7D', // ZALPHA Ocean Professional
          },
          test: false,
          caption: true,
        });
    }

    // Store video info in KV store for tracking
    await kv.set(`heygen_video:${video.video_id}`, {
      video_id: video.video_id,
      type: videoType || 'custom',
      script: script,
      avatarId: avatarId,
      voiceId: voiceId,
      createdAt: new Date().toISOString(),
      status: video.status,
    });

    return c.json({ success: true, video });
  } catch (error: any) {
    // Provide user-friendly error messages
    console.error('❌ HeyGen video creation error (full details):', error);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    if (error.message?.includes('Unauthorized') || error.message?.includes('invalid') || error.message?.includes('expired')) {
      console.warn('⚠️ HeyGen API key issue. Please verify your HEYGEN_API_KEY environment variable is valid.');
      return c.json({ 
        error: 'HeyGen service unavailable. Please contact support or use alternative features.', 
        details: error.message 
      }, 503);
    }
    
    console.error('❌ HeyGen video creation error:', error.message);
    return c.json({ 
      error: 'Failed to create HeyGen video. Please try again later.', 
      details: error.message,
      fullError: String(error)
    }, 500);
  }
}

/**
 * GET /heygen/videos/:videoId/status
 * Gets the status of a HeyGen video
 */
export async function getVideoStatus(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const videoId = c.req.param('videoId');
    const status = await heygenIntegration.getVideoStatus(videoId);

    // Update KV store with latest status
    const videoData = await kv.get(`heygen_video:${videoId}`);
    if (videoData) {
      await kv.set(`heygen_video:${videoId}`, {
        ...videoData,
        status: status.status,
        video_url: status.video_url,
        thumbnail_url: status.thumbnail_url,
        duration: status.duration,
        updatedAt: new Date().toISOString(),
      });
    }

    return c.json({ success: true, status });
  } catch (error: any) {
    console.error('HeyGen video status error:', error);
    return c.json({ error: error.message || 'Failed to fetch video status' }, 500);
  }
}

/**
 * ============================================================================
 * TALKING PHOTO ENDPOINTS
 * ============================================================================
 */

/**
 * POST /heygen/talking-photo/create
 * Creates a talking photo from a user's image
 */
export async function createTalkingPhoto(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { imageUrl, script, voiceId } = body;

    if (!imageUrl || !script) {
      return c.json({ error: 'Image URL and script are required' }, 400);
    }

    const video = await heygenIntegration.createTalkingPhoto(imageUrl, script, voiceId);

    // Store in KV store
    await kv.set(`heygen_talking_photo:${video.video_id}`, {
      video_id: video.video_id,
      imageUrl: imageUrl,
      script: script,
      voiceId: voiceId,
      createdAt: new Date().toISOString(),
      status: video.status,
    });

    return c.json({ success: true, video });
  } catch (error: any) {
    console.error('HeyGen talking photo error:', error);
    return c.json({ error: error.message || 'Failed to create talking photo' }, 500);
  }
}

/**
 * ============================================================================
 * STREAMING AVATARS (Real-time Interactive)
 * ============================================================================
 */

/**
 * POST /heygen/streaming/create
 * Creates a new streaming avatar session
 */
export async function createStreamingSession(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { avatarId, voiceId } = body;

    const session = await heygenIntegration.createStreamingSession(avatarId, voiceId);

    // Store session info
    await kv.set(`heygen_streaming:${session.session_id}`, {
      session_id: session.session_id,
      avatarId: avatarId,
      voiceId: voiceId,
      createdAt: new Date().toISOString(),
      active: true,
    });

    return c.json({ success: true, session });
  } catch (error: any) {
    console.error('HeyGen streaming session error:', error);
    return c.json({ error: error.message || 'Failed to create streaming session' }, 500);
  }
}

/**
 * POST /heygen/streaming/:sessionId/message
 * Sends a message to a streaming avatar
 */
export async function sendStreamingMessage(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const sessionId = c.req.param('sessionId');
    const body = await c.req.json();
    const { text } = body;

    if (!text) {
      return c.json({ error: 'Text message is required' }, 400);
    }

    await heygenIntegration.sendStreamingMessage(sessionId, text);

    return c.json({ success: true, message: 'Message sent successfully' });
  } catch (error: any) {
    console.error('HeyGen streaming message error:', error);
    return c.json({ error: error.message || 'Failed to send message' }, 500);
  }
}

/**
 * POST /heygen/streaming/:sessionId/stop
 * Stops a streaming avatar session
 */
export async function stopStreamingSession(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const sessionId = c.req.param('sessionId');
    
    await heygenIntegration.stopStreamingSession(sessionId);

    // Update KV store
    const sessionData = await kv.get(`heygen_streaming:${sessionId}`);
    if (sessionData) {
      await kv.set(`heygen_streaming:${sessionId}`, {
        ...sessionData,
        active: false,
        stoppedAt: new Date().toISOString(),
      });
    }

    return c.json({ success: true, message: 'Streaming session stopped' });
  } catch (error: any) {
    console.error('HeyGen streaming stop error:', error);
    return c.json({ error: error.message || 'Failed to stop streaming session' }, 500);
  }
}

/**
 * ============================================================================
 * AVATAR & VOICE LISTING ENDPOINTS
 * ============================================================================
 */

/**
 * GET /heygen/avatars
 * Lists all available HeyGen avatars
 */
export async function listAvatars(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const avatars = await heygenIntegration.listAvatars();

    return c.json({ success: true, avatars });
  } catch (error: any) {
    console.error('HeyGen avatars list error:', error);
    return c.json({ error: error.message || 'Failed to list avatars' }, 500);
  }
}

/**
 * GET /heygen/voices
 * Lists all available HeyGen voices
 */
export async function listVoices(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const voices = await heygenIntegration.listVoices();

    return c.json({ success: true, voices });
  } catch (error: any) {
    console.error('HeyGen voices list error:', error);
    return c.json({ error: error.message || 'Failed to list voices' }, 500);
  }
}

/**
 * GET /heygen/recommended
 * Gets recommended avatars and voices for ZALPHA use cases
 */
export async function getRecommended(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const avatars = heygenIntegration.getRecommendedAvatars();
    const voices = heygenIntegration.getRecommendedVoices();

    return c.json({
      success: true,
      recommended: {
        avatars,
        voices,
      },
    });
  } catch (error: any) {
    console.error('HeyGen recommended error:', error);
    return c.json({ error: error.message || 'Failed to get recommendations' }, 500);
  }
}

/**
 * ============================================================================
 * WEBHOOK HANDLER
 * ============================================================================
 */

/**
 * POST /heygen/webhook
 * Handles HeyGen webhook notifications
 */
export async function handleWebhook(c: Context) {
  try {
    const body = await c.req.json();
    
    console.log('HeyGen webhook received:', body);
    
    // Process the webhook
    heygenIntegration.handleWebhook(body);

    // Update KV store with video status
    if (body.video_id) {
      const videoData = await kv.get(`heygen_video:${body.video_id}`);
      if (videoData) {
        await kv.set(`heygen_video:${body.video_id}`, {
          ...videoData,
          status: body.event_type === 'video.success' ? 'completed' : 'failed',
          video_url: body.video_url,
          thumbnail_url: body.thumbnail_url,
          error_message: body.error_message,
          webhookReceivedAt: new Date().toISOString(),
        });
      }
    }

    return c.json({ success: true, message: 'Webhook processed' });
  } catch (error: any) {
    console.error('HeyGen webhook error:', error);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
}