import { useState } from 'react';
import { AlertCircle, CheckCircle, FileText, Heart, Clock, ExternalLink, MapPin, Phone, Mail } from 'lucide-react';

interface RegionalRequirement {
  region: string;
  foodHandlerCard: {
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
  healthCertificate: {
    required: boolean;
    name: string;
    includes: string[];
    validity: string;
    whereToGet: string;
    cost: string;
    notes: string[];
  };
  additionalRequirements: {
    name: string;
    description: string;
    required: boolean;
  }[];
}

const regionalRequirements: RegionalRequirement[] = [
  {
    region: 'CNMI',
    foodHandlerCard: {
      required: true,
      name: 'CNMI Food Handler Permit',
      issuingAgency: 'CNMI Division of Environmental Health',
      validity: '2 years',
      cost: '$25-$50',
      whereToGet: 'Commonwealth Healthcare Corporation (CHCC) - Environmental Health Division',
      phone: '(670) 664-4870',
      website: 'https://chcc.gov.mp',
      notes: [
        'Must complete food safety training course',
        'Pass written exam (can be retaken if failed)',
        'Required for ALL food handlers in restaurants, hotels, catering',
        'Bring valid photo ID and proof of employment',
      ]
    },
    healthCertificate: {
      required: true,
      name: 'Health Clearance Certificate',
      includes: ['TB Test (Tuberculin Skin Test or Chest X-Ray)', 'Physical Examination', 'Stool Sample (for some positions)'],
      validity: '1 year',
      whereToGet: 'CHCC Community Health Center or private clinics',
      cost: '$50-$150',
      notes: [
        'Required for food handlers, healthcare workers, and hospitality staff',
        'TB test must be negative',
        'Some employers may require additional vaccinations (Hepatitis A recommended)',
      ]
    },
    additionalRequirements: [
      {
        name: 'Work Permit',
        description: 'U.S. Citizens and CNMI residents do not need work permits. Non-U.S. citizens need proper visa status.',
        required: false
      },
      {
        name: 'ABC Card (Alcohol Beverage Control)',
        description: 'REQUIRED for bartenders and servers who handle alcohol in restaurants, bars, nightclubs. Issued by CNMI Alcoholic Beverage and Tobacco Control Division. Must complete alcohol awareness training. Valid 2 years. Cost: $35-$75. Training covers responsible alcohol service, checking IDs, and preventing over-service.',
        required: true // Required for alcohol service positions
      }
    ]
  },
  {
    region: 'FSM - Yap',
    foodHandlerCard: {
      required: true,
      name: 'Yap State Food Handler Certificate',
      issuingAgency: 'Yap State Department of Health Services',
      validity: '1-2 years',
      cost: '$15-$30',
      whereToGet: 'Yap State Hospital - Environmental Health Office',
      phone: '(691) 350-2115',
      website: 'Contact local health department',
      notes: [
        'Food safety training required',
        'Certificate must be displayed at workplace',
        'Renewal required before expiration',
      ]
    },
    healthCertificate: {
      required: true,
      name: 'FSM Health Certificate',
      includes: ['TB Screening', 'General Health Exam', 'Immunization Record Review'],
      validity: '1 year',
      whereToGet: 'Yap State Hospital or local health clinics',
      cost: '$30-$80',
      notes: [
        'Required for food service and healthcare workers',
        'TB clearance mandatory',
      ]
    },
    additionalRequirements: []
  },
  {
    region: 'FSM - Chuuk',
    foodHandlerCard: {
      required: true,
      name: 'Chuuk State Food Handler Permit',
      issuingAgency: 'Chuuk State Department of Health Services',
      validity: '1-2 years',
      cost: '$15-$30',
      whereToGet: 'Chuuk State Hospital - Environmental Health Division',
      phone: '(691) 330-2216',
      website: 'Contact local health department',
      notes: [
        'Food hygiene training mandatory',
        'Certificate valid across Chuuk State islands',
      ]
    },
    healthCertificate: {
      required: true,
      name: 'Health Clearance for Food Handlers',
      includes: ['TB Test', 'Physical Exam', 'Infectious Disease Screening'],
      validity: '1 year',
      whereToGet: 'Chuuk State Hospital',
      cost: '$30-$80',
      notes: [
        'Mandatory for all restaurant and hotel staff',
      ]
    },
    additionalRequirements: []
  },
  {
    region: 'FSM - Pohnpei',
    foodHandlerCard: {
      required: true,
      name: 'Pohnpei State Food Handler Certificate',
      issuingAgency: 'Pohnpei State Department of Health Services',
      validity: '1-2 years',
      cost: '$20-$35',
      whereToGet: 'Pohnpei State Hospital - Environmental Health',
      phone: '(691) 320-2213',
      website: 'Contact local health department',
      notes: [
        'Food safety course completion required',
        'Valid for food service across Pohnpei State',
      ]
    },
    healthCertificate: {
      required: true,
      name: 'Food Handler Health Certificate',
      includes: ['TB Screening', 'General Physical', 'Vaccination Status'],
      validity: '1 year',
      whereToGet: 'Pohnpei State Hospital or Genesis Pharmacy Clinic',
      cost: '$40-$100',
      notes: [
        'Required annually for food industry workers',
      ]
    },
    additionalRequirements: []
  },
  {
    region: 'FSM - Kosrae',
    foodHandlerCard: {
      required: true,
      name: 'Kosrae State Food Handler Permit',
      issuingAgency: 'Kosrae State Department of Health Services',
      validity: '1-2 years',
      cost: '$15-$25',
      whereToGet: 'Kosrae State Hospital - Public Health Office',
      phone: '(691) 370-3199',
      website: 'Contact local health department',
      notes: [
        'Training and written test required',
        'Certificate required for all food establishments',
      ]
    },
    healthCertificate: {
      required: true,
      name: 'Health Clearance Certificate',
      includes: ['TB Test', 'Physical Examination'],
      validity: '1 year',
      whereToGet: 'Kosrae State Hospital',
      cost: '$30-$70',
      notes: [
        'Mandatory for hospitality and food service',
      ]
    },
    additionalRequirements: []
  },
  {
    region: 'Guam',
    foodHandlerCard: {
      required: true,
      name: 'Guam Food Handler Safety Certificate',
      issuingAgency: 'Guam Department of Public Health and Social Services (DPHSS)',
      validity: '3 years',
      cost: '$20-$40',
      whereToGet: 'DPHSS Environmental Health Office (Mangilao) or online training',
      phone: '(671) 735-7143',
      website: 'https://dphss.guam.gov',
      notes: [
        'Online training available through approved providers (360training, ServSafe)',
        'Certificate valid for 3 years',
        'Required for ALL food handlers in restaurants, hotels, catering, retail food',
        'Must complete accredited food safety course and pass exam',
      ]
    },
    healthCertificate: {
      required: true,
      name: 'Food Handler Health Certificate',
      includes: ['TB Test (2-step TB skin test or QuantiFERON-TB Gold)', 'Physical Exam', 'Hepatitis A Vaccination (recommended)'],
      validity: '1 year',
      whereToGet: 'Guam Regional Medical City, Naval Hospital, FHP Health Center, private clinics',
      cost: '$75-$200',
      notes: [
        'TB clearance MANDATORY - negative test required',
        'Annual renewal required',
        'Hepatitis A vaccination strongly recommended for food handlers',
        'Some employers may require full physical exam',
      ]
    },
    additionalRequirements: [
      {
        name: 'ServSafe or Equivalent Manager Certification',
        description: 'Food service managers and supervisors must hold ServSafe Manager certification',
        required: false
      },
      {
        name: 'ABC Card (Alcohol Beverage Control) - Guam',
        description: 'REQUIRED for bartenders, servers, and managers who sell/serve alcohol in bars, restaurants, nightclubs. Issued by Guam Department of Revenue and Taxation - Alcohol Beverage Control Division. Must complete responsible alcohol service training (TIPS or equivalent). Valid 3 years. Cost: $40-$80. Training covers ID checking, preventing underage drinking, recognizing intoxication, and DUI prevention.',
        required: true // Required for alcohol service positions
      }
    ]
  },
  {
    region: 'Hawaii',
    foodHandlerCard: {
      required: true,
      name: 'Hawaii Food Handler Certificate',
      issuingAgency: 'Hawaii Department of Health - Food Safety Branch',
      validity: '3 years',
      cost: '$10-$30 (online courses)',
      whereToGet: 'Online through approved providers (360training, StateFoodSafety, ServSafe)',
      phone: '(808) 586-8000',
      website: 'https://health.hawaii.gov/san',
      notes: [
        'Online training available 24/7 from approved providers',
        'Certificate valid for 3 years statewide',
        'Required within 30 days of hire for all food handlers',
        'Accepted at all Hawaii food establishments',
        'No in-person testing required',
      ]
    },
    healthCertificate: {
      required: false,
      name: 'Health Screening (Employer-Specific)',
      includes: ['TB Test (if required by employer)', 'General Health Assessment'],
      validity: 'Varies by employer',
      whereToGet: 'Not mandatory by state law, but some employers require it',
      cost: '$50-$150 (if required)',
      notes: [
        'Hawaii does NOT require health certificates for food handlers by law',
        'Some employers (especially large hotels/resorts) may require TB test',
        'Kaiser Permanente, Queens Medical Center, and private clinics offer TB testing',
      ]
    },
    additionalRequirements: [
      {
        name: 'TB Testing',
        description: 'While not state-required, many major employers (Hilton, Marriott, Hyatt) require negative TB test',
        required: false
      },
      {
        name: 'ABC Card (Alcohol Beverage Control) - Hawaii',
        description: 'REQUIRED for anyone who sells or serves alcohol in restaurants, bars, hotels, or retail stores. Must complete responsible alcohol server training program (TIPS, ServSafe Alcohol, or equivalent approved by Hawaii Liquor Commission). Valid 3 years. Cost: $25-$60. Each county (Honolulu, Maui, Hawaii, Kauai) has its own liquor commission. Training covers ID verification, preventing intoxication, refusing service, and state alcohol laws.',
        required: true // Required for alcohol service positions
      }
    ]
  },
  {
    region: 'Palau',
    foodHandlerCard: {
      required: true,
      name: 'Palau Food Handler Certificate',
      issuingAgency: 'Ministry of Health - Bureau of Public Health',
      validity: '1-2 years',
      cost: '$20-$40',
      whereToGet: 'Belau National Hospital - Environmental Health Division',
      phone: '(680) 488-2552',
      website: 'Contact Ministry of Health',
      notes: [
        'Food safety training course required',
        'Certificate required for restaurants, hotels, catering',
        'Must be renewed before expiration',
      ]
    },
    healthCertificate: {
      required: true,
      name: 'Health Certificate for Food Handlers',
      includes: ['TB Screening', 'Physical Exam', 'Stool Sample Test'],
      validity: '1 year',
      whereToGet: 'Belau National Hospital',
      cost: '$40-$100',
      notes: [
        'Mandatory for food service and hospitality workers',
        'TB clearance required',
        'Stool sample may be required for food handlers',
      ]
    },
    additionalRequirements: []
  },
  {
    region: 'Marshall Islands',
    foodHandlerCard: {
      required: true,
      name: 'RMI Food Handler Permit',
      issuingAgency: 'Ministry of Health and Human Services - Environmental Health',
      validity: '1-2 years',
      cost: '$15-$35',
      whereToGet: 'Majuro Hospital - Environmental Health Office',
      phone: '(692) 625-3355',
      website: 'Contact Ministry of Health',
      notes: [
        'Food hygiene training mandatory',
        'Certificate required for food establishments in Majuro and outer islands',
      ]
    },
    healthCertificate: {
      required: true,
      name: 'Food Handler Health Clearance',
      includes: ['TB Test', 'Physical Examination', 'Infectious Disease Screening'],
      validity: '1 year',
      whereToGet: 'Majuro Hospital or outer island health centers',
      cost: '$30-$80',
      notes: [
        'Required for restaurant and hotel staff',
        'TB test mandatory',
      ]
    },
    additionalRequirements: []
  }
];

interface RegionalFoodComplianceGuideProps {
  studentLocation?: string;
  jobLocation?: string;
  showForJobType?: string; // e.g., "Restaurant/Food Service", "Hospitality"
}

export function RegionalFoodComplianceGuide({ 
  studentLocation, 
  jobLocation,
  showForJobType 
}: RegionalFoodComplianceGuideProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>(
    jobLocation || studentLocation || 'CNMI'
  );

  const requirement = regionalRequirements.find(r => r.region === selectedRegion);

  if (!requirement) return null;

  // Determine if food industry requirements apply
  const isFoodIndustry = showForJobType && (
    showForJobType.includes('Restaurant') || 
    showForJobType.includes('Food') ||
    showForJobType.includes('Hospitality') ||
    showForJobType.includes('Hotel')
  );

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-300 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-6">
        <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-orange-900 mb-2">
            🍽️ Required Certifications for Food Industry Jobs
          </h3>
          <p className="text-sm text-orange-800 mb-4">
            {isFoodIndustry ? (
              <>This job requires specific health and safety certifications. Make sure you obtain these BEFORE starting work.</>
            ) : (
              <>If you're applying for restaurant, hotel, or food service jobs, you'll need these certifications.</>
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

          {/* Requirements for Selected Region */}
          <div className="space-y-6">
            {/* Food Handler Card */}
            <div className="bg-white border-2 border-orange-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-orange-600" />
                <h4 className="font-bold text-gray-900 text-lg">
                  {requirement.foodHandlerCard.name}
                  {requirement.foodHandlerCard.required && (
                    <span className="ml-2 text-red-600 text-sm">REQUIRED*</span>
                  )}
                </h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Issuing Agency</div>
                  <div className="font-semibold text-sm text-gray-900">
                    {requirement.foodHandlerCard.issuingAgency}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Validity Period</div>
                  <div className="font-semibold text-sm text-gray-900 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    {requirement.foodHandlerCard.validity}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Cost</div>
                  <div className="font-semibold text-sm text-green-700">
                    {requirement.foodHandlerCard.cost}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Contact</div>
                  <div className="font-semibold text-sm text-gray-900 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-blue-600" />
                    <a href={`tel:${requirement.foodHandlerCard.phone}`} className="text-blue-600 hover:underline">
                      {requirement.foodHandlerCard.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  Where to Get:
                </div>
                <div className="text-sm text-gray-900 bg-blue-50 rounded-lg p-3">
                  {requirement.foodHandlerCard.whereToGet}
                </div>
              </div>

              {requirement.foodHandlerCard.website !== 'Contact local health department' && (
                <a
                  href={requirement.foodHandlerCard.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-semibold mb-4"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Official Website
                </a>
              )}

              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Important Notes:</div>
                <ul className="space-y-2">
                  {requirement.foodHandlerCard.notes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Health Certificate */}
            <div className="bg-white border-2 border-pink-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-pink-600" />
                <h4 className="font-bold text-gray-900 text-lg">
                  {requirement.healthCertificate.name}
                  {requirement.healthCertificate.required && (
                    <span className="ml-2 text-red-600 text-sm">REQUIRED*</span>
                  )}
                </h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Validity Period</div>
                  <div className="font-semibold text-sm text-gray-900 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    {requirement.healthCertificate.validity}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Estimated Cost</div>
                  <div className="font-semibold text-sm text-green-700">
                    {requirement.healthCertificate.cost}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  Where to Get:
                </div>
                <div className="text-sm text-gray-900 bg-pink-50 rounded-lg p-3">
                  {requirement.healthCertificate.whereToGet}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">What's Included:</div>
                <ul className="space-y-2">
                  {requirement.healthCertificate.includes.map((item, index) => (
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
                  {requirement.healthCertificate.notes.map((note, index) => (
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
                <h4 className="font-bold text-gray-900 text-lg mb-3">
                  Additional Requirements
                </h4>
                <div className="space-y-3">
                  {requirement.additionalRequirements.map((req, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-3">
                      <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        {req.name}
                        {req.required && (
                          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">REQUIRED</span>
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
          <div className="mt-6 bg-green-50 border-2 border-green-300 rounded-lg p-5">
            <div className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              📋 Action Steps:
            </div>
            <ol className="space-y-2 text-sm text-green-800">
              <li className="flex gap-2">
                <span className="font-bold min-w-[20px]">1.</span>
                <span>Call the agency to confirm current requirements and costs</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold min-w-[20px]">2.</span>
                <span>Schedule appointments for health tests (TB test, physical exam)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold min-w-[20px]">3.</span>
                <span>Complete food safety training course and exam</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold min-w-[20px]">4.</span>
                <span>Upload certificates to your ZALPHA profile once obtained</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold min-w-[20px]">5.</span>
                <span>Keep track of expiration dates and renew on time!</span>
              </li>
            </ol>
          </div>

          {/* Pro Tip */}
          <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
            <p className="text-sm text-yellow-900">
              <strong>💡 Pro Tip:</strong> Start this process 2-4 weeks BEFORE you need to start work! 
              TB tests can take 48-72 hours for results, and some agencies have wait times for appointments. 
              Having these certificates ready makes you immediately hireable!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}