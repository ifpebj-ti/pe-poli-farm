using Domain.Entites.User;

namespace WebApi.ResponseModels.User
{
    public class UserResponseModel
    {
        public static UserResponse CreateUserResponse(UserEntity user)
        {
            return new UserResponse(
                user.Id,
                user.Name,
                user.Email.Value,
                user.Cpf.Value,
                user.Position.Value,
                new ProfileResponse(
                    user.Profile.Role
                ),
                user.AccessCode.Code
                );
        }
    }
}
