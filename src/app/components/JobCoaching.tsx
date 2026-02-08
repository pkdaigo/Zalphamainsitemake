import { User, Calendar, MessageCircle, Target, TrendingUp, Award, Star, Video, Clock, CheckCircle, Briefcase, FileText, Zap, Heart } from 'lucide-react';
import { useState } from 'react';

interface JobCoachingProps {
  variant?: 'compact' | 'full';
  isPremium?: boolean;
  onNavigate?: (page: string) => void;
  onUpgrade?: () => void;
}

// Coach profiles from ZALPHA internal network
const coaches = [
  {
    id: 'coach-1',
    name: 'Dr. Maria Pangelinan',
    title: 'Senior Career Coach',
    credentials: 'PhD in Career Development, 15+ years experience',
    location: 'Saipan, CNMI',
    specialties: ['Interview Preparation', 'Resume Building', 'Career Planning', 'Salary Negotiation'],
    languages: ['English', 'Chamorro', 'Carolinian'],
    availability: 'Mon-Fri, 9am-5pm CNMI',
    rating: 5.0,
    totalSessions: 247,
    successRate: '94% job placement',
    bio: 'Former HR Director at Pacific International Hotels with deep connections across CNMI, Guam, and the broader Pacific. Specializes in helping recent graduates navigate their first career steps.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    industries: ['Hospitality', 'Healthcare', 'Government', 'Education'],
    testimonial: {
      text: 'Dr. Pangelinan helped me land my dream job within 3 weeks! Her interview coaching was invaluable.',
      author: 'J.R., Software Developer'
    }
  },
  {
    id: 'coach-2',
    name: 'James Takano',
    title: 'Tech Career Specialist',
    credentials: 'MBA, Former Google Recruiter, 10+ years',
    location: 'Honolulu, Hawaii',
    specialties: ['Tech Careers', 'LinkedIn Optimization', 'Remote Work', 'Startup Navigation'],
    languages: ['English', 'Japanese'],
    availability: 'Tue-Sat, 10am-6pm HST',
    rating: 4.9,
    totalSessions: 189,
    successRate: '91% job placement',
    bio: 'Transitioned from tech recruiting at major companies to coaching Pacific Island students. Expert in remote tech opportunities and building online professional presence.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    industries: ['Technology', 'Startups', 'Remote Work', 'Digital Marketing'],
    testimonial: {
      text: 'James completely revamped my LinkedIn and I got 5 recruiter messages in the first week!',
      author: 'A.M., Digital Marketer'
    }
  },
  {
    id: 'coach-3',
    name: 'Sarah Chen-Reyes',
    title: 'Healthcare Career Advisor',
    credentials: 'RN, MSN, Healthcare HR, 12+ years',
    location: 'Hagåtña, Guam',
    specialties: ['Healthcare Careers', 'Nursing', 'Medical Certifications', 'Career Transitions'],
    languages: ['English', 'Chinese', 'Chamorro'],
    availability: 'Mon-Fri, 8am-4pm ChST',
    rating: 5.0,
    totalSessions: 312,
    successRate: '96% job placement',
    bio: 'Registered Nurse turned healthcare recruiter with extensive knowledge of medical career pathways in the Pacific. Helps students navigate certifications and hospital placements.',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    industries: ['Healthcare', 'Nursing', 'Medical', 'Pharmaceuticals'],
    testimonial: {
      text: 'Sarah guided me through my nursing license and helped me get hired at GMH!',
      author: 'M.S., Registered Nurse'
    }
  }
];

