import { AlertTriangle, FileText, DollarSign, Building2, CheckCircle, XCircle } from 'lucide-react';

interface EmploymentDisclosureProps {
  variant?: 'compact' | 'full';
  showCheckbox?: boolean;
  onAcknowledge?: (acknowledged: boolean) => void;
  acknowledged?: boolean;
}

export function EmploymentDisclosure({ 
  variant = 'full', 
  showCheckbox = false,
  onAcknowledge,
  acknowledged = false
}: EmploymentDisclosureProps) {
  
  if (variant === 'compact') {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-yellow-900 mb-2">⚠️ Important: ZALPHA is NOT Your Employer</h4>
            <p className="text-sm text-yellow-800 mb-3">
              <strong>ZALPHA is a job connection platform only.</strong> We do not employ workers or hire on behalf of companies. All employment relationships are directly between you and the hiring company.
            </p>
            <div className="bg-white rounded-lg p-3 border border-yellow-300">
              <p className="text-xs text-yellow-900 font-semibold mb-2">🧾 Independent Contractor Status:</p>
              <ul className="text-xs text-yellow-800 space-y-1">
                <li>✓ You are responsible for your own taxes (1099 income)</li>
                <li>✓ No benefits provided by ZALPHA (health insurance, PTO, etc.)</li>
                <li>✓ Direct relationship with employer for all work matters</li>
              </ul>
            </div>
          </div>
        </div>
        
        {showCheckbox && (
          <label className="flex items-start gap-3 mt-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => onAcknowledge?.(e.target.checked)}
              className="w-5 h-5 mt-0.5 cursor-pointer accent-yellow-600"
              required
            />
            <span className="text-sm text-yellow-900 font-semibold group-hover:text-yellow-700">
              I understand that ZALPHA is not my employer and that I am responsible for my own taxes as an independent contractor.
            </span>
          </label>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-400 rounded-2xl p-8 shadow-xl">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-yellow-900 mb-2">
            ⚠️ IMPORTANT EMPLOYMENT DISCLOSURE
          </h3>
          <p className="text-yellow-800 font-semibold">
            Please read carefully before using the ZALPHA platform
          </p>
        </div>
      </div>

      {/* Main Disclosure */}
      <div className="space-y-6">
        {/* ZALPHA is NOT an Employer */}
        <div className="bg-white rounded-xl p-6 border-2 border-red-400 shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-red-900 mb-2">ZALPHA is NOT Your Employer</h4>
              <p className="text-red-800 leading-relaxed">
                <strong>ZALPHA is a job connection platform and marketplace.</strong> We connect students and workers with employers, but we <strong>DO NOT employ workers</strong> or hire anyone on behalf of companies. ZALPHA does not act as an employer, staffing agency, or employment agency.
              </p>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-300">
            <p className="text-sm text-red-900">
              <strong>What this means:</strong> Any job offers, employment contracts, or work arrangements are <strong>directly between you and the hiring company.</strong> ZALPHA is not a party to your employment relationship.
            </p>
          </div>
        </div>

        {/* Direct Hire Relationship */}
        <div className="bg-white rounded-xl p-6 border-2 border-blue-400 shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <Building2 className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-blue-900 mb-2">Direct Hire Relationship</h4>
              <p className="text-blue-800 leading-relaxed">
                All hires facilitated through ZALPHA are <strong>direct relationships between the candidate (you) and the hiring company.</strong> The company is your employer or client—not ZALPHA.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-300">
              <p className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                The Hiring Company IS Responsible For:
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Employment contracts & agreements</li>
                <li>• Payroll and compensation</li>
                <li>• Benefits (if applicable)</li>
                <li>• Work assignments & supervision</li>
                <li>• Worker's compensation insurance</li>
                <li>• Compliance with labor laws</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-300">
              <p className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                ZALPHA is NOT Responsible For:
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your employment status</li>
                <li>• Payment of wages or benefits</li>
                <li>• Withholding taxes</li>
                <li>• Work conditions or disputes</li>
                <li>• Compliance with employment laws</li>
                <li>• Providing W-2 or 1099 forms</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Independent Contractor / 1099 Status */}
        <div className="bg-white rounded-xl p-6 border-2 border-purple-400 shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <FileText className="w-8 h-8 text-purple-600 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-purple-900 mb-2">🧾 Independent Contractor Status (1099)</h4>
              <p className="text-purple-800 leading-relaxed">
                Most contract work facilitated through ZALPHA should be treated as <strong>independent contractor relationships (1099 income)</strong> unless the hiring company explicitly offers you a W-2 employee position.
              </p>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-5 border-2 border-purple-300 mb-4">
            <p className="font-bold text-purple-900 mb-3 text-lg">📋 What "1099 Independent Contractor" Means:</p>
            <ul className="space-y-3 text-sm text-purple-800">
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">1.</span>
                <div>
                  <strong>You are self-employed:</strong> You work for the client company but are not their employee.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">2.</span>
                <div>
                  <strong>No tax withholding:</strong> The company does NOT withhold federal, state, or Social Security taxes from your pay.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">3.</span>
                <div>
                  <strong>You receive a 1099-NEC form:</strong> If you earn $600+ from a client in a year, they'll send you a 1099-NEC tax form (not a W-2).
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">4.</span>
                <div>
                  <strong>No employee benefits:</strong> You are not entitled to health insurance, paid time off, retirement plans, or other benefits.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">5.</span>
                <div>
                  <strong>Greater flexibility:</strong> You typically have more control over how and when you work.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* TAX RESPONSIBILITY */}
        <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-6 text-white shadow-lg border-4 border-red-700">
          <div className="flex items-start gap-3 mb-4">
            <DollarSign className="w-10 h-10 text-yellow-300 flex-shrink-0" />
            <div>
              <h4 className="text-2xl font-bold mb-2">💰 YOU ARE RESPONSIBLE FOR YOUR OWN TAXES</h4>
              <p className="text-red-50 font-semibold text-lg">
                This is the most important thing to understand:
              </p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5 border-2 border-white/50">
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-yellow-300">File your own tax returns:</strong> You must report all 1099 income to the IRS and your state/territory.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-yellow-300">Pay estimated quarterly taxes:</strong> You may need to pay estimated taxes 4 times per year to avoid penalties.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-yellow-300">Self-employment tax:</strong> You pay both the employer and employee portions of Social Security & Medicare (15.3% total).
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-yellow-300">Keep records:</strong> Track all income and expenses. You can deduct business expenses to reduce taxable income.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-yellow-300">Consult a tax professional:</strong> We strongly recommend speaking with an accountant or tax advisor.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-4 bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center border-2 border-yellow-600">
            ⚠️ ZALPHA DOES NOT WITHHOLD, PAY, OR MANAGE YOUR TAXES IN ANY WAY ⚠️
          </div>
        </div>

        {/* Helpful Resources */}
        <div className="bg-white rounded-xl p-6 border-2 border-green-400 shadow-lg">
          <h4 className="text-xl font-bold text-green-900 mb-4">📚 Tax Resources for Independent Contractors</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-green-50 rounded-lg p-4 border border-green-300">
              <p className="font-bold text-green-900 mb-2">For US Territories (CNMI, Guam, Hawaii):</p>
              <ul className="space-y-1 text-green-800">
                <li>• IRS.gov - Self-Employment Tax Center</li>
                <li>• IRS Form 1040-ES (Estimated Tax)</li>
                <li>• IRS Schedule C (Business Income)</li>
                <li>• Local tax authority for your territory</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-300">
              <p className="font-bold text-green-900 mb-2">🌺 For FSM Citizens:</p>
              <ul className="space-y-1 text-green-800">
                <li>• FSM National Government - Tax Division</li>
                <li>• State tax offices (if applicable)</li>
                <li>• Consult local tax advisor</li>
                <li>• Keep records of all income</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Acknowledgment Checkbox */}
      {showCheckbox && (
        <div className="mt-8 bg-white rounded-xl p-6 border-4 border-yellow-500 shadow-lg">
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => onAcknowledge?.(e.target.checked)}
              className="w-6 h-6 mt-1 cursor-pointer accent-yellow-600"
              required
            />
            <div className="flex-1">
              <p className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-700">
                ✅ I UNDERSTAND AND ACKNOWLEDGE:
              </p>
              <ul className="space-y-2 text-sm text-gray-800">
                <li>• ZALPHA is not my employer and does not employ or hire workers</li>
                <li>• All employment relationships are directly between me and the hiring company</li>
                <li>• I will likely be an independent contractor (1099) unless explicitly hired as a W-2 employee</li>
                <li>• I am responsible for filing and paying my own federal, state, and local taxes</li>
                <li>• I am responsible for paying self-employment taxes (Social Security & Medicare)</li>
                <li>• ZALPHA does not withhold taxes, provide benefits, or manage employment matters</li>
                <li>• I should consult a tax professional for guidance on my specific situation</li>
              </ul>
            </div>
          </label>
        </div>
      )}

      {/* Final Notice */}
      <div className="mt-6 bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Questions?</strong> If you have questions about your employment status, tax obligations, or contract terms, please consult with a qualified attorney, accountant, or tax advisor. ZALPHA cannot provide legal or tax advice.
        </p>
      </div>
    </div>
  );
}