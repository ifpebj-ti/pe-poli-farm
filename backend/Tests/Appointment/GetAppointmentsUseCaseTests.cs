using Application.Usecases.Appointment;
using Application.Gateways;
using FluentAssertions;
using NSubstitute;
using Xunit;
using Domain.Dtos.Appointment;
using Domain.Entites.Appointment;
using NSubstitute.ExceptionExtensions;

namespace Tests.Appointment
{
    public class GetAppointmentsUseCaseTests
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly GetAppointmentsUseCase _useCase;

        public GetAppointmentsUseCaseTests()
        {
            _appointmentRepository = Substitute.For<IAppointmentRepository>();
            _useCase = new GetAppointmentsUseCase(_appointmentRepository);
        }

        private static AppointmentFilterDTO CreateValidFilters() => new()
        {
            PatientId = Guid.NewGuid(),
            ScheduledAt = DateTime.Today.AddDays(-5),
            ProfessionalId = Guid.NewGuid(),
            Status = Domain.Enums.AppointmentStatusEnum.Confirmed,
        };

        [Fact]
        public async Task Execute_ShouldReturnAppointments_WhenRepositorySucceeds()
        {
            // Arrange
            var filters = CreateValidFilters();
            var appointments = new List<AppointmentEntity>
            {
                new AppointmentEntity
                (new Guid(), filters.PatientId.Value, filters.ProfessionalId, "Consulta de rotina", filters.ScheduledAt.Value, filters.Status.Value),
            };

            _appointmentRepository
                .GetWithFiltersAsync(filters, Arg.Any<CancellationToken>())
                .Returns(appointments);

            // Act
            var result = await _useCase.Execute(filters);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull().And.HaveCount(2);
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenRepositoryThrowsException()
        {
            // Arrange
            var filters = CreateValidFilters();

            _appointmentRepository
                .GetWithFiltersAsync(filters, Arg.Any<CancellationToken>())
                .Throws(new Exception("Falha inesperada"));

            // Act
            var result = await _useCase.Execute(filters);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno");
        }
    }
}
