/**
 * HeyGen AI Avatar Example Component
 * Demonstrates how to use HeyGen video avatars in ZALPHA
 */

import { useState } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface VideoStatus {
  video_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  video_url?: string;
  thumbnail_url?: string;
  duration?: number;
}

interface Avatar {
  avatar_id: string;
  avatar_name: string;
  gender: string;
  preview_image_url: string;
  preview_video_url?: string;
}

export function HeyGenExample() {
  const [script, setScript] = useState('Hello! Welcome to ZALPHA, the premier job connection platform for Pacific Island students and graduates. I\'m here to help you navigate your career journey!');
  const [videoType, setVideoType] = useState<'zee' | 'recruiter' | 'career-fair' | 'tutorial' | 'custom'>('zee');
  const [loading, setLoading] = useState(false);
  const [videoStatus, setVideoStatus] = useState<VideoStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loadingAvatars, setLoadingAvatars] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  
  // Additional fields for specific video types
  const [companyName, setCompanyName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [tutorialTitle, setTutorialTitle] = useState('');
  const [tutorialCategory, setTutorialCategory] = useState('');

  // NEW: Function to list available avatars
  const listAvailableAvatars = async () => {
    setLoadingAvatars(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859/heygen/avatars`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Full error response:', data);
        throw new Error(data.details || data.error || 'Failed to list avatars');
      }

      console.log('✅ Avatars loaded:', data.avatars);
      setAvatars(data.avatars || []);
    } catch (err: any) {
      console.error('❌ Error listing avatars:', err);
      setError(err.message || 'Failed to list avatars');
    } finally {
      setLoadingAvatars(false);
    }
  };

  const createVideo = async () => {
    // Double-check avatar is selected before making API call
    if (!selectedAvatar || !selectedAvatar.trim()) {
      setError('Please select an avatar before creating a video. Click "List Available Avatars" to see your options.');
      return;
    }

    setLoading(true);
    setError(null);
    setVideoStatus(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859/heygen/videos/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            videoType,
            script,
            avatarId: selectedAvatar, // Always send it now that we've validated
            // Add additional fields for specific video types
            ...(videoType === 'recruiter' && { companyName }),
            ...(videoType === 'career-fair' && { organizationName }),
            ...(videoType === 'tutorial' && { tutorialTitle, tutorialCategory }),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Full error response:', data);
        throw new Error(data.details || data.error || 'Failed to create video');
      }

      console.log('✅ Video created successfully:', data.video);
      setVideoStatus(data.video);

      // Start polling for video status
      pollVideoStatus(data.video.video_id);
    } catch (err: any) {
      console.error('❌ Error creating video:', err);
      setError(err.message || 'Failed to create video');
    } finally {
      setLoading(false);
    }
  };

  const pollVideoStatus = async (videoId: string) => {
    const maxAttempts = 60; // 5 minutes (5 seconds * 60)
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859/heygen/videos/${videoId}/status`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          setVideoStatus(data.status);

          if (data.status.status === 'completed') {
            console.log('✅ Video completed:', data.status.video_url);
            return; // Stop polling
          }

          if (data.status.status === 'failed') {
            setError('Video generation failed');
            return; // Stop polling
          }

          // Continue polling if still processing
          if (data.status.status === 'processing' || data.status.status === 'pending') {
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(poll, 5000); // Poll every 5 seconds
            } else {
              setError('Video generation timed out');
            }
          }
        }
      } catch (err: any) {
        console.error('Error polling video status:', err);
        setError('Failed to check video status');
      }
    };

    poll();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#006B7D]">
        <h2 className="text-2xl font-bold text-[#006B7D] mb-4">
          🎬 HeyGen AI Video Avatar Demo
        </h2>
        <p className="text-gray-600 mb-6">
          Create professional AI-powered video avatars for ZALPHA platform
        </p>

        {/* NEW: Avatar List Button */}
        <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">
            ⚠️ Avatar Configuration Required
          </h3>
          <p className="text-yellow-800 text-sm mb-3">
            Before creating videos, you need to select a valid avatar from your HeyGen account.
          </p>
          <button
            onClick={listAvailableAvatars}
            disabled={loadingAvatars}
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loadingAvatars ? '🔄 Loading Avatars...' : '📋 List Available Avatars'}
          </button>
        </div>

        {/* Avatar Selection */}
        {avatars.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              ✅ Available Avatars ({avatars.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {avatars.map((avatar) => (
                <button
                  key={avatar.avatar_id}
                  onClick={() => setSelectedAvatar(avatar.avatar_id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedAvatar === avatar.avatar_id
                      ? 'border-[#006B7D] bg-[#006B7D]/10 ring-2 ring-[#006B7D]'
                      : 'border-gray-200 hover:border-[#006B7D]/50'
                  }`}
                >
                  <img
                    src={avatar.preview_image_url}
                    alt={avatar.avatar_name}
                    className="w-full aspect-square object-cover rounded-md mb-2"
                  />
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {avatar.avatar_name}
                  </p>
                  <p className="text-xs text-gray-500">{avatar.gender}</p>
                  <code className="text-[10px] text-gray-400 block mt-1 truncate">
                    {avatar.avatar_id}
                  </code>
                </button>
              ))}
            </div>
            {selectedAvatar && (
              <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ Selected Avatar: <code className="font-mono font-bold">{selectedAvatar}</code>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Video Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Type
          </label>
          <select
            value={videoType}
            onChange={(e) => setVideoType(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006B7D] focus:border-transparent"
          >
            <option value="zee">Zee AI Career Assistant</option>
            <option value="recruiter">Recruiter/Employer Video</option>
            <option value="career-fair">Career Fair Booth Video</option>
            <option value="tutorial">Tutorial/Educational Video</option>
            <option value="custom">Custom Video</option>
          </select>
        </div>

        {/* Script Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Script (What should the avatar say?)
          </label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006B7D] focus:border-transparent resize-none"
            placeholder="Enter the script for your AI avatar..."
          />
          <p className="text-sm text-gray-500 mt-1">
            {script.length} characters
          </p>
        </div>

        {/* Additional Fields for Specific Video Types */}
        {videoType === 'recruiter' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006B7D] focus:border-transparent"
              placeholder="Enter the company name..."
            />
          </div>
        )}

        {videoType === 'career-fair' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name
            </label>
            <input
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006B7D] focus:border-transparent"
              placeholder="Enter the organization name..."
            />
          </div>
        )}

        {videoType === 'tutorial' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tutorial Title
              </label>
              <input
                value={tutorialTitle}
                onChange={(e) => setTutorialTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006B7D] focus:border-transparent"
                placeholder="Enter the tutorial title..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tutorial Category
              </label>
              <input
                value={tutorialCategory}
                onChange={(e) => setTutorialCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006B7D] focus:border-transparent"
                placeholder="Enter the tutorial category..."
              />
            </div>
          </>
        )}

        {/* Create Video Button */}
        <button
          onClick={createVideo}
          disabled={loading || !script.trim() || !selectedAvatar}
          className="w-full bg-[#006B7D] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#005666] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '🎬 Creating Video...' : 
           !selectedAvatar ? '⚠️ Select an Avatar First' : 
           '✨ Create HeyGen Video'}
        </button>

        {/* Warning if no avatar selected */}
        {!selectedAvatar && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ Please select an avatar from the list above before creating a video
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">❌ Error</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Video Status Display */}
        {videoStatus && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg border-2 border-[#006B7D]">
            <h3 className="text-lg font-semibold text-[#006B7D] mb-4">
              Video Status
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Video ID:</span>
                <span className="text-gray-600 font-mono text-sm">
                  {videoStatus.video_id}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  videoStatus.status === 'completed' ? 'bg-green-100 text-green-800' :
                  videoStatus.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  videoStatus.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {videoStatus.status === 'completed' ? '✅ Completed' :
                   videoStatus.status === 'processing' ? '⏳ Processing...' :
                   videoStatus.status === 'pending' ? '⏳ Pending...' :
                   '❌ Failed'}
                </span>
              </div>

              {videoStatus.duration && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Duration:</span>
                  <span className="text-gray-600">{videoStatus.duration}s</span>
                </div>
              )}

              {/* Video Player */}
              {videoStatus.video_url && videoStatus.status === 'completed' && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <p className="text-gray-700 font-medium mb-3">Your Video:</p>
                  <video
                    controls
                    className="w-full rounded-lg shadow-lg"
                    poster={videoStatus.thumbnail_url}
                  >
                    <source src={videoStatus.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  <div className="mt-3 flex gap-3">
                    <a
                      href={videoStatus.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#006B7D] text-white py-2 px-4 rounded-lg text-center hover:bg-[#005666] transition-colors"
                    >
                      📥 Download Video
                    </a>
                    {videoStatus.thumbnail_url && (
                      <a
                        href={videoStatus.thumbnail_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg text-center hover:bg-gray-700 transition-colors"
                      >
                        🖼️ View Thumbnail
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          📘 How to Use HeyGen in ZALPHA
        </h3>
        <ul className="space-y-2 text-blue-800">
          <li>• <strong>Zee AI:</strong> Creates welcoming career assistant videos</li>
          <li>• <strong>Recruiter:</strong> Perfect for employer introductions</li>
          <li>• <strong>Career Fair:</strong> Virtual booth welcome videos</li>
          <li>• <strong>Tutorial:</strong> Educational content for students</li>
          <li>• <strong>Custom:</strong> Any other video content needs</li>
        </ul>
        
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>⚡ Pro Tip:</strong> Videos typically take 2-5 minutes to generate. 
            The status will automatically update once the video is ready!
          </p>
        </div>
      </div>
    </div>
  );
}