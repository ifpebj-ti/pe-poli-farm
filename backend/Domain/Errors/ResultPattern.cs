using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Errors
{
    public class ResultPattern<T>
    {
        public bool Success { get; private set; }
        public string? Message { get; private set; }
        public T? Data { get; private set; }
        public bool IsSuccess { get; private set; }
        public bool IsFailure => !IsSuccess;
        public FormatDetails? ErrorDetails { get; private set; }

        public ResultPattern(bool success, string? message, T? data = default, FormatDetails? errorDetails = null)
        {
            if (success) IsSuccess = true;

            Success = success;
            Message = message;
            Data = data;
            ErrorDetails = errorDetails;
        }

        public static ResultPattern<T> SuccessResult()
        {
            var message = "Operação realizada com sucesso.";
            return new ResultPattern<T>(true, message);
        }

        public static ResultPattern<T> SuccessResult(T data)
        {
            var message = "Operação realizada com sucesso.";
            return new ResultPattern<T>(true, message, data);
        }

        public static ResultPattern<T> FailureResult(string detail, int statusCode, string title = "Ocorreu um erro")
        {
            var problemDetails = new FormatDetails
            {
                Status = statusCode,
                Title = title,
                Detail = detail,
                Instance = $"urn:problem:{Guid.NewGuid()}"
            };

            return new ResultPattern<T>(false, detail, default, problemDetails);
        }

        public static ResultPattern<T> NotFound(string detail)
            => FailureResult(detail, 404, "Recurso não encontrado");

        public static ResultPattern<T> BadRequest(string detail)
            => FailureResult(detail, 400, "Requisição inválida");

        public static ResultPattern<T> InternalError(string detail)
            => FailureResult(detail, 500, "Erro interno do servidor");

        public static ResultPattern<T> Unauthorized(string detail)
            => FailureResult(detail, 401, "Não autorizado");

        public static ResultPattern<T> Forbidden(string detail)
            => FailureResult(detail, 403, "Acesso negado");
    }
}
