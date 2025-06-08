using Application.Gateways;
using Application.Usecases.Appointment;
using Application.Usecases.Auth;
using Application.Usecases.Patient;
using Application.Usecases.Prescription;
using Application.Usecases.Service;
using Application.Usecases.User;
using Infra.Gateways;
using prontuario.Application.Usecases.Service;

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

            //Patient
            services.AddScoped<IGatewayPatient, PatientRepositoryGateway>();
            services.AddScoped<CreatePatientUseCase>();
            services.AddScoped<UpdatePatientStatusUseCase>();
            services.AddScoped<FindAllPatientUseCase>();
            services.AddScoped<UpdatePatientUseCase>();
            services.AddScoped<FindPatientByIdUseCase>();

            //Medical Record
            services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
            services.AddScoped<AddPrescriptionUseCase>();

            //Service
            services.AddScoped<IServiceGateway, ServiceRepositoryGateway>();
            services.AddScoped<InitializeServiceUseCase>();
            services.AddScoped<FindAllServicesByPatientIdUseCase>();

            //Appointment
            services.AddScoped<IAppointmentRepository, AppointmentRepositoryGateway>();
            services.AddScoped<CreateAppointmentUseCase>();
            services.AddScoped<GetAppointmentsUseCase>();
            services.AddScoped<UpdateAppointmentStatusUseCase>();

            // Auth
            services.AddScoped<LoginUseCase>();

            // Outros serviços
            services.AddScoped<IBcryptGateway, BcryptServiceGateway>();
            services.AddScoped<ITokenGateway, TokenGateway>();
        }
    }
}
