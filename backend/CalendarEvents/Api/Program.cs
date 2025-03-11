using Api.Services;
using Api.Models;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "BI Calendar Events API",
        Description = "API for retrieving and filtering BI calendar events",
        Version = "v1",
        Contact = new OpenApiContact
        {
            Name = "BI Norwegian Business School",
            Url = new Uri("https://bi.no")
        }
    });
});
builder.Services.AddHttpClient<IBiClient, BiClient>();
builder.Services.AddScoped<ICalendarEventService, CalendarEventService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "BI Calendar Events API V1");
        c.RoutePrefix = string.Empty; // Serve the Swagger UI at the app's root
    });
}

app.UseHttpsRedirection();

// Use CORS before routing
app.UseCors("AllowLocalhost");

app.MapGet("/events", async (int? take, string? language, string? campus, string? audience, ICalendarEventService eventService) =>
{
    return await eventService.GetFilteredEventsAsync(take, language, campus, audience);
})
.WithName("GetEvents")
.WithOpenApi()
.RequireCors("AllowLocalhost")
.WithDescription("Get calendar events with optional filtering")
.WithSummary("Get Calendar Events")
.WithTags("Events")
.WithOpenApi(operation => {
    operation.Parameters[0].Description = "Number of events to return (default: 5)";
    operation.Parameters[1].Description = "Language filter ('en', 'no', or 'all')";
    operation.Parameters[2].Description = "Campus location filter";
    operation.Parameters[3].Description = "Target audience filter";
    return operation;
});

app.Run();


