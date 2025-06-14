using Application.Gateways;
using Application.Usecases.Appointment;
using Application.Usecases.Auth;
using Application.Usecases.MedicalCertificate;
using Application.Usecases.Note;
using Application.Usecases.Patient;
using Application.Usecases.Prescription;
using Application.Usecases.Referral;
using Application.Usecases.Service;
using Application.Usecases.User;
using Domain.Entites;
using Domain.Entities.Notes;
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
            services.AddScoped<AddNoteUseCase>();
            services.AddScoped<RemoveNoteUseCase>();

            //Notes
            services.AddScoped<INotesRepositoryGateway, NotesRepositoryGateway>();
            services.AddScoped<GetNotesUseCase>();

            //Medical Record
            services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
            services.AddScoped<IMedicalCertificateRepositoryGateway, MedicalCertificateRepositoryGateway>();
            services.AddScoped<AddPrescriptionUseCase>();
            services.AddScoped<CreateMedicalCertificateUseCase>();
            services.AddScoped<GetMedicalCertificateUseCase>();
            services.AddScoped<CreateReferralUseCase>();
            services.AddScoped<GetReferralUseCase>();
            services.AddScoped<IReferralRepositoryGateway, ReferralRepositoryGateway>();

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
            services.AddScoped(typeof(IGenericRepositoryGateway<>), typeof(GenericRepositoryGateway<>));
        }
    }
}
