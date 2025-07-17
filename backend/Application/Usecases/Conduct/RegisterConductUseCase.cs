using Application.Factories;
using Application.Gateways;
using Domain.Dtos.Conduct;
using Domain.Entites;
using Domain.Entites.Conduct;
using Domain.Entities.MedicalRecord;
using Domain.Errors;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Conduct
{
    public class RegisterConductUseCase
    {
        private readonly IGenericRepositoryGateway<ConductEntity> _conductRepository;
        private readonly IGatewayPatient _patientRepository;
        private readonly IUserRepositoryGateway _userRepository;
        private readonly IGenericRepositoryGateway<MedicalRecordEntity> _medicalRecordRepository;

        public RegisterConductUseCase(IGenericRepositoryGateway<ConductEntity> conductRepository, IGatewayPatient patientRepository, IUserRepositoryGateway userRepository, IGenericRepositoryGateway<MedicalRecordEntity> medicalRecordRepository)
        {
            _conductRepository = conductRepository;
            _patientRepository = patientRepository;
            _userRepository = userRepository;
            _medicalRecordRepository = medicalRecordRepository;
        }

        public async Task<ResultPattern<string>> Execute(CreateConductDTO dto, CancellationToken cancellationToken)
        {
            try
            {
                var patient = await _patientRepository.GetByIdAsync(dto.PatientId);
                if (patient is null)
                    return ResultPattern<string>.NotFound("Paciente não encontrado.");

                var professional = await _userRepository.GetByIdAsync(dto.ProfessionalId);
                if (professional is null)
                    return ResultPattern<string>.NotFound("Profissional não encontrado.");

                var medicalRecord = await _medicalRecordRepository.GetByIdAsync(dto.MedicalRecordId);
                if (medicalRecord is null)
                    return ResultPattern<string>.NotFound("Prontuário médico não encontrado.");

                var conduct = ConductFactory.Create(dto);
                await _conductRepository.AddAsync(conduct);
                return ResultPattern<string>.SuccessResult();
            }
            catch (DomainException dex)
            {
                return ResultPattern<string>.BadRequest(dex.Message);
            }
            catch (Exception)
            {
                return ResultPattern<string>.FailureResult("Erro ao registrar procsdimento.", 500);
            }
        }
    }
}
