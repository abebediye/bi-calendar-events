import { CalendarEvent } from '../types/calendar';
import { Filters, filterOptions } from '../types/filters';

// Mapping of filter values to display names
const audienceDisplayNames: { [key: string]: string } = {
  'student-portal': 'Students',
  'alumni-partner': 'Alumni',
  'research': 'Research',
  'Executive': 'Executive',
  'bachelor': 'Bachelor Students',
  'master': 'Master Students',
  'bi-startup': 'BI Startup'
};

type CampusName = 'Oslo' | 'Bergen' | 'Stavanger' | 'Trondheim' | 'main' | 'Executive';

// Campus display names and valid campus values
const campusConfig = {
  displayNames: {
    'Oslo': 'Oslo Campus',
    'Bergen': 'Bergen Campus',
    'Stavanger': 'Stavanger Campus',
    'Trondheim': 'Trondheim Campus',
    'main': 'Main Campus',
    'Executive': 'Executive Campus'
  } as Record<CampusName, string>,
  // Set of valid campus values to filter from filterList
  validCampuses: new Set(['Oslo', 'Bergen', 'Stavanger', 'Trondheim', 'main', 'Executive'])
};

export const calendarService = {
  async getEvents(filters?: Filters): Promise<CalendarEvent[]> {
    try {
      // Build query parameters from filters
      const queryParams = new URLSearchParams();
      if (filters?.language) queryParams.append('language', filters.language);
      if (filters?.campus) queryParams.append('campus', filters.campus);
      if (filters?.audience) queryParams.append('audience', filters.audience);
      if (filters?.resultsLimit) queryParams.append('limit', filters.resultsLimit.toString());

      const queryString = queryParams.toString();
      const url = `/events${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Extract unique values and update filter options
      const uniqueValues = {
        languages: new Set<string>(),
        campuses: new Set<string>(),
        audiences: new Set<string>()
      };

      data.forEach((event: any) => {
        if (event.language) uniqueValues.languages.add(event.language);
        
        // Handle filterList for campuses and audiences (comma-separated values)
        if (event.filterList) {
          const filters = event.filterList.split(',').map((f: string) => f.trim());
          
          filters.forEach((filter: string) => {
            if (campusConfig.validCampuses.has(filter)) {
              uniqueValues.campuses.add(filter);
            } else {
              // If it's not a campus, it's an audience filter
              uniqueValues.audiences.add(filter);
            }
          });
        }
      });

      // Update filter options
      filterOptions.languages = Array.from(uniqueValues.languages).map(lang => ({
        key: lang,
        value: lang,
        text: lang === 'en' ? 'English' : lang === 'no' ? 'Norwegian' : lang.toUpperCase()
      }));

      filterOptions.campuses = Array.from(uniqueValues.campuses).map(campus => ({
        key: campus,
        value: campus,
        text: (campusConfig.displayNames[campus as CampusName] || campus.charAt(0).toUpperCase() + campus.slice(1) + ' Campus')
      }));

      filterOptions.audiences = Array.from(uniqueValues.audiences).map(audience => ({
        key: audience,
        value: audience,
        text: audienceDisplayNames[audience] || audience.charAt(0).toUpperCase() + audience.slice(1).replace(/-/g, ' ')
      }));

      // Sort filter options alphabetically by text
      filterOptions.languages.sort((a, b) => a.text.localeCompare(b.text));
      filterOptions.campuses.sort((a, b) => a.text.localeCompare(b.text));
      filterOptions.audiences.sort((a, b) => a.text.localeCompare(b.text));

      // Transform the dates from strings to Date objects
      return data.map((event: any) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  }
};