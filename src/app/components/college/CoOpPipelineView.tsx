import { School, Users, TrendingUp, Eye, ArrowRight } from 'lucide-react';

type SchoolPipeline = {
  id: string;
  schoolName: string;
  location: string;
  totalStudents: number;
  interestedStudents: number;
  inquiries: number;
  applicants: number;
  enrolled: number;
};

type CoOpPipelineViewProps = {
  schools: SchoolPipeline[];
  onViewSchoolDetails: (schoolId: string) => void;
};

export function CoOpPipelineView(props: CoOpPipelineViewProps) {
  const totalInterested = props.schools.reduce((sum, s) => sum + s.interestedStudents, 0);
  const totalInquiries = props.schools.reduce((sum, s) => sum + s.inquiries, 0);
  const totalApplicants = props.schools.reduce((sum, s) => sum + s.applicants, 0);
  const totalEnrolled = props.schools.reduce((sum, s) => sum + s.enrolled, 0);

  return (
    <div className="w-full space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5" />
            <span className="text-xs font-semibold opacity-90">Interested</span>
          </div>
          <div className="text-3xl font-black">{totalInterested}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-semibold opacity-90">Inquiries</span>
          </div>
          <div className="text-3xl font-black">{totalInquiries}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-semibold opacity-90">Applicants</span>
          </div>
          <div className="text-3xl font-black">{totalApplicants}</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <School className="w-5 h-5" />
            <span className="text-xs font-semibold opacity-90">Enrolled</span>
          </div>
          <div className="text-3xl font-black">{totalEnrolled}</div>
        </div>
      </div>

      {/* School List */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900">Western Region High Schools</h3>
        
        {props.schools.map((school) => {
          const conversionRate = school.interestedStudents > 0 
            ? (school.enrolled / school.interestedStudents) * 100 
            : 0;

          return (
            <div
              key={school.id}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-blue-300 transition-all overflow-hidden"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <School className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{school.schoolName}</h4>
                      <p className="text-sm text-gray-600">{school.location}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {school.totalStudents} total students in co-op program
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => props.onViewSchoolDetails(school.id)}
                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-200 transition-all flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </div>

                {/* Pipeline Funnel */}
                <div className="space-y-3">
                  {/* Interested */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-600">Interested in Your Programs</span>
                      <span className="text-sm font-bold text-blue-600">{school.interestedStudents}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${(school.interestedStudents / school.totalStudents) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Pipeline Steps */}
                  <div className="grid grid-cols-3 gap-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{school.inquiries}</div>
                      <div className="text-xs text-gray-600">Inquiries</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {school.interestedStudents > 0 
                          ? `${((school.inquiries / school.interestedStudents) * 100).toFixed(0)}%` 
                          : '0%'}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{school.applicants}</div>
                      <div className="text-xs text-gray-600">Applied</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {school.inquiries > 0 
                          ? `${((school.applicants / school.inquiries) * 100).toFixed(0)}%` 
                          : '0%'}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{school.enrolled}</div>
                      <div className="text-xs text-gray-600">Enrolled</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {school.applicants > 0 
                          ? `${((school.enrolled / school.applicants) * 100).toFixed(0)}%` 
                          : '0%'}
                      </div>
                    </div>
                  </div>

                  {/* Conversion Summary */}
                  <div className="flex items-center justify-between bg-green-50 rounded-xl p-3 border border-green-200">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-gray-700">Overall Conversion Rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-green-600">{conversionRate.toFixed(1)}%</span>
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
