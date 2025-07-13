using Domain.Dtos.Conduct;
using Domain.Entites.Conduct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Factories
{
    public static class ConductFactory
    {
        public static ConductEntity Create(CreateConductDTO dto)
        {
            return new ConductEntity(
                dto.PatientId,
                dto.ProfessionalId,
                dto.MedicalRecordId,
                dto.ProcedureType,
                dto.MedicationsInUse,
                dto.ConductDescription
            );
        }
    }

}
