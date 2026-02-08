# 🎬 HeyGen Integration Guide for ZALPHA

## ✅ What's Been Completed

ZALPHA has been successfully updated to use **HeyGen** instead of D-ID for AI video avatar functionality!

### Files Created/Updated:

1. **`/supabase/functions/server/heygen-integration.tsx`**
   - Complete HeyGen API integration
   - Functions for creating videos, avatars, talking photos, and streaming sessions
   - ZALPHA-specific helpers (Zee videos, recruiter videos, career fair videos, tutorials)

2. **`/supabase/functions/server/heygen-routes.tsx`**
   - All API route handlers for HeyGen functionality
   - Video creation, status checking, talking photos, streaming avatars
   - Avatar/voice listing endpoints

3. **`/supabase/functions/server/index.tsx`**
   - Updated to import HeyGen instead of D-ID
   - All new HeyGen routes registered
   - D-ID routes marked as "LEGACY - DEPRECATED"

4. **`/src/app/components/heygen-example.tsx`**
   - Example React component demonstrating HeyGen usage
   - Full video creation flow with status polling
   - Ready to integrate into ZALPHA

---

## 🔑 Next Step: Add Your HeyGen API Key

**A modal should now be open** prompting you to enter your HeyGen API key.

### Your HeyGen API Key:
```
sk_V2_hgu_kAy9oIj4Mbn_Dmn3spyDopEYoEYvftFZqorVFC07qrT2
```

### Instructions:
1. Copy the API key above
2. Paste it into the **HEYGEN_API_KEY** modal that's currently open
3. Click **Save**
4. Wait **10-30 seconds** for the backend to restart
5. **HeyGen features will be live!** ✨

---

## 🚀 Available HeyGen Features

### 1. **Video Creation**
Create AI avatar videos with custom scripts:
- **Zee AI Career Assistant** videos
- **Recruiter/Employer** introduction videos
- **Career Fair Booth** welcome videos
- **Tutorial/Educational** videos
- **Custom** videos with any avatar/voice

**API Endpoint:**
```
POST /make-server-9bd83859/heygen/videos/create
```

**Example Request:**
```javascript
{
  "videoType": "zee",
  "script": "Hello! Welcome to ZALPHA...",
  "avatarId": "Angela-inblackskirt-20220820", // optional
  "voiceId": "1bd001e7e50f421d891986aad5158bc8" // optional
}
```

### 2. **Talking Photos**
Convert user photos into talking avatars:
- Perfect for personalized messages from employers
- Great for student video introductions
- Authentic representation

**API Endpoint:**
```
POST /make-server-9bd83859/heygen/talking-photo/create
```

### 3. **Streaming Avatars** (Real-time Interactive)
Create live interactive avatar sessions:
- Real-time chat with Zee AI
- Live career counseling sessions
- Interactive job fair booths

**API Endpoints:**
```
POST /make-server-9bd83859/heygen/streaming/create
POST /make-server-9bd83859/heygen/streaming/:sessionId/message
POST /make-server-9bd83859/heygen/streaming/:sessionId/stop
```

### 4. **Avatar & Voice Browsing**
Browse all available avatars and voices:
```
GET /make-server-9bd83859/heygen/avatars
GET /make-server-9bd83859/heygen/voices
GET /make-server-9bd83859/heygen/recommended
```

---

## 📋 How to Use in ZALPHA

### Example 1: Create Zee AI Career Assistant Video

```typescript
import { projectId, publicAnonKey } from '/utils/supabase/info';

const createZeeVideo = async () => {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859/heygen/videos/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        videoType: 'zee',
        script: 'Hi! I\'m Zee, your career assistant. Let me help you find your dream job!'
      }),
    }
  );

  const data = await response.json();
  console.log('Video created:', data.video);
  
  // Poll for status
  pollVideoStatus(data.video.video_id);
};
```

### Example 2: Check Video Status

```typescript
const checkVideoStatus = async (videoId: string) => {
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
  
  if (data.status.status === 'completed') {
    // Video is ready!
    const videoUrl = data.status.video_url;
    console.log('Video ready:', videoUrl);
  }
};
```

