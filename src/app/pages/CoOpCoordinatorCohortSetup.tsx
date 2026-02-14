/*
 * ZALPHA Platform - Pacific Co-Op & Work-Based Learning Hub
 * Coordinator Cohort Setup Page
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CoOpCoordinatorCohortSetupProps {
  onNavigate?: (page: string) => void;
}

export function CoOpCoordinatorCohortSetup({ onNavigate }: CoOpCoordinatorCohortSetupProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate?.('co-op-coordinator-dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cohort Setup</h1>
              <p className="text-sm text-gray-600 mt-1">Create and configure program cohorts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Cohort Configuration</CardTitle>
            <CardDescription>Full cohort setup form coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This page will include jurisdiction selection, program type, term dates, eligibility rules,
              hour limits, and jurisdiction-specific configurations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
