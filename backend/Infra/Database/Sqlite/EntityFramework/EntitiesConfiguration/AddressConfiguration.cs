using Domain.Entities.Address;
using Domain.Entities.Patient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infra.Database.SqLite.EntityFramework.EntityConfiguration;

public class AddressConfiguration : IEntityTypeConfiguration<AddressEntity>
{
    public void Configure(EntityTypeBuilder<AddressEntity> builder)
    {
        // Mapeamento da tabela
        builder.ToTable("Addresses");

        // Mapeamento da chave primária
        builder.HasKey(a => a.Id);

        // Configuração das propriedades
        builder.ComplexProperty(a => a.Cep)
            .Property(a => a.Value)
            .HasMaxLength(11)
            .IsRequired(false); // Pode ser nulo

        builder.Property(a => a.Street)
            .HasMaxLength(150)
            .IsRequired(false); // Pode ser nulo

        builder.Property(a => a.City)
            .HasMaxLength(60)
            .IsRequired(false); // Pode ser nulo

        builder.Property(a => a.Number)
            .IsRequired(false); // Pode ser nulo

        builder.Property(a => a.Neighborhood)
            .HasMaxLength(40)
            .IsRequired(false); // Pode ser nulo

        // Configuração da chave estrangeira
        builder.HasOne<PatientEntity>()
            .WithOne(a => a.AddressEntity)
            .HasForeignKey<AddressEntity>(a => a.PatientId)
            .OnDelete(DeleteBehavior.Cascade); // Cascata para deletar o endereço quando o paciente for deletado
    }
}