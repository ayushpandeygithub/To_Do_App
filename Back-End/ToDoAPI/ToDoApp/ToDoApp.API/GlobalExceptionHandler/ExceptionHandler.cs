using Microsoft.AspNetCore.Diagnostics;
using Serilog;
using ToDoApp.Models.Response;

namespace ToDoApp.API.GlobalExceptionHandler
{
    public class ExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            Log.Error(exception, "An unhandled exception has occurred");
            var res = new ApiResponse<string>()
            {
                Status = 3,
                Message = "Something went wrong"
            };
            await httpContext.Response.WriteAsJsonAsync(res, cancellationToken);
            return true;

        }
    }
}
