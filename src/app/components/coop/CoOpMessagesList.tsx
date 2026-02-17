import { MessageSquare, AlertCircle, Clock } from 'lucide-react';

type CoOpMessageThreadSummary = {
  id: string;
  subject: string;
  studentName: string;
  businessName: string;
  hasAttendanceFlag: boolean;
  lastMessageAt: string;
  unreadForAdmin: boolean;
};

type CoOpMessagesListProps = {
  threads: CoOpMessageThreadSummary[];
  filter: 'ALL' | 'ATTENDANCE';
  onFilterChange: (filter: 'ALL' | 'ATTENDANCE') => void;
  onOpenThread: (threadId: string) => void;
};

export function CoOpMessagesList(props: CoOpMessagesListProps) {
  const filtered =
    props.filter === 'ATTENDANCE'
      ? props.threads.filter((t) => t.hasAttendanceFlag)
      : props.threads;

  const attendanceCount = props.threads.filter(t => t.hasAttendanceFlag).length;

  return (
    <div className="w-full rounded-3xl border-2 border-pink-400 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-6 shadow-xl text-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">Co-Op Messages</h2>
            <p className="text-sm text-pink-100">
              3-way threads between students, employers, and admins.
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => props.onFilterChange('ALL')}
            className={
              'px-4 py-2 rounded-xl font-bold text-sm transition-all ' +
              (props.filter === 'ALL'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700')
            }
          >
            All ({props.threads.length})
          </button>
          <button
            type="button"
            onClick={() => props.onFilterChange('ATTENDANCE')}
            className={
              'px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ' +
              (props.filter === 'ATTENDANCE'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700')
            }
          >
            <AlertCircle className="w-4 h-4" />
            Attendance ({attendanceCount})
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg font-semibold">No messages to display</p>
          <p className="text-slate-500 text-sm mt-2">
            {props.filter === 'ATTENDANCE' 
              ? 'No attendance-related messages at this time' 
              : 'All caught up! No messages yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {filtered.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => props.onOpenThread(thread.id)}
              className="w-full flex items-start gap-4 rounded-2xl bg-slate-900/80 backdrop-blur-sm px-4 py-4 text-left hover:bg-slate-800 transition-all border border-slate-700/50 hover:border-pink-400/50 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <p className="font-bold text-slate-50 mb-1">
                      {thread.studentName}
                      <span className="text-pink-300 font-normal ml-2">· {thread.businessName}</span>
                    </p>
                    <p className="text-sm text-pink-100 line-clamp-1 mb-2">{thread.subject}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {thread.hasAttendanceFlag && (
                      <span className="flex items-center gap-1 rounded-full bg-red-500/20 border border-red-400/30 px-2 py-1 text-xs font-bold text-red-100">
                        <AlertCircle className="w-3 h-3" />
                        Attendance
                      </span>
                    )}
                    {thread.unreadForAdmin && (
                      <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>Last message · {thread.lastMessageAt}</span>
                </div>
              </div>

              <div className="w-8 h-8 bg-slate-800/50 rounded-lg flex items-center justify-center group-hover:bg-pink-500/30 transition-all flex-shrink-0">
                <span className="text-pink-300 text-lg">→</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
