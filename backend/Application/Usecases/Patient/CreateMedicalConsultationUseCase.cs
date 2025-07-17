using Application.Factories;
using Application.Gateways;
using Domain.Dtos.MedicalConsultation;
using Domain.Entities.Anamnese;
using Domain.Entities.HealthAndDisease;
using Domain.Entities.MedicalRecord;
using Domain.Entities.PatientExams;
using Domain.Errors;
using Domain.Exceptions;

    // 1. Injeção de todas as dependências necessárias
public class CreateMedicalConsultationUseCase(
    IGatewayPatient patientRepository,
    IServiceGateway serviceRepository,
    IGenericRepositoryGateway<MedicalRecordEntity> medicalRecordRepository,
    IGenericRepositoryGateway<AnamneseEntity> anamneseRepository,
    IGenericRepositoryGateway<HealthAndDiseaseEntity> healthAndDiseaseRepository,
    IPrescriptionRepository prescriptionRepository,
    IGenericRepositoryGateway<PatientExamsEntity> patientExamsRepository
    )
{
    public async Task<ResultPattern<string>> Execute(CreateMedicalConsultationDTO dto, CancellationToken cancellationToken)
    {
        try
        {
            // 2. Validação inicial: O paciente existe?
            var patient = await patientRepository.GetByIdAsync(dto.PatientId);
            if (patient is null)
            {
                return ResultPattern<string>.NotFound("Paciente não encontrado.");
            }

            // 3. Criação das entidades principais usando suas Factories
            var medicalRecord = MedicalRecordFactory.CreateMedicalRecordToInitScreening();
            //await _medicalRecordRepository.AddAsync(medicalRecord); // Salva para obter o ID

            var service = ServiceFactory.CreateServiceToInitializeService(patient, medicalRecord);
            await serviceRepository.Init(service);

            // 4. Criação das entidades de consulta com base nos DTOs
            // (Assumindo que existem Factories para Anamnese e HealthAndDisease)
            var anamnese = AnamneseFactory.Create(dto.Anamnese, medicalRecord.Id);
            await anamneseRepository.AddAsync(anamnese);

            var healthHistory = HealthAndDiseaseFactory.Create(dto.HealthHistory, medicalRecord.Id);
            await healthAndDiseaseRepository.AddAsync(healthHistory);

            // 5. Criação das prescrições
            if (dto.Prescriptions != null && dto.Prescriptions.Any())
            {
                foreach (var prescriptionDto in dto.Prescriptions)
                {
                    // A lógica interna do loop continua a mesma
                    var consistentPrescriptionDto = prescriptionDto with
                    {
                        MedicalRecordId = medicalRecord.Id,
                        ProfessionalId = dto.ProfessionalId!.Value
                    };
                    var prescription = PrescriptionFactory.CreatePrescription(consistentPrescriptionDto);
                    await prescriptionRepository.Create(prescription);
                }
            }

            if (dto.PatientExams != null && dto.PatientExams.Any())
            {
                foreach (var examDto in dto.PatientExams)
                {
                    var exam = PatientExamsFactory.Create(examDto, medicalRecord.Id, dto.ProfessionalId!.Value);
                    await patientExamsRepository.AddAsync(exam);
                }
            }

            // 6. Atualiza o prontuário com a anamnese e o novo status
            MedicalRecordFactory.CreateMedicalRecordWithAnamnese(medicalRecord, anamnese);
            await medicalRecordRepository.UpdateAsync(medicalRecord);
            await patientRepository.UpdateAsync(patient); // Salva o novo status do paciente

            // 7. Se tudo deu certo, commita a transação
            return ResultPattern<string>.SuccessResult("Consulta registrada com sucesso.");
        }
        catch (DomainException dex)
        {
            // 8. Tratamento de exceções específicas do domínio
            return ResultPattern<string>.BadRequest(dex.Message);
        }
        catch (Exception)
        {
            return ResultPattern<string>.FailureResult("Erro interno ao registrar a consulta.", 500);
        }
    }
}