import { ElevenLabsInterviewVideo } from '@/app/components/ElevenLabsInterviewVideo';

interface InterviewTutorialVideoProps {
  onNavigate: (page: string) => void;
}

export function InterviewTutorialVideo({ onNavigate }: InterviewTutorialVideoProps) {
  return (
    <ElevenLabsInterviewVideo
      onClose={() => onNavigate('student-dashboard')}
      onComplete={() => onNavigate('ai-interview-practice')}
      autoPlay={true}
    />
  );
}
