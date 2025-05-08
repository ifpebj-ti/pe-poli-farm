using Infra.Database;
using Microsoft.EntityFrameworkCore;

namespace Webapi.Configuration
{
    public static class DbContextExtension
    {
        public static IServiceCollection AddDbContextExtension(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<PolifarmDbContext>(options =>
            {
                var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");

                if (string.IsNullOrEmpty(connectionString))
                    throw new InvalidOperationException("A variável de ambiente CONNECTION_STRING não foi encontrada ou está vazia.");

                options.UseNpgsql(connectionString,
                    sql => sql.MigrationsAssembly("WebApi"));
            });

            return services;
        }
    }
}