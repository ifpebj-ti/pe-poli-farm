using Application.Usecases.User;
using Application.Gateways;
using Domain.Entities.User;
using FluentAssertions;
using NSubstitute;
using Xunit;
using Domain.Entites.User;
using Domain.Entites.AccessCode;
using Domain.Entites.Profile;
using Domain.ValuesObjects;
using Domain.Enums;

namespace Tests.User
{
    public class FindUserByEmailUseCaseTests
    {
        private readonly IUserRepositoryGateway _userGateway;
        private readonly FindUserByEmail _useCase;

        public FindUserByEmailUseCaseTests()
        {
            _userGateway = Substitute.For<IUserRepositoryGateway>();
            _useCase = new FindUserByEmail(_userGateway);
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenUserExists()
        {
            // Arrange
            var email = "joao@email.com";
            var user = new UserEntity(
                name: "João da Silva",
                email: new Email("joao@email.com"),
                cpf: new CPF("123.456.789-00"),
                position: new Positions("DOCTOR"), // ou qualquer valor definido no seu enum Positions
                password: "senhaHash123",
                firstAccess: true,
                active: true,
                profile: new ProfileEntity(new Role(RoleType.DOCTOR.ToString())),
                accessCode: new AccessCodeEntity()
            );

            _userGateway.FindUserByEmail(email).Returns(user);

            // Act
            var result = await _useCase.Execute(email);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data!.Email.Value.Should().Be(email);
        }

        [Fact]
        public async Task Execute_ShouldReturnNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var email = "naoexiste@email.com";
            _userGateway.FindUserByEmail(email).Returns((UserEntity?)null);

            // Act
            var result = await _useCase.Execute(email);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(404);
            result.Message.Should().Be("Usuário não encontrado");
            result.Data.Should().BeNull();
        }
    }
}
