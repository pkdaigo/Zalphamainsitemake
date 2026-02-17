import { Award, MapPin, Quote } from 'lucide-react';

type AlumniStory = {
  id: string;
  name: string;
  graduatedFrom: string;
  currentRole: string;
  currentEmployer: string;
  location: string;
  quote: string;
  year: string;
};

export function AlumniStories() {
  const stories: AlumniStory[] = [
    {
      id: '1',
      name: 'Maria Santos',
      graduatedFrom: 'NMTECH - IT Program',
      currentRole: 'Network Administrator',
      currentEmployer: 'CNMI Public Utilities',
      location: 'Saipan, CNMI',
      quote: 'I never had to leave home to build my career. The skills I learned at NMTECH opened doors right here in Saipan.',
      year: '2024',
    },
    {
      id: '2',
      name: 'John Reyes',
      graduatedFrom: 'NMC - Business Administration',
      currentRole: 'Operations Manager',
      currentEmployer: 'Pacific Development Inc.',
      location: 'Saipan, CNMI',
      quote: 'Working locally means staying connected to my family and contributing to our community\'s growth.',
      year: '2023',
    },
    {
      id: '3',
      name: 'Emily Chen',
      graduatedFrom: 'NMTECH - Hospitality',
      currentRole: 'Guest Services Coordinator',
      currentEmployer: 'Saipan Grand Hotel',
      location: 'Saipan, CNMI',
      quote: 'The hospitality program prepared me for real-world challenges. I love helping visitors experience the beauty of our islands.',
      year: '2025',
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-3 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Award className="w-5 h-5 text-yellow-400" />
        <h2 className="text-sm font-bold text-slate-50">
          Alumni success stories
        </h2>
      </div>

      <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
        Hear from graduates who stayed in the region and built successful careers close to home.
      </p>

      <div className="space-y-2">
        {stories.map((story) => (
          <div
            key={story.id}
            className="rounded-2xl bg-slate-950/80 p-3 border border-slate-800 hover:border-yellow-500/30 transition-all"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-slate-950 font-black text-sm flex-shrink-0">
                {story.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-slate-50">{story.name}</h3>
                <p className="text-[10px] text-slate-400">Class of {story.year}</p>
              </div>
            </div>

            <div className="mb-2 text-[11px]">
              <p className="text-cyan-300 font-semibold">{story.currentRole}</p>
              <p className="text-slate-400">{story.currentEmployer}</p>
              <div className="flex items-center gap-1 mt-1 text-slate-500">
                <MapPin className="w-3 h-3" />
                <span>{story.location}</span>
              </div>
            </div>

            <div className="relative bg-slate-900/80 rounded-xl p-2 border border-slate-700">
              <Quote className="absolute top-1 left-1 w-3 h-3 text-cyan-500/30" />
              <p className="text-[11px] text-slate-300 leading-relaxed pl-3 italic">
                "{story.quote}"
              </p>
            </div>

            <p className="mt-2 text-[10px] text-slate-500">
              Graduated from {story.graduatedFrom}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-xl bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all"
      >
        Read more success stories
      </button>
    </section>
  );
}
