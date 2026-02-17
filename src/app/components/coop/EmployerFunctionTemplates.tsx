import { Briefcase, Edit, CheckCircle } from 'lucide-react';

type FunctionDeliverableTemplateItem = {
  id: string;
  title: string;
  description?: string;
};

type BusinessFunctionTemplate = {
  id: string;
  name: string;
  description: string;
  defaultDeliverables: FunctionDeliverableTemplateItem[];
};

type EmployerFunctionTemplatesProps = {
  functions: BusinessFunctionTemplate[];
  onEditFunction: (id: string) => void;
};

export function EmployerFunctionTemplates(props: EmployerFunctionTemplatesProps) {
  return (
    <div className="w-full rounded-3xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-900 via-slate-950 to-cyan-900 p-6 shadow-xl text-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">
              Business Functions & Deliverables
            </h2>
            <p className="text-sm text-emerald-100 mt-1">
              Define reusable tasks for each department so student deliverables are prefilled.
            </p>
          </div>
        </div>

        <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all text-sm">
          + Add Function
        </button>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {props.functions.map((fn) => (
          <div
            key={fn.id}
            className="rounded-2xl bg-slate-900/80 backdrop-blur-sm border-2 border-emerald-500/40 p-5 hover:border-emerald-400/60 transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-50">{fn.name}</p>
                    <p className="text-sm text-emerald-100">{fn.description}</p>
                  </div>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => props.onEditFunction(fn.id)}
                className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 rounded-lg font-semibold text-sm hover:bg-emerald-500/30 transition-all flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>

            {/* Deliverables List */}
            <div className="bg-slate-950/70 rounded-xl p-4 border border-emerald-500/20">
              <p className="text-xs font-bold text-emerald-300 mb-3 uppercase tracking-wider">
                Default Deliverables ({fn.defaultDeliverables.length})
              </p>
              <div className="space-y-2">
                {fn.defaultDeliverables.map((deliverable) => (
                  <div
                    key={deliverable.id}
                    className="flex items-start gap-3 rounded-xl bg-slate-900/70 px-3 py-3 border border-slate-700/50"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-400/70 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-emerald-900" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-50 mb-1">
                        {deliverable.title}
                      </p>
                      {deliverable.description && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {deliverable.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex items-center gap-4 text-xs text-emerald-200">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {fn.defaultDeliverables.length} default tasks
              </span>
              <span className="text-slate-500">•</span>
              <span>Auto-applied to new student placements</span>
            </div>
          </div>
        ))}
      </div>

      {props.functions.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg font-semibold mb-2">No business functions yet</p>
          <p className="text-slate-500 text-sm mb-4">
            Create your first function template to streamline student task assignments
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
            Create First Function
          </button>
        </div>
      )}
    </div>
  );
}
