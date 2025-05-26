using Domain.Entities.Patient;
using Domain.Entities.Service;
using Domain.Utils;
using prontuario.WebApi.ResponseModels.Service;
using WebApi.ResponseModels.Patient;
using WebApi.ResponseModels.Service;

namespace WebApi.ResponseModels.Utils
{
    public class UtilsResponseModel
    {
        public static PagedResponse<List<PatientResponse>> CreateFindAllListPatientPagedResponse(
            PagedResult<List<PatientEntity>?> data, int pageNumber, int pageSize)
        {
            var patientResponses = data.Pages!
                .Select(PatientResponseModel.CreateGetAllPatientResponse)
                .ToList();

            return new PagedResponse<List<PatientResponse>>(
                patientResponses,
                data.TotalRecords,
                pageNumber,
                pageSize);
        }

        public static PagedResponse<List<ServiceResponse>> CreateFindAllServicesByPatientId(
            PagedResult<List<ServiceEntity>?> data, int pageNumber, int pageSize)
        {
            if (data.Pages!.Count == 0)
                return new PagedResponse<List<ServiceResponse>>(
                    [],
                    0,
                    pageNumber,
                    pageSize
                );

            var serviceResponses = data.Pages!
                .Select(ServiceResponseModel.CreateFindAllServiceByPatientId)
                .ToList();

            return new PagedResponse<List<ServiceResponse>>(
                serviceResponses,
                data.TotalRecords,
                pageNumber,
                pageSize
                );
        }
    }
}
