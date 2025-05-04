using Application.Factories;
using Application.Gateways;
using Domain.Dtos.User;
using Domain.Entites.User;
using Domain.Errors;
using Domain.Exceptions;

namespace Application.Usecases.User
{
    public class CreateUserUseCase(
        IUserRepositoryGateway userGateway, 
        IProfileRepositoryGateway profileGateway)
    {
        public async Task<ResultPattern<UserEntity>> Execute(CreateUserDTO data)
        {
            var user = await userGateway.FindUserByEmail(data.Email);
            var profiles = await profileGateway.FindAll();
            if(user is not null)
                return ResultPattern<UserEntity>.FailureResult("Não foi possível criar o usuário.", 409);

            var accessCode = AccessCodeFactory.CreateAccessCodeEntity();
            try
            {
                var userEntity = UserFactory.CreateUser(data, accessCode, profiles);
                await userGateway.Create(userEntity);
                return ResultPattern<UserEntity>.SuccessResult(userEntity);
            }
            catch (DomainException dex) {
                return ResultPattern<UserEntity>.BadRequest(dex.Message);
            }
            catch (Exception)
            {
                return ResultPattern<UserEntity>.FailureResult("Não foi possível criar o usuário.", 409);
            }
        }
    }
}
