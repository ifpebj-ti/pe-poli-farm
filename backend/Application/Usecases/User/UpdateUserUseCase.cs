using Application.Gateways;
using Domain.Dtos.User;
using Domain.Entites.User;
using Domain.Errors;
using Domain.ValuesObjects;
using System.Security.AccessControl;

namespace Application.UseCases.User
{
    public class UpdateUserUseCase
    {
        private readonly IUserRepositoryGateway _userRepository;
        private readonly IProfileRepositoryGateway _profileRepository;

        public UpdateUserUseCase(IUserRepositoryGateway userRepository, IProfileRepositoryGateway profileRepository)
        {
            _userRepository = userRepository;
            _profileRepository = profileRepository;
        }

        public async Task<ResultPattern<string>> Execute(Guid userId, UpdateUserDTO dto)
        {
            try
            {
                var user = await _userRepository.GetByIdAsync(userId);
                if (user is null)
                    return ResultPattern<string>.BadRequest("Usuário não encontrado.");

                if (!string.IsNullOrWhiteSpace(dto.name))
                    user.UpdateName(dto.name);

                if (dto.isActive.HasValue && dto.isActive == false)
                    user.DisableUser();

                if (!string.IsNullOrWhiteSpace(dto.email))
                    user.UpdateEmail(new Email(dto.email));

                if (!string.IsNullOrWhiteSpace(dto.password))
                    user.Password = dto.password;

                if (dto.profileId.HasValue)
                {
                    var profile = await _profileRepository.GetByIdAsync(dto.profileId.Value);
                    if (profile == null)
                        return ResultPattern<string>.BadRequest("Perfil não encontrado.");

                    user.UpdateProfile(profile);
                }

                await _userRepository.UpdateAsync(user);

                return ResultPattern<string>.SuccessResult("Usuário atualizado com sucesso.");
            }
            catch (Exception) {
                return ResultPattern<string>.InternalError("Ocorreu um erro interno");
            }
        }
    }
}
