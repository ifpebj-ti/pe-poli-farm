using Application.Usecases.Conduct;
using Application.Gateways;
using Domain.Dtos.Conduct;
using Domain.Entites.Conduct;
using Domain.Entites.User;
using Domain.Exceptions;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Domain.Entities.MedicalRecord;
using Domain.Entities.Patient;

namespace Tests.Conduct
{
    public class RegisterConductUseCaseTests
    {
        private readonly IGenericRepositoryGateway<ConductEntity> _conductRepository;
        private readonly IGatewayPatient _patientRepository;
        private readonly IUserRepositoryGateway _userRepository;
        private readonly IGenericRepositoryGateway<MedicalRecordEntity> _medicalRecordRepository;
        private readonly RegisterConductUseCase _useCase;

        public RegisterConductUseCaseTests()
        {
            _conductRepository = Substitute.For<IGenericRepositoryGateway<ConductEntity>>();
            _patientRepository = Substitute.For<IGatewayPatient>();
            _userRepository = Substitute.For<IUserRepositoryGateway>();
            _medicalRecordRepository = Substitute.For<IGenericRepositoryGateway<MedicalRecordEntity>>();

            _useCase = new RegisterConductUseCase(
                _conductRepository,
                _patientRepository,
                _userRepository,
                _medicalRecordRepository
            );
        }

        private static CreateConductDTO CreateValidDto() => new(
            PatientId: Guid.NewGuid(),
            ProfessionalId: Guid.NewGuid(),
            MedicalRecordId: Guid.NewGuid(),
            ProcedureType: "Sutura Simples",
            MedicationsInUse: "Anestesia Local (Lidocaína 2%)",
            ConductDescription: "Realizada sutura com 3 pontos em ferimento no antebraço direito."
        );

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenAllDataIsValid()
        {
            // Arrange
            var dto = CreateValidDto();
            _patientRepository.GetByIdAsync(dto.PatientId).Returns(new PatientEntity());
            _userRepository.GetByIdAsync(dto.ProfessionalId).Returns(new UserEntity());
            _medicalRecordRepository.GetByIdAsync(dto.MedicalRecordId).Returns(new MedicalRecordEntity());

            // Act
            var result = await _useCase.Execute(dto, CancellationToken.None);

            // Assert
            result.Success.Should().BeTrue();
            await _conductRepository.Received(1).AddAsync(Arg.Any<ConductEntity>());
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
            await _conductRepository.DidNotReceive().AddAsync(Arg.Any<ConductEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnNotFound_WhenProfessionalDoesNotExist()
        {
            // Arrange
            var dto = CreateValidDto();
            _patientRepository.GetByIdAsync(dto.PatientId).Returns(new PatientEntity());
            _userRepository.GetByIdAsync(dto.ProfessionalId).Returns((UserEntity)null);

            // Act
            var result = await _useCase.Execute(dto, CancellationToken.None);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(404);
            result.Message.Should().Be("Profissional não encontrado.");
            await _conductRepository.DidNotReceive().AddAsync(Arg.Any<ConductEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnNotFound_WhenMedicalRecordDoesNotExist()
        {
            // Arrange
            var dto = CreateValidDto();
            _patientRepository.GetByIdAsync(dto.PatientId).Returns(new PatientEntity());
            _userRepository.GetByIdAsync(dto.ProfessionalId).Returns(new UserEntity());
            _medicalRecordRepository.GetByIdAsync(dto.MedicalRecordId).Returns((MedicalRecordEntity)null);

            // Act
            var result = await _useCase.Execute(dto, CancellationToken.None);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(404);
            result.Message.Should().Be("Prontuário médico não encontrado.");
            await _conductRepository.DidNotReceive().AddAsync(Arg.Any<ConductEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenRepositoryThrowsException()
        {
            // Arrange
            var dto = CreateValidDto();
            _patientRepository.GetByIdAsync(dto.PatientId).Returns(new PatientEntity());
            _userRepository.GetByIdAsync(dto.ProfessionalId).Returns(new UserEntity());
            _medicalRecordRepository.GetByIdAsync(dto.MedicalRecordId).Returns(new MedicalRecordEntity());

            _conductRepository.AddAsync(Arg.Any<ConductEntity>())
                .ThrowsAsync(new Exception("Erro de conexão"));

            // Act
            var result = await _useCase.Execute(dto, CancellationToken.None);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(500);
            result.Message.Should().Be("Erro ao registrar procsdimento.");
        }
    }
}