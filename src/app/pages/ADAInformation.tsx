import { Shield, Heart, Scale, Users, CheckCircle, AlertCircle, Book, ExternalLink } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { CollapsibleSection } from '@/app/components/CollapsibleSection';

interface ADAInformationProps {
  onNavigate: (page: string) => void;
}

export function ADAInformation({ onNavigate }: ADAInformationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <BackButton onNavigate={onNavigate} />

        <div className="space-y-8 sm:space-y-12">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight px-4">
              ADA Rights & Protections
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed px-4">
              Understanding your rights under the Americans with Disabilities Act
            </p>
          </div>

          {/* What is ADA */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-white/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <Book className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 flex-shrink-0" />
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">What is the ADA?</h3>
            </div>
            <div className="space-y-4 text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">
              <p>
                The <strong className="text-white">Americans with Disabilities Act (ADA)</strong> is a federal civil rights law enacted in 1990 that prohibits discrimination against individuals with disabilities in all areas of public life, including jobs, schools, transportation, and public and private places open to the general public.
              </p>
              <p>
                <strong className="text-white">Title I of the ADA</strong> protects qualified individuals with disabilities from employment discrimination. This applies to job application procedures, hiring, firing, advancement, compensation, job training, and other terms, conditions, and privileges of employment.
              </p>
            </div>
          </div>

          {/* Who is Protected */}
          <CollapsibleSection
            title="👥 Who is Protected Under the ADA?"
            defaultOpen={true}
            colorScheme="blue"
          >
            <div className="space-y-4 text-white/90 text-base sm:text-lg">
              <p className="font-semibold text-white">
                The ADA protects qualified individuals with disabilities. Under the ADA, you have a disability if:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/10 rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Physical or Mental Impairment:</strong>
                    <p className="text-white/80 mt-1">
                      You have a physical or mental impairment that substantially limits one or more major life activities (such as walking, seeing, hearing, learning, breathing, concentrating, thinking, communicating, or working)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">History of Impairment:</strong>
                    <p className="text-white/80 mt-1">
                      You have a history or record of such an impairment (for example, cancer that is in remission)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Perceived Impairment:</strong>
                    <p className="text-white/80 mt-1">
                      You are perceived by others as having such an impairment (even if you do not actually have one)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/20 border-2 border-blue-400/50 rounded-lg p-4 mt-6">
                <p className="font-semibold text-white mb-2">Examples of Disabilities Covered:</p>
                <ul className="grid sm:grid-cols-2 gap-2 text-white/80">
                  <li>• Mobility impairments</li>
                  <li>• Vision or hearing loss</li>
                  <li>• Chronic illnesses (diabetes, epilepsy)</li>
                  <li>• Mental health conditions</li>
                  <li>• Learning disabilities</li>
                  <li>• Autism spectrum disorders</li>
                  <li>• ADHD</li>
                  <li>• PTSD</li>
                  <li>• HIV/AIDS</li>
                  <li>• Cancer</li>
                  <li>• And many others</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>

          {/* Your Rights */}
          <CollapsibleSection
            title="⚖️ Your Employment Rights Under ADA"
            defaultOpen={true}
            colorScheme="purple"
          >
            <div className="space-y-4 text-white/90 text-base sm:text-lg">
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <Shield className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <h4 className="font-bold text-white text-lg">1. Protection from Discrimination</h4>
                  </div>
                  <p className="text-white/80 pl-9">
                    Employers cannot discriminate against you because of your disability in any aspect of employment, including recruitment, hiring, promotions, training, pay, social activities, and other privileges of employment.
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <Shield className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <h4 className="font-bold text-white text-lg">2. Equal Opportunity</h4>
                  </div>
                  <p className="text-white/80 pl-9">
                    You must be given equal consideration for a job if you are qualified for that position. Being "qualified" means you satisfy the skill, experience, education requirements of the job AND can perform the essential functions of the job with or without reasonable accommodation.
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <Shield className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <h4 className="font-bold text-white text-lg">3. Reasonable Accommodations</h4>
                  </div>
                  <p className="text-white/80 pl-9">
                    Employers must provide reasonable accommodations to qualified employees with disabilities, unless doing so would cause undue hardship (significant difficulty or expense).
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <Shield className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <h4 className="font-bold text-white text-lg">4. Medical Privacy</h4>
                  </div>
                  <p className="text-white/80 pl-9">
                    Employers must keep all medical information confidential and in separate files. They cannot ask about your disability before making a job offer.
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <Shield className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <h4 className="font-bold text-white text-lg">5. Protection from Retaliation</h4>
                  </div>
                  <p className="text-white/80 pl-9">
                    It's illegal for employers to retaliate against you for asserting your rights under the ADA, requesting accommodations, or filing a complaint.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Reasonable Accommodations */}
          <CollapsibleSection
            title="🛠️ What are Reasonable Accommodations?"
            defaultOpen={true}
            colorScheme="green"
          >
            <div className="space-y-4 text-white/90 text-base sm:text-lg">
              <p>
                <strong className="text-white">Reasonable accommodations</strong> are modifications or adjustments to a job, work environment, or the way things are usually done that enable a qualified individual with a disability to perform the essential functions of a job.
              </p>

              <div className="bg-green-500/20 border-2 border-green-400/50 rounded-lg p-6">
                <h4 className="font-bold text-white mb-4 text-lg">Common Examples of Reasonable Accommodations:</h4>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-green-300">Physical Accessibility:</p>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Wheelchair accessible facilities</li>
                      <li>• Ergonomic workstations</li>
                      <li>• Accessible parking</li>
                      <li>• Modified equipment</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-green-300">Schedule Flexibility:</p>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Flexible work hours</li>
                      <li>• Remote work options</li>
                      <li>• Additional breaks</li>
                      <li>• Modified work schedules</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-green-300">Technology & Tools:</p>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Screen reader software</li>
                      <li>• Voice recognition software</li>
                      <li>• Assistive technology</li>
                      <li>• Modified computer equipment</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-green-300">Communication Support:</p>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Sign language interpreters</li>
                      <li>• Written instructions</li>
                      <li>• Extra training time</li>
                      <li>• Modified communication methods</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-green-300">Work Environment:</p>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Quiet workspace</li>
                      <li>• Noise-cancelling headphones</li>
                      <li>• Modified lighting</li>
                      <li>• Temperature adjustments</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-green-300">Job Restructuring:</p>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Modified job duties</li>
                      <li>• Reassignment to vacant position</li>
                      <li>• Job sharing</li>
                      <li>• Part-time schedules</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/20 border-2 border-yellow-400/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white mb-2">Important to Know:</p>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• The accommodation process is interactive - you and the employer work together</li>
                      <li>• You don't have to accept the first accommodation offered if it doesn't work</li>
                      <li>• Employers don't have to provide the exact accommodation you request, but must provide an effective one</li>
                      <li>• Employers can't charge you for the cost of an accommodation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Disclosure */}
          <CollapsibleSection
            title="🔒 Should You Disclose Your Disability?"
            defaultOpen={true}
            colorScheme="orange"
          >
            <div className="space-y-4 text-white/90 text-base sm:text-lg">
              <p className="font-semibold text-white">
                Disclosing a disability is a personal decision. Here are factors to consider:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-500/20 border-2 border-green-400/50 rounded-lg p-4">
                  <h4 className="font-bold text-green-300 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Reasons to Disclose
                  </h4>
                  <ul className="space-y-2 text-white/80 text-sm">
                    <li className="flex items-start gap-2">
                      <span>✓</span>
                      <span>To request reasonable accommodations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✓</span>
                      <span>To explain gaps in employment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✓</span>
                      <span>To find employers committed to diversity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✓</span>
                      <span>To access disability hiring programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✓</span>
                      <span>To be authentic about who you are</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-500/20 border-2 border-orange-400/50 rounded-lg p-4">
                  <h4 className="font-bold text-orange-300 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Reasons to Wait
                  </h4>
                  <ul className="space-y-2 text-white/80 text-sm">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Fear of discrimination or bias</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Disability is not visible or doesn't affect work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>No accommodations needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Want to be evaluated on skills alone first</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Privacy preferences</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-500/20 border-2 border-blue-400/50 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">When to Disclose?</h4>
                <p className="text-white/80 text-sm mb-3">
                  If you choose to disclose, here are common timing options:
                </p>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-white">1.</span>
                    <span><strong className="text-white">Before applying:</strong> On platforms like ZALPHA where you control visibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-white">2.</span>
                    <span><strong className="text-white">During the interview:</strong> If your disability is visible or you need interview accommodations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-white">3.</span>
                    <span><strong className="text-white">After receiving a job offer:</strong> When you're legally protected and can negotiate accommodations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-white">4.</span>
                    <span><strong className="text-white">After starting the job:</strong> When you realize you need accommodations</span>
                  </li>
                </ul>
              </div>

              <p className="text-yellow-300 text-sm italic">
                Remember: You are NEVER required to disclose. It's entirely your choice.
              </p>
            </div>
          </CollapsibleSection>

          {/* How ZALPHA Protects You */}
          <div className="bg-gradient-to-br from-purple-600/40 to-pink-600/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-purple-400/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400 flex-shrink-0" />
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">How ZALPHA Protects You</h3>
            </div>
            <div className="space-y-4 text-white/90 text-base sm:text-lg leading-relaxed">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h4 className="font-bold text-white">Complete Privacy Control</h4>
                  </div>
                  <p className="text-white/80 text-sm">
                    You decide if and when employers see your disability information. By default, it's private.
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h4 className="font-bold text-white">Zero Tolerance for Discrimination</h4>
                  </div>
                  <p className="text-white/80 text-sm">
                    Employers who discriminate based on disability are removed from ZALPHA permanently.
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h4 className="font-bold text-white">ADA-Compliant Platform</h4>
                  </div>
                  <p className="text-white/80 text-sm">
                    ZALPHA follows all ADA requirements and promotes inclusive hiring practices.
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h4 className="font-bold text-white">Resource Connection</h4>
                  </div>
                  <p className="text-white/80 text-sm">
                    We connect you with inclusive employers and disability employment resources.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-white/30">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Additional Resources</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://www.ada.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
              >
                <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                <div>
                  <div className="font-bold text-white">ADA.gov</div>
                  <div className="text-sm text-white/70">Official ADA website</div>
                </div>
              </a>

              <a
                href="https://www.eeoc.gov/disability-discrimination"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
              >
                <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                <div>
                  <div className="font-bold text-white">EEOC</div>
                  <div className="text-sm text-white/70">File discrimination complaints</div>
                </div>
              </a>

              <a
                href="https://askjan.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
              >
                <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                <div>
                  <div className="font-bold text-white">Job Accommodation Network (JAN)</div>
                  <div className="text-sm text-white/70">Free accommodation guidance</div>
                </div>
              </a>

              <a
                href="https://www.dol.gov/agencies/odep"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
              >
                <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                <div>
                  <div className="font-bold text-white">ODEP</div>
                  <div className="text-sm text-white/70">Office of Disability Employment Policy</div>
                </div>
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border-4 border-white/30 shadow-2xl text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Questions About Your ADA Rights?</h3>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              ZALPHA is committed to supporting all students, including those with disabilities. If you have questions or concerns, we're here to help.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => onNavigate('student-signup')}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-700 rounded-xl font-bold text-base sm:text-lg hover:bg-white/90 transition-colors"
              >
                Create Your Profile
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 text-white rounded-xl font-bold text-base sm:text-lg hover:bg-white/30 transition-colors border-2 border-white/50"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
