using Domain.Dtos.Anamnese;
using Domain.Entities.Anamnese;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Factories
{
    public class AnamneseFactory
    {
        public static AnamneseEntity Create(CreateAnamneseDTO dto, Guid medicalRecordId)
        {
            return new AnamneseEntityBuilder()
                .WithBloodPressure(dto.BloodPressure)
                .WithGlucose(dto.Glucose)
                .WithTemperature(dto.Temperature)
                .WithRespiratoryRate(dto.RespiratoryRate)
                .WithBloodType(dto.BloodType)
                .WithWeight(dto.Weight)
                .WithHeartRate(dto.HeartRate)
                .WithSaturation(dto.Saturation)
                .WithHeight(dto.Height)
                .WithAntecPathological(dto.AntecPathological)
                .WithNecesPsicobio(dto.NecesPsicobio)
                .WithDiabetes(dto.Diabetes)
                .WithMedicationsInUse(dto.MedicationsInUse)
                .WithUseOfProthesis(dto.UseOfProthesis)
                .WithAllergies(dto.Allergies)
                .WithAllergiesType(dto.AllergiesType)
                .WithAntecPathologicalType(dto.AntecPathologicalType)
                .WithMedicationInUseType(dto.MedicationInUseType)
                .WithMedicalHypothesis(dto.MedicalHypothesis)
                .WithPreviousSurgeries(dto.PreviousSurgeries)
                .WithSignsAndSymptoms(dto.SignsAndSymptoms)
                .WithRespiratoryPattern(dto.RespiratoryPattern)
                .WithPulmonaryAuscultation(dto.PulmonaryAuscultation)
                .WithSkinColor(dto.SkinColor)
                .WithCardiacBubbles(dto.CardiacBubbles)
                .WithPulse(dto.Pulse)
                .WithRhythm(dto.Rhythm)
                .WithPupils(dto.Pupils)
                .WithSpeech(dto.Speech)
                .WithConsciousnessLevel(dto.ConsciousnessLevel)
                .WithMotorResponse(dto.MotorResponse)
                .WithClassificationStatus(dto.ClassificationStatus)
                .WithMedicalRecordId(medicalRecordId)
                .Build();
        }
    }
}
