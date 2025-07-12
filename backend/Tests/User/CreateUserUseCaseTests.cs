using Application.Usecases.User;
using Application.Gateways;
using Domain.Dtos.User;
using Domain.Entities.User;
using Domain.Exceptions;
using Domain.ValuesObjects;
using FluentAssertions;
using NSubstitute;
using Xunit;
using Application.Factories;
using Domain.Entites.Profile;
using Domain.Entites.User;
using Domain.Dtos.Profile;

namespace Tests.User
{
    public class CreateUserUseCaseTests
    {
        private readonly IUserRepositoryGateway _userGateway;
        private readonly IProfileRepositoryGateway _profileGateway;
        private readonly CreateUserUseCase _useCase;

        public CreateUserUseCaseTests()
        {
            _userGateway = Substitute.For<IUserRepositoryGateway>();
            _profileGateway = Substitute.For<IProfileRepositoryGateway>();
            _useCase = new CreateUserUseCase(_userGateway, _profileGateway);
        }

        private static CreateUserDTO CreateValidDto() => new(
            Name: "João",
            Email: "joao@email.com",
            Cpf: "123.456.789-00",
            Position: "DOCTOR",
            Profile: new ProfileDTO(
               Role: "DOCTOR"
            )

        );

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenEmailAlreadyExists()
        {
            // Arrange
            var dto = CreateValidDto();
            _userGateway.FindUserByEmail(dto.Email).Returns(new UserEntity());

            // Act
            var result = await _useCase.Execute(dto);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(409);
            result.Message.Should().Be("Não foi possível criar o usuário.");
            await _userGateway.DidNotReceive().Create(Arg.Any<UserEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenUserIsCreated()
        {
            // Arrange
            var dto = CreateValidDto();
            _userGateway.FindUserByEmail(dto.Email).Returns((UserEntity?)null);
            _profileGateway.FindAll().Returns(new List<ProfileEntity>());

            // Act
            var result = await _useCase.Execute(dto);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();

            await _userGateway.Received(1).Create(Arg.Any<UserEntity>());
        }
    }
}
