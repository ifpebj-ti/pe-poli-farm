using Domain.Entities.Notes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infra.Database.SqLite.EntityFramework.EntityConfiguration;

public class NotesConfiguration : IEntityTypeConfiguration<NotesEntity>
{
    public void Configure(EntityTypeBuilder<NotesEntity> builder)
    {
        // Mapeamento da tabela
        builder.ToTable("Notes");

        // Mapeamento da chave primária
        builder.HasKey(n => n.Id);
        
        // Configuração das propriedades
        builder.Property(n => n.Description)
            .HasMaxLength(2000)
            .IsRequired();
        
        builder.Property(n => n.CreatedAt)
            .IsRequired();
        
        // Configuração da chave estrangeira
        builder.HasOne(p => p.Patient)
            .WithMany(p => p.NotesEntity)
            .HasForeignKey(n => n.PatientId)
            .OnDelete(DeleteBehavior.Cascade); // Cascata para deletar a nota quando o paciente for deletado
        
        builder.HasOne(u => u.User)
            .WithMany(u => u.NotesEntity)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade); // Cascata para deletar a nota quando o usuário for deletado
    }
}
