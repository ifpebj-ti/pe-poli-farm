using Application.Usecases.Appointment;
using Application.Gateways;
using Domain.Dtos.Appointment;
using Domain.Entites.Appointment;
using Domain.Enums;
using Domain.Exceptions;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Appointment
{
    public class CreateAppointmentUseCaseTests
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly CreateAppointmentUseCase _useCase;

        public CreateAppointmentUseCaseTests()
        {
            _appointmentRepository = Substitute.For<IAppointmentRepository>();
            _useCase = new CreateAppointmentUseCase(_appointmentRepository);
        }

        // Método auxiliar para criar um DTO válido
        private static CreateAppointmentDTO CreateValidDto() => new(
            PatientId: Guid.NewGuid(),
            ProfessionalId: Guid.NewGuid(),
            Specialty: "Clínica Geral",
            ScheduledAt: DateTime.Now.AddDays(5),
            Status: AppointmentStatusEnum.Confirmed
        );

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenDtoIsValidAndNoConflictExists()
        {
            // Arrange
            var dto = CreateValidDto();
            var cancellationToken = CancellationToken.None;

            // Simula que não há conflito de horário
            _appointmentRepository.ExistsAsync(Arg.Any<Expression<Func<AppointmentEntity, bool>>>(), cancellationToken)
                .Returns(false);

            // Act
            var result = await _useCase.Execute(dto, cancellationToken);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().Be("Agendamento criado com sucesso.");

            // Verifica as chamadas ao repositório
            await _appointmentRepository.Received(1).ExistsAsync(Arg.Any<Expression<Func<AppointmentEntity, bool>>>(), cancellationToken);
            await _appointmentRepository.Received(1).AddAsync(Arg.Any<AppointmentEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnBadRequest_WhenConflictExists()
        {
            // Arrange
            var dto = CreateValidDto();
            var cancellationToken = CancellationToken.None;

            // Simula que JÁ EXISTE um agendamento no mesmo horário
            _appointmentRepository.ExistsAsync(Arg.Any<Expression<Func<AppointmentEntity, bool>>>(), cancellationToken)
                .Returns(true);

            // Act
            var result = await _useCase.Execute(dto, cancellationToken);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(400);
            result.Message.Should().Be("Já existe um agendamento para esse profissional neste horário.");

            // Garante que o agendamento não foi adicionado
            await _appointmentRepository.DidNotReceive().AddAsync(Arg.Any<AppointmentEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenRepositoryThrowsException()
        {
            // Arrange
            var dto = CreateValidDto();
            var cancellationToken = CancellationToken.None;

            // A verificação de conflito passa
            _appointmentRepository.ExistsAsync(Arg.Any<Expression<Func<AppointmentEntity, bool>>>(), cancellationToken)
                .Returns(false);

            // Simula um erro na hora de salvar
            _appointmentRepository.AddAsync(Arg.Any<AppointmentEntity>())
                .ThrowsAsync(new Exception("Erro de conexão"));

            // Act
            var result = await _useCase.Execute(dto, cancellationToken);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno");
        }
    }
}