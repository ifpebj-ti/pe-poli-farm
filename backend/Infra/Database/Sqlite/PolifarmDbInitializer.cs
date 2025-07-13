using Application.Gateways;
using Domain.Entites.AccessCode;
using Domain.Entites.Profile;
using Domain.Entites.User;
using Domain.Entities.Address;
using Domain.Entities.Anamnese;
using Domain.Entities.EmergencyContactDetails;
using Domain.Entities.HealthAndDisease;
using Domain.Entities.MedicalRecord;
using Domain.Entities.Patient;
using Domain.Entities.Service;
using Domain.Enums;
using Domain.ValuesObjects;
using Infra.Database;
using Infra.Gateways;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;
using prontuario.Domain.ValuesObjects;

namespace polifarm.Infra.Database;

public static class PolifarmDbInitializer
{
    public static void Initialize(PolifarmDbContext context, IBcryptGateway bcrypt)
    {
        // Perfis: Médico, Enfermeiro, Recepcionista
        if (!context.Profiles.Any())
        {
            context.Profiles.AddRange(
                new ProfileEntity(
                    new Role(RoleType.ADMIN.ToString())
                ),
                new ProfileEntity(
                    new Role(RoleType.RECEPTIONTEAM.ToString())
                ),
                new ProfileEntity(
                    new Role(RoleType.DOCTOR.ToString())
                ),
                new ProfileEntity(
                    new Role(RoleType.NURSE.ToString())
                ),
                new ProfileEntity(
                    new Role(RoleType.INTITUATIONMANAGEMENT.ToString())
                )
            );

            context.SaveChanges();
        }

        // Usuários
        if (!context.Users.Any())
        {
            var medico = context.Profiles.First(p => p.Role.Value == RoleType.DOCTOR.ToString());
            var enfermeiro = context.Profiles.First(p => p.Role.Value == RoleType.NURSE.ToString());

            var accessCodeJoao = new AccessCodeEntity(new Guid(), "1Y0OBOCFIK", true, false, DateTime.Now.AddDays(30));
            var accessCodeMaria = new AccessCodeEntity(new Guid(), "1Y0OBOCFIJ", true, false, DateTime.Now.AddDays(30));

            context.Users.AddRange(
                new UserEntity(
                    name: "Dr. João Silva",
                    email: new Email("joao.silva@polifarm.com"),
                    cpf: new CPF("111.222.333-44"),
                    position: new Positions(PositionType.DOCTOR.ToString()),
                    password: bcrypt.GenerateHashPassword("Oi@12345"),
                    firstAccess: true,
                    active: true,
                    profile: medico,
                    accessCode: accessCodeJoao
                ),
                new UserEntity(
                    name: "Enf. Maria Souza",
                    email: new Email("maria.souza@polifarm.com"),
                    cpf: new CPF("555.666.777-88"),
                    position: new Positions(PositionType.NURSE.ToString()),
                    password: bcrypt.GenerateHashPassword("Oi@12345"),
                    firstAccess: true,
                    active: true,
                    profile: enfermeiro,
                    accessCode: accessCodeMaria
                )
            );

            context.SaveChanges();
        }

        if (!context.Patients.Any())
        {
            // 1. Cria e salva o Paciente
            var paciente = new PatientEntity(
                id: new Guid("abf0cecc-a1ca-4ed4-9f8b-7781ae6da6e2"), // Usando um ID fixo para consistência
                name: "Carlos Andrade",
                socialName: null,
                dateBirth: new DateTime(1985, 5, 1),
                sus: new SUS("123456789123456"),
                cpf: new CPF("123.456.789-00"),
                rg: new RG("1234567"),
                phone: new Phone("(81) 90000-0001"),
                motherName: "Maria Andrade",
                status: new PatientStatus(PatientStatusType.IN_SERVICE.ToString()),
                addressEntity: new AddressEntity(new Guid(), new CEP("12345-575"), "Rua dos bobos", "Arapiraca", 0, "São Pedro"),
                emergencyContactDetailsEntity: new List<EmergencyContactDetailsEntity>(),
                serviceEntities: null
            );
            context.Patients.Add(paciente);
            context.SaveChanges(); // Salva o paciente para que ele tenha um ID no banco

            // 2. Cria e salva o Atendimento (Service)
            var servico = new ServiceEntity(
                id: Guid.NewGuid(),
                serviceStatus: "EM_ATENDIMENTO",
                serviceDate: DateTime.Today,
                patientEntity: paciente,
                medicalRecordEntity: null
            );
            context.Services.Add(servico);
            context.SaveChanges(); // Salva o serviço para que ele tenha um ID no banco

            // 3. Cria o Prontuário (MedicalRecord) já associado ao ID do serviço
            //    Assumindo que seu construtor foi ajustado para receber o serviceId
            var registro = new MedicalRecordEntity(
                id: Guid.NewGuid(),
                status: new MedicalRecordStatus(MedicalRecordStatusType.MEDICAL_CARE.ToString()),
                statusInCaseOfAdmission: new MedicalRecordStatus(MedicalRecordStatusType.MEDICAL_CARE.ToString()),
                anamnese: null,
                serviceId: servico.Id
            );

            // 4. Cria a Anamnese associada ao prontuário
            var anamnese = new AnamneseEntity(
                id: Guid.NewGuid(),
                bloodPressure: "120/80",
                glucose: "90",
                temperature: "36.5",
                respiratoryRate: "18",
                bloodType: "O+",
                weight: "72",
                heartRate: "72",
                saturation: "98",
                height: "1.75",
                antecPathological: false,
                necesPsicobio: false,
                diabetes: false,
                medicationsInUse: true,
                useOfProthesis: false,
                allergies: true,
                allergiesType: "Poeira",
                antecPathologicalType: "Hipertensão",
                medicationInUseType: "Losartana",
                medicalHypothesis: "Gripe comum",
                previousSurgeries: "Apendicectomia",
                SignsAndSymptoms: "Febre, dor de cabeça",
                classificationStatus: new ClassificationStatus(ClassificationStatusType.EMERGENCY.ToString()),
                registro.Id
            );

            // 5. Cria o Histórico de Saúde associado ao prontuário


            // 6. Associa tudo em memória antes do SaveChanges final
            registro.Anamnese = anamnese;
            servico.MedicalRecordEntity = registro;

            context.MedicalRecords.Add(registro); // Adiciona o prontuário (e a anamnese/histórico por transitividade)
            context.Services.Update(servico);     // Marca o serviço para ser atualizado com o ID do prontuário

            // 7. Salva todas as mudanças restantes em uma única transação
            context.SaveChanges();
        }
    }
}