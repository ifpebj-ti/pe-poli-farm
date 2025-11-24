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
        string RespiratoryPattern,
        string PulmonaryAuscultation,
        string SkinColor,
        string CardiacBubbles,
        string Pulse,
        string Rhythm,
        string Pupils,
        string Speech,
        string ConsciousnessLevel,
        string MotorResponse,
        ClassificationStatus ClassificationStatus
    );
}
