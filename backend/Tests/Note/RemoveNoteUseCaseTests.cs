using Application.Gateways;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Threading.Tasks;
using Xunit;
using Application.Usecases.Note;
using Domain.Entities.Notes;

namespace Tests.Notes
{
    public class RemoveNoteUseCaseTests
    {
        private readonly INotesRepositoryGateway _noteRepository;
        private readonly RemoveNoteUseCase _useCase;

        public RemoveNoteUseCaseTests()
        {
            _noteRepository = Substitute.For<INotesRepositoryGateway>();
            _useCase = new RemoveNoteUseCase(_noteRepository);
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenNoteExists()
        {
            // Arrange
            var noteId = Guid.NewGuid();
            var noteEntity = new NotesEntity { Id = noteId };

            // Configura o mock para encontrar a nota
            _noteRepository.GetByIdAsync(noteId).Returns(noteEntity);

            // Act
            var result = await _useCase.Execute(noteId);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().Be("Nota removida com sucesso.");

            // Verifica as chamadas ao repositório
            await _noteRepository.Received(1).GetByIdAsync(noteId);
            await _noteRepository.Received(1).DeleteAsync(noteId);
        }

        [Fact]
        public async Task Execute_ShouldReturnNotFound_WhenNoteDoesNotExist()
        {
            // Arrange
            var noteId = Guid.NewGuid();

            // Configura o mock para NÃO encontrar a nota
            _noteRepository.GetByIdAsync(noteId).Returns((NotesEntity)null);

            // Act
            var result = await _useCase.Execute(noteId);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(404);
            result.Message.Should().Be("Nota não encontrada.");

            // Garante que o método de exclusão não foi chamado
            await _noteRepository.DidNotReceive().DeleteAsync(Arg.Any<Guid>());
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenRepositoryThrowsException()
        {
            // Arrange
            var noteId = Guid.NewGuid();

            // Configura o mock para lançar uma exceção ao buscar a nota
            _noteRepository.GetByIdAsync(noteId)
                           .ThrowsAsync(new Exception("Erro de conexão"));

            // Act
            var result = await _useCase.Execute(noteId);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno");
        }
    }
}