/*
 * ZALPHA Platform - Pacific Job Connection System
 * Pacific Co-Op & Work-Based Learning Hub
 * Jurisdiction Selector Component
 */

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";

export interface Jurisdiction {
  id: string;
  name: string;
  code: string;
  color: string;
}

export interface Program {
  id: string;
  jurisdictionId: string;
  name: string;
  type: 'coop' | 'wbl' | 'see' | 'apprenticeship' | 'internship' | 'youth-employment';
  description: string;
}

export const JURISDICTIONS: Jurisdiction[] = [
  { id: 'cnmi', name: 'CNMI', code: 'CNMI', color: 'bg-blue-500' },
  { id: 'guam', name: 'Guam', code: 'GU', color: 'bg-green-500' },
  { id: 'fsm', name: 'FSM', code: 'FSM', color: 'bg-purple-500' },
  { id: 'palau', name: 'Palau', code: 'PW', color: 'bg-orange-500' },
  { id: 'rmi', name: 'RMI', code: 'RMI', color: 'bg-red-500' },
];

export const PROGRAMS: Program[] = [
  {
    id: 'cnmi-coop',
    jurisdictionId: 'cnmi',
    name: 'PSS Cooperative Education (Co-Op)',
    type: 'coop',
    description: 'CNMI high school cooperative education program connecting classroom learning with workplace experience',
  },
  {
    id: 'guam-wbl',
    jurisdictionId: 'guam',
    name: 'High-School Work-Based Learning / Youth Employment',
    type: 'youth-employment',
    description: 'Guam youth employment with strict age/hour regulations and employment certificate requirements',
  },
  {
    id: 'fsm-see',
    jurisdictionId: 'fsm',
    name: 'SEE / CTE Work-Based Learning & Apprenticeships',
    type: 'see',
    description: 'FSM Secondary Education Enhancement and Career Technical Education programs',
  },
  {
    id: 'palau-cte',
    jurisdictionId: 'palau',
    name: 'Palau CTE WBL & Career Skills / Internships',
    type: 'internship',
    description: 'Palau Career Technical Education work-based learning and career skills development',
  },
  {
    id: 'rmi-work',
    jurisdictionId: 'rmi',
    name: 'RMI PSS Annual Work Program',
    type: 'wbl',
    description: 'Marshall Islands annual student work program through Public School System',
  },
];

interface JurisdictionSelectorProps {
  selectedJurisdiction?: string;
  selectedProgram?: string;
  onJurisdictionChange?: (jurisdictionId: string) => void;
  onProgramChange?: (programId: string) => void;
  showProgramSelector?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function JurisdictionSelector({
  selectedJurisdiction,
  selectedProgram,
  onJurisdictionChange,
  onProgramChange,
  showProgramSelector = false,
  label = 'Jurisdiction',
  size = 'md',
}: JurisdictionSelectorProps) {
  const filteredPrograms = selectedJurisdiction
    ? PROGRAMS.filter((p) => p.jurisdictionId === selectedJurisdiction)
    : PROGRAMS;

  const selectedJurisdictionData = JURISDICTIONS.find((j) => j.id === selectedJurisdiction);

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Select value={selectedJurisdiction} onValueChange={onJurisdictionChange}>
          <SelectTrigger className={size === 'sm' ? 'h-9' : size === 'lg' ? 'h-12' : 'h-10'}>
            <SelectValue placeholder="Select jurisdiction..." />
          </SelectTrigger>
          <SelectContent>
            {JURISDICTIONS.map((jurisdiction) => (
              <SelectItem key={jurisdiction.id} value={jurisdiction.id}>
                <div className="flex items-center gap-2">
                  <Badge className={`${jurisdiction.color} text-white`}>{jurisdiction.code}</Badge>
                  <span>{jurisdiction.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showProgramSelector && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Program Type</label>
          <Select value={selectedProgram} onValueChange={onProgramChange} disabled={!selectedJurisdiction}>
            <SelectTrigger className={size === 'sm' ? 'h-9' : size === 'lg' ? 'h-12' : 'h-10'}>
              <SelectValue placeholder="Select program..." />
            </SelectTrigger>
            <SelectContent>
              {filteredPrograms.map((program) => (
                <SelectItem key={program.id} value={program.id}>
                  <div className="space-y-1">
                    <div className="font-medium">{program.name}</div>
                    <div className="text-xs text-gray-500">{program.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

export function JurisdictionBadge({ jurisdictionId }: { jurisdictionId: string }) {
  const jurisdiction = JURISDICTIONS.find((j) => j.id === jurisdictionId);
  if (!jurisdiction) return null;

  return (
    <Badge className={`${jurisdiction.color} text-white`}>
      {jurisdiction.code}
    </Badge>
  );
}

export function ProgramTypeBadge({ programId }: { programId: string }) {
  const program = PROGRAMS.find((p) => p.id === programId);
  if (!program) return null;

  const typeColors = {
    coop: 'bg-blue-100 text-blue-800',
    wbl: 'bg-green-100 text-green-800',
    see: 'bg-purple-100 text-purple-800',
    apprenticeship: 'bg-orange-100 text-orange-800',
    internship: 'bg-pink-100 text-pink-800',
    'youth-employment': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <Badge variant="outline" className={typeColors[program.type]}>
      {program.type.toUpperCase().replace('-', ' ')}
    </Badge>
  );
}
