import { CheckCircle, Circle, Clock } from 'lucide-react';

type DeliverableStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

type StudentDeliverable = {
  id: string;
  title: string;
  description?: string;
  status: DeliverableStatus;
};

type TodayDeliverablesCardProps = {
  date: string;
  functionName: string;
  deliverables: StudentDeliverable[];
  onToggleStatus: (id: string, status: DeliverableStatus) => void;
  onViewAll: () => void;
};

function statusLabel(status: DeliverableStatus) {
  if (status === 'COMPLETED') return 'Completed';
  if (status === 'IN_PROGRESS') return 'In progress';
  return 'Not started';
}

function statusClasses(status: DeliverableStatus) {
  if (status === 'COMPLETED') return 'bg-emerald-500/20 text-emerald-100 border-emerald-400';
  if (status === 'IN_PROGRESS') return 'bg-amber-500/20 text-amber-100 border-amber-400';
  return 'bg-sky-500/20 text-sky-100 border-sky-400';
}

export function TodayDeliverablesCard(props: TodayDeliverablesCardProps) {
  const completedCount = props.deliverables.filter(d => d.status === 'COMPLETED').length;
  const totalCount = props.deliverables.length;

  return (
    <div className="w-full rounded-3xl border-2 border-sky-300 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-6 shadow-xl text-slate-50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-black tracking-tight mb-2">Deliverables for Today</h2>
          <p className="text-sm text-sky-200 mb-3">
            {props.date} · From {props.functionName} function template
          </p>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-emerald-300">
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>
        <button
          onClick={props.onViewAll}
          className="text-sm font-bold text-cyan-300 hover:text-cyan-200 transition-colors whitespace-nowrap ml-4"
        >
          View all →
        </button>
      </div>

      <div className="space-y-3">
        {props.deliverables.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() =>
              props.onToggleStatus(
                d.id,
                d.status === 'COMPLETED'
                  ? 'IN_PROGRESS'
                  : d.status === 'IN_PROGRESS'
                  ? 'NOT_STARTED'
                  : 'COMPLETED',
              )
            }
            className="flex w-full items-start justify-between gap-4 rounded-2xl bg-slate-800/60 backdrop-blur-sm px-4 py-3 text-left hover:bg-slate-800 transition-all border border-slate-700/50 hover:border-sky-500/50"
          >
            <div className="flex gap-3 flex-1">
              <div
                className={
                  'mt-1 h-6 w-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ' +
                  (d.status === 'COMPLETED' 
                    ? 'bg-emerald-400 border-emerald-400 text-slate-900' 
                    : d.status === 'IN_PROGRESS'
                    ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                    : 'bg-transparent border-sky-400 text-sky-400')
                }
              >
                {d.status === 'COMPLETED' ? (
                  <CheckCircle className="w-4 h-4" fill="currentColor" />
                ) : d.status === 'IN_PROGRESS' ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-50 mb-1">{d.title}</p>
                {d.description && (
                  <p className="text-xs text-slate-300 leading-relaxed">{d.description}</p>
                )}
              </div>
            </div>
            <span
              className={
                'ml-2 rounded-full border px-3 py-1 text-xs font-bold whitespace-nowrap flex-shrink-0 ' +
                statusClasses(d.status)
              }
            >
              {statusLabel(d.status)}
            </span>
          </button>
        ))}
      </div>

      {completedCount === totalCount && totalCount > 0 && (
        <div className="mt-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 rounded-2xl p-4 text-center">
          <p className="text-emerald-300 font-bold text-sm">
            🎉 All deliverables completed! Great work today!
          </p>
        </div>
      )}
    </div>
  );
}
