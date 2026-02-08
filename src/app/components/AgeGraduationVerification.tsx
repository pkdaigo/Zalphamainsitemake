import { useState } from 'react';
import { Calendar, AlertCircle, CheckCircle, GraduationCap, Cake } from 'lucide-react';

interface AgeGraduationVerificationProps {
  onVerified: (data: { dateOfBirth: string; graduationYear: string; age: number; isEligible: boolean }) => void;
  onBack?: () => void;
}

export function AgeGraduationVerification({ onVerified, onBack }: AgeGraduationVerificationProps) {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [graduationMonth, setGraduationMonth] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [age, setAge] = useState<number | null>(null);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  // Calculate current academic year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 1-12
  
  // Academic year runs Aug-July, so if we're in Jan-July, current academic year ends this year
  // If we're in Aug-Dec, current academic year ends next year
  const currentAcademicYear = currentMonth >= 8 ? currentYear + 1 : currentYear;
  
  // Eligible graduation years: current academic year and previous year
  const eligibleGraduationYears = [
    currentAcademicYear - 1, // Last year
    currentAcademicYear,     // Current year
  ];

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const validateEligibility = () => {
    const validationErrors: string[] = [];
    
    // Validate date of birth
    if (!dateOfBirth) {
      validationErrors.push('Date of birth is required');
    } else {
      const calculatedAge = calculateAge(dateOfBirth);
      setAge(calculatedAge);
      
      if (calculatedAge < 18) {
        validationErrors.push(`You must be at least 18 years old. You are currently ${calculatedAge} years old.`);
      }
      
      if (calculatedAge > 100) {
        validationErrors.push('Please enter a valid date of birth');
      }
    }

    // Validate graduation year and month
    if (!graduationYear) {
      validationErrors.push('Graduation year is required');
    } else {
      const gradYear = parseInt(graduationYear);
      
      if (!eligibleGraduationYears.includes(gradYear)) {
        validationErrors.push(
          `You must have graduated in ${eligibleGraduationYears.join(' or ')}. ` +
          'ZALPHA is only available for college students and high school graduates within one year of graduation.'
        );
      }
    }

    if (!graduationMonth) {
      validationErrors.push('Graduation month is required');
    }

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      setIsEligible(true);
      onVerified({
        dateOfBirth,
        graduationYear: `${graduationMonth} ${graduationYear}`,
        age: age!,
        isEligible: true,
      });
    } else {
      setIsEligible(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateEligibility();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Age & Graduation Verification</h2>
            <p className="text-gray-600 text-sm">Confirm your eligibility for ZALPHA</p>
          </div>
        </div>

        {/* Eligibility Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Eligibility Requirements
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <Cake className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span><strong>Age:</strong> You must be at least 18 years old</span>
            </li>
            <li className="flex items-start gap-2">
              <GraduationCap className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Graduation:</strong> You must have graduated (or will graduate) in{' '}
                {eligibleGraduationYears.join(' or ')}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Verification:</strong> You'll need to upload your government ID and student ID
              </span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              required
            />
            {age !== null && age >= 18 && (
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                You are {age} years old ✓
              </p>
            )}
          </div>

          {/* Graduation Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Graduation Date <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Month</label>
                <select
                  value={graduationMonth}
                  onChange={(e) => setGraduationMonth(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Year</label>
                <select
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select year</option>
                  {/* Show current year and previous 2 years */}
                  {[currentAcademicYear, currentAcademicYear - 1, currentAcademicYear - 2].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Current students: Select your expected graduation date
            </p>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-red-900 mb-2">Eligibility Issues</h4>
                  <ul className="space-y-1">
                    {errors.map((error, idx) => (
                      <li key={idx} className="text-sm text-red-800">
                        • {error}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {isEligible && errors.length === 0 && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-green-900 mb-1">Eligibility Confirmed! ✓</h4>
                  <p className="text-sm text-green-800">
                    You meet the age and graduation requirements. Next, you'll need to verify your identity
                    with your government ID and student ID.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold text-lg shadow-lg"
            >
              {isEligible ? 'Continue to ID Verification' : 'Verify Eligibility'}
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            <strong>Privacy Note:</strong> Your date of birth is only used for age verification and is never
            shared with employers. Your graduation date helps us connect you with appropriate opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}