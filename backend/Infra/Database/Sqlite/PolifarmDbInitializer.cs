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
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;
using prontuario.Domain.ValuesObjects;

namespace polifarm.Infra.Database;

public static class PolifarmDbInitializer
{
    public static void Initialize(PolifarmDbContext context)
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

            var accessCode = new AccessCodeEntity(new Guid(), "1Y0OBOCFIJ", true, false, DateTime.Now.AddDays(30));
            var accessCode2 = new AccessCodeEntity(new Guid(), "2Y0OBOCFIK", true, false, DateTime.Now.AddDays(30));

            context.Users.AddRange(
                new UserEntity(
                    name: "Dr. João Silva",
                    email: new Email("joao.silva@polifarm.com"),
                    cpf: new CPF("111.222.333-44"),
                    position: new Positions(PositionType.DOCTOR.ToString()),
                    password: "hashedpassword",
                    firstAccess: true,
                    active: true,
                    profile: medico,
                    accessCode: accessCode
                ),
                new UserEntity(
                    name: "Enf. Maria Souza",
                    email: new Email("maria.souza@polifarm.com"),
                    cpf: new CPF("555.666.777-88"),
                    position: new Positions(PositionType.NURSE.ToString()),
                    password: "hashedpassword",
                    firstAccess: true,
                    active: true,
                    profile: enfermeiro,
                    accessCode: accessCode2
                )
            );

            context.SaveChanges();
        }

        if (!context.Patients.Any())
        {
            var paciente = new PatientEntity(
                id: Guid.NewGuid(),
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
            context.SaveChanges();

            var servico = new ServiceEntity(
                id: Guid.NewGuid(),
                serviceStatus: "EM_ATENDIMENTO",
                serviceDate: DateTime.Today,
                patientEntity: paciente,
                medicalRecordEntity: null
            );

            context.Services.Add(servico);
            context.SaveChanges();

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
                classificationStatus: new ClassificationStatus(ClassificationStatusType.EMERGENCY.ToString())
            );


            var registro = new MedicalRecordEntity(
                id: Guid.NewGuid(),
                status: new MedicalRecordStatus(MedicalRecordStatusType.MEDICAL_CARE.ToString()),
                statusInCaseOfAdmission: new MedicalRecordStatus(MedicalRecordStatusType.MEDICAL_CARE.ToString()),
                anamnese: anamnese
            );

            servico.MedicalRecordEntity = registro;
            
            context.MedicalRecords.Add(registro);
            context.SaveChanges(); // Erro nessa linha

            // Define relação reversa
            registro.SetHealthAndDisease(new HealthAndDiseaseEntity(
                familyHAS: true,
                familyDM: false,
                familyIAM: false,
                familyAVC: false,
                familyAlzheimer: false,
                familyCA: true,
                ownHAS: true,
                ownDM: false,
                ownIAM: false,
                ownAVC: false,
                ownAlzheimer: false,
                ownCA: false,
                medicalRecordId: registro.Id
            ));

            context.MedicalRecords.Update(registro);
            context.SaveChanges();
        }
    }
}
