using Application.Gateways;
using Domain.Entites.User;
using Infra.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Gateways
{
    public class UserRepositoryGateway(PolifarmDbContext context) : GenericRepositoryGateway<UserEntity>(context), IUserRepositoryGateway
    {

        new public async Task<List<UserEntity>> GetAllAsync()
        {
            var users = await context.Users
                .Include(u => u.Profile)
                .ToListAsync();

            return users;
        }

        public async Task Create(UserEntity userEntity)
        {
            context.Users.Add(userEntity);
            await context.SaveChangesAsync();
        }

        public async Task<UserEntity?> FindUserById(Guid userId)
        {
            var user = await context.Users
                .Include(u => u.Profile)
                .Include(u => u.AccessCode)
                .FirstOrDefaultAsync(u => u.Id == userId);
            return user;
        }

        public async Task<UserEntity?> FindUserByEmail(string userEmail)
        {
            var user = await context.Users
                .Include(u => u.Profile)
                .Include(u => u.AccessCode)
                .FirstOrDefaultAsync(u => u.Email.Value == userEmail);
            return user;
        }
        public async Task<UserEntity> Update(UserEntity userEntity)
        {
            context.Users.Update(userEntity);
            await context.SaveChangesAsync();
            return userEntity;
        }
    }
}
