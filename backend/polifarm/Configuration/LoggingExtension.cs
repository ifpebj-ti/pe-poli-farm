using Microsoft.Extensions.Hosting;
using Serilog;
using Microsoft.Extensions.DependencyInjection;
using Serilog.Sinks.Grafana.Loki;

namespace WebApi.Configuration
{
    public static class LoggingExtension
    {
        public static void AddSerilogLogging(this IHostBuilder hostBuilder, IConfiguration config)
        {
            hostBuilder.UseSerilog((context, services, configuration) =>
            {
                configuration
                    .WriteTo.Console()
                    .WriteTo.GrafanaLoki(config.GetValue<string>("LOKI_URL")!)
                    .Enrich.WithProperty("Application", "Polifarm")
                    .Enrich.FromLogContext();
            });
        }
    }
}
