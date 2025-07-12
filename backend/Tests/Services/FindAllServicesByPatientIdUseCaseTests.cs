using Application.Usecases.Service;
using Application.Gateways;
using Domain.Entities.Service;
using FluentAssertions;
using NSubstitute;
using Xunit;
using Domain.Utils;

namespace Tests.Services
{
    public class FindAllServicesByPatientIdUseCaseTests
    {
        private readonly IServiceGateway _serviceGateway;
        private readonly FindAllServicesByPatientIdUseCase _useCase;

        public FindAllServicesByPatientIdUseCaseTests()
        {
            _serviceGateway = Substitute.For<IServiceGateway>();
            _useCase = new FindAllServicesByPatientIdUseCase(_serviceGateway);
        }

        [Fact]
        public async Task Execute_ShouldReturnPagedServices_WhenPatientHasServices()
        {
            // Arrange
            var patientId = Guid.NewGuid();
            var pageNumber = 1;
            var pageSize = 10;

            var fakeService = new ServiceEntity { Id = Guid.NewGuid() };
            var pagedResult = new PagedResult<List<ServiceEntity>?>
            {
                Pages = new List<ServiceEntity> { fakeService },
                TotalRecords = 1
            };

            _serviceGateway.FindAllByPatientId(patientId, pageNumber, pageSize)
                .Returns(pagedResult);

            // Act
            var result = await _useCase.Execute(patientId, pageNumber, pageSize);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data!.Pages.Should().ContainSingle()
                .And.Contain(x => x.Id == fakeService.Id);
            result.Data.TotalRecords.Should().Be(1);
        }

        [Fact]
        public async Task Execute_ShouldReturnEmptyPages_WhenPatientHasNoServices()
        {
            // Arrange
            var patientId = Guid.NewGuid();
            var pageNumber = 1;
            var pageSize = 10;

            var emptyResult = new PagedResult<List<ServiceEntity>?>
            {
                Pages = new List<ServiceEntity>(),
                TotalRecords = 0
            };

            _serviceGateway.FindAllByPatientId(patientId, pageNumber, pageSize)
                .Returns(emptyResult);

            // Act
            var result = await _useCase.Execute(patientId, pageNumber, pageSize);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data!.Pages.Should().BeEmpty();
            result.Data.TotalRecords.Should().Be(0);
        }
    }
}
