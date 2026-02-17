import { Calendar, MapPin, Users, Video } from 'lucide-react';

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'IN_PERSON' | 'VIRTUAL' | 'HYBRID';
  attendees: number;
  isRegistered: boolean;
};

export function RegionalEvents() {
  const events: Event[] = [
    {
      id: '1',
      title: 'Pacific Tech Career Fair',
      date: 'March 15, 2026',
      time: '10:00 AM - 4:00 PM',
      location: 'Saipan · CNMI',
      type: 'IN_PERSON',
      attendees: 45,
      isRegistered: false,
    },
    {
      id: '2',
      title: 'Virtual Networking: Asia-Pacific IT Professionals',
      date: 'March 22, 2026',
      time: '6:00 PM - 7:30 PM',
      location: 'Online',
      type: 'VIRTUAL',
      attendees: 128,
      isRegistered: true,
    },
    {
      id: '3',
      title: 'Western Pacific Job Fair (Hybrid)',
      date: 'April 5, 2026',
      time: '9:00 AM - 3:00 PM',
      location: 'Guam & Online',
      type: 'HYBRID',
      attendees: 89,
      isRegistered: false,
    },
  ];

  const getTypeIcon = (type: Event['type']) => {
    if (type === 'VIRTUAL') return <Video className="w-3 h-3" />;
    if (type === 'HYBRID') return <Video className="w-3 h-3" />;
    return <MapPin className="w-3 h-3" />;
  };

  const getTypeColor = (type: Event['type']) => {
    if (type === 'VIRTUAL') return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    if (type === 'HYBRID') return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-3 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-5 h-5 text-cyan-400" />
        <h2 className="text-sm font-bold text-slate-50">
          Regional events
        </h2>
      </div>

      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl bg-slate-950/80 p-3 border border-slate-800 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-xs font-semibold text-slate-50 leading-tight flex-1">
                {event.title}
              </h3>
              {event.isRegistered && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 font-semibold whitespace-nowrap">
                  ✓ Registered
                </span>
              )}
            </div>

            <div className="space-y-1 text-[11px] text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{event.date} · {event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                {getTypeIcon(event.type)}
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{event.attendees} attending</span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${getTypeColor(event.type)}`}>
                {event.type.replace('_', ' ')}
              </span>
            </div>

            {!event.isRegistered && (
              <button
                type="button"
                className="mt-3 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-3 py-2 text-xs font-bold text-slate-900 hover:shadow-lg transition-all"
              >
                Register now
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-xl bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all"
      >
        View all regional events
      </button>
    </section>
  );
}
