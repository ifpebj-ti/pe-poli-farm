using Application.Gateways;
using Domain.Dtos.MedicalConsultation;
using Domain.Exceptions;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Domain.Dtos.Anamnese;
using Domain.Dtos.HealthAndDisease;
using Domain.Dtos.PatientExams;
using Domain.Dtos.Prescription;
using Domain.Entities.Anamnese;
using Domain.Entities.HealthAndDisease;
using Domain.Entities.MedicalRecord;
using Domain.Entities.Patient;
using Domain.Entities.PatientExams;
using Domain.Entities.Service;
using prontuario.Domain.Entities.PatientMedication;
using prontuario.Domain.ValuesObjects;

namespace Tests.MedicalConsultation
{
    public class CreateMedicalConsultationUseCaseTests
    {
        // Mocks para todas as dependências
        private readonly IGatewayPatient _patientRepository;
        private readonly IServiceGateway _serviceRepository;
        private readonly IGenericRepositoryGateway<MedicalRecordEntity> _medicalRecordRepository;
        private readonly IGenericRepositoryGateway<AnamneseEntity> _anamneseRepository;
        private readonly IGenericRepositoryGateway<HealthAndDiseaseEntity> _healthAndDiseaseRepository;
        private readonly IPrescriptionRepository _prescriptionRepository;
        private readonly IGenericRepositoryGateway<PatientExamsEntity> _patientExamsRepository;

        // A classe que estamos testando (System Under Test)
        private readonly CreateMedicalConsultationUseCase _useCase;

        public CreateMedicalConsultationUseCaseTests()
        {
            // Inicializa todos os mocks e o UseCase no construtor
            _patientRepository = Substitute.For<IGatewayPatient>();
            _serviceRepository = Substitute.For<IServiceGateway>();
            _medicalRecordRepository = Substitute.For<IGenericRepositoryGateway<MedicalRecordEntity>>();
            _anamneseRepository = Substitute.For<IGenericRepositoryGateway<AnamneseEntity>>();
            _healthAndDiseaseRepository = Substitute.For<IGenericRepositoryGateway<HealthAndDiseaseEntity>>();
            _prescriptionRepository = Substitute.For<IPrescriptionRepository>();
            _patientExamsRepository = Substitute.For<IGenericRepositoryGateway<PatientExamsEntity>>();

            _useCase = new CreateMedicalConsultationUseCase(
                _patientRepository,
                _serviceRepository,
                _medicalRecordRepository,
                _anamneseRepository,
                _healthAndDiseaseRepository,
                _prescriptionRepository,
                _patientExamsRepository
            );
        }

