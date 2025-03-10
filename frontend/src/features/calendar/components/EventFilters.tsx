import { Filters, filterOptions, FilterOption, RESULTS_LIMIT_OPTIONS } from '../../../types/filters';
import { useEventFilters } from '../../../hooks/useEventFilters';
import { CalendarEvent } from '../../../types/calendar';
import './EventFilters.css';

interface EventFiltersProps {
  events: CalendarEvent[];
  onFilterChange: (filters: Filters) => void;
}

export const EventFilters = ({ events, onFilterChange }: EventFiltersProps) => {
  const {
    filters,
    handleFilterChange,
    clearAllFilters,
    filterCounts,
    hasActiveFilters
  } = useEventFilters(events);

  const renderSelect = (
    label: string,
    filterType: keyof Filters,
    options: FilterOption[],
    showCount = true
  ) => (
    <div className="filter-group">
      <label htmlFor={filterType}>{label}:</label>
      <select
        id={filterType}
        value={filters[filterType] || 'All'}
        onChange={(e) => {
          const value = filterType === 'resultsLimit' ? Number(e.target.value) : e.target.value;
          handleFilterChange(filterType, value);
          onFilterChange({
            ...filters,
            [filterType]: e.target.value === 'All' ? undefined : value
          });
        }}
        className={filters[filterType] ? 'active-filter' : ''}
      >
        <option value="All">All {label}s</option>
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.text}
            {showCount ? ` (${filterCounts[filterType as keyof typeof filterCounts]?.[option.value] || 0})` : ''}
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
        {renderSelect('Show', 'resultsLimit', RESULTS_LIMIT_OPTIONS, false)}
      </div>
      {hasActiveFilters && (
        <button 
          className="clear-filters-btn"
          onClick={() => {
            clearAllFilters();
            onFilterChange({});
          }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}; 