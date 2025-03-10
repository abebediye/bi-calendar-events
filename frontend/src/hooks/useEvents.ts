import { useState, useEffect } from 'react';
import { CalendarEvent } from '../types/calendar';
import { Filters } from '../types/filters';
import { calendarService } from '../services/calendarService';

type FetchError = {
  message: string;
  code?: string;
  status?: number;
};

export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);

  const fetchEvents = async (currentFilters: Filters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await calendarService.getEvents(currentFilters);
      setEvents(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch calendar events';
      setError({
        message: 'Failed to fetch calendar events. Please try again later.',
        code: err instanceof Error ? err.name : undefined,
        status: (err as any)?.status
      });
      console.error('Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents
  };
}; 