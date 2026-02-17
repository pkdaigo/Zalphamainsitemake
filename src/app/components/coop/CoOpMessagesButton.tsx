import { MessageSquare } from 'lucide-react';

type CoOpMessagesButtonProps = {
  unreadCount: number;
  onOpenThread: () => void;
  size?: 'sm' | 'md';
};

export function CoOpMessagesButton(props: CoOpMessagesButtonProps) {
  const sizeClasses = props.size === 'sm' 
    ? 'px-4 py-2 text-xs'
    : 'px-6 py-3 text-sm';
  
  const iconSize = props.size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      onClick={props.onOpenThread}
      className={`relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all ${sizeClasses}`}
    >
      <MessageSquare className={iconSize} />
      <span>Messages</span>
      
      {props.unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[24px] h-6 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center px-2 shadow-lg border-2 border-white">
          {props.unreadCount > 99 ? '99+' : props.unreadCount}
        </span>
      )}
    </button>
  );
}
