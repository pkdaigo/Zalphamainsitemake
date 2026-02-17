import { BarChart3, Users, TrendingUp, Building2, Eye } from 'lucide-react';

type StudentFunctionSummary = {
  studentId: string;
  studentName: string;
  schoolName: string;
  currentBusinessName: string;
  currentFunctionName: string;
  totalFunctionsExperienced: number;
};

type FunctionRotationOverviewProps = {
  activeDepartmentsCount: number;
  studentsWith3PlusFunctions: number;
  avgFunctionsPerStudent: number;
  studentSummaries: StudentFunctionSummary[];
  onOpenStudentRotation: (studentId: string) => void;
};

export function FunctionRotationOverview(props: FunctionRotationOverviewProps) {
  return (
    <div className="w-full rounded-3xl border-2 border-fuchsia-400 bg-gradient-to-br from-purple-900 via-slate-950 to-rose-900 p-6 shadow-xl text-slate-50">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              Business Functions & Rotations
            </h2>
            <p className="text-sm text-pink-100 mt-1">
              See how many departments students are experiencing across local employers.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-3 border border-purple-400/30">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-purple-300" />
              <p className="text-xs text-purple-200 font-semibold">Active Departments</p>
            </div>
            <p className="text-2xl font-black text-white">{props.activeDepartmentsCount}</p>
          </div>

          <div className="bg-pink-500/20 backdrop-blur-sm rounded-xl p-3 border border-pink-400/30">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-pink-300" />
              <p className="text-xs text-pink-200 font-semibold">With 3+ Functions</p>
            </div>
            <p className="text-2xl font-black text-white">{props.studentsWith3PlusFunctions}</p>
          </div>

          <div className="bg-amber-500/20 backdrop-blur-sm rounded-xl p-3 border border-amber-400/30">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-amber-300" />
              <p className="text-xs text-amber-200 font-semibold">Avg per Student</p>
            </div>
            <p className="text-2xl font-black text-white">{props.avgFunctionsPerStudent.toFixed(1)}</p>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {props.studentSummaries.map((student) => (
          <button
            key={student.studentId}
            type="button"
            onClick={() => props.onOpenStudentRotation(student.studentId)}
            className="w-full flex items-center justify-between gap-4 rounded-2xl bg-slate-900/70 backdrop-blur-sm px-4 py-4 text-left hover:bg-slate-800/80 transition-all border border-fuchsia-500/20 hover:border-fuchsia-400/50 group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black">
                  {student.studentName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-slate-50">
                    {student.studentName}
                  </p>
                  <p className="text-xs text-pink-200">{student.schoolName}</p>
                </div>
              </div>
              
              <div className="bg-purple-500/10 rounded-lg p-2 border border-purple-400/20">
                <p className="text-xs text-purple-200 mb-1">Current Placement:</p>
                <p className="text-sm font-semibold text-white">
                  {student.currentBusinessName} · {student.currentFunctionName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-full px-4 py-2 shadow-lg">
                  <p className="text-2xl font-black text-white">
                    {student.totalFunctionsExperienced}
                  </p>
                  <p className="text-xs text-pink-100 font-semibold">functions</p>
                </div>
              </div>
              
              <div className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center group-hover:bg-fuchsia-500/30 transition-all">
                <Eye className="w-5 h-5 text-pink-300 group-hover:text-white transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-4 border border-fuchsia-400/30">
        <p className="text-sm text-center text-pink-100">
          <span className="font-bold text-white">{props.studentSummaries.length} students</span> are gaining 
          diverse work experience across <span className="font-bold text-white">{props.activeDepartmentsCount} business functions</span>
        </p>
      </div>
    </div>
  );
}
