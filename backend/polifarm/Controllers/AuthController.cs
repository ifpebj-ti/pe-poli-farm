using Application.Usecases.Auth;
using Domain.Dtos.Auth;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WebApi.ResponseModels.Auth;
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
            return Ok(new LoginResponse(useCaseResult.Data));

        }


    }
}
