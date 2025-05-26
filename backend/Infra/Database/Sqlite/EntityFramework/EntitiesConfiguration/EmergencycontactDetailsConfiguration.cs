using Domain.Entities.EmergencyContactDetails;
using Domain.Entities.Patient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infra.Database.SqLite.EntityFramework.EntityConfiguration;

public class EmergencycontactDetailsConfiguration : IEntityTypeConfiguration<EmergencyContactDetailsEntity>
{
    public void Configure(EntityTypeBuilder<EmergencyContactDetailsEntity> builder)
    {
        // Mapeamento da tabela
        builder.ToTable("EmergencyContactDetails");

        // Mapeamento da chave primária
        builder.HasKey(ec => ec.Id);

        // Configuração das propriedades
        builder.Property(ec => ec.Name)
            .HasMaxLength(150)
            .IsRequired(false); // Pode ser nulo

        builder.ComplexProperty(ec => ec.Phone)
            .Property(ec => ec.Value)
            .HasMaxLength(15)
            .IsRequired(false); // Pode ser nulo

        builder.ComplexProperty(ec => ec.Relationship)
            .Property(ec => ec.Value)
            .HasMaxLength(30)
            .IsRequired(false); // Pode ser nulo

        // Configuração da chave estrangeira
        builder.HasOne<PatientEntity>()
            .WithMany(ec => ec.EmergencyContactDetailsEntity) // Caso você tenha o relacionamento reverso no PatientModel
            .HasForeignKey(ec => ec.PatientId)
            .OnDelete(DeleteBehavior.Cascade); // Cascata para deletar os contatos de emergência quando o paciente for deletado
    }
}