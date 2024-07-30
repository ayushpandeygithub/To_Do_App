

namespace ToDoApp.Models.Response
{
        public class ApiResponse<T>
        {
         //status to the type of the status 
            public int Status { get; set; }
            public string Message { get; set; } = string.Empty;
            public T? Data { get; set; }
        }
    
}
