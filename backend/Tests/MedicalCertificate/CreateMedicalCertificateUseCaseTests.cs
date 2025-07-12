using Application.Usecases.MedicalCertificate;
using Application.Gateways;
using Domain.Entites.MedicalCertificate; // CORRIGIDO
using Domain.Dtos;
using Domain.Exceptions;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Threading.Tasks;
using Xunit;
using Domain.Dtos.MedicalCertificate;

namespace Tests.MedicalCertificate
{
    public class CreateMedicalCertificateUseCaseTests
    {
        private readonly IGenericRepositoryGateway<MedicalCertificateEntity> _repository;
        private readonly CreateMedicalCertificateUseCase _useCase;

        public CreateMedicalCertificateUseCaseTests()
        {
            _repository = Substitute.For<IGenericRepositoryGateway<MedicalCertificateEntity>>();
            _useCase = new CreateMedicalCertificateUseCase(_repository);
        }

        private static CreateCertificateDTO CreateValidDto() => new(
            MedicalRecordId: Guid.NewGuid(),
            PatientId: Guid.NewGuid(),
            ProfessionalId: Guid.NewGuid(),
            IssueDate: DateTime.Now,
            Description: "Atesto para os devidos fins que o paciente necessita de 2 dias de repouso."
        );

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenDtoIsValid()
        {
            var dto = CreateValidDto();

            var result = await _useCase.Execute(dto);

            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull().And.BeOfType<MedicalCertificateEntity>();

            await _repository.Received(1).AddAsync(Arg.Any<MedicalCertificateEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnBadRequest_WhenDomainExceptionIsThrown()
        {
            var invalidDto = CreateValidDto() with { MedicalRecordId = Guid.Empty };

            var result = await _useCase.Execute(invalidDto);

            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(400);

            await _repository.DidNotReceive().AddAsync(Arg.Any<MedicalCertificateEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenRepositoryThrowsException()
        {
            var dto = CreateValidDto();

            _repository.AddAsync(Arg.Any<MedicalCertificateEntity>())
                       .Throws(new Exception("Erro de infraestrutura"));

            var result = await _useCase.Execute(dto);

            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno ao emitir certificado");
        }
    }
}