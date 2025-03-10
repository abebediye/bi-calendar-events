import { CalendarEvent } from '../types/calendar';
import './CalendarEventCard.css';

interface CalendarEventCardProps {
  event: CalendarEvent;
}

export const CalendarEventCard = ({ event }: CalendarEventCardProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get campus from filterList
  const getCampus = (filterList?: string) => {
    if (!filterList) return null;
    
    const campusNames = new Set(['Oslo', 'Bergen', 'Stavanger', 'Trondheim', 'main', 'Executive']);
    const campusDisplayNames: Record<string, string> = {
      'Oslo': 'Oslo Campus',
      'Bergen': 'Bergen Campus',
      'Stavanger': 'Stavanger Campus',
      'Trondheim': 'Trondheim Campus',
      'main': 'Main Campus',
      'Executive': 'Executive Campus'
    };
    
    const campus = filterList
      .split(',')
      .map(filter => filter.trim())
      .find(filter => campusNames.has(filter));
    
    return campus ? campusDisplayNames[campus] || campus : null;
  };

  // Get audience types from filterList
  const getAudienceTypes = (filterList?: string) => {
    if (!filterList) return [];
    
    // Known campus names to exclude from audience list
    const campusNames = new Set(['Oslo', 'Bergen', 'Stavanger', 'Trondheim', 'main', 'Executive']);
    
    return filterList
      .split(',')
      .map(filter => filter.trim())
      .filter(filter => !campusNames.has(filter))
      .map(audience => {
        // Format audience display text
        switch (audience) {
          case 'student-portal': return 'Students';
          case 'alumni-partner': return 'Alumni';
          case 'research': return 'Research';
          case 'bachelor': return 'Bachelor Students';
          case 'master': return 'Master Students';
          case 'bi-startup': return 'BI Startup';
          default: return audience.charAt(0).toUpperCase() + audience.slice(1).replace(/-/g, ' ');
        }
      });
  };

  const campus = event.filterList ? getCampus(event.filterList) : null;
  const audienceTypes = event.filterList ? getAudienceTypes(event.filterList) : [];

  return (
    <div className="calendar-event-card">
      {event.imageUrl && (
        <div className="event-image">
          <img src={event.imageUrl} alt={event.imageText || event.title} />
        </div>
      )}
      <div className="event-content">
        <h3>{event.title}</h3>
        <div className="event-details">
          <div className="event-time">
            <span className="icon">🗓</span>
            {formatDate(event.start)}
            <div className="time-range">
              <span className="icon">🕒</span>
              {event.startTime} - {event.endTime}
            </div>
          </div>
          {event.location && (
            <div className="event-location">
              <span className="icon">📍</span>
              {event.location}
            </div>
          )}
          {campus && (
            <div className="event-campus">
              <span className="icon">🏛</span>
              {campus}
            </div>
          )}
          {audienceTypes.length > 0 && (
            <div className="event-audience">
              <span className="icon">👥</span>
              {audienceTypes.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 