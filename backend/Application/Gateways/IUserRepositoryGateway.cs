using Domain.Entites.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gateways
{
    public interface IUserRepositoryGateway : IGenericRepositoryGateway<UserEntity>
    {
        Task<UserEntity?> FindUserByEmail(string userEmail);
        Task<UserEntity?> FindUserById(Guid userId);
        Task Create(UserEntity userEntity);
        Task<UserEntity> Update(UserEntity userEntity);
    }
}
