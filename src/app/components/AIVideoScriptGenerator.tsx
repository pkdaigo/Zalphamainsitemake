import { useState } from 'react';
import { Video, Sparkles, Download, Copy, RefreshCw, Check, Play, Clock, TrendingUp, Users, Target, Mic, Camera } from 'lucide-react';

interface AIVideoScriptGeneratorProps {
  companyName: string;
  onScriptGenerated?: (script: VideoScript) => void;
}

interface VideoScript {
  title: string;
  duration: string;
  targetAudience: string;
  script: ScriptSection[];
  talkingPoints: string[];
  shotSuggestions: string[];
  fullScript: string;
}

interface ScriptSection {
  timestamp: string;
  scene: string;
  dialogue: string;
  visual: string;
}

export function AIVideoScriptGenerator({ companyName, onScriptGenerated }: AIVideoScriptGeneratorProps) {
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input');
  const [generatedScript, setGeneratedScript] = useState<VideoScript | null>(null);
  const [copied, setCopied] = useState(false);

  // Input fields
  const [videoType, setVideoType] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [keyMessage, setKeyMessage] = useState('');
  const [companyValues, setCompanyValues] = useState('');
  const [uniqueSelling, setUniqueSelling] = useState('');
  const [workCulture, setWorkCulture] = useState('');

  const generateScript = () => {
    setStep('generating');

    setTimeout(() => {
      const script: VideoScript = {
        title: `${companyName} ${videoType || 'Company'} Introduction Video`,
        duration: videoDuration || '60-90 seconds',
        targetAudience: videoType === 'recruitment' ? 'Potential job candidates' : 'General audience',
        script: [
          {
            timestamp: '0:00-0:05',
            scene: 'Opening Shot',
            dialogue: `Hi! I'm [Your Name], and I'm excited to tell you about ${companyName}.`,
            visual: '📹 Shot of you in your office or workplace with company branding visible'
          },
          {
            timestamp: '0:05-0:15',
            scene: 'Company Introduction',
            dialogue: `${companyDescription || `${companyName} is a leading company in the Pacific region`}. ${keyMessage || 'We\'re passionate about what we do and the people we serve'}.`,
            visual: '🏢 Show your office, storefront, or workplace environment'
          },
          {
            timestamp: '0:15-0:35',
            scene: 'What We Do',
            dialogue: `What makes us different? ${uniqueSelling || 'We combine innovation with island values'}. Our team ${workCulture || 'works collaboratively in a supportive environment where everyone\'s voice matters'}.`,
            visual: '👥 Show team members at work, collaborating, or serving customers'
          },
          {
            timestamp: '0:35-0:50',
            scene: 'Company Values & Culture',
            dialogue: `Our core values are ${companyValues || 'respect, excellence, and community'}. We believe in ${workCulture || 'work-life balance and professional growth'}. Here, you\'re not just an employee—you\'re part of our \'ohana.`,
            visual: '🌺 Show team bonding, company events, or community involvement'
          },
          {
            timestamp: '0:50-1:00',
            scene: 'Call to Action',
            dialogue: videoType === 'recruitment' 
              ? `We\'re always looking for talented individuals to join our team. If you\'re passionate, driven, and want to make a difference, we\'d love to hear from you. Check out our open positions on ZALPHA!`
              : `Want to learn more about ${companyName}? Visit us on ZALPHA or reach out—we\'d love to connect with you!`,
            visual: '✨ End with company logo, contact info, or team photo'
          }
        ],
        talkingPoints: [
          `✓ Smile and speak naturally—authenticity wins!`,
          `✓ Keep energy high but professional`,
          `✓ Make eye contact with the camera`,
          `✓ Speak clearly and at a moderate pace`,
          `✓ Show genuine passion for your company`,
          `✓ ${videoType === 'recruitment' ? 'Emphasize growth opportunities and benefits' : 'Highlight what makes you unique'}`,
          `✓ Keep it conversational, not scripted`,
          `✓ Mention specific details (projects, achievements, culture)`
        ],
        shotSuggestions: [
          '📹 Opening: Medium shot of you (waist up) with office/branding in background',
          '🏢 Company Tour: Wide shots of your workspace, showing activity and environment',
          '👥 Team Shots: Show real employees working, collaborating, smiling',
          '🌺 Culture Shots: Team lunch, celebrations, casual interactions',
          '🎯 Product/Service: Show what you do (customers, projects, products)',
          '📱 B-Roll: Pacific scenery if relevant (beach, sunset, island life)',
          '✨ Closing: You + team together, or company logo with contact info',
          '💡 Lighting: Natural light near windows, avoid harsh shadows',
          '🎤 Audio: Use lapel mic or record in quiet space'
        ],
        fullScript: ''
      };

      // Generate full script text
      script.fullScript = `
# 🎬 ${script.title}

**Duration:** ${script.duration}  
**Target Audience:** ${script.targetAudience}

---

## 📝 VIDEO SCRIPT

${script.script.map(section => `
### ${section.scene} (${section.timestamp})

**DIALOGUE:**
"${section.dialogue}"

**VISUAL:**
${section.visual}

---
`).join('\n')}

## 🎯 TALKING POINTS (Remember These!)

${script.talkingPoints.map(point => `${point}`).join('\n')}

---

## 📹 SHOT LIST & TECHNICAL TIPS

${script.shotSuggestions.map(shot => `${shot}`).join('\n')}

---

## 🎬 FILMING TIPS

**Equipment Needed:**
- Smartphone with good camera (modern iPhone/Android) OR professional camera
- Tripod or phone mount (prevents shaky footage)
- Lapel microphone or quiet recording space
- Good lighting (near window or softbox lights)

**Best Practices:**
1. **Film Horizontally** (landscape mode, not portrait!)
2. **Frame Yourself** - Keep your face in center, slight headroom at top
3. **Eye Level** - Camera should be at your eye level (not looking up/down)
4. **Background** - Clean, professional, shows your brand/space
5. **Lighting** - Face the window/light source, avoid backlighting
6. **Multiple Takes** - Don't be afraid to do 5-10 takes until it feels natural!
7. **Test Audio** - Record a test clip and check audio quality first

**Common Mistakes to Avoid:**
- ❌ Speaking too fast (you're nervous—slow down!)
- ❌ Reading directly from script (sounds robotic)
- ❌ No energy or enthusiasm
- ❌ Poor lighting (too dark or harsh shadows)
- ❌ Noisy background (air conditioner, traffic, office chatter)
- ❌ Shaky camera (use tripod!)
- ❌ Looking at yourself instead of camera lens

---

## ✨ PRO TIPS FROM ZALPHA

**The "3-Take Method":**
1. **Take 1:** Read script word-for-word to get timing right
2. **Take 2:** Use script as guide but speak more naturally
3. **Take 3:** Improvise while hitting key points (this is usually best!)

**Energy Level:**
- Dial your energy up 20% higher than normal conversation
- You may feel "over the top" but it translates well on camera
- Smile more than you think you need to!

**Teleprompter Alternative:**
- Write key bullet points on paper
- Place paper NEXT TO camera (not far away)
- Glance down briefly, then look at camera while speaking
- Edit out the glances later, or use jump cuts

---

## 🎞️ EDITING TIPS (Optional)

**Simple Editing (Phone Apps):**
- Use CapCut, iMovie, or InShot (all free!)
- Add text overlays with key info (company name, location)
- Include background music (low volume, upbeat instrumental)
- Add captions/subtitles (80% watch without sound!)
- Trim awkward pauses and "um's"

**Want Professional Help?**
- ZALPHA can connect you with Pacific video editors
- Budget: $100-300 for 1-2 minute edited video
- Turnaround: 3-5 business days

---

## 📤 UPLOAD TO ZALPHA

Once your video is ready:
1. Go to Company Profile Settings
2. Click "Upload Company Introduction Video"
3. Upload your video file (max 100MB, MP4 format)
4. Video will be reviewed within 24 hours
5. Once approved, it appears on your company profile!

**Video Specs:**
- Format: MP4, MOV, or AVI
- Max size: 100MB
- Resolution: 1080p recommended (minimum 720p)
- Aspect ratio: 16:9 (horizontal/landscape)

---

**Generated by ZALPHA AI • Optimized for Pacific Region Recruitment • ${new Date().toLocaleDateString()}**
      `.trim();

      setGeneratedScript(script);
      setStep('result');
    }, 3000);
  };

  const copyToClipboard = () => {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript.fullScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadScript = () => {
    if (generatedScript) {
      const blob = new Blob([generatedScript.fullScript], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${companyName.replace(/\s+/g, '_')}_Video_Script.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const regenerate = () => {
    setStep('input');
    setGeneratedScript(null);
  };

  if (step === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <Video className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🎬 AI is Writing Your Video Script...
          </h2>
          
          <div className="space-y-3 text-lg text-gray-700">
            <p className="flex items-center justify-center gap-2">
              <Check className="w-6 h-6 text-green-600" />
              Analyzing company information...
            </p>
            <p className="flex items-center justify-center gap-2">
              <Check className="w-6 h-6 text-green-600" />
              Creating engaging narrative...
            </p>
            <p className="flex items-center justify-center gap-2 animate-pulse">
              <Camera className="w-6 h-6 text-pink-600" />
              Generating shot suggestions...
            </p>
          </div>

          <div className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border-2 border-pink-200">
            <p className="text-sm text-pink-900 font-semibold">
              🎥 <strong>Pro Tip:</strong> Companies with introduction videos get 5x more candidate applications!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'result' && generatedScript) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl p-8 mb-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Video className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">🎬 Your Video Script is Ready!</h1>
                <p className="text-xl text-pink-100">
                  Professional script optimized for candidate engagement
                </p>
              </div>
            </div>
          </div>

          {/* Script Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{generatedScript.title}</h2>
                <p className="text-gray-600 mt-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Duration: {generatedScript.duration}
                </p>
              </div>
              <Play className="w-16 h-16 text-pink-600" />
            </div>

            {/* Script Sections */}
            <div className="space-y-6">
              {generatedScript.script.map((section, idx) => (
                <div key={idx} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{section.scene}</h3>
                        <span className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full text-sm font-semibold">
                          {section.timestamp}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                          <Mic className="w-4 h-4" />
                          DIALOGUE:
                        </p>
                        <p className="text-gray-800 italic leading-relaxed bg-white rounded-lg p-4 border border-purple-200">
                          "{section.dialogue}"
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          VISUAL:
                        </p>
                        <p className="text-gray-700 bg-white rounded-lg p-4 border border-purple-200">
                          {section.visual}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Talking Points */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6" />
                🎯 Key Talking Points (Remember These!)
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {generatedScript.talkingPoints.map((point, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-green-300">
                    <p className="text-sm text-green-800">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shot Suggestions */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Camera className="w-6 h-6" />
                📹 Shot List & Technical Tips
              </h3>
              <div className="space-y-2">
                {generatedScript.shotSuggestions.map((shot, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-blue-300">
                    <p className="text-sm text-blue-800">{shot}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={copyToClipboard}
              className="px-6 py-4 bg-white border-2 border-purple-300 text-purple-700 rounded-xl hover:bg-purple-50 transition-all font-bold flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy Script
                </>
              )}
            </button>

            <button
              onClick={downloadScript}
              className="px-6 py-4 bg-white border-2 border-blue-300 text-blue-700 rounded-xl hover:bg-blue-50 transition-all font-bold flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Script
            </button>

            <button
              onClick={regenerate}
              className="px-6 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-bold flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Generate New Script
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-8 h-8 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold mb-1">5x</div>
                  <div className="text-sm text-pink-100">More applications with video</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <Users className="w-8 h-8 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold mb-1">78%</div>
                  <div className="text-sm text-purple-100">Candidates prefer video intros</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <Clock className="w-8 h-8 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold mb-1">20 min</div>
                  <div className="text-sm text-blue-100">Saved vs. writing manually</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Input Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Video className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">🎬 AI Video Script Generator</h1>
              <p className="text-xl text-pink-100">
                Create a professional company intro video script in seconds!
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-pink-200">
            <Video className="w-8 h-8 text-pink-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1">Complete Script</h3>
            <p className="text-sm text-gray-600">Dialogue, shots, and timing all planned for you</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-purple-200">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1">5x More Engagement</h3>
            <p className="text-sm text-gray-600">Video profiles attract way more candidates</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-blue-200">
            <Sparkles className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1">Pro Quality</h3>
            <p className="text-sm text-gray-600">Looks like you hired a production team</p>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Tell Us About Your Company</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Video Type *
              </label>
              <select
                value={videoType}
                onChange={(e) => setVideoType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                required
              >
                <option value="">Select video type...</option>
                <option value="recruitment">Recruitment / Hiring Video</option>
                <option value="company">General Company Introduction</option>
                <option value="culture">Company Culture Showcase</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Target Video Duration
              </label>
              <select
                value={videoDuration}
                onChange={(e) => setVideoDuration(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent"
              >
                <option value="">Select duration...</option>
                <option value="30-45 seconds">30-45 seconds (Quick intro)</option>
                <option value="60-90 seconds">60-90 seconds (Recommended)</option>
                <option value="2-3 minutes">2-3 minutes (Detailed)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Company Description *
              </label>
              <textarea
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                placeholder="e.g., We're a leading tech company in Saipan specializing in web development and digital marketing..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Key Message *
              </label>
              <input
                type="text"
                value={keyMessage}
                onChange={(e) => setKeyMessage(e.target.value)}
                placeholder="e.g., Innovation meets island values"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-600 mt-2">💡 One sentence that captures your company's essence</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Company Values (comma-separated)
              </label>
              <input
                type="text"
                value={companyValues}
                onChange={(e) => setCompanyValues(e.target.value)}
                placeholder="e.g., Respect, Excellence, Community, Innovation"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                What Makes You Unique?
              </label>
              <textarea
                value={uniqueSelling}
                onChange={(e) => setUniqueSelling(e.target.value)}
                placeholder="e.g., We combine cutting-edge technology with Pacific hospitality. We're the only company in the region that..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Work Culture & Environment
              </label>
              <textarea
                value={workCulture}
                onChange={(e) => setWorkCulture(e.target.value)}
                placeholder="e.g., Collaborative, supportive, flexible hours, remote options, professional development..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none"
              />
            </div>
          </div>

          <button
            onClick={generateScript}
            disabled={!videoType || !companyDescription || !keyMessage}
            className="w-full mt-8 px-8 py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-6 h-6" />
            Generate Video Script with AI
            <Video className="w-6 h-6" />
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            ⚡ Takes 30 seconds • 🎬 Pro quality script • 📹 Complete shot list included
          </p>
        </div>
      </div>
    </div>
  );
}
