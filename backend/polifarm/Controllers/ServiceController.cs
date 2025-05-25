using Application.Usecases.Service;
using Microsoft.AspNetCore.Mvc;
using prontuario.Application.Usecases.Service;
using WebApi.ResponseModels;
using WebApi.ResponseModels.Service;
using WebApi.ResponseModels.Utils;

namespace prontuario.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ServiceController(ILogger<ServiceController> _logger) : ControllerBase
{
    /// <summary>
    /// Iniciar atendimento, colocar na fila de triagem
    /// </summary>
    /// <returns>Mensagem de sucesso na operação</returns>
    /// <remarks>Enviar no corpo o id do paciente</remarks>
    /// <response code="200">Atendimento iniciado com Sucesso</response>
    /// <response code="400">Erro na operação</response>
    /// <response code="401">Acesso não autorizado</response>
    /// <response code="404">Erro ao iniciar atendimento</response>
    [HttpPost("initService")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MessageSuccessResponseModel>> Create([FromBody] Guid patientId, [FromServices] InitializeServiceUseCase initializeServiceUseCase)
    {
        var result = await initializeServiceUseCase.Execute(patientId);

        if (result.IsFailure)
        {
            // Construindo a URL dinamicamente
            var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
            result.ErrorDetails!.Type = endpointUrl;
                
            return result.ErrorDetails?.Status == 404 
                ? NotFound(result.ErrorDetails) 
                : BadRequest();
        }
        
        _logger.LogInformation("Atendimento iniciado com sucesso");
        return Ok(new MessageSuccessResponseModel("Atendimento iniciado com sucesso"));
    }
    
    /// <summary>
    /// Buscar todos os atendimentos por paciente
    /// </summary>
    /// <returns>Atendimentos retornados com sucesso</returns>
    /// <remarks>Obs: Retorna apenas atendimentos finalizados</remarks>
    /// <response code="200">Atendimentos retornados com Sucesso</response>
    /// <response code="400">Erro na operação</response>
    /// <response code="401">Acesso não autorizado</response>
    /// <response code="404">Erro ao buscar atendimentos</response>
    [HttpGet("patient/{patientId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PagedResponse<List<ServiceResponse>>>> FindAllByPatientId(
        [FromServices] FindAllServicesByPatientIdUseCase findAllServicesByPatientIdUseCase,
        [FromRoute] Guid patientId,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var result = await findAllServicesByPatientIdUseCase.Execute(patientId, pageNumber, pageSize);

        if (result.IsFailure)
        {
            // Construindo a URL dinamicamente
            var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
            result.ErrorDetails!.Type = endpointUrl;
                
            return result.ErrorDetails?.Status == 404 
                ? NotFound(result.ErrorDetails) 
                : BadRequest();
        }
        
        _logger.LogInformation("Atendimentos retornados com sucesso");
        return Ok(UtilsResponseModel.CreateFindAllServicesByPatientId(result.Data, pageNumber, pageSize));
    }
}