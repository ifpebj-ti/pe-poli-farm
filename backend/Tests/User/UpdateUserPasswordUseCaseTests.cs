using Application.Usecases.User;
using Application.Gateways;
using Domain.Entities.User;
using Domain.Exceptions;
using Domain.ValuesObjects;
using FluentAssertions;
using NSubstitute;
using Xunit;
using Application.Factories;
using Domain.Entites.User;

namespace Tests.User
{
    public class UpdateUserPasswordUseCaseTests
    {
        private readonly IUserRepositoryGateway _userGateway;
        private readonly IBcryptGateway _bcryptGateway;
        private readonly UpdateUserPasswordUseCase _useCase;

        public UpdateUserPasswordUseCaseTests()
        {
            _userGateway = Substitute.For<IUserRepositoryGateway>();
            _bcryptGateway = Substitute.For<IBcryptGateway>();
            _useCase = new UpdateUserPasswordUseCase(_userGateway, _bcryptGateway);
        }


        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenUserDoesNotExist()
        {
            // Arrange
            var email = "inexistente@email.com";
            _userGateway.FindUserByEmail(email).Returns((UserEntity?)null);

            // Act
            var result = await _useCase.Execute(email, "qualquerSenha", "qualquerCodigo");

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(409);
            result.Message.Should().Be("Não foi possível atualizar a senha do usuário.");
        }   
    }
}
