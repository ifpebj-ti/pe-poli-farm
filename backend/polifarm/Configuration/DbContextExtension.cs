using Infra.Database;
using Microsoft.EntityFrameworkCore;

namespace Webapi.Configuration
{
    public static class DbContextExtension
    {
        public static IServiceCollection AddDbContextExtension(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<PolifarmDbContext>(options =>
        {
            options.UseNpgsql(connectionString,
                sql => sql.MigrationsAssembly("WebApi"));
        });

        return services;
    }
}
}