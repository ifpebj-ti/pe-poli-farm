namespace WebApi.ResponseModels
{
    public class MessageErrorResponseModel
    {
        public string Message { get; set; }
        public MessageErrorResponseModel(string message)
        {
            Message = message;
        }
    }
}
