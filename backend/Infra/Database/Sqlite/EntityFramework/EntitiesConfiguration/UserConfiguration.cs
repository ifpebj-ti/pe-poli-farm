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
    public class UserConfiguration : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            // Configuração da chave primária
            builder.HasKey(u => u.Id);

            // Configuração das propriedades
            builder.Property(u => u.Name)
                .HasMaxLength(150)
                .IsRequired();

            builder.ComplexProperty(u => u.Email)
                .Property(u => u.Value)
                .HasMaxLength(100)
                .IsRequired();

            builder.ComplexProperty(u => u.Cpf)
                .Property(u => u.Value)
                .HasMaxLength(15)
                .IsRequired();

            builder.ComplexProperty(u => u.Position)
                .Property(u => u.Value)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(u => u.Password)
                .HasMaxLength(150)
                .IsRequired();

            builder.Property(u => u.FirstAccess)
                .IsRequired();

            builder.Property(u => u.Active)
                .IsRequired();

            // Relacionamento com Profile (um para um)
            builder.HasOne(u => u.Profile)
                .WithMany(u => u.Users) // Um profile pode ter muitos usuários (relacionamento inverso implícito)
                .HasForeignKey(u => u.ProfileId)
                .OnDelete(DeleteBehavior.Restrict); // Comportamento de exclusão restrito

            // Relacionamento com AccessCode (um para um)
            builder.HasOne(u => u.AccessCode)
                .WithOne(u => u.User)
                .HasForeignKey<AccessCodeEntity>(u => u.UserId)// Um usuário tem um código de acesso
                .OnDelete(DeleteBehavior.Cascade); // Quando um usuário for deletado, seu AccessCode também será deletado
        }
    }
}
