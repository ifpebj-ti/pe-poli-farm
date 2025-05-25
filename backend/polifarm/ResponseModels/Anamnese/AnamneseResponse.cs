namespace WebApi.ResponseModels.Anamnese;

public record AnamneseResponse(
    Guid? Id,
    string? BloodPressure,
    string? Glucose,
    string? Temperature,
    string? RespiratoryRate,
    string? BloodType,
    string? Weight,
    string? HeartRate,
    string? Saturation,
    string? Height,
    bool? AntecPathological,
    bool? NecesPsicobio,
    bool? Diabetes,
    bool? MedicationsInUse,
    bool? UseOfProthesis,
    bool? Allergies,
    string? AllergiesType,
    string? AntecPathologicalType,
    string? MedicationInUseType,
    string? MedicalHypothesis,
    string? PreviousSurgeries,
    string? SignsAndSymptoms,
    string? ClassificationStatus
    );