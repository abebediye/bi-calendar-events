export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  color?: string;
  language?: string;
  campus?: string;
  audience?: string;
  imageUrl?: string;
  imageText?: string;
  filterList?: string;
  startTime?: string;
  endTime?: string;
} 