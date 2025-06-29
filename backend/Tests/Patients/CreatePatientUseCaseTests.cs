using Application.Gateways;
using Application.Usecases.Patient;
using Domain.Dtos.Patient;
using Domain.Entities.Patient;
using Domain.ValuesObjects;
using FluentAssertions;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Patient
{
    public class CreatePatientUseCaseTests
    {
        private readonly IGatewayPatient _gatewayPatient;
        private readonly CreatePatientUseCase _useCase;

        public CreatePatientUseCaseTests()
        {
            _gatewayPatient = Substitute.For<IGatewayPatient>();
            _useCase = new CreatePatientUseCase(_gatewayPatient);
        }

        private static CreatePatientDTO CreateValidPatientDto() => new(
        Name: "João da Silva",
        SocialName: "Joãozinho",
        BirthDate: new DateTime(1990, 1, 1),
        Sus: "123456789123456",
        Cpf: "123.456.789-00",
        Rg: "MG1234567",
        Phone: "31999999999",
        MotherName: "Maria da Silva",
        Address: new AddressDTO(
            Id: null,
            Cep: "12345-678",
            Street: "Rua dos Bobos",
            City: "Belo Horizonte",
            Number: 0,
            Neighborhood: "Centro"
        ),
        EmergencyContactDetails: new List<EmergencyContactDetailsDTO>
        {
            new(
                Id: null,
                Name: "Jeremias",
                Phone: "31988888888",
                Relationship: "FATHER"
            )
        }
    );


        [Fact]
        public async Task Execute_MustReturnBadRequest_WhenPatientExists()
        {
            // Arrange
            var dto = CreateValidPatientDto();
            _gatewayPatient.GetByCpf(dto.Cpf).Returns(new PatientEntity { Cpf = new CPF(dto.Cpf) });

            // Act
            var result = await _useCase.Execute(dto);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(400);
            await _gatewayPatient.DidNotReceive().Save(Arg.Any<PatientEntity>());
        }

        [Fact]
        public async Task Execute_MustSavepatient_WhenThereIsNoPatientWithTheSameCPF()
        {
            // Arrange
            var dto = CreateValidPatientDto();
            _gatewayPatient.GetByCpf(dto.Cpf).Returns((PatientEntity?)null);

            // Act
            var result = await _useCase.Execute(dto);

            // Assert
            result.Success.Should().BeTrue();
            await _gatewayPatient.Received(1).Save(Arg.Is<PatientEntity>(p => p.Cpf.Value == dto.Cpf));
        }
    }

}
