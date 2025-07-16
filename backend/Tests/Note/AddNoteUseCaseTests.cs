using Application.Gateways;
using Domain.Exceptions;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Threading.Tasks;
using Xunit;
using Application.Usecases.Note;
using Domain.Dtos.Note;
using Domain.Entities.Notes;

namespace Tests.Notes
{
    public class AddNoteUseCaseTests
    {
        private readonly INotesRepositoryGateway _noteRepository;
        private readonly AddNoteUseCase _useCase;

        public AddNoteUseCaseTests()
        {
            _noteRepository = Substitute.For<INotesRepositoryGateway>();
            _useCase = new AddNoteUseCase(_noteRepository);
        }

        // Método auxiliar para criar um DTO válido
        private static CreateNotesDTO CreateValidDto() => new(
            Title: "Evolução do paciente",
            CreatedAt: DateTime.Now,
            ProfessionalId: Guid.NewGuid(),
            PatientId: Guid.NewGuid()
        );

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenDtoIsValid()
        {
            // Arrange
            var dto = CreateValidDto();

            // Act
            var result = await _useCase.Execute(dto);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().Be("Note adicionada com sucesso.");

            // Verifica se o repositório foi chamado para adicionar a nota
            await _noteRepository.Received(1).AddAsync(Arg.Any<NotesEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenRepositoryThrowsException()
        {
            // Arrange
            var dto = CreateValidDto();

            // Simula um erro de infraestrutura no repositório
            _noteRepository.AddAsync(Arg.Any<NotesEntity>())
                           .ThrowsAsync(new Exception("Erro de conexão com o banco"));

            // Act
            var result = await _useCase.Execute(dto);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno");
        }
    }
}