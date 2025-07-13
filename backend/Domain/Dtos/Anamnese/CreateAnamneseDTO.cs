using prontuario.Domain.ValuesObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Anamnese
{
    public record CreateAnamneseDTO
    (
        string BloodPressure,
        string Glucose,
        string Temperature,
        string RespiratoryRate,
        string BloodType,
        string Weight,
        string HeartRate,
        string Saturation,
        string Height,
        bool AntecPathological,
        bool NecesPsicobio,
        bool Diabetes,
        bool MedicationsInUse,
        bool UseOfProthesis,
        bool Allergies,
        string AllergiesType,
        string AntecPathologicalType,
        string MedicationInUseType,
        string MedicalHypothesis,
        string PreviousSurgeries,
        string SignsAndSymptoms,
        ClassificationStatus ClassificationStatus
    );
}
