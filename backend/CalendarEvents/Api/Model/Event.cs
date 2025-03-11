namespace Api.Model.Event;

public record Event(
    string Id,
    string Title,
    string Description,
    DateTime StartTime,
    DateTime EndTime,
    string Language,
    string Campus,
    string Audience
);