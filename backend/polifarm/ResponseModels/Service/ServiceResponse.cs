using WebApi.ResponseModels.MedicalRecord;

namespace WebApi.ResponseModels.Service;

public record ServiceResponse(
    Guid Id,
    DateTime ServiceDate,
    string? ServiceStatus,
    MedicalRecordResponse? MedicalRecord
    );