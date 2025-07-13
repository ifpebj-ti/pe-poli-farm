using Application.Usecases.Service;
using Application.Gateways;
using Domain.Entities.Patient;
using Domain.Entities.Service;
using Domain.ValuesObjects;
using FluentAssertions;
using NSubstitute;
using Xunit;
using prontuario.Application.Usecases.Service;
using prontuario.Domain.ValuesObjects;

namespace Tests.Services
{
    public class InitializeServiceUseCaseTests
    {
        private readonly IGatewayPatient _gatewayPatient;
        private readonly IServiceGateway _serviceGateway;
        private readonly InitializeServiceUseCase _useCase;

        public InitializeServiceUseCaseTests()
        {
            _gatewayPatient = Substitute.For<IGatewayPatient>();
            _serviceGateway = Substitute.For<IServiceGateway>();
            _useCase = new InitializeServiceUseCase(_gatewayPatient, _serviceGateway);
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenPatientDoesNotExist()
        {
            // Arrange
            var patientId = Guid.NewGuid();
            _gatewayPatient.GetById(patientId).Returns((PatientEntity?)null);

            // Act
            var result = await _useCase.Execute(patientId);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(404);
            result.Message.Should().Be("Erro ao iniciar atendimento");
            await _serviceGateway.DidNotReceive().Init(Arg.Any<ServiceEntity>());
        }

        [Fact]
        public async Task Execute_ShouldInitializeService_WhenPatientExists()
        {
            // Arrange
            var patientId = Guid.NewGuid();
            var patient = new PatientEntity
            {
                Id = patientId,
                Name = "João Silva",
                Cpf = new CPF("123.456.789-00"),
                Sus = new SUS("123456789123456"),
                Rg = new RG("MG123456")
            };

            _gatewayPatient.GetById(patientId).Returns(patient);

            // Act
            var result = await _useCase.Execute(patientId);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().BeNull(); // Sucesso sem retorno de dados, conforme implementação

            await _serviceGateway.Received(1).Init(Arg.Is<ServiceEntity>(s =>
                s.PatientEntity == patient &&
                s.MedicalRecordEntity != null
            ));
        }
    }
}
