using Application.Gateways;
using Domain.Dtos.Prescription;
using Domain.Errors;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Usecases.Prescription
{
    public class AddPrescriptionUseCase(IPrescriptionRepository prescriptionRepository, IUserRepositoryGateway userRepository)
    {
        public async Task<ResultPattern<string>> Execute(CreatePrescriptionDTO data, CancellationToken cancellationToken)
        {
            if (data is null)
                return ResultPattern<string>.FailureResult("Dados inválidos", 400);

            var user = await userRepository.FindUserById(data.ProfessionalId);

            if (user is null)
                return ResultPattern<string>.FailureResult("Profissinal não encontrado", 404);

            try { 
                var prescription = Application.Factories.PrescriptionFactory.CreatePrescription(data);
                await prescriptionRepository.Create(prescription);
                return ResultPattern<string>.SuccessResult("Prescrição adicionada com sucesso");
            }
            catch (DomainException dex)
            {
                return ResultPattern<string>.BadRequest(dex.Message);
            }
            catch (Exception)
            {
                return ResultPattern<string>.FailureResult("Erro ao salvar a prescrição", 500);
            }
        }
    }
}