export function JobCoaching({ variant = 'full', isPremium = false, onNavigate, onUpgrade }: JobCoachingProps) {
  const [selectedCoach, setSelectedCoach] = useState(coaches[0]);
  const [upcomingSessions, setUpcomingSessions] = useState([
    {
      id: 1,
      type: 'Interview Preparation',
      date: 'Feb 5, 2026 at 2:00 PM',
      duration: '60 minutes',
      status: 'confirmed',
      agenda: 'Mock interview practice for Front Desk Manager role at Pacific Resort'
    },
    {
      id: 2,
      type: 'Resume Review',
      date: 'Feb 12, 2026 at 10:00 AM',
      duration: '45 minutes',
      status: 'confirmed',
      agenda: 'Update resume with new skills from ZALPHA training sessions'
    }
  ]);

  if (!isPremium) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-500 rounded-2xl p-8 shadow-xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <User className="w-9 h-9 text-white" />
          </div>
          <div className="flex-1">
            <div className="inline-block bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold mb-2">
              ⭐ ULTRA PREMIUM EXCLUSIVE
            </div>
            <h3 className="text-3xl font-bold text-amber-900 mb-2">
              🎯 1-on-1 Job Coach
            </h3>
            <p className="text-amber-800 text-lg">
              Get personalized career guidance from an expert coach assigned exclusively to you
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-white rounded-xl p-6 border-2 border-amber-300">
            <h4 className="font-bold text-amber-900 mb-4 text-xl">✨ What You Get:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900">Dedicated Career Coach</div>
                  <div className="text-sm text-amber-700">Your personal expert from our internal network</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900">Unlimited Messaging</div>
                  <div className="text-sm text-amber-700">Ask questions anytime via chat</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900">Weekly Video Sessions</div>
                  <div className="text-sm text-amber-700">1-hour personalized coaching calls</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900">Resume Reviews</div>
                  <div className="text-sm text-amber-700">Professional resume feedback & optimization</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900">Mock Interviews</div>
                  <div className="text-sm text-amber-700">Practice with real scenarios & feedback</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900">Career Planning</div>
                  <div className="text-sm text-amber-700">Personalized roadmap to your dream job</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900">Job Referrals</div>
                  <div className="text-sm text-amber-700">Direct connections to hiring managers</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900">Salary Negotiation</div>
                  <div className="text-sm text-amber-700">Get the pay you deserve with expert coaching</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
            <h4 className="font-bold text-xl mb-3">🏆 Success Stories:</h4>
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="italic mb-2">"My coach helped me negotiate $15K more in salary!"</p>
                <p className="text-sm text-purple-200">— Joshua T., Software Developer</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="italic mb-2">"I landed my dream job in 3 weeks with my coach's help."</p>
                <p className="text-sm text-purple-200">— Maria S., Hotel Manager</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="italic mb-2">"The mock interviews were game-changing. I felt so prepared!"</p>
                <p className="text-sm text-purple-200">— Angela R., Marketing Coordinator</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-6 text-white text-center mb-6">
          <div className="text-5xl mb-3">💎</div>
          <div className="text-2xl font-bold mb-2">Only $19.99/month</div>
          <div className="text-amber-100">Ultra Premium tier includes transcript sharing + 1-on-1 coaching</div>
        </div>

        {onUpgrade && (
          <button
            onClick={onUpgrade}
            className="w-full px-8 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-xl hover:shadow-2xl transition-all border-4 border-amber-700"
          >
            ⭐ Upgrade to Ultra Premium →
          </button>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <User className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-bold inline-block mb-1">
              ULTRA PREMIUM
            </div>
            <h3 className="font-bold text-lg">Your Job Coach</h3>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
          <div className="flex items-start gap-3">
            <img 
              src={selectedCoach.imageUrl} 
              alt={selectedCoach.name}
              className="w-16 h-16 rounded-full border-2 border-white object-cover"
            />
            <div className="flex-1">
              <div className="font-bold text-white">{selectedCoach.name}</div>
              <div className="text-sm text-purple-200">{selectedCoach.title}</div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm">{selectedCoach.rating}</span>
                </div>
                <span className="text-xs text-purple-200">•</span>
                <span className="text-xs text-purple-200">{selectedCoach.totalSessions} sessions</span>
              </div>
            </div>
          </div>
        </div>

        {upcomingSessions.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 mb-4">
            <div className="font-semibold mb-2 text-sm">Next Session:</div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-purple-200" />
              <span>{upcomingSessions[0].date}</span>
            </div>
            <div className="text-xs text-purple-200 mt-1">{upcomingSessions[0].type}</div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onNavigate?.('coach-dashboard')}
            className="flex-1 px-4 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
          >
            Open Dashboard
          </button>
          <button className="px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <User className="w-9 h-9" />
          </div>
          <div>
            <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">
              ⭐ ULTRA PREMIUM BENEFIT
            </div>
            <h2 className="text-3xl font-bold">Your Dedicated Job Coach</h2>
          </div>
        </div>
        <p className="text-xl text-purple-100">
          Personalized 1-on-1 career guidance from an expert in the ZALPHA internal coaching network
        </p>
      </div>

      {/* Your Assigned Coach */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">👤 Your Assigned Coach</h3>
        
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-300">
          <div className="flex items-start gap-6 mb-6">
            <img 
              src={selectedCoach.imageUrl} 
              alt={selectedCoach.name}
              className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-slate-900 mb-1">{selectedCoach.name}</h4>
              <p className="text-purple-700 font-semibold text-lg mb-2">{selectedCoach.title}</p>
              <p className="text-slate-600 mb-4">{selectedCoach.credentials}</p>
              
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-slate-900">{selectedCoach.rating}/5.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-slate-700">{selectedCoach.totalSessions} Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700">{selectedCoach.successRate}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                <span className="flex items-center gap-1">
                  <span className="text-purple-600">📍</span> {selectedCoach.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-purple-600" />
                  {selectedCoach.availability}
                </span>
              </div>

              <div className="mb-4">
                <div className="font-semibold text-slate-900 mb-2">Languages:</div>
                <div className="flex gap-2">
                  {selectedCoach.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 mb-4 border border-purple-200">
            <h5 className="font-bold text-slate-900 mb-3">About Your Coach:</h5>
            <p className="text-slate-700 leading-relaxed">{selectedCoach.bio}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-xl p-4 border border-purple-200">
              <h5 className="font-bold text-slate-900 mb-2">🎯 Specialties:</h5>
              <div className="space-y-1">
                {selectedCoach.specialties.map((specialty) => (
                  <div key={specialty} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-purple-200">
              <h5 className="font-bold text-slate-900 mb-2">🏢 Industry Expertise:</h5>
              <div className="space-y-1">
                {selectedCoach.industries.map((industry) => (
                  <div key={industry} className="flex items-center gap-2 text-sm text-slate-700">
                    <Briefcase className="w-4 h-4 text-purple-600" />
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-5 border-2 border-green-300">
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-green-900 mb-2">Student Testimonial:</div>
                <p className="text-green-800 italic mb-2">"{selectedCoach.testimonial.text}"</p>
                <p className="text-sm text-green-700">— {selectedCoach.testimonial.author}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-6">
        <button 
          onClick={() => onNavigate?.('coach-dashboard')}
          className="bg-purple-600 text-white rounded-xl p-6 hover:shadow-xl transition-all text-center"
        >
          <Calendar className="w-8 h-8 mx-auto mb-3" />
          <div className="font-bold">Schedule Session</div>
          <div className="text-xs text-purple-200 mt-1">Book your next call</div>
        </button>
        <button className="bg-indigo-600 text-white rounded-xl p-6 hover:shadow-xl transition-all text-center">
          <MessageCircle className="w-8 h-8 mx-auto mb-3" />
          <div className="font-bold">Send Message</div>
          <div className="text-xs text-indigo-200 mt-1">Chat with your coach</div>
        </button>
        <button className="bg-blue-600 text-white rounded-xl p-6 hover:shadow-xl transition-all text-center">
          <FileText className="w-8 h-8 mx-auto mb-3" />
          <div className="font-bold">Submit Resume</div>
          <div className="text-xs text-blue-200 mt-1">Get expert feedback</div>
        </button>
        <button className="bg-cyan-600 text-white rounded-xl p-6 hover:shadow-xl transition-all text-center">
          <Target className="w-8 h-8 mx-auto mb-3" />
          <div className="font-bold">Set Goals</div>
          <div className="text-xs text-cyan-200 mt-1">Plan your career path</div>
        </button>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-indigo-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-900">📅 Upcoming Coaching Sessions</h3>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all">
            + Schedule New
          </button>
        </div>

        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{session.type}</h4>
                      <div className="text-sm text-slate-600">{session.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.duration}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {session.status}
                    </span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <div className="font-semibold text-slate-900 text-sm mb-1">Agenda:</div>
                    <p className="text-slate-700 text-sm">{session.agenda}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all">
                  Join Video Call
                </button>
                <button className="px-4 py-2 border-2 border-indigo-300 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition-all">
                  Reschedule
                </button>
                <button className="px-4 py-2 border-2 border-slate-300 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-all">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coaching Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Video className="w-8 h-8" />
            <div className="text-3xl font-bold">12</div>
          </div>
          <div className="text-purple-100">Sessions Completed</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-8 h-8" />
            <div className="text-3xl font-bold">47</div>
          </div>
          <div className="text-indigo-100">Messages Exchanged</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8" />
            <div className="text-3xl font-bold">5</div>
          </div>
          <div className="text-blue-100">Resume Revisions</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-8 h-8" />
            <div className="text-3xl font-bold">3</div>
          </div>
          <div className="text-cyan-100">Job Referrals</div>
        </div>
      </div>

      {/* Benefits Reminder */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300">
        <div className="flex items-start gap-4">
          <Zap className="w-10 h-10 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-bold text-green-900 mb-4">Your Ultra Premium Coaching Benefits:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900">Weekly 1-on-1 Video Sessions</div>
                  <div className="text-sm text-green-700">Up to 4 hours per month of personalized coaching</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900">Unlimited Messaging</div>
                  <div className="text-sm text-green-700">Chat anytime, get responses within 24 hours</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900">Resume & Cover Letter Reviews</div>
                  <div className="text-sm text-green-700">Unlimited revisions with expert feedback</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900">Mock Interview Practice</div>
                  <div className="text-sm text-green-700">Realistic scenarios with detailed feedback</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900">Job Search Strategy</div>
                  <div className="text-sm text-green-700">Personalized plan to land your dream role</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900">Direct Employer Connections</div>
                  <div className="text-sm text-green-700">Referrals to hiring managers in our network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}