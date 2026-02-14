/*
 * ZALPHA Platform - Pacific Co-Op & Work-Based Learning Hub
 * Cross-Jurisdiction Fundraising Hub
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
  Heart,
  Laptop,
  Plane,
  DollarSign,
  Users,
  TrendingUp,
  Plus,
  Gift,
} from "lucide-react";
import { JurisdictionBadge } from "@/app/components/coop/JurisdictionSelector";

interface Campaign {
  id: string;
  title: string;
  jurisdictions: string[];
  schools: string[];
  purpose: 'tech' | 'travel' | 'cash' | 'general';
  goal: number;
  current: number;
  unit: 'dollars' | 'items' | 'miles';
  startDate: string;
  endDate: string;
  description: string;
  visibility: 'students' | 'employers' | 'public';
  donorCount: number;
  featured: boolean;
}

const mockCampaigns: Campaign[] = [
  {
    id: 'CAMP001',
    title: 'Laptops for CNMI Co-Op Students',
    jurisdictions: ['cnmi'],
    schools: ['Marianas High School', 'Kagman High School'],
    purpose: 'tech',
    goal: 50,
    current: 32,
    unit: 'items',
    startDate: '2026-01-15',
    endDate: '2026-03-31',
    description: 'Help Co-Op students access technology for digital skills training and remote work-based learning opportunities.',
    visibility: 'public',
    donorCount: 18,
    featured: true,
  },
  {
    id: 'CAMP002',
    title: 'Travel Support for Guam CTE Students',
    jurisdictions: ['guam'],
    schools: ['John F. Kennedy High School', 'Simon Sanchez High School'],
    purpose: 'travel',
    goal: 25000,
    current: 18500,
    unit: 'miles',
    startDate: '2026-02-01',
    endDate: '2026-06-30',
    description: 'Airline miles to support student travel to mainland for career expos, college fairs, and technical training opportunities.',
    visibility: 'employers',
    donorCount: 12,
    featured: true,
  },
  {
    id: 'CAMP003',
    title: 'FSM SEE Program Support Fund',
    jurisdictions: ['fsm'],
    schools: ['FSM High School', 'Chuuk High School', 'Pohnpei Island Central School'],
    purpose: 'cash',
    goal: 15000,
    current: 8200,
    unit: 'dollars',
    startDate: '2026-01-10',
    endDate: '2026-12-31',
    description: 'General support for FSM Secondary Education Enhancement WBL programs, including materials, training, and student stipends.',
    visibility: 'public',
    donorCount: 24,
    featured: false,
  },
  {
    id: 'CAMP004',
    title: 'Cross-Pacific Tech Equipment Drive',
    jurisdictions: ['cnmi', 'guam', 'fsm', 'palau', 'rmi'],
    schools: ['All Partner Schools'],
    purpose: 'tech',
    goal: 200,
    current: 95,
    unit: 'items',
    startDate: '2026-01-01',
    endDate: '2026-08-31',
    description: 'Region-wide technology donation drive for laptops, tablets, and tools needed for Co-Op and WBL programs.',
    visibility: 'public',
    donorCount: 45,
    featured: true,
  },
  {
    id: 'CAMP005',
    title: 'Palau Career Skills Equipment',
    jurisdictions: ['palau'],
    schools: ['Palau High School'],
    purpose: 'cash',
    goal: 8000,
    current: 5600,
    unit: 'dollars',
    startDate: '2026-02-01',
    endDate: '2026-05-31',
    description: 'Purchase career skills training equipment for Palau CTE programs, including tools, materials, and safety gear.',
    visibility: 'employers',
    donorCount: 9,
    featured: false,
  },
];

interface CoOpFundraisingHubProps {
  onNavigate?: (page: string) => void;
  userRole?: 'student' | 'coordinator' | 'employer' | 'public';
}

export function CoOpFundraisingHub({ onNavigate, userRole = 'public' }: CoOpFundraisingHubProps) {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('all');

  // Filter campaigns based on user role
  const visibleCampaigns = mockCampaigns.filter((campaign) => {
    if (userRole === 'public' && campaign.visibility === 'public') return true;
    if (userRole === 'student' && ['public', 'students'].includes(campaign.visibility)) return true;
    if (userRole === 'employer' && ['public', 'employers'].includes(campaign.visibility)) return true;
    if (userRole === 'coordinator') return true;
    return false;
  });

  // Filter by purpose
  const filteredCampaigns =
    selectedPurpose === 'all'
      ? visibleCampaigns
      : visibleCampaigns.filter((c) => c.purpose === selectedPurpose);

  const getPurposeIcon = (purpose: Campaign['purpose']) => {
    switch (purpose) {
      case 'tech':
        return <Laptop className="w-4 h-4" />;
      case 'travel':
        return <Plane className="w-4 h-4" />;
      case 'cash':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <Gift className="w-4 h-4" />;
    }
  };

  const getPurposeColor = (purpose: Campaign['purpose']) => {
    switch (purpose) {
      case 'tech':
        return 'bg-blue-100 text-blue-800';
      case 'travel':
        return 'bg-purple-100 text-purple-800';
      case 'cash':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatGoal = (value: number, unit: Campaign['unit']) => {
    if (unit === 'dollars') return `$${value.toLocaleString()}`;
    if (unit === 'miles') return `${value.toLocaleString()} miles`;
    return `${value} ${unit}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-7 h-7 text-red-500" />
                Co-Op & WBL Fundraising Hub
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Support Pacific Islands students and work-based learning programs
              </p>
            </div>
            <div className="flex gap-2">
              {userRole === 'coordinator' && (
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              )}
              <Button onClick={() => onNavigate?.('landing')} variant="outline">
                Exit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockCampaigns.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockCampaigns.reduce((sum, c) => sum + c.donorCount, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Jurisdictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <div className="text-xs text-gray-500 mt-1">Pacific Islands</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Schools Supported</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">15+</div>
            </CardContent>
          </Card>
        </div>

        {/* Purpose Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedPurpose === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPurpose('all')}
            >
              All Campaigns
            </Button>
            <Button
              variant={selectedPurpose === 'tech' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPurpose('tech')}
              className={selectedPurpose === 'tech' ? '' : 'border-blue-300 text-blue-700 hover:bg-blue-50'}
            >
              <Laptop className="w-4 h-4 mr-2" />
              Technology
            </Button>
            <Button
              variant={selectedPurpose === 'travel' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPurpose('travel')}
              className={selectedPurpose === 'travel' ? '' : 'border-purple-300 text-purple-700 hover:bg-purple-50'}
            >
              <Plane className="w-4 h-4 mr-2" />
              Travel/Miles
            </Button>
            <Button
              variant={selectedPurpose === 'cash' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPurpose('cash')}
              className={selectedPurpose === 'cash' ? '' : 'border-green-300 text-green-700 hover:bg-green-50'}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              General Support
            </Button>
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCampaigns.map((campaign) => {
            const progress = (campaign.current / campaign.goal) * 100;
            const isNearGoal = progress >= 80;
            const daysLeft = Math.ceil(
              (new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );

            return (
              <Card
                key={campaign.id}
                className={`hover:shadow-lg transition-shadow ${campaign.featured ? 'border-2 border-blue-500' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      {campaign.featured && (
                        <Badge className="bg-blue-600 text-white mb-2">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <CardTitle className="text-xl">{campaign.title}</CardTitle>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {campaign.jurisdictions.map((jid) => (
                      <JurisdictionBadge key={jid} jurisdictionId={jid} />
                    ))}
                    <Badge variant="outline" className={getPurposeColor(campaign.purpose)}>
                      {getPurposeIcon(campaign.purpose)}
                      <span className="ml-1 capitalize">{campaign.purpose}</span>
                    </Badge>
                  </div>
                  <CardDescription className="mt-3">{campaign.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Progress</span>
                      <span className="text-lg font-bold">
                        {formatGoal(campaign.current, campaign.unit)} of {formatGoal(campaign.goal, campaign.unit)}
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                      <span>{Math.round(progress)}% funded</span>
                      <span>{daysLeft} days left</span>
                    </div>
                  </div>

                  {/* Donor count */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{campaign.donorCount} donors</span>
                  </div>

                  {/* Schools */}
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Supporting:</div>
                    <div className="text-sm text-gray-700">
                      {campaign.schools.length > 2
                        ? `${campaign.schools.slice(0, 2).join(', ')} and ${campaign.schools.length - 2} more`
                        : campaign.schools.join(', ')}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Heart className="w-4 h-4 mr-2" />
                      Support Campaign
                    </Button>
                    <Button variant="outline">Learn More</Button>
                  </div>

                  {/* Travel note */}
                  {campaign.purpose === 'travel' && (
                    <div className="text-xs text-gray-500 italic pt-2 border-t">
                      Note: Airline miles donations typically processed through airline charity programs (e.g., United
                      MileagePlus donations). We facilitate the connection.
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredCampaigns.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Gift className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No campaigns found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new campaigns.</p>
          </Card>
        )}

        {/* How it works */}
        {userRole === 'public' && (
          <Card className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle>How Fundraising Supports WBL Programs</CardTitle>
              <CardDescription>Three ways to make an impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Laptop className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Technology Donations</h3>
                  <p className="text-sm text-gray-600">
                    Donate laptops, tablets, and equipment for digital skills training and remote WBL opportunities.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Plane className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Travel Support</h3>
                  <p className="text-sm text-gray-600">
                    Airline miles for career expos, college fairs, and mainland training opportunities.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">General Support</h3>
                  <p className="text-sm text-gray-600">
                    Fund materials, training, stipends, and program operations across jurisdictions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
