using Application.Usecases.Note;
using Application.Usecases.Patient;
using Application.Usecases.User;
using Domain.Dtos;
using Domain.Dtos.Note;
using Domain.Dtos.Patient;
using Domain.Errors;
using Domain.ValuesObjects;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WebApi.ResponseModels;
using WebApi.ResponseModels.Note;
using WebApi.ResponseModels.Patient;
using WebApi.ResponseModels.User;
using WebApi.ResponseModels.Utils;
using WebApi.Validators.Note;
using WebApi.Validators.Patient;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController(ILogger<PatientController> _logger) : ControllerBase
    {
        /// <summary>
        /// Adiciona um novo paciente no sistema
        /// </summary>
        /// <returns>Mensagem de sucesso na operação</returns>
        /// <response code="200">Paciente criado com Sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response> 
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<MessageSuccessResponseModel>> Create([FromBody] CreatePatientDTO data, [FromServices] CreatePatientUseCase createPatientUseCase)
        {
            var validator = new CreatePatientValidador();
            var validationResult = await validator.ValidateAsync(data);
            if (!validationResult.IsValid)
            {
                return new BadRequestObjectResult(ResultPattern<string>.BadRequest(validationResult.ToString()));
                throw new ValidationException(validationResult.ToString());
            }

            var result = await createPatientUseCase.Execute(data);

            _logger.LogInformation("Paciente criado com sucesso");

            return Ok(new MessageSuccessResponseModel(result.Message));
        }

        /// <summary>
        /// Atualizar o paciente
        /// </summary>
        /// <remarks>Obs: Precisa-se reenviar os dados mesmo que o mesmo não esteja sendo alterado</remarks>
        /// <returns>Mensagem de sucesso na operação</returns>
        /// <response code="200">Paciente atualizado com Sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="404">Erro ao atualizar paciente</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MessageSuccessResponseModel>> Update([FromBody] UpdatePatientDTO data, [FromServices] UpdatePatientUseCase updatePatientUseCase)
        {
            var result = await updatePatientUseCase.Execute(data);

            if (result.IsFailure)
            {
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                return result.ErrorDetails?.Status == 404
                    ? NotFound(result.ErrorDetails)
                    : BadRequest();
            }

            _logger.LogInformation("Paciente atualizado com sucesso");
            return Ok(new MessageSuccessResponseModel("Paciente atualizado com sucesso"));
        }

        /// <summary>
        /// Retorna um paciente baseando-se no id dele
        /// </summary>
        /// <returns>Paciente retornado com sucesso</returns>
        /// <response code="200">Paciente retornado com Sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="404">Erro ao buscar paciente</response>
        [HttpGet("{patientCPF}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PatientResponse>> FindByCPF([FromRoute] string patientCPF, [FromServices] FindPatientByCpfUseCase findPatientByIdUseCase)
        {
            var result = await findPatientByIdUseCase.Execute(patientCPF);

            if (result.IsFailure)
            {
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                return result.ErrorDetails?.Status == 404
                    ? NotFound(result.ErrorDetails)
                    : BadRequest();
            }

            _logger.LogInformation("Paciente retornado com sucesso");
            return Ok(PatientResponseModel.CreateFindPatientById(result.Data!));
        }

        /// <summary>
        /// Retorna pacientes com base nos filtros
        /// </summary>
        /// <remarks>
        /// É um filtro por vez.
        /// Para o paciente pode ser os seguintes Status: NO_SERVICE, IN_SERVICE
        /// Para o prontuário pode ser os seguintes Status: SCREENING, MEDICAL_CARE, NURSING, ADMISSION, OBSERVATION, MEDICAL_DISCHARGE
        /// Para as Classificações pode ser os seguintes Status: EMERGENCY, VERY_URGENT, URGENCY, LESS_SERIOUS, LIGHTWEIGHT
        /// Para o filter pode ser o seguinte: Cpf e Sus
        /// </remarks>
        /// <response code="200">Pacientes retornados com Sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="404">Pacientes não encontrados</response>
        [HttpGet("filter")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PagedResponse<List<PatientResponse>>>> GetByFilterList(
            [FromServices] FindAllPatientUseCase getAllPatientUseCase,
            [FromQuery] string? filter = "",
            [FromQuery] string? status = "",
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var result = await getAllPatientUseCase.Execute(filter, status, pageNumber, pageSize);

            if (result.IsFailure)
            {
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                return result.ErrorDetails?.Status == 404
                    ? NotFound(result.ErrorDetails)
                    : BadRequest();
            }
            _logger.LogInformation("Pacientes recuperados com sucesso");
            return Ok(UtilsResponseModel.CreateFindAllListPatientPagedResponse(result.Data, pageNumber, pageSize));
        }

        /// <summary>
        /// Lista Nota com base em filtros
        /// </summary>
        [HttpGet("Notes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetNotes(
            [FromQuery] NotesFilterDTO filters,
            [FromServices] GetNotesUseCase getNotesUseCase
        )
        {
            var result = await getNotesUseCase.Execute(filters);

            if (result.IsFailure)
            {
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                return result.ErrorDetails?.Status == 404
                    ? NotFound(result.ErrorDetails)
                    : BadRequest();
            }

            _logger.LogInformation("Notas recuperadas com sucesso");
            return Ok(NoteResponseModels.CreateNoteResponseList(result.Data!));
        }   

        /// <summary>
        /// Adiciona Nota a um paciente
        /// </summary>
        [HttpPost("AddNote")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<MessageSuccessResponseModel>> AddNote([FromBody] CreateNotesDTO data, [FromServices] AddNoteUseCase addPatientNoteUseCase)
        {
            var validator = new CreatePatientNoteValidador();
            var validationResult = await validator.ValidateAsync(data);
            if (!validationResult.IsValid)
            {
                return new BadRequestObjectResult(ResultPattern<string>.BadRequest(validationResult.ToString()));
                throw new ValidationException(validationResult.ToString());
            }

            var result = await addPatientNoteUseCase.Execute(data);

            if (result.IsFailure)
            {
                return BadRequest(result.ErrorDetails?.Title);
            }

            _logger.LogInformation("Nota adicionada com sucesso ao paciente");
            return Ok(new MessageSuccessResponseModel(result.Message!));
        }

        /// <summary>
        /// Remove Nota de um paciente
        /// </summary>
        [HttpDelete("RemoveNote/{noteId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MessageSuccessResponseModel>> RemoveNote([FromRoute] Guid noteId, [FromServices] RemoveNoteUseCase removePatientNoteUseCase)
        {
            var result = await removePatientNoteUseCase.Execute(noteId);

            if (result.IsFailure)
            {
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                return result.ErrorDetails?.Status == 404
                    ? NotFound(result.ErrorDetails)
                    : BadRequest();
            }

            _logger.LogInformation("Nota removida com sucesso do paciente");
            return Ok(new MessageSuccessResponseModel(result.Message!));
        }

        /// <summary>
        /// Retorna todos os pacientes cadastrados no sistema
        /// </summary>
        /// <returns>Pacientes retornados com sucesso</returns>
        /// <response code="200">Pacientes retornados com Sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="404">Erro ao buscar paciente</response>
        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PatientResponse>> ReturnsAllPatients([FromServices] ReturnsAllPatientsUseCase returnsAllPatientsUseCase)
        {
            var result = await returnsAllPatientsUseCase.Execute();

            if (result.IsFailure)
            {
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                return result.ErrorDetails?.Status is 409
                    ? Conflict(result.ErrorDetails)
                    : BadRequest();
            }

            _logger.LogInformation("Pacientes retornados com sucesso");
            return Ok(PatientResponseModel.CreatePatientResponseList(result.Data!));
        }
    }
}
