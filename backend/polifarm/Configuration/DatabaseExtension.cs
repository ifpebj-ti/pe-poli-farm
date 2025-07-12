using Application.Gateways;
using Infra.Database;
using Microsoft.EntityFrameworkCore;
using polifarm.Infra.Database;

namespace Webapi.Configuration;

public static class DatabaseExtensions
{
    public static void ApplyMigrationsAndSeed(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            var dbContext = services.GetRequiredService<PolifarmDbContext>();
            dbContext.Database.Migrate();

            var bcrypt = services.GetRequiredService<IBcryptGateway>();
            PolifarmDbInitializer.Initialize(dbContext, bcrypt);
        }
        catch (Exception ex)
        {
            // Opcional: Adicionar log de erro se a migração/seeding falhar
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "Ocorreu um erro durante a migração ou seeding do banco de dados.");
            // Você pode decidir se quer que a aplicação pare ou continue caso isso falhe.
            throw;
        }
    }
}