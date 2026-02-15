/**
 * ZALPHA Pitch Deck Demo Page
 * "Work-Ready Pacific: Real Skills Through Real Work"
 */

import { useState } from 'react';
import { PitchDeck } from '@/app/components/PitchDeck';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent } from '@/app/components/ui/card';
import {
  Smartphone,
  Monitor,
  Download,
  Share2,
  Eye,
  CheckCircle,
  Globe,
  Users,
  Target,
  TrendingUp,
} from 'lucide-react';

export function PitchDeckDemo() {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [showOverview, setShowOverview] = useState(true);

  if (!showOverview) {
    return (
      <div className="min-h-screen bg-slate-100">
        {/* Header Controls */}
        <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setShowOverview(true)}>
              ← Back
            </Button>
            <Badge className="bg-blue-100 text-blue-700">
              Pitch Deck
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="w-4 h-4 mr-1.5" />
              Mobile
            </Button>
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('desktop')}
            >
              <Monitor className="w-4 h-4 mr-1.5" />
              Desktop
            </Button>

            <div className="w-px h-6 bg-slate-300 mx-2" />

            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1.5" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-1.5" />
              Share
            </Button>
          </div>
        </div>

        {/* Pitch Deck Container */}
        <div className="flex items-center justify-center p-8 min-h-screen">
          {viewMode === 'mobile' ? (
            <div className="relative">
              {/* Mobile Frame */}
              <div className="bg-slate-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden" style={{ width: '390px', height: '844px' }}>
                  <PitchDeck />
                </div>
              </div>

              {/* Floating hint */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg">
                Scroll to navigate slides
              </div>
            </div>
          ) : (
            <div className="w-full max-w-6xl">
              {/* Desktop View - scaled */}
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden" style={{ aspectRatio: '390/844' }}>
                <PitchDeck />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-sm px-4 py-1.5">
            Pitch Deck
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            Work-Ready Pacific
          </h1>
          <p className="text-2xl text-slate-600 mb-2">
            Real Skills Through Real Work
          </p>
          <p className="text-lg text-slate-500">
            10 mobile-first slides explaining the ZALPHA Co-Op advantage
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-900">5</p>
              <p className="text-sm text-slate-600">Pacific Islands</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-900">87</p>
              <p className="text-sm text-slate-600">Student Signals</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-900">3.9x</p>
              <p className="text-sm text-slate-600">More Applicants</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-900">78%</p>
              <p className="text-sm text-slate-600">Get Hired</p>
            </CardContent>
          </Card>
        </div>

        {/* Slide Overview */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Slide Overview</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { num: 1, title: 'Title', desc: 'Work-Ready Pacific introduction with Pacific map' },
                { num: 2, title: 'The Problem', desc: '3 key problems with traditional co-ops' },
                { num: 3, title: 'The ZALPHA Difference', desc: 'From vague to clear deliverables' },
                { num: 4, title: 'How It Works', desc: '4-step deliverables system process' },
                { num: 5, title: 'Student Advantage', desc: 'Resume-worthy verified achievements' },
                { num: 6, title: 'Employer Advantage', desc: 'Function-based roles attract talent' },
                { num: 7, title: 'Co-Op Admin Advantage', desc: 'Data-driven program design' },
                { num: 8, title: 'Data Flow', desc: 'How everyone benefits from deliverables' },
                { num: 9, title: 'Pacific Context', desc: 'Built for Pacific Island communities' },
                { num: 10, title: 'Call to Action', desc: 'Book demo, join beta, contact' },
              ].map((slide) => (
                <div key={slide.num} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {slide.num}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{slide.title}</p>
                    <p className="text-sm text-slate-600">{slide.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Messages */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">For Students</h3>
              <p className="text-sm text-slate-600">
                Turn co-op hours into verified, resume-ready achievements that stand out to employers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">For Employers</h3>
              <p className="text-sm text-slate-600">
                Attract motivated students with function-based roles showing real skill development
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">For Admins</h3>
              <p className="text-sm text-slate-600">
                Design data-driven pathways based on 87 student interest signals and completion data
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA to View */}
        <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0">
          <CardContent className="p-12 text-center">
            <Eye className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">View the Full Pitch Deck</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Experience all 10 mobile-first slides with snap scrolling, beautiful gradients, and clear messaging
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => {
                  setViewMode('mobile');
                  setShowOverview(false);
                }}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                View Mobile Version
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setViewMode('desktop');
                  setShowOverview(false);
                }}
                className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 font-semibold"
              >
                <Monitor className="w-5 h-5 mr-2" />
                View Desktop Version
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Design Features</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Mobile-first vertical layout (390x844)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Snap scroll navigation between slides</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Pacific-themed gradients and imagery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>ZALPHA blue/teal brand colors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Clear typography hierarchy</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Export Options</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Individual slide PNG export</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Full deck PDF generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Shareable web link</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Social media preview cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>QR code for mobile viewing</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
