using Domain.ValuesObjects;
using prontuario.Domain.ValuesObjects;

namespace Domain.Entities.Anamnese;

public class AnamneseEntityBuilder
{
    private Guid _id;
    private string _bloodPressure = string.Empty;
    private string _glucose = string.Empty;
    private string _temperature = string.Empty;
    private string _respiratoryRate = string.Empty;
    private string _bloodType = string.Empty;
    private string _weight = string.Empty;
    private string _heartRate = string.Empty;
    private string _saturation = string.Empty;
    private string _height = string.Empty;
    private bool _antecPathological = false;
    private bool _necesPsicobio = false;
    private bool _diabetes = false;
    private bool _medicationsInUse = false;
    private bool _useOfProthesis = false;
    private bool _allergies = false;
    private string _allergiesType = string.Empty;
    private string _antecPathologicalType = string.Empty;
    private string _medicationInUseType = string.Empty;
    private string _medicalHypothesis = string.Empty;
    private string _previousSurgeries = string.Empty;
    private string _signsAndSymptoms = string.Empty;
    private ClassificationStatus _classificationStatus;

    public AnamneseEntityBuilder WithId(Guid id)
    {
        _id = id;
        return this;
    }

    public AnamneseEntityBuilder WithBloodPressure(string bloodPressure)
    {
        _bloodPressure = bloodPressure;
        return this;
    }

    public AnamneseEntityBuilder WithGlucose(string glucose)
    {
        _glucose = glucose;
        return this;
    }

    public AnamneseEntityBuilder WithTemperature(string temperature)
    {
        _temperature = temperature;
        return this;
    }

    public AnamneseEntityBuilder WithRespiratoryRate(string respiratoryRate)
    {
        _respiratoryRate = respiratoryRate;
        return this;
    }

    public AnamneseEntityBuilder WithBloodType(string bloodType)
    {
        _bloodType = bloodType;
        return this;
    }

    public AnamneseEntityBuilder WithWeight(string weight)
    {
        _weight = weight;
        return this;
    }

    public AnamneseEntityBuilder WithHeartRate(string heartRate)
    {
        _heartRate = heartRate;
        return this;
    }

    public AnamneseEntityBuilder WithSaturation(string saturation)
    {
        _saturation = saturation;
        return this;
    }

    public AnamneseEntityBuilder WithHeight(string height)
    {
        _height = height;
        return this;
    }

    public AnamneseEntityBuilder WithAntecPathological(bool antecPathological)
    {
        _antecPathological = antecPathological;
        return this;
    }

    public AnamneseEntityBuilder WithNecesPsicobio(bool necesPsicobio)
    {
        _necesPsicobio = necesPsicobio;
        return this;
    }

    public AnamneseEntityBuilder WithDiabetes(bool diabetes)
    {
        _diabetes = diabetes;
        return this;
    }

    public AnamneseEntityBuilder WithMedicationsInUse(bool medicationsInUse)
    {
        _medicationsInUse = medicationsInUse;
        return this;
    }

    public AnamneseEntityBuilder WithUseOfProthesis(bool useOfProthesis)
    {
        _useOfProthesis = useOfProthesis;
        return this;
    }

    public AnamneseEntityBuilder WithAllergies(bool allergies)
    {
        _allergies = allergies;
        return this;
    }

    public AnamneseEntityBuilder WithAllergiesType(string allergiesType)
    {
        _allergiesType = allergiesType;
        return this;
    }

    public AnamneseEntityBuilder WithAntecPathologicalType(string antecPathologicalType)
    {
        _antecPathologicalType = antecPathologicalType;
        return this;
    }

    public AnamneseEntityBuilder WithMedicationInUseType(string medicationInUseType)
    {
        _medicationInUseType = medicationInUseType;
        return this;
    }

    public AnamneseEntityBuilder WithMedicalHypothesis(string medicalHypothesis)
    {
        _medicalHypothesis = medicalHypothesis;
        return this;
    }

    public AnamneseEntityBuilder WithPreviousSurgeries(string previousSurgeries)
    {
        _previousSurgeries = previousSurgeries;
        return this;
    }

    public AnamneseEntityBuilder WithSignsAndSymptoms(string signsAndSymptoms)
    {
        _signsAndSymptoms = signsAndSymptoms;
        return this;
    }

    public AnamneseEntityBuilder WithClassificationStatus(ClassificationStatus classificationStatus)
    {
        _classificationStatus = classificationStatus;
        return this;
    }

    public AnamneseEntity Build()
    {
        return new AnamneseEntity(
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
