using Infra.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using OpenTelemetry.Logs;
using Grafana.OpenTelemetry;
using polifarm.Infra.Database;
using System;
using Webapi.Configuration;
using WebApi.Config;
using WebApi.Configuration;

var serviceName = "dice-server";
var serviceVersion = "1.0.0";

var builder = WebApplication.CreateBuilder(args);

// add prometheus exporter
builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => resource.AddService(
        serviceName: serviceName,
        serviceVersion: serviceVersion))
    .WithMetrics(metricsOptions =>
        metricsOptions
            .AddMeter("teste")
            .AddAspNetCoreInstrumentation()
            .AddRuntimeInstrumentation()
            .AddProcessInstrumentation()
            .AddOtlpExporter(opts =>
            {
                opts.Endpoint = new Uri(builder.Configuration["Otel:Endpoint"]);
            })
    ).WithTracing((traceBuilder) =>
        traceBuilder
            .AddSource("teste")
            .AddAspNetCoreInstrumentation()
            .AddConsoleExporter()
            .UseGrafana()
    );

builder.Logging.AddOpenTelemetry(options =>
{
    options.SetResourceBuilder(ResourceBuilder.CreateDefault()
        .AddService(serviceName, serviceVersion: serviceVersion));
    options.IncludeFormattedMessage = true;
    options.IncludeScopes = true;
    options.ParseStateValues = true;
    options.AttachLogsToActivityEvent();
    options.AddConsoleExporter();
    options.UseGrafana();
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Extension methods
builder.Services.AddCorsExtension();
builder.Services.AddIocDependencies();
builder.Services.AddSwaggerExtension();
builder.Services.AddDbContextExtension(builder.Configuration);
builder.Services.AddAuthenticationExtension(builder.Configuration);
builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Log.Information("Executando Migrations");
using var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<PolifarmDbContext>();
dbContext.Database.Migrate();
PolifarmDbInitializer.Initialize(dbContext);

app.UseCors("CorsPolicy");

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();