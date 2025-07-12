using Application.Usecases.Referral;
using Application.Gateways;
using Domain.Dtos.Referral;
using Domain.Entites.Referral;
using Domain.Exceptions;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using Xunit;

namespace Tests.Referral
{
    public class CreateReferralUseCaseTests
    {
        private readonly IReferralRepositoryGateway _referralRepository;
        private readonly CreateReferralUseCase _useCase;

        public CreateReferralUseCaseTests()
        {
            _referralRepository = Substitute.For<IReferralRepositoryGateway>();
            _useCase = new CreateReferralUseCase(_referralRepository);
        }

        // Método auxiliar para criar um DTO válido rapidamente
        private static CreateReferralDTO CreateValidDto() => new(Guid.NewGuid(), Guid.NewGuid(), "Consulta de rotina", "30 Dias")
        {
            MedicalRecordId = Guid.NewGuid(),
            ExpectedDuration = "30 dias",
            ProfessionalId = Guid.NewGuid(),
            Reason = "Consulta de rotina"
        };

        // --- Testes ---

        [Fact]
        public async Task Execute_ShouldReturnSuccess_WhenDtoIsValid()
        {
            // Arrange
            var dto = CreateValidDto();

            // Act
            var result = await _useCase.Execute(dto);

            // Assert
            result.Success.Should().BeTrue();
            result.Data.Should().Be("Encaminhamento criado com sucesso");

            // Verifica se o método AddAsync foi chamado no repositório exatamente 1 vez
            // com uma entidade que corresponde aos dados do DTO.
            await _referralRepository.Received(1).AddAsync(Arg.Is<ReferralEntity>(
                e => e.MedicalRecordId == dto.MedicalRecordId &&
                     e.ProfessionalId == dto.ProfessionalId &&
                     e.Reason == dto.Reason
            ));
        }

        [Fact]
        public async Task Execute_ShouldReturnBadRequest_WhenDomainExceptionIsThrown()
        {
            // Arrange
            // Criamos um DTO inválido que deve causar uma DomainException na criação da entidade.
            // Ex: Motivo vazio.
            var invalidDto = CreateValidDto() with { Reason = "" };
            var expectedErrorMessage = "Reason cannot be null or empty"; // Supondo a mensagem de erro

            // Como a exceção acontece na Factory, podemos simulá-la
            // ou, neste caso, confiar que a lógica de negócio real a lançará.
            // Para um teste mais isolado, você poderia mockar a Factory, mas
            // testar com o objeto real é eficaz aqui.

            // Act
            // O bloco try/catch dentro do use case irá capturar a DomainException
            // que esperamos ser lançada pela `ReferralFactory` ou `ReferralEntity`.
            // Para este teste, vamos assumir que a exceção é lançada com a mensagem esperada.
            // A melhor abordagem é invocar a lógica que realmente lança a exceção.
            var result = await _useCase.Execute(invalidDto);


            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(400);

            // Verifica se o repositório NUNCA foi chamado, pois a validação falhou antes.
            await _referralRepository.DidNotReceive().AddAsync(Arg.Any<ReferralEntity>());
        }

        [Fact]
        public async Task Execute_ShouldReturnFailure_WhenRepositoryThrowsException()
        {
            // Arrange
            var dto = CreateValidDto();
            var errorMessage = "Erro de conexão com o banco de dados";

            // Forçamos o mock do repositório a lançar uma exceção genérica
            // quando AddAsync for chamado.
            _referralRepository
                .AddAsync(Arg.Any<ReferralEntity>())
                .Throws(new Exception(errorMessage));

            // Act
            var result = await _useCase.Execute(dto);

            // Assert
            result.Success.Should().BeFalse();
            result.ErrorDetails!.Status.Should().Be(500);
            result.Message.Should().Be("Erro interno");
        }
    }
}