using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Logs;
using OpenTelemetry.Trace;
using Grafana.OpenTelemetry;
using Npgsql;

namespace Webapi.Configuration;

public static class ObservabilityExtensions
{
    private const string ServiceName = "PolifarmService";
    private const string ServiceVersion = "1.0.0";

    public static IServiceCollection AddObservability(this IServiceCollection services)
    {
        var resourceBuilder = ResourceBuilder.CreateDefault()
            .AddService(serviceName: ServiceName, serviceVersion: ServiceVersion);

        // Configura Métricas e Traces
        services.AddOpenTelemetry()
            .ConfigureResource(resource => resource.AddService(ServiceName, serviceVersion: ServiceVersion))
            .WithMetrics(metricsOptions =>
                metricsOptions
                    .AddMeter(ServiceName)
                    .AddAspNetCoreInstrumentation()
                    .AddHttpClientInstrumentation()
                    .AddRuntimeInstrumentation()
                    .AddProcessInstrumentation()
                    .UseGrafana() // Supondo que .UseGrafana() é seu método de extensão para o exporter
            ).WithTracing(traceBuilder =>
                traceBuilder
                    .AddSource(ServiceName)
                    .AddAspNetCoreInstrumentation()
                    .AddHttpClientInstrumentation()
                    .AddNpgsql()
                    .AddConsoleExporter()
                    .UseGrafana() // Supondo que .UseGrafana() é seu método de extensão para o exporter
            );

        // Configura Logging
        services.AddLogging(loggingBuilder =>
        {
            loggingBuilder.AddOpenTelemetry(options =>
            {
                options.SetResourceBuilder(resourceBuilder);
                options.IncludeFormattedMessage = true;
                options.IncludeScopes = true;
                options.ParseStateValues = true;
                options.AttachLogsToActivityEvent();
                options.AddConsoleExporter();
                options.UseGrafana(); // Supondo que .UseGrafana() é seu método de extensão para o exporter
            });
        });

        return services;
    }
}