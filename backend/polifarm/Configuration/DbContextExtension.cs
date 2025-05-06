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
                options.UseNpgsql("Host=localhost;Port=5432;Database=polifarm_db;Username=polifarm;Password=polifarm",
                    sql => sql.MigrationsAssembly("WebApi"));
            });

            return services;
        }
    }
}