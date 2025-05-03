using Application.Usecases.Auth;
using Application.Usecases.User;
using Domain.Dtos.Auth;
using Domain.Dtos.User;
using Microsoft.AspNetCore.Mvc;
using prontuario.WebApi.Validators.User;
using System.ComponentModel.DataAnnotations;
using WebApi.ResponseModels;
using WebApi.ResponseModels.Auth;
using WebApi.ResponseModels.User;
using WebApi.Validators.Auth;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(ILogger<AuthController> logger) : ControllerBase
    {
        /// <summary>
        /// Realiza login no sistema
        /// </summary>
        /// <returns>Token de acesso</returns>
        /// <response code="200">Usuário retornado com Sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="409">Erro de conflito</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginDTO request, [FromServices] LoginUseCase loginUseCase)
        {
            var validator = new AuthValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
                throw new ValidationException(validationResult.ToString());

            var useCaseResult = await loginUseCase.Execute(request.Email, request.Password);

            if (!useCaseResult.IsSuccess)
            {
                // Construindo a URL dinamicamente
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                useCaseResult.ErrorDetails!.Type = endpointUrl;

                // Retornando erro apropriado
                return useCaseResult.ErrorDetails?.Status is 400
                    ? BadRequest(useCaseResult.ErrorDetails)
                    : NotFound(useCaseResult.ErrorDetails);
            }

            logger.LogInformation($"Login realizado com sucesso");
            return Ok(new LoginResponse(useCaseResult.Data!));
        }

        /// <summary>
        /// Altera senha do usuário
        /// </summary>
        /// <returns>Mensagem de sucesso na operação</returns>
        /// <response code="200">Senha alterada com Sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="409">Erro de conflito</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<MessageSuccessResponseModel>> UpdatePassword(
            [FromBody] UpdateUserPasswordDTO data,
            [FromServices] UpdateUserPasswordUseCase updateUserPasswordUseCase)
        {
            var validator = new UpdatePasswordUserValidator();
            var validationResult = await validator.ValidateAsync(data);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.ToString());
            }

            var resultUseCase = await updateUserPasswordUseCase.Execute(data.Email, data.Password, data.AccessCode);

            if (resultUseCase.IsFailure)
            {
                // Construindo a URL dinamicamente
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                resultUseCase.ErrorDetails!.Type = endpointUrl;

                // Retornando erro apropriado
                return resultUseCase.ErrorDetails?.Status is 409
                    ? Conflict(resultUseCase.ErrorDetails)
                    : BadRequest();
            }

            return Ok(new MessageSuccessResponseModel("Senha alterada com sucesso"));
        }

        /// <summary>
        /// Retorna o usuário pelo seu e-mail
        /// </summary>
        /// <param name="email"></param>
        /// <returns>Mensagem de sucesso na operação</returns>
        /// <response code="200">Usuário retornado com Sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="404">Recurso não encontrado</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserResponse>> GetUserByEmail([FromQuery] string email, [FromServices] FindUserByEmail findUserByEmailUseCase)
        {
            var result = await findUserByEmailUseCase.Execute(email);

            if (result.IsFailure)
            {
                // Construindo a URL dinamicamente
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                // Retornando erro apropriado
                return result.ErrorDetails?.Status is 404
                    ? NotFound(result.ErrorDetails)
                    : BadRequest();
            }

            return Ok(UserResponseModel.CreateUserResponse(result.Data!));
        }
    }
}