### Example 3: Create Recruiter Video

```typescript
const createRecruiterVideo = async () => {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859/heygen/videos/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        videoType: 'recruiter',
        companyName: 'Pacific Tech Solutions',
        script: 'Welcome to Pacific Tech Solutions! We\'re excited to connect with talented graduates...'
      }),
    }
  );

  const data = await response.json();
  return data.video;
};
```

---

## 🎨 Recommended Avatars for ZALPHA

### Zee AI Career Assistant
- **Avatar ID:** `Angela-inblackskirt-20220820`
- **Voice ID:** `1bd001e7e50f421d891986aad5158bc8`
- Professional, friendly female avatar

### Recruiter (Male)
- **Avatar ID:** `Wayne_20240711`
- **Voice ID:** `2d5b0e6cf36f460aa7fc47e3eee4ba54`
- Professional business avatar

### Recruiter (Female)
- **Avatar ID:** `Angela-inblackskirt-20220820`
- **Voice ID:** `1bd001e7e50f421d891986aad5158bc8`
- Professional business avatar

---

## 🎯 ZALPHA-Specific Features

### 1. **Zee AI Career Assistant Videos**
```typescript
import * as heygenIntegration from './heygen-integration.tsx';

const zee = await heygenIntegration.createZeeVideo(
  'Welcome to ZALPHA! Let me help you find opportunities across the Pacific Islands.'
);
```

### 2. **Recruiter Introduction Videos**
```typescript
const recruiter = await heygenIntegration.createRecruiterVideo(
  'Pacific Tech Solutions',
  'We\'re hiring software engineers, designers, and product managers!'
);
```

### 3. **Career Fair Booth Videos**
```typescript
const booth = await heygenIntegration.createCareerFairVideo(
  'University of the South Pacific',
  'Visit our virtual booth to learn about graduate programs and scholarships!'
);
```

### 4. **Tutorial Videos**
```typescript
const tutorial = await heygenIntegration.createTutorialVideo({
  title: 'How to Write a Great Resume',
  category: 'Career Development',
  script: 'Today I\'ll teach you the essential elements of a winning resume...'
});
```

---

## 🔧 Testing the Integration

### Option 1: Use the Example Component

Add the example component to your app to test:

```typescript
// In /src/app/App.tsx
import { HeyGenExample } from './components/heygen-example';

export default function App() {
  return (
    <div>
      <HeyGenExample />
    </div>
  );
}
```

### Option 2: Test Directly with API

Use the browser console or a tool like Postman to test the endpoints.

---

## ⚡ Key Benefits of HeyGen

✅ **High-Quality Avatars:** More realistic and professional
✅ **Fast Generation:** Videos ready in 2-5 minutes
✅ **Streaming Support:** Real-time interactive avatars
✅ **Talking Photos:** Convert any photo to a talking avatar
✅ **Multiple Languages:** Support for Pacific Island languages
✅ **Custom Branding:** Use ZALPHA's Ocean Professional colors

---

## 🐛 Troubleshooting

### If videos aren't creating:

1. **Check API Key:** Make sure you entered the HeyGen API key correctly
2. **Check Logs:** Look in the browser console for error messages
3. **Wait for Restart:** Backend needs 10-30 seconds after saving the key
4. **Verify Authentication:** Make sure requests include the Authorization header

### Common Error Messages:

- **"HeyGen API key not configured"** → API key not saved yet
- **"HeyGen API key is invalid or expired"** → Check your API key
- **"Failed to create HeyGen video"** → Check script content and parameters

---

## 📞 Next Steps

1. ✅ **Save the API key** in the modal (it should be open now)
2. ✅ **Wait 10-30 seconds** for backend restart
3. ✅ **Test the integration** using the example component
4. ✅ **Integrate HeyGen** into ZALPHA features:
   - Zee AI career assistant
   - Employer video introductions
   - Virtual career fair booths
   - Tutorial/educational content

---

## 🎉 You're All Set!

Once you save the API key, ZALPHA will have fully functional AI video avatar capabilities powered by HeyGen!

**Questions or issues?** Just let me know! 🚀
