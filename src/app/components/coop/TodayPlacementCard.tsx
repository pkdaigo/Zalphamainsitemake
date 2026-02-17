import { MessageSquare, MapPin, Clock, User, Building2 } from 'lucide-react';

type TodayPlacementCardProps = {
  studentName: string;
  businessName: string;
  employerName: string;
  departmentName: string;
  shiftDate: string;
  shiftTimeRange: string;
  location: string;
  supervisorName: string;
  onOpenMessages: () => void;
};

export function TodayPlacementCard(props: TodayPlacementCardProps) {
  return (
    <div className="w-full rounded-3xl border-2 border-cyan-300 bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-900 p-6 shadow-xl text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-black tracking-tight">Today's Placement</h2>
          <p className="text-sm text-cyan-100 flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4" />
            {props.shiftDate} · {props.shiftTimeRange}
          </p>
        </div>
        <span className="rounded-full bg-cyan-500/20 backdrop-blur-sm px-4 py-2 text-sm font-bold text-cyan-100 border border-cyan-400/30">
          {props.departmentName}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <p className="font-bold text-lg">{props.businessName}</p>
            <p className="text-sm text-cyan-100">Employer: {props.employerName}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <p className="text-sm text-cyan-100">Location</p>
            <p className="font-semibold">{props.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <p className="text-sm text-cyan-100">Supervisor</p>
            <p className="font-semibold">{props.supervisorName}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <p className="text-sm text-cyan-100">Student</p>
            <p className="font-semibold">{props.studentName}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="rounded-full bg-sky-500/30 px-3 py-1 text-xs font-bold text-sky-100">
          Business function: {props.departmentName}
        </span>
        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-100">
          Co-op shift today
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={props.onOpenMessages}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-bold text-sky-950 hover:shadow-lg transition-all"
        >
          <MessageSquare className="w-5 h-5" />
          Message Supervisor
        </button>
        <button className="flex-1 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 px-6 py-3 text-sm font-bold hover:bg-white/20 transition-all">
          View Details
        </button>
      </div>
    </div>
  );
}
