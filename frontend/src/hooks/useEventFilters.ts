import { useState, useCallback, useMemo } from 'react';
import { Filters } from '../types/filters';
import { CalendarEvent } from '../types/calendar';
import { CAMPUS_NAMES } from '../constants/campusConfig';
import { AUDIENCE_DISPLAY_NAMES } from '../constants/audienceConfig';

type FilterableKeys = Extract<keyof CalendarEvent, keyof Filters>;

export const useEventFilters = (events: CalendarEvent[]) => {
  const [filters, setFilters] = useState<Filters>({});

  const handleFilterChange = useCallback((filterType: keyof Filters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value === 'All' ? undefined : value
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
  }, []);

  const getOptionCount = useCallback((filterType: keyof Filters, optionValue: string): number => {
    if (filterType === 'resultsLimit') return 0;
    return events.filter(event => {
      const eventValue = event[filterType as FilterableKeys];
      return eventValue === optionValue;
    }).length;
  }, [events]);

  const hasActiveFilters = useMemo(() => 
    Object.values(filters).some(value => value !== undefined),
    [filters]
  );

  const filterCounts = useMemo(() => {
    const counts: Record<keyof Filters, Record<string, number>> = {
      language: {},
      campus: {},
      audience: {},
      resultsLimit: {}
    };

    events.forEach(event => {
      (['language', 'campus', 'audience'] as const).forEach(key => {
        const value = event[key];
        if (typeof value === 'string') {
          counts[key][value] = (counts[key][value] || 0) + 1;
        }
      });
    });

    return counts;
  }, [events]);

  return {
    filters,
    handleFilterChange,
    clearAllFilters,
    getOptionCount,
    hasActiveFilters,
    filterCounts
  };
}; 