using System.Net.Http.Json;
using System.Text.Json;
using Api.Models;

namespace Api.Services;

public interface IBiClient
{
    Task<IEnumerable<Event>> GetCalendarEventsAsync();
}

public class BiClient : IBiClient
{
    private readonly HttpClient _httpClient;
    private const string BaseAddress = "https://bi.no/api/";

    public BiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri(BaseAddress);
    }

    public async Task<IEnumerable<Event>> GetCalendarEventsAsync()
    {
        var requestUri = _httpClient.BaseAddress + "calendar-events";
        Console.WriteLine($"Making request to: {requestUri}");
        
        var response = await _httpClient.GetFromJsonAsync<IEnumerable<Event>>("calendar-events", new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        return response ?? Enumerable.Empty<Event>();
    }
} 