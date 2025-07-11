﻿using Application.Usecases.Auth;
using Application.Usecases.MedicalCertificate;
using Application.Usecases.Prescription;
using Domain.Dtos.Auth;
using Domain.Dtos.MedicalCertificate;
using Domain.Dtos.Prescription;
using Domain.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.ResponseModels;
using WebApi.ResponseModels.Auth;
using WebApi.ResponseModels.MedicalCertificate;
using static System.Runtime.InteropServices.JavaScript.JSType;
using WebApi.Validators.Patient;
using WebApi.Validators.MedicalCertificate;
using WebApi.Validators.Referral;
using Domain.Dtos.Referral;
using Application.Usecases.Referral;
using WebApi.ResponseModels.Referral;

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
            if (result.IsFailure)
                return StatusCode((int)result.ErrorDetails!.Status!, new MessageErrorResponseModel(result.Data!));
            
            return Ok(new MessageSuccessResponseModel(result.Data!));
        }

        /// <summary>
        /// Emitir certificado médico
        /// </summary>
        /// <returns>Certificado médico</returns>
        /// <response code="200">Certificado emitido com sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>
        /// <response code="409">Erro de conflito</response>
        [HttpPost("MedicalCertificate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MessageSuccessResponseModel>> CreateMedicalCertificate([FromBody] CreateCertificateDTO request, [FromServices] CreateMedicalCertificateUseCase createMedicalCertificateUseCase)
        {
            var validator = new CreateMedicalCertificateValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
                return new BadRequestObjectResult(ResultPattern<string>.BadRequest(validationResult.ToString()));

            var result = await createMedicalCertificateUseCase.Execute(request);
            if (result.IsFailure)
                return StatusCode((int)result.ErrorDetails!.Status!, result.ErrorDetails);
            
            return Ok(MedicalCertificateResponseModels.ToResponse(result.Data!));
        }

        /// <summary>
        /// Buscar certificado médico
        /// </summary>
        /// <returns>Lista de certificados médicos</returns>
        /// <response code="200">Certificados retornado com sucesso</response>
        /// <response code="400">Erro na operação</response>
        /// <response code="401">Acesso não autorizado</response>    
        [HttpGet("MedicalCertificate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<MessageSuccessResponseModel>> GetMedicalCertificate([FromQuery] MedicalCertificateFilterDTO filters, [FromServices] GetMedicalCertificateUseCase getMedicalCertificateUseCase, CancellationToken cancellationToken)
        {
            var result = await getMedicalCertificateUseCase.Execute(filters, cancellationToken);
            if (result.IsFailure)
                return StatusCode((int)result.ErrorDetails!.Status!, result.ErrorDetails);
            
            return Ok(MedicalCertificateResponseModels.ToResponseList(result.Data!));
        }

        /// <summary>
        /// Criar encaminhamento médico
        /// </summary>
        /// <returns>Encaminhamento médico</returns>
        /// <response code="200">Encaminhamento criado com sucesso</response>   
        ///  <response code="400">Erro na operação</response>
        ///  <response code="401">Acesso não autorizado</response>
        [HttpPost("Referral")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<MessageSuccessResponseModel>> CreateReferral([FromBody] CreateReferralDTO request, [FromServices] CreateReferralUseCase createReferralUseCase)
        {
            var validator = new CreateReferralValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
                return new BadRequestObjectResult(ResultPattern<string>.BadRequest(validationResult.ToString()));

            var result = await createReferralUseCase.Execute(request);
            if (result.IsFailure)
                return StatusCode((int)result.ErrorDetails!.Status!, result.ErrorDetails);

            return Ok(result.Data!);
        }

        /// <summary>
        /// Buscar encaminhamento médico
        /// </summary>
        /// <returns>Encaminhamentos médico</returns>
        /// <response code="200">Encaminhamento encontrado</response>   
        ///  <response code="400">Erro na operação</response>
        ///  <response code="401">Acesso não autorizado</response>
        [HttpGet("Referral")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<MessageSuccessResponseModel>> GetReferral([FromQuery] ReferralFilterDTO filters, [FromServices] GetReferralUseCase getReferralUseCase, CancellationToken cancellationToken)
        {
            var result = await getReferralUseCase.Execute(filters, cancellationToken);
            if (result.IsFailure)
                return StatusCode((int)result.ErrorDetails!.Status!, result.ErrorDetails);

            return Ok(ReferralResponseModels.ToResponseList(result.Data!));
        }
    }
}