using Application.Usecases.Patient;
using Application.Gateways;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Domain.Entities.Patient;

namespace Tests.Patients
{
    public class ReturnsAllPatientsUseCaseTests
    {
        private readonly IGatewayPatient _gatewayPatient;
        private readonly ReturnsAllPatientsUseCase _useCase;

        public ReturnsAllPatientsUseCaseTests()
        {
            // Arrange (Setup)
            _gatewayPatient = Substitute.For<IGatewayPatient>();
            _useCase = new ReturnsAllPatientsUseCase(_gatewayPatient);
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccessWithPatientList_WhenGatewayReturnsPatients()
        {
            // Arrange
            var patientList = new List<PatientEntity>
            {
                new(), // Simula um paciente
                new()  // Simula outro paciente
            };
            _gatewayPatient.GetAllAsync().Returns(patientList);

            // Act
            var result = await _useCase.Execute();

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data.Should().HaveCount(2);
            await _gatewayPatient.Received(1).GetAllAsync();
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccessWithEmptyList_WhenGatewayReturnsNoPatients()
        {
            // Arrange
            var emptyList = new List<PatientEntity>();
            _gatewayPatient.GetAllAsync().Returns(emptyList);

            // Act
            var result = await _useCase.Execute();

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data.Should().BeEmpty();
        }

        [Fact]
        public async Task Execute_ShouldReturnInternalError_WhenGatewayThrowsException()
        {
            // Arrange
            _gatewayPatient.GetAllAsync().ThrowsAsync(new Exception("Database connection error"));

            // Act
            var result = await _useCase.Execute();

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno");
        }
    }
}