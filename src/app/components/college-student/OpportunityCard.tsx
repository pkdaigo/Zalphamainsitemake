import { MapPin, Briefcase, GraduationCap } from 'lucide-react';

type OpportunityCardProps = {
  title: string;
  employer: string;
  locationLabel: string;
  regionTag: string;
  isTechnicalFriendly?: boolean;
  salary?: string;
  type?: string;
  postedDate?: string;
  onViewApply: () => void;
};

export function OpportunityCard(props: OpportunityCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-md hover:border-cyan-500/50 transition-all">
      <div className="flex items-start gap-2 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-5 h-5 text-slate-950" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-50 line-clamp-2 leading-tight">
            {props.title}
          </h3>
          <p className="mt-0.5 text-[11px] text-slate-300 font-medium">{props.employer}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-2 text-[11px] text-cyan-100">
        <MapPin className="w-3 h-3" />
        <span>{props.locationLabel}</span>
      </div>

      {props.salary && (
        <div className="mt-1 text-[11px] text-emerald-300 font-semibold">
          {props.salary}
        </div>
      )}

      {props.type && (
        <div className="mt-1 text-[11px] text-slate-400">
          {props.type}
        </div>
      )}

      <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
        <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-sky-100 font-semibold border border-sky-500/30">
          {props.regionTag}
        </span>
        {props.isTechnicalFriendly && (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-100 font-semibold border border-emerald-500/30 flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            Great for Technical College grads
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={props.onViewApply}
        className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-3 py-2 text-xs font-bold text-slate-900 shadow-md hover:shadow-lg transition-all"
      >
        View & apply
      </button>

      {props.postedDate && (
        <p className="mt-1 text-[10px] text-slate-500 text-center">
          Posted {props.postedDate}
        </p>
      )}

      <p className="mt-1 text-[10px] text-slate-400 text-center">
        This role helps keep skilled talent in the Pacific region.
      </p>
    </article>
  );
}
