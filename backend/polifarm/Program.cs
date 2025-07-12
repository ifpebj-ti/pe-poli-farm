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
using Application.Gateways;
using Npgsql;
using WebApi.Tracing;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Extension methods
builder.Services.AddObservability();
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

app.ApplyMigrationsAndSeed();

app.UseCors("CorsPolicy");

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();