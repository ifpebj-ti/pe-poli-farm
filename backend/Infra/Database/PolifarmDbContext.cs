using Domain.Entites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Database
{
    public class PolifarmDbContext : DbContext
    {
        public DbSet<BaseEntity> BaseEntities { get; set; }

        public PolifarmDbContext(DbContextOptions<PolifarmDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PolifarmDbContext).Assembly);
        }
    }
}
