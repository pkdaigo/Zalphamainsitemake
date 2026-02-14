import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Loader2, Video, Check, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Tutorial {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  transcript: string;
  keyTakeaways: string[];
}

interface TutorialVideoGeneratorProps {
  tutorial: Tutorial;
  onVideoGenerated?: (tutorialId: number, agentId: string) => void;
  existingAgentId?: string;
}

export function TutorialVideoGenerator({ 
  tutorial, 
  onVideoGenerated,
  existingAgentId 
}: TutorialVideoGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [agentId, setAgentId] = useState<string | null>(existingAgentId || null);
  const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859`;

  const generateVideo = async () => {
    setIsGenerating(true);
    setStatus('generating');
    setErrorMessage(null);

    try {
      const response = await fetch(`${API_BASE}/did/tutorials/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorialId: tutorial.id,
          title: tutorial.title,
          category: tutorial.category,
          script: tutorial.transcript,
          keyTakeaways: tutorial.keyTakeaways,
          difficulty: tutorial.difficulty,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate tutorial video');
      }

      const data = await response.json();
      setAgentId(data.agent.id);
      setStatus('success');
      toast.success(`Tutorial video generated successfully!`);

      if (onVideoGenerated) {
        onVideoGenerated(tutorial.id, data.agent.id);
      }
    } catch (err: any) {
      console.error('Error generating tutorial video:', err);
      setErrorMessage(err.message);
      setStatus('error');
      toast.error('Failed to generate tutorial video: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteVideo = async () => {
    if (!agentId || !confirm('Are you sure you want to delete this tutorial video?')) {
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch(`${API_BASE}/did/tutorials/${tutorial.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete tutorial video');
      }

      setAgentId(null);
      setStatus('idle');
      toast.success('Tutorial video deleted successfully');
    } catch (err: any) {
      console.error('Error deleting tutorial video:', err);
      toast.error('Failed to delete tutorial video: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{tutorial.title}</CardTitle>
            <CardDescription className="text-sm">{tutorial.description}</CardDescription>
          </div>
          <Badge variant={agentId ? 'default' : 'outline'} className="ml-4">
            {agentId ? 'Generated' : 'Not Generated'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Tutorial Info */}
          <div className="flex flex-wrap gap-2 text-sm">
            <Badge variant="secondary">{tutorial.category}</Badge>
            <Badge variant={
              tutorial.difficulty === 'Beginner' ? 'default' :
              tutorial.difficulty === 'Intermediate' ? 'secondary' : 'outline'
            }>
              {tutorial.difficulty}
            </Badge>
          </div>

          {/* Status Display */}
          {status === 'generating' && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">
                Generating D-ID video agent... This may take a moment.
              </span>
            </div>
          )}

          {status === 'success' && agentId && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">
                Video agent created successfully! ID: {agentId}
              </span>
            </div>
          )}

          {status === 'error' && errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700 font-medium">
                Error: {errorMessage}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {!agentId ? (
              <Button
                onClick={generateVideo}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Generate D-ID Video
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={deleteVideo}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Delete Video
                    </>
                  )}
                </Button>
                <Button
                  onClick={generateVideo}
                  disabled={isGenerating}
                  variant="secondary"
                  className="flex-1"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </>
            )}
          </div>

          {/* Key Takeaways Preview */}
          <div className="pt-3 border-t">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Key Takeaways:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {tutorial.keyTakeaways.slice(0, 3).map((takeaway, index) => (
                <li key={index}>• {takeaway}</li>
              ))}
              {tutorial.keyTakeaways.length > 3 && (
                <li className="text-gray-500 italic">+ {tutorial.keyTakeaways.length - 3} more</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TutorialVideoGenerator;
