using Application.Usecases.Prescription;
using Application.Gateways;
using Domain.Dtos.Prescription;
using Domain.Entites.User; // Supondo que a entidade do usuário esteja aqui
using Domain.Exceptions;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using prontuario.Domain.Entities.PatientMedication;

namespace Tests.Prescription
{
    public class AddPrescriptionUseCaseTests
    {
        private readonly IPrescriptionRepository _prescriptionRepository;
        private readonly IUserRepositoryGateway _userRepository;
        private readonly AddPrescriptionUseCase _useCase;

        public AddPrescriptionUseCaseTests()
        {
            _prescriptionRepository = Substitute.For<IPrescriptionRepository>();
            _userRepository = Substitute.For<IUserRepositoryGateway>();
            _useCase = new AddPrescriptionUseCase(_prescriptionRepository, _userRepository);
        }

        // Método auxiliar para criar um DTO válido
        private static CreatePrescriptionDTO CreateValidDto() => new(
            PrescriptionDate: DateTime.Now,
            ExecutionDate: null,
            Posology: "Tomar 1 comprimido a cada 8 horas por 7 dias.",
            MedicalRecordId: Guid.NewGuid(),
            ProfessionalId: Guid.NewGuid(),
            MedicationName: "Amoxicilina 500mg",
            Type: "Antibiótico"
        );

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenDataIsValid()
        {
            // Arrange
            var dto = CreateValidDto();
            var cancellationToken = CancellationToken.None;

            // Simula que o profissional foi encontrado
            _userRepository.FindUserById(dto.ProfessionalId).Returns(new UserEntity());

            // Act
            var result = await _useCase.Execute(dto, cancellationToken);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().Be("Prescrição adicionada com sucesso");

            // Verifica se o usuário foi buscado e a prescrição foi criada
            await _userRepository.Received(1).FindUserById(dto.ProfessionalId);
            await _prescriptionRepository.Received(1).Create(Arg.Any<PatientPrescriptionEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenDtoIsNull()
        {
            // Arrange
            CreatePrescriptionDTO dto = null;
            var cancellationToken = CancellationToken.None;

            // Act
            var result = await _useCase.Execute(dto, cancellationToken);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(400);
            result.Message.Should().Be("Dados inválidos");

            // Garante que nenhum repositório foi chamado
            await _userRepository.DidNotReceive().FindUserById(Arg.Any<Guid>());
            await _prescriptionRepository.DidNotReceive().Create(Arg.Any<PatientPrescriptionEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenProfessionalIsNotFound()
        {
            // Arrange
            var dto = CreateValidDto();
            var cancellationToken = CancellationToken.None;

            // Simula que o profissional NÃO foi encontrado
            _userRepository.FindUserById(dto.ProfessionalId).Returns((UserEntity)null);

            // Act
            var result = await _useCase.Execute(dto, cancellationToken);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(404);
            result.Message.Should().Be("Profissinal não encontrado");

            // Garante que o repositório de prescrição não foi chamado
            await _prescriptionRepository.DidNotReceive().Create(Arg.Any<PatientPrescriptionEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenRepositoryThrowsException()
        {
            // Arrange
            var dto = CreateValidDto();
            var cancellationToken = CancellationToken.None;

            // O profissional é encontrado
            _userRepository.FindUserById(dto.ProfessionalId).Returns(new UserEntity());

            // Simula um erro no repositório ao tentar salvar
            _prescriptionRepository.Create(Arg.Any<PatientPrescriptionEntity>())
                .ThrowsAsync(new Exception("Falha de conexão com o banco de dados"));

            // Act
            var result = await _useCase.Execute(dto, cancellationToken);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(500);
            result.Message.Should().Be("Erro ao salvar a prescrição");
        }
    }
}