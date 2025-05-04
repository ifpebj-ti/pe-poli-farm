using Application.Gateways;
using Domain.Entites.User;
using Domain.Errors;

namespace Application.Usecases.User;

public class FindUserByEmail(IUserRepositoryGateway userGateway)
{
    public async Task<ResultPattern<UserEntity>> Execute(string userEmail)
    {
        var user = await userGateway.FindUserByEmail(userEmail);
        if(user is null)
            return ResultPattern<UserEntity>.NotFound("Usuário não encontrado");
        return ResultPattern<UserEntity>.SuccessResult(user);
    }
}