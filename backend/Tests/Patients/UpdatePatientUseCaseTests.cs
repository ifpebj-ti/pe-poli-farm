using Application.Gateways;
using Application.Usecases.Patient;
using Domain.Dtos.Patient;
using Domain.Entities.Patient;
using Domain.ValuesObjects;
using FluentAssertions;
using NSubstitute;
using prontuario.Domain.ValuesObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Patient
{
    public class UpdatePatientUseCaseTests
    {
        private readonly IGatewayPatient _gatewayPatient;
        private readonly UpdatePatientUseCase _useCase;

        public UpdatePatientUseCaseTests()
        {
            _gatewayPatient = Substitute.For<IGatewayPatient>();
            _useCase = new UpdatePatientUseCase(_gatewayPatient);
        }

        private static UpdatePatientDTO CreateValidUpdatePatientDto(Guid patientId) => new(
            Id: patientId,
            Name: "Updated Name",
            SocialName: "Updated Social Name",
            BirthDate: new DateTime(1990, 1, 1),
            Sus: "123123123123123",
            Cpf: "123.456.789-00",
            Rg: "RG123456",
            Phone: "31988887777",
            MotherName: "Updated Mother",
            Status: "NO_SERVICE",
            Address: new AddressDTO(
                Id: patientId,
                Cep: "12345-678",
                Street: "Updated Street",
                City: "Updated City",
                Number: 200,
                Neighborhood: "Updated Neighborhood"
            ),
            EmergencyContactDetails: new List<EmergencyContactDetailsDTO>()
        );

        [Fact]
        public async Task Execute_ShouldUpdatePatient_WhenPatientExists()
        {
            // Arrange
            var patientId = Guid.NewGuid();
            var dto = CreateValidUpdatePatientDto(patientId);

            var existingPatient = new PatientEntity
            {
                Id = patientId,
                Name = "Old Name",
                Cpf = new CPF(dto.Cpf),
                Sus = new SUS("123123123123123"),
                Rg = new RG("RG123456")
            };

            _gatewayPatient.GetById(patientId).Returns(existingPatient);

            // Act
            var result = await _useCase.Execute(dto);

            // Assert
            result.Success.Should().BeTrue();

            await _gatewayPatient.Received(1)
            .Update(Arg.Is<PatientEntity>(p =>
                p.Id == patientId &&
                p.Name == dto.Name));
        }
    }

}
