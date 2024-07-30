

using ToDoApp.DAL.Entities;

namespace ToDoApp.DAL.Contracts
{
    public interface IUserRepository
    {
        Task<bool> UserExistsAsync(string username);
        Task<User> CreateUserAsync(User user);
        Task<User> GetUserAsync(string username);
    }
}
