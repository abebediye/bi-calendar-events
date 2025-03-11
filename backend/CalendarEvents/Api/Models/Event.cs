namespace Api.Models;

public record Event(
    string Id,
    string Language,
    string Title,
    string Location,
    string FilterList,
    DateTime Start,
    DateTime End,
    string StartTime,
    string EndTime,
    string Url,
    string ImageUrl,
    string ImageText,
    bool BothLanguages,
    string Campus,
    string Audience
);