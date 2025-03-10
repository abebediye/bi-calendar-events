import { CalendarEvent } from '../../../types/calendar';
import { CalendarEventCard } from './CalendarEventCard';

interface CalendarEventListProps {
  events: CalendarEvent[];
}

export const CalendarEventList = ({ events }: CalendarEventListProps) => {
  if (events.length === 0) {
    return <p className="no-events">No events found</p>;
  }

  return (
    <div className="calendar-event-list">
      {events.map((event) => (
        <CalendarEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}; 