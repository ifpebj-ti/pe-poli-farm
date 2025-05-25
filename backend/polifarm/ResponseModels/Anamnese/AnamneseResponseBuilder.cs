namespace WebApi.ResponseModels.Anamnese;

public class AnamneseResponseBuilder
{
    private Guid? _id;
    private string? _glucose;
    private string? _bloodPressure;
    private string? _temperature;
    private string? _respiratoryRate;
    private string? _bloodType;
    private string? _weight;
    private string? _heartRate;
    private string? _saturation;
    private string? _height;
    private bool? _antecPathological;
    private bool? _necesPsicobio;
    private bool? _diabetes;
    private bool? _medicationsInUse;
    private bool? _useOfProthesis;
    private bool? _allergies;
    private string? _allergiesType;
    private string? _antecPathologicalType;
    private string? _medicationInUseType;
    private string? _medicalHypothesis;
    private string? _previousSurgeries;
    private string? _signsAndSymptoms;
    private string? _classificationStatus;

    public AnamneseResponseBuilder WithId(Guid? id)
    {
        _id = id;
        return this;
    }

    public AnamneseResponseBuilder WithGlucose(string? glucose)
    {
        _glucose = glucose;
        return this;
    }

    public AnamneseResponseBuilder WithBloodPressure(string? bloodPressure)
    {
        _bloodPressure = bloodPressure;
        return this;
    }

    public AnamneseResponseBuilder WithTemperature(string? temperature)
    {
        _temperature = temperature;
        return this;
    }

    public AnamneseResponseBuilder WithRespiratoryRate(string? respiratoryRate)
    {
        _respiratoryRate = respiratoryRate;
        return this;
    }

    public AnamneseResponseBuilder WithBloodType(string? bloodType)
    {
        _bloodType = bloodType;
        return this;
    }

    public AnamneseResponseBuilder WithWeight(string? weight)
    {
        _weight = weight;
        return this;
    }

    public AnamneseResponseBuilder WithHeartRate(string? heartRate)
    {
        _heartRate = heartRate;
        return this;
    }

    public AnamneseResponseBuilder WithSaturation(string? saturation)
    {
        _saturation = saturation;
        return this;
    }

    public AnamneseResponseBuilder WithHeight(string? height)
    {
        _height = height;
        return this;
    }

    public AnamneseResponseBuilder WithAntecPathological(bool? antecPathological)
    {
        _antecPathological = antecPathological;
        return this;
    }

    public AnamneseResponseBuilder WithNecesPsicobio(bool? necesPsicobio)
    {
        _necesPsicobio = necesPsicobio;
        return this;
    }

    public AnamneseResponseBuilder WithDiabetes(bool? diabetes)
    {
        _diabetes = diabetes;
        return this;
    }

    public AnamneseResponseBuilder WithMedicationsInUse(bool? medicationsInUse)
    {
        _medicationsInUse = medicationsInUse;
        return this;
    }

    public AnamneseResponseBuilder WithUseOfProthesis(bool? useOfProthesis)
    {
        _useOfProthesis = useOfProthesis;
        return this;
    }

    public AnamneseResponseBuilder WithAllergies(bool? allergies)
    {
        _allergies = allergies;
        return this;
    }

    public AnamneseResponseBuilder WithAllergiesType(string? allergiesType)
    {
        _allergiesType = allergiesType;
        return this;
    }

    public AnamneseResponseBuilder WithAntecPathologicalType(string? antecPathologicalType)
    {
        _antecPathologicalType = antecPathologicalType;
        return this;
    }

    public AnamneseResponseBuilder WithMedicationInUseType(string? medicationInUseType)
    {
        _medicationInUseType = medicationInUseType;
        return this;
    }

    public AnamneseResponseBuilder WithMedicalHypothesis(string? medicalHypothesis)
    {
        _medicalHypothesis = medicalHypothesis;
        return this;
    }

    public AnamneseResponseBuilder WithPreviousSurgeries(string? previousSurgeries)
    {
        _previousSurgeries = previousSurgeries;
        return this;
    }

    public AnamneseResponseBuilder WithSignsAndSymptoms(string? signsAndSymptoms)
    {
        _signsAndSymptoms = signsAndSymptoms;
        return this;
    }

    public AnamneseResponseBuilder WithClassificationStatus(string? classificationStatus)
    {
        _classificationStatus = classificationStatus;
        return this;
    }

    public AnamneseResponse Build()
    {
        return new AnamneseResponse(
            _id,
            _bloodPressure,
            _glucose,
            _temperature,
            _respiratoryRate,
            _bloodType,
            _weight,
            _heartRate,
            _saturation,
            _height,
            _antecPathological,
            _necesPsicobio,
            _diabetes,
            _medicationsInUse,
            _useOfProthesis,
            _allergies,
            _allergiesType,
            _antecPathologicalType,
            _medicationInUseType,
            _medicalHypothesis,
            _previousSurgeries,
            _signsAndSymptoms,
            _classificationStatus
        );
    }
}