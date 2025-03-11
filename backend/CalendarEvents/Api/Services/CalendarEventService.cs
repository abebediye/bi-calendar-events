using Api.Models;

namespace Api.Services;

public interface ICalendarEventService
{
    Task<IEnumerable<Event>> GetFilteredEventsAsync(int? take, string? language, string? campus, string? audience);
}

public class CalendarEventService : ICalendarEventService
{
    private readonly IBiClient _biClient;

    public CalendarEventService(IBiClient biClient)
    {
        _biClient = biClient;
    }

    public async Task<IEnumerable<Event>> GetFilteredEventsAsync(int? take, string? language, string? campus, string? audience)
    {
        var events = await _biClient.GetCalendarEventsAsync();
        
        // Apply filters
        var filteredEvents = events.AsQueryable();

        if (!string.IsNullOrEmpty(language) && language.ToLower() != "all")
        {
            filteredEvents = filteredEvents.Where(e => e.Language.ToLower() == language.ToLower());
        }

        if (!string.IsNullOrEmpty(campus))
        {
            filteredEvents = filteredEvents.Where(e => e.FilterList.ToLower().Contains(campus.ToLower()));
        }

        if (!string.IsNullOrEmpty(audience))
        {
            filteredEvents = filteredEvents.Where(e => e.FilterList.ToLower().Contains(audience.ToLower()));
        }

        // Apply take limit
        var limit = take ?? 5;
        return filteredEvents.Take(limit);
    }
} 