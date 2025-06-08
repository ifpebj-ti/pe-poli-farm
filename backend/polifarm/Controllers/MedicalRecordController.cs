using Application.Usecases.Auth;
using Application.Usecases.Prescription;
using Domain.Dtos.Auth;
using Domain.Dtos.Prescription;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.ResponseModels;
using WebApi.ResponseModels.Auth;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalRecordController(ILogger<MedicalRecordController> logger) : ControllerBase
    {
        /// <summary>
        /// Adicionar prescrição médica ao prontuário do paciente
        /// </summary>
        /// <returns>Prescrição</returns>
        /// <response code="200">Precrição adicionada com sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="409">Erro de conflito</response>
        [HttpPost("Prescription")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MessageSuccessResponseModel>> AddPrescription([FromBody] CreatePrescriptionDTO request, [FromServices] AddPrescriptionUseCase addPrescriptionUseCase)
        {
            var result = await addPrescriptionUseCase.Execute(request, HttpContext.RequestAborted);
            if (result.IsSuccess)
            {
                return Ok(new MessageSuccessResponseModel(result.Data!));
            }
            else
            {
                return StatusCode((int)result.ErrorDetails!.Status!, new MessageErrorResponseModel(result.Data!));
            }
        }
    }
}
