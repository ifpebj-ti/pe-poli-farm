using Application.Gateways;
using Application.Usecases.Auth;
using Domain.Entites.AccessCode;
using Domain.Entites.Profile;
using Domain.Entites.User;
using Domain.Entities.User;
using Domain.Enums;
using Domain.ValuesObjects;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Auth
{
    public class LoginUseCaseTests
    {
        private readonly ILogger<LoginUseCase> _logger;
        private readonly IUserRepositoryGateway _userRepository;
        private readonly IBcryptGateway _bcryptGateway;
        private readonly ITokenGateway _tokenGateway;
        private readonly LoginUseCase _useCase;

        public LoginUseCaseTests()
        {
            // Substituindo todas as dependências por mocks
            _logger = Substitute.For<ILogger<LoginUseCase>>();
            _userRepository = Substitute.For<IUserRepositoryGateway>();
            _bcryptGateway = Substitute.For<IBcryptGateway>();
            _tokenGateway = Substitute.For<ITokenGateway>();

            // Instanciando o caso de uso com os mocks
            _useCase = new LoginUseCase(_logger, _userRepository, _bcryptGateway, _tokenGateway);
        }

        // Método auxiliar para criar um usuário fake para os testes
        private static UserEntity CreateFakeUser(bool isActive, bool isFirstAccess, string password)
        {
            return new UserEntity(
                "Usuário de Teste",
                new Email("teste@prontusvitale.com"),
                new CPF("123.234.433-99"),
                new Positions(PositionType.DOCTOR.ToString()),
                password,
                isFirstAccess,
                isActive,
                new ProfileEntity(),
                new AccessCodeEntity()
            );
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccessWithToken_WhenCredentialsAreValidAndNotFirstAccess()
        {
            // Arrange
            var email = "teste@prontusvitale.com";
            var password = "correct-password";
            var fakeUser = CreateFakeUser(isActive: true, isFirstAccess: false, password: password);
            var expectedToken = "jwt.token.string";

            _userRepository.FindUserByEmail(email).Returns(fakeUser);
            _tokenGateway.CreateToken(fakeUser).Returns(expectedToken);

            // Act
            var result = await _useCase.Execute(email, password);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().Be(expectedToken);
            await _userRepository.Received(1).FindUserByEmail(email);
            _bcryptGateway.DidNotReceive().VerifyHashPassword(Arg.Any<UserEntity>(), Arg.Any<string>());
            _tokenGateway.Received(1).CreateToken(fakeUser);
        }

        [Fact]
        public async Task Execute_ShouldReturnSuccessWithToken_WhenCredentialsAreValidAndIsFirstAccess()
        {
            // Arrange
            var email = "teste@prontusvitale.com";
            var password = "correct-password";
            var fakeUser = CreateFakeUser(isActive: true, isFirstAccess: true, password: "hashed-password"); // A senha no banco seria o hash
            var expectedToken = "jwt.token.string";

            _userRepository.FindUserByEmail(email).Returns(fakeUser);
            _bcryptGateway.VerifyHashPassword(fakeUser, password).Returns(true); // Simula que a senha corresponde ao hash
            _tokenGateway.CreateToken(fakeUser).Returns(expectedToken);

            // Act
            var result = await _useCase.Execute(email, password);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().Be(expectedToken);
            await _userRepository.Received(1).FindUserByEmail(email);
            _bcryptGateway.Received(1).VerifyHashPassword(fakeUser, password);
            _tokenGateway.Received(1).CreateToken(fakeUser);
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenUserIsNotFound()
        {
            // Arrange
            var email = "nonexistent@prontusvitale.com";
            var password = "any-password";

            _userRepository.FindUserByEmail(email).Returns((UserEntity?)null);

            // Act
            var result = await _useCase.Execute(email, password);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Should().NotBeNull();
            result.ErrorDetails!.Status.Should().Be(404);
            await _userRepository.Received(1).FindUserByEmail(email);
            _tokenGateway.DidNotReceive().CreateToken(Arg.Any<UserEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenUserIsInactive()
        {
            // Arrange
            var email = "inactive@prontusvitale.com";
            var password = "any-password";
            var fakeUser = CreateFakeUser(isActive: false, isFirstAccess: false, password: password);

            _userRepository.FindUserByEmail(email).Returns(fakeUser);

            // Act
            var result = await _useCase.Execute(email, password);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Should().NotBeNull();
            result.ErrorDetails!.Status.Should().Be(404);
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenPasswordIsIncorrectAndNotFirstAccess()
        {
            // Arrange
            var email = "teste@prontusvitale.com";
            var correctPassword = "correct-password";
            var incorrectPassword = "incorrect-password";
            var fakeUser = CreateFakeUser(isActive: true, isFirstAccess: false, password: correctPassword);

            _userRepository.FindUserByEmail(email).Returns(fakeUser);

            // Act
            var result = await _useCase.Execute(email, incorrectPassword);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Should().NotBeNull();
            result.ErrorDetails!.Status.Should().Be(400);
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenPasswordIsIncorrectOnFirstAccess()
        {
            // Arrange
            var email = "teste@prontusvitale.com";
            var password = "incorrect-password";
            var fakeUser = CreateFakeUser(isActive: true, isFirstAccess: true, password: "hashed-password");

            _userRepository.FindUserByEmail(email).Returns(fakeUser);
            _bcryptGateway.VerifyHashPassword(fakeUser, password).Returns(false); // Simula falha na verificação do hash

            // Act
            var result = await _useCase.Execute(email, password);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Should().NotBeNull();
            result.ErrorDetails!.Status.Should().Be(400);
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenTokenGenerationFails()
        {
            // Arrange
            var email = "teste@prontusvitale.com";
            var password = "correct-password";
            var fakeUser = CreateFakeUser(isActive: true, isFirstAccess: false, password: password);

            _userRepository.FindUserByEmail(email).Returns(fakeUser);
            _tokenGateway.CreateToken(fakeUser).Returns((string?)null); // Simula falha na geração do token

            // Act
            var result = await _useCase.Execute(email, password);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails.Should().NotBeNull();
            result.ErrorDetails!.Status.Should().Be(400);
        }
    }
}
