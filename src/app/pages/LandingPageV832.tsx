/**
 * ZALPHA Landing Page v832 with Interactive 3D Globe Hero
 */

import { InteractiveGlobeHeroV832 } from '@/app/components/InteractiveGlobeHeroV832';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  Users,
  Briefcase,
  GraduationCap,
  Globe,
  Zap,
  Shield,
  TrendingUp,
  Award,
  MessageCircle,
  Bell,
  ChevronRight,
  CheckCircle,
  Star,
} from 'lucide-react';

interface LandingPageV832Props {
  onNavigate?: (page: string) => void;
}

export function LandingPageV832({ onNavigate }: LandingPageV832Props) {
  const handleCTAClick = () => {
    if (onNavigate) {
      onNavigate('signup');
    } else {
      console.log('Navigate to signup');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Globe */}
      <section className="relative">
        <InteractiveGlobeHeroV832 onCTAClick={handleCTAClick} />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Platform Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need for<br />Pacific Workforce Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From AI-powered job matching to emergency alerts and career communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: AI Assistant */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Zee AI Assistant</h3>
                <p className="text-gray-600 mb-4">
                  Upload PDFs for instant study guides, 5-min podcasts, and homework help powered by NotebookLM
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">Study Guides</Badge>
                  <Badge variant="outline" className="text-xs">Audio Podcasts</Badge>
                  <Badge variant="outline" className="text-xs">$0.05/use</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2: Emergency Alerts */}
            <Card className="border-2 border-red-200 hover:border-red-400 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Alerts</h3>
                <p className="text-gray-600 mb-4">
                  Real-time typhoon warnings, school closings, and shelter maps. FEMA/PDC integrated for Pacific safety
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">Typhoon Alerts</Badge>
                  <Badge variant="outline" className="text-xs">Shelter Maps</Badge>
                  <Badge variant="outline" className="text-xs">Safety Check-ins</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3: Career Bulletin */}
            <Card className="border-2 border-teal-200 hover:border-teal-400 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Career Bulletin</h3>
                <p className="text-gray-600 mb-4">
                  Reddit-style community board for job postings, events, tips. Upvote, comment, and connect with peers
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">Job Posts</Badge>
                  <Badge variant="outline" className="text-xs">Events</Badge>
                  <Badge variant="outline" className="text-xs">Community</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4: Co-op Matching */}
            <Card className="border-2 border-green-200 hover:border-green-400 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Co-op Matching</h3>
                <p className="text-gray-600 mb-4">
                  AI matches students to employers based on skills, location, and Home-to-Work factor analysis
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">GPS Clock-in</Badge>
                  <Badge variant="outline" className="text-xs">Z-UID</Badge>
                  <Badge variant="outline" className="text-xs">Verified</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Feature 5: WIOA Compliance */}
            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">WIOA Compliance</h3>
                <p className="text-gray-600 mb-4">
                  Automated reporting for Perkins V, RAPIDS, and WIOA Youth Programs. 94% compliance rate
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">Auto Reports</Badge>
                  <Badge variant="outline" className="text-xs">94% Compliant</Badge>
                  <Badge variant="outline" className="text-xs">DOL Ready</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Feature 6: 20-Year Tracking */}
            <Card className="border-2 border-indigo-200 hover:border-indigo-400 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">20-Year Workforce Tracking</h3>
                <p className="text-gray-600 mb-4">
                  Brain circulation model: HS → NMC/NMTECH → Workforce. 78% retention after 5 years
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">Long-term Data</Badge>
                  <Badge variant="outline" className="text-xs">78% Retention</Badge>
                  <Badge variant="outline" className="text-xs">Projections</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powering Pacific Workforce Development
            </h2>
            <p className="text-xl text-blue-100">
              Trusted by students, employers, and career services across 6 jurisdictions
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">2,847</div>
              <p className="text-blue-100">Active Students</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">456</div>
              <p className="text-blue-100">Partner Employers</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">1,923</div>
              <p className="text-blue-100">Co-op Placements</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">$2.8M</div>
              <p className="text-blue-100">Student Earnings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-100 text-yellow-700 mb-4">Beta Pricing</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No hidden fees. Pay-as-you-grow model built for Pacific budgets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Students - Free */}
            <Card className="border-2 border-blue-200 shadow-xl">
              <CardContent className="p-8">
                <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Students</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">FREE</span>
                  <span className="text-gray-600">/forever</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Unlimited job applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Zee AI assistant (basic)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Career bulletin access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Emergency alerts</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign Up Free
                </Button>
              </CardContent>
            </Card>

            {/* Employers */}
            <Card className="border-4 border-green-400 shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-green-500 text-white px-4 py-1 text-sm">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardContent className="p-8">
                <Briefcase className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Employers</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">$29</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Unlimited job postings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">AI candidate matching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Time log approvals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Z-Credits add-ons ($5-25)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-gray-900">Co-op employers: FREE</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* Career Services */}
            <Card className="border-2 border-purple-200 shadow-xl">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Career Services</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">Custom</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Multi-school management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">WIOA/Perkins reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Bulletin moderation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Emergency broadcast</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                  Request Demo
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              🎉 <strong>Beta Launch Special:</strong> Get 3 months FREE! After beta: $29/month + pay-as-you-go add-ons
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Globe className="w-16 h-16 text-blue-300 mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Pacific<br />Workforce Development?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join 2,847 students, 456 employers, and 89 career services professionals already using ZALPHA
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleCTAClick}
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-6 text-lg shadow-xl"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Schedule Demo
              </Button>
            </div>

            <p className="text-sm text-blue-200 mt-6">
              No credit card required • Free for students forever • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4">ZALPHA Pacific</h3>
              <p className="text-gray-400 text-sm">
                Connecting students, employers, and career services across the Western Pacific
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Regions</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>🇲🇵 CNMI (Saipan, Tinian, Rota)</li>
                <li>🇬🇺 Guam</li>
                <li>🇵🇼 Palau</li>
                <li>🇫🇲 FSM</li>
                <li>🇲🇭 RMI</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Zee AI Assistant</li>
                <li>Emergency Alerts</li>
                <li>Career Bulletin</li>
                <li>WIOA Compliance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 ZALPHA Pacific Workforce Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
