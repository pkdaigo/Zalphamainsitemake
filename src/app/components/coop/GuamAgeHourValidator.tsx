/*
 * ZALPHA Platform - Pacific Co-Op & Work-Based Learning Hub
 * Guam Youth Employment Age/Hour Validation Component
 */

import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

export interface GuamWorkRules {
  age: number;
  maxHoursPerDay: number;
  maxHoursPerWeek: number;
  allowedStartTime: string; // 24-hour format
  allowedEndTime: string; // 24-hour format
  schoolDaysMaxHours: number;
}

const GUAM_RULES: Record<'14-15' | '16-17', GuamWorkRules> = {
  '14-15': {
    age: 14,
    maxHoursPerDay: 3,
    maxHoursPerWeek: 18,
    allowedStartTime: '07:00',
    allowedEndTime: '19:00', // 7 PM on school days, 9 PM non-school days
    schoolDaysMaxHours: 3,
  },
  '16-17': {
    age: 16,
    maxHoursPerDay: 8,
    maxHoursPerWeek: 40,
    allowedStartTime: '05:00',
    allowedEndTime: '22:00', // 10 PM on school nights, midnight non-school nights
    schoolDaysMaxHours: 4,
  },
};

interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
  info: string[];
}

export interface WorkLogData {
  date: string;
  startTime: string; // HH:MM format
  endTime: string;
  hours: number;
  isSchoolDay: boolean;
}

export function validateGuamWorkLog(
  age: number,
  workLog: WorkLogData,
  weeklyHoursSoFar: number = 0
): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    warnings: [],
    errors: [],
    info: [],
  };

  const ageGroup: '14-15' | '16-17' = age <= 15 ? '14-15' : '16-17';
  const rules = GUAM_RULES[ageGroup];

  // Check daily hours
  if (workLog.hours > rules.maxHoursPerDay) {
    result.errors.push(
      `Daily limit exceeded: ${workLog.hours} hours (max ${rules.maxHoursPerDay} for age ${ageGroup})`
    );
    result.isValid = false;
  }

  // Check weekly hours
  const projectedWeeklyHours = weeklyHoursSoFar + workLog.hours;
  if (projectedWeeklyHours > rules.maxHoursPerWeek) {
    result.errors.push(
      `Weekly limit exceeded: ${projectedWeeklyHours} hours (max ${rules.maxHoursPerWeek} for age ${ageGroup})`
    );
    result.isValid = false;
  }

  // Check school day hours
  if (workLog.isSchoolDay && workLog.hours > rules.schoolDaysMaxHours) {
    result.errors.push(
      `School day limit exceeded: ${workLog.hours} hours (max ${rules.schoolDaysMaxHours} on school days for age ${ageGroup})`
    );
    result.isValid = false;
  }

  // Check time of day
  const startHour = parseInt(workLog.startTime.split(':')[0]);
  const endHour = parseInt(workLog.endTime.split(':')[0]);
  const ruleStartHour = parseInt(rules.allowedStartTime.split(':')[0]);
  const ruleEndHour = parseInt(rules.allowedEndTime.split(':')[0]);

  if (startHour < ruleStartHour) {
    result.warnings.push(
      `Start time ${workLog.startTime} is before allowed time ${rules.allowedStartTime} for age ${ageGroup}`
    );
  }

  if (endHour > ruleEndHour) {
    result.warnings.push(
      `End time ${workLog.endTime} is after allowed time ${rules.allowedEndTime} for age ${ageGroup}`
    );
  }

  // Add info about employment certificate
  if (age < 18) {
    result.info.push('Employment certificate required for workers under 18');
  }

  return result;
}

interface GuamValidatorDisplayProps {
  age: number;
  workLog?: WorkLogData;
  weeklyHoursSoFar?: number;
  showRules?: boolean;
}

export function GuamValidatorDisplay({
  age,
  workLog,
  weeklyHoursSoFar = 0,
  showRules = false,
}: GuamValidatorDisplayProps) {
  const ageGroup: '14-15' | '16-17' = age <= 15 ? '14-15' : '16-17';
  const rules = GUAM_RULES[ageGroup];

  const validation = workLog
    ? validateGuamWorkLog(age, workLog, weeklyHoursSoFar)
    : null;

  if (showRules) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Guam Youth Employment Rules (Age {ageGroup})</AlertTitle>
        <AlertDescription>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Max {rules.maxHoursPerDay} hours per day</li>
            <li>• Max {rules.maxHoursPerWeek} hours per week</li>
            <li>• Max {rules.schoolDaysMaxHours} hours on school days</li>
            <li>
              • Work hours: {rules.allowedStartTime} - {rules.allowedEndTime}
            </li>
            <li>• Employment certificate required</li>
          </ul>
        </AlertDescription>
      </Alert>
    );
  }

  if (!validation) return null;

  return (
    <div className="space-y-2">
      {validation.errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 space-y-1">
              {validation.errors.map((error, idx) => (
                <li key={idx}>• {error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {validation.warnings.length > 0 && (
        <Alert className="border-orange-500 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-800">Warnings</AlertTitle>
          <AlertDescription className="text-orange-700">
            <ul className="mt-2 space-y-1">
              {validation.warnings.map((warning, idx) => (
                <li key={idx}>• {warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {validation.isValid && validation.errors.length === 0 && (
        <Alert className="border-green-500 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Valid Work Log</AlertTitle>
          <AlertDescription className="text-green-700">
            This work log complies with Guam youth employment regulations.
          </AlertDescription>
        </Alert>
      )}

      {validation.info.length > 0 && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <ul className="space-y-1">
              {validation.info.map((info, idx) => (
                <li key={idx}>• {info}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export function GuamWeeklyHoursTracker({
  age,
  weeklyHours,
}: {
  age: number;
  weeklyHours: number;
}) {
  const ageGroup: '14-15' | '16-17' = age <= 15 ? '14-15' : '16-17';
  const rules = GUAM_RULES[ageGroup];
  const percentage = (weeklyHours / rules.maxHoursPerWeek) * 100;
  const isNearLimit = percentage >= 80;
  const isOverLimit = weeklyHours > rules.maxHoursPerWeek;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Weekly Hours (Guam Limit)</span>
        <span className={`font-semibold ${isOverLimit ? 'text-red-600' : isNearLimit ? 'text-orange-600' : 'text-gray-900'}`}>
          {weeklyHours} / {rules.maxHoursPerWeek}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all ${
            isOverLimit ? 'bg-red-600' : isNearLimit ? 'bg-orange-600' : 'bg-blue-600'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {isNearLimit && !isOverLimit && (
        <p className="text-xs text-orange-600">⚠️ Approaching weekly hour limit</p>
      )}
      {isOverLimit && (
        <p className="text-xs text-red-600">❌ Weekly hour limit exceeded</p>
      )}
    </div>
  );
}
