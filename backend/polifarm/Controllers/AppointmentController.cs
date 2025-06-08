using Application.Usecases.Appointment;
using Domain.Dtos.Appointment;
using Domain.Entites.Appointment;
using Domain.Enums;
using Domain.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController(ILogger<AppointmentController> logger) : ControllerBase
    {
        /// <summary>
        /// Cria um novo agendamento
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(ResultPattern<Guid>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] CreateAppointmentDTO dto, [FromServices] CreateAppointmentUseCase createUseCase, CancellationToken cancellationToken)
        {
            var result = await createUseCase.Execute(dto, cancellationToken);

            if (result.IsFailure)
            {
                // Construindo a URL dinamicamente
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                return result.ErrorDetails?.Status == 404
                    ? NotFound(result.ErrorDetails)
                    : BadRequest();
            }

            return Ok(result.Data);
        }

        /// <summary>
        /// Lista agendamentos com filtros opcionais
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(ResultPattern<IEnumerable<AppointmentEntity>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get([FromQuery] AppointmentFilterDTO filters, [FromServices] GetAppointmentsUseCase getUseCase, CancellationToken cancellationToken)
        {
            var result = await getUseCase.Execute(filters, cancellationToken);

            if (result.IsFailure)
            {
                // Construindo a URL dinamicamente
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                return result.ErrorDetails?.Status == 404
                    ? NotFound(result.ErrorDetails)
                    : BadRequest();
            }

            return Ok(result.Data);
        }

        /// <summary>
        /// Atualiza o status de um agendamento
        /// </summary>
        [HttpPatch("{id:guid}/status")]
        [ProducesResponseType(typeof(ResultPattern<string>), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] AppointmentStatusEnum newStatus, [FromServices] UpdateAppointmentStatusUseCase updateStatusUseCase, CancellationToken cancellationToken)
        {
            var result = await updateStatusUseCase.Execute(id, newStatus, cancellationToken);

            if (result.IsFailure)
            {
                // Construindo a URL dinamicamente
                var endpointUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.Path}";
                result.ErrorDetails!.Type = endpointUrl;

                return result.ErrorDetails?.Status == 404
                    ? NotFound(result.ErrorDetails)
                    : BadRequest();
            }

            return Ok(result.Data);
        }
    }
}
