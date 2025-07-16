using Application.Usecases.Appointment;
using Application.Gateways;
using Domain.Entites.Appointment;
using Domain.Enums;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Appointment
{
    public class UpdateAppointmentStatusUseCaseTests
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly UpdateAppointmentStatusUseCase _useCase;

        public UpdateAppointmentStatusUseCaseTests()
        {
            _appointmentRepository = Substitute.For<IAppointmentRepository>();
            _useCase = new UpdateAppointmentStatusUseCase(_appointmentRepository);
        }


        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenAppointmentDoesNotExist()
        {
            // Arrange
            var appointmentId = Guid.NewGuid();
            var newStatus = AppointmentStatusEnum.Canceled;
            var cancellationToken = CancellationToken.None;

            // Simula que o agendamento não foi encontrado
            _appointmentRepository.GetByIdAsync(appointmentId).Returns((AppointmentEntity)null);

            // Act
            var result = await _useCase.Execute(appointmentId, newStatus, cancellationToken);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(404);
            result.Message.Should().Be("Agendamento não encontrado");

            // Garante que a atualização não foi chamada
            await _appointmentRepository.DidNotReceive().UpdateAsync(Arg.Any<AppointmentEntity>());
        }

        [Fact]
        public async Task Execute_ShouldThrowException_WhenUpdateFails()
        {
            // Arrange
            var appointmentId = Guid.NewGuid();
            var newStatus = AppointmentStatusEnum.Confirmed;
            var cancellationToken = CancellationToken.None;
            var mockAppointment = Substitute.For<AppointmentEntity>();

            _appointmentRepository.GetByIdAsync(appointmentId).Returns(mockAppointment);

            // Simula uma falha na camada de persistência durante a atualização
            _appointmentRepository.UpdateAsync(mockAppointment)
                .ThrowsAsync(new InvalidOperationException("Falha na transação do banco"));

            // Act
            // A ação de executar o use case
            Func<Task> act = async () => await _useCase.Execute(appointmentId, newStatus, cancellationToken);

            // Assert
            // Verifica se a exceção foi propagada, pois não há try-catch no use case para a atualização
            await act.Should().ThrowAsync<InvalidOperationException>()
                .WithMessage("Falha na transação do banco");
        }
    }
}