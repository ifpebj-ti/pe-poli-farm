using Application.Gateways;
using Application.Usecases.Patient;
using Domain.Entities.Patient;
using Domain.ValuesObjects;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Patient
{
    public class FindPatientByCpfUseCaseTests
    {
        private readonly IGatewayPatient _gatewayPatient;
        private readonly FindPatientByCpfUseCase _useCase;

        public FindPatientByCpfUseCaseTests()
        {
            _gatewayPatient = Substitute.For<IGatewayPatient>();
            _useCase = new FindPatientByCpfUseCase(_gatewayPatient);
        }

        // Método auxiliar para criar uma entidade de paciente para os testes
        private static PatientEntity CreateFakePatient(CPF cpf) => new()
        {
            Id = new Guid("b1959410-e6e2-494a-8aab-73167b95ea95"),
            Name = "João da Silva",
            Cpf = cpf,
            // Preencha outras propriedades se necessário para o seu teste
        };

        [Fact]
        public async Task Execute_ShouldReturnPatient_WhenCpfIsValidAndPatientExists()
        {
            // Arrange
            var validCpfString = "123.456.789-00";
            var cpf = new CPF(validCpfString);
            var expectedPatient = CreateFakePatient(cpf);

            _gatewayPatient.GetByCpf(cpf.Value).Returns(expectedPatient);

            // Act
            var result = await _useCase.Execute(validCpfString);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data.Should().BeEquivalentTo(expectedPatient);
            await _gatewayPatient.Received(1).GetByCpf(cpf.Value);
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccessWithNullData_WhenPatientDoesNotExist()
        {
            // Arrange
            var validCpfString = "111.222.333-44";
            var cpf = new CPF(validCpfString);

            _gatewayPatient.GetByCpf(cpf.Value).Returns((PatientEntity?)null);

            // Act
            var result = await _useCase.Execute(validCpfString);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().BeNull();
            await _gatewayPatient.Received(1).GetByCpf(cpf.Value);
        }

        [Fact]
        public async Task Execute_ShouldReturnBadRequest_WhenCpfIsInvalid()
        {
            // Arrange
            var invalidCpfString = "12345";

            // Act
            var result = await _useCase.Execute(invalidCpfString);

            // Assert
            result.Success.Should().BeFalse();
            result.Data.Should().BeNull();
            result.ErrorDetails.Should().NotBeNull();
            result.ErrorDetails!.Status.Should().Be(400);
            result.ErrorDetails.Detail.Should().Be("CPF inválido. Deve estar no formato 000.000.000-00.");
            await _gatewayPatient.DidNotReceive().GetByCpf(Arg.Any<string>());
        }

        [Fact]
        public async Task Execute_ShouldReturnInternalError_WhenGatewayThrowsException()
        {
            // Arrange
            var validCpfString = "123.456.789-00";
            var cpf = new CPF(validCpfString);

            _gatewayPatient.GetByCpf(cpf.Value).ThrowsAsync(new System.Exception("Erro de banco de dados"));

            // Act
            var result = await _useCase.Execute(validCpfString);

            // Assert
            result.Success.Should().BeFalse();
            result.Data.Should().BeNull();
            result.ErrorDetails.Should().NotBeNull();
            result.ErrorDetails!.Status.Should().Be(500);
            result.ErrorDetails.Detail.Should().Be("Erro interno");
        }
    }
}