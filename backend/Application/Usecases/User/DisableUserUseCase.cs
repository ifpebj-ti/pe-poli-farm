using Application.Gateways;
using Domain.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.User
{
    public class DisableUserUseCase
    {
        private readonly IUserRepositoryGateway _userRepository;
        public DisableUserUseCase(IUserRepositoryGateway userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ResultPattern<string>> Execute(Guid userId)
        {
            try
            {
                var user = await _userRepository.GetByIdAsync(userId);
                if (user is null)
                    return ResultPattern<string>.BadRequest("Usuário não encontrado.");

                user.DisableUser();
                await _userRepository.UpdateAsync(user);

                return ResultPattern<string>.SuccessResult("Usuário desativado com sucesso.");
            }
            catch (Exception)
            {
                return ResultPattern<string>.InternalError("Ocorreu um erro interno");
            }
        }
    }
}
