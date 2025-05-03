using Application.Gateways;
using Domain.Entites;
using Infra.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Gateways
{
    public class GenericgatewayRepository<T>(PolifarmDbContext context) : IGenericGatewayRepository<T> where T : BaseEntity
    {
        public async Task AddAsync(T entity)
        {
            await context.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await context.Set<T>().FindAsync(id);
            context.Remove(entity!);
        }

        public async Task<List<T>> GetAllAsync()
        {
            var entities = await context.Set<T>().ToListAsync();
            return entities;
        }

        public async Task<T?> GetByIdAsync(Guid id)
        {
            var entity = await context.Set<T>().FindAsync(id);
            return entity;
        }

        public async Task UpdateAsync(T entity)
        {
            entity.UpdatedAt = DateTime.Now;
            context.Update(entity);
            await context.SaveChangesAsync();
        }
    }
}
