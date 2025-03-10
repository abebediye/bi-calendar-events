import { CalendarEvent } from '../../../types/calendar';
import { Icon } from '../../../shared/components/Icon';
import { formatDate, formatTimeRange } from '../../../utils/dateUtils';
import { parseFilterList } from '../../../utils/filterUtils';
import './CalendarEventCard.css';

interface CalendarEventCardProps {
  event: CalendarEvent;
}

export const CalendarEventCard = ({ event }: CalendarEventCardProps) => {
  const { campus, audienceTypes } = parseFilterList(event.filterList);

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
            <Icon type="calendar" />
            {formatDate(event.start)}
            <div className="time-range">
              <Icon type="time" />
              {formatTimeRange(event.startTime, event.endTime)}
            </div>
          </div>
          {event.location && (
            <div className="event-location">
              <Icon type="location" />
              {event.location}
            </div>
          )}
          {campus && (
            <div className="event-campus">
              <Icon type="campus" />
              {campus}
            </div>
          )}
          {audienceTypes.length > 0 && (
            <div className="event-audience">
              <Icon type="audience" />
              {audienceTypes.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 