export type CampusName = 'Oslo' | 'Bergen' | 'Stavanger' | 'Trondheim' | 'main' | 'Executive';

export const CAMPUS_NAMES = new Set<CampusName>(['Oslo', 'Bergen', 'Stavanger', 'Trondheim', 'main', 'Executive']);

export const CAMPUS_DISPLAY_NAMES: Record<CampusName, string> = {
  'Oslo': 'Oslo Campus',
  'Bergen': 'Bergen Campus',
  'Stavanger': 'Stavanger Campus',
  'Trondheim': 'Trondheim Campus',
  'main': 'Main Campus',
  'Executive': 'Executive Campus'
}; 