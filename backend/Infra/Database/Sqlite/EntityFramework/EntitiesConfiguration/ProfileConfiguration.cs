using Domain.Entites.Profile;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Database.Sqlite.EntityFramework.EntitiesConfiguration
{
    public class ProfileConfiguration : IEntityTypeConfiguration<ProfileEntity>
    {
        public void Configure(EntityTypeBuilder<ProfileEntity> builder)
        {
            // Configuração da chave primária
            builder.HasKey(p => p.Id);

            // Configuração da propriedade Role
            builder.ComplexProperty(p => p.Role)
                .Property(p => p.Value)
                .HasColumnName("Role_Value")
                .IsRequired(); // Assumindo que a propriedade Role é obrigatória

            // Relacionamento com User (um para muitos)
            builder.HasMany(p => p.Users)
                .WithOne(u => u.Profile) // Um Profile tem muitos Users
                .OnDelete(DeleteBehavior.Restrict); // Comportamento de exclusão restrito
        }
    }
}
