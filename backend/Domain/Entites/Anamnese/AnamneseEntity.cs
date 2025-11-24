using Domain.Entites;
using Domain.Entities.MedicalRecord;
using Domain.ValuesObjects;
using prontuario.Domain.ValuesObjects;

namespace Domain.Entities.Anamnese;

public class AnamneseEntity : BaseEntity
{
    public string BloodPressure { get; private set; } = string.Empty;
    public string Glucose { get; private set; } = string.Empty;
    public string Temperature { get; private set; } = string.Empty;
    public string RespiratoryRate { get; private set; } = string.Empty;
    public string BloodType { get; private set; } = string.Empty;
    public string Weight { get; private set; } = string.Empty;
    public string HeartRate { get; private set; } = string.Empty;
    public string Saturation { get; private set; } = string.Empty;
    public string Height { get; private set; } = string.Empty;
    public bool AntecPathological { get; private set; } = false;
    public bool NecesPsicobio { get; private set; } = false;
    public bool Diabetes { get; private set; } = false;
    public bool MedicationsInUse { get; private set; } = false;
    public bool UseOfProthesis { get; private set; } = false;
    public bool Allergies { get; private set; } = false;
    public string AllergiesType { get; private set; } = string.Empty;
    public string AntecPathologicalType { get; private set; } = string.Empty;
    public string MedicationInUseType { get; private set; } = string.Empty;
    public string MedicalHypothesis { get; private set; } = string.Empty;
    public string PreviousSurgeries { get; private set; } = string.Empty;
    public string SignsAndSymptoms { get; private set; } = string.Empty;
        public string RespiratoryPattern { get; private set; } = string.Empty;
    public string PulmonaryAuscultation { get; private set; } = string.Empty;
    public string SkinColor { get; private set; } = string.Empty;
    public string CardiacBubbles { get; private set; } = string.Empty;
    public string Pulse { get; private set; } = string.Empty;
    public string Rhythm { get; private set; } = string.Empty;
    public string Pupils { get; private set; } = string.Empty;
    public string Speech { get; private set; } = string.Empty;
    public string ConsciousnessLevel { get; private set; } = string.Empty;
    public string MotorResponse { get; private set; } = string.Empty;
    public ClassificationStatus ClassificationStatus { get; private set; }
    public Guid MedicalRecordId { get; private set; }
    public MedicalRecordEntity MedicalRecord { get; private set; }
    
    public AnamneseEntity() { }
    
    public AnamneseEntity(
        Guid id,
        string bloodPressure,
        string glucose,
        string temperature,
        string respiratoryRate,
        string bloodType,
        string weight,
        string heartRate,
        string saturation,
        string height,
        bool antecPathological,
        bool necesPsicobio,
        bool diabetes,
        bool medicationsInUse,
        bool useOfProthesis,
        bool allergies,
        string allergiesType,
        string antecPathologicalType,
        string medicationInUseType,
        string medicalHypothesis,
        string previousSurgeries,
        string signsAndSymptoms,
        string respiratoryPattern,
        string pulmonaryAuscultation,
        string skinColor,
        string cardiacBubbles,
        string pulse,
        string rhythm,
        string pupils,
        string speech,
        string consciousnessLevel,
        string motorResponse,
        ClassificationStatus classificationStatus,
        Guid medicalRecordId)
    {
        Id = id;
        BloodPressure = bloodPressure;
        Glucose = glucose;
        Temperature = temperature;
        RespiratoryRate = respiratoryRate;
        BloodType = bloodType;
        Weight = weight;
        HeartRate = heartRate;
        Saturation = saturation;
        Height = height;
        AntecPathological = antecPathological;
        NecesPsicobio = necesPsicobio;
        Diabetes = diabetes;
        MedicationsInUse = medicationsInUse;
        UseOfProthesis = useOfProthesis;
        Allergies = allergies;
        AllergiesType = allergiesType;
        AntecPathologicalType = antecPathologicalType;
        MedicationInUseType = medicationInUseType;
        MedicalHypothesis = medicalHypothesis;
        PreviousSurgeries = previousSurgeries;
        SignsAndSymptoms = signsAndSymptoms;
        RespiratoryPattern = respiratoryPattern;
        PulmonaryAuscultation = pulmonaryAuscultation;
        SkinColor = skinColor;
        CardiacBubbles = cardiacBubbles;
        Pulse = pulse;
        Rhythm = rhythm;
        Pupils = pupils;
        Speech = speech;
        ConsciousnessLevel = consciousnessLevel;
        MotorResponse = motorResponse;
        ClassificationStatus = classificationStatus;
        MedicalRecordId = medicalRecordId;
    }
}