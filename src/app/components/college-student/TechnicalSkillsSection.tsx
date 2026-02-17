import { Code, Database, Wifi, Shield, TrendingUp } from 'lucide-react';

export function TechnicalSkillsSection() {
  const skills = [
    {
      icon: Code,
      name: 'Web Development',
      description: 'HTML, CSS, JavaScript, React',
      demand: 'High demand',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Database,
      name: 'Database Management',
      description: 'SQL, PostgreSQL, data analysis',
      demand: 'Growing',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Wifi,
      name: 'Network Administration',
      description: 'Cisco, network security, troubleshooting',
      demand: 'High demand',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Shield,
      name: 'Cybersecurity',
      description: 'Security protocols, threat detection',
      demand: 'Critical need',
      color: 'from-red-500 to-orange-500',
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
        <h2 className="text-sm font-bold text-slate-50">
          In-demand technical skills
        </h2>
      </div>

      <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
        Build these skills to stand out in the regional market. Many employers across CNMI, Western Pacific, and Asia-Pacific are actively hiring for these roles.
      </p>

      <div className="space-y-2">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.name}
              className="rounded-2xl bg-slate-950/80 p-3 border border-slate-800 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-semibold text-slate-50">{skill.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold whitespace-nowrap">
                      {skill.demand}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-400">{skill.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-xl bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all"
      >
        Browse all skill development resources
      </button>
    </section>
  );
}