        // Método auxiliar para criar um DTO válido rapidamente
        private static CreateMedicalConsultationDTO CreateValidDto(bool withOptionals = true)
        {
            // 1. Cria a Anamnese
            var anamneseDto = new CreateAnamneseDTO(
                BloodPressure: "120/80 mmHg",
                Glucose: "98 mg/dL",
                Temperature: "36.8 °C",
                RespiratoryRate: "18 rpm",
                BloodType: "O+",
                Weight: "80 kg",
                HeartRate: "75 bpm",
                Saturation: "98%",
                Height: "1.80 m",
                AntecPathological: false,
                NecesPsicobio: false,
                Diabetes: false,
                MedicationsInUse: true,
                UseOfProthesis: false,
                Allergies: true,
                AllergiesType: "Poeira",
                AntecPathologicalType: "N/A",
                MedicationInUseType: "Ibuprofeno para dor de cabeça ocasional",
                MedicalHypothesis: "Cefaleia tensional",
                PreviousSurgeries: "Nenhuma",
                SignsAndSymptoms: "Dor de cabeça na região das têmporas, iniciada há 2 horas.",
                ClassificationStatus: new ClassificationStatus("LESS_SERIOUS")
            );

            // 2. Cria o Histórico de Saúde
            var healthHistoryDto = new CreateHealthAndDiseaseDTO(
                FamilyHAS: true, FamilyDM: true, FamilyIAM: false, FamilyAVC: false, FamilyAlzheimer: false, FamilyCA: false,
                OwnHAS: false, OwnDM: false, OwnIAM: false, OwnAVC: false, OwnAlzheimer: false, OwnCA: false
            );

            // 3. Cria a lista de Prescrições (se solicitado)
            List<CreatePrescriptionDTO>? prescriptions = null;
            if (withOptionals)
            {
                prescriptions = new List<CreatePrescriptionDTO>
        {
            new CreatePrescriptionDTO(
                PrescriptionDate: DateTime.Now,
                ExecutionDate: null,
                Posology: "Tomar 1 comprimido se a dor persistir. Máximo de 3 por dia.",
                MedicalRecordId: Guid.Empty, // O UseCase irá preencher
                ProfessionalId: Guid.Empty, // O UseCase irá preencher
                MedicationName: "Dipirona 1g",
                Type: "Analgésico"
            )
        };
            }

            // 4. Cria a lista de Exames (se solicitado)
            List<CreatePatientExamDTO>? exams = null;
            if (withOptionals)
            {
                exams = new List<CreatePatientExamDTO>
        {
            new CreatePatientExamDTO(
                Name: "Hemograma Completo",
                Description: "Verificar contagem de células sanguíneas.",
                PrescriptionDate: DateTime.Now,
                Priority: "NORMAL"
            )
        };
            }

            // 5. Monta o DTO final e retorna
            return new CreateMedicalConsultationDTO(
                PatientId: Guid.NewGuid(),
                ProfessionalId: Guid.NewGuid(),
                Anamnese: anamneseDto,
                HealthHistory: healthHistoryDto,
                Prescriptions: prescriptions,
                PatientExams: exams
            );
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenDataIsValidAndComplete()
        {
            // Arrange
            var dto = CreateValidDto();
            _patientRepository.GetByIdAsync(dto.PatientId).Returns(new PatientEntity());

            // Act
            var result = await _useCase.Execute(dto, CancellationToken.None);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().Be("Consulta registrada com sucesso.");

            // Verifica se todos os repositórios foram chamados
            await _patientRepository.Received(1).GetByIdAsync(dto.PatientId);
            await _serviceRepository.Received(1).Init(Arg.Any<ServiceEntity>());
            await _anamneseRepository.Received(1).AddAsync(Arg.Any<AnamneseEntity>());
            await _healthAndDiseaseRepository.Received(1).AddAsync(Arg.Any<HealthAndDiseaseEntity>());
            await _prescriptionRepository.Received(1).Create(Arg.Any<PatientPrescriptionEntity>());
            await _patientExamsRepository.Received(1).AddAsync(Arg.Any<PatientExamsEntity>());
            await _medicalRecordRepository.Received(1).UpdateAsync(Arg.Any<MedicalRecordEntity>());
            await _patientRepository.Received(1).UpdateAsync(Arg.Any<PatientEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenOptionalFieldsAreNull()
        {
            // Arrange
            var dto = CreateValidDto(withOptionals: false); // Cria DTO sem prescrições e exames
            _patientRepository.GetByIdAsync(dto.PatientId).Returns(new PatientEntity());

            // Act
            var result = await _useCase.Execute(dto, CancellationToken.None);

            // Assert
            result.Success.Should().BeTrue();

            // Garante que os repositórios opcionais NÃO foram chamados
            await _prescriptionRepository.DidNotReceive().Create(Arg.Any<PatientPrescriptionEntity>());
            await _patientExamsRepository.DidNotReceive().AddAsync(Arg.Any<PatientExamsEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnNotFound_WhenPatientDoesNotExist()
        {
            // Arrange
            var dto = CreateValidDto();
            _patientRepository.GetByIdAsync(dto.PatientId).Returns((PatientEntity)null);

            // Act
            var result = await _useCase.Execute(dto, CancellationToken.None);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(404);
            result.Message.Should().Be("Paciente não encontrado.");
        }

        [Fact]
        public async Task Execute_ShouldReturnBadRequest_WhenDomainExceptionIsThrown()
        {
            // Arrange
            var dto = CreateValidDto();
            _patientRepository.GetByIdAsync(dto.PatientId).Returns(new PatientEntity());

            // Simula um erro de domínio (ex: dados inválidos que a Factory rejeita)
            _serviceRepository.Init(Arg.Any<ServiceEntity>())
                .ThrowsAsync(new DomainException("Erro de validação de domínio simulado."));

            // Act
            var result = await _useCase.Execute(dto, CancellationToken.None);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(400);
            result.Message.Should().Be("Erro de validação de domínio simulado.");
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenInfrastructureExceptionIsThrown()
        {
            // Arrange
            var dto = CreateValidDto();
            _patientRepository.GetByIdAsync(dto.PatientId).Returns(new PatientEntity());

            // Simula um erro de infraestrutura (ex: falha de conexão com o banco)
            _serviceRepository.Init(Arg.Any<ServiceEntity>())
                .ThrowsAsync(new Exception("Falha de conexão com o banco."));

            // Act
            var result = await _useCase.Execute(dto, CancellationToken.None);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno ao registrar a consulta.");
        }
    }
}