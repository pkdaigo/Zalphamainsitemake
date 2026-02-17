import { MapPin, Anchor, Plane, Waves } from 'lucide-react';

export function StayLocalPathways() {
  const cards = [
    {
      icon: Anchor,
      title: 'Build your career in CNMI',
      body: 'See full-time roles, apprenticeships, and fellowships that keep you rooted in CNMI.',
      color: 'from-sky-500 to-cyan-500',
    },
    {
      icon: Waves,
      title: 'Work across the Western Pacific',
      body: 'Explore roles in Guam, FSM, Palau, and the Marshall Islands with strong ties back home.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Plane,
      title: 'Asia-Pacific internships & remote roles',
      body: 'Gain experience across the region while staying connected to the Pacific.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: MapPin,
      title: 'Hawaii: our only U.S. state focus',
      body: 'Discover opportunities in Hawaii that align with Pacific Islander talent and communities.',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-3 shadow-lg">
      <h2 className="text-sm font-bold text-slate-50 mb-3">
        Pathways to stay connected to home 🏝️
      </h2>
      <div className="space-y-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-2xl bg-slate-950/80 px-3 py-2 border border-slate-800 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-50 leading-tight">{card.title}</p>
                  <p className="mt-0.5 text-[11px] text-slate-300 leading-relaxed">{card.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
