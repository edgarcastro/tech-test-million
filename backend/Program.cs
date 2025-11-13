using MongoDB.Driver;
using tech_test_million.Models;
using tech_test_million.Repositories;
using tech_test_million.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure MongoDB settings
var mongoDbSettings =  builder.Configuration.GetSection("MongoDBSettings").Get<MongoDbSettings>()
    ?? throw new InvalidOperationException("MongoDBSettings configuration is missing");

var connectionString = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING") ?? mongoDbSettings.ConnectionString;

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Add CORS
var corsOrigins = Environment.GetEnvironmentVariable("CORS_ORIGINS")?.Split(',') 
    ?? new[] { "http://localhost:5172" };

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(corsOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Register MongoDB
builder.Services.AddSingleton<IMongoClient>(new MongoClient(connectionString));
builder.Services.AddSingleton<IMongoDatabase>(sp => 
    sp.GetRequiredService<IMongoClient>().GetDatabase(mongoDbSettings.DatabaseName));

// Register repositories
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();

// Register services
builder.Services.AddScoped<IPropertyService, PropertyService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Use CORS before other middleware
app.UseCors();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
