using Application.Usecases.MedicalCertificate;
using Application.Gateways;
using Domain.Dtos.MedicalCertificate;
using Domain.Entites.MedicalCertificate;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Tests.MedicalCertificate
{
    public class GetMedicalCertificateUseCaseTests
    {
        private readonly IMedicalCertificateRepositoryGateway _certificateRepository;
        private readonly GetMedicalCertificateUseCase _useCase;

        public GetMedicalCertificateUseCaseTests()
        {
            // Arrange (Setup)
            _certificateRepository = Substitute.For<IMedicalCertificateRepositoryGateway>();
            _useCase = new GetMedicalCertificateUseCase(_certificateRepository);
        }

        // Método auxiliar para criar filtros de exemplo
        private static MedicalCertificateFilterDTO CreateFilters() => new(
            PatientId: Guid.NewGuid()
        );

        [Fact]
        public async Task Execute_ShouldReturnSuccessWithData_WhenRepositoryReturnsCertificates()
        {
            // Arrange
            var filters = CreateFilters();
            var cancellationToken = CancellationToken.None;
            var expectedCertificates = new List<MedicalCertificateEntity>
            {
                new(),
                new()
            };

            // Simula o retorno do repositório
            _certificateRepository.GetWithFiltersAsync(filters, cancellationToken)
                .Returns(expectedCertificates);

            // Act
            var result = await _useCase.Execute(filters, cancellationToken);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data.Should().HaveCount(2);
            result.Data.Should().BeEquivalentTo(expectedCertificates);

            // Verifica se o método do repositório foi chamado uma vez com os parâmetros corretos
            await _certificateRepository.Received(1).GetWithFiltersAsync(filters, cancellationToken);
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccessWithEmptyList_WhenRepositoryReturnsNoCertificates()
        {
            // Arrange
            var filters = CreateFilters();
            var cancellationToken = CancellationToken.None;
            var emptyList = new List<MedicalCertificateEntity>();

            // Simula o repositório retornando uma lista vazia
            _certificateRepository.GetWithFiltersAsync(filters, cancellationToken)
                .Returns(emptyList);

            // Act
            var result = await _useCase.Execute(filters, cancellationToken);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data.Should().BeEmpty();
        }


        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenRepositoryThrowsException()
        {
            // Arrange
            var filters = CreateFilters();
            var cancellationToken = CancellationToken.None;

            // Simula um erro de infraestrutura no repositório
            _certificateRepository.GetWithFiltersAsync(filters, cancellationToken)
                .ThrowsAsync(new Exception("Falha de conexão com o banco de dados"));

            // Act
            var result = await _useCase.Execute(filters, cancellationToken);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno ao buscar certificados médicos");
            result.Data.Should().BeNull(); // Ou BeEmpty(), dependendo da sua implementação de FailureResult
        }
    }
}