import { useState } from 'react';
import { AlertCircle, CheckCircle, FileText, HardHat, Clock, ExternalLink, MapPin, Phone, ShieldAlert, Hammer } from 'lucide-react';

interface RegionalRequirement {
  region: string;
  osha10Card: {
    required: boolean;
    name: string;
    issuingAgency: string;
    validity: string;
    cost: string;
    whereToGet: string;
    phone: string;
    website: string;
    notes: string[];
  };
  healthClearance: {
    required: boolean;
    name: string;
    includes: string[];
    validity: string;
    whereToGet: string;
    cost: string;
    notes: string[];
  };
  workPermits: {
    required: boolean;
    name: string;
    description: string;
    whereToGet: string;
    cost: string;
    notes: string[];
  };
  additionalRequirements: {
    name: string;
    description: string;
    required: boolean;
    cost?: string;
  }[];
}

const regionalRequirements: RegionalRequirement[] = [
  {
    region: 'CNMI',
    osha10Card: {
      required: true,
      name: 'OSHA 10-Hour Construction Safety Card',
      issuingAgency: 'OSHA-Authorized Training Providers',
      validity: 'Lifetime (no expiration)',
      cost: '$50-$100',
      whereToGet: 'Online: 360training.com, CareerSafe.com, ClickSafety.com or Local CNMI contractors may offer in-person training',
      phone: 'Online providers: 24/7 support',
      website: 'https://www.osha.gov/training/outreach',
      notes: [
        'MANDATORY for all construction workers in CNMI',
        'Must complete 10-hour course covering fall protection, electrical safety, scaffolding, PPE',
        'Card never expires - valid for life',
        'Online courses take 2 days minimum (10 hours of instruction)',
        'Employers will NOT hire without this card',
        'Physical card mailed within 2-3 weeks after completion',
      ]
    },
    healthClearance: {
      required: true,
      name: 'Physical Fitness & TB Clearance',
      includes: ['TB Test (Skin Test or Chest X-Ray)', 'Physical Exam - confirm ability to lift 50+ lbs', 'Drug Screening (often required by employers)', 'Vision & Hearing Test'],
      validity: '1 year',
      whereToGet: 'Commonwealth Healthcare Corporation (CHCC) or private clinics',
      cost: '$80-$200',
      notes: [
        'TB test mandatory for construction workers',
        'Must prove physical ability to perform manual labor',
        'Drug screening may be required by most contractors',
        'Some employers require pre-employment physical',
      ]
    },
    workPermits: {
      required: false,
      name: 'Work Authorization',
      description: 'U.S. Citizens, CNMI long-term residents, and CW-1 visa holders can work in construction',
      whereToGet: 'CNMI Department of Labor - Foreign Worker Division',
      cost: 'Varies by visa type',
      notes: [
        'U.S. Citizens and CNMI residents do not need work permits',
        'Non-U.S. citizens need CW-1 or other valid work visa',
      ]
    },
    additionalRequirements: [
      {
        name: "Driver's License (Often Required)",
        description: 'Many construction jobs require a valid driver\'s license for operating vehicles and equipment',
        required: false,
        cost: '$25-$50'
      },
      {
        name: 'Hard Hat, Steel-Toe Boots, Safety Glasses',
        description: 'Personal Protective Equipment (PPE) - Some employers provide, others require you to purchase',
        required: true,
        cost: '$100-$200'
      },
      {
        name: 'First Aid/CPR (Recommended)',
        description: 'Not always required but highly valued by employers',
        required: false,
        cost: '$40-$80'
      }
    ]
  },
  {
    region: 'FSM - Yap',
    osha10Card: {
      required: true,
      name: 'OSHA 10-Hour Construction Card',
      issuingAgency: 'OSHA-Authorized Online Providers',
      validity: 'Lifetime',
      cost: '$50-$100',
      whereToGet: 'Online courses: 360training.com, CareerSafe.com (No in-person training available in Yap)',
      phone: 'Online support',
      website: 'https://www.osha.gov/training/outreach',
      notes: [
        'Required for construction work',
        'Online training only option in FSM',
        'Takes 2-3 days to complete',
        'Card mailed to FSM address (allow 3-4 weeks)',
      ]
    },
    healthClearance: {
      required: true,
      name: 'Construction Worker Health Certificate',
      includes: ['TB Screening', 'Physical Fitness Exam', 'Drug Test (employer may require)'],
      validity: '1 year',
      whereToGet: 'Yap State Hospital',
      cost: '$50-$120',
      notes: [
        'Required for construction and labor work',
        'Must show ability to perform physical labor',
      ]
    },
    workPermits: {
      required: false,
      name: 'Work Authorization',
      description: 'FSM citizens do not need permits. Foreign workers need work visas.',
      whereToGet: 'FSM Department of Resources & Development',
      cost: 'N/A for FSM citizens',
      notes: []
    },
    additionalRequirements: [
      {
        name: 'PPE (Hard Hat, Boots, Gloves)',
        description: 'Required safety equipment',
        required: true,
        cost: '$100-$180'
      }
    ]
  },
  {
    region: 'FSM - Chuuk',
    osha10Card: {
      required: true,
      name: 'OSHA 10-Hour Construction Safety',
      issuingAgency: 'OSHA-Authorized Online Training',
      validity: 'Lifetime',
      cost: '$50-$100',
      whereToGet: 'Online: 360training.com, ClickSafety.com',
      phone: 'Online support',
      website: 'https://www.osha.gov/training/outreach',
      notes: [
        'Mandatory for construction jobs',
        'Online course only',
        'Completion takes 2+ days',
      ]
    },
    healthClearance: {
      required: true,
      name: 'Physical & TB Clearance',
      includes: ['TB Test', 'Physical Fitness Assessment'],
      validity: '1 year',
      whereToGet: 'Chuuk State Hospital',
      cost: '$50-$120',
      notes: [
        'Required for heavy labor positions',
      ]
    },
    workPermits: {
      required: false,
      name: 'Work Authorization',
      description: 'FSM citizens do not need permits',
      whereToGet: 'N/A',
      cost: 'N/A',
      notes: []
    },
    additionalRequirements: [
      {
        name: 'Safety Equipment',
        description: 'Hard hat, steel-toe boots, gloves',
        required: true,
        cost: '$100-$180'
      }
    ]
  },
  {
    region: 'FSM - Pohnpei',
    osha10Card: {
      required: true,
      name: 'OSHA 10-Hour Construction Card',
      issuingAgency: 'OSHA Online Training Providers',
      validity: 'Lifetime',
      cost: '$50-$100',
      whereToGet: 'Online: 360training.com, CareerSafe.com',
      phone: 'Online support',
      website: 'https://www.osha.gov/training/outreach',
      notes: [
        'Required for construction employment',
        'Online courses available',
      ]
    },
    healthClearance: {
      required: true,
      name: 'Health Certificate for Construction',
      includes: ['TB Screening', 'Physical Exam'],
      validity: '1 year',
      whereToGet: 'Pohnpei State Hospital',
      cost: '$60-$130',
      notes: [
        'Mandatory for construction workers',
      ]
    },
    workPermits: {
      required: false,
      name: 'Work Authorization',
      description: 'FSM citizens do not need permits',
      whereToGet: 'N/A',
      cost: 'N/A',
      notes: []
    },
    additionalRequirements: [
      {
        name: 'PPE Equipment',
        description: 'Safety gear required on all sites',
        required: true,
        cost: '$100-$180'
      }
    ]
  },
  {
    region: 'FSM - Kosrae',
    osha10Card: {
      required: true,
      name: 'OSHA 10-Hour Construction',
      issuingAgency: 'OSHA Online Providers',
      validity: 'Lifetime',
      cost: '$50-$100',
      whereToGet: 'Online courses only',
      phone: 'Online support',
      website: 'https://www.osha.gov/training/outreach',
      notes: [
        'Required for construction work',
        'Online training only',
      ]
    },
    healthClearance: {
      required: true,
      name: 'Physical & TB Test',
      includes: ['TB Test', 'Physical Fitness Check'],
      validity: '1 year',
      whereToGet: 'Kosrae State Hospital',
      cost: '$50-$120',
      notes: [
        'Required for construction jobs',
      ]
    },
    workPermits: {
      required: false,
      name: 'Work Authorization',
      description: 'FSM citizens do not need permits',
      whereToGet: 'N/A',
      cost: 'N/A',
      notes: []
    },
    additionalRequirements: [
      {
        name: 'Safety Gear',
        description: 'PPE required',
        required: true,
        cost: '$100-$180'
      }
    ]
  },
  {
    region: 'Guam',
    osha10Card: {
      required: true,
      name: 'OSHA 10-Hour Construction Safety Card',
      issuingAgency: 'OSHA-Authorized Training Providers',
      validity: 'Lifetime',
      cost: '$60-$120',
      whereToGet: 'In-person: Guam Community College (GCC), Guam Contractors Association | Online: 360training.com, ClickSafety.com',
      phone: '(671) 735-5531 (Guam Dept of Labor)',
      website: 'https://dol.guam.gov',
      notes: [
        'MANDATORY for ALL construction workers in Guam',
        'Strictly enforced - job sites will turn you away without card',
        'Online or in-person training available',
        'Covers fall protection, electrical safety, scaffolding, ladder safety, PPE',
        'Card never expires',
        'Physical card issued - keep it safe!',
      ]
    },
    healthClearance: {
      required: true,
      name: 'Pre-Employment Physical & Drug Screen',
      includes: ['TB Test (2-step PPD or Chest X-Ray)', 'Physical Exam for heavy lifting', 'Drug Screening (10-panel urine test)', 'Vision & Hearing Test', 'Back/Spine Assessment'],
      validity: '1-2 years',
      whereToGet: 'Guam Regional Medical City, FHP Health Center, Guam Memorial Hospital, Private occupational health clinics',
      cost: '$150-$350',
      notes: [
        'TB clearance MANDATORY',
        'Drug screening required by 95% of contractors',
        'Must prove ability to lift 50+ lbs',
        'Some jobs require DOT physical if driving',
      ]
    },
    workPermits: {
      required: false,
      name: 'Work Authorization',
      description: 'U.S. Citizens and permanent residents can work freely. H-2B visa workers need sponsor.',
      whereToGet: 'Guam Department of Labor',
      cost: 'N/A for U.S. citizens',
      notes: [
        'U.S. Citizens do not need permits',
        'H-2B workers must be sponsored by employer',
      ]
    },
    additionalRequirements: [
      {
        name: "Driver's License",
        description: 'Guam DL required for many positions (equipment operators, foremen)',
        required: false,
        cost: '$40-$60'
      },
      {
        name: 'PPE - Hard Hat, Steel-Toe Boots, Safety Vest, Gloves, Safety Glasses',
        description: 'Required on all job sites - some employers provide, others require you purchase',
        required: true,
        cost: '$150-$250'
      },
      {
        name: 'Forklift/Heavy Equipment Certification',
        description: 'Required if operating forklifts, loaders, excavators',
        required: false,
        cost: '$150-$400'
      },
      {
        name: 'First Aid/CPR/AED Certification',
        description: 'Highly valued, sometimes required for supervisors',
        required: false,
        cost: '$60-$100'
      }
    ]
  },
  {
    region: 'Hawaii',
    osha10Card: {
      required: true,
      name: 'OSHA 10-Hour Construction Card',
      issuingAgency: 'OSHA-Authorized Providers',
      validity: 'Lifetime',
      cost: '$50-$120',
      whereToGet: 'In-person: Hawaii Community Colleges, Union training centers | Online: 360training.com, CareerSafe.com',
      phone: '(808) 586-8844 (HIOSH)',
      website: 'https://labor.hawaii.gov/hiosh',
      notes: [
        'REQUIRED by most major contractors and union jobs',
        'Hawaii OSHA (HIOSH) enforces safety standards',
        'Online and in-person options available',
        'Covers all major construction safety topics',
        'Union jobs (IBEW, Carpenters, Laborers) may require additional union safety training',
      ]
    },
    healthClearance: {
      required: false,
      name: 'Pre-Employment Physical (Employer-Specific)',
      includes: ['TB Test (if required)', 'Physical Exam', 'Drug Screening (very common)', 'Lifting Capacity Test'],
      validity: '1-2 years',
      whereToGet: 'Occupational health clinics, Kaiser, Queens Medical Center, private clinics',
      cost: '$100-$300',
      notes: [
        'Not state-mandated, but most employers require TB test and drug screening',
        'Union jobs often require comprehensive physical exam',
        'Drug testing standard for 90% of construction companies',
      ]
    },
    workPermits: {
      required: false,
      name: 'Work Authorization',
      description: 'U.S. Citizens can work freely. State registration for contractors.',
      whereToGet: 'Hawaii DCCA - Contractors License Board',
      cost: 'N/A for workers; $100-$200 for contractor licenses',
      notes: [
        'Workers do not need permits',
        'Contractors must be licensed by state',
      ]
    },
    additionalRequirements: [
      {
        name: "Hawaii State ID or Driver's License",
        description: 'Required for most jobs',
        required: false,
        cost: '$40-$60'
      },
      {
        name: 'PPE (Hard Hat, Boots, Vest, Glasses)',
        description: 'Required on all sites',
        required: true,
        cost: '$150-$250'
      },
      {
        name: 'Union Membership (for union jobs)',
        description: 'Hawaii has strong unions - IBEW, Carpenters, Laborers unions control many large projects',
        required: false,
        cost: 'Initiation fees $100-$500 + monthly dues'
      },
      {
        name: 'DOT Medical Card (if driving commercial vehicles)',
        description: 'Required for operating trucks over 10,000 lbs',
        required: false,
        cost: '$75-$150'
      }
    ]
  },
  {
    region: 'Palau',
    osha10Card: {
      required: true,
      name: 'OSHA 10-Hour Construction Safety',
      issuingAgency: 'OSHA Online Training Providers',
      validity: 'Lifetime',
      cost: '$50-$100',
      whereToGet: 'Online courses: 360training.com (No local in-person training)',
      phone: 'Online support',
      website: 'https://www.osha.gov/training/outreach',
      notes: [
        'Required for construction work',
        'Online training only option',
        'Card mailed to Palau (allow 3-4 weeks)',
      ]
    },
    healthClearance: {
      required: true,
      name: 'Physical Fitness & TB Certificate',
      includes: ['TB Screening', 'Physical Exam', 'Drug Test (employer-specific)'],
      validity: '1 year',
      whereToGet: 'Belau National Hospital',
      cost: '$80-$180',
      notes: [
        'Required for construction and labor jobs',
        'TB clearance mandatory',
      ]
    },
    workPermits: {
      required: false,
      name: 'Work Authorization',
      description: 'Palauan citizens do not need permits. Foreign workers need work visas.',
      whereToGet: 'Palau Ministry of Justice - Immigration',
      cost: 'N/A for citizens',
      notes: []
    },
    additionalRequirements: [
      {
        name: 'Safety Equipment (PPE)',
        description: 'Hard hat, boots, gloves required',
        required: true,
        cost: '$100-$200'
      }
    ]
  },
  {
    region: 'Marshall Islands',
    osha10Card: {
      required: true,
      name: 'OSHA 10-Hour Construction Card',
      issuingAgency: 'OSHA Online Providers',
      validity: 'Lifetime',
      cost: '$50-$100',
      whereToGet: 'Online: 360training.com, CareerSafe.com',
      phone: 'Online support',
      website: 'https://www.osha.gov/training/outreach',
      notes: [
        'Required for construction employment',
        'Online courses only',
        'Allow 3-4 weeks for card delivery to RMI',
      ]
    },
    healthClearance: {
      required: true,
      name: 'Construction Worker Health Certificate',
      includes: ['TB Test', 'Physical Fitness Exam', 'Drug Screening (employer may require)'],
      validity: '1 year',
      whereToGet: 'Majuro Hospital or outer island health centers',
      cost: '$60-$150',
      notes: [
        'Required for construction work',
        'TB test mandatory',
      ]
    },
    workPermits: {
      required: false,
      name: 'Work Authorization',
      description: 'RMI citizens do not need permits',
      whereToGet: 'N/A',
      cost: 'N/A',
      notes: []
    },
    additionalRequirements: [
      {
        name: 'PPE Equipment',
        description: 'Safety gear required',
        required: true,
        cost: '$100-$180'
      }
    ]
  }
];

