import { useEffect } from 'react'
import { Filters } from './types/filters'
import { CalendarEventList } from './features/calendar/components/CalendarEventList'
import { EventFilters } from './features/calendar/components/EventFilters'
import { useEvents } from './hooks/useEvents'
import './App.css'
import './features/calendar/styles/Calendar.css'

function App() {
  const { events, loading, error, fetchEvents } = useEvents()

  // Initial fetch
  useEffect(() => {
    fetchEvents({})
  }, [])

  const handleFilterChange = (filters: Filters) => {
    fetchEvents(filters)
  }

  if (loading) {
    return (
      <div className="app">
        <h1>Calendar Events</h1>
        <div className="loading">Loading events...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <h1>Calendar Events</h1>
        <div className="error">
          <p>{error.message}</p>
          {error.status && <p>Status: {error.status}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Calendar Events</h1>
      <EventFilters 
        events={events}
        onFilterChange={handleFilterChange}
      />
      <div className="events-count">
        Showing {events.length} event{events.length !== 1 ? 's' : ''}
      </div>
      <CalendarEventList events={events} />
    </div>
  )
}

export default App 