using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.HealthAndDisease
{
    public record CreateHealthAndDiseaseDTO(
        bool FamilyHAS, bool FamilyDM, bool FamilyIAM, bool FamilyAVC, bool FamilyAlzheimer, bool FamilyCA,
        bool OwnHAS, bool OwnDM, bool OwnIAM, bool OwnAVC, bool OwnAlzheimer, bool OwnCA
    );
}
