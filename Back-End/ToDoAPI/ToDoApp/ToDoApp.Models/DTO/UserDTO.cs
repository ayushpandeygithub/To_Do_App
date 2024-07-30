namespace ToDoApp.Models.DTO
{
    public class UserDTO
    {
        public int? UserId { get; set; }
        public required string UserName { get; set; } 
        public required string Password { get; set; } 
        public  string PasswordHash {  get; set; } =  string.Empty;
        public bool IsActive { get; set; } = true;

    }
}
