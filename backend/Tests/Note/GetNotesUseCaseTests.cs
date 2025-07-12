using Application.Gateways;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Application.Usecases.Note;
using Domain.Dtos;
using Domain.Entities.Notes;

namespace Tests.Notes
{
    public class GetNotesUseCaseTests
    {
        private readonly INotesRepositoryGateway _notesRepository;
        private readonly GetNotesUseCase _useCase;

        public GetNotesUseCaseTests()
        {
            // Arrange (Setup)
            _notesRepository = Substitute.For<INotesRepositoryGateway>();
            _useCase = new GetNotesUseCase(_notesRepository);
        }

        // Método auxiliar para criar filtros
        private static NotesFilterDTO CreateFilters() => new(
            PatientId: Guid.NewGuid()
        );

        // --- Início dos Testes ---

        [Fact]
        public async Task Execute_ShouldReturnSuccessWithData_WhenRepositoryReturnsNotes()
        {
            // Arrange
            var filters = CreateFilters();
            var cancellationToken = CancellationToken.None;
            var expectedNotes = new List<NotesEntity>
            {
                new(), // Simula uma nota encontrada
                new()  // Simula outra nota encontrada
            };

            // Configura o mock do repositório para retornar a lista de notas
            _notesRepository.GetWithFiltersAsync(filters, cancellationToken)
                .Returns(expectedNotes);

            // Act
            var result = await _useCase.Execute(filters, cancellationToken);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data.Should().HaveCount(2);
            result.Data.Should().BeEquivalentTo(expectedNotes);

            // Verifica se o método do repositório foi chamado uma vez
            await _notesRepository.Received(1).GetWithFiltersAsync(filters, cancellationToken);
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccessWithEmptyList_WhenRepositoryReturnsNoNotes()
        {
            // Arrange
            var filters = CreateFilters();
            var cancellationToken = CancellationToken.None;
            var emptyList = new List<NotesEntity>();

            // Configura o mock para retornar uma lista vazia
            _notesRepository.GetWithFiltersAsync(filters, cancellationToken)
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

            // Configura o mock para lançar uma exceção genérica
            _notesRepository.GetWithFiltersAsync(filters, cancellationToken)
                .ThrowsAsync(new Exception("Erro de conexão com o banco"));

            // Act
            var result = await _useCase.Execute(filters, cancellationToken);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno");
            result.Data.Should().BeNull(); // Depende da implementação do FailureResult
        }
    }
}