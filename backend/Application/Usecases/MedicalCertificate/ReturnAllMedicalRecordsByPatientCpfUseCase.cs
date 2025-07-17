using Application.Gateways;
using Domain.Entities.MedicalRecord;
using Domain.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.MedicalCertificate
{
    public class ReturnAllMedicalRecordsByPatientCpfUseCase(IMedicalRecordGateway medicalRecordRepository)
    {
        public async Task<ResultPattern<List<MedicalRecordEntity>>> Execute(string CPF)
        {
            try
            {
                var medicalRecords = await medicalRecordRepository.GetByPatientCpf(CPF);
                if (medicalRecords == null || !medicalRecords.Any())
                {
                    return ResultPattern<List<MedicalRecordEntity>>.BadRequest(("No medical records found for the provided CPF."));
                }
                return ResultPattern<List<MedicalRecordEntity>>.SuccessResult(medicalRecords);
            }
            catch (Exception)
            {
                return ResultPattern<List<MedicalRecordEntity>>.InternalError(("An error occurred while retrieving medical records."));
            }
        }
    }
}
