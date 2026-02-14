import { useState } from 'react';
import { Video, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { DIDAgent } from './DIDAgent';

interface VirtualBoothAgentProps {
  boothInfo: {
    organizationName: string;
    description: string;
    opportunities: string[];
  };
  trigger?: React.ReactNode;
}

export function VirtualBoothAgent({ boothInfo, trigger }: VirtualBoothAgentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      {trigger ? (
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          <Video className="h-4 w-4 mr-2" />
          Talk to AI Representative
        </Button>
      )}

      {/* D-ID Agent Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Virtual Booth - {boothInfo.organizationName}</DialogTitle>
          </DialogHeader>
          <DIDAgent
            agentType="career-fair"
            boothInfo={boothInfo}
            onClose={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VirtualBoothAgent;
