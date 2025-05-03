using Domain.Entites.AccessCode;
using Domain.Entites.User;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Database.Sqlite.EntityFramework.EntitiesConfiguration
{
    public class AccessCodeConfiguration : IEntityTypeConfiguration<AccessCodeEntity>
    {
        public void Configure(EntityTypeBuilder<AccessCodeEntity> builder)
        {
           
            // Configuração da propriedade Code (campo obrigatório)
            builder.Property(a => a.Code)
                .IsRequired()  // A propriedade Code é obrigatória
                .HasMaxLength(50);  // Definindo um tamanho máximo para o código

            builder.HasOne<UserEntity>() // Exemplo de relacionamento com uma entidade User
               .WithOne(u => u.AccessCode) // Relacionamento 1:1
               .HasForeignKey<AccessCodeEntity>(u => u.UserId) // Chave estrangeira
               .OnDelete(DeleteBehavior.Cascade); // Comportamento de exclusão em cascata
        }
    }
}
