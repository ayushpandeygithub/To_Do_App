
using Microsoft.AspNetCore.Identity.Data;
using ToDoApp.Models.DTO;

namespace ToDoApp.BAL.Contracts
{
    public interface IUserService
    {
        string GenerateJwtToken(UserDTO user);
        Task<bool> UserExistsAsync(string username);
        Task<UserDTO> CreateUserAsync(UserDTO registerRequest);
        Task<UserDTO> GetUserAsync(string username);

    }
}
