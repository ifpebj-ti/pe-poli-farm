using WebApi.ResponseModels.MedicalRecord;

namespace WebApi.ResponseModels.Service;

public class ServiceResponseBuilder
{
    private Guid _id { get; set; }
    private DateTime _serviceDate { get; set; }
    private string? _serviceStatus { get; set; }
    private MedicalRecordResponse? _medicalRecordResponse { get; set; }

    public ServiceResponseBuilder WithId(Guid id)
    {
        _id = id;
        return this;
    }

    public ServiceResponseBuilder WithServiceDate(DateTime serviceDate)
    {
        _serviceDate = serviceDate;
        return this;
    }

    public ServiceResponseBuilder WithServiceStatus(string? serviceStatus)
    {
        _serviceStatus = serviceStatus;
        return this;
    }

    public ServiceResponseBuilder WithMedicalRecordResponse(MedicalRecordResponse? medicalRecordResponse)
    {
        _medicalRecordResponse = medicalRecordResponse;
        return this;
    }

    public ServiceResponse Build()
    {
        return new ServiceResponse(_id, _serviceDate, _serviceStatus, _medicalRecordResponse);
    }
}