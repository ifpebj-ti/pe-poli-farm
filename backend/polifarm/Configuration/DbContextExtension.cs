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
                options.UseNpgsql(configuration.GetValue<string>("DB_SETTINGS:CONNECTION_STRING_DEV"),
                    sql => sql.MigrationsAssembly("WebApi"));
            });

            return services;
        }
    }
}
