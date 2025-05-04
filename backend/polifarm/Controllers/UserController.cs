using Application.Usecases.User;
using Domain.Dtos.User;
using Domain.Errors;
using Microsoft.AspNetCore.Mvc;
using prontuario.WebApi.Validators.User;
using System.ComponentModel.DataAnnotations;
using WebApi.ResponseModels;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(ILogger<UserController> _logger) : ControllerBase
    {
        /// <summary>
        /// Adiciona um novo usuário no sistema
        /// </summary>
        /// <remarks>
        /// Para o campo Role, pode ser as seguintes opções: ADMIN, RECEPTIONTEAM, DOCTOR, NURSE, INTITUATIONMANAGEMENT
        /// </remarks>
        /// <returns>Mensagem de sucesso na operação</returns>
        /// <response code="200">Usuário adicionado com Sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="409">Erro de conflito</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<MessageSuccessResponseModel>> CreateUser([FromBody] CreateUserDTO data, [FromServices] CreateUserUseCase createUserUseCase)
        {
            var validator = new CreateUserValidator();
            var validationResult = await validator.ValidateAsync(data);
            if (!validationResult.IsValid)
            {
                return new OkObjectResult(ResultPattern<string>.BadRequest(validationResult.ToString()).ErrorDetails);
            }

            var result = await createUserUseCase.Execute(data);

            if (result.IsFailure)
            {
                // Construindo a URL dinamicamente
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                // Retornando erro apropriado
                return result.ErrorDetails?.Status is 409
                    ? Conflict(result.ErrorDetails)
                    : BadRequest();
            }

            _logger.LogInformation("Usuário criado com sucesso");
            return Ok(new MessageSuccessResponseModel(result.Message));
        }
    }
}
