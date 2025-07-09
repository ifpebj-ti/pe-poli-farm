using Application.Usecases.Referral;
using Application.Gateways;
using Domain.Exceptions;
using FluentAssertions;
using NSubstitute;
using Xunit;
using Domain.Dtos.Referral;
using Domain.Entites.Referral;
using NSubstitute.ExceptionExtensions;

namespace Tests.Referral
{
    public class GetReferralUseCaseTests
    {
        private readonly IReferralRepositoryGateway _referralRepository;
        private readonly GetReferralUseCase _useCase;

        public GetReferralUseCaseTests()
        {
            _referralRepository = Substitute.For<IReferralRepositoryGateway>();
            _useCase = new GetReferralUseCase(_referralRepository);
        }

        private static ReferralFilterDTO CreateValidFilters() => new()
        {
            ExpectedDuration = "30 dias",
            MedicalRecordId = Guid.NewGuid(),
            ProfessionalId = Guid.NewGuid(),
            Reason = "Consulta de rotina"
        };

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenRepositoryReturnsReferrals()
        {
            // Arrange
            var filters = CreateValidFilters();
            var referrals = new List<ReferralEntity>
            {
                new() { Id = Guid.NewGuid() },
                new() { Id = Guid.NewGuid() }
            };

            _referralRepository.GetWithFiltersAsync(filters, Arg.Any<CancellationToken>())
                .Returns(referrals);

            // Act
            var result = await _useCase.Execute(filters);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().HaveCount(2);
        }

        [Fact]
        public async Task Execute_ShouldReturnBadRequest_WhenDomainExceptionIsThrown()
        {
            // Arrange
            var filters = CreateValidFilters();

            _referralRepository
                .GetWithFiltersAsync(filters, Arg.Any<CancellationToken>())
                .Throws(new DomainException("Filtro inválido"));

            // Act
            var result = await _useCase.Execute(filters);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(400);
            result.Message.Should().Be("Filtro inválido");
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenGenericExceptionIsThrown()
        {
            // Arrange
            var filters = CreateValidFilters();

            _referralRepository
                .GetWithFiltersAsync(filters, Arg.Any<CancellationToken>())
                .Throws(new Exception("Erro desconhecido"));

            // Act
            var result = await _useCase.Execute(filters);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno");
        }
    }
}
