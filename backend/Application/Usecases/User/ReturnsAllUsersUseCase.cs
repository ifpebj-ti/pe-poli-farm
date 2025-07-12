using Application.Gateways;
using Domain.Entites.User;
using Domain.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.User
{
    public class ReturnsAllUsersUseCase(IUserRepositoryGateway userRepository)
    {
        public async Task<ResultPattern<List<UserEntity>>> Execute()
        {
            try
            {
                var users = await userRepository.GetAllAsync();
                return ResultPattern<List<UserEntity>>.SuccessResult(users);
            } catch (Exception)
            {
                return ResultPattern<List<UserEntity>>.InternalError("Erro interno"); ;
            }
        }
    }
}
