export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTimeRange = (startTime?: string, endTime?: string): string => {
  if (!startTime || !endTime) return '';
  return `${startTime} - ${endTime}`;
}; 