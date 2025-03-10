import { Filters, filterOptions, FilterOption } from '../types/filters';
import { CalendarEvent } from '../types/calendar';
import './EventFilters.css';

interface EventFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  events: CalendarEvent[];
}

export const EventFilters = ({ filters, onFilterChange, events }: EventFiltersProps) => {
  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    onFilterChange({
      ...filters,
      [filterType]: value === 'All' ? undefined : value
    });
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const getOptionCount = (filterType: keyof Filters, optionValue: string) => {
    return events.filter(event => {
      const eventValue = event[filterType];
      return eventValue === optionValue;
    }).length;
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  const renderSelect = (
    label: string,
    filterType: keyof Filters,
    options: FilterOption[]
  ) => (
    <div className="filter-group">
      <label htmlFor={filterType}>{label}:</label>
      <select
        id={filterType}
        value={filters[filterType] || 'All'}
        onChange={(e) => handleFilterChange(filterType, e.target.value)}
        className={filters[filterType] ? 'active-filter' : ''}
      >
        <option value="All">All {label}s</option>
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.text} ({getOptionCount(filterType, option.value)})
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="event-filters-container">
      <div className="event-filters">
        {renderSelect('Language', 'language', filterOptions.languages)}
        {renderSelect('Campus', 'campus', filterOptions.campuses)}
        {renderSelect('Audience', 'audience', filterOptions.audiences)}
      </div>
      {hasActiveFilters && (
        <button 
          className="clear-filters-btn"
          onClick={clearAllFilters}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}; 