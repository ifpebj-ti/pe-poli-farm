using Domain.Entites.Referral;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Database.Sqlite.EntityFramework.EntitiesConfiguration
{
    public class ReferralConfiguration : IEntityTypeConfiguration<ReferralEntity>
    {
        public void Configure(EntityTypeBuilder<ReferralEntity> builder)
        {
            builder.ToTable("Referrals");

            builder.HasKey(r => r.Id);

            builder.Property(r => r.Reason)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(r => r.ExpectedDuration)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasOne(r => r.MedicalRecord)
                .WithMany() // Se MedicalRecord tiver lista de encaminhamentos, coloque .WithMany(mr => mr.Referrals)
                .HasForeignKey(r => r.MedicalRecordId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(r => r.Professional)
                .WithMany() // Se Professional tiver lista de encaminhamentos, coloque .WithMany(p => p.Referrals)
                .HasForeignKey(r => r.ProfessionalId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
