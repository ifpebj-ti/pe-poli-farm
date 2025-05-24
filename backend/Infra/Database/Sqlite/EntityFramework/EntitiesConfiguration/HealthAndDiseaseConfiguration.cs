using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities.HealthAndDisease;

namespace Infra.Database.SqLite.EntityFramework.EntityConfiguration
{
    public class HealthAndDiseaseConfiguration : IEntityTypeConfiguration<HealthAndDiseaseEntity>
    {
        public void Configure(EntityTypeBuilder<HealthAndDiseaseEntity> builder)
        {
            builder.HasKey(hd => hd.Id);

            // Configuração das propriedades booleanas
            builder.Property(hd => hd.FamilyHAS).IsRequired();
            builder.Property(hd => hd.FamilyDM).IsRequired();
            builder.Property(hd => hd.FamilyIAM).IsRequired();
            builder.Property(hd => hd.FamilyAVC).IsRequired();
            builder.Property(hd => hd.FamilyAlzheimer).IsRequired();
            builder.Property(hd => hd.FamilyCA).IsRequired();
            builder.Property(hd => hd.OwnHAS).IsRequired();
            builder.Property(hd => hd.OwnDM).IsRequired();
            builder.Property(hd => hd.OwnIAM).IsRequired();
            builder.Property(hd => hd.OwnAVC).IsRequired();
            builder.Property(hd => hd.OwnAlzheimer).IsRequired();
            builder.Property(hd => hd.OwnCA).IsRequired();

            // Configuração do relacionamento com MedicalRecord
            builder.HasOne(hd => hd.MedicalRecord)
                .WithOne(mr => mr.HealthAndDisease)
                .HasForeignKey<HealthAndDiseaseEntity>(hd => hd.MedicalRecordId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
