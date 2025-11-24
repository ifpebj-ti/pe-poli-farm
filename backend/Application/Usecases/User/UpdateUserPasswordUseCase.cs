using Application.Factories;
using Application.Gateways;
using Domain.Errors;
using Domain.Exceptions;

namespace Application.Usecases.User;

public class UpdateUserPasswordUseCase(IUserRepositoryGateway userGateway, IBcryptGateway bcryptGateway)
{
    public async Task<ResultPattern<string>> Execute(string email, string password, string accessCode)
    {
        var user = await userGateway.FindUserByEmail(email);
        if(user is null)
            return ResultPattern<string>.FailureResult("Não foi possível atualizar a senha do usuário.", 409);
        
        if(user?.AccessCode.Code != accessCode)
            return ResultPattern<string>.FailureResult("Não foi possível atualizar a senha do usuário.", 409);
        
        var hashPassword = bcryptGateway.GenerateHashPassword(password);

        try
        {
            user.FirstAccess = false;
            user.Password = hashPassword;
            
            await userGateway.Update(user);
            return ResultPattern<string>.SuccessResult();
        } catch(DomainException dex)
        {
            return ResultPattern<string>.BadRequest(dex.Message);
        } catch (Exception)
        {
            return ResultPattern<string>.FailureResult("Não foi possível atualizar a senha do usuário.", 409);
        }
    }
}