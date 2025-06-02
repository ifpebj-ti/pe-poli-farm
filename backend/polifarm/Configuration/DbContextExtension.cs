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
            options.UseSqlite("Data Source=./polifarm.db",
                sql => sql.MigrationsAssembly("WebApi"));
        });

        return services;
    }
}
}