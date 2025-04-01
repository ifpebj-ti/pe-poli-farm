using Domain.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Database.Sqlite.EntityFramework.EntitiesConfiguration
{
    public class BaseEntityConfiguration : IEntityTypeConfiguration<BaseEntity>
    {
        public void Configure(EntityTypeBuilder<BaseEntity> builder)
        {
            builder.HasKey(be => be.Id);

            builder.Property(be => be.CreatedAt)
                .IsRequired();

            builder.Property(be => be.UpdatedAt)
                .IsRequired(false);

            builder.Property(be => be.DeletedAt)
                .IsRequired(false);

            builder.Property(be => be.IsDeleted)
                .IsRequired();
        }
    }
}
