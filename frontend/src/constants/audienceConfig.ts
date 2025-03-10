export type AudienceType = 
  | 'student-portal'
  | 'alumni-partner'
  | 'research'
  | 'bachelor'
  | 'master'
  | 'bi-startup';

export const AUDIENCE_DISPLAY_NAMES: Record<AudienceType | string, string> = {
  'student-portal': 'Students',
  'alumni-partner': 'Alumni',
  'research': 'Research',
  'bachelor': 'Bachelor Students',
  'master': 'Master Students',
  'bi-startup': 'BI Startup'
}; 