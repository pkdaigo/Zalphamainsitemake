/*
 * ZALPHA Platform - Pacific Co-Op & Work-Based Learning Hub
 * Student Time Log Entry
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Checkbox } from "@/app/components/ui/checkbox";
import { ArrowLeft, Save, Clock } from "lucide-react";
import { GuamValidatorDisplay, validateGuamWorkLog } from "@/app/components/coop/GuamAgeHourValidator";

interface CoOpStudentTimeLogProps {
  onNavigate?: (page: string) => void;
}

export function CoOpStudentTimeLog({ onNavigate }: CoOpStudentTimeLogProps) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [tasks, setTasks] = useState('');
  const [reflection, setReflection] = useState('');
  const [isSchoolDay, setIsSchoolDay] = useState(true);

  // Mock student data
  const studentAge = 16;
  const jurisdictionId = 'guam';
  const weeklyHoursSoFar = 11;

  // Calculate hours
  const calculateHours = () => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return Math.max(0, diff);
  };

  const hours = calculateHours();
  const isGuam = jurisdictionId === 'guam';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting time log:', {
      date,
      startTime,
      endTime,
      hours,
      tasks,
      reflection,
      isSchoolDay,
    });
    // In real app, this would call an API
    alert('Time log submitted successfully!');
    onNavigate?.('coop-student-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate?.('coop-student-dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Log Work Hours</h1>
              <p className="text-sm text-gray-600 mt-1">Record your time and activities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Time Entry
              </CardTitle>
              <CardDescription>Enter your work date and hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              {hours > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Total Hours</div>
                  <div className="text-2xl font-bold text-blue-600">{hours.toFixed(2)} hours</div>
                </div>
              )}

              {isGuam && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="schoolDay"
                    checked={isSchoolDay}
                    onCheckedChange={(checked) => setIsSchoolDay(checked as boolean)}
                  />
                  <Label
                    htmlFor="schoolDay"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    This was a school day
                  </Label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Guam Validation */}
          {isGuam && date && startTime && endTime && hours > 0 && (
            <GuamValidatorDisplay
              age={studentAge}
              weeklyHoursSoFar={weeklyHoursSoFar}
              workLog={{
                date,
                startTime,
                endTime,
                hours,
                isSchoolDay,
              }}
            />
          )}

          <Card>
            <CardHeader>
              <CardTitle>Tasks & Activities</CardTitle>
              <CardDescription>What did you work on today?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tasks">Tasks Completed *</Label>
                <Textarea
                  id="tasks"
                  placeholder="Describe the tasks and activities you completed during this shift..."
                  value={tasks}
                  onChange={(e) => setTasks(e.target.value)}
                  rows={4}
                  required
                />
                <p className="text-xs text-gray-500">
                  Be specific: What did you do? What skills did you use?
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reflection">Reflection (Optional)</Label>
                <Textarea
                  id="reflection"
                  placeholder="What did you learn? Any challenges or successes?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  Reflect on your learning and growth during this experience.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onNavigate?.('coop-student-dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!date || !startTime || !endTime || !tasks || hours <= 0}
            >
              <Save className="w-4 h-4 mr-2" />
              Submit Log
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
