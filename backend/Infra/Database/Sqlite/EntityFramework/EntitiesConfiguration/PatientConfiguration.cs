using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities.Patient;

namespace Infra.Database.SqLite.EntityFramework.EntityConfiguration;

public class PatientConfiguration : IEntityTypeConfiguration<PatientEntity>
{
    public void Configure(EntityTypeBuilder<PatientEntity> builder)
    {
        // Configurar a tabela
        builder.ToTable("Patients");

        // Configurar a chave primária
        builder.HasKey(p => p.Id);

        // Configurar propriedades
        builder.Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(p => p.SocialName)
            .HasMaxLength(150);

        builder.Property(p => p.BirthDate);

        builder.ComplexProperty(p => p.Sus)
            .Property(p => p.Value)
            .HasMaxLength(15);

        builder.ComplexProperty(p => p.Cpf)
            .Property(p => p.Value)
            .IsRequired()
            .HasMaxLength(15);

        builder.ComplexProperty(p => p.Rg)
            .Property(p => p.Value)
            .HasMaxLength(15);

        builder.ComplexProperty(p => p.Phone)
            .Property(p => p.Value)
            .HasMaxLength(15);

        builder.Property(p => p.MotherName)
            .HasMaxLength(150);

        builder.ComplexProperty(p => p.Status)
            .Property(p => p.Value)
            .HasMaxLength(30);

        // Configurar relacionamentos
        builder.HasOne(p => p.AddressEntity)
            .WithOne(p => p.Patient)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(p => p.EmergencyContactDetailsEntity)
            .WithOne(p => p.Patient)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(p => p.ServicesEntity)
            .WithOne(p => p.PatientEntity)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(p => p.NotesEntity)
            .WithOne(p => p.Patient)
            .OnDelete(DeleteBehavior.Cascade);

        // Configurar as restrições adicionais, se necessário
    }
}