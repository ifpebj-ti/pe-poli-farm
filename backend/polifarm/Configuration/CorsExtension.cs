namespace Webapi.Configuration
{
    public static class CorsExtension
    {
        public static IServiceCollection AddCorsExtension(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: "CorsPolicy",
                    options =>
                    {
                        options.WithOrigins("http://localhost:3000", "http://4.201.224.218:3000", "http://frontend:3000", "https://prontusvitale.tech")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            return services;
        }
    }
}
