using Application.Usecases.User;
using Application.Gateways;
using Domain.Entites.User;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Tests.User
{
    public class ReturnsAllUsersUseCaseTests
    {
        private readonly IUserRepositoryGateway _userRepository;
        private readonly ReturnsAllUsersUseCase _useCase;

        public ReturnsAllUsersUseCaseTests()
        {
            // Arrange (Setup)
            _userRepository = Substitute.For<IUserRepositoryGateway>();
            _useCase = new ReturnsAllUsersUseCase(_userRepository);
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccessWithUserList_WhenRepositoryReturnsUsers()
        {
            // Arrange
            var userList = new List<UserEntity>
            {
                new(), // Simula um usuário
                new()  // Simula outro usuário
            };
            _userRepository.GetAllAsync().Returns(userList);

            // Act
            var result = await _useCase.Execute();

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data.Should().HaveCount(2);
            await _userRepository.Received(1).GetAllAsync();
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccessWithEmptyList_WhenRepositoryReturnsNoUsers()
        {
            // Arrange
            var emptyList = new List<UserEntity>();
            _userRepository.GetAllAsync().Returns(emptyList);

            // Act
            var result = await _useCase.Execute();

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data.Should().BeEmpty();
        }

        [Fact]
        public async Task Execute_ShouldReturnInternalError_WhenRepositoryThrowsException()
        {
            // Arrange
            _userRepository.GetAllAsync().ThrowsAsync(new Exception("Database connection error"));

            // Act
            var result = await _useCase.Execute();

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno");
        }
    }
}