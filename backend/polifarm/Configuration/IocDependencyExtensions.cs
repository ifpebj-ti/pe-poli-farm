using Application.Gateways;
using Application.Usecases.Auth;
using Application.Usecases.User;
using Infra.Gateways;

namespace Webapi.Configuration
{
    public static class IocDependencyExtensions
    {
        public static void AddIocDependencies(this IServiceCollection services)
        {
            //User
            services.AddScoped<IUserRepositoryGateway, UserRepositoryGateway>();
            services.AddScoped<FindUserByEmail>();
            services.AddScoped<CreateUserUseCase>();
            services.AddScoped<UpdateUserPasswordUseCase>();

            // Profiles
            services.AddScoped<IProfileRepositoryGateway, ProfileRepositoryGateway>();

            // Auth
            services.AddScoped<LoginUseCase>();

            // Outros serviços
            services.AddScoped<IBcryptGateway, BcryptServiceGateway>();
            services.AddScoped<ITokenGateway, TokenGateway>();
        }
    }
}