interface RegionalConstructionComplianceGuideProps {
  studentLocation?: string;
  jobLocation?: string;
  showForJobType?: string;
}

export function RegionalConstructionComplianceGuide({ 
  studentLocation, 
  jobLocation,
  showForJobType 
}: RegionalConstructionComplianceGuideProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>(
    jobLocation || studentLocation || 'CNMI'
  );

  const requirement = regionalRequirements.find(r => r.region === selectedRegion);

  if (!requirement) return null;

  const isConstructionJob = showForJobType && (
    showForJobType.includes('Construction') || 
    showForJobType.includes('Trades') ||
    showForJobType.includes('Labor')
  );

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-400 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-6">
        <ShieldAlert className="w-7 h-7 text-orange-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-orange-900 mb-2 flex items-center gap-2">
            <HardHat className="w-6 h-6" />
            Required Certifications for Construction Jobs
          </h3>
          <p className="text-sm text-orange-800 mb-4">
            {isConstructionJob ? (
              <>⚠️ <strong>CRITICAL:</strong> These certifications are MANDATORY. You CANNOT work on construction sites without them!</>
            ) : (
              <>If you're applying for construction, trades, or labor jobs, these certifications are required.</>
            )}
          </p>

          {/* Region Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-orange-900 mb-2">
              📍 Select Job Location:
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white font-medium"
            >
              <option value="CNMI">CNMI (Commonwealth of the Northern Mariana Islands)</option>
              <option value="FSM - Yap">FSM - Yap State</option>
              <option value="FSM - Chuuk">FSM - Chuuk State</option>
              <option value="FSM - Pohnpei">FSM - Pohnpei State</option>
              <option value="FSM - Kosrae">FSM - Kosrae State</option>
              <option value="Guam">Guam</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Palau">Palau</option>
              <option value="Marshall Islands">Marshall Islands</option>
            </select>
          </div>

          {/* CRITICAL WARNING */}
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-900 mb-1">🚨 IMPORTANT WARNING</h4>
                <p className="text-sm text-red-800">
                  <strong>You WILL BE TURNED AWAY from job sites if you do not have these certifications.</strong> 
                  Construction sites enforce strict OSHA safety rules. No card = No work. Start your OSHA 10 training NOW!
                </p>
              </div>
            </div>
          </div>

          {/* Requirements for Selected Region */}
          <div className="space-y-6">
            {/* OSHA 10 Card - MOST CRITICAL */}
            <div className="bg-white border-4 border-red-500 rounded-lg p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <HardHat className="w-6 h-6 text-red-600" />
                <h4 className="font-bold text-gray-900 text-lg">
                  {requirement.osha10Card.name}
                  <span className="ml-2 text-red-600 text-base animate-pulse">⚠️ ABSOLUTELY REQUIRED</span>
                </h4>
              </div>

              <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg">
                <p className="text-sm text-red-900 font-semibold">
                  🚫 <strong>NO EXCEPTIONS:</strong> You cannot work on ANY construction site without this card. 
                  Job sites are inspected by OSHA - they will fine employers who hire unqualified workers.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Issuing Agency</div>
                  <div className="font-semibold text-sm text-gray-900">
                    {requirement.osha10Card.issuingAgency}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Validity Period</div>
                  <div className="font-semibold text-sm text-gray-900 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    {requirement.osha10Card.validity}
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-300">
                  <div className="text-xs text-gray-600 mb-1">Cost</div>
                  <div className="font-semibold text-sm text-green-800">
                    {requirement.osha10Card.cost}
                  </div>
                  <div className="text-xs text-green-700 mt-1">💰 One-time investment - never expires!</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Training Duration</div>
                  <div className="font-semibold text-sm text-gray-900">
                    2-3 days (10 hours minimum)
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  Where to Get Training:
                </div>
                <div className="text-sm text-gray-900 bg-blue-50 rounded-lg p-3 border border-blue-300">
                  {requirement.osha10Card.whereToGet}
                </div>
              </div>

              <a
                href={requirement.osha10Card.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-semibold mb-4 bg-blue-50 px-4 py-2 rounded-lg"
              >
                <ExternalLink className="w-4 h-4" />
                Official OSHA Training Website
              </a>

              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">What You'll Learn:</div>
                <ul className="space-y-2">
                  {requirement.osha10Card.notes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Start Guide */}
              <div className="mt-4 p-4 bg-green-50 border-2 border-green-400 rounded-lg">
                <h5 className="font-bold text-green-900 mb-2">🎯 Quick Start - Get Your OSHA 10 Card NOW:</h5>
                <ol className="space-y-1 text-sm text-green-900">
                  <li><strong>1.</strong> Go to 360training.com, CareerSafe.com, or ClickSafety.com</li>
                  <li><strong>2.</strong> Search for "OSHA 10-Hour Construction"</li>
                  <li><strong>3.</strong> Pay ${requirement.osha10Card.cost.split('-')[0].slice(1)} (credit card)</li>
                  <li><strong>4.</strong> Complete 10 hours of training over 2-3 days</li>
                  <li><strong>5.</strong> Pass final exam (open book, can retake)</li>
                  <li><strong>6.</strong> Receive digital certificate immediately</li>
                  <li><strong>7.</strong> Physical card mailed in 2-3 weeks</li>
                </ol>
              </div>
            </div>

            {/* Health Clearance */}
            <div className="bg-white border-2 border-pink-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-pink-600" />
                <h4 className="font-bold text-gray-900 text-lg">
                  {requirement.healthClearance.name}
                  {requirement.healthClearance.required && (
                    <span className="ml-2 text-red-600 text-sm">REQUIRED*</span>
                  )}
                </h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Validity Period</div>
                  <div className="font-semibold text-sm text-gray-900 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    {requirement.healthClearance.validity}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Estimated Cost</div>
                  <div className="font-semibold text-sm text-green-700">
                    {requirement.healthClearance.cost}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  Where to Get:
                </div>
                <div className="text-sm text-gray-900 bg-pink-50 rounded-lg p-3">
                  {requirement.healthClearance.whereToGet}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">What's Included:</div>
                <ul className="space-y-2">
                  {requirement.healthClearance.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Important Notes:</div>
                <ul className="space-y-2">
                  {requirement.healthClearance.notes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Additional Requirements */}
            {requirement.additionalRequirements.length > 0 && (
              <div className="bg-white border-2 border-blue-200 rounded-lg p-5">
                <h4 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                  <Hammer className="w-5 h-5 text-blue-600" />
                  Additional Requirements & Gear
                </h4>
                <div className="space-y-3">
                  {requirement.additionalRequirements.map((req, index) => (
                    <div key={index} className={`rounded-lg p-4 ${req.required ? 'bg-orange-50 border-2 border-orange-400' : 'bg-blue-50 border border-blue-200'}`}>
                      <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        {req.name}
                        {req.required && (
                          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold">REQUIRED</span>
                        )}
                        {req.cost && (
                          <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded ml-auto">{req.cost}</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-700">{req.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Steps */}
          <div className="mt-6 bg-green-50 border-2 border-green-400 rounded-lg p-5">
            <div className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              📋 Your Construction Job Readiness Checklist:
            </div>
            <ol className="space-y-2 text-sm text-green-800">
              <li className="flex gap-2">
                <span className="font-bold min-w-[20px]">1.</span>
                <span><strong>OSHA 10 Card (START TODAY!):</strong> Sign up for online course immediately - takes 2-3 days</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold min-w-[20px]">2.</span>
                <span><strong>Health Certificate:</strong> Schedule TB test and physical exam at local hospital/clinic</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold min-w-[20px]">3.</span>
                <span><strong>PPE Equipment:</strong> Purchase hard hat, steel-toe boots, safety glasses, gloves, vest</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold min-w-[20px]">4.</span>
                <span><strong>Drug Test:</strong> Be prepared for pre-employment drug screening (most employers require)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold min-w-[20px]">5.</span>
                <span><strong>Upload Certificates:</strong> Add all certifications to your ZALPHA profile</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold min-w-[20px]">6.</span>
                <span><strong>Stay Current:</strong> Renew health certificates annually, keep OSHA card safe!</span>
              </li>
            </ol>
          </div>

          {/* Pro Tips */}
          <div className="mt-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
            <p className="text-sm text-yellow-900 mb-2">
              <strong>💡 Pro Tips for Construction Work:</strong>
            </p>
            <ul className="text-sm text-yellow-900 space-y-1">
              <li>• <strong>Start OSHA 10 NOW</strong> - It takes 2-3 days minimum to complete</li>
              <li>• <strong>Budget $300-$500 total</strong> for all certifications and PPE equipment</li>
              <li>• <strong>Keep certificates in plastic sleeve</strong> - job sites will check them daily</li>
              <li>• <strong>Arrive on time</strong> - Construction starts early (6-7 AM)</li>
              <li>• <strong>Be physically ready</strong> - Heavy lifting, long hours in sun/heat</li>
              <li>• <strong>No drugs/alcohol</strong> - Random testing is common</li>
            </ul>
          </div>

          {/* Timeline Warning */}
          <div className="mt-4 p-4 bg-red-50 border-2 border-red-400 rounded-lg">
            <p className="text-sm text-red-900 font-bold">
              ⏰ <strong>TIMELINE: Start 3-4 weeks before you need work!</strong> OSHA card takes 2-3 days for training + 2-3 weeks to mail. 
              TB test takes 48-72 hours for results. Plan ahead!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
