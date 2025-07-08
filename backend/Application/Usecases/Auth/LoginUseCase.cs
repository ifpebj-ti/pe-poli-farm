using Application.Gateways;
using Domain.Errors;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Auth
{
    public class LoginUseCase(ILogger<LoginUseCase> logger, IUserRepositoryGateway userRepository, IBcryptGateway bcryptGateway, ITokenGateway tokenGateway)
    {
        public async Task<ResultPattern<string>> Execute(string userEmail, string userPassword)
        {
            logger.LogInformation("Iniciando processo de login para o email: {Email}", userEmail);

            var user = await userRepository.FindUserByEmail(userEmail);
            if (user is null || !user.Active)
            {
                logger.LogWarning("Usuário não encontrado ou inativo: {Email}", userEmail);
                return ResultPattern<string>.FailureResult("Erro ao realizar login, verifique os dados e tente novamente", 404);
            }

            if (user.FirstAccess)
            {
                logger.LogInformation("Usuário {Email} realizando primeiro acesso, verificando senha hash.", userEmail);
                var result = bcryptGateway.VerifyHashPassword(user, userPassword);
                if (!result)
                {
                    logger.LogWarning("Falha na verificação de senha hash para o usuário: {Email}", userEmail);
                    return ResultPattern<string>.FailureResult("Erro ao realizar login, verifique os dados e tente novamente", 400);
                }
            }
            else
            {
                logger.LogInformation("Usuário {Email} não está em primeiro acesso, comparando senha simples.", userEmail);
                if (user.Password != userPassword)
                {
                    logger.LogWarning("Senha incorreta fornecida para o usuário: {Email}", userEmail);
                    return ResultPattern<string>.FailureResult("Erro ao realizar login, verifique os dados e tente novamente", 400);
                }
            }

            var accessToken = tokenGateway.CreateToken(user);
            if (accessToken is null)
            {
                logger.LogError("Falha ao gerar token de acesso para o usuário: {Email}", userEmail);
                return ResultPattern<string>.FailureResult("Erro ao realizar login, verifique os dados e tente novamente", 400);
            }

            logger.LogInformation("Token gerado com sucesso para o usuário: {Email}", userEmail);
            return ResultPattern<string>.SuccessResult(accessToken);
        }
    }
}
