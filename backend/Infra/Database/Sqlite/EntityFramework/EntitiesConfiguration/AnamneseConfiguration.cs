using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities.Anamnese;
using Domain.Entities.MedicalRecord;

namespace Infra.Database.SqLite.EntityFramework.EntityConfiguration;

public class AnamneseConfiguration : IEntityTypeConfiguration<AnamneseEntity>
{
    public void Configure(EntityTypeBuilder<AnamneseEntity> builder)
        {
            // Configuração da chave primária
            builder.HasKey(a => a.Id);
            
            // Configuração de propriedades com tamanho máximo
            builder.Property(a => a.BloodPressure)
                .HasMaxLength(15)
                .IsRequired();
                
            builder.Property(a => a.Glucose)
                .HasMaxLength(15)
                .IsRequired();
                
            builder.Property(a => a.Temperature)
                .HasMaxLength(15)
                .IsRequired();
                
            builder.Property(a => a.RespiratoryRate)
                .HasMaxLength(15)
                .IsRequired();
                
            builder.Property(a => a.BloodType)
                .HasMaxLength(15)
                .IsRequired();
                
            builder.Property(a => a.Weight)
                .HasMaxLength(15)
                .IsRequired();
                
            builder.Property(a => a.HeartRate)
                .HasMaxLength(15)
                .IsRequired();
                
            builder.Property(a => a.Saturation)
                .HasMaxLength(15)
                .IsRequired();
                
            builder.Property(a => a.Height)
                .HasMaxLength(15)
                .IsRequired();

            builder.Property(a => a.AllergiesType)
                .HasMaxLength(100)
                .IsRequired();
                
            builder.Property(a => a.AntecPathologicalType)
                .HasMaxLength(100)
                .IsRequired();
                
            builder.Property(a => a.MedicationInUseType)
                .HasMaxLength(100)
                .IsRequired();
                
            builder.Property(a => a.MedicalHypothesis)
                .HasMaxLength(100)
                .IsRequired();
                
            builder.Property(a => a.PreviousSurgeries)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(a => a.SignsAndSymptoms)
                .IsRequired();
            
            builder.ComplexProperty(a => a.ClassificationStatus)
                .Property(a => a.Value)
                .IsRequired();

            // Configuração das propriedades booleanas
            builder.Property(a => a.AntecPathological)
                .IsRequired();
                
            builder.Property(a => a.NecesPsicobio)
                .IsRequired();
                
            builder.Property(a => a.Diabetes)
                .IsRequired();
                
            builder.Property(a => a.MedicationsInUse)
                .IsRequired();
                
            builder.Property(a => a.UseOfProthesis)
                .IsRequired();
                
            builder.Property(a => a.Allergies)
                .IsRequired();

            // Configuração do relacionamento com MedicalRecord
            builder.HasOne<MedicalRecordEntity>()
                .WithOne(a => a.Anamnese) // assuming a MedicalRecord can have many AnamneseEntities
                .HasForeignKey<AnamneseEntity>(a => a.MedicalRecordId)
                .OnDelete(DeleteBehavior.Cascade);
        }
}