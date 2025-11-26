using Domain.Entities.PatientExams;

namespace WebApi.ResponseModels.PatientExam
{
    public class PatientExamResponseModels
    {
        /// <summary>
        /// Converte uma única entidade de exame em um DTO de resposta.
        /// </summary>
        public static PatientExamResponse CreatePatientExamResponse(PatientExamsEntity exam)
        {
            return new PatientExamResponse(
                exam.Id,
                exam.Name,
                exam.Description,
                exam.PrescriptionDate,
                exam.ExecutionDate,
                exam.Priority.Value, // Acessamos o valor string do Value Object
                exam.Professional.Name // Acessamos o nome na entidade de navegação
            );
        }

        /// <summary>
        /// Converte uma lista de entidades de exame em uma lista de DTOs de resposta.
        /// </summary>
        public static List<PatientExamResponse> CreatePatientExamListResponse(List<PatientExamsEntity> exams)
        {
            return exams.Select(CreatePatientExamResponse).ToList();
        }
    }
}
