using Application.Usecases.User;
using Application.UseCases.User;
using Domain.Dtos.User;
using Domain.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using prontuario.WebApi.Validators.User;
using System.ComponentModel.DataAnnotations;
using WebApi.ResponseModels;
using WebApi.ResponseModels.User;
using WebApi.Validators.User;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
        [AllowAnonymous]
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
        /// <summary>
        /// Lista todos os usuarios do sistema
        /// </summary>
        /// <returns>Mensagem de sucesso na operação</returns>
        /// <response code="200">List usuarios com Sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="409">Erro de conflito</response>
        [AllowAnonymous]
        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> ReturnsAllUsers([FromServices] ReturnsAllUsersUseCase returnsAllUsersUseCase)
        {
            var result = await returnsAllUsersUseCase.Execute();

            if (result.IsFailure)
            {
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                return result.ErrorDetails?.Status is 409
                    ? Conflict(result.ErrorDetails)
                    : BadRequest();
            }

            _logger.LogInformation("Usuário retornados com sucesso");
            return Ok(UserResponseModel.CreateUserResponseList(result.Data!));
        }

        /// <summary>
        /// Atualizar dados do usuário logado
        /// </summary>
        /// <returns>Mensagem de sucesso na operação</returns>
        /// <response code="200">Usuaro atualizado com sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="409">Erro de conflito</response>
        [Authorize]
        [HttpPatch("me/update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<MessageSuccessResponseModel>> UpdateLoggedUser([FromBody] UpdateUserDTO data, [FromServices] UpdateUserUseCase updateUserUseCase)
        {
            var loggedUser = Guid.Parse(User.FindFirst("Id")?.Value ?? throw new UnauthorizedAccessException("Usuário não autenticado"));

            var validator = new UpdateUserDTOValidator();
            var validationResult = await validator.ValidateAsync(data);
            if (!validationResult.IsValid)
            {
                return new OkObjectResult(ResultPattern<string>.BadRequest(validationResult.ToString()).ErrorDetails);
            }

            var result = await updateUserUseCase.Execute(loggedUser, data);

            if (result.IsFailure)
                return StatusCode((int)result.ErrorDetails!.Status!, result.ErrorDetails);

            _logger.LogInformation("Usuário criado com sucesso");
            return Ok(new MessageSuccessResponseModel(result.Message));
        }

        /// <summary>
        /// (Admin) Atualiza os dados de um usuário específico.
        /// </summary>
        /// <returns>Mensagem de sucesso na operação</returns>
        /// <response code="200">Usuário atualizado com sucesso</response>
        /// <response code="400">Erro na operação / Dados inválidos</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="403">Acesso negado (Não é admin)</response>
        /// <response code="404">Usuário não encontrado</response>
        [HttpPut("{userId:guid}")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MessageSuccessResponseModel>> AdminUpdateUser(
            [FromRoute] Guid userId,
            [FromBody] UpdateUserDTO data,
            [FromServices] UpdateUserUseCase updateUserUseCase)
        {
            var validator = new UpdateUserDTOValidator();
            var validationResult = await validator.ValidateAsync(data);
            if (!validationResult.IsValid)
            {
                return new BadRequestObjectResult(ResultPattern<string>.BadRequest(validationResult.ToString()).ErrorDetails);
            }

            var result = await updateUserUseCase.Execute(userId, data);

            if (result.IsFailure)
            {
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                return result.ErrorDetails?.Status switch
                {
                    404 => NotFound(result.ErrorDetails),
                    _ => BadRequest(result.ErrorDetails)
                };
            }

            _logger.LogInformation($"Admin atualizou o usuário {userId} com sucesso");
            return Ok(new MessageSuccessResponseModel(result.Message));
        }

        /// <summary>
        /// Desativa um usuário pelo ID
        /// </summary>
        /// <returns>Mensagem de sucesso na operação</returns>
        /// <response code="200">Usuaro desativado com sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="409">Erro de conflito</response>
        [HttpPatch("disable/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<MessageSuccessResponseModel>> DisableUser([FromRoute, Required] Guid userId, [FromServices] DisableUserUseCase disableUserUseCase)
        {
            var result = await disableUserUseCase.Execute(userId);

            if (result.IsFailure)
                return StatusCode((int)result.ErrorDetails!.Status!, result.ErrorDetails);

            _logger.LogInformation("Usuário desativado com sucesso");
            return Ok(new MessageSuccessResponseModel(result.Message));
        }
    }
}
